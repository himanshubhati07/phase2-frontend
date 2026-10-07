# interrrrr — Routes & Navigation

## How to run
cd /workspace/frontend_runs/c99471cd-98d2-44b5-bc35-a53ee67bf63e/project
npm install --legacy-peer-deps && npm run dev -- --port 50391 --strictPort
Then open http://localhost:50391

## Routes

| Route | Component file | Description |
|-------|----------------|-------------|
| / | redirect | Redirects to the main screen |
| /login | src/views/LoginView.vue | Public account sign-in screen |
| /signup | src/views/SignupView.vue | Public account registration screen |
| /forgot-password | src/views/ForgotPasswordView.vue | Password reset request placeholder |
| /dashboard | src/views/DashboardView.vue | Protected task summary dashboard |
| /tasks | src/views/TasksView.vue | Protected searchable and filterable task list |
| /tasks/new | src/views/TaskCreateView.vue | Protected task creation form |
| /tasks/:id | src/views/TaskDetailView.vue | Protected task detail screen |
| /tasks/:id/edit | src/views/TaskEditView.vue | Protected task editing form |
| /:pathMatch(.*)* | src/views/NotFoundView.vue | Unknown URL fallback |

## Navigation map
- Login -> Dashboard (successful sign in)
- Login -> Registration (create an account link)
- Login -> ForgotPassword (forgot password link)
- Registration -> Login (back link or successful account creation)
- Dashboard -> Tasks (view all link and sidebar link)
- Dashboard -> Add Task (add task button)
- Dashboard -> TaskDetail (click recent task)
- Tasks -> Add Task (add task button)
- Tasks -> TaskDetail (click task row)
- Add Task -> TaskDetail (successful task creation)
- Add Task -> Tasks (cancel or back action)
- TaskDetail -> Edit Task (edit action)
- TaskDetail -> Tasks (back action or successful confirmed deletion)
- Edit Task -> TaskDetail (successful save or cancel)
- Any protected page -> Login (unauthenticated guard)
- Any page -> NotFound (unknown URL)

## Shared components
- src/components/Sidebar.vue — Role-aware authenticated navigation and logout confirmation.
- src/components/TopBar.vue — Current-user workspace header.
- src/components/StatusBadge.vue — Status and priority badge presentation.
- src/components/TaskForm.vue — Validated create/edit task fields and actions.
- src/layouts/ShellLayout.vue — Sidebar, top bar, and child route container.

## Design tokens
- primary: #4F46E5
- surface: #FFFFFF
- canvas: #F7F7FB
- ink: #20233A
- muted: #6B7280
- border: #E5E7EB
- success: #16A34A
- danger: #DC2626
- warning: #D97706
- info: #2563EB
