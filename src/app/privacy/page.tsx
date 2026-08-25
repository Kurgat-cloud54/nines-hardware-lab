import type { Metadata } from "next";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How NiNes Hardware Lab collects, uses and protects your personal data.",
};

const sections = [
  {
    title: "What we collect",
    items: [
      "Contact details you provide through our enquiry form or RMA portal: name, organisation, email address, phone number.",
      "Equipment details: manufacturer, model, serial number and fault descriptions you submit for repair.",
      "Technical records generated during repair: diagnostics, measurements, test results and repair notes.",
    ],
  },
  {
    title: "How we use it",
    items: [
      "To respond to enquiries and provide repair quotations.",
      "To manage the repair process, from RMA intake to final report and warranty records.",
      "To communicate repair status and return logistics.",
    ],
  },
  {
    title: "Where it is stored",
    items: [
      "Data is stored in Supabase (PostgreSQL) with row-level security, hosted on infrastructure operated by Supabase and deployed via Vercel.",
      "Access is restricted to authorised NiNes staff. Customer records are isolated per organisation at the database level.",
    ],
  },
  {
    title: "Retention and your rights",
    items: [
      "Repair and warranty records are retained for as long as needed to honour warranties and meet legal obligations.",
      "You may request access, correction or deletion of your personal data at any time by emailing nineshardware.lab@gmail.com.",
      "We do not sell or share your personal data with third parties for marketing purposes.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="grid-bg min-h-[calc(100vh-5rem)]">
        <section className="border-b border-blue-950 bg-[#04101d]/90">
          <div className="mx-auto max-w-4xl px-5 py-20">
            <p className="text-xs font-bold uppercase tracking-wider text-sky-400">Legal</p>
            <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Privacy Policy</h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">NiNes Hardware Lab respects your privacy. This policy explains what we collect and how we protect it.</p>
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
          <p className="text-sm text-slate-500">Questions about this policy? Email nineshardware.lab@gmail.com. Last updated: August 2026.</p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
