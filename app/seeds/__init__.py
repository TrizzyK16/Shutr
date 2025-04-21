from flask.cli import AppGroup
from .users import seed_users, undo_users
from .photos import seed_photos, undo_photos
from .groups import seed_groups, undo_groups
from .events import seed_events, undo_events
from .pros import seed_pros, undo_pros
from .favorites import seed_favorites, undo_favorites
from .albums import seed_albums, undo_albums

from app.models.db import db, environment, SCHEMA
import sqlalchemy as sa
import click

# Ensure schema and search_path exist before any seed/undo logic
from sqlalchemy import text
from flask import current_app

def ensure_schema_and_search_path():
    if environment == "production" and SCHEMA:
        engine = db.get_engine()
        with engine.connect() as connection:
            connection.execute(text(f"CREATE SCHEMA IF NOT EXISTS {SCHEMA}"))
            connection.execute(text(f"SET search_path TO {SCHEMA}, public"))

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    ensure_schema_and_search_path()
    if environment == "production":
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
