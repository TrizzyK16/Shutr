from app.models import db, User, Photo, Album
from app import app
from datetime import datetime

def seed_albums():
    with app.app_context():
        print("Seeding albums.......")
        users = User.query.all()
        photos = Photo.query.all()
        print(f"Found {len(users)} users and {len(photos)} photos.")

        # First, clear any existing albums
        db.session.execute("DELETE FROM album_photos")
        db.session.execute("DELETE FROM albums")
        db.session.commit()
        
        album_data = [
            {
                "title": "Nature Collection",
                "description": "Beautiful landscapes and natural wonders"
            },
            {
                "title": "Urban Photography",
                "description": "City life and architecture"
            },
            {
                "title": "Travel Memories",
                "description": "Adventures from around the world"
            },
            {
                "title": "Portraits",
                "description": "People and faces"
            }
        ]

        # Create albums for each user
        for i, user in enumerate(users):
            # Create 1-2 albums per user
            num_albums = min(2, len(album_data))
            for j in range(num_albums):
                album_index = (i + j) % len(album_data)
                
                album = Album(
                    user_id=user.id,
                    title=f"{album_data[album_index]['title']} - by {user.username}",
                    description=album_data[album_index]['description'],
                    created_at=datetime.now(),
                    updated_at=datetime.now()
                )
                
                # Add some photos to each album (up to 3 photos per album)
                user_photos = [photo for photo in photos if photo.user_id == user.id]
                other_photos = [photo for photo in photos if photo.user_id != user.id]
                
                # First add user's own photos if they have any
                for k, photo in enumerate(user_photos):
                    if k < 2:  # Add up to 2 of user's own photos
                        album.photos.append(photo)
                
                # Then add some photos from other users to reach up to 3 total
                photos_needed = 3 - min(2, len(user_photos))
                for k, photo in enumerate(other_photos):
                    if k < photos_needed:
                        album.photos.append(photo)
                
                print(f"Adding album '{album.title}' for user {user.id} with {len(album.photos)} photos")
                db.session.add(album)

        db.session.commit()
        print("Albums seeded successfully!")

if __name__ == "__main__":
    seed_albums()
