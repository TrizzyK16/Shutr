from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User
from datetime import datetime

pro_routes = Blueprint('pro', __name__)

# Upgrade to Pro membership
@pro_routes.route('/', methods=['POST'])
@login_required
def upgrade_to_pro():
    # Check if user is already a Pro member
    if current_user.is_pro:
        return jsonify({"error": "Already a Pro member"}), 400
    
    # In a real application, you would process payment here
    # For now, we'll just update the user's status
    
    current_user.is_pro = True
    current_user.pro_since = datetime.now()
    
    db.session.commit()
    
    return jsonify({
        "message": "Successfully upgraded to Pro membership",
        "user": current_user.to_dict()
    })

# Downgrade from Pro membership
@pro_routes.route('/', methods=['DELETE'])
@login_required
def downgrade_from_pro():
    # Check if user is a Pro member
    if not current_user.is_pro:
        return jsonify({"error": "Not a Pro member"}), 400
    
    # In a real application, you would handle subscription cancellation here
    
    current_user.is_pro = False
    # Keep pro_since for historical purposes
    
    db.session.commit()
    
    return jsonify({
        "message": "Successfully downgraded from Pro membership",
        "user": current_user.to_dict()
    })

# Check Pro status
@pro_routes.route('/', methods=['GET'])
@login_required
def check_pro_status():
    return jsonify({
        "is_pro": current_user.is_pro,
        "pro_since": current_user.pro_since.isoformat() if current_user.pro_since else None
    })
