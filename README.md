
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
- [Session Management](#session-management)

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
   DB_HOST=
   DB_PORT=5432
   DB_USERNAME=
   DB_PASSWORD=
   DB_DATABASE=gamevault
   SECRET_KEY=
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   UPSTASH_REDIS_REST_URL=
   UPSTASH_REDIS_REST_TOKEN=
   UPSTASH_REDIS_URL=
   NODE_ENV=development
   TYPEORM_SYNC=
   FRONTEND_URL=
   SERVER_PORT=3000
   VERCEL_DEPLOYMENT_URL=
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

- **Genres**

 - `GET /api/genre`: Get all genres
 - `GET /api/genre/`:id: Get a genre by ID
 - `POST /api/genre`: Create a new genre (admin only)
 - `PUT /api/genre/:id`: Update a genre by ID (admin only)
 - `DELETE /api/genre/:id`: Delete a genre by ID (admin only)

- **Recommendations**
 - `GET /api/recommendation/:userId`: Get recommendations for a user

- **Platforms**
 - `GET /api/platforms`: Get all platforms
 - `GET /api/platforms/:platformName/games`: Get games by platform name
 - `POST /api/platforms`: Create a new platform (admin only)
 - `PUT /api/platforms/:id`: Update a platform by ID (admin only)
 - `DELETE /api/platforms/:id`: Delete a platform by ID (admin only)

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

## Session Management

Session management is handled using Redis and `connect-redis` for storing session data. Sessions are configured in `app.js` with the following settings:

- Sessions are stored with a prefix of `sess:`.
- Sessions are set to expire after 2 hours.
- Session cookies are configured to be HTTP-only for security purposes.
- Redis credentials are required and must be set in the environment variables.

This setup helps in maintaining user sessions efficiently and securely.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
