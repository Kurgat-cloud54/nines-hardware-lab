# Architecture — Foundation milestone

NiNes uses a Next.js 15 App Router application deployed to Vercel, with Supabase supplying Auth, PostgreSQL, storage and Row Level Security. Public marketing routes remain statically optimisable; protected customer and staff workspaces use server-side Supabase session validation.

## Bounded modules

- `marketing`: brand site, services and lead-generation pages.
- `identity`: Supabase Auth, profile records and role checks.
- `rma`: requests, workflow events, equipment and attachments.
- `repair`: diagnosis, parts, measurements, testing and reports.
- `operations`: inventory, invoicing, staff analytics and administration.

The foundation migration establishes the ownership chain `organization → equipment → RMA → repair`. Customer access is constrained to their organization, while staff access uses a database-side `is_staff()` function. Future writes must be validated on the server and use these RLS policies rather than relying on UI controls.

## Milestone roadmap

1. **Foundation** — architecture, branding, navigation, auth and schema (this branch).
2. **Customer RMA** — organization onboarding, RMA intake, uploads and portal tracking.
3. **Repair Operations** — engineer dashboard, diagnostics, parts, QA and reports.
4. **Business Operations** — inventory, billing, notifications, analytics and admin.
5. **Hardening & launch** — SEO, accessibility, security review, monitoring and Vercel production rollout.

Each milestone should be built on a `feature/<name>` branch, reviewed, tested and merged through GitHub before the next starts.
