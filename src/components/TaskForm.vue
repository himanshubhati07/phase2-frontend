<script setup lang="ts">
import { computed, reactive } from 'vue'
import type { Priority, TaskInput, TaskStatus } from '../types'

const props = defineProps<{ initial?: TaskInput; submitLabel: string }>()
const emit = defineEmits<{ submit: [value: TaskInput]; cancel: [] }>()
const form = reactive<TaskInput>({ title: props.initial?.title || '', description: props.initial?.description || '', priority: props.initial?.priority || 'Medium', dueDate: props.initial?.dueDate || '', status: props.initial?.status || 'Pending' })
const errors = reactive<Record<string, string>>({})
const touched = reactive<Record<string, boolean>>({})
const isValid = computed(() => !!form.title.trim() && !!form.description.trim() && !!form.dueDate && Object.keys(errors).length === 0)
function validate(): boolean {
  errors.title = form.title.trim() ? '' : 'Add a task title.'
  errors.description = form.description.trim() ? '' : 'Add a short description.'
  errors.dueDate = form.dueDate ? '' : 'Choose a due date.'
  Object.keys(errors).forEach((key) => { if (!errors[key]) delete errors[key] })
  return Object.keys(errors).length === 0
}
function submit(): void { Object.assign(touched, { title: true, description: true, dueDate: true }); if (validate()) emit('submit', { ...form }) }
</script>

<template>
  <form class="rounded-card bg-white p-6 shadow-sm sm:p-8" @submit.prevent="submit">
    <div class="grid gap-6"><label class="text-sm font-semibold">Task title<input v-model="form.title" maxlength="100" class="mt-2 w-full rounded-xl border border-border px-4 py-3 text-sm" @blur="touched.title = true; validate()" /><p v-if="touched.title && errors.title" class="mt-1 text-xs font-normal text-danger">{{ errors.title }}</p><p v-else class="mt-1 text-xs font-normal text-muted">Up to 100 characters.</p></label>
    <label class="text-sm font-semibold">Description<textarea v-model="form.description" rows="5" class="mt-2 w-full resize-none rounded-xl border border-border px-4 py-3 text-sm" @blur="touched.description = true; validate()" /><p v-if="touched.description && errors.description" class="mt-1 text-xs font-normal text-danger">{{ errors.description }}</p></label>
    <div class="grid gap-5 sm:grid-cols-3"><label class="text-sm font-semibold">Priority<select v-model="form.priority" class="mt-2 w-full rounded-xl border border-border px-3 py-3 text-sm"><option v-for="item in ['Low', 'Medium', 'High'] as Priority[]" :key="item">{{ item }}</option></select></label><label class="text-sm font-semibold">Due date<input v-model="form.dueDate" type="date" class="mt-2 w-full rounded-xl border border-border px-3 py-3 text-sm" @blur="touched.dueDate = true; validate()" /><p v-if="touched.dueDate && errors.dueDate" class="mt-1 text-xs font-normal text-danger">{{ errors.dueDate }}</p></label><label class="text-sm font-semibold">Status<select v-model="form.status" class="mt-2 w-full rounded-xl border border-border px-3 py-3 text-sm"><option v-for="item in ['Pending', 'In Progress', 'Completed'] as TaskStatus[]" :key="item">{{ item }}</option></select></label></div></div>
    <div class="mt-8 flex justify-end gap-3 border-t border-border pt-6"><button type="button" class="rounded-xl px-5 py-3 text-sm font-semibold text-muted" @click="emit('cancel')">Cancel</button><button :disabled="!isValid" type="submit" class="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">{{ submitLabel }}</button></div>
  </form>
</template>
