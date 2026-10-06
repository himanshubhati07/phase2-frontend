"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAll } from "@/lib/stores/home-store";
import { Home } from "@/types";

export default function HomesPage() {
  const [homes, setHomes] = useState<Home[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { getAll().then((data) => { setHomes(data); setLoading(false); }); }, []);
  return <div><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><p className="text-sm font-semibold text-primary">MY SPACES</p><h1 className="mt-1 text-3xl font-bold text-ink">Your homes</h1><p className="mt-2 text-muted">The places that make up your life.</p></div><Link href="/homes/new" className="rounded-xl bg-primary px-5 py-3 text-center text-sm font-bold text-white hover:bg-blue-700">+ Add a home</Link></div>{loading ? <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{[1,2,3].map((item) => <div key={item} className="h-56 animate-pulse rounded-2xl bg-slate-200" />)}</div> : homes.length ? <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{homes.map((home) => <Link key={home.id} href={`/homes/${home.id}`} className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition hover:-translate-y-1 hover:shadow-lg"><div className="flex h-28 items-end bg-gradient-to-br from-blue-100 via-blue-50 to-amber-50 p-5"><span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-lg font-bold text-navy shadow-sm">{home.image}</span></div><div className="p-5"><h2 className="text-lg font-bold text-ink">{home.name}</h2><p className="mt-1 text-sm text-muted">{home.address}</p><div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-sm"><span className="font-semibold text-muted">{home.rooms} rooms</span><span className="font-bold text-primary group-hover:underline">Open home →</span></div></div></Link>)}</div> : <div className="mt-8 rounded-2xl border border-dashed border-border bg-surface p-10 text-center"><h2 className="font-bold text-ink">No homes yet</h2><p className="mt-2 text-sm text-muted">Add your first space to get started.</p></div>}</div>;
}
