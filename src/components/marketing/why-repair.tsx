import { ArrowRight, BadgeCheck, Leaf, Recycle, Wallet, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const comparison: { aspect: string; repair: string; replace: string }[] = [
  { aspect: "Capital cost", repair: "A fraction of the price of new equipment", replace: "Full purchase price, plus installation and configuration" },
  { aspect: "Lead time", repair: "Days — your hardware is already on the bench", replace: "Weeks or months of procurement, shipping and customs" },
  { aspect: "Downtime risk", repair: "Minimal — restore the unit you already run", replace: "Extended outages while waiting for new equipment" },
  { aspect: "Compatibility", repair: "Same hardware, same configuration, same spares", replace: "Reconfiguration, retraining and integration work" },
  { aspect: "Environmental impact", repair: "Extends equipment life, zero new e-waste", replace: "Discarded hardware plus the footprint of new manufacturing" },
];

const benefits = [
  "Protect your capital budget — repair spending is typically far below replacement cost",
  "Keep networks, systems and solar plants producing instead of waiting on procurement",
  "Extend the service life of proven, configured and integrated equipment",
  "Divert functional electronics from landfill and support your ESG targets",
  "Documented engineering evidence to justify repair over replacement to management",
];

export function WhyRepair() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <div className="grid gap-6 md:grid-cols-3">
        <article className="rounded-lg border border-blue-900/80 bg-panel p-7"><Wallet className="h-9 w-9 text-electric" /><h2 className="mt-5 text-2xl font-semibold">Save the cost of new equipment</h2><p className="mt-3 leading-7 text-slate-400">When an enterprise board, inverter or switch fails outside warranty, replacement is rarely the only option. Component-level repair restores the same hardware for a fraction of the purchase price.</p></article>
        <article className="rounded-lg border border-blue-900/80 bg-panel p-7"><Zap className="h-9 w-9 text-electric" /><h2 className="mt-5 text-2xl font-semibold">Keep operations running</h2><p className="mt-3 leading-7 text-slate-400">Repair works on your timeline, not a supplier's. No waiting on stock, shipping or reconfiguration — your network, systems and solar power stay up and running.</p></article>
        <article className="rounded-lg border border-blue-900/80 bg-panel p-7"><Recycle className="h-9 w-9 text-electric" /><h2 className="mt-5 text-2xl font-semibold">Repair is the green movement</h2><p className="mt-3 leading-7 text-slate-400">Electronic waste is one of the fastest-growing waste streams on the planet. Every repair keeps working hardware in service and out of the landfill.</p></article>
      </div>

      <h2 className="mt-20 text-3xl font-semibold">Repair vs. replace at a glance</h2>
      <div className="mt-8 overflow-x-auto rounded-lg border border-blue-900/80">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead className="bg-[#061221] text-xs uppercase tracking-wider text-slate-400">
            <tr><th className="p-4 font-bold">Consideration</th><th className="p-4 font-bold text-sky-400">Repair with NiNes</th><th className="p-4 font-bold">Buy new</th></tr>
          </thead>
          <tbody>
            {comparison.map((row, index) => <tr key={row.aspect} className={index % 2 ? "bg-panel" : "bg-[#04101d]"}><td className="p-4 font-semibold text-slate-200">{row.aspect}</td><td className="p-4 leading-6 text-slate-300">{row.repair}</td><td className="p-4 leading-6 text-slate-500">{row.replace}</td></tr>)}
          </tbody>
        </table>
      </div>

      <div className="mt-20 grid gap-12 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <h2 className="text-3xl font-semibold">What businesses gain</h2>
          <ul className="mt-7 space-y-4">{benefits.map(item => <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300"><BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-electric" />{item}</li>)}</ul>
          <div className="mt-10 flex flex-wrap gap-3"><Button href="/contact">Request a repair assessment <ArrowRight className="ml-2 h-4 w-4" /></Button><Button href="/services" variant="outline">Explore capabilities</Button></div>
        </div>
        <div className="rounded-lg border border-blue-900/80 bg-panel p-7">
          <Leaf className="h-9 w-9 text-electric" />
          <h3 className="mt-5 text-xl font-semibold">The circular economy, in practice</h3>
          <p className="mt-4 leading-7 text-slate-400">Manufacturing a single new inverter or switch consumes raw materials, energy and logistics — and sends the failed unit to waste. Repair closes the loop: the embedded value in your existing hardware keeps working for years longer.</p>
          <p className="mt-4 leading-7 text-slate-400">For organisations with sustainability commitments, documented repair is a measurable way to reduce electronic waste and demonstrate responsible asset management.</p>
        </div>
      </div>
    </section>
  );
}
