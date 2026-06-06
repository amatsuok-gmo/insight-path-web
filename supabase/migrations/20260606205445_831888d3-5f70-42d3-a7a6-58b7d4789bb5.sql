create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  goals text not null,
  created_at timestamptz not null default now()
);

grant all on public.inquiries to service_role;

alter table public.inquiries enable row level security;
-- no policies for anon or authenticated: all access must go through service_role server functions