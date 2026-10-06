import { apiFetch } from "@/lib/api-client";
import { mockTasks } from "@/lib/mock-data";
import { HomeTask, TaskStatus } from "@/types";

const storageKey = "homeio_tasks";
export const USE_MOCK = true;

function load(): HomeTask[] {
  if (typeof window === "undefined") return mockTasks;
  const stored = localStorage.getItem(storageKey);
  if (stored) return JSON.parse(stored) as HomeTask[];
  localStorage.setItem(storageKey, JSON.stringify(mockTasks));
  return mockTasks;
}

// MOCK: returns browser-local tasks in place of the tasks list API.
function localGetAll(): HomeTask[] { return load(); }
// MOCK: updates a browser-local task in place of a task update API response.
function localUpdateStatus(id: string, status: TaskStatus): HomeTask | undefined {
  const tasks = load();
  const next = tasks.map((task) => task.id === id ? { ...task, status } : task);
  localStorage.setItem(storageKey, JSON.stringify(next));
  return next.find((task) => task.id === id);
}

// TODO(USE_MOCK): verify path + response shape against the real backend's OpenAPI schema before flipping this to false.
export async function getAll(): Promise<HomeTask[]> { return USE_MOCK ? localGetAll() : apiFetch<HomeTask[]>("/api/v1/tasks"); }
export async function updateStatus(id: string, status: TaskStatus): Promise<HomeTask | undefined> { return USE_MOCK ? localUpdateStatus(id, status) : apiFetch<HomeTask>(`/api/v1/tasks/${id}`, { method: "PATCH", body: JSON.stringify({ status }) }); }
