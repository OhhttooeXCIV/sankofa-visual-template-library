import React from 'react';

export function SiteFooter({ brand = 'Sankofa', groups = [], legalLinks = [], children }) {
  return <footer className="border-t border-slate-800 bg-slate-950 px-4 py-10 text-slate-300"><div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.4fr_2fr]">{children || <div><p className="font-serif text-lg font-bold text-white">{brand}</p><p className="mt-2 max-w-sm text-sm text-slate-400">A reusable footer with configurable navigation and policy links.</p></div>}<div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">{groups.map((group) => <div key={group.label}><h3 className="text-xs font-bold uppercase tracking-widest text-amber-400">{group.label}</h3><div className="mt-3 grid gap-2">{group.links.map((link) => <a key={link.href} href={link.href} className="text-sm hover:text-white">{link.label}</a>)}</div></div>)}</div></div>{legalLinks.length > 0 && <nav aria-label="Legal links" className="mx-auto mt-8 flex max-w-7xl flex-wrap gap-4 border-t border-slate-800 pt-5 text-xs text-slate-500">{legalLinks.map((link) => <a key={link.href} href={link.href} className="hover:text-amber-300">{link.label}</a>)}</nav>}</footer>;
}

export default SiteFooter;
