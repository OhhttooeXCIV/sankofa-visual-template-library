import React from 'react';
import { ResponsiveNavigation } from './ResponsiveNavigation.jsx';

export function ApplicationShell({ brand = 'Application', links = [], activeHref, children, footer, className = '', onNavigate, contentId = 'main-content' }) {
  return <div className={`min-h-screen bg-slate-950 text-slate-100 sankofa-motion-scope ${links.length ? 'sankofa-nav-clearance' : ''} ${className}`}>
    <a href={'#' + contentId} className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:bg-amber-400 focus:p-3 focus:text-slate-950">Skip to content</a>
    <header className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <a href={links[0]?.href || '#' + contentId} className="font-serif text-lg font-bold text-white">{brand}</a>
      </div>
    </header>
    <div className={`mx-auto max-w-7xl ${links.length ? 'md:grid md:grid-cols-[11rem_minmax(0,1fr)] md:gap-4 md:px-4' : ''}`}>
      {links.length > 0 && <div className="md:pt-4"><ResponsiveNavigation links={links} activeHref={activeHref} onNavigate={onNavigate} /></div>}
      <main id={contentId} tabIndex={-1} className="min-w-0">{children}</main>
    </div>
    {footer}
  </div>;
}

export default ApplicationShell;
