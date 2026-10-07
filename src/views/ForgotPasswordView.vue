<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { validateEmail } from '../validation/fields'

const form = reactive({ email: '' })
const error = ref('')
const sent = ref(false)
function submit(): void { error.value = validateEmail(form.email); if (!error.value) sent.value = true }
</script>

<template><main class="grid min-h-screen place-items-center bg-canvas p-6"><form class="w-full max-w-md rounded-card bg-white p-8 shadow-sm" @submit.prevent="submit"><RouterLink to="/login" class="text-sm font-semibold text-primary">← Back to sign in</RouterLink><h1 class="mt-6 text-2xl font-bold">Reset password</h1><p class="mt-2 text-sm text-muted">Enter your email and we'll send reset instructions.</p><p v-if="sent" class="mt-5 rounded-lg bg-green-50 p-3 text-sm text-success">If an account exists, reset instructions have been sent.</p><label class="mt-6 block text-sm font-semibold">Email address<input v-model="form.email" type="email" class="mt-2 w-full rounded-xl border border-border px-4 py-3" /></label><p v-if="error" class="mt-1 text-xs text-danger">{{ error }}</p><button type="submit" class="mt-6 w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white">Send instructions</button></form></main></template>
