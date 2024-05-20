
# GameVault Backend

This is the backend API for the GameVault application, a video game tracker app for tracking video games, user interactions, and recommendations.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Error Handling](#error-handling)
- [Logging](#logging)
- [Security](#security)

## Features

- User authentication and authorization (local strategy, Google OAuth)
- Game CRUD operations
- User game tracking (status, reviews, ratings)
- Session management using Redis
- Role-based access control (admin routes)

## Technologies Used

- Backend: Node.js, Express.js
- Database: PostgreSQL, TypeORM
- Authentication: Passport.js, OAuth
- Session Management: Redis, connect-redis
- Logging: Winston
- Security: Helmet, rate limiting, CORS

## Setup and Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/gamevault-backend.git
   cd gamevault-backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the database**:
   Make sure you have PostgreSQL installed and running. Create a new database for the project.

4. **Configure environment variables**:
   Create a `.env` file in the root directory and add the following environment variables:

   ```env
   NODE_ENV=development
   PORT=3000
   DATABASE_URL=postgres://username:password@localhost:5432/gamevault_db
   SECRET_KEY=your_secret_key
   UPSTASH_REDIS_REST_URL=your_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_redis_token
   ```

## Environment Variables

- `NODE_ENV`: The environment in which the app is running (`development`, `production`).
- `PORT`: The port on which the app will run.
- `DATABASE_URL`: PostgreSQL database connection URL.
- `SECRET_KEY`: Secret key for session management.
- `UPSTASH_REDIS_REST_URL`: Redis URL for session storage.
- `UPSTASH_REDIS_REST_TOKEN`: Redis authentication token.

## Running the Application

1. **Run database migrations**:
   ```bash
   npx typeorm migration:run
   ```

2. **Start the server**:
   ```bash
   npm start
   ```

   The backend API will be available at `http://localhost:3000`.

## API Endpoints

- **Authentication**
  - `POST /api/auth/login`: Log in a user
  - `POST /api/auth/register`: Register a new user
  - `GET /api/auth/logout`: Log out the current user
  - `GET /api/auth/google`: Authenticate with Google OAuth

- **Games**
  - `GET /api/games`: Get all games
  - `GET /api/games/:id`: Get a game by ID
  - `POST /api/games`: Create a new game (admin only)
  - `PUT /api/games/:id`: Update a game by ID (admin only)
  - `DELETE /api/games/:id`: Delete a game by ID (admin only)

- **User Games**
  - `POST /api/user/games`: Add a game to user's list
  - `GET /api/user/games`: Get all games in user's list
  - `GET /api/user/games/:userGameId`: Get specific game in user's list
  - `PUT /api/user/games/:userGameId`: Update user's game status, review, rating
  - `DELETE /api/user/games/:userGameId`: Remove a game from user's list

- **Profile**
  - `GET /api/profile`: Get the user's profile
  - `PUT /api/profile`: Update the user's profile

## Testing

Run the tests using the following command:
```bash
npm test
```

## Error Handling

The application uses centralized error handling middleware to catch and respond to errors consistently.

## Logging

Winston is used for logging. Logs are saved to `error.log` and `combined.log` files.

## Security

- Helmet is used to set security-related HTTP headers.
- Rate limiting is implemented to prevent abuse.
- CORS is configured to allow requests only from the frontend URL in production.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
