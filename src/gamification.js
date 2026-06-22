// =============================================================================
//  gamification.js — Regras puras de XP, níveis, conquistas e missões diárias.
//  Sem dependência de DB: recebe estatísticas e devolve estado de jogo.
// =============================================================================

const XP_VALUES = {
  item: 10,
  exit: 50,
  project: 100,
  appendix: 15,
};

// Títulos de nível — sobe de patente conforme avança.
const LEVEL_TITLES = [
  "Curioso", // 1
  "Aprendiz", // 2
  "Iniciante Aplicado", // 3
  "Praticante", // 4
  "Construtor", // 5
  "Engenheiro Júnior", // 6
  "Engenheiro", // 7
  "Hacker de Produto", // 8
  "Fundador em Treino", // 9
  "Operador", // 10
  "Estrategista", // 11
  "Arquiteto de IA", // 12
  "Founder Full-Stack", // 13
  "Mestre das Trilhas", // 14
  "Lenda do Roadmap", // 15+
];

// XP cumulativo necessário para ATINGIR cada nível (índice = nível-1).
// Curva quadrática suave: nível N exige ~ 75*(N-1)^1.55 acumulado.
function xpForLevel(level) {
  if (level <= 1) return 0;
  let total = 0;
  for (let i = 2; i <= level; i++) {
    total += Math.round(60 * Math.pow(i - 1, 1.45)) + 40;
  }
  return total;
}

function levelInfo(totalXp) {
  let level = 1;
  while (xpForLevel(level + 1) <= totalXp && level < 999) level++;
  const floor = xpForLevel(level);
  const next = xpForLevel(level + 1);
  const span = next - floor;
  const into = totalXp - floor;
  const title = LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)];
  return {
    level,
    title,
    totalXp,
    xpIntoLevel: into,
    xpForNextLevel: span,
    xpRemaining: next - totalXp,
    progressPct: span > 0 ? Math.round((into / span) * 100) : 100,
  };
}

// ---------------------------------------------------------------------------
//  Conquistas — cada uma com uma condição avaliada sobre o objeto `stats`.
//  bonus = XP extra concedido ao desbloquear.
// ---------------------------------------------------------------------------
const ACHIEVEMENTS = [
  { id: "first-step", name: "Primeiro Passo", icon: "👣", bonus: 20,
    desc: "Conclua seu primeiro nó.", tier: "bronze",
    check: (s) => s.completedNodes >= 1 },
  { id: "ten-nodes", name: "Aquecendo", icon: "🔥", bonus: 30,
    desc: "Conclua 10 nós.", tier: "bronze",
    check: (s) => s.completedNodes >= 10 },
  { id: "fifty-nodes", name: "Em Ritmo", icon: "⚡", bonus: 60,
    desc: "Conclua 50 nós.", tier: "prata",
    check: (s) => s.completedNodes >= 50 },
  { id: "hundred-nodes", name: "Centenário", icon: "💯", bonus: 120,
    desc: "Conclua 100 nós.", tier: "ouro",
    check: (s) => s.completedNodes >= 100 },
  { id: "first-project", name: "Shipou!", icon: "📦", bonus: 50,
    desc: "Conclua seu primeiro projeto de portfólio.", tier: "prata",
    check: (s) => s.projectsDone >= 1 },
  { id: "five-projects", name: "Portfólio Vivo", icon: "🗂️", bonus: 100,
    desc: "Conclua 5 projetos de portfólio.", tier: "ouro",
    check: (s) => s.projectsDone >= 5 },
  { id: "all-projects", name: "Construtor Implacável", icon: "🏗️", bonus: 250,
    desc: "Conclua TODOS os projetos de portfólio.", tier: "lendário",
    check: (s) => s.projectsDone >= s.totalProjects && s.totalProjects > 0 },
  { id: "exit-master", name: "Sem Tutorial", icon: "🎯", bonus: 80,
    desc: "Cheque 5 exit criteria.", tier: "prata",
    check: (s) => s.exitsDone >= 5 },
  { id: "phase-clear", name: "Fase Limpa", icon: "✅", bonus: 60,
    desc: "Complete 100% de uma fase.", tier: "prata",
    check: (s) => s.phasesCompleted >= 1 },
  { id: "track-tecnica", name: "Engenheiro de IA", icon: "🧠", bonus: 300,
    desc: "Complete 100% da Trilha Técnica.", tier: "lendário",
    check: (s) => s.tracksCompleted.includes("tecnica") },
  { id: "track-saas", name: "Fundador", icon: "🚀", bonus: 300,
    desc: "Complete 100% da Trilha SaaS.", tier: "lendário",
    check: (s) => s.tracksCompleted.includes("saas") },
  { id: "track-dist", name: "Mestre do Growth", icon: "📡", bonus: 300,
    desc: "Complete 100% da Trilha de Distribuição.", tier: "lendário",
    check: (s) => s.tracksCompleted.includes("distribuicao") },
  { id: "polymath", name: "Polímata", icon: "👑", bonus: 1000,
    desc: "Complete as TRÊS trilhas. O objetivo final.", tier: "lendário",
    check: (s) => s.tracksCompleted.length >= 3 },
  { id: "streak-3", name: "Pegando o Hábito", icon: "📈", bonus: 30,
    desc: "Mantenha 3 dias de ofensiva (streak).", tier: "bronze",
    check: (s) => s.maxStreak >= 3 },
  { id: "streak-7", name: "Uma Semana de Ferro", icon: "🗓️", bonus: 80,
    desc: "Mantenha 7 dias de ofensiva.", tier: "prata",
    check: (s) => s.maxStreak >= 7 },
  { id: "streak-30", name: "Disciplina Brutal", icon: "🥋", bonus: 300,
    desc: "Mantenha 30 dias de ofensiva.", tier: "ouro",
    check: (s) => s.maxStreak >= 30 },
  { id: "focus-60", name: "Deep Work", icon: "⏳", bonus: 40,
    desc: "Acumule 60 minutos de foco cronometrado.", tier: "bronze",
    check: (s) => s.totalMinutes >= 60 },
  { id: "focus-600", name: "10 Horas Voadas", icon: "🛬", bonus: 120,
    desc: "Acumule 10 horas de foco cronometrado.", tier: "ouro",
    check: (s) => s.totalMinutes >= 600 },
  { id: "note-taker", name: "Segundo Cérebro", icon: "📝", bonus: 40,
    desc: "Escreva notas em 3 fases diferentes.", tier: "bronze",
    check: (s) => s.notesCount >= 3 },
  { id: "scholar", name: "Rato de Biblioteca", icon: "📚", bonus: 60,
    desc: "Leia 5 apêndices.", tier: "prata",
    check: (s) => s.appendicesRead >= 5 },
  { id: "level-5", name: "Construtor (Nv.5)", icon: "🏅", bonus: 50,
    desc: "Alcance o nível 5.", tier: "prata",
    check: (s) => s.level >= 5 },
  { id: "level-10", name: "Operador (Nv.10)", icon: "🎖️", bonus: 150,
    desc: "Alcance o nível 10.", tier: "ouro",
    check: (s) => s.level >= 10 },
  { id: "quest-10", name: "Caçador de Missões", icon: "🎲", bonus: 80,
    desc: "Complete 10 missões diárias.", tier: "prata",
    check: (s) => s.questsClaimed >= 10 },
];

// ---------------------------------------------------------------------------
//  Missões diárias — 3 por dia, escolhidas de forma determinística pela data.
// ---------------------------------------------------------------------------
const DAILY_QUEST_POOL = [
  { id: "q-nodes-3", text: "Conclua 3 nós hoje", metric: "nodesToday", target: 3, xp: 40, icon: "✔️" },
  { id: "q-nodes-5", text: "Conclua 5 nós hoje", metric: "nodesToday", target: 5, xp: 70, icon: "✔️" },
  { id: "q-focus-25", text: "Faça 25 min de foco (1 pomodoro)", metric: "minutesToday", target: 25, xp: 50, icon: "⏱️" },
  { id: "q-focus-50", text: "Faça 50 min de foco hoje", metric: "minutesToday", target: 50, xp: 90, icon: "⏱️" },
  { id: "q-note-1", text: "Escreva uma nota de estudo", metric: "notesToday", target: 1, xp: 30, icon: "📝" },
  { id: "q-exit-1", text: "Cheque 1 exit criteria", metric: "exitsToday", target: 1, xp: 60, icon: "🎯" },
  { id: "q-xp-100", text: "Ganhe 100 XP hoje", metric: "xpToday", target: 100, xp: 50, icon: "✨" },
  { id: "q-appendix-1", text: "Leia 1 apêndice", metric: "appendicesToday", target: 1, xp: 35, icon: "📖" },
];

// Hash determinístico simples a partir de string.
function hashStr(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pickDailyQuests(dateStr) {
  const seed = hashStr(dateStr);
  const pool = [...DAILY_QUEST_POOL];
  const chosen = [];
  let s = seed;
  for (let i = 0; i < 3 && pool.length; i++) {
    s = (Math.imul(s, 1103515245) + 12345) >>> 0;
    const idx = s % pool.length;
    chosen.push(pool.splice(idx, 1)[0]);
  }
  return chosen;
}

module.exports = {
  XP_VALUES,
  LEVEL_TITLES,
  xpForLevel,
  levelInfo,
  ACHIEVEMENTS,
  DAILY_QUEST_POOL,
  pickDailyQuests,
};
