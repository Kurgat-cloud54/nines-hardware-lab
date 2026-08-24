import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, Building2, Cable, Cpu, Factory, FlaskConical, Network, RadioTower, ServerCog, ShieldCheck, Wrench } from "lucide-react";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { ContactForm } from "@/components/marketing/contact-form";
import { Button } from "@/components/ui/button";

type PageContent = { eyebrow: string; title: string; intro: string; sections: { title: string; copy?: string; items: string[] }[] };

const pages: Record<string, PageContent> = {
  about: {
    eyebrow: "About NiNes Hardware Lab",
    title: "Engineering precision for critical hardware.",
    intro: "NiNes Hardware Lab is an enterprise electronics repair laboratory focused on restoring the equipment that keeps organisations connected, operating and productive.",
    sections: [
      { title: "What makes us different", items: ["Component-level diagnosis instead of unnecessary replacement", "Structured testing, burn-in and documented quality assurance", "ESD-conscious handling for sensitive enterprise equipment", "Clear technical communication from intake to final report"] },
      { title: "Built for continuity", copy: "Our work is designed around one goal: helping organisations protect uptime, extend asset life and control the cost of critical hardware failures.", items: ["Enterprise networking", "Telecommunications infrastructure", "Industrial and power electronics"] },
    ],
  },
  services: {
    eyebrow: "Engineering services",
    title: "Restore hardware. Protect uptime.",
    intro: "From first diagnosis to final verification, every repair follows a controlled engineering process suited to enterprise and industrial equipment.",
    sections: [
      { title: "Networking and telecom", items: ["Enterprise switch repair", "Enterprise router repair", "Telecom equipment repair", "Server hardware repair"] },
      { title: "Electronics laboratory", items: ["Power supply and PoE module repair", "Industrial electronics repair", "PCB repair and BGA rework", "Failure analysis and reverse engineering"] },
      { title: "Reliability services", items: ["Preventive maintenance", "Advanced diagnostics and measurements", "Functional testing and burn-in", "Engineering repair reports"] },
    ],
  },
  equipment: {
    eyebrow: "Equipment we repair",
    title: "Enterprise equipment deserves expert repair.",
    intro: "We focus on high-value, mission-critical electronics where dependable restoration matters more than quick replacement.",
    sections: [
      { title: "Network infrastructure", items: ["Cisco, Juniper, Arista and Dell", "HPE, Aruba, Huawei and MikroTik", "Ubiquiti, Extreme Networks and Fortinet", "Sophos and other enterprise security platforms"] },
      { title: "Telecommunications", items: ["Nokia, Ericsson and ZTE equipment", "Transmission, access and network power systems", "Telecom boards, modules and control assemblies"] },
      { title: "Power and industrial systems", items: ["Server and industrial power supplies", "Embedded controllers and electronic modules", "Power modules, fans, connectors and PCBs"] },
    ],
  },
  industries: {
    eyebrow: "Industries we support",
    title: "Critical technology for critical operations.",
    intro: "NiNes supports organisations where dependable infrastructure and rapid recovery are not optional.",
    sections: [
      { title: "Connectivity and technology", items: ["Internet Service Providers", "Telecom operators", "Enterprise IT companies", "System integrators and data centres"] },
      { title: "Public and institutional", items: ["Government ICT departments", "Universities and research institutions", "Banks and financial organisations", "Manufacturers and industrial companies"] },
      { title: "How we help", items: ["Extend equipment service life", "Reduce replacement expenditure", "Support business continuity", "Provide clear technical evidence for decisions"] },
    ],
  },
  "repair-process": {
    eyebrow: "Our repair process",
    title: "A controlled path from intake to return.",
    intro: "Every repair is managed through a transparent engineering workflow, designed to protect equipment, make decisions clear and verify results before shipment.",
    sections: [
      { title: "Assessment", items: ["Receive equipment and document condition", "Initial inspection and fault review", "Prepare quotation and customer approval"] },
      { title: "Engineering repair", items: ["Component-level diagnosis", "Repair, rework and replacement of confirmed faults", "Record measurements, parts and repair notes"] },
      { title: "Verification", items: ["Functional testing against relevant conditions", "Burn-in where appropriate", "Quality assurance, report and return preparation"] },
    ],
  },
  "failure-analysis": {
    eyebrow: "Failure analysis",
    title: "Find the root cause, not just the symptom.",
    intro: "For recurring, critical or unexplained failures, NiNes provides a disciplined engineering investigation to build clear evidence for technical and operational decisions.",
    sections: [
      { title: "Investigate", items: ["Symptoms, operating history and visual condition", "Targeted electrical measurements", "Thermal and board-level observations"] },
      { title: "Diagnose", items: ["Fault isolation and root-cause analysis", "Review of affected components and assemblies", "Assessment of repeat-failure risk"] },
      { title: "Report", items: ["Clear technical findings", "Repair and prevention recommendations", "Supporting test results and images where available"] },
    ],
  },
  "knowledge-centre": {
    eyebrow: "Knowledge centre",
    title: "Practical insight for critical electronics.",
    intro: "Our engineering resources will share useful guidance on networking hardware, power electronics, failure symptoms and maintaining resilient infrastructure.",
    sections: [
      { title: "Repair articles", items: ["Understanding component-level repair", "When repair is more effective than replacement", "Preparing enterprise equipment for assessment"] },
      { title: "Engineering notes", items: ["Power-supply failure patterns", "Thermal stress and electronic reliability", "Diagnostics for networking equipment"] },
      { title: "Case studies", items: ["Lessons from recurring failures", "Asset-life extension strategies", "Testing and quality-assurance principles"] },
    ],
  },
  careers: {
    eyebrow: "Careers",
    title: "Build reliable technology with us.",
    intro: "NiNes Hardware Lab is building a team of engineers and technicians who value precision, curiosity, practical problem-solving and professional standards.",
    sections: [
      { title: "Our environment", items: ["Component-level repair and diagnostics", "Enterprise and industrial electronics", "Structured testing and continuous learning"] },
      { title: "What we value", items: ["Careful, evidence-led technical work", "Ownership and clear communication", "Respect for safety, quality and customers"] },
      { title: "Future opportunities", items: ["Electronics repair technicians", "Network and telecom engineers", "Operations and customer support roles"] },
    ],
  },
  contact: {
    eyebrow: "Contact NiNes",
    title: "Talk to an engineering specialist.",
    intro: "Whether you need a repair assessment, technical discussion or a quotation, our team is ready to understand your equipment and operating requirements.",
    sections: [
      { title: "When you contact us", items: ["Equipment manufacturer, model and serial number", "A concise description of the observed fault", "Whether the requirement is urgent or planned", "Your preferred response method and location"] },
      { title: "For organisations", copy: "For recurring repair requirements, we can discuss a structured support and reporting approach suited to your operational needs.", items: ["Enterprise repair assessments", "Failure-analysis requirements", "Equipment fleet support"] },
    ],
  },
  rma: {
    eyebrow: "Repair requests",
    title: "RMA portal coming soon.",
    intro: "Our online repair-intake portal is being prepared. In the meantime, explore our repair capabilities and contact us to discuss your requirement.",
    sections: [{ title: "What the portal will provide", items: ["Secure repair request submission", "Repair-status tracking", "Technical reports and warranty records"] }],
  },
};

const icons = [Network, RadioTower, Cpu, ServerCog, Cable, Wrench, FlaskConical, Factory, Building2];

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug.join("/")];
  return page ? { title: page.title, description: page.intro } : {};
}

export default async function MarketingPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = pages[slug.join("/")];
  if (!page) notFound();

  return <><SiteHeader /><main className="grid-bg min-h-[calc(100vh-5rem)]"><section className="border-b border-blue-950 bg-[#04101d]/90"><div className="mx-auto max-w-7xl px-5 py-20 sm:py-28"><p className="text-xs font-bold uppercase tracking-wider text-sky-400">{page.eyebrow}</p><h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">{page.title}</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">{page.intro}</p>{slug[0] === "rma" && <div className="mt-9"><Button href="/contact">Discuss a repair <ArrowRight className="ml-2 h-4 w-4" /></Button></div>}</div></section><section className="mx-auto max-w-7xl px-5 py-20">{slug[0] === "contact" ? <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr]"><div><h2 className="text-2xl font-semibold">What to include</h2><p className="mt-3 text-slate-400">The more context you can share, the faster we can understand the technical requirement.</p><ul className="mt-7 space-y-4">{page.sections[0].items.map(item => <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-electric" />{item}</li>)}</ul></div><ContactForm /></div> : <div className="grid gap-6 lg:grid-cols-3">{page.sections.map((section, index) => { const Icon = icons[index]; return <article key={section.title} className="rounded-lg border border-blue-900/80 bg-panel p-7"><Icon className="h-9 w-9 text-electric" /><h2 className="mt-12 text-2xl font-semibold">{section.title}</h2>{section.copy && <p className="mt-4 leading-7 text-slate-400">{section.copy}</p>}<ul className="mt-6 space-y-4">{section.items.map(item => <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300"><BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-electric" />{item}</li>)}</ul></article>; })}</div>}</section><section className="border-t border-blue-950 bg-[#05101d]"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-12 md:flex-row md:items-center"><div><p className="text-xl font-semibold">Need expert help with enterprise hardware?</p><p className="mt-2 text-sm text-slate-400">Talk with NiNes Hardware Lab about your repair or engineering requirement.</p></div><Button href="/contact" variant="outline">Contact us <ArrowRight className="ml-2 h-4 w-4" /></Button></div></section></main><SiteFooter /></>;
}
