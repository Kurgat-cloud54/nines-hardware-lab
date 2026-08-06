import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: { default: "NiNes Hardware Lab", template: "%s | NiNes Hardware Lab" }, description: "Enterprise electronics repair laboratory for critical infrastructure.", metadataBase: new URL("https://nineshardwarelab.com"), openGraph: { type: "website", siteName: "NiNes Hardware Lab" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
