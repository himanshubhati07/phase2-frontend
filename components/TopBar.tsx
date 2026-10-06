"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { currentUser } from "@/lib/stores/auth-store";

export function TopBar() {
  const [name, setName] = useState("Homeowner");
  useEffect(() => setName(currentUser()?.name || "Homeowner"), []);
  return (
    <header className="flex h-20 items-center justify-between border-b border-border bg-surface px-6 lg:px-10">
      <Link href="/dashboard" className="flex items-center gap-2 lg:hidden"><span className="font-bold text-primary">homeio</span></Link>
      <div className="hidden text-sm text-muted sm:block">Keep every home in its best shape.</div>
      <div className="flex items-center gap-3">
        <button type="button" aria-label="Notifications" className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted hover:bg-canvas">◦</button>
        <div className="flex items-center gap-2"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">{name.slice(0, 1)}</span><span className="hidden text-sm font-semibold text-ink sm:block">{name}</span></div>
      </div>
    </header>
  );
}
