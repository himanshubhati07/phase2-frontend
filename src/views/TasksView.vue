<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import StatusBadge from '../components/StatusBadge.vue'
import { useTaskStore } from '../stores/tasks'
import type { Priority, Task, TaskStatus } from '../types'

const router = useRouter()
const store = useTaskStore()
const tasks = ref<Task[]>([])
const loading = ref(true)
const error = ref('')
const query = ref('')
const status = ref<'All' | TaskStatus>('All')
const priority = ref<'All' | Priority>('All')
const deleteTarget = ref<Task | null>(null)
const isDeleting = ref(false)
const filteredTasks = computed(() => tasks.value.filter((task) => (
  task.title.toLowerCase().includes(query.value.toLowerCase())
  && (status.value === 'All' || task.status === status.value)
  && (priority.value === 'All' || task.priority === priority.value)
)))

async function loadTasks(): Promise<void> {
  loading.value = true
  error.value = ''

  try {
    tasks.value = await store.getAll()
  } catch {
    error.value = 'Unable to load your tasks. Please try again.'
  } finally {
    loading.value = false
  }
}

async function complete(task: Task): Promise<void> {
  error.value = ''

  try {
    await store.update(task.id, { ...task, status: 'Completed' })
    await loadTasks()
  } catch {
    error.value = 'Unable to update this task. Please try again.'
  }
}

async function confirmDelete(): Promise<void> {
  if (!deleteTarget.value) return

  isDeleting.value = true
  error.value = ''

  try {
    await store.remove(deleteTarget.value.id)
    deleteTarget.value = null
    await loadTasks()
  } catch {
    error.value = 'Unable to delete this task. Please try again.'
  } finally {
    isDeleting.value = false
  }
}

function clearFilters(): void {
  query.value = ''
  status.value = 'All'
  priority.value = 'All'
}

onMounted(loadTasks)
</script>

<template>
  <section>
    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">My tasks</h1>
        <p class="mt-2 text-sm text-muted">Keep every commitment visible and moving.</p>
      </div>
      <button type="button" class="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white" @click="router.push('/tasks/new')">+ Add task</button>
    </div>

    <p v-if="error" class="mt-5 rounded-xl bg-red-50 p-3 text-sm text-danger">
      {{ error }}
      <button type="button" class="ml-2 font-semibold underline" @click="loadTasks">Retry</button>
    </p>

    <div class="mt-7 rounded-card bg-white p-4 shadow-sm">
      <div class="grid gap-3 lg:grid-cols-[1fr_180px_180px_auto]">
        <input v-model="query" placeholder="Search tasks by title" class="rounded-xl border border-border px-4 py-3 text-sm" />
        <select v-model="status" class="rounded-xl border border-border px-3 py-3 text-sm"><option value="All">All statuses</option><option>Pending</option><option>In Progress</option><option>Completed</option></select>
        <select v-model="priority" class="rounded-xl border border-border px-3 py-3 text-sm"><option value="All">All priorities</option><option>Low</option><option>Medium</option><option>High</option></select>
        <button type="button" class="rounded-xl px-4 py-3 text-sm font-semibold text-muted hover:bg-slate-100" @click="clearFilters">Clear</button>
      </div>
    </div>

    <div v-if="loading" class="mt-6 space-y-3"><div v-for="number in 5" :key="number" class="h-20 animate-pulse rounded-card bg-white" /></div>
    <div v-else-if="filteredTasks.length" class="mt-6 overflow-hidden rounded-card bg-white shadow-sm">
      <div class="hidden grid-cols-[1fr_130px_130px_120px_150px] gap-4 border-b border-border px-6 py-4 text-xs font-bold uppercase tracking-wide text-muted md:grid"><span>Task</span><span>Status</span><span>Priority</span><span>Due</span><span>Actions</span></div>
      <div v-for="task in filteredTasks" :key="task.id" class="grid w-full gap-3 border-b border-border px-6 py-5 last:border-0 hover:bg-slate-50 md:grid-cols-[1fr_130px_130px_120px_150px] md:items-center">
        <button type="button" class="text-left" @click="router.push(`/tasks/${task.id}`)"><p class="font-semibold">{{ task.title }}</p><p class="mt-1 line-clamp-1 text-sm text-muted">{{ task.description }}</p></button>
        <StatusBadge :value="task.status" kind="status" />
        <StatusBadge :value="task.priority" kind="priority" />
        <span class="text-sm text-muted">{{ task.dueDate }}</span>
        <div class="flex items-center gap-3"><button type="button" class="text-sm font-semibold text-primary" @click="router.push(`/tasks/${task.id}/edit`)">Edit</button><button type="button" class="text-sm font-semibold text-danger" @click="deleteTarget = task">Delete</button><button v-if="task.status !== 'Completed'" type="button" class="text-sm font-semibold text-success" @click="complete(task)">Complete</button></div>
      </div>
    </div>
    <div v-else class="mt-6 rounded-card bg-white p-12 text-center shadow-sm"><h2 class="font-bold">No matching tasks</h2><p class="mt-2 text-sm text-muted">Try clearing your filters or create a new task.</p><button type="button" class="mt-5 font-semibold text-primary" @click="router.push('/tasks/new')">Create task</button></div>

    <div v-if="deleteTarget" class="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4"><div class="w-full max-w-sm rounded-card bg-white p-6 shadow-xl"><h2 class="text-lg font-bold">Delete task?</h2><p class="mt-2 text-sm text-muted">This will permanently remove “{{ deleteTarget.title }}”.</p><div class="mt-6 flex justify-end gap-3"><button type="button" class="rounded-lg px-3 py-2 text-sm font-semibold" :disabled="isDeleting" @click="deleteTarget = null">Cancel</button><button type="button" class="rounded-lg bg-danger px-3 py-2 text-sm font-semibold text-white disabled:opacity-50" :disabled="isDeleting" @click="confirmDelete">{{ isDeleting ? 'Deleting…' : 'Delete' }}</button></div></div></div>
  </section>
</template>
