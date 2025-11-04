from flask import Flask, request, jsonify
from flask_cors import CORS
import requests as pyrequests

app = Flask(__name__)
CORS(app)


@app.route('/api/request', methods=['POST'])
def api_request():
    data = request.get_json(force=True)
    url = data.get('url')
    if not url:
        return jsonify({'error': 'url is required'}), 400

    method = data.get('method', 'get').lower()
    params = data.get('params')
    payload = data.get('data')
    json_payload = data.get('json')

    try:
        if method == 'get':
            resp = pyrequests.get(url, params=params, timeout=30)
        elif method == 'post':
            resp = pyrequests.post(url, data=payload, json=json_payload, timeout=30)
        elif method == 'put':
            resp = pyrequests.put(url, data=payload, json=json_payload, timeout=30)
        elif method == 'patch':
            resp = pyrequests.patch(url, data=payload, json=json_payload, timeout=30)
        elif method == 'delete':
            resp = pyrequests.delete(url, timeout=30)
        elif method == 'head':
            resp = pyrequests.head(url, timeout=30)
        else:
            return jsonify({'error': f'Unsupported method: {method}'}), 400

        result = {
            'status_code': resp.status_code,
            'headers': dict(resp.headers),
            'body': resp.text,
        }
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
