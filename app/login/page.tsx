"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/stores/auth-store";
import { validateEmail, validatePassword } from "@/lib/validation";
import { AuthFrame } from "@/components/AuthFrame";

export default function LoginPage() {
  const router = useRouter();
  // MOCK: prefilled with the demo admin login — remove before wiring a real backend.
  const [email, setEmail] = useState("alex@homeio.app");
  const [password, setPassword] = useState("password123");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const valid = !validateEmail(email) && !validatePassword(password);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); if (!valid) { setSubmitted(true); return; } const successful = await login(email, password); if (!successful) { setError("Invalid email or password."); return; } router.push("/dashboard"); }
  return <AuthFrame title="Welcome back" subtitle="Your home is waiting for you."><form className="space-y-5" onSubmit={handleSubmit}><Field label="Email address" value={email} onChange={setEmail} type="email" error={submitted ? validateEmail(email) : ""} /><Field label="Password" value={password} onChange={setPassword} type="password" error={submitted ? validatePassword(password) : ""} helper="At least 6 characters" />{error && <p className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-danger">{error}</p>}<div className="flex justify-end"><Link href="/forgot-password" className="text-sm font-bold text-primary">Forgot password?</Link></div><button disabled={!valid} type="submit" className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-white disabled:opacity-50">Sign in</button></form><p className="mt-6 text-center text-sm text-muted">New to homeio? <Link href="/signup" className="font-bold text-primary">Create an account</Link></p></AuthFrame>;
}

function Field({ label, value, onChange, type, error, helper }: { label: string; value: string; onChange: (value: string) => void; type: string; error: string; helper?: string }) { return <label className="block text-sm font-bold text-ink">{label}<input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-xl border border-border px-4 py-3 font-normal outline-none focus:border-primary focus:ring-2 focus:ring-blue-100" />{error ? <span className="mt-1 block font-normal text-danger">{error}</span> : helper ? <span className="mt-1 block font-normal text-muted">{helper}</span> : null}</label>; }
