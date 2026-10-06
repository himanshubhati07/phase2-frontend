"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthFrame } from "@/components/AuthFrame";
import { signup } from "@/lib/stores/auth-store";
import { validateEmail, validatePassword, validateRequired } from "@/lib/validation";

export default function SignupPage() {
  const router = useRouter(); const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [submitted, setSubmitted] = useState(false); const [error, setError] = useState("");
  const valid = !validateRequired(name, "Name") && !validateEmail(email) && !validatePassword(password);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); if (!valid) { setSubmitted(true); return; } const user = await signup(name, email, password); if (!user) { setError("An account with this email already exists."); return; } router.push("/dashboard"); }
  return <AuthFrame title="Make home feel easier" subtitle="Create your personal home base."><form className="space-y-5" onSubmit={handleSubmit}><label className="block text-sm font-bold text-ink">Your name<input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-xl border border-border px-4 py-3 font-normal outline-none focus:border-primary" />{submitted && validateRequired(name, "Name") && <span className="mt-1 block font-normal text-danger">{validateRequired(name, "Name")}</span>}</label><label className="block text-sm font-bold text-ink">Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-border px-4 py-3 font-normal outline-none focus:border-primary" />{submitted && validateEmail(email) && <span className="mt-1 block font-normal text-danger">{validateEmail(email)}</span>}</label><label className="block text-sm font-bold text-ink">Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-border px-4 py-3 font-normal outline-none focus:border-primary" /><span className="mt-1 block font-normal text-muted">At least 6 characters</span>{submitted && validatePassword(password) && <span className="mt-1 block font-normal text-danger">{validatePassword(password)}</span>}</label>{error && <p className="rounded-xl bg-red-50 p-3 text-sm text-danger">{error}</p>}<button disabled={!valid} type="submit" className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-white disabled:opacity-50">Create account</button></form><p className="mt-6 text-center text-sm text-muted">Already have an account? <Link href="/login" className="font-bold text-primary">Sign in</Link></p></AuthFrame>;
}
