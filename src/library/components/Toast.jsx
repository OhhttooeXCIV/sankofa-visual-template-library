import React, { useEffect, useState } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

/**
 * Toast - Floating notification banner with auto-dismiss and progress bar.
 * 
 * @param {string} id - Unique identifier
 * @param {'success' | 'error' | 'warning' | 'info'} [variant='info'] - Status variant
 * @param {string} title - Heading
 * @param {string} [message] - Descriptive detail
 * @param {number} [duration=4000] - Duration in milliseconds (0 for persistent)
 * @param {Function} [onClose] - Close handler
 * @param {{ label: string, onClick: Function }} [action] - Optional action CTA button
 */
export const Toast = ({
  id,
  variant = 'info',
  title,
  message,
  duration = 4000,
  onClose,
  action,
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!duration || duration <= 0) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        if (onClose) onClose(id);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [id, duration, onClose]);

  const config = {
    success: {
      icon: <CheckCircle className="text-emerald-400 flex-shrink-0" size={20} />,
      barColor: 'bg-emerald-500',
      border: 'border-emerald-500/30',
      bg: 'bg-slate-900/95',
    },
    error: {
      icon: <AlertCircle className="text-rose-400 flex-shrink-0" size={20} />,
      barColor: 'bg-rose-500',
      border: 'border-rose-500/30',
      bg: 'bg-slate-900/95',
    },
    warning: {
      icon: <AlertTriangle className="text-amber-400 flex-shrink-0" size={20} />,
      barColor: 'bg-amber-500',
      border: 'border-amber-500/30',
      bg: 'bg-slate-900/95',
    },
    info: {
      icon: <Info className="text-sky-400 flex-shrink-0" size={20} />,
      barColor: 'bg-sky-500',
      border: 'border-sky-500/30',
      bg: 'bg-slate-900/95',
    },
  }[variant] || config.info;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`relative flex flex-col w-full max-w-sm rounded-xl border ${config.border} ${config.bg} shadow-xl shadow-black/40 backdrop-blur-md overflow-hidden transition-all duration-300 animate-slide-in`}
    >
      <div className="flex items-start gap-3 p-4">
        {config.icon}
        <div className="flex-1 min-w-0 pr-2">
          <h4 className="text-sm font-semibold text-white tracking-tight">{title}</h4>
          {message && <p className="mt-0.5 text-xs text-slate-400 leading-relaxed">{message}</p>}
          {action && (
            <button
              onClick={() => {
                action.onClick?.();
                if (onClose) onClose(id);
              }}
              className="mt-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors underline"
            >
              {action.label}
            </button>
          )}
        </div>
        {onClose && (
          <button
            onClick={() => onClose(id)}
            aria-label="Dismiss toast"
            className="text-slate-400 hover:text-white transition-colors p-1"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {duration > 0 && (
        <div className="w-full bg-slate-800/60 h-1">
          <div
            className={`h-full ${config.barColor} transition-all duration-75`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default Toast;
