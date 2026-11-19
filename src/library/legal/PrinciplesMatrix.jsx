import React from 'react';

/**
 * PrinciplesMatrix
 * Adapted from sankofa-digital-za WCAG & Architecture decision matrix.
 * Provides an accessible, responsive verification matrix comparing principles, decisions, and release verification checks.
 */
export function PrinciplesMatrix({
  title = 'Design & Engineering Principles Matrix',
  description = 'Clear mapping from foundational standards to operational decisions and verifiable criteria.',
  rows = [
    { principle: 'Accessibility', decision: 'Target WCAG 2.2 AA conformance across all public & authenticated surfaces.', verification: 'Keyboard navigation, visible focus indicators, contrast ratios, and screen reader landmarks.' },
    { principle: 'Trust & Restraint', decision: 'No unverified claims or synthetic proof; all metrics trace to audit logs.', verification: 'Customer quotes, case studies, and performance KPIs trace to primary operational data.' },
    { principle: 'Performance & Bandwidth', decision: 'Visual richness with strict budget constraints; progressive enhancement.', verification: 'Core user journeys remain fully functional on 3G connections and with JavaScript disabled.' },
    { principle: 'Privacy & Governance', decision: 'No tracking cookies; qualified enquiries handled via ephemeral or direct channels.', verification: 'Zero marketing trackers, POPIA-compliant legal disclosures, and explicit retention bounds.' },
  ],
  className = '',
}) {
  return (
    <div className={`space-y-4 ${className}`} aria-label="Engineering principles matrix">
      {(title || description) && (
        <div>
          {title && <h3 className="text-lg font-semibold text-white tracking-tight">{title}</h3>}
          {description && <p className="mt-1 text-xs text-slate-400">{description}</p>}
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950 shadow-inner">
        <table className="w-full min-w-[620px] text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/80">
              <th scope="col" className="p-3.5 sm:p-4 font-semibold uppercase tracking-wider text-amber-400 text-[11px] w-1/4">
                Design Principle
              </th>
              <th scope="col" className="p-3.5 sm:p-4 font-semibold uppercase tracking-wider text-slate-300 text-[11px] w-5/12">
                Architectural Decision
              </th>
              <th scope="col" className="p-3.5 sm:p-4 font-semibold uppercase tracking-wider text-slate-300 text-[11px] w-1/3">
                Release Check
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {rows.map((row, index) => (
              <tr key={index} className="hover:bg-slate-900/40 transition-colors">
                <td className="p-3.5 sm:p-4 font-medium text-white align-top">
                  {row.principle}
                </td>
                <td className="p-3.5 sm:p-4 text-slate-300 align-top leading-relaxed">
                  {row.decision}
                </td>
                <td className="p-3.5 sm:p-4 text-slate-400 align-top leading-relaxed font-mono text-[11px]">
                  {row.verification}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PrinciplesMatrix;
