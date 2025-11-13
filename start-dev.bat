@echo off
REM start-dev.bat - start backend and frontend in separate cmd windows

chcp 65001 >nul
cd /d %~dp0

:: Create venv if missing
if not exist ".venv\Scripts\activate" (
  echo Creating virtual environment...
  python -m venv .venv
)

:StartBackend
echo Starting backend in a new window...
start "Backend" cmd /k "cd /d %~dp0 && call .venv\Scripts\activate && pip install -r requirements.txt && python app_api.py"

:StartFrontend
echo Starting frontend in a new window...
start "Frontend" cmd /k "cd /d %~dp0front && npm install && npm run dev"

necho Dev servers started. Check the new windows for logs.
exit /b 0
