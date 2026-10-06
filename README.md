# home io

home io is a lightweight home-care dashboard for organizing homes and keeping maintenance tasks visible. It includes local demo authentication and browser-persisted home and task data.

## Tech stack
Next.js (App Router) + TypeScript, Tailwind CSS v4.

## Getting started
```
npm install --legacy-peer-deps
cp .env.example .env
npm run dev
```
Then open http://localhost:38847

## Environment variables
See .env.example. NEXT_PUBLIC_API_URL is optional — every entity runs on local mock data (USE_MOCK = true in lib/stores/) until it's set and each entity's flag is flipped to false.

## Project structure
app/ — App Router pages, layouts, and global styling.
components/ — shared UI and client-side shell components.
lib/ — mock data, client stores, API helper, and validation helpers.
types/ — shared TypeScript data models.
