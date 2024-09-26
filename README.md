# My Chat App

This is a simple chat application built using Next.js, Prisma, and MySQL. It features user authentication, OTP-based signup, and email verification using Mailtrap.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)

## Features

- **User Signup**: User registration with OTP email verification.
- **Authentication**: JWT-based authentication for login.
- **Email Service**: Send OTP and password reset links using Mailtrap.
- **Secure Passwords**: Passwords are encrypted using `bcryptjs`.

## Prerequisites

- **Node.js** (>= 18)
- **MySQL** (>= 5.7 or 8)
- **Mailtrap**: For email services during development.
  
## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/rajnagoriya/ass-chat-app.git
    cd your-repository
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up the database**:
   Make sure you have MySQL installed and running. Create a database for the application, then update your `.env` file with your MySQL connection URL.

4. **Generate Prisma client**:
   After setting up the environment variables (especially the `DATABASE_URL`), generate the Prisma client by running:
    ```bash
    npx prisma generate
    ```

5. **Run database migrations**:
    ```bash
    npx prisma migrate dev
    ```

## Environment Variables

Create a `.env` file in the root directory and configure the following environment variables:

```bash
# MySQL database connection URL for Prisma
DATABASE_URL="mysql://root:password@localhost:3306/my_chat_app"

# Mailtrap credentials for testing email sending or your maile sender credentials
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your-mailtrap-username
SMTP_PASS=your-mailtrap-password

# JWT secret key for token generation
JWT_SECRET=your-secret-key


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
