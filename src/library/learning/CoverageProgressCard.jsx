import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * CoverageProgressCard
 * Adapted from sankofa-computelab mastery progress indicator.
 * Visual ring gauge showing completion coverage with count metrics and action links.
 */
export function CoverageProgressCard({
  title = 'Practice Coverage',
  completed = 18,
  total = 42,
  unit = 'tasks completed',
  actions = [
    { label: 'Scores & weak areas', count: null, onClick: () => {} },
    { label: 'Bookmarked questions', count: 5, onClick: () => {} },
  ],
  className = '',
}) {
  const percent = total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;
  const strokeDashoffset = 251.2 - (251.2 * percent) / 100;

  return (
    <article
      className={`p-5 sm:p-6 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg backdrop-blur-sm ${className}`}
      aria-label="Practice coverage summary"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-5 border-b border-slate-800/80">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-slate-800"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-amber-400 transition-all duration-500 ease-out"
                strokeWidth="10"
                strokeDasharray="251.2"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <span className="absolute text-xs font-bold text-white font-mono">{percent}%</span>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-tight">{title}</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              <span className="font-semibold text-slate-200">{completed}</span> of <span className="font-semibold text-slate-200">{total}</span> {unit}
            </p>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Status</span>
          <span className={`text-xs font-semibold ${percent >= 80 ? 'text-emerald-400' : percent >= 40 ? 'text-amber-400' : 'text-slate-400'}`}>
            {percent >= 80 ? 'Well prepared' : percent >= 40 ? 'In progress' : 'Getting started'}
          </span>
        </div>
      </div>

      {actions && actions.length > 0 && (
        <div className="mt-4 space-y-2">
          {actions.map((act, i) => (
            <button
              key={i}
              type="button"
              onClick={act.onClick}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all group"
            >
              <span className="flex items-center gap-2">
                <span>{act.label}</span>
                {act.count !== null && act.count !== undefined && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {act.count}
                  </span>
                )}
              </span>
              <ArrowRight size={14} className="text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
            </button>
          ))}
        </div>
      )}
    </article>
  );
}

export default CoverageProgressCard;
