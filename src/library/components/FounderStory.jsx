import React from 'react';
import { Quote, Sparkles } from 'lucide-react';

/**
 * FounderStory - Editorial narrative showcase for leadership, founders, and brand origins.
 * 
 * @param {string} founderName - Name of the founder/leader
 * @param {string} [title='Founder & Master Apiarist'] - Title/role
 * @param {string} quote - Memorable anchor quote
 * @param {string} bio - Main narrative body
 * @param {string} image - Portrait image URL
 * @param {string} [signatureUrl] - Optional transparent signature image
 * @param {Array<string>} [highlights] - Key credentials/milestones
 */
export const FounderStory = ({
  founderName = 'Mmaphefo & Family',
  title = 'Founders & Stewards of the Hive',
  quote = 'We do not rush nature. In every drop of golden honey lies the patience of the bees and the legacy of our ancestors.',
  bio = 'Founded on the rugged slopes of the Free State escarpment, Golden Grace Legacy began with a singular calling: to restore the sacred covenant between human stewardship and the African honeybee. Rejecting industrial hyper-filtration, every harvest is gathered by hand, certified raw, and bottled without compromise.',
  image = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
  signatureUrl,
  highlights = ['DFS194 Provincial Registry', '100% Unheated Raw Standard', 'Fair-Trade Beekeeping Cooperatives'],
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl p-6 sm:p-10 lg:p-14">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Portrait Column */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-slate-700/60 shadow-xl group">
            <img
              src={image}
              alt={founderName}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
            
            <div className="absolute bottom-4 left-4 right-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/90 text-slate-950 shadow-md">
                <Sparkles size={12} />
                Master Apiarist
              </span>
            </div>
          </div>
        </div>

        {/* Narrative Column */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="text-amber-500/80 mb-3">
            <Quote size={36} className="rotate-180" />
          </div>

          <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl text-white font-medium leading-relaxed mb-6">
            "{quote}"
          </blockquote>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            {bio}
          </p>

          {/* Highlights / Credentials */}
          {highlights && highlights.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {highlights.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-800/80 text-amber-300 border border-slate-700"
                >
                  {item}
                </span>
              ))}
            </div>
          )}

          {/* Signoff */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-800">
            <div>
              <h4 className="text-lg font-serif font-bold text-white">{founderName}</h4>
              <p className="text-xs text-slate-400">{title}</p>
            </div>

            {signatureUrl ? (
              <img src={signatureUrl} alt="Signature" className="h-10 opacity-70 invert" />
            ) : (
              <span className="font-serif italic text-amber-400/80 text-xl tracking-wider">
                {founderName.split(' ')[0]}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderStory;
