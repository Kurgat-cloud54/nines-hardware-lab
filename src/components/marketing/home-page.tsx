"use client";

import { motion } from "framer-motion";
import { Activity, ArrowRight, BadgeCheck, Cable, CircuitBoard, Cpu, FlaskConical, Microscope, Network, RadioTower, Recycle, ServerCog, ShieldCheck, Wallet, Wrench, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  ["Solar Inverter Repair", "Grid-tie, hybrid and off-grid inverter diagnostics, board repair and firmware checks", Activity],
  ["Network Switch & Router Repair", "MikroTik, TP-Link, D-Link, Tenda, Cisco, Juniper and more — PoE, management boards and ports", Network],
  ["DVR & NVR Repair", "CCTV recorder mainboard repair, HDD interface and power-stage restoration", ServerCog],
  ["Power & BMS Boards", "AC/DC supplies, PoE injectors, server PSUs and lithium BMS board repair", Wrench],
  ["Boards & Modules", "PCB diagnostics, rework and module repair for all electronic assemblies", CircuitBoard],
  ["Failure Analysis", "Root-cause investigation with documented evidence and prevention advice", FlaskConical],
] as const;

const differentiators = [
  ["Cut replacement costs", "Restore critical hardware at a fraction of the price of buying new.", Wallet],
  ["Maximum uptime", "Fast, controlled turnaround keeps your network, systems and solar power running.", Zap],
  ["The green choice", "Every repair extends equipment life and diverts e-waste from landfill.", Recycle],
  ["Enterprise expertise", "Component-level repair, diagnostics and QA for critical infrastructure.", ServerCog],
] as const;

const capabilities = [
  ["Component-Level Repair", "Board-level diagnosis and rework", CircuitBoard],
  ["Advanced Diagnostics", "Testing, measurements and analysis", Microscope],
  ["Enterprise Hardware", "Critical networking and telecom systems", Network],
  ["Engineering Expertise", "Evidence-led repair and verification", FlaskConical],
] as const;

const equipmentGroups = [
  ["Solar Inverters & Energy", "Grid-tie · Hybrid · Off-grid inverters · Charge controllers · Lithium BMS boards", Cpu],
  ["Network Switches & Routers", "MikroTik · TP-Link · D-Link · Tenda · Cisco · Juniper · Huawei · Aruba · HPE · Ubiquiti", Network],
  ["CCTV & Surveillance", "DVRs · NVRs · Camera boards · PoE supplies · Hikvision · Dahua · Uniview", ServerCog],
  ["Power & Electronic Assemblies", "AC/DC power supplies · Server PSUs · Control boards · Interface boards · RF modules", Cable],
] as const;

export function HomePage() {
  return <main>
    <section className="hero-glow grid-bg relative overflow-hidden border-b border-blue-950">
      <div className="mx-auto grid min-h-[640px] max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.05fr_.95fr]">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>
          <p className="mb-5 text-xs font-bold uppercase tracking-wider text-sky-400">Enterprise electronics repair laboratory</p>
          <h1 className="max-w-xl text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl">Repair First.<br />Keep Your Systems <span className="text-electric">Running.</span></h1>
          <p className="mt-7 max-w-lg leading-7 text-slate-300">Component-level repair of enterprise networking, telecom, solar and industrial electronics — saving businesses the cost of replacement, preventing downtime and keeping e-waste out of landfill.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Button href="/contact">Talk to an engineer <ArrowRight className="ml-2 h-4 w-4" /></Button><Button href="/why-repair" variant="outline">Repair vs. replace</Button></div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .7 }} className="lab-visual relative mx-auto flex aspect-[4/3] w-full max-w-xl items-end overflow-hidden rounded-xl border border-blue-500/30 shadow-glow">
          <div className="relative z-10 w-full bg-gradient-to-t from-[#030b15] via-[#030b15]/85 to-transparent p-8 sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[.22em] text-blue-300">Inside the laboratory</p>
            <p className="mt-3 max-w-sm text-3xl font-semibold leading-tight">Diagnose precisely.<br />Restore confidently.</p>
            <ul className="mt-5 space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2"><CircuitBoard className="h-4 w-4 text-electric" /> Board-level diagnostics &amp; BGA rework</li>
              <li className="flex items-center gap-2"><Activity className="h-4 w-4 text-electric" /> Load, thermal &amp; burn-in testing</li>
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-electric" /> ESD-safe benches, documented QA</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="mx-auto -mt-8 grid max-w-7xl gap-px overflow-hidden rounded-lg border border-blue-900/70 bg-blue-900/60 md:grid-cols-4">{differentiators.map(([title, text, Icon]) => <div key={title} className="bg-[#061221] p-6"><Icon className="mb-5 h-8 w-8 text-electric" /><h2 className="font-semibold">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-400">{text}</p></div>)}</section>

    <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[.85fr_1.15fr]">
      <div><p className="text-xs font-bold uppercase tracking-wider text-sky-400">Why NiNes</p><h2 className="mt-3 text-4xl font-semibold leading-tight">We Repair What<br />Others Replace.</h2><p className="mt-6 max-w-md leading-7 text-slate-300">When an expensive enterprise board fails outside warranty, replacement is not always the only option. NiNes Hardware Lab performs component-level diagnosis, repair and validation to restore hardware, reduce equipment replacement costs and extend the life of your investment — the sustainable alternative to buying new.</p><div className="mt-8"><Button href="/why-repair">Repair vs. replace <ArrowRight className="ml-2 h-4 w-4" /></Button></div></div>
      <div className="grid gap-4 sm:grid-cols-2">{capabilities.map(([title, text, Icon]) => <article key={title} className="rounded-lg border border-blue-900/80 bg-panel p-6"><Icon className="h-8 w-8 text-electric" /><h3 className="mt-12 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{text}</p></article>)}</div>
    </section>

    <section className="border-y border-blue-950 bg-[#05101d]"><div className="mx-auto max-w-7xl px-5 py-20"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-wider text-sky-400">What we repair</p><h2 className="mt-2 text-4xl font-semibold">Built for enterprise infrastructure.</h2><p className="mt-5 leading-7 text-slate-400">We support critical networking, telecommunications, power and electronic systems from leading manufacturers.</p></div><div className="mt-10 grid gap-5 md:grid-cols-2">{equipmentGroups.map(([title, brands, Icon]) => <article key={title} className="rounded-lg border border-blue-900/80 bg-[#061221] p-6"><Icon className="h-8 w-8 text-electric" /><h3 className="mt-8 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-300">{brands}</p></article>)}</div></div></section>

    <section className="mx-auto max-w-7xl px-5 py-24"><div className="flex flex-wrap items-end justify-between gap-6"><div><p className="text-xs font-bold uppercase tracking-wider text-sky-400">Engineering services</p><h2 className="mt-2 text-4xl font-semibold">Our Repair Services</h2></div><Button href="/services" variant="outline">View all services</Button></div><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{services.map(([title, text, Icon], index) => <motion.article initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }} key={title} className="rounded-lg border border-blue-900/80 bg-panel p-6 hover:border-blue-500/70"><Icon className="h-9 w-9 text-electric" /><h3 className="mt-14 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{text}</p></motion.article>)}</div></section>

    <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-2"><div><p className="text-xs font-bold uppercase tracking-wider text-sky-400">Why choose NiNes Hardware Lab</p><h2 className="mt-3 text-4xl font-semibold leading-tight">Engineering precision.<br />Trusted results.</h2><p className="mt-6 max-w-md leading-7 text-slate-400">We combine skilled engineering, advanced tools and a structured repair process to deliver dependable, cost-effective solutions for critical hardware.</p><div className="mt-8"><Button href="/about">Learn more about us</Button></div></div><div className="rounded-lg border border-blue-900 bg-panel p-7"><h3 className="text-xl font-semibold">Laboratory standards, every repair</h3>{["Documented intake and chain of custody", "Board-level diagnostics and controlled rework", "Functional testing, burn-in and QA", "Clear repair reports and warranty records"].map(item => <div key={item} className="mt-5 flex gap-3 text-slate-300"><BadgeCheck className="h-5 w-5 shrink-0 text-electric" />{item}</div>)}</div></section>
    <section className="border-t border-blue-950 py-10"><div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-5 px-5 text-sm text-slate-400"><span>ESD-safe laboratory</span><span>Secure handling & data protection</span><span>Warranty on all repairs</span><span>Global quality standards</span></div></section>
  </main>;
}
