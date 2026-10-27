import React from 'react';
import { Phone, ArrowDown, Sparkles } from 'lucide-react';
import { Language, Theme } from '../types';
import { translations } from '../data/i18n';
import { PROPERTY_CONFIG } from '../data/propertyData';

interface HeroProps {
  currentLang: Language;
  theme: Theme;
  onOpenInquiry: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, theme, onOpenInquiry }) => {
  const t = translations[currentLang].hero;
  const tPerks = translations[currentLang].perks;

  const defaultWhatsappMsg = encodeURIComponent(
    currentLang === 'GR'
      ? 'Γεια σας Nitsopa! Ενδιαφέρομαι για διαμονή στο House of light! στην Αθήνα. Θα ήθελα να ενημερωθώ για διαθεσιμότητα.'
      : 'Hello Nitsopa! I am interested in staying at House of light! in Athens. Could you please share availability?'
  );

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 overflow-hidden">
      {/* Background Photography with Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_athens_apartment_1792951051266.jpg"
          alt="House of light! Athenian apartment living room flooded with morning sunlight"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Measured Scrim for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/35" />
      </div>

      {/* Spacer for Top Bar */}
      <div className="relative z-10" />

      {/* Center Hero Editorial Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white my-auto py-12">
        {/* Eyebrow kicker */}
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.25em] font-medium text-amber-200/90 mb-4 sm:mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>{t.eyebrow}</span>
        </div>

        {/* Display Headline in Roboto Condensed */}
        <h1 className="font-condensed text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight uppercase leading-[0.95] max-w-5xl mx-auto drop-shadow-md text-balance mb-6">
          {t.title}
        </h1>

        {/* Subline */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl font-normal text-white/90 leading-relaxed text-balance mb-8">
          {t.subtitle}
        </p>

        {/* Zero-Pill Unboxed Metadata separated by subtle middle dots */}
        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-3 text-xs sm:text-sm font-medium text-white/80 max-w-3xl mx-auto mb-10">
          <span>{t.tag1}</span>
          <span aria-hidden="true" className="text-amber-300/60">·</span>
          <span>{t.tag2}</span>
          <span aria-hidden="true" className="text-amber-300/60">·</span>
          <span>{t.tag3}</span>
          <span aria-hidden="true" className="text-amber-300/60">·</span>
          <span className="text-[#E5BE48] font-semibold">{t.tag4}</span>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
          {/* WhatsApp Direct */}
          <a
            href={`https://wa.me/${PROPERTY_CONFIG.hostWhatsapp}?text=${defaultWhatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-md text-xs sm:text-sm font-semibold uppercase tracking-wider bg-[#25D366] text-white hover:bg-[#20ba5a] transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.97.53 1.961.815 3.102.815 3.181 0 5.767-2.586 5.767-5.766.001-3.18-2.585-5.766-5.767-5.766zm9.969 5.766c0 5.503-4.477 9.98-9.98 9.98-1.748 0-3.385-.45-4.819-1.237l-5.69 1.492 1.521-5.556c-.886-1.499-1.397-3.242-1.397-5.109 0-5.503 4.477-9.98 9.98-9.98 5.503 0 9.98 4.477 9.98 9.98z"/>
            </svg>
            <span>{t.ctaWhatsapp}</span>
          </a>

          {/* Direct Phone Call */}
          <a
            href={`tel:${PROPERTY_CONFIG.hostPhoneRaw}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-md text-xs sm:text-sm font-semibold uppercase tracking-wider bg-white/15 hover:bg-white/25 backdrop-blur-md text-white border border-white/30 transition-all whitespace-nowrap"
          >
            <Phone className="w-4 h-4" />
            <span>{t.ctaCall}</span>
          </a>

          {/* Inquiry Form Trigger */}
          <button
            type="button"
            onClick={onOpenInquiry}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-md text-xs sm:text-sm font-semibold uppercase tracking-wider bg-[#C5A880] hover:bg-[#d6ba94] text-stone-950 transition-all whitespace-nowrap"
          >
            <span>Direct Inquiry</span>
          </button>
        </div>
      </div>

      {/* Bottom Editorial Banner: Direct Host Booking Guarantee */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 w-full">
        <div
          className={`rounded-lg p-3 sm:p-4 backdrop-blur-md border transition-colors flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
            theme === 'dark'
              ? 'bg-[#18181B]/80 border-[#2E2E33] text-stone-300'
              : 'bg-black/40 border-white/20 text-white'
          }`}
        >
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] shrink-0" />
            <span className="font-semibold tracking-wide text-amber-200">
              {tPerks.badge}:
            </span>
            <span>{tPerks.perk1Desc}</span>
          </div>

          <a
            href="#space"
            className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-white/80 hover:text-white underline underline-offset-4 decoration-amber-300/50 shrink-0"
          >
            <span>{t.ctaExplore}</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};
