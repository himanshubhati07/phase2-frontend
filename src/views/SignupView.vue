<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { validateEmail, validatePassword } from '../validation/fields'

const router = useRouter()
const auth = useAuthStore()
const form = reactive({ name: '', email: '', password: '', confirmPassword: '' })
const errors = reactive<Record<string, string>>({})
const touched = reactive<Record<string, boolean>>({})
const message = ref('')
const submitting = ref(false)
const isValid = computed(() => form.name.trim().length > 0 && form.email.length > 0 && form.password.length >= 6 && form.password === form.confirmPassword && Object.keys(errors).length === 0)
function validate(): boolean {
  errors.name = form.name.trim() ? '' : 'Enter your name.'
  errors.email = validateEmail(form.email)
  errors.password = validatePassword(form.password)
  errors.confirmPassword = form.password === form.confirmPassword ? '' : 'Passwords do not match.'
  Object.keys(errors).forEach((key) => { if (!errors[key]) delete errors[key] })
  return Object.keys(errors).length === 0
}
async function onSubmit(): Promise<void> {
  Object.assign(touched, { name: true, email: true, password: true, confirmPassword: true })
  if (!validate()) return
  submitting.value = true
  message.value = ''

  try {
    const user = await auth.signup(form.name, form.email, form.password)
    message.value = user ? 'Account created. You can sign in now.' : 'Unable to create your account.'
    if (user) setTimeout(() => router.push('/login'), 700)
  } catch {
    message.value = 'Unable to create your account. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <main class="grid min-h-screen place-items-center bg-canvas p-6">
    <form class="w-full max-w-md rounded-card bg-white p-7 shadow-sm sm:p-10" @submit.prevent="onSubmit">
      <RouterLink to="/login" class="text-sm font-semibold text-primary">← Back to sign in</RouterLink>
      <h1 class="mt-6 text-3xl font-bold tracking-tight">Create your account</h1>
      <p class="mt-3 text-sm text-muted">Start organizing the work that matters most.</p>
      <p v-if="message" :class="message.startsWith('Account') ? 'bg-green-50 text-success' : 'bg-red-50 text-danger'" class="mt-5 rounded-lg p-3 text-sm">{{ message }}</p>
      <label class="mt-6 block text-sm font-semibold">Full name<input v-model="form.name" class="mt-2 w-full rounded-xl border border-border px-4 py-3 text-sm" @blur="touched.name = true; validate()" /></label>
      <p v-if="touched.name && errors.name" class="mt-1 text-xs text-danger">{{ errors.name }}</p>
      <label class="mt-4 block text-sm font-semibold">Email address<input v-model="form.email" type="email" class="mt-2 w-full rounded-xl border border-border px-4 py-3 text-sm" @blur="touched.email = true; validate()" /></label>
      <p v-if="touched.email && errors.email" class="mt-1 text-xs text-danger">{{ errors.email }}</p>
      <label class="mt-4 block text-sm font-semibold">Password<input v-model="form.password" type="password" class="mt-2 w-full rounded-xl border border-border px-4 py-3 text-sm" @blur="touched.password = true; validate()" /></label>
      <p v-if="touched.password && errors.password" class="mt-1 text-xs text-danger">{{ errors.password }}</p><p v-else class="mt-1 text-xs text-muted">At least 6 characters.</p>
      <label class="mt-4 block text-sm font-semibold">Confirm password<input v-model="form.confirmPassword" type="password" class="mt-2 w-full rounded-xl border border-border px-4 py-3 text-sm" @blur="touched.confirmPassword = true; validate()" /></label>
      <p v-if="touched.confirmPassword && errors.confirmPassword" class="mt-1 text-xs text-danger">{{ errors.confirmPassword }}</p>
      <button :disabled="!isValid || submitting" type="submit" class="mt-6 w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white disabled:opacity-50">{{ submitting ? 'Creating account…' : 'Create account' }}</button>
    </form>
  </main>
</template>
