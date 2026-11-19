# Member view implementation

The member view is a fail-closed React surface. It shows a GitHub sign-in action only when `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` are configured. After OAuth, the browser validates the session through Supabase Auth and reads the caller's role from `platform_members` through RLS.

An authenticated user without a row in `platform_members` is not an approved member. The browser never performs organization, repository, project-board, secret, or deployment mutations directly. Those operations are represented as requests and handled by protected workflows.
