<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { validateEmail, validatePassword } from '../validation/fields'

const router = useRouter()
const auth = useAuthStore()
const form = reactive({ email: '', password: '' })
const errors = reactive<Record<string, string>>({})
const touched = reactive<Record<string, boolean>>({})
const apiError = ref('')
const submitting = ref(false)
const isValid = computed(() => form.email.length > 0 && form.password.length >= 6 && Object.keys(errors).length === 0)

function validate(): boolean {
  errors.email = validateEmail(form.email)
  errors.password = validatePassword(form.password)
  Object.keys(errors).forEach((key) => { if (!errors[key]) delete errors[key] })
  return Object.keys(errors).length === 0
}

async function onSubmit(): Promise<void> {
  touched.email = true
  touched.password = true
  if (!validate()) return
  submitting.value = true
  apiError.value = ''

  try {
    await auth.login(form.email, form.password)
    router.push('/dashboard')
  } catch {
    apiError.value = 'Unable to sign in with those credentials. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="grid min-h-screen bg-canvas lg:grid-cols-2">
    <section class="hidden bg-ink p-16 text-white lg:flex lg:flex-col lg:justify-between">
      <div class="flex items-center gap-3 text-xl font-bold"><span class="grid h-10 w-10 place-items-center rounded-xl bg-primary">i</span> interrrrr</div>
      <div><p class="text-4xl font-bold leading-tight">A calmer way to make progress.</p><p class="mt-5 max-w-md text-slate-300">Plan the important work, see what's moving, and keep momentum every day.</p></div>
      <p class="text-sm text-slate-400">Your personal task workspace</p>
    </section>
    <main class="flex items-center justify-center p-6">
      <form class="w-full max-w-md rounded-card bg-white p-7 shadow-sm sm:p-10" @submit.prevent="onSubmit">
        <p class="text-sm font-semibold text-primary">WELCOME BACK</p>
        <h1 class="mt-2 text-3xl font-bold tracking-tight">Sign in to your workspace</h1>
        <p class="mt-3 text-sm text-muted">Use your account to continue managing your tasks.</p>
        <p v-if="apiError" class="mt-5 rounded-lg bg-red-50 p-3 text-sm text-danger">{{ apiError }}</p>
        <label class="mt-7 block text-sm font-semibold">Email address<input v-model="form.email" type="email" class="mt-2 w-full rounded-xl border border-border px-4 py-3 text-sm" @blur="touched.email = true; validate()" /></label>
        <p v-if="touched.email && errors.email" class="mt-1 text-xs text-danger">{{ errors.email }}</p>
        <label class="mt-5 block text-sm font-semibold">Password<input v-model="form.password" type="password" class="mt-2 w-full rounded-xl border border-border px-4 py-3 text-sm" @blur="touched.password = true; validate()" /></label>
        <p v-if="touched.password && errors.password" class="mt-1 text-xs text-danger">{{ errors.password }}</p>
        <p v-if="!errors.password" class="mt-1 text-xs text-muted">At least 6 characters.</p>
        <RouterLink to="/forgot-password" class="mt-4 inline-block text-sm font-semibold text-primary">Forgot password?</RouterLink>
        <button :disabled="!isValid || submitting" type="submit" class="mt-6 w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">{{ submitting ? 'Signing in…' : 'Sign in' }}</button>
        <p class="mt-6 text-center text-sm text-muted">New here? <RouterLink to="/signup" class="font-semibold text-primary">Create an account</RouterLink></p>
      </form>
    </main>
  </div>
</template>
