from app.models import db, User, environment, SCHEMA, Photo
from datetime import datetime
from sqlalchemy.sql import text

def seed_photos():
    print("Seeding photos.......")
    users = User.query.all()
    print(f"Found {len(users)} users.")

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

        photo_index = i % len(photo_data)

        photo = Photo(
            user_id=user.id,
            image_url=photo_data[photo_index]["image_url"],
            caption=f"{photo_data[photo_index]['caption']} - by {user.username}",
            created_at=datetime.now(),
            updated_at=datetime.now()
        
            )
        print(f"Adding photo for user {user.id}: {photo.image_url}")
        db.session.add(photo)

    db.session.commit()




# Uses a raw SQL query to TRUNCATE or DELETE the photos table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_photos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.photos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM photos"))
        
    db.session.commit()