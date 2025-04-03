from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Group, GroupMembership, User
from datetime import datetime

group_routes = Blueprint('groups', __name__)

# Get all groups
@group_routes.route('/')
def get_all_groups():
    groups = Group.query.all()
    return jsonify([group.to_dict() for group in groups])

# Get a specific group by id
@group_routes.route('/<int:id>')
def get_group(id):
    group = Group.query.get(id)
    
    if not group:
        return jsonify({"error": "Group not found"}), 404
        
    return jsonify(group.to_dict())

# Join a group
@group_routes.route('/<int:id>/join', methods=['POST'])
@login_required
def join_group(id):
    group = Group.query.get(id)
    
    if not group:
        return jsonify({"error": "Group not found"}), 404
    
    # Check if user is already a member
    existing_membership = GroupMembership.query.filter_by(
        user_id=current_user.id,
        group_id=id
    ).first()
    
    if existing_membership:
        return jsonify({"error": "Already a member of this group"}), 400
    
    # Create new membership
    new_membership = GroupMembership(
        user_id=current_user.id,
        group_id=id,
        joined_at=datetime.now()
    )
    
    db.session.add(new_membership)
    db.session.commit()
    
    return jsonify({"message": f"Successfully joined {group.name}", "membership": new_membership.to_dict()})

# Leave a group
@group_routes.route('/<int:id>/leave', methods=['DELETE'])
@login_required
def leave_group(id):
    group = Group.query.get(id)
    
    if not group:
        return jsonify({"error": "Group not found"}), 404
    
    # Find membership
    membership = GroupMembership.query.filter_by(
        user_id=current_user.id,
        group_id=id
    ).first()
    
    if not membership:
        return jsonify({"error": "Not a member of this group"}), 400
    
    db.session.delete(membership)
    db.session.commit()
    
    return jsonify({"message": f"Successfully left {group.name}"})

# Create a new group (for future implementation)
@group_routes.route('/', methods=['POST'])
@login_required
def create_group():
    data = request.json
    
    if not data.get('name'):
        return jsonify({"error": "Group name is required"}), 400
    
    new_group = Group(
        name=data.get('name'),
        description=data.get('description', ''),
        thumbnail=data.get('thumbnail', '')
    )
    
    db.session.add(new_group)
    db.session.commit()
    
    # Automatically add creator as a member
    new_membership = GroupMembership(
        user_id=current_user.id,
        group_id=new_group.id,
        joined_at=datetime.now()
    )
    
    db.session.add(new_membership)
    db.session.commit()
    
    return jsonify(new_group.to_dict()), 201
