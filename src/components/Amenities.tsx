import React from 'react';
import {
  Wifi,
  Laptop,
  Tv,
  Moon,
  Wind,
  VolumeX,
  Coffee,
  ChefHat,
  UtensilsCrossed,
  Sun,
  Shirt,
  KeyRound,
} from 'lucide-react';
import { Language, Theme } from '../types';
import { translations } from '../data/i18n';

interface AmenitiesProps {
  currentLang: Language;
  theme: Theme;
}

export const Amenities: React.FC<AmenitiesProps> = ({ currentLang, theme }) => {
  const t = translations[currentLang].amenities;

  const sections = [
    {
      title: t.workTitle,
      items: [
        { icon: Wifi, title: t.work1Title, desc: t.work1Desc, highlight: true },
        { icon: Laptop, title: t.work2Title, desc: t.work2Desc, highlight: true },
        { icon: Tv, title: t.work3Title, desc: t.work3Desc },
      ],
    },
    {
      title: t.restTitle,
      items: [
        { icon: Moon, title: t.rest1Title, desc: t.rest1Desc, highlight: true },
        { icon: Wind, title: t.rest2Title, desc: t.rest2Desc },
        { icon: VolumeX, title: t.rest3Title, desc: t.rest3Desc },
      ],
    },
    {
      title: t.kitchenTitle,
      items: [
        { icon: Coffee, title: t.kitchen1Title, desc: t.kitchen1Desc, highlight: true },
        { icon: ChefHat, title: t.kitchen2Title, desc: t.kitchen2Desc },
        { icon: UtensilsCrossed, title: t.kitchen3Title, desc: t.kitchen3Desc },
      ],
    },
    {
      title: t.outdoorTitle,
      items: [
        { icon: Sun, title: t.outdoor1Title, desc: t.outdoor1Desc, highlight: true },
        { icon: Shirt, title: t.outdoor2Title, desc: t.outdoor2Desc },
        { icon: KeyRound, title: t.outdoor3Title, desc: t.outdoor3Desc },
      ],
    },
  ];

  return (
    <section
      id="amenities"
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
            COMFORT & DETAILS
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

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {sections.map((section, secIdx) => (
            <div
              key={secIdx}
              className={`p-7 sm:p-8 rounded-lg border transition-all ${
                theme === 'dark'
                  ? 'bg-[#18181B] border-[#2E2E33]'
                  : 'bg-[#F5F2EB] border-[#E7E3D8]'
              }`}
            >
              <h3
                className={`font-condensed text-xl sm:text-2xl font-bold uppercase tracking-tight mb-6 flex items-center justify-between ${
                  theme === 'dark' ? 'text-[#F4F4F5]' : 'text-[#1C1917]'
                }`}
              >
                <span>{section.title}</span>
                <span
                  className={`text-xs font-mono font-normal tracking-widest ${
                    theme === 'dark' ? 'text-[#D4AF37]' : 'text-[#9E8058]'
                  }`}
                >
                  0{secIdx + 1}
                </span>
              </h3>

              <div className="space-y-6">
                {section.items.map((item, itemIdx) => {
                  const Icon = item.icon;
                  return (
                    <div key={itemIdx} className="flex items-start gap-4">
                      <div
                        className={`w-9 h-9 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                          item.highlight
                            ? theme === 'dark'
                              ? 'bg-[#2E2E33] text-[#D4AF37]'
                              : 'bg-white text-[#9E8058] shadow-sm'
                            : theme === 'dark'
                              ? 'bg-[#222226] text-[#A1A1AA]'
                              : 'bg-stone-200/60 text-[#78716C]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4
                            className={`text-sm sm:text-base font-semibold ${
                              theme === 'dark' ? 'text-[#F4F4F5]' : 'text-[#1C1917]'
                            }`}
                          >
                            {item.title}
                          </h4>
                          {item.highlight && (
                            <span
                              className={`text-[10px] font-semibold uppercase tracking-wider ${
                                theme === 'dark' ? 'text-[#D4AF37]' : 'text-[#9E8058]'
                              }`}
                            >
                              ★ Key Feature
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-xs sm:text-sm mt-1 leading-relaxed ${
                            theme === 'dark' ? 'text-[#A1A1AA]' : 'text-[#78716C]'
                          }`}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
