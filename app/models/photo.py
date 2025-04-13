# app/models/photo.py

from .db import db, environment, SCHEMA
from datetime import datetime

class Photo(db.Model):
    __tablename__ = 'photos'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(f"{SCHEMA}.users.id" if environment == "production" else "users.id"), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    caption = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    # Relationship to the User model
    user = db.relationship("User", back_populates="photos")
    
    # Relationship to favorites
    favorited_by = db.relationship("Favorite", back_populates="photo", cascade="all, delete-orphan")


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "image_url": self.image_url,
            "caption": self.caption,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
            "favorite_count": len(self.favorited_by) if self.favorited_by else 0,
        }    

