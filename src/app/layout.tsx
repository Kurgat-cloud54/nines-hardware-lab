import type { Metadata } from "next";
import { CircuitBackground } from "@/components/marketing/circuit-background";
import "./globals.css";
export const metadata: Metadata = { title: { default: "NiNes Hardware Lab", template: "%s | NiNes Hardware Lab" }, description: "Enterprise electronics repair laboratory — cut replacement costs, maximise uptime and keep e-waste out of landfill.", keywords: ["sustainable electronics repair", "e-waste reduction", "circular economy IT hardware", "enterprise equipment repair", "solar inverter repair", "network switch repair", "repair vs replace"], metadataBase: new URL("https://nineshardwarelab.com"), openGraph: { type: "website", siteName: "NiNes Hardware Lab" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><CircuitBackground /><div className="relative z-10">{children}</div></body></html>; }
