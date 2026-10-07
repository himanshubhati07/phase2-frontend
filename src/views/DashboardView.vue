<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import StatusBadge from '../components/StatusBadge.vue'
import { useAuthStore } from '../stores/auth'
import { useTaskStore } from '../stores/tasks'
import type { Task } from '../types'

const router = useRouter()
const auth = useAuthStore()
const store = useTaskStore()
const tasks = ref<Task[]>([])
const loading = ref(true)
const error = ref('')
const stats = computed(() => ({ total: tasks.value.length, pending: tasks.value.filter((task) => task.status === 'Pending').length, progress: tasks.value.filter((task) => task.status === 'In Progress').length, complete: tasks.value.filter((task) => task.status === 'Completed').length }))

async function loadDashboard(): Promise<void> {
  loading.value = true
  error.value = ''

  try {
    tasks.value = await store.getAll()
  } catch {
    error.value = 'Unable to load your task summary. Please try again.'
  } finally {
    loading.value = false
  }
}

onMounted(loadDashboard)
</script>

<template>
  <section>
    <div class="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div><p class="text-sm text-muted">{{ new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }) }}</p><h1 class="mt-1 text-3xl font-bold tracking-tight">Good to see you, {{ auth.currentUser?.name.split(' ')[0] }}</h1><p class="mt-2 text-sm text-muted">Here's a snapshot of your current workload.</p></div>
      <button type="button" class="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm" @click="router.push('/tasks/new')">+ Add task</button>
    </div>
    <p v-if="error" class="mt-5 rounded-xl bg-red-50 p-3 text-sm text-danger">{{ error }} <button type="button" class="ml-2 font-semibold underline" @click="loadDashboard">Retry</button></p>
    <div v-if="loading" class="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><div v-for="number in 4" :key="number" class="h-32 animate-pulse rounded-card bg-white" /></div>
    <div v-else class="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <article v-for="item in [{ label: 'All tasks', value: stats.total, tone: 'text-ink' }, { label: 'Pending', value: stats.pending, tone: 'text-warning' }, { label: 'In progress', value: stats.progress, tone: 'text-info' }, { label: 'Completed', value: stats.complete, tone: 'text-success' }]" :key="item.label" class="rounded-card bg-white p-6 shadow-sm"><p class="text-sm text-muted">{{ item.label }}</p><p :class="item.tone" class="mt-3 text-4xl font-bold">{{ item.value }}</p></article>
    </div>
    <div class="mt-8 rounded-card bg-white shadow-sm">
      <div class="flex items-center justify-between border-b border-border px-6 py-5"><div><h2 class="text-lg font-bold">Recent tasks</h2><p class="mt-1 text-sm text-muted">Your most recently added work.</p></div><button type="button" class="text-sm font-semibold text-primary" @click="router.push('/tasks')">View all</button></div>
      <div v-if="loading" class="space-y-3 p-6"><div v-for="number in 3" :key="number" class="h-16 animate-pulse rounded-lg bg-slate-100" /></div>
      <div v-else-if="tasks.length" class="divide-y divide-border"><button v-for="task in tasks.slice(0, 5)" :key="task.id" type="button" class="flex w-full items-center justify-between gap-3 px-6 py-4 text-left hover:bg-slate-50" @click="router.push(`/tasks/${task.id}`)"><div><p class="font-semibold">{{ task.title }}</p><p class="mt-1 text-xs text-muted">Due {{ task.dueDate }}</p></div><StatusBadge :value="task.status" kind="status" /></button></div>
      <div v-else class="p-10 text-center"><p class="font-semibold">No tasks yet</p><p class="mt-1 text-sm text-muted">Create your first task to see it here.</p></div>
    </div>
  </section>
</template>
