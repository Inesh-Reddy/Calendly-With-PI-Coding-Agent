# Calendly With Pi Agent

A TypeScript Node.js monorepo for a Calendly-style backend API built with Express, Prisma, PostgreSQL, Zod, and JWT authentication.

## Project structure

```text
calendly-with-pi-agent/
├── package.json              # Root workspace config
├── package-lock.json
├── README.md
└── server/
    ├── docker-compose.yml    # PostgreSQL service
    ├── package.json          # Server workspace
    ├── prisma/
    │   └── schema.prisma     # Prisma schema
    ├── prisma7.config.ts
    ├── src/
    │   ├── app.ts
    │   ├── server.ts
    │   ├── config/
    │   ├── controllers/
    │   ├── middlewares/
    │   ├── routes/
    │   ├── schemas/
    │   ├── services/
    │   └── types/
    └── tsconfig.json
```

## Prerequisites

Make sure you have these installed:

- Node.js
- npm
- Docker and Docker Compose

## Environment variables

Create a `.env` file inside the `server` workspace:

```bash
cd server
cp .env.example .env # if an example file exists
```

If there is no `.env.example`, create `server/.env` manually:

```env
PORT=3001
DATABASE_URL="postgresql://root:root@localhost:5432/calendly-db?schema=public"
JWT_SECRET="change-this-secret"
JWT_EXPIRES_IN="1d"
```

> For local development, the Docker PostgreSQL config uses username `root`, password `root`, and database `calendly-db`.

## Setup

From the project root:

```bash
npm install
```

Start PostgreSQL:

```bash
cd server
docker compose up -d
```

Return to the root folder:

```bash
cd ..
```

Push the Prisma schema to the database:

```bash
npm run db:push -w server
```

Generate Prisma client:

```bash
npm run prisma:generate -w server
```

Start the dev server:

```bash
npm run dev
```

The server runs on:

```text
http://localhost:3001
```

## Available scripts

### Root workspace

```bash
npm run dev
```

Runs the `server` workspace in development mode.

### Server workspace

```bash
npm run dev -w server
```

Starts the Express server with Nodemon and TSX.

```bash
npm run build -w server
```

Runs TypeScript type checking.

```bash
npm run db:push -w server
```

Pushes Prisma schema changes to PostgreSQL.

```bash
npm run prisma:generate -w server
```

Generates the Prisma client.

## API endpoints

### Health check

```http
GET /health
```

Example:

```bash
curl http://localhost:3001/health
```

### Signup

```http
POST /api/auth/signup
```

Request body:

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

Example:

```bash
curl -X POST http://localhost:3001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

### Signin

```http
POST /api/auth/signin
```

Request body:

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

Example:

```bash
curl -X POST http://localhost:3001/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Database

The local PostgreSQL container is defined in:

```text
server/docker-compose.yml
```

Useful Docker commands:

```bash
cd server

docker compose up -d      # Start PostgreSQL
docker compose down       # Stop PostgreSQL
docker compose logs -f    # View logs
```

To reset the local database volume:

```bash
cd server
docker compose down -v
docker compose up -d
cd ..
npm run db:push -w server
```

## Notes for developers

- Root package is an npm workspace monorepo.
- Current workspace: `server`.
- Auth passwords are hashed using `bcryptjs`.
- JWT tokens are created using `jsonwebtoken`.
- Request validation is handled with `zod`.
- Prisma generated files are ignored by git and can be regenerated with `npm run prisma:generate -w server`.
