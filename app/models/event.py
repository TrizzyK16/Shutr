from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Event(db.Model):
    __tablename__ = 'events'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(1000))
    date = db.Column(db.String(100), nullable=False)  # Store as string for flexibility
    location = db.Column(db.String(255))
    thumbnail = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    # Relationships
    attendees = db.relationship("User", secondary=add_prefix_for_prod("event_rsvps"), back_populates="events")
    
    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "date": self.date,
            "location": self.location,
            "thumbnail": self.thumbnail,
            "attendee_count": len(self.attendees),
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat()
        }

class EventRSVP(db.Model):
    __tablename__ = 'event_rsvps'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("events.id")), nullable=False)
    rsvp_at = db.Column(db.DateTime, default=datetime.now)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "event_id": self.event_id,
            "rsvp_at": self.rsvp_at.isoformat()
        }
