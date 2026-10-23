import React, { useEffect } from 'react';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import useScrollLock from './useScrollLock';

/**
 * ImageModal - High-resolution image lightbox viewer.
 * 
 * @param {boolean} isOpen - Visibility state
 * @param {Function} onClose - Dismiss callback
 * @param {string} src - Image source URL
 * @param {string} alt - Alternative text
 * @param {string} [caption] - Descriptive caption or attribution
 * @param {string} [category] - Tag or category pill
 */
export const ImageModal = ({
  isOpen,
  onClose,
  src,
  alt = 'Image preview',
  caption,
  category,
}) => {
  useScrollLock(isOpen);
  const [isZoomed, setIsZoomed] = React.useState(false);

  useEffect(() => {
    if (!isOpen) setIsZoomed(false);
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !src) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-hidden"
    >
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Floating Action Controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="p-2 rounded-full bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors border border-slate-700/60"
          title={isZoomed ? 'Zoom out' : 'Zoom in'}
        >
          {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
        </button>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors border border-slate-700/60"
          title="Close viewer"
        >
          <X size={18} />
        </button>
      </div>

      {/* Image Viewer Container */}
      <div className="relative max-w-5xl max-h-[85vh] z-10 flex flex-col items-center">
        <div className={`overflow-auto max-h-[75vh] rounded-xl transition-transform duration-300 ${isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'}`}>
          <img
            src={src}
            alt={alt}
            onClick={() => setIsZoomed(!isZoomed)}
            className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-slate-800/80"
          />
        </div>

        {/* Caption bar */}
        {(caption || category) && (
          <div className="mt-3 text-center px-4 py-2 bg-slate-900/80 border border-slate-800 rounded-full backdrop-blur-sm max-w-md">
            {category && (
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 mr-2">
                {category}
              </span>
            )}
            {caption && (
              <span className="text-xs text-slate-300 font-medium">
                {caption}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageModal;
