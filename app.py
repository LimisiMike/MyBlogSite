from flask import Flask, jsonify, request, abort
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from models import User, Post, db, login_manager
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'

db.init_app(app)
login_manager.init_app(app)
jwt = JWTManager(app)

migrate = Migrate(app, db)
bcrypt = Bcrypt(app)

@app.route("/api/register", methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data.get('password')).decode('utf-8')
    user = User(username=data.get('username'), email=data.get('email'), password=hashed_password)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201

@app.route("/api/login", methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    remember = data.get('remember', False)  # Default to False if not provided

    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400

    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id)
        return jsonify({'access_token': access_token}), 200

    return jsonify({'message': 'Login unsuccessful. Please check email and password'}), 401

@app.route("/api/logout", methods=['POST'])
@jwt_required()
def logout():
    return jsonify({'message': 'Logged out successfully'}), 200

@app.route("/api/posts", methods=['GET'])
def get_posts():
    posts = Post.query.all()
    posts_list = [{'id': post.id, 'title': post.title, 'content': post.content, 'author': post.author.username} for post in posts]
    return jsonify(posts_list), 200

@app.route("/api/posts", methods=['POST'])
@jwt_required()
def create_post():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    data = request.get_json()
    title = data.get('title')
    content = data.get('content')

    if not title or not content:
        return jsonify({'message': 'Title and content are required'}), 400

    post = Post(title=title, content=content, author=user)
    db.session.add(post)
    db.session.commit()
    return jsonify({
        'id': post.id,
        'title': post.title,
        'content': post.content,
        'author': post.author.username
    }), 201

@app.route("/api/posts/<int:post_id>", methods=['GET'])
def get_post(post_id):
    post = Post.query.get_or_404(post_id)
    return jsonify({'id': post.id, 'title': post.title, 'content': post.content, 'author': post.author.username}), 200

@app.route("/api/posts/<int:post_id>", methods=['PUT'])
@jwt_required()
def update_post(post_id):
    user_id = get_jwt_identity()
    post = Post.query.get_or_404(post_id)

    if post.author.id != user_id:
        return jsonify({'message': 'You are not authorized to update this post'}), 403

    data = request.get_json()
    title = data.get('title')
    content = data.get('content')

    if not title or not content:
        return jsonify({'message': 'Title and content are required'}), 400

    post.title = title
    post.content = content
    db.session.commit()
    return jsonify({'message': 'Post updated successfully'}), 200

@app.route("/api/posts/<int:post_id>", methods=['DELETE'])
@jwt_required()
def delete_post(post_id):
    user_id = get_jwt_identity()
    post = Post.query.get_or_404(post_id)

    if post.author.id != user_id:
        return jsonify({'message': 'You are not authorized to delete this post'}), 403

    db.session.delete(post)
    db.session.commit()
    return jsonify({'message': 'Post deleted successfully'}), 200

if __name__ == "__main__":
    app.run(debug=True)