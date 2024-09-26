# My Chat App

This is a simple chat application built using Next.js, Prisma, and MySQL. It features user authentication, OTP-based signup, and email verification using Mailtrap.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Scripts](#scripts)
- [Technologies Used](#technologies-used)

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
    git clone https://github.com/your-username/your-repository.git
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

# Application domain used in verification and reset email links
DOMAIN=http://localhost:3000

# Mailtrap credentials for testing email sending
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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
