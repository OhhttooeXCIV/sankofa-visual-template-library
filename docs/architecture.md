# Architecture

The platform has five versioned package boundaries: UI, contracts, Supabase, configuration, and the project generator. Generated applications remain independent repositories with one Supabase project each.

## Service candidates

Reusable candidates are authentication/session policy, organization roles, audit events, offline outbox contracts, files/exports, notifications, OCR quality evaluation, project health, content retrieval, and operational readiness. Each service is exposed as a typed contract plus an adapter; no product repository is required to adopt all of them.

## Regions

Supabase defaults to `sa-east-1` (São Paulo), the closest supported primary region for South African users. Vercel uses its global CDN for static assets and does not assume Cape Town compute on the Free plan.
