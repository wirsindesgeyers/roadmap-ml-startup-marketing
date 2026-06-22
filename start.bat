@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Roadmap Quest
echo.
echo   ===========================================================
echo     ROADMAP QUEST - iniciando expedicao...
echo   ===========================================================
echo.
echo   Abrindo http://localhost:4173 no navegador.
echo   Para parar o servidor: feche esta janela ou aperte Ctrl+C.
echo.
start "" http://localhost:4173
node server.js
pause
