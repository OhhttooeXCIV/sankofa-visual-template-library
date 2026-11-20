import React from 'react';
import { followRoute } from '../navigation';

export default function Sidebar({ components = [], componentHref, onSelectComponent }) {
  const grouped = components.reduce((groups, item) => {
    if (!groups.has(item.category)) groups.set(item.category, []);
    groups.get(item.category).push(item);
    return groups;
  }, new Map());
  return <div className="grid min-w-0 gap-5 p-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Component results">
    {[...grouped].map(([category, items]) => <section key={category}>
      <h2 className="mb-2 text-sm font-semibold text-amber-300">{category}</h2>
      <ul className="space-y-1">
        {items.map((item) => <li key={item.id}>
          <a id={'catalogue-' + item.id} href={componentHref(item.id)}
            onClick={(event) => followRoute(event, () => onSelectComponent(item.id))}
            className="flex min-h-11 items-center rounded-lg border border-slate-800 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800">
            {item.name}
          </a>
        </li>)}
      </ul>
    </section>)}
  </div>;
}
