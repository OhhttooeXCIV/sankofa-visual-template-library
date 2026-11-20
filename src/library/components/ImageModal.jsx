import React, { useEffect } from 'react';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useDialogFocus } from './useDialogFocus';

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
  const dialogRef = useDialogFocus(isOpen && !!src, onClose);
  const [isZoomed, setIsZoomed] = React.useState(false);

  useEffect(() => {
    if (!isOpen) setIsZoomed(false);
  }, [isOpen]);

  if (!isOpen || !src) return null;

  return createPortal(
    <div
      ref={dialogRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="sankofa-motion-scope fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-hidden"
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
          className="min-h-11 min-w-11 p-2 rounded-full bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors border border-slate-700/60"
          title={isZoomed ? 'Zoom out' : 'Zoom in'}
        >
          {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
        </button>
        <button
          onClick={onClose}
          className="min-h-11 min-w-11 p-2 rounded-full bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors border border-slate-700/60"
          title="Close viewer"
        >
          <X size={18} />
        </button>
      </div>

      {/* Image Viewer Container */}
      <div className="relative max-w-5xl max-h-[calc(100dvh-5rem)] z-10 flex flex-col items-center">
        <div className={`overflow-auto overscroll-contain max-h-[65dvh] max-w-full rounded-xl ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}>
          <img
            src={src}
            alt={alt}
            onClick={() => setIsZoomed(!isZoomed)}
            className={`object-contain rounded-xl ${isZoomed ? 'w-auto max-w-none max-h-none' : 'max-h-[65dvh] w-auto max-w-full'}`}
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
    </div>, document.body
  );
};

export default ImageModal;
