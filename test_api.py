from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Enable CORS for frontend interaction

posts = [
    {"id": 1, "title": "Post 1", "body": "Content 1"},
    {"id": 2, "title": "Post 2", "body": "Content 2"}
]
next_id = 3

@app.route('/my_posts', methods=['GET'])
def get_posts():
    return jsonify(posts)

@app.route('/my_posts/<int:post_id>', methods=['GET'])
def get_post(post_id):
    post = next((p for p in posts if p['id'] == post_id), None)
    if post:
        return jsonify(post)
    return jsonify({"message": "Post not found"}), 404

@app.route('/my_posts', methods=['POST'])
def create_post():
    global next_id
    new_post = request.json
    new_post['id'] = next_id
    posts.append(new_post)
    next_id += 1
    return jsonify(new_post), 201

@app.route('/my_posts/<int:post_id>', methods=['PUT'])
def update_post(post_id):
    post = next((p for p in posts if p['id'] == post_id), None)
    if not post:
        return jsonify({"message": "Post not found"}), 404
    
    data = request.json
    post.update(data) # Update existing post with new data
    post['id'] = post_id # Ensure ID doesn't change
    return jsonify(post)

@app.route('/my_posts/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    global posts
    original_len = len(posts)
    posts = [p for p in posts if p['id'] != post_id]
    if len(posts) < original_len:
        return jsonify({"message": "Post deleted"}), 200
    return jsonify({"message": "Post not found"}), 404

if __name__ == '__main__':
    app.run(port=5001, debug=True) # Run on a different port than LitePost's backend