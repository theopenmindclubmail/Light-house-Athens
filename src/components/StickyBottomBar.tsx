import React from 'react';
import { Phone, Send } from 'lucide-react';
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
      ? 'Γεια σας NITSOPA 369! Ενδιαφέρομαι για κράτηση στο House of light! στην Αθήνα.'
      : 'Hello NITSOPA 369! I am interested in booking House of light! in Athens.'
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden px-2.5 py-2 bg-black/90 backdrop-blur-md border-t border-white/10 shadow-2xl safe-area-bottom">
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2 items-stretch">
        {/* Direct Call */}
        <a
          href={`tel:${PROPERTY_CONFIG.hostPhoneRaw}`}
          aria-label="Direct Phone Call"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-md text-[11px] font-semibold uppercase tracking-wider bg-white/15 text-white hover:bg-white/25 transition-all text-center min-h-[52px]"
        >
          <Phone className="w-3.5 h-3.5 shrink-0 mb-1" />
          <span className="truncate w-full text-center">{t.call}</span>
        </a>

        {/* WhatsApp Direct */}
        <a
          href={`https://wa.me/${PROPERTY_CONFIG.hostWhatsapp}?text=${defaultWhatsappMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-md text-[11px] font-semibold uppercase tracking-wider bg-[#25D366] text-white hover:bg-[#20ba5a] transition-all text-center shadow-sm min-h-[52px]"
        >
          <svg className="w-3.5 h-3.5 fill-current shrink-0 mb-1" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.97.53 1.961.815 3.102.815 3.181 0 5.767-2.586 5.767-5.766.001-3.18-2.585-5.766-5.767-5.766zm9.969 5.766c0 5.503-4.477 9.98-9.98 9.98-1.748 0-3.385-.45-4.819-1.237l-5.69 1.492 1.521-5.556c-.886-1.499-1.397-3.242-1.397-5.109 0-5.503 4.477-9.98 9.98-9.98 5.503 0 9.98 4.477 9.98 9.98z"/>
          </svg>
          <span className="truncate w-full text-center">{t.whatsapp}</span>
        </a>

        {/* Direct Booking Modal */}
        <button
          type="button"
          onClick={onOpenInquiry}
          aria-label="Direct Booking Inquiry"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-md bg-[#C5A880] text-stone-950 hover:bg-[#d6ba94] transition-all text-center shadow-sm min-h-[52px] overflow-hidden"
        >
          <Send className="w-3.5 h-3.5 shrink-0 mb-0.5" />
          <span className="flex flex-col items-center justify-center leading-[1.08] text-[10px] font-bold text-center tracking-tight">
            {currentLang === 'GR' ? (
              <>
                <span>ΑΠΕΥΘΕΙΑΣ</span>
                <span>ΚΡΑΤΗΣΗ</span>
              </>
            ) : currentLang === 'EN' ? (
              <>
                <span>DIRECT</span>
                <span>BOOKING</span>
              </>
            ) : currentLang === 'DE' ? (
              <>
                <span>DIREKT</span>
                <span>BUCHEN</span>
              </>
            ) : currentLang === 'IT' ? (
              <>
                <span>PRENOTA</span>
                <span>DIRETTO</span>
              </>
            ) : currentLang === 'ES' ? (
              <>
                <span>RESERVA</span>
                <span>DIRECTA</span>
              </>
            ) : (
              <>
                <span>RESERVER</span>
                <span>EN DIRECT</span>
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  );
};
