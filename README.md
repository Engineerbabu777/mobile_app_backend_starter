# Luna Ai Backend

This is the official backend for **Luna Ai**, a high-performance, modular, and scalable Node.js application. Built with modern technologies and a focus on maintainability, Luna Ai provides a robust foundation for enterprise-grade features.

## 🚀 Technologies Used

We have carefully selected a modern tech stack to ensure performance, security, and developer productivity:

- **Node.js & Express**: The core runtime and web framework for handling API requests.
- **TypeScript**: Used throughout the project for static typing and better code quality.
- **Prisma ORM**: A type-safe database client for seamless interaction with PostgreSQL (or other supported databases).
- **Zod**: For schema-based validation of incoming requests and data.
- **JWT (JSON Web Tokens)**: Secure, stateless authentication for user sessions.
- **Bcryptjs**: For industry-standard password hashing and security.
- **Pino**: A high-performance logger for structured and fast logging.
- **Nodemailer**: Used for sending transactional emails (verification, password reset).
- **Husky & Lint-staged**: To ensure code quality through pre-commit hooks.
- **ESLint & Prettier**: For consistent code style and formatting.

## 🏗 Project Architecture

Luna Ai follows a **Modular Structure**, where each feature (e.g., Auth, User) is encapsulated in its own directory within `src/modules`. This ensures:

- **Encapsulation**: Each module contains its own routes, controllers, services, repositories, and schemas.
- **Scalability**: New features can be added without bloating existing code.
- **Maintainability**: Clear separation of concerns makes the codebase easier to understand and debug.

## 🚦 Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Setup Environment**:
   ```bash
   cp .env.sample .env
   # Update the values in .env
   ```

3. **Database Setup**:
   ```bash
   npm run db:dev
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

Luna Ai is ready to scale with your needs!
