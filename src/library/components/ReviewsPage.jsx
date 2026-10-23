import React, { useState } from 'react';
import { CheckCircle2, MessageSquarePlus, Star, ThumbsUp } from 'lucide-react';

/**
 * ReviewsPage - Full-page review portal with rating breakdown, filters, and review cards.
 * 
 * @param {Function} [onSubmitReview] - Action to submit a new review
 */
export const ReviewsPage = ({ onSubmitReview }) => {
  const [selectedRating, setSelectedRating] = useState('all');

  const stats = {
    average: 4.9,
    total: 128,
    breakdown: [
      { stars: 5, percentage: 92 },
      { stars: 4, percentage: 6 },
      { stars: 3, percentage: 2 },
      { stars: 2, percentage: 0 },
      { stars: 1, percentage: 0 },
    ],
  };

  const reviews = [
    {
      id: 1,
      author: 'Dr. Karabo Dlamini',
      rating: 5,
      date: 'March 2026',
      verified: true,
      title: 'Therapeutic and medicinal purity verified',
      content: 'I conduct clinical trials involving organic antioxidants. Golden Grace raw honey demonstrated exceptional enzymatic stability compared to supermarket samples.',
      helpful: 24,
    },
    {
      id: 2,
      author: 'Lianne van der Merwe',
      rating: 5,
      date: 'April 2026',
      verified: true,
      title: 'Our family’s favorite breakfast luxury',
      content: 'The sunflower creamed honey has become our family breakfast staple. The smooth, velvety texture spread on fresh brioche is incomparable.',
      helpful: 19,
    },
    {
      id: 3,
      author: 'Noluthando Khumalo',
      rating: 4,
      date: 'April 2026',
      verified: true,
      title: 'Exceptional aroma and unheated flavor',
      content: 'Very impressed with the wildflower harvest. It crystallized naturally after 3 weeks in winter, which proves it was never heat-damaged. Arrived safely in bubble packaging.',
      helpful: 12,
    },
  ];

  const filtered = selectedRating === 'all'
    ? reviews
    : reviews.filter((r) => r.rating === Number(selectedRating));

  return (
    <div className="w-full min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-amber-500 mb-2 block">
            Customer Testimonials
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight">
            Patron Reflections
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            Real feedback from connoisseurs, families, and holistic wellness seekers across South Africa.
          </p>
        </div>

        {/* Rating Breakdown Bar & Submission CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 mb-12 backdrop-blur-md">
          {/* Average Score Column */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center lg:border-r border-slate-800 lg:pr-8">
            <span className="text-6xl sm:text-7xl font-serif font-bold text-white tracking-tight">
              {stats.average}
            </span>
            <div className="flex items-center text-amber-400 my-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>
            <p className="text-xs text-slate-400">
              Based on {stats.total} verified customer evaluations
            </p>

            <button
              onClick={onSubmitReview}
              className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-lg shadow-amber-500/20 active:scale-95"
            >
              <MessageSquarePlus size={16} />
              <span>Submit Review</span>
            </button>
          </div>

          {/* Histogram Column */}
          <div className="lg:col-span-8 flex flex-col justify-center space-y-3">
            {stats.breakdown.map((item) => (
              <div key={item.stars} className="flex items-center gap-3 text-xs">
                <span className="w-12 text-slate-400 font-medium flex items-center gap-1">
                  <span>{item.stars}</span>
                  <Star size={11} className="text-amber-400" fill="currentColor" />
                </span>
                <div className="flex-1 bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="w-10 text-right text-slate-400 font-medium">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {filtered.map((rev) => (
            <div
              key={rev.id}
              className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-all shadow-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center font-serif font-bold text-amber-400 text-sm">
                    {rev.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{rev.author}</h4>
                    <p className="text-[11px] text-slate-500">{rev.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      <CheckCircle2 size={11} />
                      Verified
                    </span>
                  )}
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        fill={i < rev.rating ? 'currentColor' : 'none'}
                        className={i < rev.rating ? 'text-amber-400' : 'text-slate-700'}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <h5 className="font-serif text-base font-semibold text-white mb-2">
                "{rev.title}"
              </h5>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {rev.content}
              </p>

              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <ThumbsUp size={12} />
                <span>Helpful ({rev.helpful})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
