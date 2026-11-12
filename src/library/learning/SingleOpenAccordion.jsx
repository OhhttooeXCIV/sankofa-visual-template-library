import React from 'react';

export function SingleOpenAccordion({ items = [], openItemId, onOpenItemChange, className = 'grid gap-3' }) { return <div className={className}>{items.map((item) => { const open = openItemId === item.id; const panelId = `accordion-panel-${item.id}`; return <section key={item.id} className="rounded-2xl border border-slate-800 bg-slate-900/60"><button type="button" aria-expanded={open} aria-controls={panelId} onClick={() => onOpenItemChange(open ? null : item.id)} className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-bold text-white"><span>{item.label}</span><span aria-hidden="true" className="text-amber-400">{open ? '−' : '+'}</span></button>{open && <div id={panelId} className="border-t border-slate-800 px-4 py-3 text-sm text-slate-300">{item.content}</div>}</section>; })}</div>; }

export default SingleOpenAccordion;
