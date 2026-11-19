import React from 'react';

/**
 * OperationalMetricStrip
 * Adapted from senatla-ops-internal-automation-solution timesheet-summary.component.ts.
 * High-density multi-cell operational metric bar with tone-coded colored metrics.
 */
export function OperationalMetricStrip({
  metrics = [
    { label: 'Completion', value: '92%', tone: 'accent' },
    { label: 'Total Workers', value: 24, tone: 'neutral' },
    { label: 'Present', value: 22, tone: 'success' },
    { label: 'Absent', value: 1, tone: 'danger' },
    { label: 'Pending', value: 1, tone: 'neutral' },
    { label: 'Flagged', value: 0, tone: 'warning' },
  ],
  compact = false,
  className = '',
}) {
  const toneColors = {
    accent: 'text-amber-400',
    success: 'text-emerald-400',
    danger: 'text-rose-400',
    warning: 'text-amber-300',
    neutral: 'text-slate-100',
  };

  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px rounded-xl border border-slate-800 bg-slate-800 overflow-hidden shadow-md ${className}`}
      aria-label="Operational metrics summary strip"
    >
      {metrics.map((metric, idx) => {
        const colorClass = toneColors[metric.tone] || toneColors.neutral;
        return (
          <div
            key={idx}
            className={`flex flex-col justify-center bg-slate-950 ${compact ? 'p-2.5 sm:p-3' : 'p-3.5 sm:p-4'}`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate">
              {metric.label}
            </span>
            <strong className={`mt-1 font-mono font-bold leading-tight ${colorClass} ${compact ? 'text-base sm:text-lg' : 'text-xl sm:text-2xl'}`}>
              {metric.value}
            </strong>
          </div>
        );
      })}
    </div>
  );
}

export default OperationalMetricStrip;
