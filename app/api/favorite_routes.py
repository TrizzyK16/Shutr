from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Photo, Favorite
from sqlalchemy.exc import SQLAlchemyError

favorite_routes = Blueprint('favorites', __name__)

@favorite_routes.route('', methods=['GET'])
@login_required
def get_user_favorites():
    """
    Get all favorites for the current user
    """
    try:
        favorites = Favorite.query.filter(Favorite.user_id == current_user.id).all()
        return jsonify([favorite.to_dict() for favorite in favorites]), 200
    except SQLAlchemyError as e:
        return jsonify({"error": str(e)}), 500

@favorite_routes.route('/<int:photo_id>', methods=['POST'])
@login_required
def add_favorite(photo_id):
    """
    Add a photo to user's favorites
    """
    try:
        # Check if photo exists
        photo = Photo.query.get(photo_id)
        if not photo:
            return jsonify({"error": "Photo not found"}), 404
            
        # Check if already favorited
        existing_favorite = Favorite.query.filter(
            Favorite.user_id == current_user.id,
            Favorite.photo_id == photo_id
        ).first()
        
        if existing_favorite:
            return jsonify({"error": "Photo already in favorites"}), 400
            
        # Create new favorite
        new_favorite = Favorite(
            user_id=current_user.id,
            photo_id=photo_id
        )
        
        db.session.add(new_favorite)
        db.session.commit()
        
        return jsonify(new_favorite.to_dict()), 201
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@favorite_routes.route('/<int:photo_id>', methods=['DELETE'])
@login_required
def remove_favorite(photo_id):
    """
    Remove a photo from user's favorites
    """
    try:
        favorite = Favorite.query.filter(
            Favorite.user_id == current_user.id,
            Favorite.photo_id == photo_id
        ).first()
        
        if not favorite:
            return jsonify({"error": "Photo not in favorites"}), 404
            
        db.session.delete(favorite)
        db.session.commit()
        
        return jsonify({"message": "Successfully removed from favorites"}), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@favorite_routes.route('/check/<int:photo_id>', methods=['GET'])
@login_required
def check_favorite(photo_id):
    """
    Check if a photo is in user's favorites
    """
    try:
        favorite = Favorite.query.filter(
            Favorite.user_id == current_user.id,
            Favorite.photo_id == photo_id
        ).first()
        
        return jsonify({"is_favorite": favorite is not None}), 200
    except SQLAlchemyError as e:
        return jsonify({"error": str(e)}), 500
