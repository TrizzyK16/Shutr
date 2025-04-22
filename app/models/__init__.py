from .db import db, environment, SCHEMA, add_prefix_for_prod
from .association_tables import get_album_photos_table_name

# Define the association table here to avoid circular imports
album_photos = db.Table(
    'album_photos',
    db.Column('album_id', db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')), primary_key=True),
    db.Column('photo_id', db.Integer, db.ForeignKey(add_prefix_for_prod('photos.id')), primary_key=True),
    schema=SCHEMA if environment == "production" else None
)

# Import models after defining association tables
from .user import User
from .photo import Photo
from .group import Group, GroupMembership
from .event import Event, EventRSVP
from .favorite import Favorite
from .album import Album