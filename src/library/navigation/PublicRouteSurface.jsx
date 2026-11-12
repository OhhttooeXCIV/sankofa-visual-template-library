import React, { useState } from 'react';
import { Button } from '../foundations/Button';
import { Card } from '../foundations/Card';
import { ActionFeedback } from '../feedback/ActionFeedback';

export function PublicRouteSurface({ eyebrow, title, description, summary, note, tone = 'accent', actions = [], children }) {
  const [feedback, setFeedback] = useState(null);
  const run = async (action) => { if (action.disabled || action.blocked) return setFeedback({ tone: 'blocked', message: action.blockedMessage || `${action.label} is unavailable.` }); setFeedback({ tone: 'loading', message: `Processing ${action.label.toLowerCase()}…` }); try { await action.onPress?.(); setFeedback({ tone: 'success', message: action.successMessage || `${action.label} completed.` }); } catch { setFeedback({ tone: 'error', message: action.errorMessage || `${action.label} failed.` }); } };
  return <section className="mx-auto max-w-4xl px-4 py-10"><Card eyebrow={eyebrow} title={title} tone={tone}><p>{description}</p>{summary && <p className="mt-3 text-slate-400">{summary}</p>}{note && <p className="mt-3 text-xs text-slate-500">{note}</p>}<div className="mt-6 flex flex-wrap gap-3">{actions.map((action) => action.kind === 'link' ? <a key={action.label} href={action.href} className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950">{action.label}</a> : <Button key={action.label} variant={action.variant} disabled={action.disabled} onClick={() => run(action)}>{action.label}</Button>)}</div><ActionFeedback state={feedback} /></Card>{children && <div className="mt-6">{children}</div>}</section>;
}

export default PublicRouteSurface;
