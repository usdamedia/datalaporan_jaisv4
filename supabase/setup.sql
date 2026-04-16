create extension if not exists pgcrypto;

create table if not exists public.form_drafts (
  id uuid primary key default gen_random_uuid(),
  dept_key text not null unique,
  dept_name text not null,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.form_drafts enable row level security;

drop policy if exists "anon can read drafts" on public.form_drafts;
create policy "anon can read drafts"
on public.form_drafts
for select
to anon
using (true);

drop policy if exists "anon can insert drafts" on public.form_drafts;
create policy "anon can insert drafts"
on public.form_drafts
for insert
to anon
with check (true);

drop policy if exists "anon can update drafts" on public.form_drafts;
create policy "anon can update drafts"
on public.form_drafts
for update
to anon
using (true)
with check (true);

alter publication supabase_realtime add table public.form_drafts;
