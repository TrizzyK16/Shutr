# app/models/favorite.py

from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from datetime import datetime


class Favorite(db.Model):
    __tablename__ = 'favorites'

    # Define __table_args__ once with all needed constraints and settings
    if environment == "production":
        __table_args__ = (
            db.UniqueConstraint('user_id', 'photo_id', name='unique_user_photo_favorite'),
            {'schema': SCHEMA}
        )
    else:
        __table_args__ = (
            db.UniqueConstraint('user_id', 'photo_id', name='unique_user_photo_favorite'),
        )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    photo_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('photos.id')), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    # Relationships
    user = db.relationship("User", back_populates="favorites")
    photo = db.relationship("Photo", back_populates="favorited_by")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "photo_id": self.photo_id,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "photo": self.photo.to_dict() if self.photo else None
        }