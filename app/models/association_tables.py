from .db import db, environment, SCHEMA, add_prefix_for_prod

# Association table to link Photos and Albums (many-to-many)
album_photos_name = 'album_photos'

# Create a function to get the properly prefixed table name for use in queries
def get_album_photos_table_name():
    if environment == "production":
        return f"{SCHEMA}.{album_photos_name}"
    else:
        return album_photos_name
