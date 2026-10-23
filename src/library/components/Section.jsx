import React from 'react';
import Container from './Container';

/**
 * Section - Semantic section container with vertical rhythm and background presets.
 * 
 * @param {'none' | 'sm' | 'md' | 'lg' | 'xl'} [spacing='lg'] - Vertical padding preset
 * @param {'transparent' | 'surface' | 'subtle' | 'accent' | 'contrast'} [variant='transparent'] - Visual background theme
 * @param {boolean} [withContainer=true] - Wrap children in a Container automatically
 * @param {string} [containerSize='7xl'] - Container max-width size
 * @param {boolean} [topDivider=false] - Render top border divider
 * @param {boolean} [bottomDivider=false] - Render bottom border divider
 * @param {string} [className=''] - Additional CSS classes
 * @param {React.ReactNode} children
 */
export const Section = ({
  spacing = 'lg',
  variant = 'transparent',
  withContainer = true,
  containerSize = '7xl',
  topDivider = false,
  bottomDivider = false,
  className = '',
  children,
  ...props
}) => {
  const spacingClasses = {
    none: 'py-0',
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-24',
    xl: 'py-20 md:py-32',
  };

  const variantClasses = {
    transparent: 'bg-transparent text-inherit',
    surface: 'bg-slate-900/60 text-slate-100 backdrop-blur-sm',
    subtle: 'bg-slate-900/30 text-slate-200',
    accent: 'bg-gradient-to-b from-amber-950/20 via-slate-950 to-slate-950 text-slate-100',
    contrast: 'bg-slate-950 text-white',
  };

  const dividerTop = topDivider ? 'border-t border-slate-800/80' : '';
  const dividerBottom = bottomDivider ? 'border-b border-slate-800/80' : '';

  return (
    <section
      className={`relative w-full ${spacingClasses[spacing] || spacingClasses.lg} ${variantClasses[variant] || ''} ${dividerTop} ${dividerBottom} ${className}`.trim()}
      {...props}
    >
      {withContainer ? (
        <Container size={containerSize}>
          {children}
        </Container>
      ) : (
        children
      )}
    </section>
  );
};

export default Section;
