import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const STATUS_STYLES: Record<string, string> = {
  draft: "bg-slate-700 text-slate-200",
  submitted: "bg-sky-900 text-sky-300",
  received: "bg-sky-900 text-sky-300",
  inspection: "bg-amber-900 text-amber-300",
  quoted: "bg-amber-900 text-amber-300",
  approved: "bg-emerald-900 text-emerald-300",
  diagnosis: "bg-indigo-900 text-indigo-300",
  repair: "bg-indigo-900 text-indigo-300",
  testing: "bg-violet-900 text-violet-300",
  qa: "bg-violet-900 text-violet-300",
  ready_to_ship: "bg-emerald-900 text-emerald-300",
  shipped: "bg-emerald-800 text-emerald-200",
  closed: "bg-slate-800 text-slate-400",
  cancelled: "bg-red-900 text-red-300",
};

export default async function PortalDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase.from("profiles").select("organization_id").eq("id", user.id).single();
  if (!profile?.organization_id) {
    return (
      <div className="rounded-lg border border-slate-800 bg-panel p-8">
        <h1 className="text-2xl font-semibold">No organization linked</h1>
        <p className="mt-3 max-w-xl leading-7 text-slate-400">
          Your account isn&apos;t attached to a customer organization yet. Please contact NiNes Hardware Lab support and we&apos;ll link your account.
        </p>
      </div>
    );
  }

  const [rmasResult, equipmentResult] = await Promise.all([
    supabase.from("rmas")
      .select("id, rma_number, status, priority, fault_description, created_at, equipment(manufacturer, model)")
      .eq("organization_id", profile.organization_id)
      .order("created_at", { ascending: false })
      .limit(20),
    supabase.from("equipment")
      .select("id, manufacturer, model, serial_number, category, created_at")
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  const rmas = rmasResult.data ?? [];
  const equipment = equipmentResult.data ?? [];
  const openCount = rmas.filter((r) => !["shipped", "closed", "cancelled"].includes(r.status)).length;

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-sky-400">Customer portal</p>
          <h1 className="mt-1 text-3xl font-semibold">Repair dashboard</h1>
        </div>
        <Link href="/portal/rmas/new" className="rounded bg-electric px-5 py-2.5 text-sm font-bold hover:brightness-110">
          + New RMA request
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Open RMAs", value: openCount },
          { label: "Total RMAs", value: rmas.length },
          { label: "Registered equipment", value: equipment.length },
        ].map((card) => (
          <div key={card.label} className="rounded-lg border border-slate-800 bg-panel p-5">
            <p className="text-sm text-slate-400">{card.label}</p>
            <p className="mt-2 text-4xl font-semibold">{card.value}</p>
          </div>
        ))}
      </div>

      <section>
        <h2 className="text-lg font-semibold">Recent RMAs</h2>
        {rmas.length === 0 ? (
          <p className="mt-3 rounded-lg border border-dashed border-slate-700 bg-panel/50 p-6 text-sm text-slate-400">
            No RMA requests yet. Start one with the “New RMA request” button above.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-slate-800 rounded-lg border border-slate-800 bg-panel">
            {rmas.map((rma) => (
              <li key={rma.id}>
                <Link href={`/portal/rmas/${rma.id}`} className="flex flex-wrap items-center justify-between gap-3 p-4 hover:bg-white/5">
                  <div>
                    <p className="font-medium">{rma.rma_number}</p>
                    <p className="text-sm text-slate-400">
                      {Array.isArray(rma.equipment) ? rma.equipment[0] && `${rma.equipment[0].manufacturer} ${rma.equipment[0].model}` : "Equipment pending"} · {new Date(rma.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${STATUS_STYLES[rma.status] ?? "bg-slate-700"}`}>
                    {rma.status.replace(/_/g, " ")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold">Your equipment</h2>
        {equipment.length === 0 ? (
          <p className="mt-3 rounded-lg border border-dashed border-slate-700 bg-panel/50 p-6 text-sm text-slate-400">
            No equipment registered yet — you&apos;ll add it as part of your first RMA request.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-lg border border-slate-800 bg-panel">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-800 text-xs uppercase tracking-wide text-slate-500">
                <tr><th className="p-4">Manufacturer</th><th className="p-4">Model</th><th className="p-4">Serial</th><th className="p-4">Category</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {equipment.map((item) => (
                  <tr key={item.id}>
                    <td className="p-4">{item.manufacturer}</td>
                    <td className="p-4">{item.model}</td>
                    <td className="p-4 font-mono text-xs">{item.serial_number}</td>
                    <td className="p-4 text-slate-400">{item.category ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
