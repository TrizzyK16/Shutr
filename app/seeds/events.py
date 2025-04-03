from app.models import db, Event, EventRSVP, User
from datetime import datetime

def seed_events():
    # Check if events already exist
    existing_events = Event.query.all()
    if existing_events:
        print("Events already seeded!")
        return
        
    # Sample events from our frontend
    photo_contest = Event(
        title="Annual Photography Contest",
        date="April 15, 2025",
        location="Online",
        description="Submit your best shots for a chance to win prizes and recognition.",
        thumbnail="https://picsum.photos/id/50/300/200"
    )

    workshop = Event(
        title="Photography Workshop",
        date="May 10, 2025",
        location="New York, NY",
        description="Learn advanced techniques from professional photographers.",
        thumbnail="https://picsum.photos/id/60/300/200"
    )

    photo_walk = Event(
        title="City Photo Walk",
        date="June 5, 2025",
        location="Chicago, IL",
        description="Join fellow photographers for a guided photo walk through the city.",
        thumbnail="https://picsum.photos/id/70/300/200"
    )

    exhibition = Event(
        title="Photography Exhibition",
        date="July 20, 2025",
        location="Los Angeles, CA",
        description="View stunning photographs from talented artists around the world.",
        thumbnail="https://picsum.photos/id/80/300/200"
    )

    db.session.add(photo_contest)
    db.session.add(workshop)
    db.session.add(photo_walk)
    db.session.add(exhibition)
    db.session.commit()

    # Add some users to events
    # Get the first few users
    users = User.query.limit(5).all()
    
    if users:
        # Add demo user to all events
        for event in [photo_contest, workshop, photo_walk, exhibition]:
            rsvp = EventRSVP(
                user_id=users[0].id,
                event_id=event.id,
                rsvp_at=datetime.now()
            )
            db.session.add(rsvp)
        
        # Add other users to random events
        if len(users) > 1:
            rsvp = EventRSVP(
                user_id=users[1].id,
                event_id=photo_contest.id,
                rsvp_at=datetime.now()
            )
            db.session.add(rsvp)
        
        if len(users) > 2:
            rsvp = EventRSVP(
                user_id=users[2].id,
                event_id=workshop.id,
                rsvp_at=datetime.now()
            )
            db.session.add(rsvp)
        
        if len(users) > 3:
            rsvp = EventRSVP(
                user_id=users[3].id,
                event_id=photo_walk.id,
                rsvp_at=datetime.now()
            )
            db.session.add(rsvp)
        
        db.session.commit()

def undo_events():
    # SQLite-compatible delete
    db.session.execute('DELETE FROM event_rsvps;')
    db.session.execute('DELETE FROM events;')
    db.session.commit()
