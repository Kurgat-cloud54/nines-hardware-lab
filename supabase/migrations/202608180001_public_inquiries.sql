-- Public marketing-site enquiries. Apply after the foundation migration.
create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 2 and 160),
  company text not null default '',
  email text not null check (char_length(email) <= 320),
  phone text not null default '',
  subject text not null check (char_length(subject) between 2 and 200),
  message text not null check (char_length(message) between 10 and 5000),
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now()
);
alter table public.inquiries enable row level security;
create policy "public can submit enquiries" on public.inquiries for insert to anon, authenticated with check (true);
create policy "staff can read enquiries" on public.inquiries for select using (public.is_staff());
create policy "staff can manage enquiries" on public.inquiries for update using (public.is_staff()) with check (public.is_staff());
