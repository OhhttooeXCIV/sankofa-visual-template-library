import React, { useState } from 'react';
import { Wrench, CheckSquare, Square, ChevronDown, ChevronUp, Save, CheckCircle2 } from 'lucide-react';

/**
 * RepairStudioCard
 * Adapted from sankofa-computelab repair studio.
 * Guided self-assessment drill with student answer entry, criteria checklist, and changed-facts correction reflection box.
 */
export function RepairStudioCard({
  drill = {
    id: 'drill-1',
    topic: 'Financial formula units and periodic payments',
    question: 'A client wishes to calculate a monthly loan repayment over 5 years at 12% per annum. What adjustment must be made to the interest rate and period arguments in the PMT formula?',
    rationale: 'In Excel PMT, rate and nper must use the exact same time unit. Divide annual rate by 12 and multiply total loan years by 12.',
    criteria: [
      'Divided the nominal annual rate by 12 for monthly compounding',
      'Multiplied total years by 12 to calculate total periodic payments (nper)',
      'Identified why mismatched units produce erroneous interest calculations',
    ],
  },
  onSaveCorrection,
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [answer, setAnswer] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [checkedPoints, setCheckedPoints] = useState([]);
  const [correction, setCorrection] = useState('');
  const [saved, setSaved] = useState(false);

  const togglePoint = (idx) => {
    if (checkedPoints.includes(idx)) {
      setCheckedPoints(checkedPoints.filter((i) => i !== idx));
    } else {
      setCheckedPoints([...checkedPoints, idx]);
    }
  };

  const handleSave = () => {
    setSaved(true);
    if (onSaveCorrection) {
      onSaveCorrection({ answer, points: checkedPoints, correction });
    }
  };

  return (
    <article
      className={`rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg overflow-hidden ${className}`}
      aria-label="Repair studio drill"
    >
      <header
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-4 sm:p-5 bg-slate-900/80 cursor-pointer hover:bg-slate-800/60 transition-colors select-none"
      >
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Wrench size={16} />
          </span>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Targeted Repair</span>
            <h3 className="text-sm font-semibold text-white tracking-tight">{drill.topic}</h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {saved && (
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              Recorded
            </span>
          )}
          {isOpen ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
        </div>
      </header>

      {isOpen && (
        <div className="p-5 sm:p-6 space-y-4 border-t border-slate-800/80 text-xs">
          <p className="text-slate-200 font-medium leading-relaxed">{drill.question}</p>

          <div>
            <label className="block text-slate-400 font-medium mb-1">
              Your independent reasoning (draft before revealing criteria):
            </label>
            <textarea
              rows={3}
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                setSaved(false);
              }}
              placeholder="Explain how you would solve this and why..."
              className="w-full p-3 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-400 text-xs"
            />
          </div>

          {!revealed ? (
            <button
              type="button"
              disabled={!answer.trim()}
              onClick={() => setRevealed(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <span>Reveal criteria and reasoning</span>
            </button>
          ) : (
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block mb-1">
                  Model Explanation:
                </span>
                <p className="text-slate-300 leading-relaxed">{drill.rationale}</p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">
                  Self-Check Criteria (check only if demonstrated):
                </span>
                <div className="space-y-1.5">
                  {drill.criteria.map((crit, idx) => {
                    const isChecked = checkedPoints.includes(idx);
                    return (
                      <div
                        key={idx}
                        onClick={() => togglePoint(idx)}
                        className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer transition-colors ${isChecked ? 'bg-amber-500/10 text-white' : 'hover:bg-slate-900 text-slate-400'}`}
                      >
                        {isChecked ? (
                          <CheckSquare size={15} className="text-amber-400 flex-shrink-0 mt-0.5" />
                        ) : (
                          <Square size={15} className="text-slate-600 flex-shrink-0 mt-0.5" />
                        )}
                        <span className="text-xs leading-snug">{crit}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">
                  Changed-facts correction reflection (e.g. quarterly compounding):
                </label>
                <textarea
                  rows={2}
                  value={correction}
                  onChange={(e) => {
                    setCorrection(e.target.value);
                    setSaved(false);
                  }}
                  placeholder="Record what changed and how you verify when conditions shift..."
                  className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-400 text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {checkedPoints.length} of {drill.criteria.length} criteria satisfied
                </span>
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-semibold bg-amber-400 hover:bg-amber-300 text-slate-950 transition-all shadow-sm"
                >
                  {saved ? <CheckCircle2 size={14} /> : <Save size={14} />}
                  <span>{saved ? 'Saved' : 'Record Correction'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
}

export default RepairStudioCard;
