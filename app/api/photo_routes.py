# app/api/photo_routes.py

from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import db, Photo
from app.forms import PhotoForm  # We'll define this form below


photo_routes = Blueprint('photos', __name__)

# GET all photos
@photo_routes.route('', methods=['GET'])
def get_photos():
    photos = Photo.query.all()
    return {"photos": [photo.to_dict() for photo in photos]}

# GET single photo by id (optional, if you want a detail route)
@photo_routes.route('/<int:id>', methods=['GET'])
def get_photo(id):
    photo = Photo.query.get(id)
    if not photo:
        return {"error": "Photo not found"}, 404

    return photo.to_dict()

# CREATE new photo
@photo_routes.route('', methods=['POST'])
# @login_required
def create_photo():
    print("check 1")
    form = PhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        print("check 2")
        new_photo = Photo(
            user_id=current_user.id,
            image_url=form.data['image_url'],
            caption=form.data['caption']
        )
        print("check 3")
        db.session.add(new_photo)
        print("check 4")
        db.session.commit()
        print("check 5")
        return new_photo.to_dict(), 201
    return {"errors": form.errors}, 400

# UPDATE an existing photo
@photo_routes.route('<int:id>', methods=['PUT'])
@login_required
def update_photo(id):
    photo = Photo.query.get(id)
    if not photo:
        return {"error": "Photo not found"}, 404
    if photo.user_id != current_user.id:
        return {"error": "Unauthorized"}, 403

    form = PhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        photo.image_url = form.data['image_url']
        photo.caption = form.data['caption']
        db.session.commit()
        return photo.to_dict()
    return {"errors": form.errors}, 400

# DELETE a photo
@photo_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_photo(id):
    photo = Photo.query.get(id)
    if not photo:
        return {"error": "Photo not found"}, 404
    if photo.user_id != current_user.id:
        return {"error": "Unauthorized"}, 403

    db.session.delete(photo)
    db.session.commit()
    return {"message": "Photo deleted successfully"}
