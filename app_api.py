from flask import Flask, request, jsonify
from flask_cors import CORS
import requests as pyrequests
from init_db import get_all_requests, get_request_by_id, save_request, update_request, delete_request

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
    
@app.route('/requests', methods=['GET'])
def list_requests():
    data = get_all_requests()
    return jsonify(data)


@app.route('/request/<int:req_id>', methods=['GET'])
def get_request(req_id):
    data = get_request_by_id(req_id)
    if not data:
        return jsonify({'error': 'not found'}), 404
    return jsonify(data)

@app.route('/request', methods=['POST'])
def create_request():
    payload = request.json

    save_request(
        name=payload.get('name'),
        method=payload.get('method'),
        url=payload.get('url'),
        headers=payload.get('headers'),
        body=payload.get('body'),
        response="",
        status_code=0
    )

    return jsonify({'message': 'saved'})

@app.route('/request/<int:req_id>', methods=['PUT'])
def update_request_api(req_id):
    payload = request.json

    update_request(
        req_id=req_id,
        name=payload.get('name'),
        method=payload.get('method'),
        url=payload.get('url'),
        headers=payload.get('headers'),
        body=payload.get('body'),
        response=payload.get('response'),
        status_code=payload.get('status_code')
    )

    return jsonify({'message': 'updated'})


@app.route('/request/<int:req_id>', methods=['DELETE'])
def delete_request_api(req_id):
    delete_request(req_id)
    return jsonify({'message': 'deleted'})





if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
