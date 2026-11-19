import React from 'react';

/**
 * CapabilityGrid & CapabilityCard
 * Adapted from sankofa-digital-za systems profile and service capabilities.
 * Structured grid showcasing organizational or system strengths with numeric sequencing.
 */
export function CapabilityGrid({
  capabilities = [
    { number: '01', title: 'Systems Analysis', description: 'Connects business objectives with technical architecture, operational workflows, and delivery constraints.', tag: 'Analysis' },
    { number: '02', title: 'Software Engineering', description: 'Builds front-end and full-stack solutions using modern application architecture, Git-based CI/CD, and testing practices.', tag: 'Engineering' },
    { number: '03', title: 'Data & Automation', description: 'Works with data quality, measurement, traceability, and workflows to improve operational consistency.', tag: 'Automation' },
    { number: '04', title: 'Learning Systems', description: 'Designs diagnostic assessments, practice exercises, and structured remediation around specific needs.', tag: 'Education' },
    { number: '05', title: 'Technical Communication', description: 'Makes complex systems accessible through clear requirements, architecture docs, and transparent reasoning.', tag: 'Communication' },
    { number: '06', title: 'Reflective Delivery', description: 'Uses continuous review, smoke tests, and critical evaluation to refine methods and improve subsequent outputs.', tag: 'Quality' },
  ],
  columns = 3,
  className = '',
}) {
  const colClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns] || 'grid-cols-1 md:grid-cols-3';

  return (
    <div className={`grid ${colClass} gap-4 sm:gap-5 ${className}`} aria-label="Capabilities grid">
      {capabilities.map((cap, idx) => (
        <article
          key={cap.number || idx}
          className="flex flex-col justify-between p-5 sm:p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900/80 transition-all hover:border-slate-700"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                {cap.number || `0${idx + 1}`}
              </span>
              {cap.tag && (
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                  {cap.tag}
                </span>
              )}
            </div>
            <h3 className="text-base font-semibold text-white tracking-tight">{cap.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">{cap.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export default CapabilityGrid;
