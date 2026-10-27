import React, { useState } from 'react';
import {
  MapPin,
  Coffee,
  Utensils,
  Wine,
  Landmark,
  Train,
  ExternalLink,
  Compass,
} from 'lucide-react';
import { Language, Theme } from '../types';
import { translations } from '../data/i18n';
import { LOCAL_RECOMMENDATIONS, PROPERTY_CONFIG } from '../data/propertyData';
import { WeatherWidget } from './WeatherWidget';

interface LocationGuideProps {
  currentLang: Language;
  theme: Theme;
}

export const LocationGuide: React.FC<LocationGuideProps> = ({ currentLang, theme }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const t = translations[currentLang].location;

  const filterTabs = [
    { id: 'all', label: t.tabs.all, icon: Compass },
    { id: 'coffee', label: t.tabs.coffee, icon: Coffee },
    { id: 'food', label: t.tabs.food, icon: Utensils },
    { id: 'wine', label: t.tabs.wine, icon: Wine },
    { id: 'culture', label: t.tabs.culture, icon: Landmark },
    { id: 'transit', label: t.tabs.transit, icon: Train },
  ];

  const filteredPlaces =
    activeCategory === 'all'
      ? LOCAL_RECOMMENDATIONS
      : LOCAL_RECOMMENDATIONS.filter((item) => item.category === activeCategory);

  return (
    <section
      id="location"
      className={`py-20 sm:py-28 border-b transition-colors ${
        theme === 'dark'
          ? 'bg-[#0F0F11] border-[#2E2E33]'
          : 'bg-[#F5F2EB] border-[#E7E3D8]'
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
            NEIGHBORHOOD & ESSENCE
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

        {/* Narrative & Distance Badges Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
          <div className="lg:col-span-7 space-y-5">
            <p
              className={`text-base sm:text-lg leading-relaxed ${
                theme === 'dark' ? 'text-stone-300' : 'text-stone-700'
              }`}
            >
              {t.desc1}
            </p>
            <p
              className={`text-base sm:text-lg leading-relaxed ${
                theme === 'dark' ? 'text-stone-300' : 'text-stone-700'
              }`}
            >
              {t.desc2}
            </p>

            {/* Walking Distances Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              <div
                className={`p-4 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-[#18181B] border-[#2E2E33]'
                    : 'bg-[#FAFAF9] border-[#E7E3D8]'
                }`}
              >
                <span
                  className={`text-xs uppercase tracking-wider block font-semibold mb-1 ${
                    theme === 'dark' ? 'text-[#D4AF37]' : 'text-[#9E8058]'
                  }`}
                >
                  Acropolis
                </span>
                <span
                  className={`text-sm font-semibold font-mono tabular-nums ${
                    theme === 'dark' ? 'text-[#F4F4F5]' : 'text-[#1C1917]'
                  }`}
                >
                  {t.distanceAcropolis}
                </span>
              </div>

              <div
                className={`p-4 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-[#18181B] border-[#2E2E33]'
                    : 'bg-[#FAFAF9] border-[#E7E3D8]'
                }`}
              >
                <span
                  className={`text-xs uppercase tracking-wider block font-semibold mb-1 ${
                    theme === 'dark' ? 'text-[#D4AF37]' : 'text-[#9E8058]'
                  }`}
                >
                  Koukaki
                </span>
                <span
                  className={`text-sm font-semibold font-mono tabular-nums ${
                    theme === 'dark' ? 'text-[#F4F4F5]' : 'text-[#1C1917]'
                  }`}
                >
                  {t.distanceKoukaki}
                </span>
              </div>

              <div
                className={`p-4 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-[#18181B] border-[#2E2E33]'
                    : 'bg-[#FAFAF9] border-[#E7E3D8]'
                }`}
              >
                <span
                  className={`text-xs uppercase tracking-wider block font-semibold mb-1 ${
                    theme === 'dark' ? 'text-[#D4AF37]' : 'text-[#9E8058]'
                  }`}
                >
                  Metro
                </span>
                <span
                  className={`text-sm font-semibold font-mono tabular-nums ${
                    theme === 'dark' ? 'text-[#F4F4F5]' : 'text-[#1C1917]'
                  }`}
                >
                  {t.distanceMetro}
                </span>
              </div>

              <div
                className={`p-4 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-[#18181B] border-[#2E2E33]'
                    : 'bg-[#FAFAF9] border-[#E7E3D8]'
                }`}
              >
                <span
                  className={`text-xs uppercase tracking-wider block font-semibold mb-1 ${
                    theme === 'dark' ? 'text-[#D4AF37]' : 'text-[#9E8058]'
                  }`}
                >
                  Riviera
                </span>
                <span
                  className={`text-sm font-semibold font-mono tabular-nums ${
                    theme === 'dark' ? 'text-[#F4F4F5]' : 'text-[#1C1917]'
                  }`}
                >
                  {t.distanceCoast}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Acropolis Vista from Neos Kosmos */}
          <div className="lg:col-span-5">
            <div className="relative rounded-lg overflow-hidden shadow-xl aspect-[4/3] group">
              <img
                src="/images/acropolis_neos_kosmos_view.jpg"
                alt={t.acropolisCardAlt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs sm:text-sm">
                <p className="font-semibold text-sm sm:text-base tracking-wide text-white drop-shadow">{t.acropolisCardTitle}</p>
                <p className="opacity-90 text-xs sm:text-xs text-stone-200 mt-0.5">{t.acropolisCardSubtitle}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Athens Weather & Activity Planning Widget */}
        <div className="mb-14">
          <WeatherWidget currentLang={currentLang} theme={theme} />
        </div>

        {/* Host’s Insider Guide Tabs */}
        <div className="pt-8 border-t border-inherit">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3
                className={`font-condensed text-2xl font-bold uppercase tracking-tight ${
                  theme === 'dark' ? 'text-[#F4F4F5]' : 'text-[#1C1917]'
                }`}
              >
                {t.guideTitle}
              </h3>
              <p
                className={`text-sm ${
                  theme === 'dark' ? 'text-[#A1A1AA]' : 'text-[#78716C]'
                }`}
              >
                {t.guideDesc}
              </p>
            </div>

            {/* Google Maps link */}
            <a
              href="https://maps.google.com/?q=Neos+Kosmos+Athens+Greece"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors hover:underline ${
                theme === 'dark' ? 'text-[#D4AF37]' : 'text-[#9E8058]'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Explore Neos Kosmos in Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {filterTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-all ${
                    isActive
                      ? theme === 'dark'
                        ? 'bg-[#D4AF37] text-[#0F0F11] font-bold shadow-md'
                        : 'bg-[#1C1917] text-[#FAFAF9] font-bold shadow-sm'
                      : theme === 'dark'
                        ? 'bg-[#18181B] text-[#A1A1AA] hover:text-[#F4F4F5] border border-[#2E2E33]'
                        : 'bg-[#FAFAF9] text-[#78716C] hover:text-[#1C1917] border border-[#E7E3D8]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Recommendations Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredPlaces.map((place) => (
              <div
                key={place.id}
                className={`p-5 rounded-lg border transition-all hover:-translate-y-0.5 ${
                  theme === 'dark'
                    ? 'bg-[#18181B] border-[#2E2E33] hover:border-[#D4AF37]/50'
                    : 'bg-[#FAFAF9] border-[#E7E3D8] hover:border-[#C5A880]/70 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h4
                    className={`font-semibold text-base ${
                      theme === 'dark' ? 'text-[#F4F4F5]' : 'text-[#1C1917]'
                    }`}
                  >
                    {place.name}
                  </h4>
                  <span
                    className={`text-xs font-mono tabular-nums px-2 py-0.5 rounded ${
                      theme === 'dark'
                        ? 'bg-[#222226] text-[#D4AF37]'
                        : 'bg-[#F5F2EB] text-[#9E8058]'
                    }`}
                  >
                    {place.walkTime}
                  </span>
                </div>
                <p
                  className={`text-xs sm:text-sm leading-relaxed mb-3 ${
                    theme === 'dark' ? 'text-[#A1A1AA]' : 'text-[#78716C]'
                  }`}
                >
                  {place.descriptionKey}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-stone-500">
                  <MapPin className="w-3 h-3 opacity-60" />
                  <span>{place.address}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
