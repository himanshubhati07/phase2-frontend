<script setup lang="ts">
import { computed } from 'vue'
import type { Priority, TaskStatus } from '../types'

const props = defineProps<{ value: TaskStatus | Priority; kind: 'status' | 'priority' }>()
const classes = computed(() => {
  const map: Record<string, string> = {
    Pending: 'bg-amber-50 text-warning',
    'In Progress': 'bg-blue-50 text-info',
    Completed: 'bg-green-50 text-success',
    Low: 'bg-green-50 text-success',
    Medium: 'bg-amber-50 text-warning',
    High: 'bg-red-50 text-danger',
  }
  return map[props.value]
})
</script>

<template>
  <span :class="classes" class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold">{{ value }}</span>
</template>
