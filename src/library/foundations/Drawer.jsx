import React, { useId } from 'react';
import { createPortal } from 'react-dom';
import { useDialogFocus } from '../components/useDialogFocus';

export function Drawer({ isOpen, onClose, title = 'Details', children, footer }) {
  const titleId = useId();
  const ref = useDialogFocus(isOpen, onClose);
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70"
      onClick={(event) => { if (event.target === event.currentTarget) onClose?.(); }}>
      <section ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby={titleId}
        className="sankofa-motion-scope grid h-dvh w-full max-w-lg grid-rows-[auto_minmax(0,1fr)_auto] bg-slate-950 text-slate-100 shadow-2xl">
        <header className="flex items-center justify-between gap-2 border-b border-slate-800 px-4 py-2">
          <h2 id={titleId} className="min-w-0 break-words font-semibold">{title}</h2>
          {onClose && <button type="button" onClick={onClose} className="min-h-11 shrink-0 rounded-lg px-3 text-sm">Close drawer</button>}
        </header>
        <div className="min-h-0 overflow-y-auto overscroll-contain p-4">{children}</div>
        {footer && <footer className="sankofa-drawer-footer border-t border-slate-800 p-4">{footer}</footer>}
      </section>
    </div>, document.body
  );
}
