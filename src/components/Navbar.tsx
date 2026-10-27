import React, { useState, useEffect } from 'react';
import { Sun, Moon, Globe, Phone, MessageSquare, Menu, X, Check } from 'lucide-react';
import { Language, Theme } from '../types';
import { translations } from '../data/i18n';
import { PROPERTY_CONFIG } from '../data/propertyData';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onToggleTheme: () => void;
  onOpenInquiry: () => void;
}

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'GR', label: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'EN', label: 'English', flag: '🇬🇧' },
  { code: 'DE', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'IT', label: 'Italiano', flag: '🇮🇹' },
  { code: 'ES', label: 'Español', flag: '🇪🇸' },
  { code: 'FR', label: 'Français', flag: '🇫🇷' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  theme,
  onToggleTheme,
  onOpenInquiry,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations[currentLang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? theme === 'dark'
              ? 'bg-[#0F0F11]/90 backdrop-blur-md border-b border-[#2E2E33] shadow-lg shadow-black/20 py-3.5'
              : 'bg-[#FAFAF9]/90 backdrop-blur-md border-b border-[#E7E3D8] shadow-sm py-3.5'
            : 'bg-gradient-to-b from-black/60 via-black/30 to-transparent py-5 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar Contract: 3 zones separated by gap-8 */}
          <div className="flex items-center justify-between gap-8">
            {/* Zone 1: Single text element wordmark */}
            <a
              href="#"
              className={`font-condensed text-xl sm:text-2xl font-bold tracking-tight uppercase whitespace-nowrap shrink-0 transition-colors ${
                isScrolled
                  ? theme === 'dark'
                    ? 'text-[#F4F4F5] hover:text-[#D4AF37]'
                    : 'text-[#1C1917] hover:text-[#9E8058]'
                  : 'text-white hover:text-amber-200'
              }`}
            >
              HOUSE OF LIGHT!
            </a>

            {/* Zone 2: 4–5 clean single-line text navigation links */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium tracking-wide">
              <a
                href="#space"
                className={`whitespace-nowrap shrink-0 transition-colors hover:underline underline-offset-8 decoration-1 ${
                  isScrolled
                    ? theme === 'dark'
                      ? 'text-[#A1A1AA] hover:text-white decoration-[#D4AF37]'
                      : 'text-[#78716C] hover:text-[#1C1917] decoration-[#C5A880]'
                    : 'text-white/85 hover:text-white decoration-white/70'
                }`}
              >
                {t.apartment}
              </a>
              <a
                href="#gallery"
                className={`whitespace-nowrap shrink-0 transition-colors hover:underline underline-offset-8 decoration-1 ${
                  isScrolled
                    ? theme === 'dark'
                      ? 'text-[#A1A1AA] hover:text-white decoration-[#D4AF37]'
                      : 'text-[#78716C] hover:text-[#1C1917] decoration-[#C5A880]'
                    : 'text-white/85 hover:text-white decoration-white/70'
                }`}
              >
                {t.photoTour}
              </a>
              <a
                href="#amenities"
                className={`whitespace-nowrap shrink-0 transition-colors hover:underline underline-offset-8 decoration-1 ${
                  isScrolled
                    ? theme === 'dark'
                      ? 'text-[#A1A1AA] hover:text-white decoration-[#D4AF37]'
                      : 'text-[#78716C] hover:text-[#1C1917] decoration-[#C5A880]'
                    : 'text-white/85 hover:text-white decoration-white/70'
                }`}
              >
                {t.amenities}
              </a>
              <a
                href="#location"
                className={`whitespace-nowrap shrink-0 transition-colors hover:underline underline-offset-8 decoration-1 ${
                  isScrolled
                    ? theme === 'dark'
                      ? 'text-[#A1A1AA] hover:text-white decoration-[#D4AF37]'
                      : 'text-[#78716C] hover:text-[#1C1917] decoration-[#C5A880]'
                    : 'text-white/85 hover:text-white decoration-white/70'
                }`}
              >
                {t.location}
              </a>
              <a
                href="#host"
                className={`whitespace-nowrap shrink-0 transition-colors hover:underline underline-offset-8 decoration-1 ${
                  isScrolled
                    ? theme === 'dark'
                      ? 'text-[#A1A1AA] hover:text-white decoration-[#D4AF37]'
                      : 'text-[#78716C] hover:text-[#1C1917] decoration-[#C5A880]'
                    : 'text-white/85 hover:text-white decoration-white/70'
                }`}
              >
                {t.host}
              </a>
              <a
                href="#faq"
                className={`whitespace-nowrap shrink-0 transition-colors hover:underline underline-offset-8 decoration-1 ${
                  isScrolled
                    ? theme === 'dark'
                      ? 'text-[#A1A1AA] hover:text-white decoration-[#D4AF37]'
                      : 'text-[#78716C] hover:text-[#1C1917] decoration-[#C5A880]'
                    : 'text-white/85 hover:text-white decoration-white/70'
                }`}
              >
                FAQ
              </a>
            </nav>

            {/* Zone 3: Primary Action & Controls */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              {/* Language Selector Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  aria-label="Change language"
                  aria-expanded={isLangOpen}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    isScrolled
                      ? theme === 'dark'
                        ? 'bg-[#18181B] text-[#F4F4F5] hover:bg-[#222226] border border-[#2E2E33]'
                        : 'bg-[#F5F2EB] text-[#1C1917] hover:bg-[#ECE8DE] border border-[#E7E3D8]'
                      : 'bg-black/35 text-white hover:bg-black/50 border border-white/20'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5 opacity-80" />
                  <span className="font-semibold">{currentLang}</span>
                </button>

                {isLangOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-36 rounded-lg py-1 shadow-xl border z-50 text-xs ${
                      theme === 'dark'
                        ? 'bg-[#18181B] border-[#2E2E33] text-[#F4F4F5]'
                        : 'bg-[#FAFAF9] border-[#E7E3D8] text-[#1C1917]'
                    }`}
                  >
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          onLanguageChange(lang.code);
                          setIsLangOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-left transition-colors ${
                          currentLang === lang.code
                            ? theme === 'dark'
                              ? 'bg-[#2E2E33] text-[#D4AF37] font-semibold'
                              : 'bg-[#F5F2EB] text-[#9E8058] font-semibold'
                            : theme === 'dark'
                              ? 'hover:bg-[#222226]'
                              : 'hover:bg-[#F5F2EB]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.label}</span>
                        </span>
                        {currentLang === lang.code && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Theme Switcher Toggle */}
              <button
                type="button"
                onClick={onToggleTheme}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
                className={`p-1.5 rounded-md text-xs transition-colors ${
                  isScrolled
                    ? theme === 'dark'
                      ? 'bg-[#18181B] text-[#D4AF37] hover:bg-[#222226] border border-[#2E2E33]'
                      : 'bg-[#F5F2EB] text-[#9E8058] hover:bg-[#ECE8DE] border border-[#E7E3D8]'
                    : 'bg-black/35 text-white hover:bg-black/50 border border-white/20'
                }`}
              >
                {theme === 'light' ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
              </button>

              {/* Primary CTA (Desktop) */}
              <button
                type="button"
                onClick={onOpenInquiry}
                className={`hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-all whitespace-nowrap shrink-0 shadow-sm ${
                  isScrolled
                    ? theme === 'dark'
                      ? 'bg-[#D4AF37] text-[#0F0F11] hover:bg-[#E5BE48]'
                      : 'bg-[#1C1917] text-[#FAFAF9] hover:bg-[#2E2A27]'
                    : 'bg-white text-stone-900 hover:bg-stone-100'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{t.contactHost}</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Open mobile navigation"
                className={`lg:hidden p-2 rounded-md transition-colors ${
                  isScrolled
                    ? theme === 'dark'
                      ? 'text-[#F4F4F5] hover:bg-[#18181B]'
                      : 'text-[#1C1917] hover:bg-[#F5F2EB]'
                    : 'text-white hover:bg-black/30'
                }`}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div
            className={`lg:hidden border-b px-6 py-6 transition-all ${
              theme === 'dark'
                ? 'bg-[#0F0F11] border-[#2E2E33] text-[#F4F4F5]'
                : 'bg-[#FAFAF9] border-[#E7E3D8] text-[#1C1917]'
            }`}
          >
            <div className="flex flex-col gap-4 text-base font-medium">
              <a
                href="#space"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-1 hover:opacity-75 transition-opacity"
              >
                {t.apartment}
              </a>
              <a
                href="#gallery"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-1 hover:opacity-75 transition-opacity"
              >
                {t.photoTour}
              </a>
              <a
                href="#amenities"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-1 hover:opacity-75 transition-opacity"
              >
                {t.amenities}
              </a>
              <a
                href="#location"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-1 hover:opacity-75 transition-opacity"
              >
                {t.location}
              </a>
              <a
                href="#host"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-1 hover:opacity-75 transition-opacity"
              >
                {t.host}
              </a>
              <a
                href="#faq"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-1 hover:opacity-75 transition-opacity"
              >
                FAQ
              </a>
              <div className="pt-4 border-t border-inherit flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenInquiry();
                  }}
                  className={`w-full py-3 text-center text-xs font-semibold uppercase tracking-wider rounded-md ${
                    theme === 'dark'
                      ? 'bg-[#D4AF37] text-[#0F0F11]'
                      : 'bg-[#1C1917] text-[#FAFAF9]'
                  }`}
                >
                  {t.contactHost}
                </button>
                <a
                  href={`tel:${PROPERTY_CONFIG.hostPhoneRaw}`}
                  className={`w-full py-2.5 text-center text-xs font-semibold flex items-center justify-center gap-2 rounded-md border ${
                    theme === 'dark'
                      ? 'border-[#2E2E33] text-[#A1A1AA]'
                      : 'border-[#E7E3D8] text-[#78716C]'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{PROPERTY_CONFIG.hostPhone}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
