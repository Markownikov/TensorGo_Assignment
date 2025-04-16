# Tensor Go - Project Documentation

**Date:** April 16, 2025

## Project Overview

Tensor Go is a web application with a React frontend and Node.js/Express backend. The application implements Google OAuth authentication and provides various user functionalities through a clean, modern UI. The project also integrates Frill.co for user feedback and feature request management.

## Technology Stack

### Backend
- **Node.js** with **Express.js** framework
- **MongoDB** database with **Mongoose** ODM
- **Passport.js** for authentication
- **JWT** for token-based authentication
- **Express-session** for session management

### Frontend
- **React** (v19.0.0)
- **Vite** as build tool and dev server
- **React Router** (v7.5.0) for client-side routing
- **Axios** for API requests
- **Tailwind CSS** for styling

### Third-Party Integrations
- **Frill.co** - Embedded feedback widget for user feedback collection

## Project Structure

```
/
├── backend/
│   ├── config/
│   │   └── passport.js       # Passport configuration
│   ├── models/
│   │   └── User.js          # User model schema
│   ├── routes/
│   │   └── authRoutes.js    # Authentication routes
│   └── server.js           # Express server setup
├── frontend/
│   ├── public/              # Static assets
│   └── src/
│       ├── assets/          # Frontend assets
│       ├── components/      # React components
│       │   ├── FrillWidget.jsx  # Frill.co feedback widget integration
│       │   └── Navbar.jsx
│       ├── context/
│       │   └── AuthContext.jsx  # Authentication context
│       ├── pages/
│       │   ├── Dashboard.jsx
│       │   ├── Home.jsx
│       │   └── Profile.jsx
│       ├── App.jsx          # Main application component
│       └── main.jsx         # Entry point
├── package.json            # Project dependencies and scripts
└── README.md              # Project documentation
```

## Key Components

### Backend

#### 1. Server Setup (server.js)
The Express server handles API requests, implements middleware for CORS, authentication, and connects to MongoDB.

```javascript
// Key features of server.js:
- Express.js application configuration
- MongoDB connection setup
- Middleware configuration (CORS, JSON parsing, etc.)
- Session and authentication setup with Passport.js
- Route registration
```

#### 2. User Model (User.js)
Defines the MongoDB schema for users.

```javascript
// User schema contains:
- googleId: For OAuth identification
- email: User's email address
- displayName: User's display name
- firstName & lastName: User's personal information
- profilePicture: URL to user's profile image
- timestamps: Created/updated timestamps
```

#### 3. Authentication Routes (authRoutes.js)
Manages authentication flows including Google OAuth.

```javascript
// Key routes:
- /auth/google: Initiates Google OAuth flow
- /auth/google/callback: Google OAuth redirect handler
- /auth/current-user: Returns the currently authenticated user
- /auth/logout: Logs out the current user
```

### Frontend

#### 1. Authentication Context (AuthContext.jsx)
Provides authentication state management across the application.

```javascript
// Key functionalities:
- User state management
- Authentication status checking
- Login and logout functionality
- Error handling
```

#### 2. Application Structure (App.jsx)
The main application component that sets up routing and layout structure.

```javascript
// Features:
- Routing configuration with React Router
- Protected routes for authenticated users
- Layout structure with navbar, main content, and footer
- Integration with authentication context
```

#### 3. Frill Widget (FrillWidget.jsx)
Integrates the Frill.co feedback platform into the application for user feedback collection.

```javascript
// Key functionalities:
- Embedded Frill.co widget via iframe
- Context-aware display triggers based on user authentication state
- User profile information display within the widget interface
- Smart widget appearance based on login status and timing
- Toggle controls for opening and closing the feedback widget
```

## Authentication Flow

1. User clicks "Login" button which redirects to `/auth/google`
2. Google OAuth authentication process occurs
3. On successful authentication, user is redirected back to the application
4. The backend creates or updates the user record in MongoDB
5. Authentication session is maintained through cookies/sessions
6. Frontend uses the AuthContext to manage and reflect authentication state

## API Endpoints

### Authentication
- `GET /auth/google` - Initiates Google OAuth
- `GET /auth/google/callback` - Handles Google OAuth callback
- `GET /auth/current-user` - Returns current authenticated user
- `GET /auth/logout` - Logs out the current user

## Third-Party Integrations

### Frill.co Feedback Widget
The application integrates Frill.co's embedded feedback widget to collect user feedback, feature requests, and bug reports.

**Integration Features:**
- **Contextual Appearance**: Automatically appears to users after login
- **User Authentication Link**: Passes authenticated user information to the feedback system
- **Custom Trigger**: Manual widget activation using Alt+F keyboard shortcut
- **Persistent State Management**: Tracks last login time to prevent excessive widget displays
- **User Information Display**: Shows user profile picture and details within the widget interface
- **Customizable Appearance**: Fully styled to match application theme using Tailwind CSS

**Technical Implementation:**
- Embedded via iframe with sandbox permissions
- Widget ID: 8a299d90-b918-45ee-a19d-ec181fae77c4
- Host: https://nothing-hd.frill.co

## Development Scripts

### Root Project
- `npm run server` - Start backend server with nodemon (dev)
- `npm run client` - Start frontend dev server
- `npm start` - Start production backend server
- `npm run build` - Build frontend and install dependencies

### Frontend
- `npm run dev` - Start Vite development server
- `npm run build` - Build frontend for production
- `npm run lint` - Run ESLint checks
- `npm run preview` - Preview production build

## Dependencies

### Backend Dependencies
- express: Web framework
- mongoose: MongoDB ODM
- passport & passport-google-oauth20: Authentication
- bcrypt: Password hashing
- jsonwebtoken: JWT token management
- cors: Cross-Origin Resource Sharing
- express-session: Session management
- cookie-parser: Parse cookies

### Frontend Dependencies
- react & react-dom: UI library
- react-router-dom: Client-side routing
- axios: HTTP client
- tailwindcss: CSS framework

## Conclusion

Tensor Go demonstrates a modern web application architecture with a React frontend and Express.js backend, implementing industry-standard authentication and following best practices for web development. The integration of Frill.co for user feedback collection enhances the application's user experience and provides a robust channel for gathering user insights and feature requests.