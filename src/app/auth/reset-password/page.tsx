"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Updating…");
    const { error } = await createClient().auth.updateUser({ password: newPassword });
    setMessage(error ? error.message : "Password updated. You can now sign in with it.");
  }

  return (
    <main className="grid min-h-screen place-items-center p-5">
      <form onSubmit={submit} className="w-full max-w-md rounded-lg border border-blue-900 bg-panel p-8">
        <Link href="/auth/login" className="text-sm text-sky-400">← NiNes Hardware Lab</Link>
        <h1 className="mt-7 text-3xl font-semibold">Set a new password</h1>
        <p className="mt-2 text-sm text-slate-400">You&apos;re signed in via the reset link. Choose a new password for your account.</p>
        <label className="mt-7 block text-sm">New password
          <input required minLength={6} type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-2 w-full rounded border bg-ink p-3" />
        </label>
        <button className="mt-6 w-full rounded bg-electric p-3 text-sm font-bold">Update password</button>
        {message && <p role="status" className="mt-4 text-sm text-slate-300">{message}</p>}
      </form>
    </main>
  );
}
