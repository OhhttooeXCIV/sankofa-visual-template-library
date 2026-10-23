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
    </div>
  );
}

export default App;
