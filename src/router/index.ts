import { createRouter, createWebHistory } from 'vue-router'
import ShellLayout from '../layouts/ShellLayout.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
    { path: '/signup', name: 'signup', component: () => import('../views/SignupView.vue') },
    { path: '/forgot-password', name: 'forgot-password', component: () => import('../views/ForgotPasswordView.vue') },
    {
      path: '/',
      component: ShellLayout,
      meta: { requiresAuth: true },
      children: [
        { path: 'dashboard', name: 'dashboard', component: () => import('../views/DashboardView.vue') },
        { path: 'tasks', name: 'tasks', component: () => import('../views/TasksView.vue') },
        { path: 'tasks/new', name: 'task-create', component: () => import('../views/TaskCreateView.vue') },
        { path: 'tasks/:id', name: 'task-detail', component: () => import('../views/TaskDetailView.vue') },
        { path: 'tasks/:id/edit', name: 'task-edit', component: () => import('../views/TaskEditView.vue') },
      ],
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue') },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.matched.some((record) => record.meta.requiresAuth) && !auth.isAuthenticated) return '/login'
  return true
})

export default router
