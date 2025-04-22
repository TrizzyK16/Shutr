from .db import db, environment, SCHEMA, add_prefix_for_prod

# Association table to link Photos and Albums (many-to-many)
album_photos_name = 'album_photos'
album_photos = db.Table(
    album_photos_name,
    db.Column('album_id', db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')), primary_key=True),
    db.Column('photo_id', db.Integer, db.ForeignKey(add_prefix_for_prod('photos.id')), primary_key=True),
    schema=SCHEMA if environment == "production" else None
)

# Create a function to get the properly prefixed table name for use in queries
def get_album_photos_table_name():
    if environment == "production":
        return f"{SCHEMA}.{album_photos_name}"
    else:
        return album_photos_name
