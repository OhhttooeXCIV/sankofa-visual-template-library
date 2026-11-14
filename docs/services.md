# Reusable service catalog

The service layer is contract-first. Applications can adopt an adapter without importing product-specific workflows.

| Candidate | Contract boundary | Generic platform status |
| --- | --- | --- |
| Authentication and session policy | OAuth callback, session validation, sign-out | Member boundary scaffolded |
| Organization roles | `platform_members` role resolution | Supabase migration included |
| Audit events | actor, action, resource, metadata, timestamp | Contract included |
| Offline outbox | idempotency key, retry state, last error | Contract candidate |
| Files and exports | export request, status, download metadata | Contract candidate |
| Notifications | status event and delivery preference | Contract candidate |
| OCR quality | confidence, page, issue, recommendation | Senatla-derived candidate |
| Project health | build, deployment, migration, readiness checks | Generator candidate |
| Content catalog | filter, pagination, stable item contract | UI-compatible candidate |
| Operational readiness | dependency and environment checks | CLI doctor candidate |

Sensitive Umk emergency dispatch, encrypted vault, duress, survivor-profile, and covert-camouflage services remain isolated adapters and are not exported from public packages.
