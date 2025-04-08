# Shutr: Photo Sharing Platform

## Table of Contents
1. [Introduction](#introduction)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Implementation Details](#implementation-details)
5. [Development Journey](#development-journey)
6. [Challenges and Solutions](#challenges-and-solutions)
7. [Future Enhancements](#future-enhancements)

## Introduction

Shutr is a modern photo sharing platform inspired by Flickr, designed to help photographers showcase their work and build communities around shared interests. The platform enables users to upload, organize, and share photos, create and join groups, attend events, and mark their favorite images.

The project was developed as part of a full-stack web development course, with the goal of creating a feature-rich application that demonstrates proficiency in both frontend and backend technologies.

## Tech Stack

### Backend
- **Framework**: Flask (Python)
- **Database**: PostgreSQL (Production), SQLite (Development)
- **ORM**: SQLAlchemy
- **Migration Tool**: Alembic
- **Authentication**: Flask-Login with JWT tokens

### Frontend
- **Framework**: React with Redux for state management
- **Build Tool**: Vite
- **Styling**: Custom CSS
- **Routing**: React Router

### Deployment
- **Platform**: Render.com
- **Containerization**: Docker
- **CI/CD**: Automatic deployment from GitHub

## Features

### Core Features
1. **User Authentication**
   - Secure signup and login
   - Profile management
   - Session persistence

2. **Photo Management**
   - Photo uploads with captions
   - Photo viewing and browsing
   - Photo editing and deletion
   - Responsive photo grid display

3. **Favorites System**
   - Add/remove photos to favorites
   - View favorites collection
   - Track favorite counts

4. **Groups**
   - Create and join photography groups
   - Group membership management
   - Group photo sharing

5. **Events**
   - Photography events and meetups
   - RSVP functionality
   - Event discovery

6. **Pro Membership**
   - Premium features for dedicated photographers
   - Enhanced profile capabilities

## Implementation Details

### Database Schema
The application uses a relational database with the following key tables:
- `users`: Stores user account information
- `photos`: Contains photo metadata and references to image files
- `favorites`: Junction table linking users to their favorite photos
- `groups`: Information about photography groups
- `group_memberships`: Junction table for user-group relationships
- `events`: Photography events and meetups
- `event_rsvps`: Junction table for user-event relationships

### API Routes
The backend exposes RESTful API endpoints for:
- User authentication and profile management
- Photo CRUD operations
- Favorites management
- Group and event operations

### State Management
Redux is used for frontend state management with the following key slices:
- Session state (current user)
- Photos state
- Favorites state
- Groups state
- Events state

### File Storage
Photos are stored as URLs, with support for both local and cloud-based storage solutions.

## Development Journey

Shutr began as a concept to create a platform where photographers could share their work and connect with others who share their passion. The development process followed these key phases:

1. **Planning and Design**
   - Requirements gathering
   - Database schema design
   - UI/UX wireframing
   - API endpoint planning

2. **Backend Development**
   - Setting up Flask application structure
   - Implementing database models and relationships
   - Creating API routes and controllers
   - Adding authentication and authorization

3. **Frontend Development**
   - Building React components
   - Implementing Redux state management
   - Creating responsive layouts
   - Connecting to backend APIs

4. **Feature Implementation**
   - Core photo functionality
   - User profiles and authentication
   - Groups and events features
   - Favorites system

5. **Testing and Refinement**
   - Manual testing of features
   - Bug fixing and optimization
   - User experience improvements

6. **Deployment**
   - Setting up Render.com deployment
   - Configuring production environment
   - Database migration and seeding

## Challenges and Solutions

### Challenge 1: Database Migration Chain
**Problem**: The migration chain became complex with multiple developers working on different features, leading to conflicts and broken references between migration files.

**Solution**: Implemented a linear migration strategy with clear naming conventions and explicit dependencies. Fixed down_revision references to ensure a proper sequence of migrations.

### Challenge 2: Schema Prefixing in Production
**Problem**: PostgreSQL in production required schema prefixes for tables, which differed from the development SQLite setup, causing deployment failures.

**Solution**: Created a conditional schema handling system using environment variables. Implemented the `add_prefix_for_prod` function to dynamically adjust table references based on the environment.

### Challenge 3: Favorites Feature Implementation
**Problem**: The favorites system required complex relationships and state management across multiple components.

**Solution**: 
- Created a dedicated Redux slice for favorites management
- Implemented bidirectional relationships in the database models
- Added optimistic UI updates for better user experience

### Challenge 4: Deployment Issues
**Problem**: Initial deployment to Render.com failed due to various issues including:
- Double schema prefixing in the Favorite model
- Missing updated_at column in the favorites table
- Circular import problems in model relationships

**Solution**:
- Fixed the Favorite model to avoid double schema prefixing
- Added a migration to add the missing updated_at column
- Restructured imports to prevent circular references
- Updated seed files to handle both development and production environments

## Future Enhancements

1. **Comments and Social Interactions**
   - Allow users to comment on photos
   - Implement notifications for social interactions

2. **Advanced Search**
   - Search by tags, locations, and other metadata
   - Filtering options for photo discovery

3. **Mobile Application**
   - Develop native mobile apps OS and Android
   - Implement push notifications

4. **AI-Powered Features**
   - Automatic photo categorization
   - Content-based recommendations

5. **Analytics Dashboard**
   - Provide users with insights about their photos
   - Track engagement metrics

---

*This wiki was created on April 4, 2025, to document the Shutr project development process and serve as a reference for future contributors.*
