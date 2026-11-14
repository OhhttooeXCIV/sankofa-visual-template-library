import React, { useState, useMemo } from 'react';
import Header from './showcase/components/Header';
import Sidebar from './showcase/components/Sidebar';
import ComponentViewer from './showcase/components/ComponentViewer';
import { COMPONENT_REGISTRY } from './library/docs/registry';

export function App() {
  const [selectedId, setSelectedId] = useState(COMPONENT_REGISTRY[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeView, setActiveView] = useState('overview');

  // Categories list
  const categories = useMemo(() => {
    const set = new Set(COMPONENT_REGISTRY.map((c) => c.category));
    return ['All', ...Array.from(set)];
  }, []);

  // Filtered components list
  const filteredComponents = useMemo(() => {
    return COMPONENT_REGISTRY.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' || item.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.tagline.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  // Active selected component
  const activeComponent = useMemo(() => {
    const found = COMPONENT_REGISTRY.find((c) => c.id === selectedId);
    return found || filteredComponents[0] || COMPONENT_REGISTRY[0];
  }, [selectedId, filteredComponents]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onSelectCategory={(category) => {
          setActiveCategory(category);
          setActiveView('library');
        }}
        categories={categories}
        componentCount={COMPONENT_REGISTRY.length}
        activeView={activeView}
        onSelectView={setActiveView}
      />

      <main>
        {activeView === 'overview' && <section className="relative isolate overflow-hidden border-b border-amber-500/10 bg-[radial-gradient(circle_at_70%_20%,rgba(245,158,11,0.16),transparent_35%),linear-gradient(135deg,#090d16_0%,#120e0a_55%,#090d16_100%)]">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-10 lg:py-24">
            <div className="relative z-10 max-w-2xl">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">
                Sankofa Digital · Visual Template Library
              </p>
              <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Build digital experiences with clarity, character, and care.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                A reusable React and Tailwind system for commerce, education, operations, and content teams. Start with accessible building blocks, then shape them into experiences that feel distinctly yours.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button type="button" onClick={() => setActiveView('library')} className="inline-flex items-center justify-center rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-slate-950">
                  Explore the library <span aria-hidden="true" className="ml-2">↓</span>
                </button>
                <span className="text-sm text-slate-400">Portable primitives · Clear docs · Responsive by default</span>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-xl lg:justify-self-end">
              <div aria-hidden="true" className="absolute -inset-8 rounded-full bg-amber-500/10 blur-3xl" />
              <picture className="relative block overflow-hidden rounded-3xl border border-amber-300/20 bg-black/70 p-3 shadow-2xl shadow-amber-950/40 sm:p-5">
                <source srcSet="/sankofa-digital-hero.webp" type="image/webp" />
                <img src="/sankofa-digital-hero.webp" alt="Sankofa Digital gold bird emblem and wordmark" className="aspect-[16/10] w-full rounded-2xl object-contain object-center" width="1600" height="960" fetchPriority="high" />
              </picture>
            </div>
          </div>
        </section>}

        {activeView === 'overview' && <section aria-labelledby="library-heading" className="mx-auto w-full max-w-7xl px-5 pb-16 pt-12 sm:px-8 lg:px-10 lg:pt-16">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-400">Introduction</p>
            <h2 id="library-heading" className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">A shared shelf of interface patterns, not a single product.</h2>
            <p className="mt-3 text-base leading-7 text-slate-400">Sankofa is an onboarding layer for developers: each entry explains the problem it solves, shows a live preview, documents the contract, and makes portability explicit. Use the library across commerce, operations, education, content, and internal tools without inheriting another project’s business rules.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ['01', 'Understand', 'Start with the why, use cases, and quality contract.'],
                ['02', 'Compose', 'Combine primitives into a route or product surface.'],
                ['03', 'Adapt', 'Copy the code and replace data, routing, and brand tokens.'],
              ].map(([number, title, text]) => <div key={number} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5"><span className="text-xs font-mono text-amber-400">{number}</span><h3 className="mt-3 text-sm font-semibold text-white">{title}</h3><p className="mt-2 text-xs leading-6 text-slate-400">{text}</p></div>)}
            </div>
          </div>
          <button type="button" onClick={() => setActiveView('library')} className="rounded-xl border border-amber-400/40 bg-amber-400/10 px-4 py-2.5 text-sm font-semibold text-amber-300 transition hover:bg-amber-400/20">Start browsing components →</button>
        </section>}

        {activeView === 'docs' && <section aria-labelledby="docs-heading" className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-400">Developer onboarding</p>
            <h2 id="docs-heading" className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Understand the platform before you compose it.</h2>
            <p className="mt-5 text-base leading-8 text-slate-300">Sankofa separates reusable interface primitives from product-specific business rules. Public guides explain installation, architecture, reuse boundaries, and CI. Approved members receive private operational notes through the configured GitHub and Supabase role layer.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              ['Introduction', 'The why, the package model, and the fastest route from idea to a clean starter.', '/docs/introduction.html'],
              ['Architecture', 'UI, contracts, Supabase adapters, region defaults, and service-candidate boundaries.', null],
              ['Security boundaries', 'What is reusable, what stays isolated, and how privileged operations are handled.', '/docs/security-boundaries.html'],
              ['CLI quick start', 'Generate a pinned React/Vite project with a dry-run plan before any external mutation.', null],
              ['CI reference', 'Quality, security, Supabase validation, hosted smoke, and protected release workflows.', null],
              ['Member handbook', 'Role-aware runbooks and project operations for approved GitHub-authenticated members.', null],
            ].map(([title, text, href]) => <article key={title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"><h3 className="text-lg font-semibold text-white">{title}</h3><p className="mt-2 text-sm leading-7 text-slate-400">{text}</p>{href ? <a className="mt-4 inline-block text-sm font-semibold text-amber-300 hover:text-amber-200" href={href}>Read guide →</a> : <span className="mt-4 inline-block text-xs uppercase tracking-widest text-slate-500">In platform docs</span>}</article>)}
          </div>
        </section>}

        {/* Main Showcase Workspace */}
        {activeView === 'library' && <div id="component-library" className="flex-1 max-w-7xl w-full mx-auto flex flex-col lg:flex-row overflow-hidden">
        {/* Left Category Sidebar */}
        <Sidebar
          components={filteredComponents}
          selectedId={activeComponent?.id}
          onSelectComponent={setSelectedId}
        />

        {/* Right Detail Viewer */}
        <ComponentViewer component={activeComponent} />
        </div>}
      </main>
    </div>
  );
}

export default App;
