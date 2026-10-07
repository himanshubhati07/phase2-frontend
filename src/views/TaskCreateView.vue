<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TaskForm from '../components/TaskForm.vue'
import { useTaskStore } from '../stores/tasks'
import type { TaskInput } from '../types'

const router = useRouter()
const store = useTaskStore()
const success = ref('')
const error = ref('')

async function createTask(input: TaskInput): Promise<void> {
  error.value = ''
  try {
    const task = await store.create(input)
    success.value = 'Task created successfully.'
    router.push(`/tasks/${task.id}`)
  } catch {
    error.value = 'Unable to create your task. Please try again.'
  }
}
</script>

<template>
  <section class="mx-auto max-w-3xl"><button type="button" class="text-sm font-semibold text-primary" @click="router.push('/tasks')">← Back to tasks</button><h1 class="mt-5 text-3xl font-bold">Create a task</h1><p class="mt-2 text-sm text-muted">Add the details your future self needs to make progress.</p><p v-if="error" class="mt-5 rounded-xl bg-red-50 p-3 text-sm text-danger">{{ error }}</p><p v-if="success" class="mt-5 rounded-xl bg-green-50 p-3 text-sm text-success">{{ success }}</p><div class="mt-7"><TaskForm submit-label="Create task" @submit="createTask" @cancel="router.push('/tasks')" /></div></section>
</template>
