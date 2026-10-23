import React from 'react';
import { ArrowRight, Clock, ChefHat, Sparkles } from 'lucide-react';

/**
 * FeaturedRecipes - Recipe/culinary showcase cards with metadata tags and action triggers.
 * 
 * @param {Array<Object>} [recipes] - Array of recipe objects
 * @param {string} [title='Artisanal Kitchen & Rituals'] - Section heading
 * @param {string} [subtitle='Pure Taste'] - Pre-heading pill
 * @param {Function} [onSelectRecipe] - Callback when clicking a recipe card
 */
export const FeaturedRecipes = ({
  recipes,
  title = 'Artisanal Kitchen & Rituals',
  subtitle = 'Nourish & Glow',
  onSelectRecipe,
}) => {
  const defaultRecipes = [
    {
      id: 'ricotta-toast',
      title: 'Golden Ricotta & Fig Toast',
      category: 'Culinary',
      time: '10 mins',
      difficulty: 'Easy',
      description: 'Whipped farm ricotta, fresh mission figs, and a warm drizzle of raw Sunflower Creamed Honey.',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'raw-honey-mask',
      title: 'Raw Honey & Propolis Glow Mask',
      category: 'Skincare',
      time: '15 mins',
      difficulty: 'Effortless',
      description: 'An ancient restorative facial treatment using raw unheated honey to hydrate and soothe acne-prone skin.',
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'immunity-elixir',
      title: 'Wild Citrus & Ginger Honey Elixir',
      category: 'Wellness',
      time: '5 mins',
      difficulty: 'Daily Ritual',
      description: 'Infused ginger root, pressed Meyer lemon, and wildflower honey to supercharge morning vitality.',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const items = recipes && recipes.length > 0 ? recipes : defaultRecipes;

  return (
    <div className="w-full py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          {subtitle && (
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-amber-500 mb-2 block">
              {subtitle}
            </span>
          )}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white tracking-tight">
            {title}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {items.map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => onSelectRecipe?.(recipe)}
            className="group relative flex flex-col rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 overflow-hidden shadow-xl cursor-pointer"
          >
            {/* Image Preview */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
              <img
                src={recipe.image}
                alt={recipe.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-slate-900/90 text-amber-400 border border-slate-700/80 backdrop-blur-sm">
                  {recipe.category}
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 flex flex-1 flex-col">
              <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                <span className="flex items-center gap-1">
                  <Clock size={12} className="text-amber-400" />
                  {recipe.time}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ChefHat size={12} className="text-amber-400" />
                  {recipe.difficulty}
                </span>
              </div>

              <h3 className="text-lg font-serif font-semibold text-white group-hover:text-amber-300 transition-colors mb-2">
                {recipe.title}
              </h3>

              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-6">
                {recipe.description}
              </p>

              <div className="mt-auto flex items-center gap-1.5 text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                <span>View Full Recipe</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedRecipes;
