from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timezone
from .association_tables import get_album_photos_table_name
from app.models import album_photos


class Album(db.Model):
    __tablename__ = 'albums'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc), nullable=False)

    # Relationship back to User
    user = db.relationship('User', back_populates='albums')

    # Many-to-many relationship with Photos
    photos = db.relationship(
        'Photo', 
        secondary=album_photos,
        primaryjoin=f"Album.id == {get_album_photos_table_name()}.c.album_id",
        secondaryjoin=f"{get_album_photos_table_name()}.c.photo_id == Photo.id",
        back_populates='albums'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'title': self.title,
            'description': self.description,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            # Return a list of photo IDs or entire photo objects, whichever you prefer
            'photos': [photo.id for photo in self.photos]
        }
