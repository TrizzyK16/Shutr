# migrations/versions/20250403_000001_create_favorites_table.py

"""create favorites table

Revision ID: 20250403_000001
Revises: 20250330_000000_create_albums_table
Create Date: 2025-04-03 12:00:00
"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# Use your actual revision ID, and the correct down_revision
revision = '20250403_000001'
down_revision = '20250330_000000_create_albums_table'  
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'favorites',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('photo_id', sa.Integer(), sa.ForeignKey('photos.id'), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP')),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        # If you want to enforce only one Favorite per user+photo:
        sa.UniqueConstraint('user_id', 'photo_id', name='unique_user_photo')
    )


def downgrade():
    op.drop_table('favorites')
