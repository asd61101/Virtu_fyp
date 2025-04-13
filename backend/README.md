# Virtuspace Backend

This is the backend server for the Virtuspace Design Hub application.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

3. Replace the placeholder values in the `.env` file with your actual MongoDB connection string and JWT secret key.

## Running the Server

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on port 5000 by default (or the port specified in your .env file).

## API Endpoints

### Authentication

#### POST /api/auth/signup

Register a new user

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST /api/auth/login

Login with existing credentials

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages in the following format:

```json
{
  "message": "Error message description"
}
```

## Security

- Passwords are hashed using bcrypt
- JWT tokens are used for authentication
- CORS is enabled for frontend communication
- Environment variables are used for sensitive data
