# app/models/photo.py

from .db import db
from datetime import datetime

class Photo(db.Model):
    __tablename__ = 'photos'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    caption = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship to the User model
    user = db.relationship("User", back_populates="photos")

def to_dict(self):
    return {
        "id": self.id,
        "user_id": self.user_id,
        "image_url": self.image_url,
        "caption": self.caption,
        "created_at": self.created_at.isoformat(),
        "updated_at": self.updated_at.isoformat(),
    }    

favorited_by = db.relationship(
    "Favorite",
    back_populates="photo",
    cascade="all, delete-orphan"
)
