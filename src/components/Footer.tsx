import React from 'react';
import { ArrowUp, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { Language, Theme } from '../types';
import { translations } from '../data/i18n';
import { PROPERTY_CONFIG } from '../data/propertyData';

interface FooterProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
}

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'GR', label: 'Ελληνικά' },
  { code: 'EN', label: 'English' },
  { code: 'DE', label: 'Deutsch' },
  { code: 'IT', label: 'Italiano' },
  { code: 'ES', label: 'Español' },
  { code: 'FR', label: 'Français' },
];

export const Footer: React.FC<FooterProps> = ({ currentLang, onLanguageChange, theme }) => {
  const t = translations[currentLang].footer;
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`border-t pb-24 lg:pb-12 pt-16 transition-colors ${
        theme === 'dark'
          ? 'bg-[#0F0F11] border-[#2E2E33] text-stone-400'
          : 'bg-[#FAFAF9] border-[#E7E3D8] text-stone-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-12 border-b border-inherit">
          {/* Brand & Narrative */}
          <div className="md:col-span-5 space-y-4">
            <h3
              className={`font-condensed text-2xl sm:text-3xl font-bold uppercase tracking-tight ${
                theme === 'dark' ? 'text-[#F4F4F5]' : 'text-[#1C1917]'
              }`}
            >
              HOUSE OF LIGHT! · ATHENS
            </h3>
            <p className="text-sm leading-relaxed max-w-sm">{t.tagline}</p>
            <div className="flex items-center gap-2 text-xs">
              <MapPin className="w-3.5 h-3.5 shrink-0 opacity-70" />
              <span>{t.address}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>{t.zeroFees}</span>
            </div>
          </div>

          {/* Quick Anchor Links */}
          <div className="md:col-span-3 space-y-3">
            <h4
              className={`text-xs font-semibold uppercase tracking-widest ${
                theme === 'dark' ? 'text-[#D4AF37]' : 'text-[#9E8058]'
              }`}
            >
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#space" className="hover:underline underline-offset-4">
                  The Apartment & Architecture
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:underline underline-offset-4">
                  Curated Photo Tour
                </a>
              </li>
              <li>
                <a href="#amenities" className="hover:underline underline-offset-4">
                  Amenities & Specs
                </a>
              </li>
              <li>
                <a href="#location" className="hover:underline underline-offset-4">
                  Neos Kosmos & Koukaki Guide
                </a>
              </li>
              <li>
                <a href="#host" className="hover:underline underline-offset-4">
                  Host NITSOPA 369 & Direct Inquiry
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:underline underline-offset-4">
                  FAQ & House Rules
                </a>
              </li>
            </ul>
          </div>

          {/* Language Switcher & Direct Contact */}
          <div className="md:col-span-4 space-y-4">
            <h4
              className={`text-xs font-semibold uppercase tracking-widest ${
                theme === 'dark' ? 'text-[#D4AF37]' : 'text-[#9E8058]'
              }`}
            >
              Language Selection
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => onLanguageChange(lang.code)}
                  className={`px-2.5 py-1 text-xs rounded transition-colors ${
                    currentLang === lang.code
                      ? theme === 'dark'
                        ? 'bg-[#D4AF37] text-[#0F0F11] font-semibold'
                        : 'bg-[#1C1917] text-[#FAFAF9] font-semibold'
                      : theme === 'dark'
                        ? 'bg-[#18181B] text-stone-400 hover:text-white border border-[#2E2E33]'
                        : 'bg-[#F5F2EB] text-stone-600 hover:text-stone-900 border border-[#E7E3D8]'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <div className="pt-2 text-xs space-y-1">
              <p className="font-semibold text-current">Direct Concierge (NITSOPA 369):</p>
              <p className="font-mono">
                Τηλ.: <a href={`tel:${PROPERTY_CONFIG.hostPhoneRaw}`} className="hover:underline font-semibold">{PROPERTY_CONFIG.hostPhone}</a> · <a href={`tel:${PROPERTY_CONFIG.hostPhoneSecondaryRaw}`} className="hover:underline">{PROPERTY_CONFIG.hostPhoneSecondary}</a>
              </p>
              <p className="font-mono">What’s app: <a href={`https://wa.me/${PROPERTY_CONFIG.hostWhatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-[#25D366]">{PROPERTY_CONFIG.hostWhatsappDisplay}</a></p>
              <p className="font-mono">Email: <a href={`mailto:${PROPERTY_CONFIG.hostEmail}`} className="hover:underline">{PROPERTY_CONFIG.hostEmail}</a></p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>© {currentYear} House of light! Athens. {t.rights}</span>
            <span className="opacity-40">·</span>
            <a
              href={`mailto:manosexperience@gmail.com?subject=${encodeURIComponent(
                'Θέλω ενημέρωση για δημιουργία παρόμοιας ιστοσελίδας'
              )}&body=${encodeURIComponent(
                'Γεια σου Μάνο, ενδιαφέρομαι να με ενημερώσεις για την δημιουργία (παρόμοιας) ιστοσελίδας, τον χρόνο παράδοσης και το κόστος της. Ευχαριστώ, αναμένω επικοινωνία σου! Μπορείς να μου γράψεις και μιλάω τις εξής γλώσσες: Ελληνικά, Γερμανικά και Αγγλικά. Du kannst mir schreiben und ich spreche folgende Sprachen: Griechisch, Deutsch und Englisch. You can write to me, and I speak the following languages: Greek, German, and English.'
              )}`}
              className={`font-medium hover:underline underline-offset-2 transition-colors ${
                theme === 'dark' ? 'text-[#D4AF37] hover:text-amber-200' : 'text-[#9E8058] hover:text-stone-900'
              }`}
            >
              Made with ♥️ from manosexperience
            </a>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium uppercase tracking-wider transition-colors ${
              theme === 'dark'
                ? 'bg-[#18181B] hover:bg-[#222226] text-[#D4AF37] border border-[#2E2E33]'
                : 'bg-[#F5F2EB] hover:bg-[#ECE8DE] text-[#9E8058] border border-[#E7E3D8]'
            }`}
          >
            <span>{t.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
