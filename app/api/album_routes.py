from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Album, Photo
from app.forms.album_form import AlbumForm

album_routes = Blueprint('albums', __name__)

# GET all albums for a specific user
@album_routes.route('/users/<int:user_id>', methods=['GET'])
def get_albums_for_user(user_id):
    albums = Album.query.filter(Album.user_id == user_id).all()
    return {'albums': [album.to_dict() for album in albums]}, 200


# CREATE a new album
@album_routes.route('', methods=['POST'])
@login_required
def create_album():
    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        album = Album(
            user_id=current_user.id,
            title=form.data['title'],
            description=form.data['description']
        )
        
        db.session.add(album)
        db.session.commit()
        return album.to_dict(), 201
    
    print(f"Form validation failed: {form.errors}")
    return {'errors': form.errors}, 400


# UPDATE an album
@album_routes.route('/<int:album_id>', methods=['PUT'])
@login_required
def update_album(album_id):
    album = Album.query.get_or_404(album_id)

    # Make sure the current user owns the album
    if album.user_id != current_user.id:
        return {'errors': ['Unauthorized']}, 403

    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        album.title = form.data['title']
        album.description = form.data['description']
        db.session.commit()
        return album.to_dict(), 200

    return {'errors': form.errors}, 400


# DELETE an album
@album_routes.route('/<int:album_id>', methods=['DELETE'])
@login_required
def delete_album(album_id):
    album = Album.query.get_or_404(album_id)

    if album.user_id != current_user.id:
        return {'errors': ['Unauthorized']}, 403

    db.session.delete(album)
    db.session.commit()
    return {'message': 'Album deleted successfully'}, 200


# ADD photos to an album
@album_routes.route('/<int:album_id>/photos', methods=['POST'])
@login_required
def add_photos_to_album(album_id):
    print(f"Adding photos to album {album_id}")
    album = Album.query.get_or_404(album_id)

    if album.user_id != current_user.id:
        print(f"Unauthorized: user {current_user.id} trying to modify album owned by {album.user_id}")
        return {'errors': ['Unauthorized']}, 403

    # Expecting a list of photo ids in request.json['photo_ids']
    data = request.get_json()
    print(f"Received data: {data}")
    
    if not data:
        print("No data received in request")
        return {'errors': ['No data provided']}, 400
        
    photo_ids = data.get('photo_ids', [])
    print(f"Photo IDs to add: {photo_ids}")
    
    if not photo_ids or not isinstance(photo_ids, list):
        print(f"Invalid photo_ids: {photo_ids}")
        return {'errors': ['Invalid or missing photo_ids']}, 400

    added_photos = []
    for pid in photo_ids:
        photo = Photo.query.get(pid)
        if photo:
            if photo not in album.photos:
                album.photos.append(photo)
                added_photos.append(pid)
            else:
                print(f"Photo {pid} already in album {album_id}")
        else:
            print(f"Photo {pid} not found")

    db.session.commit()
    print(f"Successfully added photos {added_photos} to album {album_id}")
    return album.to_dict(), 200


# REMOVE a photo from an album
@album_routes.route('/<int:album_id>/photos/<int:photo_id>', methods=['DELETE'])
@login_required
def remove_photo_from_album(album_id, photo_id):
    album = Album.query.get_or_404(album_id)

    if album.user_id != current_user.id:
        return {'errors': ['Unauthorized']}, 403

    photo = Photo.query.get_or_404(photo_id)
    if photo in album.photos:
        album.photos.remove(photo)
        db.session.commit()
    return album.to_dict(), 200
