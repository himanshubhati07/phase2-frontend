<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TaskForm from '../components/TaskForm.vue'
import { useTaskStore } from '../stores/tasks'
import type { Task, TaskInput } from '../types'

const router = useRouter()
const route = useRoute()
const store = useTaskStore()
const task = ref<Task | null>(null)
const loading = ref(true)
const success = ref('')
const error = ref('')

onMounted(async () => {
  try {
    task.value = await store.getById(route.params.id as string) ?? null
  } catch {
    error.value = 'Unable to load this task. Please try again.'
  } finally {
    loading.value = false
  }
})

async function saveTask(input: TaskInput): Promise<void> {
  error.value = ''
  try {
    const updated = await store.update(route.params.id as string, input)
    success.value = 'Changes saved successfully.'
    router.push(`/tasks/${updated.id}`)
  } catch {
    error.value = 'Unable to save your changes. Please try again.'
  }
}
</script>

<template>
  <section class="mx-auto max-w-3xl"><button type="button" class="text-sm font-semibold text-primary" @click="router.back()">← Back</button><div v-if="loading" class="mt-6 h-96 animate-pulse rounded-card bg-white" /><div v-else-if="!task" class="mt-6 rounded-card bg-white p-10 text-center"><h1 class="text-xl font-bold">Task not found</h1><button type="button" class="mt-4 font-semibold text-primary" @click="router.push('/tasks')">View tasks</button></div><div v-else><h1 class="mt-5 text-3xl font-bold">Edit task</h1><p v-if="error" class="mt-4 rounded-xl bg-red-50 p-3 text-sm text-danger">{{ error }}</p><p v-if="success" class="mt-4 rounded-xl bg-green-50 p-3 text-sm text-success">{{ success }}</p><div class="mt-7"><TaskForm :initial="{ title: task.title, description: task.description, priority: task.priority, dueDate: task.dueDate, status: task.status }" submit-label="Save changes" @submit="saveTask" @cancel="router.push(`/tasks/${task.id}`)" /></div></div></section>
</template>
