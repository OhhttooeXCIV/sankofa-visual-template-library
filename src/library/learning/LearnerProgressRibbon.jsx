import React from 'react';

export function LearnerProgressRibbon({ items = [], label = 'Progress' }) { return <section aria-label={label} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"><p className="text-xs font-bold uppercase tracking-widest text-slate-400">{label}</p><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{items.map((item, index) => <div key={`${item.label}-${index}`} className={`rounded-xl p-3 text-sm ${item.state === 'completed' ? 'bg-emerald-500/10 text-emerald-200' : item.state === 'active' ? 'bg-amber-500/10 text-amber-200' : 'bg-slate-950 text-slate-500'}`}><p className="text-[11px] uppercase tracking-widest">Step {index + 1}</p><p className="mt-1 font-semibold">{item.label}</p></div>)}</div></section>; }

export default LearnerProgressRibbon;
