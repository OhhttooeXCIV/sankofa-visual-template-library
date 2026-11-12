import React from 'react';

export function FeatureCard({ title, description, badge, icon, className = '' }) {
  return <article className={`rounded-2xl border border-slate-800 bg-slate-900/60 p-5 ${className}`}>{icon && <div className="mb-4 text-amber-400" aria-hidden="true">{icon}</div>}{badge && <span className="inline-flex rounded-full bg-amber-500/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-300">{badge}</span>}<h3 className="mt-3 text-lg font-semibold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{description}</p></article>;
}

export default FeatureCard;
