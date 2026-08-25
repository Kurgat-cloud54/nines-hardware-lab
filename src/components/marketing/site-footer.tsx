import Link from "next/link";
import { Mail } from "lucide-react";

const navigation = [
  ["About us", "/about"], ["Services", "/services"], ["Equipment", "/equipment"], ["Industries", "/industries"],
  ["Repair process", "/repair-process"], ["Failure analysis", "/failure-analysis"], ["Knowledge centre", "/knowledge-centre"], ["Careers", "/careers"],
] as const;

const legal = [["Privacy Policy", "/privacy"], ["Terms of Service", "/terms"]] as const;

export function SiteFooter() {
  return <footer className="border-t border-blue-950 bg-[#020812]"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.3fr_2fr]"><div><p className="text-xl font-semibold">NiNes Hardware Lab</p><p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">Enterprise electronics repair laboratory for networking, telecom, power and industrial equipment.</p><a href="mailto:nineshardware.lab@gmail.com" className="mt-4 inline-flex items-center gap-2 text-sm text-sky-400 transition hover:text-sky-300"><Mail className="h-4 w-4" />nineshardware.lab@gmail.com</a></div><div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">{navigation.map(([label, href]) => <Link key={href} href={href} className="text-sm text-slate-300 transition hover:text-sky-400">{label}</Link>)}<Link href="/contact" className="text-sm text-sky-400">Contact us</Link></div></div><div className="border-t border-blue-950"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-5 py-5 text-xs text-slate-500 sm:flex-row"><span>© {new Date().getFullYear()} NiNes Hardware Lab. All rights reserved.</span><span className="flex gap-4">{legal.map(([label, href]) => <Link key={href} href={href} className="transition hover:text-sky-400">{label}</Link>)}<span>Engineering reliable outcomes for critical hardware.</span></span></div></div></footer>;
}
