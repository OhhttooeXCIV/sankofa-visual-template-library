import React from 'react';
import { Award, Globe, HeartHandshake, ShieldCheck, TrendingUp, Users } from 'lucide-react';

/**
 * ImpactTracker - Metric stats showcase for social impact, ESG, and business milestones.
 * 
 * @param {Array<{ label: string, value: string | number, change?: string, icon?: React.ReactNode, description?: string }>} stats - Metrics data
 * @param {string} [title] - Section heading
 * @param {string} [subtitle] - Pre-heading pill
 * @param {number} [columns=4] - Grid columns on desktop (2, 3, 4)
 * @param {string} [className=''] - Additional CSS
 */
export const ImpactTracker = ({
  stats = [],
  title = 'Our Measurable Impact',
  subtitle = 'Stewardship & Proof',
  columns = 4,
  className = '',
}) => {
  const defaultStats = [
    {
      label: 'Hives Protected',
      value: '2,400+',
      change: '+18% YoY',
      icon: <Award className="text-amber-400" size={24} />,
      description: 'Active native bee colonies monitored under ethical stewardship',
    },
    {
      label: 'Beekeepers Supported',
      value: '140+',
      change: 'Empowering SA',
      icon: <Users className="text-amber-400" size={24} />,
      description: 'Fair compensation paid directly to smallholder beekeepers',
    },
    {
      label: 'Pure Terroir Honey',
      value: '100%',
      change: 'DFS194 Certified',
      icon: <ShieldCheck className="text-amber-400" size={24} />,
      description: 'Unheated, raw, chemical-free and single-origin verified',
    },
    {
      label: 'Wild Flora Pollinated',
      value: '12,000 Ha',
      change: 'Free State Biome',
      icon: <Globe className="text-amber-400" size={24} />,
      description: 'Ecosystems actively regenerated across the Drakensberg escarpment',
    },
  ];

  const items = stats.length > 0 ? stats : defaultStats;

  const colClasses = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  }[columns] || 'sm:grid-cols-2 lg:grid-cols-4';

  return (
    <div className={`w-full py-8 ${className}`}>
      {(title || subtitle) && (
        <div className="text-center max-w-2xl mx-auto mb-10">
          {subtitle && (
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-amber-500 mb-2 block">
              {subtitle}
            </span>
          )}
          {title && (
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white tracking-tight">
              {title}
            </h2>
          )}
        </div>
      )}

      <div className={`grid grid-cols-1 gap-6 ${colClasses}`}>
        {items.map((stat, idx) => (
          <div
            key={idx}
            className="group relative flex flex-col p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-amber-500/5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform">
                {stat.icon || <Award size={24} />}
              </div>
              {stat.change && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  <TrendingUp size={11} />
                  {stat.change}
                </span>
              )}
            </div>

            <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-serif mb-1">
              {stat.value}
            </div>

            <div className="text-sm font-semibold text-slate-200 mb-2">
              {stat.label}
            </div>

            {stat.description && (
              <p className="text-xs text-slate-400 leading-relaxed mt-auto">
                {stat.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImpactTracker;
