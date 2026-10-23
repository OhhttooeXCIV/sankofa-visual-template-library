import React, { useState } from 'react';
import { ArrowRight, Clock, Search, Sparkles } from 'lucide-react';

/**
 * RecipesPage - Full-page culinary and wellness catalog with category filters and real-time search.
 * 
 * @param {Function} [onReadRecipe] - Callback when user clicks to read a full recipe
 */
export const RecipesPage = ({ onReadRecipe }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const recipes = [
    {
      id: 1,
      title: 'Golden Ricotta & Fig Toast',
      category: 'Culinary',
      time: '10 mins',
      difficulty: 'Easy',
      desc: 'Decadent morning breakfast with whipped farm ricotta and Sunflower Creamed Honey.',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      title: 'Raw Honey & Propolis Face Mask',
      category: 'Skincare',
      time: '15 mins',
      difficulty: 'Restorative',
      desc: 'Hydrate skin cells and heal blemish marks with this 2-ingredient natural enzyme mask.',
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      title: 'Wild Lemon & Ginger Immunity Elixir',
      category: 'Wellness',
      time: '5 mins',
      difficulty: 'Daily Ritual',
      desc: 'Infused ginger and fresh Meyer lemon tea sweetened with raw unheated wildflower honey.',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 4,
      title: 'Honeycomb & Walnut Goat Cheese Crostini',
      category: 'Culinary',
      time: '12 mins',
      difficulty: 'Appetizer',
      desc: 'Artisanal sourdough topped with aged Chevre, toasted Drakensberg walnuts, and pure comb.',
      image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const categories = ['All', 'Culinary', 'Skincare', 'Wellness'];

  const filtered = recipes.filter((r) => {
    const matchesCat = selectedCategory === 'All' || r.category === selectedCategory;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-amber-500 mb-2 block">
            Artisanal Lifestyle
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight">
            Nourish & Glow
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            Explore curated culinary recipes, ancestral skin remedies, and immunity tonics crafted around pure African raw honey.
          </p>
        </div>

        {/* Controls: Search & Category Pills */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-800">
          {/* Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search recipes & rituals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full text-xs bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60"
            />
          </div>
        </div>

        {/* Recipe Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 overflow-hidden shadow-xl"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-slate-950/80 text-amber-400 border border-slate-800 backdrop-blur-xs">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-1 flex-col">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
                  <Clock size={12} className="text-amber-400" />
                  <span>{item.time}</span>
                  <span>•</span>
                  <span>{item.difficulty}</span>
                </div>

                <h3 className="font-serif text-base font-semibold text-white group-hover:text-amber-300 transition-colors mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-6">
                  {item.desc}
                </p>

                <button
                  onClick={() => onReadRecipe?.(item.title)}
                  className="mt-auto flex items-center gap-1.5 text-xs font-semibold text-amber-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-all"
                >
                  <span>Read Guide</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipesPage;
