import React from 'react';

/**
 * Container - Structural wrapper for responsive horizontal containment.
 * 
 * @param {'div' | 'section' | 'article' | 'main'} [as='div'] - Semantic HTML element
 * @param {'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl' | 'full'} [size='7xl'] - Max-width constraint
 * @param {string} [className=''] - Additional Tailwind CSS classes
 * @param {boolean} [gutter=true] - Whether to apply responsive horizontal padding
 * @param {React.ReactNode} children
 */
export const Container = ({
  as: Component = 'div',
  size = '7xl',
  className = '',
  gutter = true,
  children,
  ...props
}) => {
  const sizeClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
  };

  const gutterClass = gutter ? 'px-4 sm:px-6 md:px-8 lg:px-12' : '';

  return (
    <Component
      className={`mx-auto w-full ${sizeClasses[size] || sizeClasses['7xl']} ${gutterClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Container;
