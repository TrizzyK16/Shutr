from .db import db, environment, SCHEMA
from datetime import datetime

class Group(db.Model):
    __tablename__ = 'groups'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(1000))
    thumbnail = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    # Relationships
    members = db.relationship("User", secondary="group_memberships", back_populates="groups")
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "thumbnail": self.thumbnail,
            "member_count": len(self.members),
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat()
        }

class GroupMembership(db.Model):
    __tablename__ = 'group_memberships'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(f"{SCHEMA}.users.id" if environment == "production" else "users.id"), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey(f"{SCHEMA}.groups.id" if environment == "production" else "groups.id"), nullable=False)
    joined_at = db.Column(db.DateTime, default=datetime.now)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "group_id": self.group_id,
            "joined_at": self.joined_at.isoformat()
        }
