# Shutr - Photo Sharing Platform

Shutr is a modern photo sharing platform inspired by Flickr, built with React, Vite, and Flask. This project features a clean, responsive design with a focus on user experience and visual appeal.

## Table of Contents
- [Getting Started](#getting-started)
- [Features](#features)
- [CSS Architecture](#css-architecture)
- [Page Structure](#page-structure)
- [Components](#components)
- [Modal System](#modal-system)
- [Easter Eggs](#easter-eggs)

## Getting Started

To run the application:

1. `cd` into the __react-vite__ folder.
2. Run `npm install` to install dependencies.
3. Launch it with `npm run dev`.
4. In your browser, navigate to [`localhost:5173`].

## Features

- **User Authentication**: Sign up, login, and logout functionality
- **Navigation**: Responsive navigation with dropdown menus
- **Photo Management**: Upload, view, edit, and delete photos
- **Community Features**: Explore photos from all users
- **Responsive Design**: Optimized for all screen sizes

## CSS Architecture

The project uses a modular CSS approach with component-specific stylesheets. Key CSS features include:

### Global Variables

Located in `index.css`, these variables ensure consistency throughout the application:

```css
:root {
  --primary: #0063dc;
  --primary-dark: #0046a6;
  --secondary: #ff0084;
  --text-primary: #333333;
  --text-secondary: #666666;
  --background: #f5f5f5;
  --font-main: 'Arial', sans-serif;
}
```

### Hero Sections

Hero sections are used on main pages (Community, Company, Photos, You) for visual impact:

```css
.hero {
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('path-to-image');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 6rem 2rem;
  text-align: center;
  margin-bottom: 2rem;
}
```

### Card Components

Used for photos, groups, and other content items:

```css
.card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  background-color: white;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}
```

### Responsive Design

Media queries ensure the application looks great on all devices:

```css
@media (max-width: 768px) {
  /* Tablet adjustments */
}

@media (max-width: 480px) {
  /* Mobile adjustments */
}
```

## Page Structure

### Landing Page
- Simple, clean design with call-to-action buttons
- Focus on getting users to sign up or log in

### Navigation
- Two versions: one for logged-in users, one for non-logged-in users
- Dropdown menu for user actions
- Mobile-responsive hamburger menu

### Photos Page
- Hero section with background image
- Tabs for "Explore All Photos" and "Your Photos"
- Grid layout for photo display
- Upload button for logged-in users

### You Page (Dashboard)
- Personalized hero section with user greeting
- Quick action buttons for common tasks
- Section for user's recent photos

### Community Page
- Tabs for Groups, Events, and Forums
- Card-based layout for community content
- Join button for non-members

### Company Page
- Team section with officer profiles
- Ed Sheeran easter egg as "Chief Hearthrob Officer"

## Components

### Modal System
- Reusable modal component with close button
- Used for login, signup, and photo upload forms
- Backdrop click to close

### Photo Components
- PhotoList: Grid display of photos with hover effects
- PhotoForm: Form for uploading and editing photos
- DeletePhotoButton: Confirmation modal before deletion

### Navigation Components
- NavUser: Navigation for logged-in users
- NavNUser: Navigation for non-logged-in users
- ProfileButton: Dropdown menu for user actions

## Easter Eggs

- **Ed Sheeran**: Added as the "Chief Hearthrob Officer" on the Company page
- **Close Button**: All modals have a consistent close button in the upper right corner

## Styling Conventions

- BEM-inspired class naming (e.g., `photos-hero__title`)
- Consistent color scheme using CSS variables
- Responsive design with mobile-first approach
- Hover effects for interactive elements
- Consistent spacing and typography

## Future Enhancements

- Dark mode toggle
- Custom image upload (currently using URL only)
- User profile customization
- Advanced photo filtering and search
