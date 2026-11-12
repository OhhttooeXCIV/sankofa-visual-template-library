import React from 'react';

export function ActionFeedback({ state }) { if (!state) return null; const alert = state.tone === 'error' || state.tone === 'blocked'; return <div role={alert ? 'alert' : 'status'} aria-live="polite" className={`mt-4 rounded-xl border px-3 py-2 text-sm ${alert ? 'border-rose-500/30 bg-rose-500/10 text-rose-200' : state.tone === 'success' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200' : 'border-amber-500/30 bg-amber-500/10 text-amber-200'}`}>{state.message}</div>; }

export default ActionFeedback;
