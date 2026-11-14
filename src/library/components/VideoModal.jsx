import React from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useDialogFocus } from './useDialogFocus';

/**
 * VideoModal - Responsive video player dialog for embed URLs or HTML5 video.
 * 
 * @param {boolean} isOpen - Active state
 * @param {Function} onClose - Close callback
 * @param {string} videoUrl - YouTube/Vimeo embed URL or raw MP4/WebM file URL
 * @param {string} [title] - Video title / accessible label
 * @param {'16:9' | '9:16' | '4:3' | '1:1'} [aspectRatio='16:9'] - Video aspect ratio
 */
export const VideoModal = ({
  isOpen,
  onClose,
  videoUrl,
  title = 'Video Player',
  aspectRatio = '16:9',
}) => {
  const dialogRef = useDialogFocus(isOpen && !!videoUrl, onClose);


  if (!isOpen || !videoUrl) return null;

  const isEmbed = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') || videoUrl.includes('vimeo.com');

  const aspectClasses = {
    '16:9': 'aspect-video max-h-[70dvh]',
    '9:16': 'aspect-[9/16] max-h-[65dvh] w-auto',
    '4:3': 'aspect-[4/3] max-h-[70dvh]',
    '1:1': 'aspect-square max-h-[70dvh]',
  };

  return createPortal(
    <div
      ref={dialogRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="sankofa-motion-scope fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Container */}
      <div className="relative w-full max-w-4xl z-10 flex flex-col items-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close video"
          className="mb-2 min-h-11 min-w-11 self-end p-2 text-slate-300 hover:text-white transition-colors bg-slate-900/80 rounded-full border border-slate-700/60"
        >
          <X size={20} />
        </button>

        {/* Video Wrapper */}
        <div className={`w-full ${aspectClasses[aspectRatio] || 'aspect-video'} bg-black rounded-2xl overflow-hidden border border-slate-800 shadow-2xl shadow-black/80`}>
          {isEmbed ? (
            <iframe
              src={videoUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <video
              src={videoUrl}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            />
          )}
        </div>
      </div>
    </div>, document.body
  );
};

export default VideoModal;
