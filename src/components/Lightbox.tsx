import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, MessageSquare, Maximize2 } from 'lucide-react';
import { PhotoItem, Language, Theme } from '../types';
import { translations } from '../data/i18n';
import { PROPERTY_CONFIG } from '../data/propertyData';

interface LightboxProps {
  photos: PhotoItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
  currentLang: Language;
  theme: Theme;
}

export const Lightbox: React.FC<LightboxProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onSelectIndex,
  currentLang,
  theme,
}) => {
  const currentPhoto = photos[currentIndex];
  const tGallery = translations[currentLang].gallery;

  const handlePrev = useCallback(() => {
    onSelectIndex((currentIndex - 1 + photos.length) % photos.length);
  }, [currentIndex, photos.length, onSelectIndex]);

  const handleNext = useCallback(() => {
    onSelectIndex((currentIndex + 1) % photos.length);
  }, [currentIndex, photos.length, onSelectIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentPhoto) return null;

  // Resolve localized photo title and description
  const photoTitle =
    (tGallery as Record<string, string>)[currentPhoto.titleKey] || currentPhoto.titleKey;
  const photoDesc =
    (tGallery as Record<string, string>)[currentPhoto.descKey] || currentPhoto.descKey;

  const whatsappInquiryUrl = `https://wa.me/${PROPERTY_CONFIG.hostWhatsapp}?text=${encodeURIComponent(
    `Hello Nitsopa! I was viewing the photo of "${photoTitle}" in House of light! and would love to check booking availability.`
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 text-white lightbox-backdrop p-4 sm:p-6 select-none"
    >
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <span className="font-mono tabular-nums text-xs sm:text-sm text-amber-200/90 font-medium tracking-wider">
            {currentIndex + 1} / {photos.length}
          </span>
          <span className="text-white/40">·</span>
          <span className="text-xs sm:text-sm font-medium tracking-wide uppercase text-white/80">
            {photoTitle}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            aria-label={tGallery.close}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center my-auto max-h-[75vh] w-full">
        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label={tGallery.prev}
          className="absolute left-2 sm:left-4 z-20 p-2.5 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 text-white transition-all transform hover:scale-105"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Displayed Image */}
        <img
          src={currentPhoto.src}
          alt={photoTitle}
          referrerPolicy="no-referrer"
          className="max-h-[70vh] max-w-[92vw] sm:max-w-[85vw] object-contain rounded-md shadow-2xl transition-all duration-300"
        />

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label={tGallery.next}
          className="absolute right-2 sm:right-4 z-20 p-2.5 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 text-white transition-all transform hover:scale-105"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Bottom Information & Action Bar */}
      <div className="max-w-4xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/15 pt-4 text-xs sm:text-sm">
        <div className="text-center sm:text-left">
          <h4 className="font-semibold text-white text-sm sm:text-base">{photoTitle}</h4>
          <p className="text-white/70 max-w-xl text-xs sm:text-sm mt-0.5">{photoDesc}</p>
        </div>

        {/* Quick WhatsApp Inquiry from Lightbox */}
        <a
          href={whatsappInquiryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#25D366] text-white font-medium hover:bg-[#20ba5a] transition-all whitespace-nowrap shrink-0 shadow-md text-xs uppercase tracking-wider"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Ask Nitsopa via WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
