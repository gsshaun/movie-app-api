# Movie App API

This is a RESTful API for a movie application that allows users to manage movies and their favorites. The API provides authentication using Passport and JWT, email verification, and password reset functionality. It can be run both locally and in a Docker container.

## Features

- User authentication with email
- Email verification
- Password reset
- Movie management (create, retrieve, update, delete)
- Favorite movies management (add, remove)

## Prerequisites

Make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MySQL (or any other supported database)
- Docker (optional)

## Getting Started

To get the API up and running, follow these steps:

1. Clone the repository:

```shell
git clone https://github.com/gsshaun/movie-app-api.git
```

2. Install the dependencies:

```shell
cd movie-app-api
npm install
```

3. Set up the environment variables:

Create a `.env` file in the root directory of the project and provide the necessary configuration values. Here's an example:

```
DOMAIN=YOUR_DOMAIN
ETHEREAL_USER=YOUR_ETHEREAL_ID
ETHEREAL_PASS=YOUR_ETHEREAL_PASSWORD
JWT_SECRET=YOUR_ETHEREAL_SECRET
DB_HOST=host.docker.internal
DB_PORT=3306
DB_USER=root
DB_PASSWORD=YOUR_DB_PASSWORD
DB_NAME=movieapi
```

4. Set up the database:

Create a database in your MySQL server with the name specified in the `.env` file. Make sure the database credentials (host, port, username, password) are correctly set in the `.env` file.

5. Start the API:

```shell
npm run start:dev
```

The API will be accessible at `http://localhost:3000`.

## Docker Deployment

If you prefer running the API in a Docker container, follow these additional steps:

1. Build the Docker image:

```shell
docker build -t movieapi .
```

2. Run the Docker container:

```shell
docker run -d -p 3000:3000 --name movieapi-container movieapi
```

The API will be accessible at `http://localhost:3000`

## API Endpoints

The API provides the following endpoints:

### Users

- `POST /users/signup` - Create a new user account
- `POST /users/signin` - Sign in to an existing user account
- `GET /users/verify?token={verificationToken}` - Verify user's email
- `POST /users/forget-password` - Send password reset email
- `POST /users/reset-password` - Reset user's password

### Movies

- `POST /movies` - Create a new movie
- `GET /movies` - Retrieve all movies
- `GET /movies/:id` - Retrieve a specific movie by ID
- `PATCH /movies/:id` - Update a movie
- `DELETE /movies/:id` - Delete a movie

### Favorites

- `POST /favorites/:movieId` - Add a movie to favorites
- `DELETE /favorites/:movieId` - Remove a movie from favorites

## Authentication

Authentication is required to access certain endpoints. When signing up or signing in, the API will return a JWT (JSON Web Token) that should be included in the `Authorization` header of subsequent requests as a Bearer token. Example:

```
Authorization: Bearer <jwt_token>
```

## Testing

You can run the tests for the API using the following command:

```shell
npm run test
```

## Contributing

Contributions are welcome! If

 you find any issues or have suggestions for improvements, please create a new issue or submit a pull request.

## License

This project is licensed under the [UNLICENSED](LICENSE) license.
