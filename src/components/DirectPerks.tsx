import React from 'react';
import { ShieldCheck, Percent, Clock, Compass } from 'lucide-react';
import { Language, Theme } from '../types';
import { translations } from '../data/i18n';

interface DirectPerksProps {
  currentLang: Language;
  theme: Theme;
}

export const DirectPerks: React.FC<DirectPerksProps> = ({ currentLang, theme }) => {
  const t = translations[currentLang].perks;

  const perks = [
    {
      icon: Percent,
      title: t.perk1Title,
      desc: t.perk1Desc,
    },
    {
      icon: ShieldCheck,
      title: t.perk2Title,
      desc: t.perk2Desc,
    },
    {
      icon: Clock,
      title: t.perk3Title,
      desc: t.perk3Desc,
    },
    {
      icon: Compass,
      title: t.perk4Title,
      desc: t.perk4Desc,
    },
  ];

  return (
    <section
      className={`py-16 sm:py-20 border-b transition-colors ${
        theme === 'dark'
          ? 'bg-[#0F0F11] border-[#2E2E33]'
          : 'bg-[#F5F2EB] border-[#E7E3D8]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.2em] mb-2 ${
              theme === 'dark' ? 'text-[#D4AF37]' : 'text-[#9E8058]'
            }`}
          >
            {t.badge}
          </p>
          <h2
            className={`font-condensed text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight ${
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
            {t.description}
          </p>
        </div>

        {/* 4-Item Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((perk, index) => {
            const Icon = perk.icon;
            return (
              <div
                key={index}
                className={`p-6 sm:p-7 rounded-lg border transition-all duration-200 hover:-translate-y-1 ${
                  theme === 'dark'
                    ? 'bg-[#18181B] border-[#2E2E33] hover:border-[#D4AF37]/50'
                    : 'bg-[#FAFAF9] border-[#E7E3D8] hover:border-[#C5A880]/70 shadow-sm'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-md flex items-center justify-center mb-5 ${
                    theme === 'dark'
                      ? 'bg-[#222226] text-[#D4AF37]'
                      : 'bg-[#F5F2EB] text-[#9E8058]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3
                  className={`text-base font-semibold mb-2.5 ${
                    theme === 'dark' ? 'text-[#F4F4F5]' : 'text-[#1C1917]'
                  }`}
                >
                  {perk.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    theme === 'dark' ? 'text-[#A1A1AA]' : 'text-[#78716C]'
                  }`}
                >
                  {perk.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
