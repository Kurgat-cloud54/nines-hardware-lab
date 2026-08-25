import type { Metadata } from "next";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing repair services provided by NiNes Hardware Lab.",
};

const sections = [
  {
    title: "Repair services",
    items: [
      "All repairs begin with an intake assessment. We provide a quotation before any chargeable work starts, and proceed only with your approval.",
      "Equipment must be accompanied by accurate fault descriptions and, where applicable, valid proof of ownership.",
      "Repair turnaround times are estimates, not guarantees; priority handling is available for urgent requirements.",
    ],
  },
  {
    title: "Warranty",
    items: [
      "Repairs carry a limited warranty covering the specific fault repaired, for the period stated on your repair report.",
      "The warranty is void if the equipment is opened, modified or additionally damaged by a third party after return.",
      "Warranty claims are assessed free of charge; we repair or re-service at our discretion.",
    ],
  },
  {
    title: "Liability",
    items: [
      "Equipment is handled under ESD-safe, documented conditions; however, repair of electronics carries inherent risk.",
      "Our liability is limited to the cost of the repair service. We are not liable for indirect losses, including data loss or loss of business uptime.",
      "Unclaimed equipment may be disposed of after 90 days and three documented collection attempts.",
    ],
  },
  {
    title: "Data and confidentiality",
    items: [
      "Customer and equipment records are handled per our Privacy Policy.",
      "Repair findings and failure-analysis reports are confidential to the customer unless agreed otherwise.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="grid-bg min-h-[calc(100vh-5rem)]">
        <section className="border-b border-blue-950 bg-[#04101d]/90">
          <div className="mx-auto max-w-4xl px-5 py-20">
            <p className="text-xs font-bold uppercase tracking-wider text-sky-400">Legal</p>
            <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Terms of Service</h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">The terms below govern repair services provided by NiNes Hardware Lab.</p>
          </div>
        </section>
        <section className="mx-auto max-w-4xl space-y-10 px-5 py-16">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              <ul className="mt-4 space-y-3">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric" />{item}</li>
                ))}
              </ul>
            </div>
          ))}
          <p className="text-sm text-slate-500">By submitting equipment for repair you accept these terms. Last updated: August 2026.</p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
