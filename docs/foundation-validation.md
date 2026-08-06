# Foundation validation

## Automated checks

Run these commands after dependency installation:

```powershell
npm install
npm run typecheck
npm run build
```

## Acceptance checklist

- The home page responds correctly at mobile, tablet and desktop widths.
- Header links route to their matching marketing pages and the mobile menu closes on selection.
- `/auth/sign-up` sends a Supabase confirmation email and `/auth/callback` exchanges the code for a session.
- `/portal` redirects an anonymous visitor to `/auth/login` and allows an authenticated user through.
- Apply `supabase/migrations/202608060001_foundation.sql` to a fresh Supabase project and confirm RLS prevents one organization from reading another organization's equipment or RMAs.
- Confirm no `SUPABASE_SERVICE_ROLE_KEY` is exposed to browser JavaScript or Vercel client environment variables.
