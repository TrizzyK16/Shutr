# migrations/versions/xxxx_create_photos_table.py
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic
revision = '20250329_064305_create_photos_table'
down_revision = '20201120_150602_create_users_table'
branch_labels = None
depends_on = None

def upgrade():
    op.create_table(
        'photos',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('image_url', sa.String(length=255), nullable=False),
        sa.Column('caption', sa.String(length=500)),
        sa.Column('created_at', sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.Column('updated_at', sa.DateTime(), nullable=False, server_default=sa.func.now())
    )

def downgrade():
    op.drop_table('photos')
