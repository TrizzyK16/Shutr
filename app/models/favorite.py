# app/models/favorite.py

from .db import db, environment, SCHEMA
from datetime import datetime

class Favorite(db.Model):
    __tablename__ = 'favorites'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(f"{SCHEMA}.users.id" if environment == "production" else "users.id"), nullable=False)
    photo_id = db.Column(db.Integer, db.ForeignKey(f"{SCHEMA}.photos.id" if environment == "production" else "photos.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)

    # Relationships
    user = db.relationship("User", back_populates="favorites")
    photo = db.relationship("Photo", back_populates="favorited_by")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "photo_id": self.photo_id,
            "created_at": self.created_at.isoformat(),
            "photo": self.photo.to_dict() if self.photo else None
        }
