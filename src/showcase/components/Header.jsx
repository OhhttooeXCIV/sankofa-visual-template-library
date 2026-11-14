import React from 'react';
import { Layers } from 'lucide-react';

export default function Header({ componentCount }) {
  return <header className="border-b border-slate-800 bg-slate-950">
    <div className="mx-auto flex min-h-16 max-w-7xl items-center gap-3 px-4 py-2 sm:px-6">
      <Layers className="shrink-0 text-amber-400" aria-hidden="true" size={24} />
      <div>
        <p className="font-serif text-lg font-bold text-white">Sankofa Template Library</p>
        <p className="text-xs text-slate-400">{componentCount} reusable components and examples</p>
      </div>
    </div>
  </header>;
}
