import React, { useState } from 'react';

export function ApprovedImage({ src, alt = '', fallbackLabel = 'Image unavailable', className = '', ...props }) { const [failed, setFailed] = useState(false); if (failed || !src) return <span role={alt ? 'img' : undefined} aria-label={alt || undefined} className={`flex min-h-24 items-center justify-center rounded-xl bg-slate-900 px-3 text-center text-xs text-slate-500 ${className}`}>{fallbackLabel}</span>; return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} {...props} />; }

export default ApprovedImage;
