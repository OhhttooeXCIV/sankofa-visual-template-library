import React from 'react';
import { ArrowUpRight } from 'lucide-react';

/**
 * InteractiveStatCard
 * Adapted from senatla-ops-internal-automation-solution erp-stat-card.component.ts.
 * Interactive KPI stat card with drilldown trigger, status tone, and accessible keyboard activation.
 */
export function InteractiveStatCard({
  title = 'Active Fleet Assets',
  value = '48 / 50',
  subtext = '2 vehicles scheduled for maintenance',
  badge = '96% Operational',
  tone = 'accent',
  interactive = true,
  drilldownHint = 'Trace →',
  onClick,
  className = '',
}) {
  const toneMap = {
    default: {
      border: 'border-slate-800 hover:border-slate-700',
      valueColor: 'text-white',
      badgeClass: 'bg-slate-800 text-slate-300 border-slate-700',
      hintColor: 'text-slate-400 group-hover:text-white',
    },
    accent: {
      border: 'border-amber-500/30 hover:border-amber-400/80 hover:ring-1 hover:ring-amber-400/40',
      valueColor: 'text-amber-400',
      badgeClass: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      hintColor: 'text-amber-400/90 group-hover:text-amber-300',
    },
    success: {
      border: 'border-emerald-500/30 hover:border-emerald-400/80 hover:ring-1 hover:ring-emerald-400/40',
      valueColor: 'text-emerald-400',
      badgeClass: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      hintColor: 'text-emerald-400/90 group-hover:text-emerald-300',
    },
    warning: {
      border: 'border-amber-500/30 hover:border-amber-400/80 hover:ring-1 hover:ring-amber-400/40',
      valueColor: 'text-amber-300',
      badgeClass: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      hintColor: 'text-amber-400/90 group-hover:text-amber-300',
    },
    danger: {
      border: 'border-rose-500/30 hover:border-rose-400/80 hover:ring-1 hover:ring-rose-400/40',
      valueColor: 'text-rose-400',
      badgeClass: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
      hintColor: 'text-rose-400/90 group-hover:text-rose-300',
    },
  }[tone] || {
    border: 'border-slate-800',
    valueColor: 'text-white',
    badgeClass: 'bg-slate-800 text-slate-300 border-slate-700',
    hintColor: 'text-slate-400',
  };

  const handleKeyDown = (e) => {
    if (interactive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      if (onClick) onClick();
    }
  };

  return (
    <article
      onClick={interactive ? onClick : undefined}
      onKeyDown={handleKeyDown}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `Inspect drill down for ${title}` : undefined}
      className={`group flex min-h-[140px] flex-col justify-between rounded-2xl border bg-slate-900/60 p-5 transition-all select-none ${
        toneMap.border
      } ${
        interactive
          ? 'cursor-pointer hover:shadow-lg hover:shadow-amber-500/5 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-amber-400'
          : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <span>{title}</span>
            {interactive && (
              <ArrowUpRight
                size={14}
                className="text-amber-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              />
            )}
          </p>
          <p className={`mt-2 text-2xl sm:text-3xl font-bold font-mono tracking-tight ${toneMap.valueColor}`}>
            {value}
          </p>
        </div>

        {badge && (
          <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border ${toneMap.badgeClass}`}>
            {badge}
          </span>
        )}
      </div>

      {subtext && (
        <div className="mt-3 flex items-center justify-between gap-2 text-xs text-slate-400 border-t border-slate-800/60 pt-2.5">
          <span className="truncate">{subtext}</span>
          {interactive && (
            <span className={`text-[10px] font-bold shrink-0 ${toneMap.hintColor} group-hover:underline`}>
              {drilldownHint}
            </span>
          )}
        </div>
      )}
    </article>
  );
}

export default InteractiveStatCard;
