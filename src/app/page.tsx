import { HomePage } from "@/components/marketing/home-page";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { contact } from "@/lib/contact";

const businessSchema = { "@context": "https://schema.org", "@type": "LocalBusiness", name: "NiNes Hardware Lab", description: "Component-level electronics repair laboratory for solar inverters, networking, CCTV and power electronics.", url: "https://nineshardwarelab.com", logo: "https://nineshardwarelab.com/images/nines-logo.png", telephone: contact.phoneTel, email: contact.email, address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" }, areaServed: "KE" };

export default function Page() { return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} /><SiteHeader/><HomePage/><SiteFooter /></>; }
