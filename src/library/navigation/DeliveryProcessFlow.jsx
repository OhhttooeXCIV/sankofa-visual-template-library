import React from 'react';

/**
 * DeliveryProcessFlow
 * Adapted from sankofa-digital-za delivery pipeline pattern.
 * Displays sequential delivery stages with automated numbers, description, and key deliverables.
 */
export function DeliveryProcessFlow({
  steps = [
    { number: '01', title: 'Discover', description: 'Current-state map, user needs, operating conditions, and risk boundaries.', deliverables: ['Context map', 'User interviews', 'Risk register'] },
    { number: '02', title: 'Define', description: 'Scope, user journeys, data architecture, and clear acceptance evidence.', deliverables: ['Journey maps', 'System design', 'Deliverable checklist'] },
    { number: '03', title: 'Build', description: 'Working increments, peer reviews, automated verification, and tested behavior.', deliverables: ['Iterative releases', 'Automated tests', 'Review notes'] },
    { number: '04', title: 'Launch', description: 'Runbooks, handover sessions, known limitations, and next iteration backlog.', deliverables: ['Handover guides', 'Runbook', 'Backlog priorities'] },
  ],
  className = '',
}) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`} aria-label="Delivery process workflow">
      {steps.map((step, idx) => (
        <article
          key={step.number || idx}
          className="relative flex flex-col justify-between p-5 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-md backdrop-blur-sm transition-all hover:border-amber-500/40 hover:bg-slate-900/80"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                {step.number || `0${idx + 1}`}
              </span>
              <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">Stage {idx + 1}</span>
            </div>
            <h3 className="text-base font-semibold text-white tracking-tight">{step.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">{step.description}</p>
          </div>

          {step.deliverables && step.deliverables.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-800/80">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1.5">Deliverables</span>
              <ul className="space-y-1">
                {step.deliverables.map((item, dIdx) => (
                  <li key={dIdx} className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-amber-400" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

export default DeliveryProcessFlow;
