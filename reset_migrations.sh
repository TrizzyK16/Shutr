#!/bin/bash

# Remove the migrations folder
rm -rf migrations/

# Remove the dev.db file
rm -f instance/dev.db

# Initialize migrations
flask db init

# Create initial migration
flask db migrate -m "initial migration"

# Apply migrations
flask db upgrade

# Seed the database
flask seed all
