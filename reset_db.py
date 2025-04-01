"""
Database reset utility for Shutr application.
This script will reset the database to use the correct database file.
"""
import os
import sys
from pathlib import Path

def main():
    # Print current environment variables
    print("Current environment variables:")
    print(f"FLASK_APP: {os.environ.get('FLASK_APP')}")
    print(f"FLASK_ENV: {os.environ.get('FLASK_ENV')}")
    print(f"DATABASE_URL: {os.environ.get('DATABASE_URL')}")
    
    # Check if instance directory exists
    instance_dir = Path("instance")
    if not instance_dir.exists():
        instance_dir.mkdir()
        print(f"Created instance directory: {instance_dir}")
    
    # Remove old database files
    old_db = instance_dir / "dev_db.db"
    if old_db.exists():
        old_db.unlink()
        print(f"Removed old database: {old_db}")
    
    # Create empty new database file to ensure correct permissions
    new_db = instance_dir / "dev.db"
    if new_db.exists():
        new_db.unlink()
        print(f"Removed existing database: {new_db}")
    
    # Touch the file to create it
    new_db.touch()
    print(f"Created empty database file: {new_db}")
    
    print("\nDatabase has been reset. Now you can run:")
    print("flask db upgrade")
    print("flask seed all")

if __name__ == "__main__":
    main()
