# Node.js Backend Starter Code

## Overview

This project is a modular and scalable Node.js backend starter code built with Express.js, TypeScript, and Prisma. It provides a solid foundation for building RESTful APIs with authentication, email verification, password reset, and other common features. The project follows best practices for code organization, error handling, and security.

## Features

- **Modular Architecture**: Organized into modules for better maintainability and scalability.
- **Authentication**: User signup, login, email verification, and password reset.
- **Database**: Uses Prisma ORM for database interactions (PostgreSQL by default).
- **Email Service**: Supports sending verification and password reset emails.
- **Validation**: Uses Zod for request validation.
- **Error Handling**: Centralized error handling middleware.
- **Logging**: Integrated logging with Pino.
- **Security**: Rate limiting, CORS, and JWT-based authentication.

## Project Structure

```bash
src/
├── app.ts                  # Express app configuration
├── server.ts               # Server entry point
├── config/                 # Configuration files
│   ├── mail.config.ts      # Email configuration
│   └── prisma.config.ts    # Prisma configuration
├── modules/                # Feature modules
│   └── auth/               # Authentication module
│       ├── controller/     # Route controllers
│       ├── repository/     # Database repositories
│       ├── routes/         # Route definitions
│       ├── schema/         # Request validation schemas
│       ├── service/        # Business logic
│       ├── types/          # Type definitions
│       └── utils/          # Utility functions
├── routes/                 # Main routes
├── shared/                 # Shared utilities and services
│   ├── constants/          # Constants
│   ├── database/           # Database connection
│   ├── email/              # Email templates and utilities
│   ├── logger/             # Logging setup
│   ├── mappers/            # Data mappers
│   ├── middlewares/        # Express middlewares
│   ├── utils/              # Utility functions
│   └── types/              # Shared type definitions
└── types/                  # Global type definitions
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL (or another database of your choice)
- SMTP server for email functionality

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd backend-nodejs
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Copy the `.env.sample` file to `.env` and update the values:

```bash
cp .env.sample .env
```

4. Set up the database:

```bash
npx prisma migrate dev
```

5. Start the development server:

```bash
npm run dev
```

## Configuration

### Environment Variables

The project uses the following environment variables:

- `DATABASE_URL`: Connection string for your database.
- `JWT_SECRET`: Secret key for JWT token generation.
- `MAIL_FROM`: Email address for sending emails.
- `SMTP_HOST`: SMTP server host.
- `SMTP_PORT`: SMTP server port.
- `SMTP_USER`: SMTP username.
- `SMTP_PASS`: SMTP password.
- `CORS_ORIGINS`: Allowed origins for CORS (comma-separated).
- `PORT`: Port for the server to listen on.

### Database Configuration

The project uses Prisma ORM for database interactions. The database configuration is located in `prisma/schema.prisma`. By default, it is configured to use PostgreSQL. You can change the database provider by updating the `datasource` block in the schema file.

#### Using PostgreSQL

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

#### Using MySQL

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

#### Using SQLite

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

#### Using MongoDB

```prisma
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}
```

After changing the database provider, update the connection string in your `.env` file and run the migrations:

```bash
npx prisma migrate dev
```

## Authentication

The authentication module provides the following endpoints:

- `POST /api/v1/auth/signup`: User signup.
- `POST /api/v1/auth/login`: User login.
- `POST /api/v1/auth/verify`: Verify email.
- `POST /api/v1/auth/forgot-password`: Request password reset.
- `POST /api/v1/auth/reset-password`: Reset password.

### Signup

To signup a new user, send a POST request to `/api/v1/auth/signup` with the following body:

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

### Login

To login a user, send a POST request to `/api/v1/auth/login` with the following body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Email Verification

After signup, a verification email is sent to the user's email address. The user can verify their email by sending a POST request to `/api/v1/auth/verify` with the verification code:

```json
{
  "code": "123456"
}
```

### Forgot Password

To request a password reset, send a POST request to `/api/v1/auth/forgot-password` with the following body:

```json
{
  "email": "user@example.com"
}
```

### Reset Password

To reset the password, send a POST request to `/api/v1/auth/reset-password` with the following body:

```json
{
  "code": "123456",
  "newPassword": "newpassword123",
  "email": "user@example.com"
}
```

## Email Service

The email service is used to send verification and password reset emails. The email templates are located in `src/shared/email/templates/`. You can customize the email templates to match your brand.

### Email Configuration

The email configuration is located in `src/config/mail.config.ts`. Update the SMTP settings in your `.env` file to configure the email service.

## Error Handling

The project includes a centralized error handling middleware located in `src/shared/middlewares/error-handler.ts`. It handles different types of errors, including validation errors, application errors, and unexpected errors.

## Logging

The project uses Pino for logging. The logging configuration is located in `src/shared/logger/logger.ts`. Logs are written to the console in development and to a file in production.

## Validation

The project uses Zod for request validation. The validation schemas are located in the `schema` directory of each module. The validation middlewares are located in `src/shared/middlewares/`.

## Security

The project includes the following security features:

- **Rate Limiting**: Limits the number of authentication attempts to prevent brute force attacks.
- **CORS**: Configures Cross-Origin Resource Sharing to restrict access to the API.
- **JWT**: Uses JSON Web Tokens for authentication.
- **Password Hashing**: Uses bcrypt for password hashing.

## Testing

To run the tests, use the following command:

```bash
npm test
```

## Deployment

To deploy the project, follow these steps:

1. Build the project:

```bash
npm run build
```

2. Start the production server:

```bash
npm start
```

## Contributing

Contributions are welcome! Please follow the contributing guidelines.

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.

## Roadmap

- Add more modules (e.g., user profile, settings).
- Add more tests.
- Add more documentation.
- Add more features (e.g., social login, two-factor authentication).

## Acknowledgements

- Express.js
- Prisma
- Zod
- Pino
- bcrypt
- jsonwebtoken
- nodemailer

## Contact

For any inquiries, please contact the project maintainer.

## Conclusion

This project provides a solid foundation for building scalable and maintainable Node.js backends. It follows best practices for code organization, error handling, and security. You can easily extend it by adding more modules or customizing the existing ones.

Happy coding! 🚀
