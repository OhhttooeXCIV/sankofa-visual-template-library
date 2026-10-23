import React from 'react';
import { Gift, PackageCheck, Sparkles, Check } from 'lucide-react';

/**
 * FeaturedGifts - Curated luxury gift hamper and bespoke corporate bundle spotlight.
 * 
 * @param {Array<Object>} [gifts] - Gift package data
 * @param {string} [title='Curated Gift Collections'] - Heading
 * @param {string} [subtitle='The Sovereign Offering'] - Tagline
 * @param {Function} [onSelectGift] - Action callback
 */
export const FeaturedGifts = ({
  gifts,
  title = 'Curated Gift Collections',
  subtitle = 'The Sovereign Offering',
  onSelectGift,
}) => {
  const defaultGifts = [
    {
      id: 'heritage-trio-box',
      name: 'The Terroir Heritage Trio Box',
      tagline: 'Signature Handcrafted Wooden Gift Chest',
      price: 'R450',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
      badge: 'Best-Selling Gift',
      includes: [
        '375g Raw Liquid Wildflower Honey',
        '375g Pure Sunflower Creamed Honey',
        '375g Mountain Blossom Infusion',
        'Hand-turned Bamboo Honey Dipper',
        'Laser-engraved Pinewood Casket with Wax Seal',
      ],
    },
    {
      id: 'apiary-reserve-hamper',
      name: 'The Royal Apiary Reserve Hamper',
      tagline: 'Ultimate Connoisseur Tasting Experience',
      price: 'R850',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
      badge: 'Limited Vintage',
      includes: [
        '500g Single-Origin Drakensberg Comb Honey',
        '375g Lemon & Ginger Active Wellness Jar',
        'Pure Beeswax Candle (Hand-poured 40hr burn)',
        'DFS194 Certificate of Analysis Certificate',
        'Custom Embossed Brass Keepsake Spoon',
      ],
    },
  ];

  const items = gifts && gifts.length > 0 ? gifts : defaultGifts;

  return (
    <div className="w-full py-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        {subtitle && (
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-amber-500 mb-2 block">
            {subtitle}
          </span>
        )}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white tracking-tight">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {items.map((gift) => (
          <div
            key={gift.id}
            className="flex flex-col sm:flex-row rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 overflow-hidden shadow-2xl group"
          >
            {/* Image Column */}
            <div className="relative sm:w-1/2 aspect-square sm:aspect-auto overflow-hidden bg-slate-950">
              <img
                src={gift.image}
                alt={gift.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {gift.badge && (
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md">
                    {gift.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Details Column */}
            <div className="p-6 sm:p-8 sm:w-1/2 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-1">
                  {gift.tagline}
                </p>
                <h3 className="text-xl font-serif font-bold text-white mb-3">
                  {gift.name}
                </h3>

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <PackageCheck size={14} className="text-amber-400" />
                  Package Inclusions:
                </p>

                <ul className="space-y-1.5 mb-6">
                  {gift.includes.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check size={13} className="text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-slate-400 font-semibold block">Total Price</span>
                  <span className="text-2xl font-bold font-serif text-white">{gift.price}</span>
                </div>

                <button
                  onClick={() => onSelectGift?.(gift)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 transition-all active:scale-95"
                >
                  <Gift size={14} />
                  <span>Gift This</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedGifts;
