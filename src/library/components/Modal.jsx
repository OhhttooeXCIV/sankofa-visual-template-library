import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import useScrollLock from './useScrollLock';

/**
 * Modal - Accessible dialog overlay with backdrop blur and keyboard dismissal.
 * 
 * @param {boolean} isOpen - Whether modal is visible
 * @param {Function} onClose - Callback to close modal
 * @param {string} [title] - Header title
 * @param {string} [description] - Subtitle / description
 * @param {'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'} [size='lg'] - Width constraint
 * @param {React.ReactNode} children - Modal body content
 * @param {React.ReactNode} [footer] - Optional footer action slot
 * @param {boolean} [closeOnBackdrop=true] - Close when clicking outside
 * @param {string} [className=''] - Additional styling
 */
export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  size = 'lg',
  children,
  footer,
  closeOnBackdrop = true,
  className = '',
}) => {
  useScrollLock(isOpen);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    '2xl': 'max-w-6xl',
    full: 'max-w-[95vw] h-[90vh]',
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={() => closeOnBackdrop && onClose()}
      />

      {/* Modal Dialog Card */}
      <div
        ref={modalRef}
        className={`relative w-full ${sizeClasses[size] || sizeClasses.lg} bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden z-10 flex flex-col transform transition-all animate-scale-in ${className}`}
      >
        {/* Header */}
        {(title || onClose) && (
          <div className="flex items-start justify-between p-6 border-b border-slate-800/80 bg-slate-950/40">
            <div>
              {title && (
                <h3 id="modal-title" className="text-xl font-semibold text-white tracking-tight">
                  {title}
                </h3>
              )}
              {description && (
                <p className="mt-1 text-sm text-slate-400">
                  {description}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-200">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 p-4 px-6 border-t border-slate-800/80 bg-slate-950/60">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
