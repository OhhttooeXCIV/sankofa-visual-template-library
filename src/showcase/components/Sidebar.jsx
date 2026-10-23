import React from 'react';
import { ChevronRight } from 'lucide-react';

export const Sidebar = ({
  components = [],
  selectedId,
  onSelectComponent,
}) => {
  // Group components by category
  const grouped = components.reduce((acc, comp) => {
    acc[comp.category] = acc[comp.category] || [];
    acc[comp.category].push(comp);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 lg:border-r border-slate-800 bg-slate-950/60 p-4 lg:p-6 overflow-y-auto max-h-[calc(100vh-7rem)]">
      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category}>
            <div className="flex items-center justify-between mb-2 px-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {category}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {grouped[category].length}
              </span>
            </div>

            <ul className="space-y-1">
              {grouped[category].map((item) => {
                const isActive = item.id === selectedId;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => onSelectComponent(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-left transition-all ${
                        isActive
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-sm'
                          : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
                      }`}
                    >
                      <span className="truncate">{item.name}</span>
                      {isActive && <ChevronRight size={13} className="text-amber-400 flex-shrink-0" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
