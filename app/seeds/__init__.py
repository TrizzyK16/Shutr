from flask.cli import AppGroup
from .users import seed_users, undo_users
from .photos import seed_photos, undo_photos
from .groups import seed_groups, undo_groups
from .events import seed_events, undo_events
from .favorites import seed_favorites, undo_favorites
from .albums import seed_albums, undo_albums

from app.models.db import db, environment, SCHEMA
import sqlalchemy as sa
import click
import logging

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
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger("seed")
    logger.info("Starting seed process...")
    try:
        ensure_schema_and_search_path()
        if environment == "production":
            logger.info("Undoing all tables before seeding (production)...")
            undo_albums()
            undo_favorites()
            undo_events()
            undo_groups()
            undo_photos()
            undo_users()
        logger.info("Seeding users...")
        seed_users()
        logger.info("Seeding groups...")
        seed_groups()
        logger.info("Seeding events...")
        seed_events()
        logger.info("Seeding favorites...")
        seed_favorites()
        logger.info("Seeding albums...")
        seed_albums()
        logger.info("Seed process completed successfully.")
    except Exception as e:
        logger.error(f"Seed process failed: {e}")
        raise

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger("undo")
    logger.info("Starting undo process...")
    try:
        logger.info("Undoing favorites...")
        undo_favorites()
        logger.info("Undoing albums...")
        undo_albums()
        logger.info("Undoing events...")
        undo_events()
        logger.info("Undoing groups...")
        undo_groups()
        logger.info("Undoing photos...")
        undo_photos()
        logger.info("Undoing users...")
        undo_users()
        logger.info("Undo process completed successfully.")
    except Exception as e:
        logger.error(f"Undo process failed: {e}")
        raise
    undo_events()
    undo_groups()
    undo_photos()
    undo_users()
