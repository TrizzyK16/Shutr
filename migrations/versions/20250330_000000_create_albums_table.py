"""create s and _photos tables

Revision ID: 20250330_000000
Revises: <put_previous_revision_id_here>
Create Date: 2025-03-30
"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic
revision = '20250330_000000'
down_revision = '<put_previous_revision_id_here>'  # This should match the ID in the last migration
branch_labels = None
depends_on = None

def upgrade():
    # Create 's' table
    op.create_table(
        's',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('title', sa.String(length=255), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=False)
    )

    # Create '_photos' association table
    op.create_table(
        '_photos',
        sa.Column('_id', sa.Integer(), sa.ForeignKey('s.id'), primary_key=True),
        sa.Column('photo_id', sa.Integer(), sa.ForeignKey('photos.id'), primary_key=True)
    )


def downgrade():
    op.drop_table('_photos')
    op.drop_table('s')
