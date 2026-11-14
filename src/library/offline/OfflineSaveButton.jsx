import React from 'react';

export function OfflineSaveButton({ saved, busy, disabled, onToggle }) {
  return <button type="button" aria-pressed={saved} disabled={busy || disabled} onClick={onToggle}
    className="min-h-11 rounded-xl border border-amber-400/40 px-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/10 disabled:opacity-50">
    {busy ? 'Updating saved copy…' : saved ? 'Remove offline copy' : 'Save for offline'}
  </button>;
}
