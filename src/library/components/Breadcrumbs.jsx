import React from 'react';
import { ChevronRight, Home, Slash } from 'lucide-react';

/**
 * Breadcrumbs - Accessible hierarchical trail navigation.
 * 
 * @param {Array<{ label: string, href?: string, icon?: React.ReactNode }>} items - Breadcrumb items list
 * @param {'chevron' | 'slash' | 'bullet'} [separator='chevron'] - Separator style
 * @param {boolean} [showHomeIcon=true] - Render home icon on first item
 * @param {string} [className=''] - Additional CSS classes
 * @param {Function} [onNavigate] - Callback when an item link is clicked
 */
export const Breadcrumbs = ({
  items = [],
  separator = 'chevron',
  showHomeIcon = true,
  className = '',
  onNavigate,
}) => {
  if (!items || items.length === 0) return null;

  const renderSeparator = () => {
    switch (separator) {
      case 'slash':
        return <Slash size={12} className="text-slate-600 mx-2 -rotate-12 flex-shrink-0" />;
      case 'bullet':
        return <span className="text-slate-600 mx-2 text-xs flex-shrink-0">•</span>;
      case 'chevron':
      default:
        return <ChevronRight size={14} className="text-slate-600 mx-2 flex-shrink-0" />;
    }
  };

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center overflow-x-auto py-2 text-xs sm:text-sm font-medium ${className}`}>
      <ol className="flex items-center whitespace-nowrap min-w-0">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isFirst = index === 0;

          return (
            <li key={index} className="flex items-center min-w-0">
              {index > 0 && renderSeparator()}
              {isLast ? (
                <span
                  aria-current="page"
                  className="font-semibold text-amber-400 truncate max-w-[200px] sm:max-w-none"
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href || '#'}
                  onClick={(e) => {
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate(item);
                    }
                  }}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-amber-300 transition-colors duration-200"
                >
                  {isFirst && showHomeIcon && (item.icon || <Home size={14} className="flex-shrink-0" />)}
                  {!isFirst && item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                  <span className="truncate">{item.label}</span>
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
