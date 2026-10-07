export type Priority = 'Low' | 'Medium' | 'High'
export type TaskStatus = 'Pending' | 'In Progress' | 'Completed'

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: 'user' | 'admin'
  createdAt: string
}

export interface Session {
  email: string
  role: 'user' | 'admin'
  name: string
}

export interface Task {
  id: string
  userId: string
  title: string
  description: string
  priority: Priority
  dueDate: string
  status: TaskStatus
  createdAt: string
  updatedAt: string
}

export type TaskInput = Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
