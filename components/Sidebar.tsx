"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { currentRole, logout } from "@/lib/stores/auth-store";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: "⌂", roles: ["owner", "member"] },
  { label: "My homes", href: "/homes", icon: "⌂", roles: ["owner", "member"] },
  { label: "Tasks", href: "/tasks", icon: "✓", roles: ["owner", "member"] },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const role = currentRole() ?? "";

  return (
    <aside className="hidden min-h-screen w-60 flex-col border-r border-border bg-surface px-4 py-7 lg:flex">
      <Link href="/dashboard" className="mb-12 flex items-center gap-3 px-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-lg font-bold text-white">h</span>
        <span className="text-xl font-bold tracking-tight text-ink">homeio</span>
      </Link>
      <nav className="space-y-2">
        {navItems.filter((item) => item.roles.includes(role)).map((item) => {
          const active = pathname === item.href || (item.href === "/homes" && pathname.startsWith("/homes"));
          return (
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold ${active ? "bg-blue-50 text-primary" : "text-muted hover:bg-canvas hover:text-ink"}`}>
              <span className="w-4 text-center text-base">{item.icon}</span>{item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto border-t border-border pt-5">
        <button type="button" onClick={() => { if (window.confirm("Are you sure you want to log out?")) { logout(); router.push("/login"); } }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-muted hover:bg-red-50 hover:text-danger">
          <span>↪</span> Log out
        </button>
      </div>
    </aside>
  );
}
