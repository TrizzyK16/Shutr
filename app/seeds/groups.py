from app.models import db, Group, GroupMembership, User
from datetime import datetime

def seed_groups():
    # Check if groups already exist
    existing_groups = Group.query.all()
    if existing_groups:
        print("Groups already seeded!")
        return
        
    # Sample groups from our frontend
    landscape_photographers = Group(
        name="Landscape Photographers",
        description="A community for landscape photographers to share their work and techniques.",
        thumbnail="https://picsum.photos/id/10/300/200"
    )

    street_photography = Group(
        name="Street Photography",
        description="Capturing life on the streets around the world.",
        thumbnail="https://picsum.photos/id/20/300/200"
    )

    portrait_masters = Group(
        name="Portrait Masters",
        description="Dedicated to the art of portrait photography.",
        thumbnail="https://picsum.photos/id/30/300/200"
    )

    wildlife_enthusiasts = Group(
        name="Wildlife Enthusiasts",
        description="Sharing the beauty of wildlife through photography.",
        thumbnail="https://picsum.photos/id/40/300/200"
    )

    db.session.add(landscape_photographers)
    db.session.add(street_photography)
    db.session.add(portrait_masters)
    db.session.add(wildlife_enthusiasts)
    db.session.commit()

    # Add some users to groups
    # Get the first few users
    users = User.query.limit(5).all()
    
    if users:
        # Add demo user to all groups
        for group in [landscape_photographers, street_photography, portrait_masters, wildlife_enthusiasts]:
            membership = GroupMembership(
                user_id=users[0].id,
                group_id=group.id,
                joined_at=datetime.now()
            )
            db.session.add(membership)
        
        # Add other users to random groups
        if len(users) > 1:
            membership = GroupMembership(
                user_id=users[1].id,
                group_id=landscape_photographers.id,
                joined_at=datetime.now()
            )
            db.session.add(membership)
        
        if len(users) > 2:
            membership = GroupMembership(
                user_id=users[2].id,
                group_id=street_photography.id,
                joined_at=datetime.now()
            )
            db.session.add(membership)
        
        if len(users) > 3:
            membership = GroupMembership(
                user_id=users[3].id,
                group_id=portrait_masters.id,
                joined_at=datetime.now()
            )
            db.session.add(membership)
        
        db.session.commit()

def undo_groups():
    from app.models.db import SCHEMA, environment
    
    if environment == "production":
        db.session.execute(f'TRUNCATE table {SCHEMA}.group_memberships RESTART IDENTITY CASCADE;')
        db.session.execute(f'TRUNCATE table {SCHEMA}.groups RESTART IDENTITY CASCADE;')
    else:
        db.session.execute('DELETE FROM group_memberships;')
        db.session.execute('DELETE FROM groups;')
    
    db.session.commit()
