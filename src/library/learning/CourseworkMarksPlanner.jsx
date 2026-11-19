import React, { useState, useMemo } from 'react';
import { Calculator, CheckCircle2, AlertCircle } from 'lucide-react';

/**
 * CourseworkMarksPlanner
 * Adapted from sankofa-computelab N5 coursework marks planner.
 * Calculates weighted score progress across assessments and projects target exam marks needed.
 */
export function CourseworkMarksPlanner({
  title = 'Coursework Planning Estimate',
  description = 'Standard TVET model: Assignment 20%, Test 1 30%, Internal Exam 50%, with a 40% admission planning target.',
  targetPercent = 40,
  tasks = [
    { id: 'assign', label: 'Assignment', max: 100, weight: 20 },
    { id: 'test1', label: 'Test 1', max: 50, weight: 30 },
    { id: 'exam', label: 'Internal Exam', max: 100, weight: 50 },
  ],
  initialValues = ['', '', ''],
  onValuesChange,
  className = '',
}) {
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (idx, val) => {
    const updated = [...values];
    updated[idx] = val;
    setValues(updated);
    if (onValuesChange) onValuesChange(updated);
  };

  const plan = useMemo(() => {
    let secured = 0;
    let recordedWeight = 0;
    let isValid = true;

    tasks.forEach((t, i) => {
      const raw = values[i];
      if (raw !== '' && raw !== undefined) {
        const num = parseFloat(raw);
        if (isNaN(num) || num < 0 || num > t.max) {
          isValid = false;
        } else {
          secured += (num / t.max) * t.weight;
          recordedWeight += t.weight;
        }
      }
    });

    const remainingWeight = 100 - recordedWeight;
    const needed = targetPercent - secured;
    const examTask = tasks.find((t) => t.id === 'exam') || tasks[tasks.length - 1];
    const neededOnExam =
      remainingWeight > 0 && examTask
        ? (needed / (examTask.weight / 100)) * (examTask.max / 100)
        : null;

    return {
      secured,
      recordedWeight,
      remainingWeight,
      needed,
      neededOnExam,
      isValid,
      complete: recordedWeight === 100,
      meetsTarget: secured >= targetPercent,
    };
  }, [tasks, values, targetPercent]);

  return (
    <section
      className={`p-5 sm:p-6 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg ${className}`}
      aria-label="Coursework marks planner"
    >
      <div className="flex items-center gap-2 mb-2">
        <Calculator size={16} className="text-amber-400" />
        <h3 className="text-base font-semibold text-white tracking-tight">{title}</h3>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed mb-5">{description}</p>

      {/* Task input grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        {tasks.map((task, idx) => (
          <label key={task.id} className="block text-xs">
            <span className="text-slate-300 font-medium block mb-1">
              {task.label} <span className="text-slate-400">/ {task.max}</span> ({task.weight}%)
            </span>
            <input
              type="number"
              min="0"
              max={task.max}
              step="0.5"
              placeholder="Pending"
              value={values[idx] || ''}
              onChange={(e) => handleInputChange(idx, e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-xs"
            />
          </label>
        ))}
      </div>

      {!plan.isValid ? (
        <div role="alert" className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
          <AlertCircle size={15} className="flex-shrink-0" />
          <span>Please enter valid scores within each assessment task's maximum marks.</span>
        </div>
      ) : (
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/70 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Secured Weighted Points:</span>
            <span className="text-sm font-bold text-amber-400 font-mono">
              {plan.secured.toFixed(1)} / 100
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${plan.meetsTarget ? 'bg-emerald-400' : 'bg-amber-400'}`}
              style={{ width: `${Math.min(100, plan.secured)}%` }}
            />
          </div>

          <div className="pt-2 text-xs text-slate-300 flex items-start gap-2">
            {plan.meetsTarget ? (
              <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle size={15} className="text-amber-400 flex-shrink-0 mt-0.5" />
            )}
            <div>
              {plan.complete ? (
                <span>{plan.meetsTarget ? `Target reached (${plan.secured.toFixed(1)}%). Ready for examination admission.` : 'Total falls below admission target. Contact lecturer for remediation.'}</span>
              ) : (
                <span>
                  {plan.neededOnExam !== null && plan.neededOnExam <= 100
                    ? `Need at least ${Math.max(0, Math.ceil(plan.neededOnExam))}/100 on remaining tasks to reach the ${targetPercent}% target.`
                    : `${plan.remainingWeight}% weighting remains unrecorded.`}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default CourseworkMarksPlanner;
