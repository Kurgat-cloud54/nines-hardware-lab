import Link from "next/link";
import { cn } from "@/lib/utils";
type Props = { href: string; children: React.ReactNode; variant?: "primary" | "outline"; className?: string };
export function Button({ href, children, variant = "primary", className }: Props) { return <Link href={href} className={cn("inline-flex min-h-11 items-center justify-center rounded-sm px-5 text-xs font-bold uppercase tracking-wide transition", variant === "primary" ? "bg-electric text-white shadow-glow hover:bg-blue-500" : "border border-blue-500/70 bg-transparent text-white hover:bg-blue-500/10", className)}>{children}</Link>; }
