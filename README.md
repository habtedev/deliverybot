# DeliveryBot (FoodCampus)

This repo contains two apps:

- `client` — Next.js frontend (app router) with Tailwind + Framer Motion.
- `server` — Express + MongoDB + Telegram bot (node-telegram-bot-api).

## Local development

1. Start the backend

```bash
cd server
cp .env.example .env   # set MONGODB_URI, BOT_TOKEN, JWT_SECRET, FRONTEND_URL
npm install
npm run dev
```

2. Start the frontend

```bash
cd client
npm install
npm run dev
```

## Environment variables

`server/.env` should include:

- `MONGODB_URI` — MongoDB connection string
- `BOT_TOKEN` — Telegram bot token
- `JWT_SECRET` — strong secret used to sign JWTs
- `FRONTEND_URL` — public URL of the frontend (e.g. https://your-site.com). Used to generate web_app links in Telegram.

On Vercel, set these values in Project Settings → Environment Variables.

## Production notes

- Ensure `JWT_SECRET` is set in production and is the same secret the backend uses to sign tokens.
- The middleware in `client/middleware.ts` uses `jose` and expects `JWT_SECRET` available in the Edge runtime environment.
- If your hosting does not install devDependencies during build, move `autoprefixer` to `dependencies` or ensure it's installed during build.
