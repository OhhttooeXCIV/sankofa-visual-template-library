import React from 'react';

export function WorkflowStepper({ steps = [], current = 0, onStepChange = () => {} }) {
  return <nav aria-label="Progress" className="w-full"><ol className="grid gap-3 sm:grid-cols-3">{steps.map((step, index) => { const complete = index < current; const active = index === current; return <li key={step.id || step.label}><button type="button" onClick={() => onStepChange(index)} aria-current={active ? 'step' : undefined} className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition ${active ? 'border-amber-400/50 bg-amber-400/10' : complete ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'}`}><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold ${complete ? 'bg-emerald-400 text-slate-950' : active ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>{complete ? '✓' : index + 1}</span><span><span className="block text-sm font-semibold text-white">{step.label}</span>{step.description && <span className="mt-1 block text-xs text-slate-400">{step.description}</span>}</span></button></li>; })}</ol></nav>;
}

export default WorkflowStepper;
