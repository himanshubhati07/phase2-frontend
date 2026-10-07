<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const initials = computed(() => auth.currentUser?.name.split(' ').map((part) => part[0]).join('').slice(0, 2) || 'U')
</script>

<template>
  <header class="flex h-20 items-center justify-between border-b border-border bg-surface px-6 lg:px-10">
    <div>
      <p class="text-sm text-muted">Personal workspace</p>
      <p class="text-sm font-semibold text-ink">Stay focused on what matters.</p>
    </div>
    <div class="flex items-center gap-3">
      <div class="hidden text-right sm:block">
        <p class="text-sm font-semibold">{{ auth.currentUser?.name }}</p>
        <p class="text-xs text-muted">{{ auth.currentUser?.email }}</p>
      </div>
      <span class="grid h-10 w-10 place-items-center rounded-full bg-indigo-100 text-sm font-bold text-primary">{{ initials }}</span>
    </div>
  </header>
</template>
