from .db import db
from datetime import datetime

# Association table to link Photos and Albums (many-to-many)
album_photos = db.Table(
    'album_photos',
    db.Column('album_id', db.Integer, db.ForeignKey('albums.id'), primary_key=True),
    db.Column('photo_id', db.Integer, db.ForeignKey('photos.id'), primary_key=True)
)


class Album(db.Model):
    __tablename__ = 'albums'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    # Relationship back to User
    user = db.relationship('User', back_populates='albums')

    # Many-to-many relationship with Photos
    photos = db.relationship('Photo', secondary=album_photos, back_populates='albums')

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
