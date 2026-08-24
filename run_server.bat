@echo off
title Chacra Don Andres - Servidor Local
echo ====================================================
echo   Chacra Don Andres - Experiencia Web & Tour 360
echo ====================================================
echo.
echo Iniciando servidor local en Python...
cd /d "%~dp0"
python serve.py
if %ERRORLEVEL% NEQ 0 (
    echo Error iniciando con python, intentando abrir directamente index.html...
    start index.html
)
pause
