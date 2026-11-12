import React from 'react';

export function StatusBadge({ status, tone, children }) {
  const variant = tone || ({ success: 'success', active: 'info', warning: 'warning', danger: 'danger', error: 'danger' }[String(status).toLowerCase()] || 'neutral');
  const styles = { success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300', info: 'border-sky-500/30 bg-sky-500/10 text-sky-300', warning: 'border-amber-500/30 bg-amber-500/10 text-amber-300', danger: 'border-rose-500/30 bg-rose-500/10 text-rose-300', neutral: 'border-slate-700 bg-slate-800/60 text-slate-300' };
  return <span className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-semibold ${styles[variant] || styles.neutral}`}><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />{children || status}</span>;
}

export default StatusBadge;
