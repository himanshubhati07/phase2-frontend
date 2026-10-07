# interrrrr

interrrrr is a personal task-management workspace with authentication, task search and filtering, and browser-persisted task CRUD flows. It includes dashboard summaries and task detail actions for completion, editing, and confirmed deletion.

## Tech stack
Vue 3 (Composition API, <script setup>) + TypeScript, Vite, Tailwind CSS,
Vue Router, Pinia.

## Getting started
```
npm install --legacy-peer-deps
cp .env.example .env
npm run dev
```
Then open http://localhost:50391

## Environment variables
See .env.example. VITE_API_URL is optional — every entity runs on local
mock data (USE_MOCK = true in each src/stores/<entity>.ts) until it's set
and each entity's flag is flipped to false.

## Project structure
src/assets — Global Tailwind stylesheet.
src/components — Reusable navigation, status badge, and task form components.
src/data — Typed development seed records.
src/layouts — Authenticated application shell.
src/router — Application route definitions and authentication guard.
src/services — Shared API client and request error toast handling.
src/stores — Pinia authentication and task stores.
src/types — Shared TypeScript entity definitions.
src/validation — Reusable field validation helpers.
src/views — Route-level screens and smoke tests.
