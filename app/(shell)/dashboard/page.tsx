"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAll as getHomes } from "@/lib/stores/home-store";
import { getAll as getTasks } from "@/lib/stores/task-store";
import { Home, HomeTask } from "@/types";

export default function DashboardPage() {
  const [homes, setHomes] = useState<Home[]>([]);
  const [tasks, setTasks] = useState<HomeTask[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { Promise.all([getHomes(), getTasks()]).then(([homeData, taskData]) => { setHomes(homeData); setTasks(taskData); setLoading(false); }); }, []);
  if (loading) return <div className="grid gap-5 md:grid-cols-3">{[1,2,3].map((item) => <div key={item} className="h-36 animate-pulse rounded-2xl bg-slate-200" />)}</div>;
  const openTasks = tasks.filter((task) => task.status !== "Done");
  return <div className="space-y-8"><section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-semibold text-primary">YOUR HOME BASE</p><h1 className="mt-1 text-3xl font-bold tracking-tight text-ink">Good morning, Alex.</h1><p className="mt-2 text-muted">Here&apos;s what needs a little attention today.</p></div><Link href="/homes/new" className="rounded-xl bg-primary px-5 py-3 text-center text-sm font-bold text-white shadow-sm hover:bg-blue-700">+ Add a home</Link></section><section className="grid gap-5 md:grid-cols-3"><Stat label="Homes" value={String(homes.length)} note="spaces you care for" color="bg-blue-50 text-primary" /><Stat label="Open tasks" value={String(openTasks.length)} note="to keep on your radar" color="bg-amber-50 text-warning" /><Stat label="Completed" value={String(tasks.filter((task) => task.status === "Done").length)} note="tasks this month" color="bg-emerald-50 text-success" /></section><section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]"><div className="rounded-2xl border border-border bg-surface p-6 shadow-card"><div className="mb-5 flex items-center justify-between"><div><h2 className="text-lg font-bold text-ink">Up next</h2><p className="text-sm text-muted">A few simple wins for your homes.</p></div><Link href="/tasks" className="text-sm font-bold text-primary">View all</Link></div><div className="divide-y divide-border">{openTasks.slice(0,4).map((task) => <div key={task.id} className="flex items-center gap-4 py-4"><span className={`h-2.5 w-2.5 rounded-full ${task.priority === "High" ? "bg-danger" : "bg-accent"}`} /><div className="min-w-0 flex-1"><p className="font-semibold text-ink">{task.title}</p><p className="mt-1 text-sm text-muted">{task.category} · {task.dueDate}</p></div><span className="rounded-full bg-canvas px-3 py-1 text-xs font-bold text-muted">{task.status}</span></div>)}</div></div><div className="rounded-2xl bg-navy p-6 text-white"><p className="text-sm font-bold text-blue-200">A LITTLE EVERY DAY</p><h2 className="mt-3 text-2xl font-bold leading-tight">A cared-for home gives back.</h2><p className="mt-3 text-sm leading-6 text-blue-100">Stay ahead of seasonal upkeep, protect your investment, and make room for what matters.</p><Link href="/homes" className="mt-7 inline-block rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-navy">Explore my homes</Link></div></section></div>;
}

function Stat({ label, value, note, color }: { label: string; value: string; note: string; color: string }) { return <div className="rounded-2xl border border-border bg-surface p-5 shadow-card"><span className={`inline-flex rounded-lg px-2 py-1 text-xs font-bold ${color}`}>{label}</span><p className="mt-4 text-3xl font-bold text-ink">{value}</p><p className="mt-1 text-sm text-muted">{note}</p></div>; }
