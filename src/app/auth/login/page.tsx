"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState<"login" | "forgot">("login");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email"));
    if (mode === "forgot") {
      setMessage("Sending reset link…");
      const { error } = await createClient().auth.resetPasswordForEmail(email, { redirectTo: `${location.origin}/auth/callback?next=/auth/reset-password` });
      setMessage(error ? error.message : "Reset link sent — check your email inbox.");
      return;
    }
    const { error } = await createClient().auth.signInWithPassword({ email, password: String(form.get("password")) });
    setMessage(error?.message ?? "Signed in. Redirecting…");
    if (!error) window.location.assign("/portal");
  }

  return (
    <main className="grid min-h-screen place-items-center p-5">
      <form onSubmit={submit} className="w-full max-w-md rounded-lg border border-blue-900 bg-panel p-8">
        <Link href="/" className="text-sm text-sky-400">← NiNes Hardware Lab</Link>
        <h1 className="mt-7 text-3xl font-semibold">{mode === "login" ? "Customer portal" : "Reset password"}</h1>
        <p className="mt-2 text-sm text-slate-400">{mode === "login" ? "Secure access to repairs, reports, invoices and RMAs." : "Enter your account email and we'll send you a link to set a new password."}</p>
        <label className="mt-7 block text-sm">Email
          <input required name="email" type="email" className="mt-2 w-full rounded border bg-ink p-3" />
        </label>
        {mode === "login" && (
          <label className="mt-4 block text-sm">Password
            <input required name="password" type="password" className="mt-2 w-full rounded border bg-ink p-3" />
          </label>
        )}
        <button className="mt-6 w-full rounded bg-electric p-3 text-sm font-bold">{mode === "login" ? "Sign in" : "Send reset link"}</button>
        {message && <p role="status" className="mt-4 text-sm text-slate-300">{message}</p>}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-400">
          <button type="button" onClick={() => { setMode(mode === "login" ? "forgot" : "login"); setMessage(""); }} className="text-sky-400">
            {mode === "login" ? "Forgot password?" : "← Back to sign in"}
          </button>
          {mode === "login" && <span>New customer? <Link href="/auth/sign-up" className="text-sky-400">Create an account</Link></span>}
        </div>
      </form>
    </main>
  );
}
