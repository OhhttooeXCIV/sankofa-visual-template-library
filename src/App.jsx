import React, { useState, useMemo } from 'react';
import Header from './showcase/components/Header';
import Sidebar from './showcase/components/Sidebar';
import ComponentViewer from './showcase/components/ComponentViewer';
import { COMPONENT_REGISTRY } from './library/docs/registry';

export function App() {
  const [selectedId, setSelectedId] = useState(COMPONENT_REGISTRY[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

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
        onSelectCategory={setActiveCategory}
        categories={categories}
      />

      <main>
        <section className="relative isolate overflow-hidden border-b border-amber-500/10 bg-[radial-gradient(circle_at_70%_20%,rgba(245,158,11,0.16),transparent_35%),linear-gradient(135deg,#090d16_0%,#120e0a_55%,#090d16_100%)]">
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
                <a href="#component-library" className="inline-flex items-center justify-center rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-slate-950">
                  Explore the library <span aria-hidden="true" className="ml-2">↓</span>
                </a>
                <span className="text-sm text-slate-400">Responsive by default · Built for reuse</span>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-xl lg:justify-self-end">
              <div aria-hidden="true" className="absolute -inset-8 rounded-full bg-amber-500/10 blur-3xl" />
              <picture className="relative block overflow-hidden rounded-3xl border border-amber-300/20 bg-black/40 shadow-2xl shadow-amber-950/40">
                <source srcSet="/sankofa-digital-hero.webp" type="image/webp" />
                <img src="/sankofa-digital-hero.webp" alt="Sankofa Digital gold bird emblem and wordmark" className="aspect-[4/3] w-full object-cover object-center" width="1600" height="960" fetchPriority="high" />
              </picture>
            </div>
          </div>
        </section>

        <section id="component-library" aria-labelledby="library-heading" className="mx-auto w-full max-w-7xl px-5 pb-4 pt-12 sm:px-8 lg:px-10 lg:pt-16">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-400">Introduction</p>
            <h2 id="library-heading" className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">A practical starting point for your next interface.</h2>
            <p className="mt-3 text-base leading-7 text-slate-400">Browse live previews, read the implementation notes, and copy the pieces you need. Every entry is designed to be understandable in isolation and adaptable to a real product.</p>
          </div>
        </section>

        {/* Main Showcase Workspace */}
        <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col lg:flex-row overflow-hidden">
        {/* Left Category Sidebar */}
        <Sidebar
          components={filteredComponents}
          selectedId={activeComponent?.id}
          onSelectComponent={setSelectedId}
        />

        {/* Right Detail Viewer */}
        <ComponentViewer component={activeComponent} />
        </div>
      </main>
    </div>
  );
}

export default App;
