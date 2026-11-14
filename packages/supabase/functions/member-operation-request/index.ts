// Protected adapter entrypoint. Deploy with Supabase Edge Functions and keep
// privileged GitHub/Vercel credentials in the workflow environment only.
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

Deno.serve(async (request) => {
  if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);
  const authorization = request.headers.get('authorization');
  if (!authorization?.startsWith('Bearer ')) return json({ error: 'missing_session' }, 401);
  const payload = await request.json().catch(() => null);
  if (!payload?.operation || !payload?.project_slug) return json({ error: 'operation_and_project_slug_required' }, 400);
  // The application should insert an operation_requests row through RLS here.
  // A protected workflow consumes approved requests and writes the result.
  return json({ accepted: true, status: 'requested', operation: payload.operation, project_slug: payload.project_slug }, 202);
});
