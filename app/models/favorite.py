# app/models/favorite.py

from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from datetime import datetime


class Favorite(db.Model):
    __tablename__ = 'favorites'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    photo_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('photos.id')), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    # Comment out updated_at until migration is applied
    # updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())



    # Relationships
    user = db.relationship("User", back_populates="favorites")
    photo = db.relationship("Photo", back_populates="favorited_by")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "photo_id": self.photo_id,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            # Use created_at for updated_at since the column might not exist yet
            "updated_at": getattr(self, 'updated_at', self.created_at).isoformat() if getattr(self, 'updated_at', self.created_at) else None,
            "photo": self.photo.to_dict() if self.photo else None
        }
