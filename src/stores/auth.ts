import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { api } from '../services/api'
import type { Session, User } from '../types'

interface AuthResponse {
  token?: string
  accessToken?: string
  user?: Session
  email?: string
  name?: string
  role?: 'user' | 'admin'
}

function readSession(): Session | null {
  const rawSession = localStorage.getItem('auth_session')
  return rawSession ? JSON.parse(rawSession) as Session : null
}

function saveSession(session: Session, accessToken: string): void {
  localStorage.setItem('auth_token', accessToken)
  localStorage.setItem('auth_session', JSON.stringify(session))
}

function normalizeAuthResponse(response: AuthResponse): { session: Session; accessToken: string } {
  const accessToken = response.token || response.accessToken
  const user = response.user || response

  if (!accessToken || !user.email || !user.name || !user.role) {
    throw new Error('The server returned an invalid authentication response.')
  }

  return {
    accessToken,
    session: { email: user.email, name: user.name, role: user.role },
  }
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<Session | null>(readSession())
  const isAuthenticated = computed(() => !!token.value && !!localStorage.getItem('auth_token'))
  const currentUser = computed(() => token.value)
  const currentRole = computed(() => token.value?.role ?? null)

  async function login(email: string, password: string): Promise<boolean> {
    const response = await api.post<AuthResponse>('/api/v1/auth/login', { email, password })
    const { session, accessToken } = normalizeAuthResponse(response.data)
    token.value = session
    saveSession(session, accessToken)
    return true
  }

  async function signup(name: string, email: string, password: string): Promise<User | null> {
    const response = await api.post<User>('/api/v1/auth/register', { name, email, password })
    return response.data
  }

  function logout(): void {
    token.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_session')
  }

  return { isAuthenticated, currentUser, currentRole, login, signup, logout }
})
