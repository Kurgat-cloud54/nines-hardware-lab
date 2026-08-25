"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createRma, type IntakeState } from "./actions";

const inputClass = "mt-2 w-full rounded border border-slate-700 bg-ink p-3 text-sm focus:border-sky-500 focus:outline-none";

export default function NewRmaPage() {
  const [state, formAction, pending] = useActionState<IntakeState, FormData>(createRma, {});

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/portal" className="text-sm text-sky-400 hover:underline">← Back to dashboard</Link>
      <h1 className="mt-4 text-3xl font-semibold">New RMA request</h1>
      <p className="mt-2 text-sm text-slate-400">Register the equipment and describe the fault. Our engineers review every submission within one business day.</p>

      <form action={formAction} className="mt-8 space-y-6 rounded-lg border border-slate-800 bg-panel p-6">
        <fieldset className="space-y-5">
          <legend className="text-sm font-bold uppercase tracking-wider text-sky-400">Equipment</legend>
          <label className="block text-sm">Manufacturer
            <input required name="manufacturer" placeholder="e.g. SMA" className={inputClass} />
          </label>
          <label className="block text-sm">Model
            <input required name="model" placeholder="e.g. Sunny Tripower 20000TL" className={inputClass} />
          </label>
          <label className="block text-sm">Serial number
            <input required name="serial_number" placeholder="From the nameplate" className={`${inputClass} font-mono`} />
          </label>
          <label className="block text-sm">Category <span className="text-slate-500">(optional)</span>
            <input name="category" placeholder="Solar inverter, lithium BMS, drive…" className={inputClass} />
          </label>
        </fieldset>

        <fieldset className="space-y-5">
          <legend className="text-sm font-bold uppercase tracking-wider text-sky-400">Fault report</legend>
          <label className="block text-sm">Describe the fault
            <textarea required name="fault_description" rows={5} minLength={10}
              placeholder="What happened, when it started, any error codes, and what you've already tried."
              className={inputClass} />
          </label>
          <label className="block text-sm">Priority
            <select name="priority" defaultValue="standard" className={inputClass}>
              <option value="standard">Standard — normal queue</option>
              <option value="urgent">Urgent — production impacted</option>
              <option value="critical">Critical — site down / safety risk</option>
            </select>
          </label>
        </fieldset>

        {state.error && <p role="alert" className="rounded border border-red-800 bg-red-950/50 p-3 text-sm text-red-300">{state.error}</p>}

        <button disabled={pending} className="w-full rounded bg-electric p-3 text-sm font-bold hover:brightness-110 disabled:opacity-50">
          {pending ? "Submitting…" : "Submit RMA request"}
        </button>
      </form>
    </div>
  );
}
