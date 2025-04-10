# app/api/favorite_routes.py

import logging
import traceback
from flask import Blueprint, jsonify, request, current_app
from flask_login import login_required, current_user
from app.models import db, Photo, Favorite
from sqlalchemy.exc import SQLAlchemyError

favorite_routes = Blueprint('favorites', __name__)

# GET /api/favorites - get all favorites for current user
@favorite_routes.route('', methods=['GET'])
@login_required
def get_user_favorites():
    try:
        logging.info(f"Fetching favorites for user {current_user.id}")
        favorites = Favorite.query.filter_by(user_id=current_user.id).all()
        logging.info(f"Found {len(favorites)} favorites for user {current_user.id}")
        return jsonify({
            "favorites": [favorite.to_dict() for favorite in favorites]
        }), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        logging.error(f"Database error fetching favorites: {str(e)}")
        logging.error(traceback.format_exc())
        return jsonify({"error": "Database error", "details": str(e)}), 500

# POST /api/favorites/<photo_id> - favorite a photo
@favorite_routes.route('/<int:photo_id>', methods=['POST'])
@login_required
def add_favorite(photo_id):
    """Add a photo to favorites"""
    try:
        user_id = current_user.id
        logging.info(f"Adding favorite for user {user_id}, photo {photo_id}")
        
        # Check if already favorited
        existing = Favorite.query.filter_by(
            user_id=user_id, 
            photo_id=photo_id
        ).first()
        
        if existing:
            logging.info(f"Photo {photo_id} already favorited by user {user_id}")
            return jsonify({"error": "Photo already favorited"}), 400

        # Check if photo exists
        photo = Photo.query.get(photo_id)
        if not photo:
            logging.warning(f"Attempted to favorite non-existent photo {photo_id}")
            return jsonify({"error": "Photo not found"}), 404

        # Create new favorite
        favorite = Favorite(user_id=user_id, photo_id=photo_id)
        db.session.add(favorite)
        logging.info(f"About to commit favorite for user {user_id}, photo {photo_id}")
        db.session.commit()  
        logging.info(f"Successfully added favorite: {favorite.id}")
        
        return jsonify(favorite.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        logging.error(f"Error adding favorite: {str(e)}")
        logging.error(traceback.format_exc())
        return jsonify({"error": "Failed to add favorite", "details": str(e)}), 500

# DELETE /api/favorites/<photo_id> - unfavorite a photo
@favorite_routes.route('/<int:photo_id>', methods=['DELETE'])
@login_required
def remove_favorite(photo_id):
    try:
        user_id = current_user.id
        logging.info(f"Removing favorite for user {user_id}, photo {photo_id}")
        
        # Check if photo exists first
        photo = Photo.query.get(photo_id)
        if not photo:
            logging.warning(f"Attempted to unfavorite non-existent photo {photo_id}")
            return jsonify({"error": "Photo not found", "photo_id": photo_id}), 404
            
        # Get the favorite in a single query
        fav = Favorite.query.filter_by(
            user_id=user_id, 
            photo_id=photo_id
        ).first()
        
        if not fav:
            logging.info(f"Photo {photo_id} not in favorites for user {user_id}")
            return jsonify({
                "error": "Photo not in favorites",
                "photo_id": photo_id
            }), 404

        # Delete the favorite
        db.session.delete(fav)
        logging.info(f"About to commit removal of favorite {fav.id}")
        db.session.commit()
        logging.info(f"Successfully removed favorite {fav.id}")
        
        return jsonify({
            "message": "Successfully removed from favorites",
            "favorite_id": fav.id
        }), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        logging.error(f"Database error removing favorite: {str(e)}")
        logging.error(traceback.format_exc())
        return jsonify({"error": "Database error", "details": str(e)}), 500

# GET /api/favorites/check/<photo_id> - check if a photo is favorited
@favorite_routes.route('/check/<int:photo_id>', methods=['GET'])
@login_required
def check_favorite(photo_id):
    try:
        user_id = current_user.id
        logging.info(f"Checking favorite status for user {user_id}, photo {photo_id}")
        
        # Check if photo exists first
        photo = Photo.query.get(photo_id)
        if not photo:
            logging.warning(f"Attempted to check favorite status for non-existent photo {photo_id}")
            return jsonify({"error": "Photo not found", "photo_id": photo_id}), 404
            
        # Get the favorite in a single query
        fav = Favorite.query.filter_by(
            user_id=user_id, 
            photo_id=photo_id
        ).first()
        
        is_favorite = fav is not None
        logging.info(f"Photo {photo_id} is_favorite={is_favorite} for user {user_id}")
        
        return jsonify({
            "is_favorite": is_favorite,
            "photo_id": photo_id,
            "favorite_id": fav.id if fav else None
        }), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        logging.error(f"Database error checking favorite: {str(e)}")
        logging.error(traceback.format_exc())
        return jsonify({"error": "Database error", "details": str(e)}), 500

# Debug endpoint to test database connectivity
@favorite_routes.route('/debug', methods=['GET'])
@login_required
def debug_favorites():
    """Debug endpoint for favorites"""
    try:
        user_id = current_user.id
        logging.info(f"Running favorites debug for user {user_id}")
        
        # Test queries
        user = current_user
        photos = Photo.query.limit(5).all()
        favorites = Favorite.query.filter_by(user_id=user_id).all()
        
        logging.info(f"Debug: Found {len(photos)} photos and {len(favorites)} favorites")
        
        # Only create test favorite if there are photos
        if photos:
            # Check if already exists to avoid constraint violations
            test_photo_id = photos[0].id
            existing = Favorite.query.filter_by(
                user_id=user_id, 
                photo_id=test_photo_id
            ).first()
            
            if not existing:
                logging.info(f"Debug: Creating test favorite for photo {test_photo_id}")
                test_favorite = Favorite(user_id=user_id, photo_id=test_photo_id)
                db.session.add(test_favorite)
                db.session.commit()
                
                # Clean up test data
                logging.info(f"Debug: Removing test favorite {test_favorite.id}")
                db.session.delete(test_favorite)
                db.session.commit()
            else:
                logging.info(f"Debug: Test favorite already exists for photo {test_photo_id}")
        
        return jsonify({
            "status": "success",
            "user_id": user_id,
            "photo_count": len(photos),
            "favorite_count": len(favorites),
            "database_connection": "working"
        }), 200
    except Exception as e:
        db.session.rollback()
        logging.error(f"Debug endpoint error: {str(e)}")
        logging.error(traceback.format_exc())
        return jsonify({
            "status": "error",
            "error": str(e),
            "traceback": traceback.format_exc()
        }), 500