import React from 'react';

export function ExportMenu({ formats = ['CSV', 'PDF', 'XLSX'], busy = false, onExport = () => {} }) {
  return <div className="flex flex-wrap items-center gap-2" aria-label="Export options">{formats.map((format) => <button type="button" key={format} disabled={busy} onClick={() => onExport(format)} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-amber-400 hover:text-amber-300 disabled:opacity-50">{busy ? 'Preparing…' : `Export ${format}`}</button>)}</div>;
}

export default ExportMenu;
