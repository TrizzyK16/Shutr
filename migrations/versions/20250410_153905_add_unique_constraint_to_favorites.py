"""Add unique constraint to favorites table

Revision ID: 20250410_153905
Revises: 9f24c2a41a88
Create Date: 2025-04-10 15:39:05.000000

"""
from alembic import op
import sqlalchemy as sa
import os

environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '20250410_153905'
down_revision = '9f24c2a41a88'
branch_labels = None
depends_on = None


def upgrade():
    # Add unique constraint for user_id and photo_id
    if environment == "production":
        op.execute(f"ALTER TABLE {SCHEMA}.favorites ADD CONSTRAINT unique_user_photo_favorite UNIQUE (user_id, photo_id)")
    else:
        op.create_unique_constraint('unique_user_photo_favorite', 'favorites', ['user_id', 'photo_id'])

def downgrade():
    # Remove unique constraint
    if environment == "production":
        op.execute(f"ALTER TABLE {SCHEMA}.favorites DROP CONSTRAINT IF EXISTS unique_user_photo_favorite")
    else:
        op.drop_constraint('unique_user_photo_favorite', 'favorites', type_='unique')
