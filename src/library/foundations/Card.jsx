import React from 'react';

export function Card({ title, eyebrow, footer, tone = 'surface', children, className = '', ...props }) {
  return <article className={`rounded-2xl border p-5 ${tone === 'accent' ? 'border-amber-500/30 bg-amber-500/10' : 'border-slate-800 bg-slate-900/60'} ${className}`} {...props}>{eyebrow && <p className="text-xs font-bold uppercase tracking-widest text-amber-400">{eyebrow}</p>}<h3 className="mt-2 text-lg font-serif font-semibold text-white">{title}</h3><div className="mt-3 text-sm leading-6 text-slate-300">{children}</div>{footer && <footer className="mt-4 border-t border-slate-800 pt-4">{footer}</footer>}</article>;
}

export default Card;
