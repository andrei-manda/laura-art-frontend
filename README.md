# Laura Art — Frontend

React + TypeScript + Vite frontend for the Laura Art site, backed by the Strapi CMS in `../backend/laura-art-backend`.

## Prerequisites

- Node.js >= 20
- The Strapi backend (`../backend/laura-art-backend`) running and reachable

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Starts the Vite dev server (defaults to http://localhost:5173).

## Tests

```bash
npm test
```

## Build

```bash
npm run build
```

Type-checks and produces a production build in `dist/`.

## Configuration

The app talks to Strapi via the `VITE_STRAPI_URL` environment variable, set in `.env` (see `.env.example`). It defaults to `http://localhost:1337`.

### Note for this machine

Ports 1337 and 5173 may already be in use by another local project ("Crestem ONG"). If so, run the backend on a different port and point the frontend at it:

```bash
# backend (../backend/laura-art-backend)
PORT=1338 npm run develop

# frontend
VITE_STRAPI_URL=http://localhost:1338 npm run dev
```

Vite will automatically fall back to port 5174 if 5173 is taken.
