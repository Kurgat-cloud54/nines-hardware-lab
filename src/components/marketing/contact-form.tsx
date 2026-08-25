"use client";

import { useActionState } from "react";
import { submitEnquiry, type EnquiryState } from "@/app/actions/enquiry";

const inputClass = "mt-2 w-full rounded border bg-ink p-3";

export function ContactForm() {
  const [state, formAction, submitting] = useActionState<EnquiryState, FormData>(submitEnquiry, {});

  return (
    <form action={formAction} className="rounded-lg border border-blue-900/80 bg-panel p-7">
      <h2 className="text-2xl font-semibold">Send an enquiry</h2>
      <p className="mt-2 text-sm leading-6 text-slate-400">Tell us what equipment or engineering requirement you would like to discuss.</p>
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="text-sm">Name<input required name="full_name" className={inputClass} /></label>
        <label className="text-sm">Organisation<input name="company" className={inputClass} /></label>
        <label className="text-sm">Email address<input required name="email" type="email" className={inputClass} /></label>
        <label className="text-sm">Phone (optional)<input name="phone" type="tel" className={inputClass} /></label>
      </div>
      <label className="mt-4 block text-sm">Subject<input required name="subject" className={inputClass} /></label>
      <label className="mt-4 block text-sm">How can we help?<textarea required name="message" rows={5} className={inputClass} /></label>
      <button disabled={submitting} className="mt-6 rounded bg-electric px-5 py-3 text-sm font-bold disabled:opacity-60">{submitting ? "Sending…" : "Send enquiry"}</button>
      {state.error && <p role="alert" className="mt-4 rounded border border-red-800 bg-red-950/50 p-3 text-sm text-red-300">{state.error}</p>}
      {!state.error && state !== null && submitting === false && <noscript><p className="mt-4 text-sm text-slate-300">Thank you. Your enquiry has been received.</p></noscript>}
    </form>
  );
}
