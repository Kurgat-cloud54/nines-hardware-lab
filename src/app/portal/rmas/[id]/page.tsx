import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const WORKFLOW = ["submitted", "received", "inspection", "quoted", "approved", "diagnosis", "repair", "testing", "qa", "ready_to_ship", "shipped", "closed"] as const;

export default async function RmaDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ submitted?: string }>;
}) {
  const { id } = await params;
  const { submitted } = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  // RLS scopes this to the customer's organization or staff.
  const { data: rma } = await supabase
    .from("rmas")
    .select("*, equipment(manufacturer, model, serial_number, category), repairs(status, diagnosis, repair_notes, test_results, assigned_engineer_id)")
    .eq("id", id)
    .single();
  if (!rma) notFound();

  const { data: events } = await supabase
    .from("rma_events")
    .select("status, note, created_at")
    .eq("rma_id", id)
    .order("created_at", { ascending: true });

  const currentStep = WORKFLOW.indexOf(rma.status as (typeof WORKFLOW)[number]);
  const repair = Array.isArray(rma.repairs) ? rma.repairs[0] : rma.repairs;

  return (
    <div className="space-y-8">
      <Link href="/portal" className="text-sm text-sky-400 hover:underline">← Back to dashboard</Link>

      {submitted && (
        <p role="status" className="rounded border border-emerald-800 bg-emerald-950/50 p-4 text-sm text-emerald-300">
          RMA submitted successfully. Our team will confirm receipt within one business day.
        </p>
      )}

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">{rma.rma_number}</h1>
          <p className="mt-1 text-sm text-slate-400">
            Opened {new Date(rma.created_at).toLocaleDateString()} · Priority: <span className="uppercase">{rma.priority}</span>
          </p>
        </div>
        <span className="rounded-full bg-sky-900 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-sky-300">{rma.status.replace(/_/g, " ")}</span>
      </div>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-slate-800 bg-panel p-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-sky-400">Equipment</h2>
          {rma.equipment ? (
            <dl className="mt-4 space-y-3 text-sm">
              <div><dt className="text-slate-500">Unit</dt><dd>{rma.equipment.manufacturer} {rma.equipment.model}</dd></div>
              <div><dt className="text-slate-500">Serial</dt><dd className="font-mono">{rma.equipment.serial_number}</dd></div>
              {rma.equipment.category && <div><dt className="text-slate-500">Category</dt><dd>{rma.equipment.category}</dd></div>}
            </dl>
          ) : <p className="mt-4 text-sm text-slate-400">No equipment details.</p>}
        </div>
        <div className="rounded-lg border border-slate-800 bg-panel p-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-sky-400">Fault report</h2>
          <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-300">{rma.fault_description}</p>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Repair progress</h2>
        <ol className="mt-4 flex flex-wrap gap-2">
          {WORKFLOW.map((step) => {
            const stepIndex = WORKFLOW.indexOf(step);
            const done = currentStep >= stepIndex && currentStep !== -1;
            return (
              <li key={step} className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide ${done ? "bg-sky-900 text-sky-300" : "bg-slate-800/60 text-slate-500"}`}>
                {step.replace(/_/g, " ")}
              </li>
            );
          })}
        </ol>
      </section>

      {repair && (repair.diagnosis || repair.repair_notes || repair.test_results) && (
        <section className="rounded-lg border border-slate-800 bg-panel p-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-sky-400">Engineering notes</h2>
          <dl className="mt-4 space-y-4 text-sm leading-7 text-slate-300">
            {repair.diagnosis && <div><dt className="font-medium text-slate-100">Diagnosis</dt><dd className="whitespace-pre-line">{repair.diagnosis}</dd></div>}
            {repair.repair_notes && <div><dt className="font-medium text-slate-100">Repair notes</dt><dd className="whitespace-pre-line">{repair.repair_notes}</dd></div>}
            {repair.test_results && <div><dt className="font-medium text-slate-100">Test results</dt><dd className="whitespace-pre-line">{repair.test_results}</dd></div>}
          </dl>
        </section>
      )}

      <section>
        <h2 className="text-lg font-semibold">History</h2>
        {!events || events.length === 0 ? (
          <p className="mt-3 text-sm text-slate-400">No status changes recorded yet.</p>
        ) : (
          <ul className="mt-4 space-y-0 rounded-lg border border-slate-800 bg-panel">
            {events.map((event, index) => (
              <li key={index} className="flex items-baseline justify-between gap-4 border-b border-slate-800 p-4 last:border-b-0">
                <div>
                  <span className="text-sm font-medium uppercase tracking-wide">{event.status.replace(/_/g, " ")}</span>
                  {event.note && <p className="mt-1 text-sm text-slate-400">{event.note}</p>}
                </div>
                <time className="shrink-0 text-xs text-slate-500">{new Date(event.created_at).toLocaleString()}</time>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
