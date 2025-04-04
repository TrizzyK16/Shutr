from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .photo import Photo
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    is_pro = db.Column(db.Boolean, default=False)
    pro_since = db.Column(db.DateTime, nullable=True)
    photos = db.relationship("Photo", back_populates="user", cascade="all, delete-orphan")
    
    # Relationships to groups and events
    groups = db.relationship("Group", secondary="group_memberships", back_populates="members")
    events = db.relationship("Event", secondary="event_rsvps", back_populates="attendees")
    
    # Relationship to favorites
    favorites = db.relationship("Favorite", back_populates="user", cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'is_pro': self.is_pro,
            'pro_since': self.pro_since.isoformat() if self.pro_since else None,
            'photos': [photo.to_dict() for photo in self.photos] if self.photos else [],
            'groups': [{'id': group.id, 'name': group.name} for group in self.groups] if self.groups else [],
            'events': [{'id': event.id, 'title': event.title} for event in self.events] if self.events else [],
            'favorites': [favorite.photo_id for favorite in self.favorites] if self.favorites else []
        }

favorites = db.relationship(
    "Favorite",
    back_populates="user",
    cascade="all, delete-orphan"
)
