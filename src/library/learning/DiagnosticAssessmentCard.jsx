import React, { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, AlertTriangle, ArrowRight } from 'lucide-react';

/**
 * DiagnosticAssessmentCard
 * Adapted from sankofa-computelab diagnostic assessment flow.
 * Formative question card with confidence calibration and rationale reveals.
 */
export function DiagnosticAssessmentCard({
  question = {
    id: 'diag-1',
    prompt: 'When formatting financial statements in Excel, which action ensures formula recalculation when interest rates change dynamically?',
    options: [
      'Hardcode the calculated rate value directly inside the PMT formula string',
      'Reference an external input cell containing the interest rate and ensure consistent annual/monthly periods',
      'Format the cell background in yellow and re-enter values manually',
      'Merge the principal and rate cells to combine data values',
    ],
    correct: 1,
    rationale: 'Referencing a distinct input cell keeps the formula dynamic, separating data assumptions from calculation logic and preventing recalculation bugs.',
  },
  onComplete,
  className = '',
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [confidence, setConfidence] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedOption === null || !confidence) return;
    setSubmitted(true);
    if (onComplete) {
      onComplete({
        answer: selectedOption,
        confidence,
        isCorrect: selectedOption === question.correct,
      });
    }
  };

  const isCorrect = selectedOption === question.correct;
  const isOverconfident = !isCorrect && confidence === 'certain';

  return (
    <article
      className={`p-5 sm:p-6 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg ${className}`}
      aria-label="Diagnostic question"
    >
      <div className="flex items-start gap-3 mb-4">
        <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <HelpCircle size={18} />
        </span>
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Diagnostic Check</span>
          <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight mt-0.5 leading-snug">
            {question.prompt}
          </h3>
        </div>
      </div>

      <div className="space-y-2 mb-5">
        {question.options.map((opt, idx) => {
          const isSelected = selectedOption === idx;
          let optionBorder = 'border-slate-800 bg-slate-950/60 text-slate-300';
          if (submitted) {
            if (idx === question.correct) {
              optionBorder = 'border-emerald-500/50 bg-emerald-950/30 text-emerald-200';
            } else if (isSelected) {
              optionBorder = 'border-red-500/50 bg-red-950/30 text-red-200';
            }
          } else if (isSelected) {
            optionBorder = 'border-amber-400 bg-amber-500/10 text-white';
          }

          return (
            <label
              key={idx}
              className={`flex items-start gap-3 p-3 sm:p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${optionBorder}`}
            >
              <input
                type="radio"
                name={`diag-${question.id}`}
                disabled={submitted}
                checked={isSelected}
                onChange={() => setSelectedOption(idx)}
                className="mt-0.5 text-amber-500 focus:ring-amber-400"
              />
              <span className="leading-relaxed">{opt}</span>
            </label>
          );
        })}
      </div>

      {!submitted ? (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-800/80">
          <label className="flex items-center gap-2 text-xs text-slate-300">
            <span className="text-slate-400 font-medium">Confidence:</span>
            <select
              value={confidence}
              onChange={(e) => setConfidence(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-xs"
            >
              <option value="">Select confidence</option>
              <option value="unsure">Unsure (Guessing)</option>
              <option value="likely">Likely (Reasoned)</option>
              <option value="certain">Certain (Confirmed)</option>
            </select>
          </label>

          <button
            type="button"
            disabled={selectedOption === null || !confidence}
            onClick={handleSubmit}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 transition-all shadow-sm"
          >
            <span>Submit & Reveal</span>
            <ArrowRight size={14} />
          </button>
        </div>
      ) : (
        <div className="pt-4 border-t border-slate-800/80 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold">
            {isCorrect ? (
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle size={15} /> Correct
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-red-400">
                <XCircle size={15} /> Review Needed
              </span>
            )}
            <span className="text-slate-500">·</span>
            <span className="text-slate-400">Confidence was: <strong className="text-slate-200 capitalize">{confidence}</strong></span>
          </div>

          {isOverconfident && (
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-300 text-xs flex items-start gap-2">
              <AlertTriangle size={15} className="flex-shrink-0 mt-0.5" />
              <span>Overconfident Error: You marked this answer "Certain", but missed the core concept. Review the rationale below.</span>
            </div>
          )}

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
            <span className="font-bold text-white text-[11px] uppercase tracking-wider block">Rationale:</span>
            <p className="leading-relaxed">{question.rationale}</p>
          </div>
        </div>
      )}
    </article>
  );
}

export default DiagnosticAssessmentCard;
