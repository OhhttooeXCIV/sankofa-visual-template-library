import React from 'react';
import { CheckCircle2, Star } from 'lucide-react';

/**
 * FeaturedReviews - Social proof showcase featuring customer testimonials and verified buyer flags.
 * 
 * @param {Array<Object>} [reviews] - Testimonials list
 * @param {string} [title='Words from Our Patrons'] - Section title
 * @param {string} [subtitle='Honest Affirmations'] - Tagline
 */
export const FeaturedReviews = ({
  reviews,
  title = 'Words from Our Patrons',
  subtitle = 'Unfiltered Affirmation',
}) => {
  const defaultReviews = [
    {
      id: 1,
      author: 'Dr. Karabo Dlamini',
      location: 'Sandton, Johannesburg',
      rating: 5,
      date: 'March 2026',
      verified: true,
      headline: 'The purest creamed honey in Southern Africa',
      review: 'I have tested numerous commercial and boutique honeys for therapeutic use. The sunflower creamed honey from Golden Grace has an unmatched crystalline texture with zero industrial adulteration.',
    },
    {
      id: 2,
      author: 'Lianne van der Merwe',
      location: 'Camps Bay, Cape Town',
      rating: 5,
      date: 'April 2026',
      verified: true,
      headline: 'A true sensory masterpiece',
      review: 'The trio gift hamper arrived in pristine wooden packaging. You can genuinely taste the mountain wildflowers of the Free State. It has become our default corporate gift.',
    },
    {
      id: 3,
      author: 'Sipho Sithole',
      location: 'Durban North, KZN',
      rating: 5,
      date: 'May 2026',
      verified: true,
      headline: 'Authentic taste that brings back childhood memories',
      review: 'Opening the jar brought an aroma I have not experienced since harvesting wild comb on my grandfather’s farm. The raw enzymes and clarity are exceptional.',
    },
  ];

  const items = reviews && reviews.length > 0 ? reviews : defaultReviews;

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 shadow-xl backdrop-blur-sm"
          >
            {/* Star Rating */}
            <div className="flex items-center gap-1 text-amber-400 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i < item.rating ? 'currentColor' : 'none'}
                  className={i < item.rating ? 'text-amber-400' : 'text-slate-700'}
                />
              ))}
            </div>

            {/* Headline */}
            <h4 className="font-serif text-base sm:text-lg font-semibold text-white mb-3">
              "{item.headline}"
            </h4>

            {/* Body */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 flex-1">
              {item.review}
            </p>

            {/* Author Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
              <div>
                <p className="font-semibold text-white">{item.author}</p>
                <p className="text-slate-500 text-[11px]">{item.location}</p>
              </div>

              {item.verified && (
                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  <CheckCircle2 size={11} />
                  <span>Verified Buyer</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedReviews;
