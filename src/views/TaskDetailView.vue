<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import StatusBadge from '../components/StatusBadge.vue'
import { useTaskStore } from '../stores/tasks'
import type { Task } from '../types'

const route = useRoute()
const router = useRouter()
const store = useTaskStore()
const task = ref<Task | null>(null)
const loading = ref(true)
const success = ref('')
const error = ref('')
const confirmingDelete = ref(false)

async function loadTask(): Promise<void> {
  loading.value = true
  error.value = ''
  try {
    task.value = await store.getById(route.params.id as string) ?? null
  } catch {
    error.value = 'Unable to load this task. Please try again.'
  } finally {
    loading.value = false
  }
}

async function complete(): Promise<void> {
  if (!task.value) return
  error.value = ''
  try {
    task.value = await store.update(task.value.id, { ...task.value, status: 'Completed' })
    success.value = 'Task marked as completed.'
  } catch {
    error.value = 'Unable to update this task. Please try again.'
  }
}

async function removeTask(): Promise<void> {
  if (!task.value) return
  error.value = ''
  try {
    await store.remove(task.value.id)
    router.push('/tasks')
  } catch {
    error.value = 'Unable to delete this task. Please try again.'
  }
}

onMounted(loadTask)
</script>

<template>
  <section class="mx-auto max-w-4xl"><button type="button" class="text-sm font-semibold text-primary" @click="router.push('/tasks')">← Back to tasks</button><div v-if="loading" class="mt-6 h-80 animate-pulse rounded-card bg-white" /><div v-else-if="!task" class="mt-6 rounded-card bg-white p-10 text-center"><h1 class="text-xl font-bold">Task not found</h1><p class="mt-2 text-sm text-muted">It may have been removed or you may not have access to it.</p><button type="button" class="mt-5 font-semibold text-primary" @click="router.push('/tasks')">View tasks</button></div><article v-else class="mt-6 rounded-card bg-white p-7 shadow-sm sm:p-9"><div class="flex flex-col justify-between gap-5 sm:flex-row"><div><div class="flex flex-wrap gap-2"><StatusBadge :value="task.status" kind="status" /><StatusBadge :value="task.priority" kind="priority" /></div><h1 class="mt-5 text-3xl font-bold tracking-tight">{{ task.title }}</h1></div><div class="flex gap-2"><button type="button" class="rounded-xl border border-border px-4 py-2 text-sm font-semibold" @click="router.push(`/tasks/${task.id}/edit`)">Edit</button><button type="button" class="rounded-xl border border-red-100 px-4 py-2 text-sm font-semibold text-danger" @click="confirmingDelete = true">Delete</button></div></div><p v-if="error" class="mt-6 rounded-xl bg-red-50 p-3 text-sm text-danger">{{ error }} <button type="button" class="ml-2 font-semibold underline" @click="loadTask">Retry</button></p><p v-if="success" class="mt-6 rounded-xl bg-green-50 p-3 text-sm text-success">{{ success }}</p><p class="mt-8 max-w-2xl whitespace-pre-line text-[15px] leading-7 text-slate-700">{{ task.description }}</p><div class="mt-8 grid gap-4 border-y border-border py-6 sm:grid-cols-2"><div><p class="text-xs font-bold uppercase tracking-wide text-muted">Due date</p><p class="mt-2 font-semibold">{{ task.dueDate }}</p></div><div><p class="text-xs font-bold uppercase tracking-wide text-muted">Last updated</p><p class="mt-2 font-semibold">{{ new Date(task.updatedAt).toLocaleDateString() }}</p></div></div><button v-if="task.status !== 'Completed'" type="button" class="mt-7 rounded-xl bg-success px-5 py-3 text-sm font-semibold text-white" @click="complete">Mark completed</button></article><div v-if="confirmingDelete" class="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4"><div class="w-full max-w-sm rounded-card bg-white p-6 shadow-xl"><h2 class="text-lg font-bold">Delete this task?</h2><p class="mt-2 text-sm text-muted">This action cannot be undone.</p><div class="mt-6 flex justify-end gap-3"><button type="button" class="rounded-lg px-3 py-2 text-sm font-semibold" @click="confirmingDelete = false">Cancel</button><button type="button" class="rounded-lg bg-danger px-3 py-2 text-sm font-semibold text-white" @click="removeTask">Delete task</button></div></div></div></section>
</template>
