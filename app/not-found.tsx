import Link from "next/link";

export default function NotFound() {
  return <main className="flex min-h-screen items-center justify-center bg-canvas px-6"><div className="max-w-md text-center"><p className="text-sm font-bold text-primary">404</p><h1 className="mt-2 text-4xl font-bold text-ink">This room doesn&apos;t exist.</h1><p className="mt-3 text-muted">The page you&apos;re looking for may have moved.</p><Link href="/" className="mt-7 inline-block rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white">Go Home</Link></div></main>;
}
