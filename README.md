# Akshath O K — Portfolio (MERN)

Same design as before, now split into a React (Vite) frontend and an Express + MongoDB backend.

```
client/   React app (Vite) — UI, identical to the original static design
server/   Express API + Mongoose models (MongoDB) — serves project data, stores contact messages
```

## Prerequisites

- Node.js 18+
- MongoDB running locally on the default port (`mongodb://127.0.0.1:27017`)
  - macOS (Homebrew): `brew tap mongodb/brew && brew install mongodb-community && brew services start mongodb-community`
  - or run any local `mongod` you already have

## Setup

```bash
npm run install:all        # installs deps for both server/ and client/
npm install                # installs root dev deps (concurrently)

cp server/.env.example server/.env   # defaults already point at localhost mongo
cp client/.env.example client/.env   # only needed if the API isn't on localhost:5050

npm run seed                # populates MongoDB with the project cards
```

## Run (dev)

```bash
npm run dev                 # runs Express (localhost:5050) and Vite (localhost:5173) together
```

Open http://localhost:5173 — the Vite dev server proxies `/api/*` requests to the Express server, so no CORS setup is needed in dev.

## Build for production

```bash
npm run build                # builds client/dist
npm run dev:server           # or `npm start --prefix server` to run the API
```

Serve `client/dist` from your static host / CDN of choice, and point `VITE_API_URL` (set at build time) at wherever the Express server is deployed.

## What moved where

- The project cards are documents in the `projects` MongoDB collection, served via `GET /api/projects`, seeded by `npm run seed`.
- A new "Or send a message directly" form was added below the existing Contact section (the original mailto button/details are untouched). Submissions POST to `POST /api/contact` and are stored in the `messages` collection.
