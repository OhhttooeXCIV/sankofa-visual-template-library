import React, { useState } from 'react';
import LivePreviewContainer from './LivePreviewContainer';
import CodeBlock from './CodeBlock';
import PropsTable from './PropsTable';
import { BookOpen, Code2, Eye, Sliders, Check, Copy, ArrowRight, Lightbulb } from 'lucide-react';

export const ComponentViewer = ({ component }) => {
  const [activeTab, setActiveTab] = useState('preview');
  const [codeType, setCodeType] = useState('export'); // 'export' or 'main'
  const [copiedNotification, setCopiedNotification] = useState(false);

  if (!component) {
    return (
      <div className="flex-1 p-12 text-center text-slate-500">
        Select a component from the left sidebar to explore.
      </div>
    );
  }

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  const tabs = [
    { id: 'preview', label: 'Live Preview', icon: <Eye size={15} /> },
    { id: 'explanation', label: 'Overview & Use Cases', icon: <BookOpen size={15} /> },
    { id: 'props', label: 'Props & Customization', icon: <Sliders size={15} /> },
    { id: 'export', label: 'Export Code (Zero Friction)', icon: <Code2 size={15} /> },
  ];

  return (
    <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Component Header Card */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                {component.category}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                #{component.id}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              {component.name}
            </h1>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
              {component.tagline}
            </p>
          </div>

          {/* Quick Copy Action */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopyCode(component.exportCode)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md shadow-amber-500/20 active:scale-95"
            >
              {copiedNotification ? (
                <>
                  <Check size={14} />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy Component</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tab Switcher Navigation */}
        <div className="flex items-center gap-2 mt-8 pt-6 border-t border-slate-800/80 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Panels */}
      {activeTab === 'preview' && (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-semibold text-white">Interactive Playground</h3>
              <p className="text-xs text-slate-400">Experience live interactions, state changes, and responsive behaviors.</p>
            </div>
          </div>
          <LivePreviewContainer componentId={component.id} />
        </div>
      )}

      {activeTab === 'explanation' && (
        <div className="space-y-6">
          {/* Architectural Overview */}
          <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/40 shadow-xl space-y-4">
            <h3 className="text-lg font-serif font-semibold text-white flex items-center gap-2">
              <BookOpen size={18} className="text-amber-400" />
              <span>Architectural Explanation & Philosophy</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {component.explanation}
            </p>

            <div className="mt-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80">
              <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
                Developer Usage Guidance
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                {component.usage}
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 shadow-xl">
              <h3 className="text-sm font-semibold text-white">Source & portability</h3>
              <dl className="mt-4 space-y-3 text-xs">
                <div><dt className="text-slate-500">Source project</dt><dd className="mt-1 text-slate-200">{component.sourceProject}</dd></div>
                <div><dt className="text-slate-500">Source path</dt><dd className="mt-1 break-all font-mono text-slate-300">{component.sourcePath}</dd></div>
                <div><dt className="text-slate-500">Adaptation</dt><dd className="mt-1 leading-relaxed text-slate-300">{component.adaptationNotes}</dd></div>
                <div><dt className="text-slate-500">Dependencies</dt><dd className="mt-1 text-slate-300">{component.dependencies?.join(', ') || 'None documented'}</dd></div>
              </dl>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 shadow-xl">
              <h3 className="text-sm font-semibold text-white">Quality contract</h3>
              <dl className="mt-4 space-y-3 text-xs">
                <div><dt className="text-slate-500">Responsive behavior</dt><dd className="mt-1 leading-relaxed text-slate-300">{component.responsiveBehavior}</dd></div>
                <div><dt className="text-slate-500">Accessibility</dt><dd className="mt-1 leading-relaxed text-slate-300">{component.accessibility}</dd></div>
                <div><dt className="text-slate-500">Preview controls</dt><dd className="mt-1 text-slate-300">{component.previewControls?.join(', ') || 'Default preview'}</dd></div>
                <div><dt className="text-slate-500">Test path</dt><dd className="mt-1 break-all font-mono text-slate-300">{component.testPath}</dd></div>
              </dl>
            </div>
          </div>

          {/* Real-World Use Cases */}
          <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/40 shadow-xl space-y-4">
            <h3 className="text-lg font-serif font-semibold text-white flex items-center gap-2">
              <Lightbulb size={18} className="text-amber-400" />
              <span>Real-World Use Cases</span>
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {component.useCases.map((uc, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/60"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold flex items-center justify-center border border-amber-500/30">
                    {idx + 1}
                  </span>
                  <span className="text-xs text-slate-300 leading-relaxed">{uc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'props' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/40 shadow-xl space-y-4">
            <h3 className="text-lg font-serif font-semibold text-white flex items-center gap-2">
              <Sliders size={18} className="text-amber-400" />
              <span>Configurable Props API</span>
            </h3>
            <PropsTable props={component.props} />
          </div>

          {component.otherOptions && component.otherOptions.length > 0 && (
            <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/40 shadow-xl space-y-4">
              <h3 className="text-base font-semibold text-white">Other Customization Options & Presets</h3>
              <ul className="space-y-2">
                {component.otherOptions.map((opt, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{opt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {activeTab === 'export' && (
        <div className="space-y-6">
          {/* Sub Tab Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCodeType('export')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                codeType === 'export'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Standalone Component Code
            </button>
            <button
              onClick={() => setCodeType('main')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                codeType === 'main'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              main.jsx Integration Boilerplate
            </button>
          </div>

          <CodeBlock
            title={codeType === 'export' ? `${component.name}.jsx` : 'main.jsx'}
            code={codeType === 'export' ? component.exportCode : component.mainJsxCode}
          />
        </div>
      )}
    </main>
  );
};

export default ComponentViewer;
