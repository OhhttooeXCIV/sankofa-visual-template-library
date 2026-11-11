import React, { useEffect, useId, useState } from 'react';

function useControllable(value, defaultValue) {
  const [internal, setInternal] = useState(defaultValue);
  return [value === undefined ? internal : value, setInternal];
}

export function Drawer({ open, defaultOpen = false, onOpenChange, title, description, side = 'right', children, className = '' }) {
  const [isOpen, setIsOpen] = useControllable(open, defaultOpen);
  const titleId = useId();
  const close = () => { setIsOpen(false); onOpenChange?.(false); };
  useEffect(() => { if (!isOpen) return undefined; const onKey = (event) => event.key === 'Escape' && close(); document.addEventListener('keydown', onKey); return () => document.removeEventListener('keydown', onKey); }, [isOpen]);
  if (!isOpen) return null;
  const sideClass = side === 'left' ? 'left-0 border-r' : 'right-0 border-l';
  return <div className="fixed inset-0 z-50" role="presentation">
    <button aria-label="Close drawer" className="absolute inset-0 h-full w-full bg-slate-950/60" onClick={close} />
    <section role="dialog" aria-modal="true" aria-labelledby={titleId} className={`absolute inset-y-0 ${sideClass} flex w-full max-w-md flex-col border-slate-800 bg-slate-900 text-white shadow-2xl ${className}`}>
      <header className="flex items-start justify-between gap-4 border-b border-slate-800 p-5"><div><h2 id={titleId} className="text-lg font-semibold">{title}</h2>{description && <p className="mt-1 text-sm text-slate-400">{description}</p>}</div><button type="button" onClick={close} aria-label="Close drawer" className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white">×</button></header>
      <div className="min-h-0 flex-1 overflow-y-auto p-5">{children}</div>
    </section>
  </div>;
}

export function BottomSheet({ open, defaultOpen = false, onOpenChange, title, description, children, className = '' }) {
  const [isOpen, setIsOpen] = useControllable(open, defaultOpen);
  const titleId = useId();
  const close = () => { setIsOpen(false); onOpenChange?.(false); };
  useEffect(() => { if (!isOpen) return undefined; const onKey = (event) => event.key === 'Escape' && close(); document.addEventListener('keydown', onKey); return () => document.removeEventListener('keydown', onKey); }, [isOpen]);
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50" role="presentation"><button aria-label="Close bottom sheet" className="absolute inset-0 bg-slate-950/60" onClick={close} /><section role="dialog" aria-modal="true" aria-labelledby={titleId} className={`absolute inset-x-0 bottom-0 max-h-[90vh] rounded-t-2xl border border-b-0 border-slate-800 bg-slate-900 text-white shadow-2xl ${className}`}><header className="flex items-start justify-between gap-4 border-b border-slate-800 p-5"><div><h2 id={titleId} className="text-lg font-semibold">{title}</h2>{description && <p className="mt-1 text-sm text-slate-400">{description}</p>}</div><button type="button" onClick={close} aria-label="Close bottom sheet" className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white">×</button></header><div className="max-h-[calc(90vh-5rem)] overflow-y-auto p-5">{children}</div></section></div>;
}

