"use client";

import { useEffect, useState } from "react";
import { getAll, updateStatus } from "@/lib/stores/task-store";
import { HomeTask } from "@/types";

export default function TasksPage() {
  const [tasks, setTasks] = useState<HomeTask[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { getAll().then((data) => { setTasks(data); setLoading(false); }); }, []);
  async function completeTask(task: HomeTask) { const updated = await updateStatus(task.id, "Done"); if (updated) setTasks((current) => current.map((item) => item.id === task.id ? updated : item)); }
  if (loading) return <div className="space-y-3">{[1,2,3,4].map((item) => <div key={item} className="h-20 animate-pulse rounded-2xl bg-slate-200" />)}</div>;
  return <div><p className="text-sm font-semibold text-primary">CARE PLAN</p><h1 className="mt-1 text-3xl font-bold text-ink">Tasks</h1><p className="mt-2 text-muted">A clear plan for a more comfortable home.</p><div className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface shadow-card">{tasks.length ? tasks.map((task) => <div key={task.id} className="flex items-center gap-4 border-b border-border p-5 last:border-0"><button type="button" disabled={task.status === "Done"} onClick={() => completeTask(task)} aria-label={`Mark ${task.title} complete`} className={`h-6 w-6 rounded-full border-2 ${task.status === "Done" ? "border-success bg-success text-white" : "border-border hover:border-primary"}`}>{task.status === "Done" ? "✓" : ""}</button><div className="min-w-0 flex-1"><p className={`font-semibold ${task.status === "Done" ? "text-muted line-through" : "text-ink"}`}>{task.title}</p><p className="mt-1 text-sm text-muted">{task.category} · Due {task.dueDate}</p></div><span className={`rounded-full px-3 py-1 text-xs font-bold ${task.priority === "High" ? "bg-red-50 text-danger" : "bg-amber-50 text-warning"}`}>{task.priority}</span></div>) : <div className="p-10 text-center text-muted">No tasks yet — enjoy the clear slate.</div>}</div></div>;
}
