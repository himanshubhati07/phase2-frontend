# salvt

An educational app designed for 2-year-old children to enhance learning.

## Tech stack
Svelte 5 + TypeScript, Vite, Tailwind CSS, svelte-routing, axios.

## Getting started
```
npm install --legacy-peer-deps
cp .env.example .env
npm run dev
```
Then open http://localhost:55939

## Environment variables
See .env.example. VITE_API_URL is optional — every entity runs on local mock data (USE_MOCK = true in src/data/store.ts) until it's set and each entity's flag is flipped to false.

## Project structure
src/pages
src/components
src/data
src/api
src/auth