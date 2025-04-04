from app.models import db, Favorite, User, Photo
from app.models.db import SCHEMA, environment
from sqlalchemy.sql import text
from datetime import datetime

def seed_favorites():
    """
    Seeds the favorites table with some initial favorites
    """
    # Get some users and photos to create favorites
    users = User.query.all()
    photos = Photo.query.all()
    
    # Create some favorites if we have users and photos
    if users and photos:
        # User 1 favorites some photos
        favorite1 = Favorite(
            user_id=users[0].id,
            photo_id=photos[1].id
        )
        
        favorite2 = Favorite(
            user_id=users[0].id,
            photo_id=photos[2].id
        )
        
        # User 2 favorites some photos
        favorite3 = Favorite(
            user_id=users[1].id,
            photo_id=photos[0].id
        )
        
        db.session.add_all([favorite1, favorite2, favorite3])
        db.session.commit()

def undo_favorites():
    """
    Undoes the favorites seeding
    """
    if environment == "production":
        db.session.execute(f'TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;')
    else:
        db.session.execute(text('DELETE FROM favorites;'))
    
    db.session.commit()
