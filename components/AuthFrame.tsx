import Link from "next/link";

export function AuthFrame({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas px-5 py-10">
      <section className="w-full max-w-md rounded-3xl border border-border bg-surface p-8 shadow-card">
        <Link href="/login" className="mb-9 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-lg font-bold text-white">h</span>
          <span className="text-xl font-bold text-ink">homeio</span>
        </Link>
        <h1 className="text-3xl font-bold text-ink">{title}</h1>
        <p className="mt-2 text-muted">{subtitle}</p>
        <div className="mt-8">{children}</div>
      </section>
    </main>
  );
}
