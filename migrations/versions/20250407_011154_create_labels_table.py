from alembic import op
import sqlalchemy as sa

revision = 'xxxxxx_create_labels_table'
down_revision = 'previous_migration'
branch_labels = None
depends_on = None

def upgrade():
    op.create_table(
        'labels',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('photo_id', sa.Integer(), sa.ForeignKey('photos.id'), nullable=False),
        sa.Column('text', sa.String(length=255), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('NOW()')),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('NOW()'), onupdate=sa.text('NOW()'))
    )

def downgrade():
    op.drop_table('labels')
