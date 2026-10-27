import React, { useState } from 'react';
import { Maximize2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhotoItem, Language, Theme } from '../types';
import { translations } from '../data/i18n';
import { PROPERTY_PHOTOS } from '../data/propertyData';
import { Lightbox } from './Lightbox';

interface PhotoTourProps {
  currentLang: Language;
  theme: Theme;
}

export const PhotoTour: React.FC<PhotoTourProps> = ({ currentLang, theme }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const t = translations[currentLang].gallery;

  const categories = [
    { id: 'all', label: t.all },
    { id: 'living', label: t.living },
    { id: 'bedroom', label: t.bedroom },
    { id: 'kitchen', label: t.kitchen },
    { id: 'bathroom', label: t.bathroomTab },
    { id: 'workspace', label: t.workspace },
    { id: 'rooftop', label: t.rooftop },
  ];

  const filteredPhotos =
    activeCategory === 'all'
      ? PROPERTY_PHOTOS
      : PROPERTY_PHOTOS.filter((photo) => photo.category === activeCategory);

  const handleOpenLightbox = (photo: PhotoItem) => {
    const index = filteredPhotos.findIndex((p) => p.id === photo.id);
    setLightboxIndex(index !== -1 ? index : 0);
  };

  return (
    <section
      id="gallery"
      className={`py-20 sm:py-28 border-b transition-colors ${
        theme === 'dark'
          ? 'bg-[#0F0F11] border-[#2E2E33]'
          : 'bg-[#F5F2EB] border-[#E7E3D8]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <p
              className={`text-xs font-semibold uppercase tracking-[0.2em] mb-2 ${
                theme === 'dark' ? 'text-[#D4AF37]' : 'text-[#9E8058]'
              }`}
            >
              VISUAL EXPLORATION
            </p>
            <h2
              className={`font-condensed text-3xl sm:text-5xl font-bold uppercase tracking-tight leading-tight ${
                theme === 'dark' ? 'text-[#F4F4F5]' : 'text-[#1C1917]'
              }`}
            >
              {t.title}
            </h2>
            <p
              className={`mt-3 text-base sm:text-lg ${
                theme === 'dark' ? 'text-[#A1A1AA]' : 'text-[#78716C]'
              }`}
            >
              {t.subtitle}
            </p>
          </div>

          <div className="text-xs uppercase tracking-wider font-medium text-stone-500">
            <span>{PROPERTY_PHOTOS.length} Curated Photographs</span>
          </div>
        </div>

        {/* Interactive Filter Control Tabs (Segmented bar per frontend-design rules) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-md whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? theme === 'dark'
                      ? 'bg-[#D4AF37] text-[#0F0F11] font-bold shadow-md'
                      : 'bg-[#1C1917] text-[#FAFAF9] font-bold shadow-sm'
                    : theme === 'dark'
                      ? 'bg-[#18181B] text-[#A1A1AA] hover:text-[#F4F4F5] hover:bg-[#222226] border border-[#2E2E33]'
                      : 'bg-[#FAFAF9] text-[#78716C] hover:text-[#1C1917] hover:bg-white border border-[#E7E3D8]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid with Framer Motion subtle zoom-on-hover */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo) => {
              const title =
                (t as Record<string, string>)[photo.titleKey] || photo.titleKey;
              const desc =
                (t as Record<string, string>)[photo.descKey] || photo.descKey;

              return (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  whileHover={{ y: -4 }}
                  onClick={() => handleOpenLightbox(photo)}
                  className={`group relative rounded-lg overflow-hidden border cursor-pointer transition-colors duration-300 ${
                    theme === 'dark'
                      ? 'bg-[#18181B] border-[#2E2E33] hover:border-[#D4AF37]/50 shadow-lg shadow-black/30'
                      : 'bg-[#FAFAF9] border-[#E7E3D8] hover:border-[#C5A880]/70 shadow-sm'
                  }`}
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-stone-200 relative">
                    <motion.img
                      src={photo.src}
                      alt={title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                      whileHover={{ scale: 1.08 }}
                      transition={{
                        duration: 0.65,
                        ease: [0.25, 1, 0.5, 1],
                      }}
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/95 text-stone-900 text-xs font-semibold uppercase tracking-wider shadow-lg backdrop-blur-xs">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>{t.viewFullscreen}</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Editorial Info */}
                  <div className="p-5">
                    <h3
                      className={`font-semibold text-base mb-1 transition-colors ${
                        theme === 'dark'
                          ? 'text-[#F4F4F5] group-hover:text-[#D4AF37]'
                          : 'text-[#1C1917] group-hover:text-[#9E8058]'
                      }`}
                    >
                      {title}
                    </h3>
                    <p
                      className={`text-xs sm:text-sm line-clamp-2 leading-relaxed ${
                        theme === 'dark' ? 'text-[#A1A1AA]' : 'text-[#78716C]'
                      }`}
                    >
                      {desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Viewer */}
      <Lightbox
        photos={filteredPhotos}
        currentIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={(index) => setLightboxIndex(index)}
        currentLang={currentLang}
        theme={theme}
      />
    </section>
  );
};
