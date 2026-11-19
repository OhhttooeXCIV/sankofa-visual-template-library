import React, { useEffect, useState } from 'react';
import { loadMemberRole, memberAuthConfig, resolveMemberSession, signOutMember, startGitHubLogin } from './memberAuth';

export default function MemberPortal() {
  const [session, setSession] = useState(null);
  const [role, setRole] = useState(null);
  const [status, setStatus] = useState('Checking member access…');

  useEffect(() => {
    let active = true;
    resolveMemberSession().then(async (nextSession) => {
      if (!active) return;
      setSession(nextSession);
      if (!nextSession) return setStatus(memberAuthConfig.configured ? 'Sign in with GitHub to continue.' : 'Member access is unavailable until Supabase Auth is configured.');
      const nextRole = await loadMemberRole(nextSession);
      if (!active) return;
      setRole(nextRole);
      setStatus(nextRole ? 'Approved member' : 'Signed in, but no approved Sankofa role was found.');
    }).catch(() => active && setStatus('The member session could not be validated.'));
    return () => { active = false; };
  }, []);

  return <section aria-labelledby="member-heading" className="mx-auto w-full max-w-5xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-400">Member documentation</p>
    <h2 id="member-heading" className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Private implementation notes and project operations.</h2>
    <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">The member area is role-gated by Supabase RLS. Browser actions create auditable requests; protected GitHub Actions perform privileged changes.</p>
    {!session ? <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/70 p-6"><p className="text-sm text-slate-300">{status}</p><button type="button" onClick={startGitHubLogin} disabled={!memberAuthConfig.configured} className="mt-5 rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-bold text-slate-950 disabled:cursor-not-allowed disabled:opacity-40">Continue with GitHub</button></div> : <div className="mt-10 grid gap-4 md:grid-cols-2"><article className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-6"><p className="text-xs uppercase tracking-widest text-emerald-300">{status}</p><h3 className="mt-3 text-xl font-semibold text-white">{role?.display_name || session.user?.email || 'Member'}</h3><p className="mt-2 text-sm text-slate-300">Role: {role?.role || 'pending approval'}</p><button type="button" onClick={signOutMember} className="mt-5 text-sm font-semibold text-amber-300">Sign out</button></article><article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6"><h3 className="text-lg font-semibold text-white">Available member areas</h3><ul className="mt-3 space-y-2 text-sm leading-7 text-slate-400"><li>Compatibility matrices</li><li>Project health and deployment links</li><li>Release and Supabase runbooks</li><li>Component and service promotion status</li></ul></article></div>}
  </section>;
}
