// =============================================================================
//  db.js — Persistência com node:sqlite (SQLite nativo do Node 22+/26).
//  Arquivo real em ./data/progress.db. Toda a lógica de stats vive aqui.
// =============================================================================

const { DatabaseSync } = require("node:sqlite");
const path = require("node:path");
const fs = require("node:fs");

const { TRACKS } = require("./content");
const G = require("./gamification");

const DATA_DIR = path.resolve(__dirname, "..", "data");
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
let DB_PATH = path.join(DATA_DIR, "progress.db");
// Windows limita caminhos a 260 chars. Sessões locais ficam em caminhos longos,
// então usamos o prefixo de caminho estendido (\\?\) quando necessário.
// Ele exige caminho absoluto, com barras invertidas e sem componentes "..".
if (process.platform === "win32" && DB_PATH.length >= 240 && !DB_PATH.startsWith("\\\\?\\")) {
  DB_PATH = "\\\\?\\" + DB_PATH;
}

const db = new DatabaseSync(DB_PATH);
db.exec("PRAGMA journal_mode = WAL;");
db.exec("PRAGMA foreign_keys = ON;");

db.exec(`
  CREATE TABLE IF NOT EXISTS progress (
    node_id     TEXT PRIMARY KEY,
    track_id    TEXT NOT NULL,
    phase_id    TEXT,
    type        TEXT NOT NULL,          -- item | exit | project | appendix
    completed_at TEXT NOT NULL          -- ISO datetime
  );

  CREATE TABLE IF NOT EXISTS sessions (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    track_id   TEXT,
    label      TEXT,
    seconds    INTEGER NOT NULL,
    day        TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS notes (
    phase_id   TEXT PRIMARY KEY,
    track_id   TEXT,
    body       TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS achievements (
    id          TEXT PRIMARY KEY,
    unlocked_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS quest_claims (
    day        TEXT NOT NULL,
    quest_id   TEXT NOT NULL,
    claimed_at TEXT NOT NULL,
    PRIMARY KEY (day, quest_id)
  );

  CREATE TABLE IF NOT EXISTS xp_log (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    day       TEXT NOT NULL,
    amount    INTEGER NOT NULL,
    reason    TEXT,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS settings (
    key   TEXT PRIMARY KEY,
    value TEXT
  );
`);

// ---------------------------------------------------------------------------
//  Índice de conteúdo: achata todos os nós marcáveis das 3 trilhas.
// ---------------------------------------------------------------------------
function buildIndex() {
  const nodes = new Map(); // node_id -> {trackId, phaseId, type, xp}
  const phaseNodes = new Map(); // phase_id -> [node_id...]
  const trackNodes = new Map(); // track_id -> [node_id...]
  let totalProjects = 0;
  let totalAppendices = 0;

  for (const track of TRACKS) {
    trackNodes.set(track.id, []);
    for (const phase of track.phases) {
      phaseNodes.set(phase.id, []);
      const add = (id, type) => {
        nodes.set(id, { trackId: track.id, phaseId: phase.id, type, xp: G.XP_VALUES[type] });
        phaseNodes.get(phase.id).push(id);
        trackNodes.get(track.id).push(id);
      };
      for (const it of phase.items) add(it.id, "item");
      if (phase.exit) add(phase.id + "::exit", "exit");
      if (phase.project) {
        add(phase.id + "::project", "project");
        totalProjects++;
      }
    }
    for (const apx of track.appendices || []) {
      const id = apx.id + "::read";
      nodes.set(id, { trackId: track.id, phaseId: null, type: "appendix", xp: G.XP_VALUES.appendix });
      trackNodes.get(track.id).push(id);
      totalAppendices++;
    }
  }
  return { nodes, phaseNodes, trackNodes, totalProjects, totalAppendices };
}

const INDEX = buildIndex();

// ---------------------------------------------------------------------------
//  Helpers de data (hora local da máquina).
// ---------------------------------------------------------------------------
function todayStr(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function nowISO() {
  return new Date().toISOString();
}

// ---------------------------------------------------------------------------
//  Prepared statements.
// ---------------------------------------------------------------------------
const stmt = {
  getProgress: db.prepare("SELECT node_id FROM progress WHERE node_id = ?"),
  insertProgress: db.prepare(
    "INSERT OR IGNORE INTO progress (node_id, track_id, phase_id, type, completed_at) VALUES (?,?,?,?,?)"
  ),
  deleteProgress: db.prepare("DELETE FROM progress WHERE node_id = ?"),
  allProgress: db.prepare("SELECT node_id, track_id, type, completed_at FROM progress"),
  progressDays: db.prepare("SELECT DISTINCT substr(completed_at,1,10) AS day FROM progress"),
  insertSession: db.prepare(
    "INSERT INTO sessions (track_id, label, seconds, day, created_at) VALUES (?,?,?,?,?)"
  ),
  upsertNote: db.prepare(
    `INSERT INTO notes (phase_id, track_id, body, updated_at) VALUES (?,?,?,?)
     ON CONFLICT(phase_id) DO UPDATE SET body=excluded.body, updated_at=excluded.updated_at, track_id=excluded.track_id`
  ),
  deleteNote: db.prepare("DELETE FROM notes WHERE phase_id = ?"),
  allNotes: db.prepare("SELECT phase_id, track_id, body, updated_at FROM notes"),
  getNote: db.prepare("SELECT phase_id, body, updated_at FROM notes WHERE phase_id = ?"),
  allAch: db.prepare("SELECT id, unlocked_at FROM achievements"),
  insertAch: db.prepare("INSERT OR IGNORE INTO achievements (id, unlocked_at) VALUES (?,?)"),
  claimQuest: db.prepare("INSERT OR IGNORE INTO quest_claims (day, quest_id, claimed_at) VALUES (?,?,?)"),
  questClaimsForDay: db.prepare("SELECT quest_id FROM quest_claims WHERE day = ?"),
  countQuestClaims: db.prepare("SELECT COUNT(*) AS n FROM quest_claims"),
  insertXp: db.prepare("INSERT INTO xp_log (day, amount, reason, created_at) VALUES (?,?,?,?)"),
  xpLogSum: db.prepare("SELECT COALESCE(SUM(amount),0) AS s FROM xp_log"),
  xpLogDays: db.prepare("SELECT day, SUM(amount) AS s FROM xp_log GROUP BY day"),
  sessionDays: db.prepare("SELECT day, SUM(seconds) AS s FROM sessions GROUP BY day"),
  sessionsByTrack: db.prepare("SELECT track_id, SUM(seconds) AS s, COUNT(*) AS n FROM sessions GROUP BY track_id"),
  totalSeconds: db.prepare("SELECT COALESCE(SUM(seconds),0) AS s FROM sessions"),
  recentSessions: db.prepare("SELECT track_id, label, seconds, created_at FROM sessions ORDER BY id DESC LIMIT 20"),
  getSetting: db.prepare("SELECT value FROM settings WHERE key = ?"),
  setSetting: db.prepare("INSERT INTO settings (key,value) VALUES (?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value"),
  reset: {
    progress: db.prepare("DELETE FROM progress"),
    sessions: db.prepare("DELETE FROM sessions"),
    notes: db.prepare("DELETE FROM notes"),
    ach: db.prepare("DELETE FROM achievements"),
    quests: db.prepare("DELETE FROM quest_claims"),
    xp: db.prepare("DELETE FROM xp_log"),
  },
};

// ---------------------------------------------------------------------------
//  Mutations.
// ---------------------------------------------------------------------------
function setNodeComplete(nodeId, completed) {
  const meta = INDEX.nodes.get(nodeId);
  if (!meta) throw new Error("nó desconhecido: " + nodeId);
  const exists = stmt.getProgress.get(nodeId);
  if (completed && !exists) {
    stmt.insertProgress.run(nodeId, meta.trackId, meta.phaseId, meta.type, nowISO());
  } else if (!completed && exists) {
    stmt.deleteProgress.run(nodeId);
  }
  const newly = syncAchievements();
  return { ok: true, nodeId, completed, newAchievements: newly };
}

function logSession({ trackId = null, label = null, seconds }) {
  seconds = Math.max(0, Math.round(seconds));
  stmt.insertSession.run(trackId, label, seconds, todayStr(), nowISO());
  const newly = syncAchievements();
  return { ok: true, seconds, newAchievements: newly };
}

function saveNote(phaseId, body) {
  // descobre track do phase
  let trackId = null;
  for (const t of TRACKS) if (t.phases.some((p) => p.id === phaseId)) trackId = t.id;
  const trimmed = (body || "").trim();
  if (!trimmed) {
    stmt.deleteNote.run(phaseId);
  } else {
    stmt.upsertNote.run(phaseId, trackId, trimmed, nowISO());
  }
  const newly = syncAchievements();
  return { ok: true, newAchievements: newly };
}

function claimQuest(questId) {
  const day = todayStr();
  const quests = getDailyQuests();
  const q = quests.find((x) => x.id === questId);
  if (!q) return { ok: false, error: "missão não disponível hoje" };
  if (!q.done) return { ok: false, error: "missão ainda não concluída" };
  if (q.claimed) return { ok: false, error: "já resgatada" };
  stmt.claimQuest.run(day, questId, nowISO());
  stmt.insertXp.run(day, q.xp, "quest:" + questId, nowISO());
  const newly = syncAchievements();
  return { ok: true, xp: q.xp, newAchievements: newly };
}

function resetAll() {
  for (const k of Object.keys(stmt.reset)) stmt.reset[k].run();
  return { ok: true };
}

// ---------------------------------------------------------------------------
//  Cálculo de estatísticas e estado de jogo.
// ---------------------------------------------------------------------------
function rawCounts() {
  const rows = stmt.allProgress.all();
  const completed = new Set();
  let nodeXp = 0;
  let projectsDone = 0,
    exitsDone = 0,
    itemsDone = 0,
    appendicesRead = 0;
  const byTrackCompleted = {};
  for (const r of rows) {
    completed.add(r.node_id);
    const meta = INDEX.nodes.get(r.node_id);
    if (!meta) continue;
    nodeXp += meta.xp;
    byTrackCompleted[r.track_id] = (byTrackCompleted[r.track_id] || 0) + 1;
    if (r.type === "project") projectsDone++;
    else if (r.type === "exit") exitsDone++;
    else if (r.type === "item") itemsDone++;
    else if (r.type === "appendix") appendicesRead++;
  }
  return { completed, nodeXp, projectsDone, exitsDone, itemsDone, appendicesRead, byTrackCompleted };
}

// Conjunto de dias com qualquer atividade -> streak.
function activeDays() {
  const set = new Set();
  for (const r of stmt.progressDays.all()) if (r.day) set.add(r.day);
  for (const r of stmt.sessionDays.all()) if (r.s > 0) set.add(r.day);
  for (const r of stmt.xpLogDays.all()) set.add(r.day);
  return set;
}

function computeStreaks() {
  const days = activeDays();
  if (days.size === 0) return { current: 0, max: 0 };
  // current: conta para trás a partir de hoje (ou ontem, se hoje sem atividade)
  const oneDay = 86400000;
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  let cursor = new Date(t);
  if (!days.has(todayStr(cursor))) cursor = new Date(t.getTime() - oneDay);
  let current = 0;
  while (days.has(todayStr(cursor))) {
    current++;
    cursor = new Date(cursor.getTime() - oneDay);
  }
  // max: maior sequência consecutiva no histórico
  const sorted = [...days].sort();
  let max = 1,
    run = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1] + "T00:00:00");
    const cur = new Date(sorted[i] + "T00:00:00");
    if (Math.round((cur - prev) / oneDay) === 1) run++;
    else run = 1;
    if (run > max) max = run;
  }
  if (current > max) max = current;
  return { current, max };
}

function dailyXpMap() {
  const map = {};
  // XP por dia vindo de nós concluídos:
  const rows = stmt.allProgress.all();
  for (const r of rows) {
    const day = r.completed_at.slice(0, 10);
    const meta = INDEX.nodes.get(r.node_id);
    if (!meta) continue;
    map[day] = (map[day] || 0) + meta.xp;
  }
  for (const r of stmt.xpLogDays.all()) {
    map[r.day] = (map[r.day] || 0) + r.s;
  }
  return map;
}

function trackProgress() {
  const { byTrackCompleted } = rawCounts();
  const out = [];
  for (const t of TRACKS) {
    const total = INDEX.trackNodes.get(t.id).length;
    const done = byTrackCompleted[t.id] || 0;
    // fases completas
    let phasesCompleted = 0;
    for (const p of t.phases) {
      const ids = INDEX.phaseNodes.get(p.id);
      if (ids.length && ids.every((id) => isDone(id))) phasesCompleted++;
    }
    out.push({
      id: t.id,
      title: t.title,
      icon: t.icon,
      color: t.color,
      total,
      done,
      pct: total ? Math.round((done / total) * 100) : 0,
      phases: t.phases.length,
      phasesCompleted,
    });
  }
  return out;
}

let _doneCache = null;
function isDone(id) {
  if (!_doneCache) _doneCache = rawCounts().completed;
  return _doneCache.has(id);
}

function computeStats() {
  _doneCache = null; // invalida cache por chamada
  const counts = rawCounts();
  _doneCache = counts.completed;
  const xpLogSum = stmt.xpLogSum.get().s;
  const totalXp = counts.nodeXp + xpLogSum;
  const lvl = G.levelInfo(totalXp);
  const streaks = computeStreaks();
  const totalSeconds = stmt.totalSeconds.get().s;
  const totalMinutes = Math.round(totalSeconds / 60);
  const notesCount = stmt.allNotes.all().length;
  const questsClaimed = stmt.countQuestClaims.get().n;

  // por trilha + fases/trilhas completas
  const tracks = trackProgress();
  let phasesCompleted = 0;
  const tracksCompleted = [];
  for (const tp of tracks) {
    phasesCompleted += tp.phasesCompleted;
    if (tp.total > 0 && tp.done >= tp.total) tracksCompleted.push(tp.id);
  }

  const totalNodes = INDEX.nodes.size;

  return {
    totalXp,
    nodeXp: counts.nodeXp,
    bonusXp: xpLogSum,
    level: lvl.level,
    levelTitle: lvl.title,
    levelInfo: lvl,
    completedNodes: counts.completed.size,
    totalNodes,
    overallPct: totalNodes ? Math.round((counts.completed.size / totalNodes) * 100) : 0,
    itemsDone: counts.itemsDone,
    exitsDone: counts.exitsDone,
    projectsDone: counts.projectsDone,
    totalProjects: INDEX.totalProjects,
    appendicesRead: counts.appendicesRead,
    totalAppendices: INDEX.totalAppendices,
    streak: streaks.current,
    maxStreak: streaks.max,
    totalSeconds,
    totalMinutes,
    notesCount,
    questsClaimed,
    phasesCompleted,
    tracksCompleted,
    tracks,
  };
}

// ---------------------------------------------------------------------------
//  Conquistas — sincroniza desbloqueios e concede bônus de XP uma vez.
// ---------------------------------------------------------------------------
function syncAchievements() {
  const s = computeStats();
  const already = new Set(stmt.allAch.all().map((r) => r.id));
  const newly = [];
  for (const a of G.ACHIEVEMENTS) {
    if (!already.has(a.id) && a.check(s)) {
      stmt.insertAch.run(a.id, nowISO());
      if (a.bonus) stmt.insertXp.run(todayStr(), a.bonus, "achievement:" + a.id, nowISO());
      newly.push({ id: a.id, name: a.name, icon: a.icon, bonus: a.bonus, desc: a.desc, tier: a.tier });
    }
  }
  return newly;
}

function getAchievements() {
  const unlocked = new Map(stmt.allAch.all().map((r) => [r.id, r.unlocked_at]));
  return G.ACHIEVEMENTS.map((a) => ({
    id: a.id,
    name: a.name,
    icon: a.icon,
    desc: a.desc,
    tier: a.tier,
    bonus: a.bonus,
    unlocked: unlocked.has(a.id),
    unlockedAt: unlocked.get(a.id) || null,
  }));
}

// ---------------------------------------------------------------------------
//  Missões diárias — progresso calculado a partir da atividade de hoje.
// ---------------------------------------------------------------------------
function todayActivity() {
  const day = todayStr();
  const rows = stmt.allProgress.all().filter((r) => r.completed_at.slice(0, 10) === day);
  let nodesToday = 0,
    exitsToday = 0,
    appendicesToday = 0,
    xpFromNodes = 0;
  for (const r of rows) {
    nodesToday++;
    const meta = INDEX.nodes.get(r.node_id);
    if (meta) xpFromNodes += meta.xp;
    if (r.type === "exit") exitsToday++;
    if (r.type === "appendix") appendicesToday++;
  }
  let secondsToday = 0;
  for (const r of stmt.sessionDays.all()) if (r.day === day) secondsToday += r.s;
  let xpBonusToday = 0;
  for (const r of stmt.xpLogDays.all()) if (r.day === day) xpBonusToday += r.s;
  const notesToday = stmt.allNotes.all().filter((n) => n.updated_at.slice(0, 10) === day).length;
  return {
    nodesToday,
    exitsToday,
    appendicesToday,
    minutesToday: Math.round(secondsToday / 60),
    xpToday: xpFromNodes + xpBonusToday,
    notesToday,
  };
}

function getDailyQuests() {
  const day = todayStr();
  const act = todayActivity();
  const claimed = new Set(stmt.questClaimsForDay.all(day).map((r) => r.quest_id));
  return G.pickDailyQuests(day).map((q) => {
    const progress = Math.min(act[q.metric] || 0, q.target);
    return {
      id: q.id,
      text: q.text,
      icon: q.icon,
      xp: q.xp,
      target: q.target,
      progress,
      done: progress >= q.target,
      claimed: claimed.has(q.id),
    };
  });
}

// ---------------------------------------------------------------------------
//  Snapshot completo para o frontend.
// ---------------------------------------------------------------------------
function getFullState() {
  const completed = stmt.allProgress.all().map((r) => r.node_id);
  const notes = {};
  for (const n of stmt.allNotes.all()) notes[n.phase_id] = { body: n.body, updatedAt: n.updated_at };
  const timePerTrack = {};
  for (const r of stmt.sessionsByTrack.all()) {
    timePerTrack[r.track_id || "geral"] = { minutes: Math.round(r.s / 60), sessions: r.n };
  }
  const focusByDay = {};
  for (const r of stmt.sessionDays.all()) focusByDay[r.day] = Math.round(r.s / 60);
  return {
    stats: computeStats(),
    completed,
    notes,
    achievements: getAchievements(),
    quests: getDailyQuests(),
    heatmap: dailyXpMap(),
    focusByDay,
    timePerTrack,
    sessions: stmt.recentSessions.all(),
    settings: getSettings(),
  };
}

function getSettings() {
  const name = stmt.getSetting.get("displayName");
  const goal = stmt.getSetting.get("dailyGoalMin");
  return {
    displayName: name ? name.value : "",
    dailyGoalMin: goal ? Number(goal.value) : 30,
  };
}
function setSettings(obj) {
  if (typeof obj.displayName === "string") stmt.setSetting.run("displayName", obj.displayName);
  if (obj.dailyGoalMin != null) stmt.setSetting.run("dailyGoalMin", String(obj.dailyGoalMin));
  return getSettings();
}

module.exports = {
  TRACKS,
  setNodeComplete,
  logSession,
  saveNote,
  getNote: (id) => stmt.getNote.get(id) || null,
  claimQuest,
  resetAll,
  computeStats,
  getAchievements,
  getDailyQuests,
  getFullState,
  getSettings,
  setSettings,
};
