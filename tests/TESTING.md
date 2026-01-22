# Running Integration Tests

## Prerequisites

Before running integration tests, you need to have both the database and the Next.js dev server running.

## Steps to Run Tests

### Option 1: Manual Setup (Recommended for development)

1. **Start the services and dev server** (in one terminal):
   ```bash
   npm run dev
   ```
   This will:
   - Start the PostgreSQL database via Docker
   - Start the Next.js dev server on http://localhost:3000

2. **Run the tests** (in another terminal):
   ```bash
   npm test
   # or for watch mode
   npm run test:watch
   ```

### Option 2: Step by Step

1. **Start only the database**:
   ```bash
   npm run services:up
   ```

2. **Start the Next.js dev server**:
   ```bash
   npx next dev
   ```

3. **Run the tests** (in another terminal):
   ```bash
   npm test
   ```

## How It Works

The test suite uses an orchestrator (`tests/orchestrator.js`) that:
- Waits for the web server to be ready
- Retries the connection up to 100 times
- Only runs tests once the server responds with a 200 status

This ensures tests don't fail due to the server not being ready yet.

## Stopping Services

To stop the Docker services:
```bash
npm run services:stop  # Stop but keep containers
# or
npm run services:down  # Stop and remove containers
```
