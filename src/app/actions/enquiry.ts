"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const enquirySchema = z.object({
  full_name: z.string().trim().min(2).max(160),
  company: z.string().trim().max(200).optional().default(""),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().max(40).optional().default(""),
  subject: z.string().trim().min(2).max(200),
  message: z.string().trim().min(10).max(5000),
  website: z.string().optional().default(""), // honeypot — must stay empty
});

// Naive in-memory rate limit: 3 submissions per email/IP per 10-minute window, per server instance.
const RATE_LIMIT = 3;
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= RATE_LIMIT) return true;
  recent.push(now);
  hits.set(key, recent);
  return false;
}

export type EnquiryState = { error?: string };

export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const parsed = enquirySchema.safeParse({
    full_name: formData.get("full_name"),
    company: formData.get("company"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    website: formData.get("website"),
  });

  if (!parsed.success) return { error: "Please complete the required fields — the message needs at least 10 characters." };
  if (parsed.data.website) return { error: undefined }; // honeypot filled: silently drop

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (rateLimited(user?.id ?? parsed.data.email.toLowerCase())) {
    return { error: "Too many enquiries submitted recently. Please wait a few minutes and try again." };
  }

  const { error } = await supabase.from("inquiries").insert({
    full_name: parsed.data.full_name,
    company: parsed.data.company,
    email: parsed.data.email,
    phone: parsed.data.phone,
    subject: parsed.data.subject,
    message: parsed.data.message,
  });

  if (error) return { error: "We could not send your enquiry at this time. Please try again shortly, or email nineshardware.lab@gmail.com directly." };
  return {};
}
