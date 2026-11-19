import React from 'react';
import { ArrowRight, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

/**
 * WorkspaceActionStrip
 * Adapted from senatla-ops-internal-automation-solution workspace-action-strip.component.ts.
 * Banner guiding operators to the next safe action with tone-coded border and live-region status.
 */
export function WorkspaceActionStrip({
  eyebrow = 'Next Safe Action',
  title = 'Shift attendance records ready for supervisor sign-off',
  detail = 'All 14 active site workers have checked in or recorded excused absence. Ready to sign and submit timesheet.',
  stateLabel = 'Pending Review',
  actionLabel = 'Review and Sign Timesheet',
  actionDisabled = false,
  tone = 'warning',
  onAction,
  className = '',
}) {
  const toneClasses = {
    neutral: {
      border: 'border-slate-700 bg-slate-900/80',
      badge: 'bg-slate-800 text-slate-300 border-slate-700',
      icon: <Info size={16} className="text-slate-400" />,
      btn: 'bg-slate-800 hover:bg-slate-700 text-white',
    },
    success: {
      border: 'border-emerald-500/40 bg-emerald-950/20',
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      icon: <CheckCircle size={16} className="text-emerald-400" />,
      btn: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950',
    },
    warning: {
      border: 'border-amber-500/40 bg-amber-950/20',
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      icon: <AlertTriangle size={16} className="text-amber-400" />,
      btn: 'bg-amber-400 hover:bg-amber-300 text-slate-950',
    },
    danger: {
      border: 'border-red-500/40 bg-red-950/20',
      badge: 'bg-red-500/10 text-red-400 border-red-500/30',
      icon: <AlertCircle size={16} className="text-red-400" />,
      btn: 'bg-red-500 hover:bg-red-400 text-white',
    },
  }[tone] || {
    border: 'border-slate-700 bg-slate-900/80',
    badge: 'bg-slate-800 text-slate-300 border-slate-700',
    icon: <Info size={16} className="text-slate-400" />,
    btn: 'bg-slate-800 hover:bg-slate-700 text-white',
  };

  return (
    <section
      className={`p-4 sm:p-5 rounded-2xl border ${toneClasses.border} shadow-lg transition-all ${className}`}
      aria-label="Workspace next action strip"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {toneClasses.icon}
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {eyebrow}
            </span>
          </div>
          <h2 className="text-sm sm:text-base font-semibold text-white tracking-tight leading-snug">
            {title}
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
            {detail}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${toneClasses.badge}`}
            role="status"
            aria-live="polite"
          >
            {stateLabel}
          </span>

          <button
            type="button"
            disabled={actionDisabled}
            onClick={onAction}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed ${toneClasses.btn}`}
          >
            <span>{actionLabel}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default WorkspaceActionStrip;
