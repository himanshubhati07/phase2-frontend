export type UserRole = "owner" | "member";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export type TaskStatus = "To do" | "In progress" | "Done";
export type TaskPriority = "Low" | "Medium" | "High";

export interface Home {
  id: string;
  name: string;
  address: string;
  image: string;
  rooms: number;
  nextTask: string;
}

export interface HomeTask {
  id: string;
  homeId: string;
  title: string;
  dueDate: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: string;
}

export interface AuthToken {
  email: string;
  role: UserRole;
  name: string;
}
