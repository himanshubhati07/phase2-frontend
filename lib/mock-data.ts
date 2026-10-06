// MOCK DATA — placeholder records for local development only.
// Replace with real API data before production use.
import { Home, HomeTask, User } from "@/types";

export const mockUsers: User[] = [
  { id: "user-1", name: "Alex Morgan", email: "alex@homeio.app", password: "password123", role: "owner" },
  { id: "user-2", name: "Jamie Lee", email: "jamie@homeio.app", password: "password123", role: "member" },
];

export const mockHomes: Home[] = [
  { id: "home-1", name: "Maple House", address: "24 Maple Street, Portland", image: "MH", rooms: 6, nextTask: "Air filter change" },
  { id: "home-2", name: "Lake Cabin", address: "88 Shoreline Road, Hood River", image: "LC", rooms: 4, nextTask: "Winterize plumbing" },
  { id: "home-3", name: "City Apartment", address: "510 NW 11th Avenue, Portland", image: "CA", rooms: 3, nextTask: "Test smoke alarms" },
];

export const mockTasks: HomeTask[] = [
  { id: "task-1", homeId: "home-1", title: "Replace HVAC air filter", dueDate: "Today", status: "To do", priority: "High", category: "Maintenance" },
  { id: "task-2", homeId: "home-1", title: "Schedule gutter cleaning", dueDate: "Oct 14", status: "In progress", priority: "Medium", category: "Exterior" },
  { id: "task-3", homeId: "home-2", title: "Drain outdoor faucets", dueDate: "Oct 16", status: "To do", priority: "High", category: "Seasonal" },
  { id: "task-4", homeId: "home-3", title: "Test smoke alarms", dueDate: "Oct 20", status: "To do", priority: "Medium", category: "Safety" },
  { id: "task-5", homeId: "home-1", title: "Organize utility records", dueDate: "Oct 22", status: "To do", priority: "Low", category: "Admin" },
  { id: "task-6", homeId: "home-2", title: "Check roof flashing", dueDate: "Oct 28", status: "To do", priority: "Medium", category: "Exterior" },
  { id: "task-7", homeId: "home-3", title: "Clean kitchen vent", dueDate: "Nov 02", status: "Done", priority: "Low", category: "Maintenance" },
  { id: "task-8", homeId: "home-1", title: "Inspect fire extinguisher", dueDate: "Nov 08", status: "To do", priority: "Medium", category: "Safety" },
  { id: "task-9", homeId: "home-2", title: "Restock first aid kit", dueDate: "Nov 12", status: "Done", priority: "Low", category: "Safety" },
  { id: "task-10", homeId: "home-3", title: "Re-caulk bathroom", dueDate: "Nov 16", status: "In progress", priority: "Medium", category: "Maintenance" },
];
