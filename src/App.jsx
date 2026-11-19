import React, { useDeferredValue, useMemo } from 'react';
import Header from './showcase/components/Header';
import Sidebar from './showcase/components/Sidebar';
import ComponentViewer from './showcase/components/ComponentViewer';
import MobileGuide from './showcase/components/MobileGuide';
import ReadingProgress from './showcase/components/ReadingProgress';
import { ResponsiveNavigation } from './library/navigation/ResponsiveNavigation';
import { OfflineSaveButton } from './library/offline/OfflineSaveButton';
import { COMPONENT_REGISTRY } from './library/docs/registry';
import { destinations, followRoute, routeHref, useShowcaseNavigation } from './showcase/navigation';
import { useOfflineCatalogue } from './showcase/offline/useOfflineCatalogue';
import MemberPortal from './member/MemberPortal';

const categories = ['All', ...new Set(COMPONENT_REGISTRY.map((component) => component.category))];
const actionClass = 'min-h-11 rounded-lg px-3 py-2 text-sm font-semibold text-amber-300 hover:bg-slate-800';

export function App() {
  const { route, mainRef, navigate, openComponent, backToCatalogue, selectTab } = useShowcaseNavigation();
  const { view: activeView, component, tab, query } = route;
  const category = categories.includes(route.category) ? route.category : 'All';
  const offline = useOfflineCatalogue();
  const savedView = activeView === 'saved';
  const catalogueView = activeView === 'library' || savedView;
  const deferredQuery = useDeferredValue(query);
  const visibleEntries = savedView || !offline.online ? offline.saved : COMPONENT_REGISTRY;
  const filteredComponents = useMemo(() => {
    const needle = deferredQuery.toLowerCase().trim();
    return visibleEntries.filter((item) =>
      (category === 'All' || item.category === category) &&
      [item.name, item.tagline, item.category, item.id].some((text) => text.toLowerCase().includes(needle))
    );
  }, [category, deferredQuery, visibleEntries]);
  const activeComponent = visibleEntries.find((entry) => entry.id === component);
  const viewRoute = (view) => ({ view, tab: 'preview' });
  const setActiveView = (view) => navigate(viewRoute(view));
  const links = destinations.map((item) => ({ ...item, href: routeHref(viewRoute(item.id)) }));

  return (
    <div className="sankofa-motion-scope sankofa-nav-clearance min-h-screen bg-slate-950 font-sans text-slate-100">
      <a href="#showcase-main" className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:bg-amber-400 focus:p-3 focus:text-slate-950">Skip to content</a>
      <Header componentCount={COMPONENT_REGISTRY.length} />
      <div className="mx-auto grid max-w-screen-2xl md:grid-cols-[11rem_minmax(0,1fr)] md:gap-4 md:px-4">
        <div className="md:pt-4">
          <ResponsiveNavigation links={links} activeHref={routeHref(viewRoute(activeView))}
            onNavigate={(event, id) => followRoute(event, () => setActiveView(id))} />
        </div>
        <main id="showcase-main" ref={mainRef} tabIndex={-1} className="min-w-0">
          {!offline.online && <p role="status" className="border-b border-amber-400/20 px-4 py-2 text-sm text-amber-200">You’re offline. Saved components are available on this device.</p>}
          <div role="status" aria-atomic="true" className={offline.status ? 'px-4 py-2 text-sm text-amber-200' : 'sr-only'}>{offline.status}</div>
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

        {activeView === 'docs' && <ReadingProgress />}
        {activeView === 'docs' && <section aria-labelledby="docs-heading" className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-400">Developer onboarding</p>
            <h2 id="docs-heading" className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Understand the platform before you compose it.</h2>
            <p className="mt-5 text-base leading-8 text-slate-300">Sankofa separates reusable interface primitives from product-specific business rules. Public guides explain installation, architecture, reuse boundaries, and CI. Approved members receive private operational notes through the configured GitHub and Supabase role layer.</p>
          </div>
          <MobileGuide />
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

        {activeView === 'member' && <MemberPortal />}

        {/* Main Showcase Workspace */}
        {activeView === 'library' && <div id="component-library" className="flex-1 max-w-7xl w-full mx-auto flex flex-col lg:flex-row overflow-hidden">
        {/* Left Category Sidebar */}
        <Sidebar
          components={filteredComponents}
          selectedId={activeComponent?.id}
          onSelectComponent={setSelectedId}
        />

          {catalogueView && !component && <section aria-labelledby="catalogue-heading">
            <div className="grid gap-4 px-4 pt-6">
              <h1 id="catalogue-heading" className="text-2xl font-semibold">{savedView ? 'Saved offline' : 'Components'}</h1>
              <div className="grid gap-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                <label className="grid gap-1 text-sm text-slate-300">Search components
                  <input type="search" value={query} placeholder="Name or keyword"
                    onChange={(event) => navigate({ ...route, query: event.target.value }, { replace: true, focus: false })}
                    className="min-h-11 min-w-0 rounded-lg border border-slate-700 bg-slate-900 px-3 text-base text-white" />
                </label>
                <label className="grid gap-1 text-sm text-slate-300">Category
                  <select value={category}
                    onChange={(event) => navigate({ ...route, category: event.target.value }, { focus: false })}
                    className="min-h-11 min-w-0 rounded-lg border border-slate-700 bg-slate-900 px-3 text-base text-white">
                    {categories.map((name) => <option key={name}>{name}</option>)}
                  </select>
                </label>
              </div>
              <p className="text-sm text-slate-400" role="status">{filteredComponents.length} {filteredComponents.length === 1 ? 'component' : 'components'}</p>
            </div>
            {filteredComponents.length ? <Sidebar components={filteredComponents}
              componentHref={(id) => routeHref({ ...route, component: id, tab: 'preview' })}
              onSelectComponent={openComponent} /> :
              <p className="p-4 text-slate-300">{(savedView || !offline.online) && !offline.saved.length
                ? 'Saved copies will appear here. Open a component while connected and choose Save for offline.'
                : 'No components match your search and category.'}</p>}
          </section>}
          {catalogueView && component && <section aria-label="Component details">
            <div className="px-4 pt-3">
              <a className={`inline-flex items-center ${actionClass}`}
                href={routeHref({ ...route, component: '' })}
                onClick={(event) => followRoute(event, backToCatalogue)}>← {savedView ? 'Saved offline' : 'All results'}</a>
            </div>
            {activeComponent ? <ComponentViewer key={component} component={activeComponent} tab={tab}
              onSelectTab={selectTab} offline={!offline.online}
              actions={<OfflineSaveButton saved={offline.saved.some((entry) => entry.id === component)}
                busy={offline.busy} disabled={!offline.online && !offline.saved.some((entry) => entry.id === component)}
                onToggle={() => offline.toggle(activeComponent)} />} /> :
              <p className="p-4" role="status">{savedView || !offline.online
                ? 'No offline copy of this component is available on this device.'
                : 'This component could not be found.'}</p>}
          </section>}
        </main>
      </div>
    </div>
  );
}

export default App;
