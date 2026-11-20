import React from 'react';

export function ResponsiveNavigation({ links = [], activeHref, onNavigate, label = 'Primary navigation', inline = false }) {
  return <nav aria-label={label} className={inline ? undefined : 'sankofa-navigation'}>
    <ul className={'grid auto-cols-fr grid-flow-col gap-1' + (inline ? '' : ' md:flex md:flex-col')}>
      {links.map(({ href, label: text, id }) => (
        <li key={href} className="min-w-0">
          <a href={href} aria-current={activeHref === href ? 'page' : undefined}
            onClick={onNavigate ? (event) => onNavigate(event, id ?? href) : undefined}
            className="flex min-h-11 items-center justify-center rounded-lg px-1 py-2 text-center text-xs font-semibold text-slate-300 hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300 aria-[current=page]:bg-amber-500 aria-[current=page]:text-slate-950 md:justify-start md:px-4 md:text-sm">
            {text}
          </a>
        </li>
      ))}
    </ul>
  </nav>;
}
