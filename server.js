// =============================================================================
//  server.js — Servidor HTTP nativo (zero dependências). Serve a SPA e a API.
//  Rode com:  node server.js   (Node 22+; testado em Node 26)
// =============================================================================

const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { URL } = require("node:url");

const db = require("./src/db");
const { TRACKS } = require("./src/content");

const PORT = Number(process.env.PORT || 4173);
const PUBLIC_DIR = path.join(__dirname, "public");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

function send(res, code, data, headers = {}) {
  const body = typeof data === "string" || Buffer.isBuffer(data) ? data : JSON.stringify(data);
  res.writeHead(code, { "Content-Type": "application/json; charset=utf-8", ...headers });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
  });
}

function serveStatic(req, res, pathname) {
  let rel = pathname === "/" ? "/index.html" : pathname;
  rel = decodeURIComponent(rel).replace(/\.\.+/g, "");
  const file = path.join(PUBLIC_DIR, rel);
  if (!file.startsWith(PUBLIC_DIR)) return send(res, 403, { error: "forbidden" });
  fs.readFile(file, (err, content) => {
    if (err) {
      // fallback SPA
      fs.readFile(path.join(PUBLIC_DIR, "index.html"), (e2, html) => {
        if (e2) return send(res, 404, { error: "not found" });
        res.writeHead(200, { "Content-Type": MIME[".html"] });
        res.end(html);
      });
      return;
    }
    const ext = path.extname(file);
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream", "Cache-Control": "no-cache" });
    res.end(content);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const p = url.pathname;

  try {
    // -------------------- API --------------------
    if (p === "/api/content" && req.method === "GET") {
      return send(res, 200, { tracks: TRACKS });
    }

    if (p === "/api/state" && req.method === "GET") {
      return send(res, 200, db.getFullState());
    }

    if (p === "/api/node" && req.method === "POST") {
      const { nodeId, completed } = await readBody(req);
      if (!nodeId) return send(res, 400, { error: "nodeId obrigatório" });
      const r = db.setNodeComplete(nodeId, !!completed);
      return send(res, 200, { ...r, state: db.getFullState() });
    }

    if (p === "/api/session" && req.method === "POST") {
      const { seconds, trackId, label } = await readBody(req);
      if (!seconds || seconds < 1) return send(res, 400, { error: "seconds inválido" });
      const r = db.logSession({ seconds, trackId, label });
      return send(res, 200, { ...r, state: db.getFullState() });
    }

    if (p === "/api/note" && req.method === "POST") {
      const { phaseId, body } = await readBody(req);
      if (!phaseId) return send(res, 400, { error: "phaseId obrigatório" });
      const r = db.saveNote(phaseId, body);
      return send(res, 200, { ...r, state: db.getFullState() });
    }

    if (p === "/api/quest/claim" && req.method === "POST") {
      const { questId } = await readBody(req);
      const r = db.claimQuest(questId);
      return send(res, r.ok ? 200 : 400, { ...r, state: db.getFullState() });
    }

    if (p === "/api/settings" && req.method === "POST") {
      const body = await readBody(req);
      const s = db.setSettings(body);
      return send(res, 200, { ok: true, settings: s });
    }

    if (p === "/api/reset" && req.method === "POST") {
      db.resetAll();
      return send(res, 200, { ok: true, state: db.getFullState() });
    }

    if (p.startsWith("/api/")) {
      return send(res, 404, { error: "rota não encontrada" });
    }

    // -------------------- Estáticos --------------------
    return serveStatic(req, res, p);
  } catch (err) {
    console.error(err);
    return send(res, 500, { error: String(err && err.message || err) });
  }
});

server.listen(PORT, () => {
  const line = "═".repeat(54);
  console.log("\n" + line);
  console.log("  🎮  ROADMAP QUEST  —  servidor no ar");
  console.log(line);
  console.log(`  ▶  Abra no navegador:  http://localhost:${PORT}`);
  console.log(`  💾  Banco SQLite:      ./data/progress.db`);
  console.log(`  ⏹  Para parar:         Ctrl + C`);
  console.log(line + "\n");
});
