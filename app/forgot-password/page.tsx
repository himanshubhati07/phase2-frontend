"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { AuthFrame } from "@/components/AuthFrame";
import { validateEmail } from "@/lib/validation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState(""); const [submitted, setSubmitted] = useState(false); const [sent, setSent] = useState(false); const valid = !validateEmail(email);
  function handleSubmit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); if (!valid) { setSubmitted(true); return; } setSent(true); }
  return <AuthFrame title="Reset your password" subtitle="We’ll send a reset link to your inbox.">{sent ? <div><div className="rounded-xl bg-emerald-50 p-4 text-sm font-semibold text-success">If an account exists for {email}, a reset link is on its way.</div><Link href="/login" className="mt-6 inline-block text-sm font-bold text-primary">Return to sign in</Link></div> : <form className="space-y-5" onSubmit={handleSubmit}><label className="block text-sm font-bold text-ink">Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-border px-4 py-3 font-normal outline-none focus:border-primary" />{submitted && validateEmail(email) && <span className="mt-1 block font-normal text-danger">{validateEmail(email)}</span>}</label><button disabled={!valid} type="submit" className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-white disabled:opacity-50">Send reset link</button><Link href="/login" className="block text-center text-sm font-bold text-primary">Back to sign in</Link></form>}</AuthFrame>;
}
