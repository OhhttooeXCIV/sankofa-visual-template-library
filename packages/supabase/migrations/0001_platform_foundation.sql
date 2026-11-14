-- Portable platform foundation. Authorization is stored in app-owned tables,
-- never in user-editable raw_user_meta_data.
create table if not exists public.platform_members (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('lead','developer','triage','uat','observer')),
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_links (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  github_url text,
  vercel_url text,
  supabase_ref text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.operation_requests (
  id uuid primary key default gen_random_uuid(),
  requested_by uuid not null references auth.users(id),
  operation text not null,
  project_slug text not null,
  status text not null default 'requested' check (status in ('requested','approved','running','succeeded','failed','cancelled')),
  input jsonb not null default '{}'::jsonb,
  result jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.audit_events (
  id bigint generated always as identity primary key,
  actor_id uuid references auth.users(id),
  action text not null,
  resource_type text not null,
  resource_id text,
  metadata jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);

alter table public.platform_members enable row level security;
alter table public.project_links enable row level security;
alter table public.operation_requests enable row level security;
alter table public.audit_events enable row level security;

create or replace function public.sankofa_has_role(allowed_roles text[])
returns boolean language sql stable security invoker set search_path = public
as $$ select exists (
  select 1 from public.platform_members m
  where m.user_id = (select auth.uid()) and m.role = any(allowed_roles)
) $$;

create policy "members can read their own membership" on public.platform_members
  for select to authenticated using (user_id = (select auth.uid()));
create policy "members can read project links" on public.project_links
  for select to authenticated using (public.sankofa_has_role(array['lead','developer','triage','uat','observer']));
create policy "members can create operation requests" on public.operation_requests
  for insert to authenticated with check (
    requested_by = (select auth.uid()) and public.sankofa_has_role(array['lead','developer','triage','uat'])
  );
create policy "requesters can read operation requests" on public.operation_requests
  for select to authenticated using (
    requested_by = (select auth.uid()) or public.sankofa_has_role(array['lead','developer','triage','uat'])
  );
create policy "members can read audit history" on public.audit_events
  for select to authenticated using (public.sankofa_has_role(array['lead','developer','triage','uat','observer']));

revoke all on public.audit_events from anon;
grant select on public.audit_events to authenticated;
