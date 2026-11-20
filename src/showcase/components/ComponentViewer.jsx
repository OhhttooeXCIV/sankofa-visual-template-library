import React, { lazy, Suspense, useId, useState } from 'react';
import CodeBlock from './CodeBlock';
import PropsTable from './PropsTable';
import { useCopyCode } from './useCopyCode';
import { componentGuidance } from '../componentGuidance';
import { BookOpen, Code2, Eye, Sliders, Check, Copy, Lightbulb } from 'lucide-react';

const LivePreviewContainer = lazy(() => import('./LivePreviewContainer'));

export const ComponentViewer = ({ component, tab, onSelectTab, offline = false, actions }) => {
  const [localTab, setLocalTab] = useState('preview');
  const [codeType, setCodeType] = useState('export');
  const { status, copy } = useCopyCode();
  const instance = useId();
  const activeTab = tab ?? localTab;
  const setActiveTab = onSelectTab ?? setLocalTab;
  if (!component) return null;
  const guidance = componentGuidance(component);
  const copiedNotification = status === 'Copied!';
  const useCases = Array.isArray(component.useCases) && component.useCases.length > 0
    ? component.useCases
    : ['Use this primitive as a portable building block and adapt its data, routing, and visual tokens to your product.'];

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

  function handleTabKey(event, index) {
    let target;
    if (event.key === 'ArrowRight') target = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') target = (index + tabs.length - 1) % tabs.length;
    else if (event.key === 'Home') target = 0;
    else if (event.key === 'End') target = tabs.length - 1;
    else return;
    event.preventDefault();
    event.currentTarget.parentElement.querySelectorAll('[role="tab"]')[target].focus();
    setActiveTab(tabs[target].id);
  }

  function panelProps(id) {
    return { id: instance + '-panel-' + id, role: 'tabpanel',
      'aria-labelledby': instance + '-tab-' + id, tabIndex: 0 };
  }

  return (
    <article className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Component Header Card */}
      <div className="relative p-4 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                {component.category}
              </span>
              <span className="break-all text-xs text-slate-400 font-mono">
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
          <div className="flex flex-wrap items-center gap-2">
            {actions}
            <button
              onClick={() => copy(component.exportCode)}
              className="flex items-center gap-1.5 min-h-11 px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md shadow-amber-500/20 active:scale-95"
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
            <p role="status" className={status && !copiedNotification ? 'basis-full text-sm text-slate-300' : 'sr-only'}>
              {status && !copiedNotification ? <>{status} <button type="button" className="underline" onClick={() => setActiveTab('export')}>View code</button></> : status}
            </p>
          </div>
        </div>

        {/* Tab Switcher Navigation */}
        <div role="tablist" aria-label="Component details" className="grid grid-cols-2 gap-2 mt-6 pt-4 border-t border-slate-800/80 sm:flex sm:flex-wrap">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              id={instance + '-tab-' + tab.id}
              aria-controls={instance + '-panel-' + tab.id}
              tabIndex={activeTab === tab.id ? 0 : -1}
              onKeyDown={(event) => handleTabKey(event, index)}
              onClick={() => setActiveTab(tab.id)}
              className={`flex min-h-11 min-w-0 items-center gap-2 px-2 py-2 text-left rounded-xl text-xs font-semibold [overflow-wrap:anywhere] sm:px-4 transition-all ${
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
        <div {...panelProps('preview')} className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-semibold text-white">Interactive Playground</h3>
              <p className="text-xs text-slate-400">Experience live interactions, state changes, and responsive behaviors.</p>
            </div>
          </div>
          {offline && guidance.requiresNetwork ?
            <p className="text-sm text-slate-300">This preview uses online media. The component documentation and export code are available offline.</p> :
            <Suspense fallback={<p role="status">Loading preview…</p>}><LivePreviewContainer componentId={component.id} /></Suspense>}
        </div>
      )}

      {activeTab === 'explanation' && (
        <div {...panelProps('explanation')} className="space-y-6">
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
                <div><dt className="text-slate-400">Mobile and offline use</dt><dd className="mt-1 leading-relaxed text-slate-300">{guidance.description}</dd></div>
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
              {useCases.map((uc, idx) => (
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
        <div {...panelProps('props')} className="space-y-6">
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
        <div {...panelProps('export')} className="space-y-6">
          {/* Sub Tab Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              aria-pressed={codeType === 'export'}
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
              aria-pressed={codeType === 'main'}
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
    </article>
  );
};

export default ComponentViewer;
