from app.models import db, Album
from app import app
from sqlalchemy import inspect, Table, MetaData

def create_albums_tables():
    with app.app_context():
        inspector = inspect(db.engine)
        
        # Check if albums table exists
        if not inspector.has_table('albums'):
            print("Creating albums table...")
            # Create all tables
            db.create_all()
            print("Albums table created successfully!")
        else:
            print("Albums table already exists.")
        
        # Check if album_photos table exists
        if not inspector.has_table('album_photos'):
            print("Creating album_photos table...")
            # The album_photos table should be created with db.create_all()
            # since it's defined in the models
            print("Album_photos table should have been created with db.create_all()")
        else:
            print("Album_photos table already exists.")

if __name__ == '__main__':
    create_albums_tables()
