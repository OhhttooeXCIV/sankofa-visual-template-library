import React from 'react';

export function ExpandableSection({ title, description, children, defaultOpen = false }) { return <details open={defaultOpen} className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-5"><summary className="cursor-pointer list-none text-lg font-semibold text-white"><span>{title}</span><span className="float-right text-amber-400 group-open:rotate-180">⌄</span>{description && <p className="mt-2 text-sm font-normal text-slate-400">{description}</p>}</summary><div className="mt-4 text-sm leading-6 text-slate-300">{children}</div></details>; }

export default ExpandableSection;
