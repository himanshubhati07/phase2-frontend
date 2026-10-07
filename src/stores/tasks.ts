import { defineStore } from 'pinia'
import { api } from '../services/api'
import type { Task, TaskInput } from '../types'

export const useTaskStore = defineStore('tasks', () => {
  async function getAll(): Promise<Task[]> {
    return (await api.get<Task[]>('/api/v1/tasks')).data
  }

  async function getById(id: string): Promise<Task | undefined> {
    return (await api.get<Task>(`/api/v1/tasks/${id}`)).data
  }

  async function create(input: TaskInput): Promise<Task> {
    return (await api.post<Task>('/api/v1/tasks', input)).data
  }

  async function update(id: string, input: TaskInput): Promise<Task> {
    return (await api.put<Task>(`/api/v1/tasks/${id}`, input)).data
  }

  async function remove(id: string): Promise<boolean> {
    await api.delete<void>(`/api/v1/tasks/${id}`)
    return true
  }

  return { getAll, getById, create, update, remove }
})
