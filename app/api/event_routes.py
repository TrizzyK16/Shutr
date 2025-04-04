from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Event, EventRSVP, User
from datetime import datetime

event_routes = Blueprint('events', __name__)

# Get all events
@event_routes.route('/')
def get_all_events():
    events = Event.query.all()
    return jsonify([event.to_dict() for event in events])

# Get a specific event by id
@event_routes.route('/<int:id>')
def get_event(id):
    event = Event.query.get(id)
    
    if not event:
        return jsonify({"error": "Event not found"}), 404
        
    return jsonify(event.to_dict())

# RSVP to an event
@event_routes.route('/<int:id>/rsvp', methods=['POST'])
@login_required
def rsvp_event(id):
    event = Event.query.get(id)
    
    if not event:
        return jsonify({"error": "Event not found"}), 404
    
    # Check if user already RSVP'd
    existing_rsvp = EventRSVP.query.filter_by(
        user_id=current_user.id,
        event_id=id
    ).first()
    
    if existing_rsvp:
        return jsonify({"error": "Already RSVP'd to this event"}), 400
    
    # Create new RSVP
    new_rsvp = EventRSVP(
        user_id=current_user.id,
        event_id=id,
        rsvp_at=datetime.now()
    )
    
    db.session.add(new_rsvp)
    db.session.commit()
    
    return jsonify({"message": f"Successfully RSVP'd to {event.title}", "rsvp": new_rsvp.to_dict()})

# Cancel RSVP to an event
@event_routes.route('/<int:id>/rsvp', methods=['DELETE'])
@login_required
def cancel_rsvp(id):
    event = Event.query.get(id)
    
    if not event:
        return jsonify({"error": "Event not found"}), 404
    
    # Find RSVP
    rsvp = EventRSVP.query.filter_by(
        user_id=current_user.id,
        event_id=id
    ).first()
    
    if not rsvp:
        return jsonify({"error": "Not RSVP'd to this event"}), 400
    
    db.session.delete(rsvp)
    db.session.commit()
    
    return jsonify({"message": f"Successfully cancelled RSVP to {event.title}"})

# Create a new event (for future implementation)
@event_routes.route('/', methods=['POST'])
@login_required
def create_event():
    data = request.json
    
    if not data.get('title') or not data.get('date'):
        return jsonify({"error": "Event title and date are required"}), 400
    
    new_event = Event(
        title=data.get('title'),
        description=data.get('description', ''),
        date=data.get('date'),
        location=data.get('location', ''),
        thumbnail=data.get('thumbnail', '')
    )
    
    db.session.add(new_event)
    db.session.commit()
    
    # Automatically RSVP creator
    new_rsvp = EventRSVP(
        user_id=current_user.id,
        event_id=new_event.id,
        rsvp_at=datetime.now()
    )
    
    db.session.add(new_rsvp)
    db.session.commit()
    
    return jsonify(new_event.to_dict()), 201
