# 🧭 Roadmap Quest

Sistema web gamificado para estudar as **três trilhas** do roadmap de fundador técnico de IA:

| Trilha | Foco | Fases | Apêndices |
| --- | --- | --- | --- |
| 🧠 **Técnica** | IA, LLMs, RAG, MLOps (código primeiro, mat. just-in-time) | 9 | 8 |
| 🚀 **SaaS Startupeiro** | Validação, MVP, LGPD, captação BR/amazônica, VC | 7 | 8 |
| 📡 **Distribuição** | Marketing, audiência, growth com IA (Codex-first) | 7 | 6 |

**Todo o conteúdo dos 3 documentos markdown está dentro do app** (densidade integral): trilhas, fases, itens, *exit criteria*, projetos de portfólio, dicas Codex e **todos os apêndices** — bibliografias por fase, pessoas para seguir, comunidades, networking de Manaus, modo brutal, planos de 90 dias, notas de atualização e **as seções de Referências com 58 links clicáveis**.

São **147 nós marcáveis** no total (121 nas fases + 26 apêndices).

## ▶️ Como rodar (Windows)

**Pré-requisito:** Node.js **22.5+** (testado no Node 26). Verifique com `node --version`.
Não precisa instalar nada — **zero dependências** (usa o SQLite nativo do Node, `node:sqlite`).

**Jeito fácil:** dê dois cliques em **`start.bat`**. Ele abre o navegador e sobe o servidor.

**Pelo terminal:**
```bash
cd roadmap-quest
node server.js
```
Depois abra **http://localhost:4173** no navegador.

> Quer outra porta? `PORT=8080 node server.js` (ou no PowerShell: `$env:PORT=8080; node server.js`).

## 💾 Onde fica o progresso

Tudo é salvo localmente em **`data/progress.db`** (arquivo SQLite real). Sem login, sem nuvem, sem internet obrigatória — é só seu. Faça backup desse arquivo se quiser preservar/migrar o progresso. O botão **Reset** (lateral) apaga tudo.

## 🧭 Pensado para estudar do zero ao hero

- **"Onde você está"** no dashboard: mostra o próximo passo recomendado em cada trilha, com botão para pular direto pra ele.
- **Mapa de Convergência** (menu lateral 🗺️): as 3 trilhas alinhadas no tempo (Início → Construção → Produção → Maturidade) — porque elas rodam **em paralelo**, não em série. Mostra progresso ao vivo e leva a qualquer fase.
- **"📍 Você está aqui"**: a fase atual de cada trilha vem destacada e já aberta.
- **Legenda explícita** de XP e símbolos (⏱ duração · ✅ exit · 📦 projeto · 🤖 Codex) sempre à vista.
- Tracking explícito em todo lugar: "X/Y nós", "Z/W fases", % por fase/trilha/geral, e tempo de foco.

## 🎮 O que tem de gamificação

- **XP e níveis** com títulos que evoluem (Curioso → … → Lenda do Roadmap). Itens valem 10 XP, exit criteria 50, projetos 100, apêndices 15.
- **Streak (ofensiva)** diária com chama; recorde histórico.
- **23 conquistas** em 4 tiers (bronze/prata/ouro/lendário), cada uma com XP bônus.
- **Missões diárias** (3/dia, renovam à meia-noite) com recompensa.
- **Modo Foco (Pomodoro)** que cronometra estudo, vira XP e alimenta o streak.
- **Notas** por fase (salvam sozinhas).
- **Métricas**: XP acumulado (gráfico), domínio por trilha (anéis), esforço por trilha, mapa de constância (heatmap estilo GitHub), tempo de foco por trilha, breakdown de marcos.
- **Anéis de progresso** por nível, fase e trilha; toasts de XP e modal de level-up.

## 🗂️ Estrutura

```
roadmap-quest/
├─ server.js          # servidor HTTP nativo (API REST + estáticos)
├─ start.bat          # atalho de inicialização (Windows)
├─ src/
│  ├─ content.js      # TODO o conteúdo das 3 trilhas (markdown)
│  ├─ db.js           # SQLite (node:sqlite): progresso, XP, sessões, notas...
│  └─ gamification.js # regras de XP, níveis, conquistas, missões
├─ public/
│  ├─ index.html      # shell da SPA
│  ├─ styles.css      # design "Mission Control bioluminescente"
│  └─ app.js          # SPA (router, render, efeitos, gráficos) — sem libs
└─ data/
   └─ progress.db     # criado no 1º uso (seu progresso)
```

## 🔌 API (REST, local)

| Método | Rota | Ação |
| --- | --- | --- |
| GET | `/api/content` | conteúdo das trilhas |
| GET | `/api/state` | snapshot completo (stats, progresso, conquistas, missões, heatmap) |
| POST | `/api/node` | marca/desmarca um nó `{nodeId, completed}` |
| POST | `/api/session` | registra sessão de foco `{seconds, trackId?, label?}` |
| POST | `/api/note` | salva nota de fase `{phaseId, body}` |
| POST | `/api/quest/claim` | resgata missão `{questId}` |
| POST | `/api/settings` | salva nome/meta diária |
| POST | `/api/reset` | apaga todo o progresso |

Feito para rodar na sua máquina. Bons estudos — e bora shipar. 🚀
