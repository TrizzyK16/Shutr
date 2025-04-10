# app/api/favorite_routes.py

from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Photo, Favorite
from sqlalchemy.exc import SQLAlchemyError

favorite_routes = Blueprint('favorites', __name__)

# GET /api/favorites - get all favorites for current user
@favorite_routes.route('', methods=['GET'])
@login_required
def get_user_favorites():
    try:
        favorites = Favorite.query.filter_by(user_id=current_user.id).all()
        return jsonify({
            "favorites": [favorite.to_dict() for favorite in favorites]
        }), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": "Database error", "details": str(e)}), 500

# POST /api/favorites/<photo_id> - favorite a photo
@favorite_routes.route('/<int:photo_id>', methods=['POST'])
@login_required
def add_favorite(photo_id):
    try:
        # Check if photo exists first
        photo = Photo.query.get(photo_id)
        if not photo:
            return jsonify({"error": "Photo not found", "photo_id": photo_id}), 404

        # Check if favorite already exists
        existing = Favorite.query.filter_by(
            user_id=current_user.id, 
            photo_id=photo_id
        ).first()
        
        if existing:
            return jsonify({
                "error": "Photo already in favorites",
                "favorite": existing.to_dict()
            }), 400

        # Create new favorite
        new_fav = Favorite(user_id=current_user.id, photo_id=photo_id)
        db.session.add(new_fav)
        db.session.commit()
        
        return jsonify({"favorite": new_fav.to_dict()}), 201
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": "Database error", "details": str(e)}), 500

# DELETE /api/favorites/<photo_id> - unfavorite a photo
@favorite_routes.route('/<int:photo_id>', methods=['DELETE'])
@login_required
def remove_favorite(photo_id):
    try:
        # Check if photo exists first
        photo = Photo.query.get(photo_id)
        if not photo:
            return jsonify({"error": "Photo not found", "photo_id": photo_id}), 404
            
        # Get the favorite in a single query
        fav = Favorite.query.filter_by(
            user_id=current_user.id, 
            photo_id=photo_id
        ).first()
        
        if not fav:
            return jsonify({
                "error": "Photo not in favorites",
                "photo_id": photo_id
            }), 404

        # Delete the favorite
        db.session.delete(fav)
        db.session.commit()
        
        return jsonify({
            "message": "Successfully removed from favorites",
            "favorite_id": fav.id
        }), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": "Database error", "details": str(e)}), 500

# GET /api/favorites/check/<photo_id> - check if a photo is favorited
@favorite_routes.route('/check/<int:photo_id>', methods=['GET'])
@login_required
def check_favorite(photo_id):
    try:
        # Check if photo exists first
        photo = Photo.query.get(photo_id)
        if not photo:
            return jsonify({"error": "Photo not found", "photo_id": photo_id}), 404
            
        # Get the favorite in a single query
        fav = Favorite.query.filter_by(
            user_id=current_user.id, 
            photo_id=photo_id
        ).first()
        
        return jsonify({
            "is_favorite": fav is not None,
            "photo_id": photo_id,
            "favorite_id": fav.id if fav else None
        }), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": "Database error", "details": str(e)}), 500