import React, { useState, useEffect } from 'react';
import { Language, Theme } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DirectPerks } from './components/DirectPerks';
import { TheSpace } from './components/TheSpace';
import { PhotoTour } from './components/PhotoTour';
import { Amenities } from './components/Amenities';
import { LocationGuide } from './components/LocationGuide';
import { DirectBookingCard } from './components/DirectBookingCard';
import { FAQ } from './components/FAQ';
import { StickyBottomBar } from './components/StickyBottomBar';
import { Footer } from './components/Footer';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('hol_lang');
      if (saved && ['GR', 'EN', 'DE', 'IT', 'ES', 'FR'].includes(saved)) {
        return saved as Language;
      }
      // Check browser language
      const navLang = navigator.language.toLowerCase();
      if (navLang.startsWith('el') || navLang.startsWith('gr')) return 'GR';
      if (navLang.startsWith('de')) return 'DE';
      if (navLang.startsWith('it')) return 'IT';
      if (navLang.startsWith('es')) return 'ES';
      if (navLang.startsWith('fr')) return 'FR';
    } catch {
      // Fallback
    }
    return 'EN';
  });

  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('hol_theme');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch {
      // Fallback
    }
    return 'light';
  });

  useEffect(() => {
    try {
      localStorage.setItem('hol_lang', currentLang);
    } catch {
      // Ignore storage errors
    }
    // Set document lang attribute for browser typography and Greek uppercase rules
    const htmlLang = currentLang === 'GR' ? 'el' : currentLang.toLowerCase();
    document.documentElement.lang = htmlLang;
  }, [currentLang]);

  useEffect(() => {
    try {
      localStorage.setItem('hol_theme', theme);
    } catch {
      // Ignore storage errors
    }
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleOpenInquiry = () => {
    const hostSection = document.getElementById('host');
    if (hostSection) {
      hostSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans ${
        theme === 'dark'
          ? 'bg-[#0F0F11] text-[#F4F4F5]'
          : 'bg-[#FAFAF9] text-[#1C1917]'
      }`}
    >
      {/* Sticky Navigation */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenInquiry={handleOpenInquiry}
      />

      {/* Main Content Showcase */}
      <main>
        {/* Hero Section */}
        <Hero
          currentLang={currentLang}
          theme={theme}
          onOpenInquiry={handleOpenInquiry}
        />

        {/* Direct Booking Perks Banner */}
        <DirectPerks currentLang={currentLang} theme={theme} />

        {/* The Space & Architectural Narrative */}
        <TheSpace currentLang={currentLang} theme={theme} />

        {/* Curated Room-by-Room Photo Tour */}
        <PhotoTour currentLang={currentLang} theme={theme} />

        {/* Amenities & High-End Specifications */}
        <Amenities currentLang={currentLang} theme={theme} />

        {/* Location & Athens Insider Guide */}
        <LocationGuide currentLang={currentLang} theme={theme} />

        {/* Direct Host Booking Card & Inquiry Helper */}
        <DirectBookingCard currentLang={currentLang} theme={theme} />

        {/* Guest FAQ & House Rules */}
        <FAQ currentLang={currentLang} theme={theme} />
      </main>

      {/* Sticky Bottom Action Bar for Mobile/Tablet */}
      <StickyBottomBar
        currentLang={currentLang}
        theme={theme}
        onOpenInquiry={handleOpenInquiry}
      />

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        theme={theme}
      />
    </div>
  );
}
