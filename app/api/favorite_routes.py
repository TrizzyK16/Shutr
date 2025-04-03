# app/api/favorite_routes.py

from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Favorite

favorite_routes = Blueprint('favorites', __name__)

# 1) GET /api/favorites  (get all favorites for current user)
@favorite_routes.route('', methods=['GET'])
@login_required
def get_favorites():
    user_id = current_user.id
    favorites = Favorite.query.filter(Favorite.user_id == user_id).all()
    return {"favorites": [fav.to_dict() for fav in favorites]}, 200


# 2) POST /api/favorites/<int:photo_id>  (favorite a photo)
@favorite_routes.route('/<int:photo_id>', methods=['POST'])
@login_required
def favorite_photo(photo_id):
    user_id = current_user.id

    # Check if favorite already exists
    existing = Favorite.query.filter_by(user_id=user_id, photo_id=photo_id).first()
    if existing:
        return {"message": "Photo already favorited."}, 400

    new_fav = Favorite(user_id=user_id, photo_id=photo_id)
    db.session.add(new_fav)
    db.session.commit()
    return {"favorite": new_fav.to_dict()}, 201


# 3) DELETE /api/favorites/<int:photo_id>  (unfavorite a photo)
@favorite_routes.route('/<int:photo_id>', methods=['DELETE'])
@login_required
def unfavorite_photo(photo_id):
    user_id = current_user.id

    fav = Favorite.query.filter_by(user_id=user_id, photo_id=photo_id).first()
    if not fav:
        return {"message": "Favorite not found."}, 404

    db.session.delete(fav)
    db.session.commit()
    return {"message": "Successfully unfavorited."}, 200
