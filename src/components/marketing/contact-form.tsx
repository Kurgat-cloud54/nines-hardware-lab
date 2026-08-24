"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function ContactForm() {
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (form.get("website")) return;
    setSubmitting(true);
    const { error } = await createClient().from("inquiries").insert({
      full_name: String(form.get("full_name")), company: String(form.get("company") || ""), email: String(form.get("email")),
      phone: String(form.get("phone") || ""), subject: String(form.get("subject")), message: String(form.get("message")),
    });
    setSubmitting(false);
    if (error) { setMessage("We could not send your enquiry at this time. Please try again shortly."); return; }
    event.currentTarget.reset();
    setMessage("Thank you. Your enquiry has been received and our team will respond shortly.");
  }

  return <form onSubmit={submit} className="rounded-lg border border-blue-900/80 bg-panel p-7"><h2 className="text-2xl font-semibold">Send an enquiry</h2><p className="mt-2 text-sm leading-6 text-slate-400">Tell us what equipment or engineering requirement you would like to discuss.</p><input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" /><div className="mt-6 grid gap-4 sm:grid-cols-2"><label className="text-sm">Name<input required name="full_name" className="mt-2 w-full rounded border bg-ink p-3" /></label><label className="text-sm">Organisation<input name="company" className="mt-2 w-full rounded border bg-ink p-3" /></label><label className="text-sm">Email address<input required name="email" type="email" className="mt-2 w-full rounded border bg-ink p-3" /></label><label className="text-sm">Phone (optional)<input name="phone" type="tel" className="mt-2 w-full rounded border bg-ink p-3" /></label></div><label className="mt-4 block text-sm">Subject<input required name="subject" className="mt-2 w-full rounded border bg-ink p-3" /></label><label className="mt-4 block text-sm">How can we help?<textarea required name="message" rows={5} className="mt-2 w-full rounded border bg-ink p-3" /></label><button disabled={submitting} className="mt-6 rounded bg-electric px-5 py-3 text-sm font-bold disabled:opacity-60">{submitting ? "Sending…" : "Send enquiry"}</button>{message && <p role="status" className="mt-4 text-sm text-slate-300">{message}</p>}</form>;
}
