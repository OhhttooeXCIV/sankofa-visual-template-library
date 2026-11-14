-- Seed only non-sensitive reference data. Member identities are provisioned
-- after OAuth and must never be committed to source control.
insert into public.project_links (slug, metadata)
values ('sankofa-platform', '{"source":"library"}'::jsonb)
on conflict (slug) do nothing;
