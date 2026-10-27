import React, { useState } from 'react';
import {
  Phone,
  Copy,
  Check,
  Calendar,
  Users,
  ShieldCheck,
  Clock,
  Sparkles,
  Mail,
  Home,
  MapPin,
  Compass,
} from 'lucide-react';
import { Language, Theme, InquiryData } from '../types';
import { translations } from '../data/i18n';
import { PROPERTY_CONFIG, HOST_PORTRAIT } from '../data/propertyData';

interface DirectBookingCardProps {
  currentLang: Language;
  theme: Theme;
}

export const DirectBookingCard: React.FC<DirectBookingCardProps> = ({ currentLang, theme }) => {
  const t = translations[currentLang].inquiry;
  const tPerks = translations[currentLang].perks;

  const [activeHostTab, setActiveHostTab] = useState<'welcome' | 'space' | 'location'>('welcome');

  // Format default dates: check-in 14 days from now, checkout 19 days from now
  const today = new Date();
  const defaultIn = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];
  const defaultOut = new Date(today.getTime() + 19 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  const [inquiry, setInquiry] = useState<InquiryData>({
    checkIn: defaultIn,
    checkOut: defaultOut,
    guests: 2,
    purpose: 'vacation',
    customNotes: '',
  });

  const [isCopied, setIsCopied] = useState(false);

  // Generate dynamic customized inquiry message based on language and user choices
  const generateMessage = (): string => {
    const formattedIn = inquiry.checkIn || '[Date]';
    const formattedOut = inquiry.checkOut || '[Date]';
    const guests = inquiry.guests;

    let purposeText = '';
    if (inquiry.purpose === 'remote_work') {
      purposeText =
        currentLang === 'GR'
          ? ' (Σκοπός: Τηλεργασία με χρήση του High-Speed Fiber)'
          : ' (Purpose: Remote work with high-speed fiber)';
    } else if (inquiry.purpose === 'extended_stay') {
      purposeText =
        currentLang === 'GR'
          ? ' (Σκοπός: Μακροχρόνια διαμονή)'
          : ' (Purpose: Extended monthly stay)';
    }

    const notes = inquiry.customNotes.trim() ? ` Notes: "${inquiry.customNotes.trim()}"` : '';

    if (currentLang === 'GR') {
      return `Γεια σας Nitsopa! Ενδιαφέρομαι για απευθείας κράτηση στο House of light! στην Αθήνα από ${formattedIn} έως ${formattedOut} για ${guests} ${
        guests === 1 ? 'άτομο' : 'άτομα'
      }${purposeText}.${notes} Ειναι διαθέσιμες αυτές οι ημερομηνίες; Σας ευχαριστώ πολύ!`;
    }

    if (currentLang === 'DE') {
      return `Hallo Nitsopa! Ich interessiere mich für eine Direktbuchung im House of light! in Athen vom ${formattedIn} bis ${formattedOut} für ${guests} ${
        guests === 1 ? 'Gast' : 'Gäste'
      }${purposeText}.${notes} Sind diese Daten verfügbar? Vielen Dank!`;
    }

    if (currentLang === 'IT') {
      return `Ciao Nitsopa! Sarei interessato a prenotare House of light! ad Atene dal ${formattedIn} al ${formattedOut} per ${guests} ${
        guests === 1 ? 'ospite' : 'ospiti'
      }${purposeText}.${notes} Le date sono disponibili? Grazie mille!`;
    }

    if (currentLang === 'ES') {
      return `¡Hola Nitsopa! Me gustaría consultar la disponibilidad de reserva directa en House of light! en Atenas del ${formattedIn} al ${formattedOut} para ${guests} ${
        guests === 1 ? 'huésped' : 'huéspedes'
      }${purposeText}.${notes} ¿Están disponibles estas fechas? ¡Muchas gracias!`;
    }

    if (currentLang === 'FR') {
      return `Bonjour Nitsopa ! Je souhaite réserver en direct le House of light! à Athènes du ${formattedIn} au ${formattedOut} pour ${guests} ${
        guests === 1 ? 'personne' : 'personnes'
      }${purposeText}.${notes} Ces dates sont-elles disponibles ? Merci d'avance !`;
    }

    return `Hello Nitsopa! I am interested in booking House of light! in Athens from ${formattedIn} to ${formattedOut} for ${guests} ${
      guests === 1 ? 'guest' : 'guests'
    }${purposeText}.${notes} Are these dates available? Best regards!`;
  };

  const messageText = generateMessage();
  const encodedMessage = encodeURIComponent(messageText);

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <section
      id="host"
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
            ZERO-FRICTION DIRECT BOOKING
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

        {/* 2-Column Split: Host Profile & Interactive Inquiry Generator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Host Profile Card */}
          <div className="lg:col-span-5">
            <div
              className={`p-7 sm:p-8 rounded-lg border shadow-lg ${
                theme === 'dark'
                  ? 'bg-[#18181B] border-[#2E2E33]'
                  : 'bg-[#F5F2EB] border-[#E7E3D8]'
              }`}
            >
              <div className="flex items-center gap-5 mb-6">
                <img
                  src={HOST_PORTRAIT}
                  alt={`Host ${PROPERTY_CONFIG.hostName} (${PROPERTY_CONFIG.hostFullName})`}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-[#C5A880] shadow-md"
                />
                <div>
                  <h3
                    className={`font-condensed text-2xl font-bold uppercase tracking-tight ${
                      theme === 'dark' ? 'text-[#F4F4F5]' : 'text-[#1C1917]'
                    }`}
                  >
                    {PROPERTY_CONFIG.hostName}
                  </h3>
                  <p className="text-xs font-medium text-stone-500">
                    {PROPERTY_CONFIG.hostFullName}
                  </p>
                  <p
                    className={`text-xs font-semibold uppercase tracking-wider mt-0.5 ${
                      theme === 'dark' ? 'text-[#D4AF37]' : 'text-[#9E8058]'
                    }`}
                  >
                    {t.hostRole}
                  </p>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-600 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{t.hostResponse}</span>
                  </div>
                </div>
              </div>

              {/* Host Narrative Tabs */}
              <div className="mb-5">
                <div className="flex flex-col gap-1.5 mb-3">
                  <button
                    type="button"
                    onClick={() => setActiveHostTab('welcome')}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all border ${
                      activeHostTab === 'welcome'
                        ? theme === 'dark'
                          ? 'bg-[#D4AF37] text-[#0F0F11] border-[#D4AF37] shadow-sm'
                          : 'bg-[#1C1917] text-[#FAFAF9] border-[#1C1917] shadow-sm'
                        : theme === 'dark'
                          ? 'bg-[#1A1A1E] text-[#A1A1AA] hover:text-white border-[#2E2E33] hover:border-[#3E3E44]'
                          : 'bg-[#F9F8F6] text-[#78716C] hover:text-[#1C1917] border-[#E7E3D8] hover:border-[#D0C9B8]'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Home className="w-4 h-4 shrink-0" />
                      <span>{t.tabAboutSpace}</span>
                    </span>
                    {activeHostTab === 'welcome' ? (
                      <span className="w-2 h-2 rounded-full bg-current shrink-0" />
                    ) : (
                      <span className="text-[11px] opacity-40 font-mono">›</span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveHostTab('space')}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all border ${
                      activeHostTab === 'space'
                        ? theme === 'dark'
                          ? 'bg-[#D4AF37] text-[#0F0F11] border-[#D4AF37] shadow-sm'
                          : 'bg-[#1C1917] text-[#FAFAF9] border-[#1C1917] shadow-sm'
                        : theme === 'dark'
                          ? 'bg-[#1A1A1E] text-[#A1A1AA] hover:text-white border-[#2E2E33] hover:border-[#3E3E44]'
                          : 'bg-[#F9F8F6] text-[#78716C] hover:text-[#1C1917] border-[#E7E3D8] hover:border-[#D0C9B8]'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 shrink-0" />
                      <span>{t.tabTheSpace}</span>
                    </span>
                    {activeHostTab === 'space' ? (
                      <span className="w-2 h-2 rounded-full bg-current shrink-0" />
                    ) : (
                      <span className="text-[11px] opacity-40 font-mono">›</span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveHostTab('location')}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all border ${
                      activeHostTab === 'location'
                        ? theme === 'dark'
                          ? 'bg-[#D4AF37] text-[#0F0F11] border-[#D4AF37] shadow-sm'
                          : 'bg-[#1C1917] text-[#FAFAF9] border-[#1C1917] shadow-sm'
                        : theme === 'dark'
                          ? 'bg-[#1A1A1E] text-[#A1A1AA] hover:text-white border-[#2E2E33] hover:border-[#3E3E44]'
                          : 'bg-[#F9F8F6] text-[#78716C] hover:text-[#1C1917] border-[#E7E3D8] hover:border-[#D0C9B8]'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Compass className="w-4 h-4 shrink-0" />
                      <span>{t.tabLocationNotes}</span>
                    </span>
                    {activeHostTab === 'location' ? (
                      <span className="w-2 h-2 rounded-full bg-current shrink-0" />
                    ) : (
                      <span className="text-[11px] opacity-40 font-mono">›</span>
                    )}
                  </button>
                </div>

                <div
                  className={`p-4 rounded-lg text-xs sm:text-sm leading-relaxed border shadow-xs transition-all ${
                    theme === 'dark'
                      ? 'bg-[#222226] border-[#2E2E33] text-stone-300'
                      : 'bg-white border-[#E7E3D8] text-stone-700'
                  }`}
                >
                  {activeHostTab === 'welcome' && (
                    <div className="space-y-2">
                      <p className="font-medium">{t.hostWelcome}</p>
                    </div>
                  )}

                  {activeHostTab === 'space' && (
                    <div className="space-y-2">
                      <p>{t.hostSpaceNote}</p>
                    </div>
                  )}

                  {activeHostTab === 'location' && (
                    <div className="space-y-2">
                      <p>{t.hostLocationNote}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Host Perks List */}
              <div
                className={`space-y-3 pt-5 border-t text-xs ${
                  theme === 'dark' ? 'border-[#2E2E33]' : 'border-[#E7E3D8]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span className="font-medium">{t.verifiedHost}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Sparkles
                    className={`w-4 h-4 ${
                      theme === 'dark' ? 'text-[#D4AF37]' : 'text-[#C5A880]'
                    }`}
                  />
                  <span>{tPerks.perk1Title} (Save 15%–20%)</span>
                </div>
                {/* Complete Host Channels requested by user */}
                <div
                  className={`mt-4 pt-3.5 border-t space-y-2.5 ${
                    theme === 'dark' ? 'border-[#2E2E33]' : 'border-[#E7E3D8]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-stone-500 font-medium">Τηλ. / Phone:</span>
                    <a
                      href={`tel:${PROPERTY_CONFIG.hostPhoneRaw}`}
                      className="font-mono font-semibold text-current hover:underline"
                    >
                      {PROPERTY_CONFIG.hostPhone}
                    </a>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-stone-500 font-medium">What’s app:</span>
                    <a
                      href={`https://wa.me/${PROPERTY_CONFIG.hostWhatsapp}?text=${encodedMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono font-semibold text-[#25D366] hover:underline"
                    >
                      {PROPERTY_CONFIG.hostWhatsappDisplay}
                    </a>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-stone-500 font-medium">Email:</span>
                    <a
                      href={`mailto:${PROPERTY_CONFIG.hostEmail}?subject=Direct%20Inquiry%20-%20House%20of%20light!&body=${encodedMessage}`}
                      className="font-mono font-semibold text-current hover:underline truncate max-w-[210px]"
                    >
                      {PROPERTY_CONFIG.hostEmail}
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick direct contact links */}
              <div className="mt-6 pt-6 border-t border-inherit flex flex-col gap-2.5">
                <a
                  href={`tel:${PROPERTY_CONFIG.hostPhoneRaw}`}
                  className={`w-full py-2.5 px-4 rounded-md text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 border transition-all ${
                    theme === 'dark'
                      ? 'border-[#2E2E33] hover:bg-[#222226] text-[#F4F4F5]'
                      : 'border-[#E7E3D8] hover:bg-white text-[#1C1917]'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  <span>{t.callButton} ({PROPERTY_CONFIG.hostPhone})</span>
                </a>

                <a
                  href={`https://wa.me/${PROPERTY_CONFIG.hostWhatsapp}?text=${encodedMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-md text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 bg-[#25D366] text-white hover:bg-[#20ba5a] transition-all shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.97.53 1.961.815 3.102.815 3.181 0 5.767-2.586 5.767-5.766.001-3.18-2.585-5.766-5.767-5.766zm9.969 5.766c0 5.503-4.477 9.98-9.98 9.98-1.748 0-3.385-.45-4.819-1.237l-5.69 1.492 1.521-5.556c-.886-1.499-1.397-3.242-1.397-5.109 0-5.503 4.477-9.98 9.98-9.98 5.503 0 9.98 4.477 9.98 9.98z"/>
                  </svg>
                  <span>WhatsApp: {PROPERTY_CONFIG.hostWhatsappDisplay}</span>
                </a>

                <a
                  href={`mailto:${PROPERTY_CONFIG.hostEmail}?subject=Direct%20Inquiry%20-%20House%20of%20light!&body=${encodedMessage}`}
                  className={`w-full py-2.5 px-4 rounded-md text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 border transition-all ${
                    theme === 'dark'
                      ? 'border-[#2E2E33] hover:bg-[#222226] text-[#A1A1AA]'
                      : 'border-[#E7E3D8] hover:bg-white text-[#78716C]'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>Email: {PROPERTY_CONFIG.hostEmail}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Inquiry Helper & Direct Dispatcher */}
          <div className="lg:col-span-7">
            <div
              className={`p-7 sm:p-8 rounded-lg border shadow-lg ${
                theme === 'dark'
                  ? 'bg-[#18181B] border-[#2E2E33]'
                  : 'bg-[#FAFAF9] border-[#E7E3D8]'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3
                  className={`font-condensed text-xl sm:text-2xl font-bold uppercase tracking-tight ${
                    theme === 'dark' ? 'text-[#F4F4F5]' : 'text-[#1C1917]'
                  }`}
                >
                  Custom Inquiry Generator
                </h3>
                <span
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    theme === 'dark' ? 'text-[#D4AF37]' : 'text-[#9E8058]'
                  }`}
                >
                  Direct Host
                </span>
              </div>

              {/* Form Controls */}
              <div className="space-y-5 mb-6">
                {/* Dates Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                        theme === 'dark' ? 'text-[#A1A1AA]' : 'text-[#78716C]'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {t.checkIn}
                      </span>
                    </label>
                    <input
                      type="date"
                      value={inquiry.checkIn}
                      onChange={(e) =>
                        setInquiry({ ...inquiry, checkIn: e.target.value })
                      }
                      className={`w-full px-3.5 py-2.5 rounded-md text-sm border focus:outline-none transition-colors ${
                        theme === 'dark'
                          ? 'bg-[#222226] border-[#2E2E33] text-white focus:border-[#D4AF37]'
                          : 'bg-white border-[#E7E3D8] text-stone-900 focus:border-[#C5A880]'
                      }`}
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                        theme === 'dark' ? 'text-[#A1A1AA]' : 'text-[#78716C]'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {t.checkOut}
                      </span>
                    </label>
                    <input
                      type="date"
                      value={inquiry.checkOut}
                      onChange={(e) =>
                        setInquiry({ ...inquiry, checkOut: e.target.value })
                      }
                      className={`w-full px-3.5 py-2.5 rounded-md text-sm border focus:outline-none transition-colors ${
                        theme === 'dark'
                          ? 'bg-[#222226] border-[#2E2E33] text-white focus:border-[#D4AF37]'
                          : 'bg-white border-[#E7E3D8] text-stone-900 focus:border-[#C5A880]'
                      }`}
                    />
                  </div>
                </div>

                {/* Guests and Purpose Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                        theme === 'dark' ? 'text-[#A1A1AA]' : 'text-[#78716C]'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        {t.guests}
                      </span>
                    </label>
                    <select
                      value={inquiry.guests}
                      onChange={(e) =>
                        setInquiry({ ...inquiry, guests: Number(e.target.value) })
                      }
                      className={`w-full px-3.5 py-2.5 rounded-md text-sm border focus:outline-none transition-colors ${
                        theme === 'dark'
                          ? 'bg-[#222226] border-[#2E2E33] text-white focus:border-[#D4AF37]'
                          : 'bg-white border-[#E7E3D8] text-stone-900 focus:border-[#C5A880]'
                      }`}
                    >
                      <option value={1}>1 {currentLang === 'GR' ? 'Ατομο' : 'Guest'}</option>
                      <option value={2}>2 {currentLang === 'GR' ? 'Ατομα (Ζευγάρι / Συνεργάτες)' : 'Guests (Couple / Duo)'}</option>
                      <option value={3}>3 {currentLang === 'GR' ? 'Ατομα (King + Καναπές)' : 'Guests (King + Sofa)'}</option>
                      <option value={4}>4 {currentLang === 'GR' ? 'Ατομα (Μέγιστος Αριθμός)' : 'Guests (Max Capacity)'}</option>
                    </select>
                  </div>

                  <div>
                    <label
                      className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                        theme === 'dark' ? 'text-[#A1A1AA]' : 'text-[#78716C]'
                      }`}
                    >
                      {t.purpose}
                    </label>
                    <select
                      value={inquiry.purpose}
                      onChange={(e) =>
                        setInquiry({
                          ...inquiry,
                          purpose: e.target.value as InquiryData['purpose'],
                        })
                      }
                      className={`w-full px-3.5 py-2.5 rounded-md text-sm border focus:outline-none transition-colors ${
                        theme === 'dark'
                          ? 'bg-[#222226] border-[#2E2E33] text-white focus:border-[#D4AF37]'
                          : 'bg-white border-[#E7E3D8] text-stone-900 focus:border-[#C5A880]'
                      }`}
                    >
                      <option value="vacation">{t.purposeVacation}</option>
                      <option value="remote_work">{t.purposeWork}</option>
                      <option value="extended_stay">{t.purposeExtended}</option>
                    </select>
                  </div>
                </div>

                {/* Optional Custom Notes */}
                <div>
                  <textarea
                    rows={2}
                    value={inquiry.customNotes}
                    onChange={(e) =>
                      setInquiry({ ...inquiry, customNotes: e.target.value })
                    }
                    placeholder={t.notesPlaceholder}
                    className={`w-full px-3.5 py-2 rounded-md text-xs sm:text-sm border focus:outline-none transition-colors ${
                      theme === 'dark'
                        ? 'bg-[#222226] border-[#2E2E33] text-white placeholder-stone-500 focus:border-[#D4AF37]'
                        : 'bg-white border-[#E7E3D8] text-stone-900 placeholder-stone-400 focus:border-[#C5A880]'
                    }`}
                  />
                </div>
              </div>

              {/* Dynamic Live Message Preview */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-semibold uppercase tracking-wider ${
                      theme === 'dark' ? 'text-[#A1A1AA]' : 'text-[#78716C]'
                    }`}
                  >
                    {t.previewLabel}
                  </span>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded transition-colors ${
                      isCopied
                        ? 'bg-emerald-500 text-white'
                        : theme === 'dark'
                          ? 'bg-[#222226] text-[#D4AF37] hover:bg-[#2E2E33]'
                          : 'bg-[#F5F2EB] text-[#9E8058] hover:bg-[#ECE8DE]'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{t.copiedToast}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t.copyButton}</span>
                      </>
                    )}
                  </button>
                </div>

                <div
                  className={`p-4 rounded-md border text-xs sm:text-sm font-sans leading-relaxed italic select-all ${
                    theme === 'dark'
                      ? 'bg-[#0F0F11] border-[#2E2E33] text-stone-300'
                      : 'bg-[#F5F2EB] border-[#E7E3D8] text-stone-800'
                  }`}
                >
                  "{messageText}"
                </div>
              </div>

              {/* Instant 1-Click Action Dispatchers */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* WhatsApp Primary */}
                  <a
                    href={`https://wa.me/${PROPERTY_CONFIG.hostWhatsapp}?text=${encodedMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-md text-xs sm:text-sm font-semibold uppercase tracking-wider bg-[#25D366] text-white hover:bg-[#20ba5a] transition-all shadow-md hover:shadow-lg whitespace-nowrap"
                  >
                    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.97.53 1.961.815 3.102.815 3.181 0 5.767-2.586 5.767-5.766.001-3.18-2.585-5.766-5.767-5.766zm9.969 5.766c0 5.503-4.477 9.98-9.98 9.98-1.748 0-3.385-.45-4.819-1.237l-5.69 1.492 1.521-5.556c-.886-1.499-1.397-3.242-1.397-5.109 0-5.503 4.477-9.98 9.98-9.98 5.503 0 9.98 4.477 9.98 9.98z"/>
                    </svg>
                    <span>{t.whatsappButton}</span>
                  </a>

                  {/* Direct Phone Call */}
                  <a
                    href={`tel:${PROPERTY_CONFIG.hostPhoneRaw}`}
                    className={`w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-md text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all shadow-sm whitespace-nowrap ${
                      theme === 'dark'
                        ? 'bg-[#D4AF37] text-[#0F0F11] hover:bg-[#E5BE48]'
                        : 'bg-[#1C1917] text-[#FAFAF9] hover:bg-[#2E2A27]'
                    }`}
                  >
                    <Phone className="w-4 h-4 shrink-0" />
                    <span>{t.callButton}</span>
                  </a>
                </div>

                <p className="text-[11px] text-center text-stone-500 mt-2">
                  {t.directContactNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
