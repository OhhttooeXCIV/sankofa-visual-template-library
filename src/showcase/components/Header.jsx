import React from 'react';
import { Layers, Search, Sparkles } from 'lucide-react';

export const Header = ({
  searchQuery,
  onSearchChange,
  activeCategory,
  onSelectCategory,
  categories = [],
  componentCount = 0,
  activeView = 'overview',
  onSelectView = () => {},
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Lockup */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900/60 p-1">
          {[
            { id: 'overview', label: 'Introduction' },
            { id: 'docs', label: 'Documentation' },
            { id: 'library', label: 'Browse library' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectView(item.id)}
              aria-current={activeView === item.id ? 'page' : undefined}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${activeView === item.id ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 p-0.5 shadow-lg shadow-amber-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Layers className="text-amber-400" size={20} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-base sm:text-lg text-white tracking-tight">
                SANKOFA
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                Template Library
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              {componentCount} Production-Grade Reusable Components & Boilerplates
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md hidden md:block">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={`Search ${componentCount} components, props, hooks, or categories...`}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/40 transition-all"
          />
        </div>

        {/* Badges / Links */}
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
            <Sparkles size={12} />
            <span>React 19 + Tailwind</span>
          </span>
        </div>
      </div>

      {/* Category Pills Strip */}
      <div className="border-t border-slate-800/80 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => onSelectView('overview')}
            className="lg:hidden px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap text-slate-300 border border-slate-800"
          >
            Introduction
          </button>
          <button
            type="button"
            onClick={() => onSelectView('library')}
            className="lg:hidden px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap text-slate-300 border border-slate-800"
          >
            Browse library
          </button>
          <button
            type="button"
            onClick={() => onSelectView('docs')}
            className="lg:hidden px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap text-slate-300 border border-slate-800"
          >
            Documentation
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
