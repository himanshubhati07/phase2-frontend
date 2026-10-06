import { apiFetch } from "@/lib/api-client";
import { mockHomes } from "@/lib/mock-data";
import { Home } from "@/types";

const storageKey = "homeio_homes";
export const USE_MOCK = true;

function load(): Home[] {
  if (typeof window === "undefined") return mockHomes;
  const stored = localStorage.getItem(storageKey);
  if (stored) return JSON.parse(stored) as Home[];
  localStorage.setItem(storageKey, JSON.stringify(mockHomes));
  return mockHomes;
}

// MOCK: returns browser-local homes in place of the homes list API.
function localGetAll(): Home[] { return load(); }
// MOCK: returns browser-local home detail in place of the home detail API.
function localGetById(id: string): Home | undefined { return load().find((home) => home.id === id); }
// MOCK: creates a browser-local home in place of the create home API.
function localCreate(input: Omit<Home, "id" | "image" | "nextTask">): Home {
  const home = { ...input, id: crypto.randomUUID(), image: input.name.slice(0, 2).toUpperCase(), nextTask: "No tasks scheduled" };
  localStorage.setItem(storageKey, JSON.stringify([home, ...load()]));
  return home;
}

// TODO(USE_MOCK): verify path + response shape against the real backend's OpenAPI schema before flipping this to false.
export async function getAll(): Promise<Home[]> { return USE_MOCK ? localGetAll() : apiFetch<Home[]>("/api/v1/homes"); }
export async function getById(id: string): Promise<Home | undefined> { return USE_MOCK ? localGetById(id) : apiFetch<Home>(`/api/v1/homes/${id}`); }
export async function create(input: Omit<Home, "id" | "image" | "nextTask">): Promise<Home> { return USE_MOCK ? localCreate(input) : apiFetch<Home>("/api/v1/homes", { method: "POST", body: JSON.stringify(input) }); }
