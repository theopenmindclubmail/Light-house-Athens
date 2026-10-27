import React from 'react';
import { Phone, MessageSquare, Send } from 'lucide-react';
import { Language, Theme } from '../types';
import { translations } from '../data/i18n';
import { PROPERTY_CONFIG } from '../data/propertyData';

interface StickyBottomBarProps {
  currentLang: Language;
  theme: Theme;
  onOpenInquiry: () => void;
}

export const StickyBottomBar: React.FC<StickyBottomBarProps> = ({
  currentLang,
  theme,
  onOpenInquiry,
}) => {
  const t = translations[currentLang].mobileBar;

  const defaultWhatsappMsg = encodeURIComponent(
    currentLang === 'GR'
      ? 'Γεια σας Nitsopa! Ενδιαφέρομαι για κράτηση στο House of light! στην Αθήνα.'
      : 'Hello Nitsopa! I am interested in booking House of light! in Athens.'
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden px-3 py-2.5 bg-black/85 backdrop-blur-md border-t border-white/10 shadow-2xl safe-area-bottom">
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
        {/* Direct Call */}
        <a
          href={`tel:${PROPERTY_CONFIG.hostPhoneRaw}`}
          aria-label="Direct Phone Call"
          className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-2 px-1 rounded-md text-[11px] sm:text-xs font-semibold uppercase tracking-wider bg-white/15 text-white hover:bg-white/25 transition-all text-center"
        >
          <Phone className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{t.call}</span>
        </a>

        {/* WhatsApp Direct */}
        <a
          href={`https://wa.me/${PROPERTY_CONFIG.hostWhatsapp}?text=${defaultWhatsappMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-2 px-1 rounded-md text-[11px] sm:text-xs font-semibold uppercase tracking-wider bg-[#25D366] text-white hover:bg-[#20ba5a] transition-all text-center shadow-sm"
        >
          <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.97.53 1.961.815 3.102.815 3.181 0 5.767-2.586 5.767-5.766.001-3.18-2.585-5.766-5.767-5.766zm9.969 5.766c0 5.503-4.477 9.98-9.98 9.98-1.748 0-3.385-.45-4.819-1.237l-5.69 1.492 1.521-5.556c-.886-1.499-1.397-3.242-1.397-5.109 0-5.503 4.477-9.98 9.98-9.98 5.503 0 9.98 4.477 9.98 9.98z"/>
          </svg>
          <span className="truncate">{t.whatsapp}</span>
        </a>

        {/* Direct Booking Modal / Messenger */}
        <button
          type="button"
          onClick={onOpenInquiry}
          aria-label="Direct Booking Inquiry"
          className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-2 px-1 rounded-md text-[11px] sm:text-xs font-semibold uppercase tracking-wider bg-[#C5A880] text-stone-950 hover:bg-[#d6ba94] transition-all text-center"
        >
          <Send className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{t.bookDirect}</span>
        </button>
      </div>
    </div>
  );
};
