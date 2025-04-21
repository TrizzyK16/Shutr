import os
from flask import Flask, render_template, request, session, redirect, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.photo_routes import photo_routes
from .api.group_routes import group_routes
from .api.event_routes import event_routes
from .api.pro_routes import pro_routes
from .api.favorite_routes import favorite_routes
from .api.album_routes import album_routes
from .seeds import seed_commands
from .config import Config

# Initialize extensions
csrf = CSRFProtect()
login = LoginManager()
login.login_view = 'auth.unauthorized'

@login.user_loader
def load_user(id):
    return User.query.get(int(id))

app = Flask(__name__, static_folder='../react-vite/dist', static_url_path='/')
app.config.from_object(Config)
app.config['WTF_CSRF_TIME_LIMIT'] = 3600  # Token expiration in seconds
app.config['WTF_CSRF_CHECK_DEFAULT'] = True
app.config['WTF_CSRF_ENABLED'] = True

# Initialize extensions with app
csrf.init_app(app)
login.init_app(app)
db.init_app(app)

# Set PostgreSQL search_path to shutr_schema,public if in production
from sqlalchemy import event
from sqlalchemy.engine import Engine

def set_search_path(schema):
    @event.listens_for(Engine, "connect")
    def set_path(dbapi_connection, connection_record):
        cursor = dbapi_connection.cursor()
        cursor.execute(f'SET search_path TO {schema},public')
        cursor.close()

if os.environ.get('FLASK_ENV') == 'production':
    schema = os.environ.get('SCHEMA', 'public')
    set_search_path(schema)

Migrate(app, db)

# Register blueprints
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(photo_routes, url_prefix='/api/photos')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(group_routes, url_prefix='/api/groups')
app.register_blueprint(event_routes, url_prefix='/api/events')
app.register_blueprint(pro_routes, url_prefix='/api/pro')
app.register_blueprint(favorite_routes, url_prefix='/api/favorites')
app.register_blueprint(album_routes, url_prefix='/api/albums')

# Tell flask about our seed commands
app.cli.add_command(seed_commands)

# Configure CORS
import os

if os.environ.get('FLASK_ENV') == 'production':
    # Replace with your actual deployed frontend domains as needed
    origins = ["https://shutr-3wnm.onrender.com", "https://shutr-3wnm.onrender.com"]
else:
    origins = ["http://localhost:5173"]

CORS(app, resources={r"/api/*": {"origins": origins, "supports_credentials": True}})
# HTTPS redirect for production
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)

# CSRF token injection
@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get('FLASK_ENV') == 'production' else None,
        httponly=False)  # Changed to False so JavaScript can access it
    return response

# CSRF token endpoint
@app.route("/api/csrf/restore", methods=["GET"])
def restore_csrf():
    return {"csrf_token": generate_csrf()}

# API documentation endpoint
@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    route_list = { rule.rule: [[ method for method in rule.methods if method in acceptable_methods ],
                    app.view_functions[rule.endpoint].__doc__ ]
                    for rule in app.url_map.iter_rules() if rule.endpoint != 'static' }
    return route_list

# React app routes
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')

# Error handlers
@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

@app.errorhandler(400)
def bad_request(e):
    return jsonify({"error": "Bad request", "message": str(e)}), 400

@app.errorhandler(401)
def unauthorized(e):
    return jsonify({"error": "Unauthorized", "message": str(e)}), 401

@app.errorhandler(403)
def forbidden(e):
    return jsonify({"error": "Forbidden", "message": str(e)}), 403

@app.errorhandler(500)
def server_error(e):
    return jsonify({"error": "Internal server error", "message": str(e)}), 500