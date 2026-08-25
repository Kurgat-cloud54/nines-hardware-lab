import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function signOut() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/auth/login");
}

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");
  const { data: profile } = await supabase.from("profiles").select("full_name, role").eq("id", user.id).single();

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-800 bg-ink/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <Link href="/portal" className="text-sm font-bold uppercase tracking-wider text-sky-400">NiNes Hardware Lab</Link>
          <nav className="flex items-center gap-6 text-sm text-slate-300">
            <Link href="/portal" className="hover:text-white">Dashboard</Link>
            <Link href="/portal/rmas/new" className="hover:text-white">New RMA</Link>
            <span className="hidden text-slate-500 sm:inline">{profile?.full_name || user.email}</span>
            <form action={signOut}><button className="rounded border border-slate-700 px-3 py-1.5 hover:border-slate-500">Sign out</button></form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl p-6">{children}</main>
    </div>
  );
}
