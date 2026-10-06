"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { create } from "@/lib/stores/home-store";
import { validateRequired } from "@/lib/validation";

export default function NewHomePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [rooms, setRooms] = useState("1");
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState("");
  const errors = { name: validateRequired(name, "Home name"), address: validateRequired(address, "Address") };
  const valid = !errors.name && !errors.address && Number(rooms) > 0;
  async function handleSubmit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); if (!valid) { setSubmitted(true); return; } const home = await create({ name, address, rooms: Number(rooms) }); setSuccess("Home added successfully. Opening your new home..."); setTimeout(() => router.push(`/homes/${home.id}`), 500); }
  const fieldClass = "mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-blue-100";
  return <div className="mx-auto max-w-2xl"><button type="button" onClick={() => router.back()} className="text-sm font-bold text-muted hover:text-primary">← Cancel</button><div className="mt-5 rounded-2xl border border-border bg-surface p-7 shadow-card"><p className="text-sm font-semibold text-primary">NEW SPACE</p><h1 className="mt-1 text-3xl font-bold text-ink">Add a home</h1><p className="mt-2 text-muted">Start building a calmer way to care for your space.</p>{success && <div className="mt-5 rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-success">{success}</div>}<form className="mt-7 space-y-5" onSubmit={handleSubmit}><label className="block text-sm font-bold text-ink">Home name<input value={name} onChange={(event) => setName(event.target.value)} className={fieldClass} placeholder="e.g. Maple House" /></label>{submitted && errors.name && <p className="-mt-3 text-sm text-danger">{errors.name}</p>}<label className="block text-sm font-bold text-ink">Address<input value={address} onChange={(event) => setAddress(event.target.value)} className={fieldClass} placeholder="Street, city" /></label>{submitted && errors.address && <p className="-mt-3 text-sm text-danger">{errors.address}</p>}<label className="block text-sm font-bold text-ink">Number of rooms<input min="1" type="number" value={rooms} onChange={(event) => setRooms(event.target.value)} className={fieldClass} /></label><div className="flex justify-end gap-3 pt-3"><button type="button" onClick={() => router.back()} className="rounded-xl border border-border px-5 py-3 text-sm font-bold text-ink">Cancel</button><button disabled={!valid} type="submit" className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white disabled:opacity-50">Add home</button></div></form></div></div>;
}
