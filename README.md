# Mobile Backend Starter

A professional Node.js backend starter kit for mobile applications with authentication, email verification, and password reset functionality.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Naming Conventions](#naming-conventions)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Scripts](#scripts)
- [Development](#development)
- [Production](#production)
- [Database](#database)
- [Authentication](#authentication)
- [Email Service](#email-service)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Logging](#logging)
- [Code Quality](#code-quality)
- [Git Hooks](#git-hooks)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This is a production-ready backend starter kit for mobile applications built with Node.js, Express, and TypeScript. It provides a solid foundation for building scalable mobile backends with essential features like:

- User authentication (signup, login)
- Email verification
- Password reset functionality
- JWT-based authentication
- Rate limiting for security
- Comprehensive error handling
- Structured logging
- Database migrations
- Code quality tools

## Tech Stack

### Core Technologies

- **Node.js**: JavaScript runtime for server-side development
- **TypeScript**: Strongly typed JavaScript for better code quality
- **Express**: Web framework for Node.js
- **Prisma**: Modern database ORM for TypeScript
- **PostgreSQL**: Relational database

### Authentication & Security

- **JWT (JSON Web Tokens)**: For secure authentication
- **bcryptjs**: For password hashing
- **Helmet**: Security middleware for Express
- **express-rate-limit**: Rate limiting for API endpoints
- **CORS**: Cross-Origin Resource Sharing middleware

### Email Service

- **Nodemailer**: For sending emails
- **SMTP**: Email delivery protocol

### Development & Build Tools

- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting
- **Husky**: Git hooks management
- **Commitlint**: Commit message linting
- **tsc-alias**: TypeScript path aliasing
- **tsx**: TypeScript execution
- **PM2**: Production process manager

### Logging & Monitoring

- **Pino**: Fast JSON logger
- **pino-pretty**: Pretty logging for development

## Project Structure

```bash
src/
├── app.ts                  # Main Express application setup
├── server.ts               # Server entry point
├── config/                 # Configuration files
│   ├── env.config.ts       # Environment variables validation
│   ├── mail.config.ts      # Email configuration
│   └── prisma.config.ts    # Prisma configuration
├── modules/                # Feature modules
│   └── auth/               # Authentication module
│       ├── controller/     # Route controllers
│       ├── repository/     # Database repositories
│       ├── routes/         # API routes
│       ├── schema/         # Request validation schemas
│       ├── service/        # Business logic
│       ├── types/          # Type definitions
│       └── utils/          # Utility functions
├── routes/                 # Route aggregation
├── shared/                 # Shared utilities and services
│   ├── constants/          # Application constants
│   ├── database/           # Database connection
│   ├── email/              # Email services
│   │   ├── send-email.ts   # Email sending utility
│   │   └── templates/      # Email templates
│   ├── logger/             # Logging utilities
│   ├── mappers/            # Data transformation
│   ├── middlewares/        # Express middlewares
│   └── utils/              # Utility functions
└── types/                  # Global type definitions

prisma/                    # Prisma ORM files
├── schema.prisma           # Database schema
├── migrations/             # Database migrations
└── generated/              # Generated Prisma client

config/                    # Configuration files
├── .env.sample             # Environment variables template
├── .gitignore              # Git ignore rules
├── .prettierrc             # Prettier configuration
├── commitlint.config.cjs    # Commit message linting
├── ecosystem.config.cjs    # PM2 configuration
├── eslint.config.mjs       # ESLint configuration
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## Naming Conventions

### Files and Directories

- **kebab-case**: Used for file and directory names (e.g., `auth.controller.ts`, `email-templates/`)
- **PascalCase**: Used for TypeScript types and interfaces (e.g., `AuthResponse`, `PublicUser`)
- **camelCase**: Used for variables, functions, and methods (e.g., `signupService`, `generateToken`)

### Modules

- **Controller**: Handles HTTP requests and responses (e.g., `auth.controller.ts`)
- **Service**: Contains business logic (e.g., `auth.service.ts`)
- **Repository**: Database operations (e.g., `auth.repository.ts`)
- **Schema**: Request validation schemas (e.g., `auth.schema.ts`)
- **Types**: Type definitions (e.g., `auth.types.ts`)
- **Utils**: Utility functions (e.g., `auth.utils.ts`)

### Routes

- RESTful naming conventions for API endpoints
- Versioned API routes (e.g., `/api/v1/auth`)

## Environment Variables

Create a `.env` file in the root directory based on `.env.sample`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
JWT_SECRET="your_jwt_secret"

PORT=4000

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
MAIL_FROM="Luna Ai <no-reply@lunaai.com>"
APP_URL=http://localhost:3000

NODE_ENV=development
LOG_LEVEL=info
CORS_ORIGINS=http://localhost:3000,http://localhost:4000
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-repo/mobile-backend-starter.git
cd mobile-backend-starter
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.sample .env
# Edit .env with your configuration
```

4. Set up the database:

```bash
npm run db:dev
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build TypeScript code to JavaScript |
| `npm run start` | Start production server using PM2 |
| `npm run lint` | Run ESLint for code quality checks |
| `npm run format` | Format code using Prettier |
| `npm run type-check` | TypeScript type checking |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:migrate:dev` | Create and apply database migrations |
| `npm run prisma:migrate:reset` | Reset database and apply migrations |
| `npm run prisma:studio` | Open Prisma Studio for database management |
| `npm run prisma:db-pull` | Pull database schema |
| `npm run db:reset` | Reset database and generate Prisma client |
| `npm run db:pull` | Pull database schema and generate Prisma client |
| `npm run db:dev` | Apply migrations and generate Prisma client |

## Development

To start the development server:

```bash
npm run dev
```

The server will start on `http://localhost:4000` (or the port specified in your `.env` file).

### Hot Reloading

The development server uses `tsx` for hot reloading. Changes to TypeScript files will automatically restart the server.

### Debugging

Use `pino-pretty` for formatted logging in development:

```bash
DEBUG=* npm run dev
```

## Production

To build and start the production server:

```bash
npm run build
npm run start
```

The production server uses PM2 for process management, automatic restarts, and load balancing.

### PM2 Configuration

The `ecosystem.config.cjs` file contains PM2 configuration:

```javascript
module.exports = {
  apps: [
    {
      name: 'luna-ai',
      script: 'dist/src/server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
```

## Database

### Prisma ORM

This project uses Prisma as the ORM for database operations. The database schema is defined in `prisma/schema.prisma`.

### Database Models

1. **User**: Stores user information
   - `id`: Unique identifier
   - `email`: User email (unique)
   - `password`: Hashed password
   - `name`: Optional user name
   - `role`: User role (USER or ADMIN)
   - `isVerified`: Email verification status
   - `createdAt`: Creation timestamp
   - `updatedAt`: Last update timestamp

2. **PasswordResetToken**: Stores password reset tokens
   - `id`: Unique identifier
   - `code`: Reset code
   - `expiresAt`: Expiration timestamp
   - `userId`: Reference to user

3. **EmailVerificationToken**: Stores email verification tokens
   - `id`: Unique identifier
   - `code`: Verification code
   - `expiresAt`: Expiration timestamp
   - `userId`: Reference to user (unique)

### Database Operations

- **Migrations**: Use `npm run db:dev` to create and apply migrations
- **Studio**: Use `npm run prisma:studio` to manage the database with Prisma Studio
- **Reset**: Use `npm run db:reset` to reset the database

## Authentication

### JWT Authentication

The project uses JWT (JSON Web Tokens) for authentication. Tokens are generated upon successful login and must be included in subsequent requests.

### Authentication Flow

1. **Signup**: User registers with email and password
2. **Email Verification**: User receives a verification code via email
3. **Login**: User logs in with verified credentials
4. **Token Generation**: JWT token is generated and returned
5. **Protected Routes**: Token is used to access protected endpoints

### Password Reset Flow

1. **Forgot Password**: User requests password reset
2. **Reset Code**: User receives a reset code via email
3. **Reset Password**: User submits new password with the reset code

## Email Service

### Email Templates

The project includes two email templates:

1. **Verification Email**: Sent when a user signs up
2. **Password Reset Email**: Sent when a user requests password reset

### Email Configuration

Configure SMTP settings in the `.env` file:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
MAIL_FROM="AppName <no-reply@domain.com>"
```

## API Endpoints

### Authentication Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/auth/signup` | POST | User registration |
| `/api/v1/auth/login` | POST | User login |
| `/api/v1/auth/verify` | POST | Email verification |
| `/api/v1/auth/forgot-password` | POST | Request password reset |
| `/api/v1/auth/reset-password` | POST | Reset password |

### Request Examples

#### Signup

```bash
curl -X POST http://localhost:4000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123", "name": "John Doe"}'
```

#### Login

```bash
curl -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

#### Verify Email

```bash
curl -X POST http://localhost:4000/api/v1/auth/verify \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "code": "123456"}'
```

#### Forgot Password

```bash
curl -X POST http://localhost:4000/api/v1/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com"}'
```

#### Reset Password

```bash
curl -X POST http://localhost:4000/api/v1/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "code": "123456", "newPassword": "newpassword123"}'
```

## Error Handling

The project includes comprehensive error handling with:

- **Zod Validation Errors**: For request validation
- **AppError**: Custom error class for business logic errors
- **Global Error Handler**: Middleware for consistent error responses

### Error Response Format

```json
{
  "success": false,
  "message": "Error message",
  "errors": ["Validation errors"]
}
```

## Logging

### Pino Logger

The project uses Pino for structured logging:

- **Development**: Pretty-printed logs with colors
- **Production**: JSON-formatted logs for easy parsing

### Log Levels

Configure log level in `.env`:

```env
LOG_LEVEL=info
```

Available levels: `fatal`, `error`, `warn`, `info`, `debug`, `trace`

## Code Quality

### ESLint

ESLint is configured with:

- TypeScript support
- Prettier integration
- Import sorting
- Unused imports detection

### Prettier

Prettier is configured for consistent code formatting:

```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "trailingComma": "all"
}
```

### Commitlint

Commit messages follow the Conventional Commits specification:

```bash
feat: add new feature
fix: fix a bug
chore: maintenance tasks
docs: documentation changes
refactor: code refactoring
test: add tests
style: code style changes
add: add new files
```

## Git Hooks

### Husky

Git hooks are managed by Husky:

- **pre-commit**: Runs type checking, linting, and formatting
- **commit-msg**: Validates commit messages

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Commit your changes: `git commit -m "feat: add your feature"`
5. Push to the branch: `git push origin feature/your-feature`
6. Open a pull request

### Code Style

- Follow the existing code style
- Use TypeScript types for all functions
- Write clear and concise commit messages
- Keep functions small and focused
- Add comments for complex logic

## License

This project is licensed under the ISC License.

## Support

For questions or issues, please open an issue on the GitHub repository.

---

© 2025 Mobile Backend Starter. All rights reserved.
