import React from 'react';
import { Users, Bed, Bath, Maximize2, Wifi, Sun, CheckCircle2 } from 'lucide-react';
import { Language, Theme } from '../types';
import { translations } from '../data/i18n';
import { PROPERTY_CONFIG } from '../data/propertyData';

interface TheSpaceProps {
  currentLang: Language;
  theme: Theme;
}

export const TheSpace: React.FC<TheSpaceProps> = ({ currentLang, theme }) => {
  const t = translations[currentLang].space;

  const specsList = [
    {
      icon: Maximize2,
      label: currentLang === 'GR' ? 'ΕΠΙΦΑΝΕΙΑ' : 'Area',
      value: t.statArea,
    },
    {
      icon: Users,
      label: currentLang === 'GR' ? 'ΦΙΛΟΞΕΝΟΥΜΕΝΟΙ' : 'Guests',
      value: t.statGuests,
    },
    {
      icon: Bed,
      label: currentLang === 'GR' ? 'ΥΠΝΟΣ' : 'Bedrooms',
      value: t.statBedrooms,
    },
    {
      icon: Bath,
      label: currentLang === 'GR' ? 'ΜΠΑΝΙΟ' : 'Bathroom',
      value: t.statBath,
    },
    {
      icon: Wifi,
      label: currentLang === 'GR' ? 'ΔΙΑΔΙΚΤΥΟ' : 'Internet',
      value: t.statWifi,
    },
    {
      icon: Sun,
      label: currentLang === 'GR' ? 'ΕΞΩΤΕΡΙΚΟΙ ΧΩΡΟΙ' : 'Outdoor',
      value: t.statFloor,
    },
  ];

  return (
    <section
      id="space"
      className={`py-20 sm:py-28 border-b transition-colors ${
        theme === 'dark'
          ? 'bg-[#0F0F11] border-[#2E2E33]'
          : 'bg-[#FAFAF9] border-[#E7E3D8]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.2em] mb-2 ${
              theme === 'dark' ? 'text-[#D4AF37]' : 'text-[#9E8058]'
            }`}
          >
            ARCHITECTURE & ATMOSPHERE
          </p>
          <h2
            className={`font-condensed text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-tight ${
              theme === 'dark' ? 'text-[#F4F4F5]' : 'text-[#1C1917]'
            }`}
          >
            {t.title}
          </h2>
          <p
            className={`mt-4 text-lg sm:text-xl font-normal leading-relaxed ${
              theme === 'dark' ? 'text-[#A1A1AA]' : 'text-[#78716C]'
            }`}
          >
            {t.subtitle}
          </p>
        </div>

        {/* Narrative Split: 2-Column Balanced Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          {/* Left Column: Editorial Prose & Highlights */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div
              className={`space-y-5 text-base sm:text-lg leading-relaxed ${
                theme === 'dark' ? 'text-stone-300' : 'text-stone-700'
              }`}
            >
              <p>{t.story1}</p>
              <p>{t.story2}</p>
              <p>{t.story3}</p>
              {t.story4 && <p>{t.story4}</p>}
            </div>

            {/* Curated Architectural Highlights */}
            <div
              className={`pt-6 border-t ${
                theme === 'dark' ? 'border-[#2E2E33]' : 'border-[#E7E3D8]'
              }`}
            >
              <h3
                className={`text-xs font-semibold uppercase tracking-widest mb-4 ${
                  theme === 'dark' ? 'text-[#D4AF37]' : 'text-[#9E8058]'
                }`}
              >
                {t.highlightsTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[t.highlight1, t.highlight2, t.highlight3, t.highlight4].map(
                  (highlight, index) => (
                    <div key={index} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          theme === 'dark' ? 'text-[#D4AF37]' : 'text-[#C5A880]'
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          theme === 'dark' ? 'text-[#A1A1AA]' : 'text-[#57534E]'
                        }`}
                      >
                        {highlight}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Visual Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-lg overflow-hidden shadow-xl aspect-[4/3] group">
              <img
                src="/images/living/_DSC4810.jpg"
                alt="Living room in Athens with exposed brick wall, modern fireplace, and warm ambient light"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs sm:text-sm font-medium">
                <p className="font-semibold">{PROPERTY_CONFIG.name} · Living Lounge & Hearth</p>
                <p className="opacity-80 text-xs">Exposed brick, glass fireplace, and warm Athenian atmospheric lighting</p>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Strip with Tabular Numerals */}
        <div
          className={`rounded-lg p-6 sm:p-8 border ${
            theme === 'dark'
              ? 'bg-[#18181B] border-[#2E2E33]'
              : 'bg-[#F5F2EB] border-[#E7E3D8]'
          }`}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
            {specsList.map((spec, index) => {
              const Icon = spec.icon;
              return (
                <div key={index} className="flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon
                      className={`w-4 h-4 ${
                        theme === 'dark' ? 'text-[#D4AF37]' : 'text-[#9E8058]'
                      }`}
                    />
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider ${
                        theme === 'dark' ? 'text-[#A1A1AA]' : 'text-[#78716C]'
                      }`}
                    >
                      {spec.label}
                    </span>
                  </div>
                  <span
                    className={`font-mono tabular-nums text-sm sm:text-base font-semibold ${
                      theme === 'dark' ? 'text-[#F4F4F5]' : 'text-[#1C1917]'
                    }`}
                  >
                    {spec.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
