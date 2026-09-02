import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, Building2, Cable, Cpu, Factory, FlaskConical, Mail, MessageCircle, Network, Phone, RadioTower, ServerCog, ShieldCheck, Wrench } from "lucide-react";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { ContactForm } from "@/components/marketing/contact-form";
import { GalleryGrid } from "@/components/marketing/gallery-grid";
import { WhyRepair } from "@/components/marketing/why-repair";
import { KnowledgeArticle, KnowledgeIndex } from "@/components/marketing/knowledge-index";
import { Button } from "@/components/ui/button";

type PageContent = { eyebrow: string; title: string; intro: string; sections: { title: string; copy?: string; items: string[] }[] };

const pages: Record<string, PageContent> = {
  about: {
    eyebrow: "About NiNes Hardware Lab",
    title: "Engineering precision for critical hardware.",
    intro: "NiNes Hardware Lab is an enterprise electronics repair laboratory focused on restoring the equipment that keeps organisations connected, operating and productive.",
    sections: [
      { title: "What makes us different", items: ["Component-level diagnosis instead of unnecessary replacement", "Structured testing, burn-in and documented quality assurance", "ESD-conscious handling for sensitive enterprise equipment", "Clear technical communication from intake to final report"] },
      { title: "Built for continuity", copy: "Our work is designed around one goal: helping organisations protect uptime, extend asset life and control the cost of critical hardware failures.", items: ["Enterprise networking", "Telecommunications infrastructure", "Industrial, solar and power electronics"] },
      { title: "Repair is the sustainable choice", copy: "Electronic waste is one of the fastest-growing waste streams in the world. Component-level repair keeps servers, switches and inverters in service for years longer — diverting functional hardware from landfill and reducing the demand for new manufacturing.", items: ["Keeps working hardware out of landfill", "Reduces demand for new manufacturing and raw materials", "Supports your organisation's sustainability and ESG goals", "The circular-economy alternative to replacement"] },
    ],
  },
  services: {
    eyebrow: "Engineering services",
    title: "Restore hardware. Protect uptime.",
    intro: "From solar inverters to network switches, DVRs and power electronics — every repair is engineered to save you the cost of replacement, keep your systems running and extend the life of hardware that would otherwise become e-waste.",
    sections: [
      { title: "Solar & energy systems", items: ["Grid-tie, hybrid and off-grid solar inverter repair", "Charge controller diagnostics and repair", "Lithium battery BMS board repair", "MPPT stage, DC bus and control board rework", "Firmware integrity and configuration checks"] },
      { title: "Networking & surveillance", items: ["MikroTik, TP-Link, D-Link and Tenda switch/router repair", "Cisco, Juniper, Aruba, HPE and Huawei platforms", "PoE port, management board and power-stage repair", "DVR and NVR mainboard repair", "CCTV camera board and PoE supply restoration"] },
      { title: "Electronics laboratory", items: ["Power supply and PoE module repair", "Industrial electronics, PCB repair and BGA rework", "Failure analysis and reverse engineering", "Preventive maintenance and measurements"] },
      { title: "Repair-vs-replace assessment", copy: "Not sure whether to repair or buy new? We evaluate the failed unit honestly and give you the cost, lead-time and risk comparison you need to decide.", items: ["Honest engineering evaluation of your options", "Clear cost and lead-time comparison for decision-makers", "Documented technical findings to support procurement approvals"] },
      { title: "Reliability services", items: ["Functional testing under load", "Burn-in and quality assurance", "Engineering repair reports", "Warranty records and documentation"] },
    ],
  },
  equipment: {
    eyebrow: "Equipment we repair",
    title: "Critical equipment deserves expert repair.",
    intro: "We focus on high-value, mission-critical electronics — solar energy systems, network infrastructure, surveillance recorders and industrial boards — where dependable restoration matters more than quick replacement.",
    sections: [
      { title: "Solar & energy systems", items: ["Growatt, Victron, Deye, Sunsynk and Luxpower inverters", "Hybrid and off-grid inverter control boards", "Solar charge controllers and MPPT units", "Lithium battery BMS boards", "Server, industrial and PoE power supplies"] },
      { title: "Network switches & routers", items: ["MikroTik, TP-Link, D-Link and Tenda", "Cisco, Juniper, Aruba, HPE and Huawei", "Ubiquiti, Extreme Networks and Fortinet", "Sophos and other enterprise security platforms", "PoE injectors, media converters and access points"] },
      { title: "CCTV & surveillance", items: ["Hikvision, Dahua and Uniview DVRs/NVRs", "CCTV camera mainboards and sensor modules", "Surveillance PoE supplies and injectors", "Video baluns, transceivers and cabling electronics"] },
      { title: "General electronics", items: ["Embedded controllers and single-board computers", "Control, interface and power boards", "RF modules and communication assemblies", "Fans, connectors and component-level rework"] },
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
    intro: "Guidance on repair economics, sustainability and keeping enterprise hardware in service — written by the engineers who do the work.",
    sections: [],
  },
  "knowledge-centre/when-repair-beats-replacement": {
    eyebrow: "Knowledge centre · Repair economics",
    title: "When repair beats replacement",
    intro: "Failed hardware is a purchasing decision as much as a technical one. Here is how to judge whether component-level repair is the smarter choice for cost, uptime and risk.",
    sections: [
      { title: "The economics of repair", copy: "Most out-of-warranty failures come down to a handful of components on an otherwise healthy assembly. Repairing those components costs a fraction of replacing the whole unit — and the capital you save stays in your budget.", items: ["Repair typically costs a fraction of the price of new equipment", "You keep the original configuration, licensing and integration work", "The failed board is restored instead of written off as e-waste", "Repair expenditure is predictable and easy to approve"] },
      { title: "Where repair clearly wins", items: ["High-value equipment just outside warranty", "Discontinued or end-of-sale models with no direct replacement", "Units already configured, integrated and proven in your environment", "Fleet-standard hardware where consistency simplifies support", "Situations with long procurement lead times on new stock"] },
      { title: "When replacement is the right call", copy: "An honest assessment sometimes points to replacement. If the damage is uneconomic to repair, or new hardware brings genuine gains, we will tell you plainly.", items: ["Catastrophic damage across most of the assembly", "Repair cost approaching the price of new equipment", "Real efficiency or performance gains from newer hardware", "Manufacturer terms that make replacement the better deal"] },
    ],
  },
  "knowledge-centre/repair-esg-e-waste": {
    eyebrow: "Knowledge centre · Sustainability",
    title: "How repair supports your ESG and e-waste goals",
    intro: "Electronic waste is one of the fastest-growing waste streams in the world. Every enterprise board kept in service is measurable progress against it.",
    sections: [
      { title: "The scale of e-waste", copy: "Enterprise networks, solar plants and surveillance systems all run on hardware with a limited warranty window. When those units are discarded rather than repaired, valuable and hazardous materials end up in landfill.", items: ["Millions of tonnes of e-waste are generated worldwide every year", "A large share is equipment that could have been repaired", "Electronics contain valuable materials and hazardous substances", "Discarding hardware wastes the energy already embedded in it"] },
      { title: "Repair as circular-economy practice", items: ["Extends the service life of proven, configured hardware", "Avoids raw-material extraction and manufacturing for replacements", "Keeps equipment in productive use for years longer", "Turns replacement cycles into repair cycles"] },
      { title: "Making it measurable", copy: "Sustainability commitments need evidence. Because every NiNes repair is documented, your organisation can count what it diverted and report it with confidence.", items: ["Repair reports identify exactly what was restored", "Asset-life extension is visible in your inventory records", "Diverted e-waste can be counted and reported internally", "Supports ESG reporting and responsible asset-management claims"] },
    ],
  },
  "knowledge-centre/preparing-equipment-for-assessment": {
    eyebrow: "Knowledge centre · Practical guide",
    title: "Preparing equipment for assessment",
    intro: "A little preparation before you ship failed hardware speeds up diagnosis, shortens turnaround and prevents damage in transit.",
    sections: [
      { title: "Document the fault", items: ["Manufacturer, model and serial number", "What the equipment was doing when it failed", "Symptoms observed — indicators, sounds, errors, behaviour", "Troubleshooting already attempted", "Photos of the unit and its installation, if available"] },
      { title: "Include the essentials", copy: "Sending the right accessories with the unit avoids delays once it reaches the bench.", items: ["Power adapters, injectors or cables where relevant", "Modules, SFPs or daughterboards fitted to the unit", "Access details if management interfaces are locked", "Your preferred response method and urgency"] },
      { title: "Pack it safely", items: ["Use an anti-static bag and a rigid box where possible", "Remove and label memory cards, drives and SIMs if sensitive", "Cushion the unit — transit damage complicates diagnosis", "Enclose your contact details and reference number"] },
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
  gallery: {
    eyebrow: "Gallery",
    title: "Our work, up close.",
    intro: "Photos from the NiNes Hardware Lab bench — diagnostics, component-level repair and reassembly of solar inverters and power electronics.",
    sections: [],
  },
  "why-repair": {
    eyebrow: "Why repair?",
    title: "Save the cost of new equipment. Keep running. Cut e-waste.",
    intro: "Failed enterprise hardware is rarely the end of its life. NiNes Hardware Lab restores networking, solar and industrial electronics at a fraction of replacement cost — keeping your operations running and keeping e-waste out of landfill.",
    sections: [],
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
  if (!page) return {};
  return {
    title: page.title,
    description: page.intro,
    alternates: { canonical: `/${slug.join("/")}` },
    openGraph: { title: `${page.title} | NiNes Hardware Lab`, description: page.intro, url: `/${slug.join("/")}`, siteName: "NiNes Hardware Lab", type: "website" },
  };
}

export default async function MarketingPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = pages[slug.join("/")];
  if (!page) notFound();

  return <><SiteHeader /><main className="grid-bg min-h-[calc(100vh-5rem)]"><section className="border-b border-blue-950 bg-[#04101d]/90"><div className="mx-auto max-w-7xl px-5 py-20 sm:py-28"><p className="text-xs font-bold uppercase tracking-wider text-sky-400">{page.eyebrow}</p><h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">{page.title}</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">{page.intro}</p>{slug[0] === "rma" && <div className="mt-9"><Button href="/contact">Discuss a repair <ArrowRight className="ml-2 h-4 w-4" /></Button></div>}</div></section><section className="mx-auto max-w-7xl px-5 py-20">{slug[0] === "gallery" ? <GalleryGrid /> : slug[0] === "why-repair" ? <WhyRepair /> : slug[0] === "knowledge-centre" ? (slug.length === 1 ? <KnowledgeIndex /> : <KnowledgeArticle page={page} />) : slug[0] === "contact" ? <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr]"><div><h2 className="text-2xl font-semibold">What to include</h2><p className="mt-3 text-slate-400">The more context you can share, the faster we can understand the technical requirement.</p><ul className="mt-7 space-y-4">{page.sections[0].items.map(item => <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-electric" />{item}</li>)}</ul><div className="mt-10 rounded-lg border border-blue-900/80 bg-panel p-7"><h2 className="text-xl font-semibold">Reach us directly</h2><a href="mailto:nineshardware.lab@gmail.com" className="mt-4 inline-flex items-center gap-2 text-sm text-sky-400 transition hover:text-sky-300"><Mail className="h-4 w-4" />nineshardware.lab@gmail.com</a><a href="tel:+254181246914" className="mt-3 inline-flex items-center gap-2 text-sm text-sky-400 transition hover:text-sky-300"><Phone className="h-4 w-4" />+254 181 246 914</a><a href="https://wa.me/254181246914" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm text-sky-400 transition hover:text-sky-300"><MessageCircle className="h-4 w-4" />WhatsApp: +254 181 246 914</a><p className="mt-3 text-xs leading-6 text-slate-500">For quotations and repair assessments, include your equipment details and our engineers will respond within one business day.</p></div></div><ContactForm /></div> : <div className="grid gap-6 lg:grid-cols-3">{page.sections.map((section, index) => { const Icon = icons[index]; return <article key={section.title} className="rounded-lg border border-blue-900/80 bg-panel p-7"><Icon className="h-9 w-9 text-electric" /><h2 className="mt-12 text-2xl font-semibold">{section.title}</h2>{section.copy && <p className="mt-4 leading-7 text-slate-400">{section.copy}</p>}<ul className="mt-6 space-y-4">{section.items.map(item => <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300"><BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-electric" />{item}</li>)}</ul></article>; })}</div>}</section><section className="border-t border-blue-950 bg-[#05101d]"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-12 md:flex-row md:items-center"><div><p className="text-xl font-semibold">Before you replace it, ask what repair can save you.</p><p className="mt-2 text-sm text-slate-400">Lower cost, less downtime, less e-waste. Talk with NiNes Hardware Lab about your repair or engineering requirement.</p></div><Button href="/contact" variant="outline">Contact us <ArrowRight className="ml-2 h-4 w-4" /></Button></div></section></main><SiteFooter /></>;
}
