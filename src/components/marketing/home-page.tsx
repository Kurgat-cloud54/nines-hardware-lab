"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, ArrowRight, Cable, ClipboardCheck, Cpu, Factory, Mail, MapPin, MessageCircle, Network, PackageCheck, Phone, ServerCog, ShieldCheck, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contact } from "@/lib/contact";

const trust = [
  ["Nairobi-based lab", "Drop off at the lab or courier your unit from anywhere in Kenya.", MapPin],
  ["Quote before any work", "We inspect, find the fault and quote. Nothing is repaired without your approval.", ClipboardCheck],
  ["Tested before return", "Functional testing under load, with burn-in where appropriate.", Activity],
  ["Warranty on every repair", "Warranty terms are set per equipment type and agreed with you upfront.", ShieldCheck],
] as const;

const equipment = [
  ["Solar inverters & energy", "Grid-tie, hybrid and off-grid inverters · Charge controllers · Lithium BMS boards · Growatt, Victron, Deye, Sunsynk", Cpu],
  ["Network switches & routers", "MikroTik · TP-Link · D-Link · Cisco · Juniper · Huawei · Ubiquiti — PoE ports, management boards, power stages", Network],
  ["CCTV & surveillance", "Hikvision, Dahua and Uniview DVRs/NVRs · Camera boards · Surveillance PoE supplies", ServerCog],
  ["Power supplies", "AC/DC supplies · Server PSUs · PoE injectors · Power-stage rework", Cable],
  ["Industrial & RF electronics", "Drive and control boards · Interface boards · RF modules and communication assemblies", Factory],
] as const;

const steps = [
  ["Send it in", "WhatsApp us a photo and the model number, then drop off or courier the unit to our Nairobi lab.", PackageCheck],
  ["Diagnose & quote", "We document its condition, find the fault at component level and send you a quotation.", ClipboardCheck],
  ["Repair, test & return", "Approved repairs are carried out, tested under load and returned with a repair report.", Wrench],
] as const;

const bench = [
  ["inverter-03.jpeg", "Hybrid inverter opened for board-level diagnosis"],
  ["inverter-18.jpeg", "Inverter power board on the bench"],
  ["inverter-21.jpeg", "Control and power stage under repair"],
  ["inverter-28.jpeg", "Power supply board under inspection"],
] as const;

const customers = ["Internet service providers", "Telecom operators", "IT integrators & data centres", "Banks & financial institutions", "Universities", "Government ICT departments", "Manufacturers & industry"];

const eyebrow = "text-xs font-bold uppercase tracking-wider text-sky-400";

export function HomePage() {
  return <main>
    <section className="hero-glow grid-bg relative overflow-hidden border-b border-blue-950">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:py-20 lg:grid-cols-[1.1fr_.9fr]">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>
          <p className={`mb-5 flex items-center gap-2 ${eyebrow}`}><MapPin className="h-4 w-4" />Electronics repair laboratory · {contact.location}</p>
          <h1 className="max-w-xl text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl">Repair First.<br />Keep Your Systems <span className="text-electric">Running.</span></h1>
          <p className="mt-7 max-w-lg leading-7 text-slate-300">Component-level repair of solar inverters, network equipment, CCTV recorders and power electronics in Nairobi — for less than the cost of replacement, in days rather than weeks of waiting for imported stock.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-sm bg-electric px-5 text-xs font-bold uppercase tracking-wide text-white shadow-glow transition hover:bg-blue-500"><MessageCircle className="mr-2 h-4 w-4" />WhatsApp a photo of the fault</a>
            <Button href="/contact" variant="outline">Request a repair assessment</Button>
          </div>
          <Link href="/why-repair" className="mt-6 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-sky-400">Not sure whether to repair or replace? <ArrowRight className="h-4 w-4" /></Link>
        </motion.div>
        <motion.figure initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .7 }} className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-xl border border-blue-500/30 shadow-glow">
          <Image src="/images/gallery/inverter-19.jpeg" alt="Taking measurements with a multimeter on the NiNes bench" fill priority sizes="(max-width: 1024px) 90vw, 450px" className="object-cover" />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#030b15] via-[#030b15]/80 to-transparent p-6 pt-16"><p className="text-xs font-bold uppercase tracking-[.22em] text-blue-300">From our bench</p><p className="mt-2 text-lg font-semibold">Diagnosed, measured and verified before it leaves the lab.</p></figcaption>
        </motion.figure>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-5 sm:-mt-8"><div className="grid gap-px overflow-hidden rounded-lg border border-blue-900/70 bg-blue-900/60 grid-cols-2 lg:grid-cols-4">{trust.map(([title, text, Icon]) => <div key={title} className="bg-[#061221] p-4 sm:p-6"><Icon className="mb-3 h-6 w-6 text-electric sm:mb-4 sm:h-7 sm:w-7" /><h2 className="text-sm font-semibold sm:text-base">{title}</h2><p className="mt-2 text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">{text}</p></div>)}</div></section>

    <section className="mx-auto max-w-7xl px-5 py-20">
      <div className="flex flex-wrap items-end justify-between gap-6"><div className="max-w-2xl"><p className={eyebrow}>What we repair</p><h2 className="mt-2 text-4xl font-semibold">If it has a board, we can diagnose it.</h2></div><Button href="/equipment" variant="outline">All equipment</Button></div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{equipment.map(([title, text, Icon], index) => <motion.div key={title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }}><Link href="/services" className="flex h-full flex-col rounded-lg border border-blue-900/80 bg-panel p-6 transition hover:border-blue-500/70"><Icon className="h-8 w-8 text-electric" /><h3 className="mt-8 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{text}</p></Link></motion.div>)}
        <div className="flex flex-col justify-center rounded-lg border border-dashed border-blue-900/80 p-6"><h3 className="text-xl font-semibold">Something else?</h3><p className="mt-3 text-sm leading-6 text-slate-400">Send us the make, model and fault. We also offer failure analysis and repair-vs-replace assessments.</p><Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300">Ask an engineer <ArrowRight className="h-4 w-4" /></Link></div>
      </div>
    </section>

    <section className="border-y border-blue-950 bg-[#05101d]"><div className="mx-auto max-w-7xl px-5 py-20">
      <div className="flex flex-wrap items-end justify-between gap-6"><div><p className={eyebrow}>How it works</p><h2 className="mt-2 text-4xl font-semibold">Three steps from fault to fixed.</h2></div><Button href="/repair-process" variant="outline">Our repair process</Button></div>
      <ol className="mt-10 grid gap-5 md:grid-cols-3">{steps.map(([title, text, Icon], index) => <li key={title} className="rounded-lg border border-blue-900/80 bg-[#061221] p-6"><div className="flex items-center justify-between"><span className="text-sm font-bold text-sky-400">0{index + 1}</span><Icon className="h-7 w-7 text-electric" /></div><h3 className="mt-8 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{text}</p></li>)}</ol>
    </div></section>

    <section className="mx-auto max-w-7xl px-5 py-20">
      <div className="flex flex-wrap items-end justify-between gap-6"><div className="max-w-2xl"><p className={eyebrow}>From the bench</p><h2 className="mt-2 text-4xl font-semibold">Real repairs, done in our lab.</h2></div><Button href="/gallery" variant="outline">View the gallery</Button></div>
      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">{bench.map(([file, alt]) => <Link key={file} href="/gallery" className="relative aspect-square overflow-hidden rounded-lg border border-blue-900/80 bg-panel"><Image src={`/images/gallery/${file}`} alt={alt} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover transition duration-300 hover:scale-105" /></Link>)}</div>
    </section>

    <section className="border-t border-blue-950"><div className="mx-auto max-w-7xl px-5 py-14"><p className={eyebrow}>Who we work with</p><div className="mt-5 flex flex-wrap gap-3">{customers.map(item => <span key={item} className="rounded-full border border-blue-900/80 bg-panel px-4 py-2 text-sm text-slate-300">{item}</span>)}</div></div></section>

    <section className="border-t border-blue-950 bg-[#05101d]"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
      <div><h2 className="text-4xl font-semibold leading-tight">Before you replace it,<br />ask what repair can save you.</h2><p className="mt-5 max-w-lg leading-7 text-slate-400">Send a photo of the unit and its model number. We respond to repair enquiries within one business day.</p></div>
      <div className="rounded-lg border border-blue-900/80 bg-panel p-7">
        <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-center gap-2 rounded-sm bg-[#25D366] px-5 text-sm font-bold text-[#03210f] transition hover:bg-[#2fe06f]"><MessageCircle className="h-5 w-5" />WhatsApp {contact.phoneDisplay}</a>
        <div className="mt-6 space-y-3 text-sm">
          <a href={`tel:${contact.phoneTel}`} className="flex items-center gap-3 text-slate-300 hover:text-sky-400"><Phone className="h-4 w-4 text-electric" />Call {contact.phoneDisplay}</a>
          <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-slate-300 hover:text-sky-400"><Mail className="h-4 w-4 text-electric" />{contact.email}</a>
          <p className="flex items-center gap-3 text-slate-300"><MapPin className="h-4 w-4 text-electric" />{contact.location}</p>
        </div>
      </div>
    </div></section>
  </main>;
}
