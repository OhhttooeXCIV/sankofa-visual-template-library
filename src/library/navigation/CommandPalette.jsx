import React, { useEffect, useState } from 'react';

export function CommandPalette({ items = [], shortcut = 'k', placeholder = 'Search commands…' }) {
  const [open, setOpen] = useState(false); const [query, setQuery] = useState('');
  useEffect(() => { const onKey = (event) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === shortcut) { event.preventDefault(); setOpen((value) => !value); } if (event.key === 'Escape') setOpen(false); }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey); }, [shortcut]);
  const filtered = items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));
  if (!open) return null;
  return <div className="fixed inset-0 z-50 bg-black/60 p-4" role="dialog" aria-modal="true" aria-label="Command palette" onClick={() => setOpen(false)}><div className="mx-auto mt-20 max-w-xl rounded-2xl border border-slate-700 bg-slate-900 p-4 shadow-2xl" onClick={(event) => event.stopPropagation()}><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder={placeholder} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-amber-400" />{filtered.length > 0 ? <div className="mt-3 grid gap-1">{filtered.map((item) => <a key={item.label} href={item.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-slate-800">{item.label}</a>)}</div> : <p className="p-3 text-sm text-slate-500">No matching commands.</p>}</div></div>;
}

export default CommandPalette;
