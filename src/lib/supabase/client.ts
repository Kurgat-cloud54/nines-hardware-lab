import { createBrowserClient } from "@supabase/ssr";

const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export function createClient() { return createBrowserClient(projectUrl, publishableKey); }
