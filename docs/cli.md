# CLI reference

The CLI defaults to dry-run behavior. External mutations require an explicit `--apply` path and scoped credentials.

```text
sankofa create <project-name> --dry-run --json
sankofa doctor --json
sankofa validate --json
sankofa sync --dry-run
sankofa project:configure --dry-run
sankofa supabase:bootstrap --dry-run
sankofa github:configure --dry-run
sankofa vercel:configure --dry-run
```

`create <project-name> --apply` writes the React/Vite starter into a sibling directory. The external GitHub, Supabase, and Vercel adapters remain intentionally explicit so a local command cannot silently create teams, projects, boards, secrets, or deployments.
