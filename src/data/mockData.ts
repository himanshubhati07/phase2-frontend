// MOCK DATA — placeholder records for local development only.
// Replace with real API data before production use.
import type { Task, User } from '../types'

export const mockUsers: User[] = [
  { id: 'u1', name: 'Alex Morgan', email: 'alex@example.com', password: 'password123', role: 'user', createdAt: '2025-01-01T09:00:00.000Z' },
  { id: 'u2', name: 'Admin User', email: 'admin@example.com', password: 'password123', role: 'admin', createdAt: '2025-01-01T09:00:00.000Z' },
]

export const mockTasks: Task[] = [
  { id: 't1', userId: 'u1', title: 'Review sprint goals', description: 'Align the next sprint outcomes with the product roadmap.', priority: 'High', dueDate: '2025-03-18', status: 'In Progress', createdAt: '2025-03-01T09:00:00.000Z', updatedAt: '2025-03-01T09:00:00.000Z' },
  { id: 't2', userId: 'u1', title: 'Prepare client update', description: 'Summarize delivery progress, risks, and upcoming milestones.', priority: 'Medium', dueDate: '2025-03-21', status: 'Pending', createdAt: '2025-03-02T09:00:00.000Z', updatedAt: '2025-03-02T09:00:00.000Z' },
  { id: 't3', userId: 'u1', title: 'Document onboarding flow', description: 'Create a concise guide for the new workspace experience.', priority: 'Low', dueDate: '2025-03-25', status: 'Completed', createdAt: '2025-03-03T09:00:00.000Z', updatedAt: '2025-03-07T09:00:00.000Z' },
  { id: 't4', userId: 'u1', title: 'Audit accessibility fixes', description: 'Verify keyboard navigation and contrast improvements.', priority: 'High', dueDate: '2025-03-15', status: 'Pending', createdAt: '2025-03-04T09:00:00.000Z', updatedAt: '2025-03-04T09:00:00.000Z' },
  { id: 't5', userId: 'u1', title: 'Plan team retrospective', description: 'Draft prompts and reserve time for a constructive review.', priority: 'Medium', dueDate: '2025-03-28', status: 'In Progress', createdAt: '2025-03-05T09:00:00.000Z', updatedAt: '2025-03-05T09:00:00.000Z' },
  { id: 't6', userId: 'u1', title: 'Organize research notes', description: 'Group customer interviews into common themes.', priority: 'Low', dueDate: '2025-04-02', status: 'Pending', createdAt: '2025-03-06T09:00:00.000Z', updatedAt: '2025-03-06T09:00:00.000Z' },
  { id: 't7', userId: 'u1', title: 'Ship release notes', description: 'Write and publish a summary of the latest improvements.', priority: 'Medium', dueDate: '2025-03-12', status: 'Completed', createdAt: '2025-03-07T09:00:00.000Z', updatedAt: '2025-03-10T09:00:00.000Z' },
  { id: 't8', userId: 'u1', title: 'Refine empty states', description: 'Improve guidance for new users with no tasks yet.', priority: 'Low', dueDate: '2025-04-05', status: 'Pending', createdAt: '2025-03-08T09:00:00.000Z', updatedAt: '2025-03-08T09:00:00.000Z' },
  { id: 't9', userId: 'u1', title: 'Confirm vendor renewal', description: 'Review terms and confirm the annual design tooling renewal.', priority: 'High', dueDate: '2025-03-16', status: 'In Progress', createdAt: '2025-03-09T09:00:00.000Z', updatedAt: '2025-03-09T09:00:00.000Z' },
  { id: 't10', userId: 'u1', title: 'Tidy project backlog', description: 'Archive completed items and clarify incoming requests.', priority: 'Medium', dueDate: '2025-03-30', status: 'Pending', createdAt: '2025-03-10T09:00:00.000Z', updatedAt: '2025-03-10T09:00:00.000Z' },
]