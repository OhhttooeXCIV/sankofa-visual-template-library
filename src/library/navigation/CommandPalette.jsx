import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDialogFocus } from '../components/useDialogFocus';

export function CommandPalette({ items = [], shortcut = 'k', placeholder = 'Search commands…', triggerLabel }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const dialog = useDialogFocus(open, () => setOpen(false));
  useEffect(() => {
    function shortcutHandler(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === shortcut) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    }
    window.addEventListener('keydown', shortcutHandler);
    return () => window.removeEventListener('keydown', shortcutHandler);
  }, [shortcut]);
  const filtered = items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));

  return <>
    {triggerLabel && <button type="button" aria-haspopup="dialog" onClick={() => setOpen(true)}
      className="min-h-11 rounded-lg border border-slate-700 px-3 text-sm">{triggerLabel}</button>}
    {open && createPortal(
      <div className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/60 p-4 sm:pt-16"
        onClick={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
        <div ref={dialog} tabIndex={-1} role="dialog" aria-modal="true" aria-label="Command palette"
          className="mx-auto grid max-h-[calc(100dvh-2rem)] max-w-xl grid-rows-[auto_auto_minmax(0,1fr)] gap-2 rounded-2xl border border-slate-700 bg-slate-900 p-4 shadow-2xl sm:max-h-[calc(100dvh-5rem)]">
          <button type="button" className="min-h-11 justify-self-end px-2 text-sm text-slate-300" onClick={() => setOpen(false)}>Close commands</button>
          <input data-dialog-focus aria-label="Search commands" value={query} onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder} className="min-h-11 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 text-base text-white" />
          <div className="overflow-y-auto overscroll-contain">
            {filtered.length ? filtered.map((item) => <a key={item.label} href={item.href}
              onClick={() => setOpen(false)} className="flex min-h-11 items-center rounded-lg px-3 text-sm text-slate-200 hover:bg-slate-800">{item.label}</a>) :
              <p role="status" className="p-3 text-sm text-slate-300">No matching commands.</p>}
          </div>
        </div>
      </div>, document.body
    )}
  </>;
}

export default CommandPalette;
