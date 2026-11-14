const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const memberAuthConfig = Object.freeze({
  configured: Boolean(supabaseUrl && publishableKey),
  supabaseUrl,
  publishableKey
});

export function getStoredSession() {
  try { return JSON.parse(window.sessionStorage.getItem('sankofa.member.session') || 'null'); }
  catch { return null; }
}

export function startGitHubLogin() {
  if (!memberAuthConfig.configured) return { ok: false, error: 'Member access is not configured for this deployment.' };
  const redirectTo = `${window.location.origin}${window.location.pathname}`;
  window.location.assign(`${supabaseUrl}/auth/v1/authorize?provider=github&redirect_to=${encodeURIComponent(redirectTo)}`);
  return { ok: true };
}

export async function resolveMemberSession() {
  if (!memberAuthConfig.configured) return null;
  const params = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  const accessToken = params.get('access_token');
  if (!accessToken) return getStoredSession();
  const response = await fetch(`${supabaseUrl}/auth/v1/user`, { headers: { apikey: publishableKey, Authorization: `Bearer ${accessToken}` } });
  if (!response.ok) throw new Error('Unable to validate the member session.');
  const user = await response.json();
  const session = { accessToken, user };
  window.sessionStorage.setItem('sankofa.member.session', JSON.stringify(session));
  window.history.replaceState({}, document.title, window.location.pathname);
  return session;
}

export async function loadMemberRole(session) {
  if (!session?.accessToken || !memberAuthConfig.configured) return null;
  const response = await fetch(`${supabaseUrl}/rest/v1/platform_members?select=role,display_name&user_id=eq.${encodeURIComponent(session.user.id)}&limit=1`, { headers: { apikey: publishableKey, Authorization: `Bearer ${session.accessToken}` } });
  if (!response.ok) return null;
  const rows = await response.json();
  return rows[0] || null;
}

export function signOutMember() {
  window.sessionStorage.removeItem('sankofa.member.session');
  window.location.reload();
}
