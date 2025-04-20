from flask.cli import AppGroup
from .users import seed_users, undo_users
from .photos import seed_photos, undo_photos
from .groups import seed_groups, undo_groups
from .events import seed_events, undo_events
from .favorites import seed_favorites, undo_favorites
from .albums import seed_albums, undo_albums

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_favorites()
        undo_events()
        undo_groups()
        undo_photos()
        undo_users()
    seed_users()
    seed_photos()
    seed_groups()
    seed_events()
    seed_favorites()
    seed_albums()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_favorites()
    undo_albums()
    undo_events()
    undo_groups()
    undo_photos()
    undo_users()
