# salvt — Routes & Navigation

## How to run
cd /workspace/frontend_runs/dfc64683-16a2-41a0-9a5d-c34958422800/project
npm install --legacy-peer-deps && npm run dev
Then open http://localhost:55939

## Routes

| Route | Page file | Description |
|-------|-----------|-------------|
| /     | redirects | Redirects to the main screen |
| /dashboard | src/pages/Dashboard.svelte | Dashboard view for app |
| /login | src/pages/Login.svelte | Login page for user authentication |
| /users/:id | src/pages/UserDetail.svelte | Detail view for a specific user |
| * | src/pages/NotFound.svelte | NotFound page for unknown routes |

## Navigation map
- Dashboard -> Users (sidebar link)
- Dashboard -> UserDetail (click user row)
- Login -> Dashboard (submit form)
- Any page -> NotFound (unknown URL)

## Shared components
- src/components/Layout.svelte - layout shell for pages.
- src/components/Sidebar.svelte - navigation sidebar.
- src/components/TopBar.svelte - top bar with options.
- src/components/RequireAuth.svelte - component to protect routes.