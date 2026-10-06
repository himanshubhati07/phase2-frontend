"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getById } from "@/lib/stores/home-store";
import { getAll as getTasks } from "@/lib/stores/task-store";
import { Home, HomeTask } from "@/types";

export default function HomeDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [home, setHome] = useState<Home | null | undefined>(undefined);
  const [tasks, setTasks] = useState<HomeTask[]>([]);
  useEffect(() => { Promise.all([getById(params.id), getTasks()]).then(([homeData, taskData]) => { setHome(homeData ?? null); setTasks(taskData.filter((task) => task.homeId === params.id)); }); }, [params.id]);
  if (home === undefined) return <div className="h-72 animate-pulse rounded-2xl bg-slate-200" />;
  if (!home) return <div className="rounded-2xl border border-border bg-surface p-10 text-center"><h1 className="text-xl font-bold text-ink">Home not found</h1><Link href="/homes" className="mt-4 inline-block text-sm font-bold text-primary">Back to homes</Link></div>;
  return <div className="space-y-7"><button type="button" onClick={() => router.back()} className="text-sm font-bold text-muted hover:text-primary">← Back to homes</button><section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card"><div className="bg-gradient-to-br from-blue-100 to-amber-50 px-7 py-10"><span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-xl font-bold text-navy shadow-sm">{home.image}</span></div><div className="p-7"><p className="text-sm font-semibold text-primary">HOME PROFILE</p><h1 className="mt-1 text-3xl font-bold text-ink">{home.name}</h1><p className="mt-2 text-muted">{home.address}</p><div className="mt-6 flex gap-8 border-t border-border pt-5"><div><p className="text-xs font-bold uppercase tracking-wide text-muted">Rooms</p><p className="mt-1 font-bold text-ink">{home.rooms}</p></div><div><p className="text-xs font-bold uppercase tracking-wide text-muted">Next up</p><p className="mt-1 font-bold text-ink">{home.nextTask}</p></div></div></div></section><section className="rounded-2xl border border-border bg-surface p-6 shadow-card"><div className="mb-4 flex items-center justify-between"><div><h2 className="text-lg font-bold text-ink">Home tasks</h2><p className="text-sm text-muted">Keep the small things from becoming big things.</p></div><Link href="/tasks" className="text-sm font-bold text-primary">All tasks</Link></div>{tasks.length ? <div className="divide-y divide-border">{tasks.map((task) => <div key={task.id} className="py-4"><p className="font-semibold text-ink">{task.title}</p><p className="mt-1 text-sm text-muted">Due {task.dueDate} · {task.status}</p></div>)}</div> : <p className="rounded-xl bg-canvas p-4 text-sm text-muted">No tasks for this home yet.</p>}</section></div>;
}
