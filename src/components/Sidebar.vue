<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()
const confirmLogout = ref(false)
const navItems = [
  { label: 'Overview', to: '/dashboard', roles: ['user', 'admin'] },
  { label: 'My tasks', to: '/tasks', roles: ['user', 'admin'] },
]
const visibleItems = computed(() => navItems.filter((item) => item.roles.includes(auth.currentRole || '')))

function logout(): void {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <aside class="flex w-full flex-col bg-ink px-5 py-6 text-white lg:min-h-screen lg:w-64">
    <RouterLink to="/dashboard" class="flex items-center gap-3 text-xl font-bold tracking-tight">
      <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm">i</span>
      interrrrr
    </RouterLink>
    <nav class="mt-10 flex gap-2 lg:flex-col">
      <RouterLink
        v-for="item in visibleItems"
        :key="item.to"
        :to="item.to"
        active-class="bg-white/15 text-white"
        class="rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
      >
        {{ item.label }}
      </RouterLink>
    </nav>
    <div class="mt-auto hidden pt-8 lg:block">
      <button
        type="button"
        class="w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white"
        @click="confirmLogout = true"
      >
        Sign out
      </button>
    </div>
    <div v-if="confirmLogout" class="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4">
      <div class="w-full max-w-sm rounded-card bg-white p-6 text-ink shadow-xl">
        <h2 class="text-lg font-semibold">Sign out?</h2>
        <p class="mt-2 text-sm text-muted">You will need to sign in again to manage your tasks.</p>
        <div class="mt-6 flex justify-end gap-3">
          <button type="button" class="rounded-lg px-3 py-2 text-sm font-medium" @click="confirmLogout = false">Cancel</button>
          <button type="button" class="rounded-lg bg-danger px-3 py-2 text-sm font-semibold text-white" @click="logout">Sign out</button>
        </div>
      </div>
    </div>
  </aside>
</template>
