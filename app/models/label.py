# app/models/label.py

from .db import db
from sqlalchemy.sql import func
from app.models.label import Label


class Label(db.Model):
    __tablename__ = 'labels'

    id = db.Column(db.Integer, primary_key=True)
    photo_id = db.Column(db.Integer, db.ForeignKey('photos.id'), nullable=False)
    text = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now(), default=func.now())

    photo = db.relationship("Photo", back_populates="labels")

    def to_dict(self):
        return {
            'id': self.id,
            'photo_id': self.photo_id,
            'text': self.text,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
