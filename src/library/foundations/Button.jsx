import React from 'react';

export function Button({ variant = 'primary', size = 'md', loading = false, disabled = false, children, className = '', ...props }) {
  const variants = { primary: 'bg-amber-500 text-slate-950 hover:bg-amber-400', secondary: 'border border-slate-700 bg-slate-900 text-white hover:border-amber-400', ghost: 'text-slate-300 hover:bg-slate-800' };
  const sizes = { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2 text-sm', lg: 'px-5 py-3 text-base' };
  return <button type="button" aria-busy={loading} disabled={disabled || loading} className={`inline-flex items-center justify-center rounded-xl font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`} {...props}>{loading ? 'Loading…' : children}</button>;
}

export default Button;
