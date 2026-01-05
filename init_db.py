import sqlite3
import json
from datetime import datetime
from typing import List, Dict, Any
from contextlib import contextmanager

DB_NAME = 'postman.db'

@contextmanager
def get_db_connection():
    """Context manager for database connections to ensure proper cleanup.
    
    Note: check_same_thread=False is used because Flask may handle requests
    in different threads. The context manager ensures each request gets its
    own connection that is properly closed, maintaining thread safety.
    """
    conn = sqlite3.connect(DB_NAME, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()

def init_db():
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS requests (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                method TEXT,
                url TEXT,
                headers TEXT,
                body TEXT,
                response TEXT,
                status_code INTEGER,
                last_run TEXT
            )
        ''')
        conn.commit()

def row_to_dict(row):
    if row is None:
        return None
    data = dict(row)

    try:
        data['headers'] = json.loads(data.get('headers') or "{}")
    except Exception:
        data['headers'] = {}

    # Try to parse stored response if it was saved as JSON (we store either a plain string or a JSON string)
    resp_raw = data.get('response')
    if resp_raw is None:
        data['response'] = None
    else:
        try:
            parsed = json.loads(resp_raw)
            data['response'] = parsed
        except Exception:
            # keep as raw string if not JSON
            data['response'] = resp_raw

    return data

def save_request(name: str, method: str, url: str, headers: Dict, body: Any, response: str, status_code: int):
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO requests (name, method, url, headers, body, response, status_code, last_run)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            name,
            method,
            url,
            json.dumps(headers or {}),
            json.dumps(body or {}),
            response,
            status_code,
            datetime.now().isoformat()
        ))
        conn.commit()

def get_all_requests() -> List[Dict]:
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM requests ORDER BY id DESC")
        rows = cursor.fetchall()
        return [row_to_dict(row) for row in rows]

def get_request_by_id(req_id: int) -> Dict:
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM requests WHERE id = ?", (req_id,))
        row = cursor.fetchone()
        return row_to_dict(row)


def update_request(req_id, name, method, url, headers, body, response, status_code):
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute('''
            UPDATE requests
            SET name = ?, 
                method = ?, 
                url = ?, 
                headers = ?, 
                body = ?, 
                response = ?, 
                status_code = ?, 
                last_run = ?
            WHERE id = ?
        ''', (
            name,
            method,
            url,
            json.dumps(headers or {}),
            json.dumps(body or {}),
            json.dumps(response) if isinstance(response, (dict, list)) else response,
            status_code,
            datetime.now().isoformat(),
            req_id
        ))
        conn.commit()



def delete_request(req_id: int):
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM requests WHERE id = ?", (req_id,))
        conn.commit()


if __name__ == '__main__':
    init_db()   
