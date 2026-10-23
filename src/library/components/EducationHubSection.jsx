import React from 'react';
import { ArrowRight, BookOpen, FileCheck, FlaskConical, Lightbulb } from 'lucide-react';

/**
 * EducationHubSection - Knowledge hub section highlighting science, verification tests, and origin transparency.
 * 
 * @param {Array<Object>} [topics] - Topics list
 * @param {string} [title='The Beekeeping & Honey Knowledge Hub'] - Heading
 * @param {string} [subtitle='Empirical Truth'] - Subtitle
 * @param {Function} [onSelectTopic] - Topic click callback
 */
export const EducationHubSection = ({
  topics,
  title = 'The Beekeeping & Honey Knowledge Hub',
  subtitle = 'Empirical Verification',
  onSelectTopic,
}) => {
  const defaultTopics = [
    {
      id: 'empirical-tests',
      title: '3 Home Tests to Spot Fake Honey',
      tagline: 'Water, Thumb & Flame verification standards to expose corn-syrup adulteration.',
      readTime: '4 min read',
      category: 'Consumer Defence',
      icon: <FlaskConical size={20} className="text-amber-400" />,
    },
    {
      id: 'dfs194-certification',
      title: 'Understanding DFS194 Regulatory Standard',
      tagline: 'Why provincial registration and laboratory pollen profiling protect native biodiversity.',
      readTime: '6 min read',
      category: 'Compliance & Quality',
      icon: <FileCheck size={20} className="text-amber-400" />,
    },
    {
      id: 'raw-vs-commercial',
      title: 'Raw Unheated vs Commercial Heat-Treated',
      tagline: 'How commercial pasteurization strips active diastase and invertase enzymes.',
      readTime: '5 min read',
      category: 'Biochemical Science',
      icon: <Lightbulb size={20} className="text-amber-400" />,
    },
  ];

  const items = topics && topics.length > 0 ? topics : defaultTopics;

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
        {items.map((topic) => (
          <div
            key={topic.id}
            onClick={() => onSelectTopic?.(topic)}
            className="group relative flex flex-col p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 shadow-xl backdrop-blur-sm cursor-pointer"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 group-hover:scale-110 transition-transform">
                {topic.icon || <BookOpen size={20} className="text-amber-400" />}
              </div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                {topic.readTime}
              </span>
            </div>

            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-2 block">
              {topic.category}
            </span>

            <h3 className="font-serif text-lg font-semibold text-white group-hover:text-amber-300 transition-colors mb-3">
              {topic.title}
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed mb-6 flex-1">
              {topic.tagline}
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform pt-4 border-t border-slate-800/80">
              <span>Read Empirical Guide</span>
              <ArrowRight size={14} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationHubSection;
