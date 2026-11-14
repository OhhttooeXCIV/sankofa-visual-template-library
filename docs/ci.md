# CI workflow reference

Reusable workflows live in `.github/workflows`. Callers should invoke quality on pull requests, security on pull requests and main, Supabase checks when database files change, hosted smoke on preview or release candidates, and release only from a protected environment.

All workflows use least-privilege permissions, cancel stale pull-request runs, cache `npm`, and keep heavyweight hosted/native suites off the default path.
