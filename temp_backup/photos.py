# app/seeds/photos.py

from app.models import db, User, Photo, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timezone

def seed_photos():
    """
    Seed photos for each user in the database
    """
    # Get all users from the database
    users = User.query.all()
    
    # Sample photo data with high-quality images
    photo_data = [
        {
            "image_url": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
            "caption": "Beautiful sunset over the mountains"
        },
        {
            "image_url": "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
            "caption": "Urban exploration in the city"
        },
        {
            "image_url": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
            "caption": "Peaceful lake surrounded by forest"
        }
    ]
    
    # Create a photo for each user
    for i, user in enumerate(users):
        # Use modulo to cycle through the photo data if there are more users than photos
        # Cycle through the photo data array to ensure that each user gets a different photo, even if there are more users than photos
        # Use the modulo operator to get the remainder of the division of the current user index by the length of the photo data array
        # This will give us a number between 0 and the length of the array minus 1, which we can use as the index for the current photo
        photo_index = i % len(photo_data)
        photo = Photo(
            user_id=user.id,
            image_url=photo_data[photo_index]["image_url"],
            caption=f"{photo_data[photo_index]['caption']} - by {user.username}",
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        )
        db.session.add(photo)
    
    db.session.commit()

def undo_photos():
    """
    Undo all photos
    """
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.photos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM photos"))
        
    db.session.commit()
