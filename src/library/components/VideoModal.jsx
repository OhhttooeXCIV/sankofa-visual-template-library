import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import useScrollLock from './useScrollLock';

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
  useScrollLock(isOpen);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !videoUrl) return null;

  const isEmbed = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') || videoUrl.includes('vimeo.com');

  const aspectClasses = {
    '16:9': 'aspect-video',
    '9:16': 'aspect-[9/16] max-h-[80vh] w-auto',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
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
          className="absolute -top-12 right-0 p-2 text-slate-300 hover:text-white transition-colors bg-slate-900/80 rounded-full border border-slate-700/60"
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
              ref={videoRef}
              src={videoUrl}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
