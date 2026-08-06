# NiNes Hardware Lab

Enterprise electronics repair laboratory platform, built with Next.js 15, TypeScript, Tailwind CSS and Supabase.

## Foundation milestone

This initial module includes the engineering-focused public homepage, responsive navigation, secure Supabase email/password authentication, a guarded customer portal entry point, and a PostgreSQL schema with RLS for organizations, profiles, equipment, RMAs, repairs and audit logs.

## Local setup

1. Copy `.env.example` to `.env.local` and add Supabase credentials.
2. Run `npm install`.
3. Apply the SQL migration using the Supabase CLI: `supabase db push`.
4. Run `npm run dev`.

Use `npm run typecheck` and `npm run build` before every merge.

## Deployment

Create a Supabase project, set the auth redirect URL to `https://YOUR_DOMAIN/auth/callback`, apply migrations, then import the repository in Vercel. Add the variables from `.env.example` in Vercel. Keep `SUPABASE_SERVICE_ROLE_KEY` server-only; it must never be prefixed with `NEXT_PUBLIC_`.

Detailed module boundaries and the GitHub milestone plan are in [docs/architecture.md](docs/architecture.md).
