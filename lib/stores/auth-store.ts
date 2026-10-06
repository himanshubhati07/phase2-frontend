import toast from "react-hot-toast";
import { API_URL } from "@/lib/api-client";
import { mockUsers } from "@/lib/mock-data";
import { AuthToken, User } from "@/types";

const usersKey = "homeio_users";
const tokenKey = "auth_token";

export const USE_MOCK = true;

function getExtraUsers(): User[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(usersKey) || "[]") as User[];
}

// MOCK: reads locally registered users in place of an account API response.
export function getUsers(): User[] {
  return [...mockUsers, ...getExtraUsers()];
}

// MOCK: validates seeded credentials in place of an authentication API response.
export function localLogin(email: string, password: string): boolean {
  const user = getUsers().find((item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password);
  if (!user || typeof window === "undefined") return false;
  const token: AuthToken = { email: user.email, role: user.role, name: user.name };
  localStorage.setItem(tokenKey, JSON.stringify(token));
  return true;
}

// MOCK: creates a browser-local account in place of an account creation API response.
export function localSignup(name: string, email: string, password: string): User | null {
  if (typeof window === "undefined" || getUsers().some((item) => item.email.toLowerCase() === email.toLowerCase())) return null;
  const user: User = { id: crypto.randomUUID(), name, email, password, role: "owner" };
  localStorage.setItem(usersKey, JSON.stringify([...getExtraUsers(), user]));
  localStorage.setItem(tokenKey, JSON.stringify({ email: user.email, role: user.role, name: user.name }));
  return user;
}

export async function login(email: string, password: string): Promise<boolean> {
  if (USE_MOCK) return localLogin(email, password);
  try {
    const response = await fetch(`${API_URL}/api/v1/auth/login`, { method: "POST", body: JSON.stringify({ email, password }) });
    if (!response.ok) return false;
    localStorage.setItem(tokenKey, JSON.stringify(await response.json()));
    return true;
  } catch (error) {
    toast.error("Could not reach the server — try again.");
    throw error;
  }
}

export async function signup(name: string, email: string, password: string): Promise<User | null> {
  if (USE_MOCK) return localSignup(name, email, password);
  try {
    const response = await fetch(`${API_URL}/api/v1/auth/signup`, { method: "POST", body: JSON.stringify({ name, email, password }) });
    if (!response.ok) return null;
    const user = await response.json() as User;
    localStorage.setItem(tokenKey, JSON.stringify({ email: user.email, role: user.role, name: user.name }));
    return user;
  } catch (error) {
    toast.error("Could not reach the server — try again.");
    throw error;
  }
}

export function logout(): void {
  if (typeof window !== "undefined") localStorage.removeItem(tokenKey);
}

export function isAuthenticated(): boolean {
  return typeof window !== "undefined" && Boolean(localStorage.getItem(tokenKey));
}

export function currentUser(): AuthToken | null {
  if (typeof window === "undefined") return null;
  const rawToken = localStorage.getItem(tokenKey);
  return rawToken ? JSON.parse(rawToken) as AuthToken : null;
}

export function currentRole() {
  return currentUser()?.role ?? null;
}
