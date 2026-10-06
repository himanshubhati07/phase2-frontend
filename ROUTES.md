# home io — Routes & Navigation

## How to run
cd /workspace/frontend_runs/394b8963-c116-4e7d-ac68-5528c8b6bbef/project
npm install --legacy-peer-deps && npx next dev -p 38847
Then open http://localhost:38847

## Routes

| Route | Page file | Description |
|-------|-----------|-------------|
| / | app/page.tsx | Redirects to the main dashboard. |
| /login | app/login/page.tsx | Demo sign-in screen. |
| /signup | app/signup/page.tsx | Account registration screen. |
| /forgot-password | app/forgot-password/page.tsx | Password reset request screen. |
| /dashboard | app/(shell)/dashboard/page.tsx | Authenticated overview with home and task summary. |
| /homes | app/(shell)/homes/page.tsx | Authenticated home collection. |
| /homes/new | app/(shell)/homes/new/page.tsx | New home form. |
| /homes/[id] | app/(shell)/homes/[id]/page.tsx | Dynamic home profile and associated tasks. |
| /tasks | app/(shell)/tasks/page.tsx | Authenticated task list and completion actions. |

## Navigation map
- Login -> Dashboard (successful sign in)
- Signup -> Dashboard (successful registration)
- Login -> ForgotPassword (forgot password link)
- ForgotPassword -> Login (return link)
- Dashboard -> Homes (home CTA and sidebar link)
- Dashboard -> Tasks (task list link and sidebar link)
- Dashboard -> NewHome (add a home CTA)
- Homes -> HomeDetail (click home card)
- Homes -> NewHome (add a home CTA)
- NewHome -> HomeDetail (valid, persisted form submit)
- HomeDetail -> Homes (back button)
- Any authenticated page -> Login (confirmed logout)
- Any page -> NotFound (unknown URL)

## Shared components
- components/AuthFrame.tsx — centered authentication page shell.
- components/AuthGate.tsx — client-side protected-route guard and loading state.
- components/Sidebar.tsx — desktop primary navigation and logout action.
- components/TopBar.tsx — account context and notification control.

## Design tokens
- primary: #2563EB
- surface: #FFFFFF
- canvas: #F7F9FC
- ink: #182230
- muted: #667085
- border: #E4E7EC
- accent: #F4B740
- success: #12B76A
- warning: #F79009
- danger: #F04438
- navy: #153A5B
