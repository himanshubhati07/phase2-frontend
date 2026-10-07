import { useToast } from 'vue-toastification'

const toast = useToast()
const baseUrl = import.meta.env.VITE_API_URL || ''

async function request<T>(path: string, options: RequestInit = {}): Promise<{ data: T }> {
  const token = localStorage.getItem('auth_token')
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    })
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_session')
      }

      const message = (await response.json().catch(() => null) as { message?: string } | null)?.message
      throw new Error(message || `Request failed (${response.status}).`)
    }
    return { data: await response.json() as T }
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    throw error
  }
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) => request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) => request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
}
