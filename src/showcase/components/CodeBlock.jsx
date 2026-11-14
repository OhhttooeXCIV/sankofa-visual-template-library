import React from 'react';
import { Check, Copy } from 'lucide-react';
import { useCopyCode } from './useCopyCode';

export const CodeBlock = ({ code, language = 'javascript', title }) => {
  const { status, copy } = useCopyCode();
  const copied = status === 'Copied!';

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0b0f19] shadow-2xl">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          {title && <span className="font-mono text-slate-300 ml-2">{title}</span>}
        </div>

        <button
          onClick={() => copy(code)}
          className="flex min-h-11 items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors text-[11px] font-medium"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Text Area */}
      <p role="status" className={status && !copied ? 'px-4 pt-2 text-sm text-slate-300' : 'sr-only'}>{status}</p>
      <div role="region" aria-label="Selectable source code" tabIndex={0} className="sankofa-scroll-region p-4 sm:p-5 max-h-[600px] font-mono text-xs sm:text-sm text-slate-300 leading-relaxed">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
