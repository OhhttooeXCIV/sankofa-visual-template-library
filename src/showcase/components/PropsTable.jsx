import React from 'react';

export const PropsTable = ({ props = [] }) => {
  if (!props || props.length === 0) {
    return (
      <div className="p-6 text-center text-slate-500 text-xs">
        No configurable props specified for this component.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
      <table className="w-full text-left text-xs sm:text-sm">
        <thead className="bg-slate-950/80 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400">
          <tr>
            <th className="py-3 px-4 sm:px-6 font-semibold">Prop</th>
            <th className="py-3 px-4 sm:px-6 font-semibold">Type</th>
            <th className="py-3 px-4 sm:px-6 font-semibold">Default</th>
            <th className="py-3 px-4 sm:px-6 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/80">
          {props.map((prop, idx) => (
            <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
              <td className="py-3.5 px-4 sm:px-6 font-mono text-amber-400 font-semibold">
                {prop.name}
                {prop.required && (
                  <span className="ml-1.5 text-[9px] uppercase px-1.5 py-0.5 rounded bg-rose-950/80 text-rose-400 border border-rose-500/30">
                    req
                  </span>
                )}
              </td>
              <td className="py-3.5 px-4 sm:px-6 font-mono text-sky-300 text-xs">
                {prop.type}
              </td>
              <td className="py-3.5 px-4 sm:px-6 font-mono text-slate-400 text-xs">
                {prop.default}
              </td>
              <td className="py-3.5 px-4 sm:px-6 text-slate-300 leading-relaxed text-xs">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropsTable;
