# Postman (local)

A lightweight Postman-like HTTP client. This project pairs a React + Vite frontend with a small Flask backend that performs outbound HTTP requests and stores saved requests in a local SQLite database.

This README explains how to install, run and develop the project on Windows (cmd.exe). It also documents the backend API and the database format so you can extend the app.

Table of contents
- Overview
- Features
- Prerequisites
- Quick start (run both servers)
- Backend: install, initialize DB, run
- Frontend: install and run
- API reference and examples
- How saved responses are stored
- Troubleshooting
- Development notes & suggestions
- Contributing
- Useful commands

---

## Overview

The repository contains two main parts:

- `app_api.py`: Flask backend that exposes an API for performing outbound HTTP requests and CRUD endpoints for saved requests (SQLite).
- `init_db.py`: database helper + schema and convenience functions.
- `front/`: Vite + React frontend. The UI lets you create/select saved requests, send them via the backend, and view response body and headers.

---

## Features

- Create, rename and delete saved requests (stored in SQLite).
- Select a saved request tab to prefill method and URL into the request editor.
- Send requests through the backend (GET, POST, PUT, PATCH, DELETE, HEAD supported).
- Responses (body + headers) are persisted with the saved request so switching tabs shows previously-run responses.
- Response body displayed with the Monaco editor for nicer formatting.

---

## Prerequisites

- Node.js 16+ and npm (for frontend)
- Python 3.8+ and pip (for backend)

On Windows (cmd) verify:

```cmd
node -v
npm -v
python --version
pip --version
```

---

## Quick start (run both servers)

These condensed steps get you running quickly. Full instructions follow.

1) Initialize Python environment and DB, then start backend:

```cmd
cd d:\project\postman
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
python -c "from init_db import init_db; init_db()"
python app_api.py
```

2) In a second terminal, start the frontend:

```cmd
cd d:\project\postman\front
npm install
npm run dev
```

3) Open the dev URL printed by Vite (usually http://localhost:5173) and use the UI. The backend listens on http://localhost:5000 by default.

---

## Backend: install, initialize DB, run (detailed)

1. Create and activate a virtual environment (recommended):

```cmd
cd d:\project\postman
python -m venv .venv
.\.venv\Scripts\activate
```

2. Install dependencies:

```cmd
pip install -r requirements.txt
```

3. Initialize the SQLite database (creates `postman.db`):

```cmd
python -c "from init_db import init_db; init_db()"
```

4. Run the API server:

```cmd
python app_api.py
```

You should see the Flask server start on `http://localhost:5000`.

Notes
- `app_api.py` depends on `init_db.py` functions for CRUD. The DB file `postman.db` is created in the repository root.
- The server uses `flask-cors` to allow requests from the Vite dev server.

---

## Frontend: install and run (detailed)

1. Install dependencies and start the dev server:

```cmd
cd d:\project\postman\front
npm install
npm run dev
```

2. Open the Vite dev URL (usually http://localhost:5173).

Notes
- The frontend calls the API at `http://localhost:5000` by default. If you need to configure a different backend, update `front/src/App.jsx` where the fetch calls are made, or configure a Vite proxy in `front/vite.config.js`.

---

## API reference (backend)

Base URL: `http://localhost:5000`

- POST `/api/request` — perform outbound request
  - Request body (JSON):
    - `url` (string, required)
    - `method` (string, optional: get|post|put|patch|delete|head)
    - `params`, `data`, `json` (optional)
  - Response (JSON): `{ status_code, headers, body }`

Example (curl):

```cmd
curl -X POST http://localhost:5000/api/request -H "Content-Type: application/json" -d "{\"url\": \"https://httpbin.org/get\", \"method\": \"get\"}"
```

- GET `/requests` — list saved requests

- GET `/request/<id>` — get one saved request

- POST `/request` — create a new saved request (body: `name, method, url, headers, body`)

- PUT `/request/<id>` — update saved request (send JSON with fields to update; this project writes the full row)

- DELETE `/request/<id>` — delete saved request

---

## How saved responses are stored

When you send a request from the UI, the backend returns `{ body, headers }`. The frontend will update the saved request (if it has an `id`) and store the response in the `response` DB column as a JSON string: `{"body":"...","headers":{...}}`.

`init_db.row_to_dict` will parse that JSON back into an object when the frontend requests saved rows — the frontend `Response` component handles either an object or raw string gracefully.

---

## Common issues & troubleshooting

- CORS errors: make sure the Flask server is running. `app_api.py` uses `flask-cors` to allow requests from other origins. If your dev server runs on a different host/port, update CORS or use a proxy.
- Backend import errors in editor: install Python packages in the exact environment your editor uses.
- No response shown on tab switch: ensure the DB `response` column contains valid JSON (see `How saved responses are stored`). The app now parses JSON responses; plain strings are shown as body text.
- Uncaught fetch/network errors: open devtools console for network failures and backend logs in the terminal for stack traces.

---

## Development notes & suggestions

- The backend executes arbitrary outbound HTTP requests — do not expose this service publicly without hardening.
- Consider splitting response `headers` into a dedicated DB column for easier queries and future UI features.
- Add unit/integration tests for endpoints and React components to ensure stability.
- Add a small CLI or `.bat` script to start both backend and frontend together.

---

## Contributing

1. Fork or branch the repository
2. Make changes and verify they work locally
3. Open a pull request with a description of changes

Helpful tips
- Keep changes small and self-contained.
- Include a short README for larger features.

---

## Useful commands (Windows cmd)

Activate venv and run backend

```cmd
cd d:\project\postman
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
python app_api.py
```

Start frontend

```cmd
cd d:\project\postman\front
npm install
npm run dev
```

Initialize DB (one-time)

```cmd
python -c "from init_db import init_db; init_db()"
```

Dump saved requests (quick check)

```cmd
python - <<PY
from init_db import get_all_requests
print(get_all_requests())
PY
```

---

If you want, I can also:

- Add a `start-dev.bat` to launch both servers with one command.
- Create a seed script that inserts an example saved request into the DB for easier testing.
- Add a short `front/README.md` that documents `VITE_API_URL` usage and a Vite proxy example.

Tell me which of those you'd like and I'll add it.

