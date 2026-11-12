import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function ApplicationShell({ brand = 'Application', links = [], activeHref, children, footer, className = '' }) {
  const [open, setOpen] = useState(false);
  return <div className={`min-h-screen bg-slate-950 text-slate-100 ${className}`}><a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-amber-400 focus:p-3 focus:text-slate-950">Skip to content</a><header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4"><a href={links[0]?.href || '#main-content'} className="font-serif text-lg font-bold text-white">{brand}</a><button type="button" className="rounded-lg p-2 text-slate-300 md:hidden" aria-expanded={open} aria-controls="library-navigation" onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button><nav id="library-navigation" aria-label="Primary navigation" className={`${open ? 'block' : 'hidden'} absolute left-0 right-0 top-full border-b border-slate-800 bg-slate-950 p-4 md:static md:block md:border-0 md:bg-transparent md:p-0`}><div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-5">{links.map((link) => <a key={link.href} href={link.href} aria-current={activeHref === link.href ? 'page' : undefined} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-900 hover:text-amber-300">{link.label}</a>)}</div></nav></div></header><main id="main-content">{children}</main>{footer}</div>;
}

export default ApplicationShell;
