import { MessageCircle } from "lucide-react";
import { contact } from "@/lib/contact";

export function WhatsAppButton() { return <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat with NiNes Hardware Lab on WhatsApp" className="fixed bottom-5 right-5 z-50 inline-flex h-14 items-center gap-2 rounded-full bg-[#25D366] px-4 text-sm font-semibold text-[#03210f] shadow-lg shadow-black/40 transition hover:bg-[#2fe06f]"><MessageCircle className="h-6 w-6" /><span className="hidden sm:inline">WhatsApp us</span></a>; }
