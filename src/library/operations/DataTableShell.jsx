
import React, { useMemo, useState } from 'react';

export function DataTableShell({ columns = [], rows = [], emptyLabel = 'No records found', selectable = false, onRowSelect = () => {} }) {
  const [sort, setSort] = useState(null);
  const [selected, setSelected] = useState(null);
  const sortedRows = useMemo(() => sort ? [...rows].sort((a, b) => String(a[sort]).localeCompare(String(b[sort]), undefined, { numeric: true })) : rows, [rows, sort]);
  return <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60"><div className="overflow-x-auto"><table className="min-w-full text-left text-sm"><thead className="bg-slate-950/70 text-xs uppercase tracking-wide text-slate-400"><tr>{selectable && <th className="px-4 py-3" />} {columns.map((column) => <th key={column.key} className="cursor-pointer px-4 py-3" onClick={() => column.sortable !== false && setSort(column.key)}>{column.label}</th>)}</tr></thead><tbody className="divide-y divide-slate-800">{sortedRows.length ? sortedRows.map((row, index) => <tr key={row.id || index} className={`transition hover:bg-slate-800/50 ${selected === index ? 'bg-amber-400/10' : ''}`} onClick={() => { setSelected(index); onRowSelect(row); }}>{selectable && <td className="px-4 py-3"><input type="checkbox" checked={selected === index} onChange={() => {}} aria-label={`Select row ${index + 1}`} /></td>}{columns.map((column) => <td key={column.key} className="px-4 py-3 text-slate-200">{column.render ? column.render(row[column.key], row) : row[column.key]}</td>)}</tr>) : <tr><td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-10 text-center text-slate-500">{emptyLabel}</td></tr>}</tbody></table></div></div>;
}

export default DataTableShell;
