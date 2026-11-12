import React from 'react';

export function InlineFeedback({ tone = 'info', title, message }) {
  const styles = { info: 'border-sky-500/30 bg-sky-500/10 text-sky-200', success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200', warning: 'border-amber-500/30 bg-amber-500/10 text-amber-200', error: 'border-rose-500/30 bg-rose-500/10 text-rose-200' };
  return <div role={tone === 'error' ? 'alert' : 'status'} className={`rounded-2xl border p-4 ${styles[tone] || styles.info}`}><p className="text-sm font-semibold">{title}</p>{message && <p className="mt-1 text-xs opacity-80">{message}</p>}</div>;
}

export default InlineFeedback;
