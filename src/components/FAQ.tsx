import React, { useState } from 'react';
import {
  ChevronDown,
  Clock,
  ShieldCheck,
  Car,
  Luggage,
  Wifi,
  Compass,
  MessageCircle,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, Theme } from '../types';
import { PROPERTY_CONFIG } from '../data/propertyData';

interface FAQProps {
  currentLang: Language;
  theme: Theme;
}

interface FAQItem {
  id: string;
  icon: React.ElementType;
  question: Record<Language, string>;
  answer: Record<Language, string>;
  details?: Record<Language, string[]>;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'check-in-out',
    icon: Clock,
    question: {
      GR: 'Ποιες είναι οι ώρες άφιξης (Check-in) και αναχώρησης (Check-out);',
      EN: 'What are the check-in and check-out times?',
      DE: 'Wie sind die Check-in- und Check-out-Zeiten?',
      IT: 'Quali sono gli orari di check-in e check-out?',
      ES: '¿Cuáles son los horarios de llegada (Check-in) y salida (Check-out)?',
      FR: 'Quelles sont les heures d’arrivée (Check-in) et de départ (Check-out) ?',
    },
    answer: {
      GR: 'Το Check-in ξεκινά στις 15:00 και το Check-out είναι έως τις 11:00 π.μ. Παρέχεται δυνατότητα ευέλικτης αυτοματοποιημένης άφιξης (Self Check-in) 24/7 ή προσωπικής υποδοχής κατόπιν συνεννόησης.',
      EN: 'Check-in is from 3:00 PM (15:00) and check-out is by 11:00 AM. 24/7 self check-in is available, or host NITSOPA 369 can personally welcome you upon arrival.',
      DE: 'Der Check-in ist ab 15:00 Uhr möglich, der Check-out bis 11:00 Uhr. Ein kontaktloser Self-Check-in steht rund um die Uhr zur Verfügung, oder Gastgeber NITSOPA 369 begrüßt Sie persönlich.',
      IT: 'Il check-in è disponibile dalle 15:00 e il check-out entro le 11:00. È previsto il self check-in 24 ore su 24 oppure l’accoglienza personale da parte dell’host NITSOPA 369.',
      ES: 'El check-in es a partir de las 15:00 y el check-out hasta las 11:00. Ofrecemos self check-in flexible 24/7 o bienvenida personalizada por el anfitrión NITSOPA 369.',
      FR: 'L’arrivée est possible dès 15h00 et le départ s’effectue jusqu’à 11h00. Un self check-in 24h/24 est disponible, ou l’hôte NITSOPA 369 peut vous accueillir personnellement.',
    },
    details: {
      GR: [
        'Αυτοματοποιημένη είσοδος χωρίς αναμονή οποιαδήποτε ώρα της νύχτας.',
        'Δυνατότητα check-in νωρίτερα ή αναχώρησης αργότερα, κατόπιν διαθεσιμότητας.',
      ],
      EN: [
        'Flexible keyless entry code provided prior to your stay.',
        'Early check-in or late check-out available upon request depending on schedule.',
      ],
      DE: [
        'Flexibler schlüsselloser Zugang mit sicherem Code.',
        'Früher Check-in oder später Check-out je nach Verfügbarkeit möglich.',
      ],
      IT: [
        'Accesso rapido con codice sicuro per la massima flessibilità.',
        'Check-in anticipato o check-out posticipato su richiesta in base alla disponibilità.',
      ],
      ES: [
        'Entrada autónoma con código seguro a cualquier hora.',
        'Early check-in o late check-out disponible según disponibilidad.',
      ],
      FR: [
        'Arrivée autonome avec code sécurisé en toute liberté.',
        'Arrivée anticipée ou départ tardif sur demande selon le calendrier.',
      ],
    },
  },
  {
    id: 'house-rules',
    icon: ShieldCheck,
    question: {
      GR: 'Ποιοι είναι οι κανονισμοί του σπιτιού και οι ώρες κοινής ησυχίας;',
      EN: 'What are the house rules and quiet hours?',
      DE: 'Welche Hausregeln und Ruhezeiten gelten?',
      IT: 'Quali sono le regole della casa e gli orari di silenzio?',
      ES: '¿Cuáles son las normas de la casa y los horarios de silencio?',
      FR: 'Quels sont les règlements intérieurs et les horaires de calme ?',
    },
    answer: {
      GR: 'Το διαμέρισμα βρίσκεται σε μια πολύ ήσυχη και ασφαλή γειτονιά. Παρακαλούμε για σεβασμό των ωρών κοινής ησυχίας (23:00 - 07:00 & 15:00 - 17:30 το καλοκαίρι). Το κάπνισμα επιτρέπεται μόνο στον εξωτερικό χώρο της βεράντας / ταράτσας.',
      EN: 'House of Light! is situated in a tranquil and peaceful neighborhood. We kindly ask guests to observe quiet hours (23:00–07:00). Indoor smoking and parties are strictly prohibited; smoking is allowed on the private balcony and rooftop terrace.',
      DE: 'Die Wohnung liegt in einer sehr ruhigen Wohngegend. Wir bitten um die Einhaltung der Nachtruhe (23:00–07:00 Uhr). Rauchen ist nur auf dem Balkon und der Dachterrasse gestattet. Partys sind nicht gestattet.',
      IT: 'L’appartamento si trova in un quartiere tranquillo e riservato. Vi preghiamo di rispettare il riposo condominiale (23:00–07:00). È vietato fumare all’interno (consentito sul balcone privato e in terrazza). Feste non ammesse.',
      ES: 'El apartamento está ubicado en un vecindario apacible. Rogamos respetar las horas de descanso (23:00–07:00). No se permite fumar en el interior (sí en la terraza o balcón). Fiestas no autorizadas.',
      FR: 'Le logement est niché dans un quartier paisible. Merci de respecter les heures de calme (23h00–07h00). Il est strictement interdit de fumer à l’intérieur (autorisé sur le balcon et le toit-terrasse). Fêtes non autorisées.',
    },
    details: {
      GR: [
        'Μη καπνίζοντες εσωτερικά (επιτρέπεται στο μπαλκόνι).',
        'Χωρίς πάρτι ή εκδηλώσεις για προστασία της ηρεμίας των ενοίκων.',
        'Κατοικίδια δεκτά μόνο κατόπιν προηγούμενης συνεννόησης.',
      ],
      EN: [
        'Smoke-free interior (outdoor private terrace designated for smoking).',
        'No events, gatherings, or commercial filming without written consent.',
        'Pets considered on individual inquiry upon request.',
      ],
      DE: [
        'Nichtraucher-Innenbereich (Terrasse & Balkon gestattet).',
        'Keine Partys oder Veranstaltungen zum Schutz der Nachbarschaft.',
        'Haustiere nur nach vorheriger Absprache möglich.',
      ],
      IT: [
        'Ambiente interno non fumatori (consentito sul terrazzo privato).',
        'Niente feste per preservare l’armonia del palazzo.',
        'Animali domestici ammessi solo su richiesta preventiva.',
      ],
      ES: [
        'Interior libre de humos (permitido en balcones exteriores).',
        'Prohibidas las fiestas para garantizar la serenidad vecinal.',
        'Mascotas aceptadas únicamente previa consulta.',
      ],
      FR: [
        'Intérieur 100% non-fumeur (terrasse extérieure prévue à cet effet).',
        'Pas de soirées ni d’événements sonores.',
        'Animaux acceptés sur demande préalable uniquement.',
      ],
    },
  },
  {
    id: 'parking',
    icon: Car,
    question: {
      GR: 'Ποιες είναι οι επιλογές για στάθμευση (Parking);',
      EN: 'What are the parking options nearby?',
      DE: 'Welche Parkmöglichkeiten gibt es in der Nähe?',
      IT: 'Quali sono le possibilità di parcheggio nei dintorni?',
      ES: '¿Cuáles son las opciones de aparcamiento (Parking) disponibles?',
      FR: 'Quelles sont les options de stationnement (Parking) à proximité ?',
    },
    answer: {
      GR: 'Στους γύρω δρόμους του Νέου Κόσμου η στάθμευση είναι δωρεάν και συνήθως εύκολη. Επιπλέον, σε απόσταση 3–5 λεπτών με τα πόδια υπάρχουν κλειστά και φυλασσόμενα 24ωρα ιδιωτικά πάρκινγκ.',
      EN: 'Street parking is free and generally straightforward along the residential streets right around the building. For guaranteed covered parking, several secure 24/7 monitored garages operate just 3–5 minutes walk away.',
      DE: 'Kostenloses Parken an der Straße ist in den umliegenden ruhigen Straßen von Neos Kosmos problemlos möglich. Zudem gibt es in 3–5 Gehminuten Entfernung überwachte 24/7-Parkhäuser.',
      IT: 'Il parcheggio in strada è gratuito e solitamente comodo nelle vie residenziali intorno all’edificio. Inoltre, a 3–5 minuti a piedi si trovano garage privati coperti e custoditi 24 ore su 24.',
      ES: 'El aparcamiento en la calle es gratuito y sencillo en las calles residenciales cercanas. También hay varios aparcamientos privados cubiertos y vigilados 24/7 a solo 3–5 minutos a pie.',
      FR: 'Le stationnement dans la rue est gratuit et aisé dans les rues calmes du quartier. De plus, des parkings couverts et surveillés 24h/24 se trouvent à 3–5 minutes de marche.',
    },
    details: {
      GR: [
        'Δωρεάν στάθμευση στους γύρω ασφαλείς δρόμους χωρίς τέλη δήμου.',
        'Φυλασσόμενα 24ωρα ιδιωτικά γκαράζ σε απόσταση 300μ. με προσιτές ημερήσιες χρεώσεις.',
      ],
      EN: [
        'Free public on-street parking with no meter restrictions in our residential zone.',
        'Guarded 24/7 indoor garages within 300 meters offering reasonable daily rates.',
      ],
      DE: [
        'Kostenlose Straßenparkplätze direkt im Wohnviertel ohne Parkuhren.',
        'Bewachte Parkhäuser in 300 m Entfernung mit fairen Tagespauschalen.',
      ],
      IT: [
        'Parcheggio pubblico gratuito su strada senza parcometri nella zona.',
        'Garage custoditi h24 a circa 300 metri con tariffe giornaliere convenienti.',
      ],
      ES: [
        'Aparcamiento gratuito en la calle sin parquímetros en toda la zona residencial.',
        'Garajes vigilados 24 horas a 300 metros con tarifas diarias asequibles.',
      ],
      FR: [
        'Stationnement gratuit dans la rue sans horodateur dans tout le quartier.',
        'Garages privés surveillés 24h/24 à 300 mètres avec forfaits journaliers raisonnables.',
      ],
    },
  },
  {
    id: 'luggage',
    icon: Luggage,
    question: {
      GR: 'Μπορώ να αφήσω τις αποσκευές μου πριν το check-in ή μετά το check-out;',
      EN: 'Can I store luggage before check-in or after check-out?',
      DE: 'Kann ich mein Gepäck vor dem Check-in oder nach dem Check-out abstellen?',
      IT: 'Posso depositare i bagagli prima del check-in o dopo il check-out?',
      ES: '¿Puedo dejar mi equipaje antes del check-in o después del check-out?',
      FR: 'Puis-je déposer mes bagages avant le check-in ou après le check-out ?',
    },
    answer: {
      GR: 'Ναι! Αν φτάσετε νωρίτερα στην Αθήνα ή έχετε πτήση αργότερα, μπορείτε να αφήσετε με ασφάλεια τις αποσκευές σας κατόπιν προηγούμενης συνεννόησης με τον οικοδεσπότη NITSOPA 369.',
      EN: 'Yes! If you arrive early or have a late departure flight or ferry, secure luggage storage can gladly be arranged directly with host NITSOPA 369 upon request.',
      DE: 'Ja! Bei früher Ankunft oder spätem Abflug/Fähre können Sie Ihr Gepäck nach vorheriger kurzer Absprache mit Gastgeber NITSOPA 369 sicher unterbringen.',
      IT: 'Certamente! In caso di arrivo anticipato o partenza nel tardo pomeriggio, il deposito bagagli può essere concordato direttamente con l’host NITSOPA 369.',
      ES: '¡Sí! Si llega temprano o su vuelo/ferry sale por la tarde, puede coordinar el resguardo seguro de su equipaje con el anfitrión NITSOPA 369.',
      FR: 'Oui ! Si vous arrivez tôt ou partez tard, le stockage sécurisé de vos valises peut être organisé en direct avec l’hôte NITSOPA 369.',
    },
  },
  {
    id: 'wifi-work',
    icon: Wifi,
    question: {
      GR: 'Πόσο γρήγορο είναι το WiFi για τηλεργασία και βιντεοκλήσεις;',
      EN: 'How fast is the WiFi for remote work and video conferencing?',
      DE: 'Wie schnell ist das WLAN für Homeoffice und Videokonferenzen?',
      IT: 'Quanto è veloce il WiFi per lo smart working e le videoconferenze?',
      ES: '¿Qué velocidad tiene el WiFi para teletrabajo y videollamadas?',
      FR: 'Quelle est la vitesse du WiFi pour le télétravail et les visioconférences ?',
    },
    answer: {
      GR: 'Το διαμέρισμα διαθέτει αποκλειστική συμμετρική γραμμή οπτικής ίνας 100+ Mbps με μηδενικές διακοπές, ειδικό μασίφ γραφείο εργασίας, εργονομική καρέκλα και πρίζες με θύρες USB.',
      EN: 'We provide dedicated fiber-optic broadband with 100+ Mbps symmetrical speed, low latency, and zero dropouts. The apartment features a dedicated timber work desk, ergonomic chair, and power strips.',
      DE: 'Die Wohnung verfügt über einen dedizierten Glasfaseranschluss mit über 100 Mbit/s symmetrischer Geschwindigkeit, einen Schreibtisch und einen ergonomischen Stuhl.',
      IT: 'Offriamo una linea in fibra ottica dedicata a 100+ Mbps simmetrici a bassissima latenza, una solida scrivania in legno e sedia ergonomica.',
      ES: 'Disponemos de fibra óptica simétrica de 100+ Mbps de alta velocidad, escritorio de madera maciza, silla ergonómica y conexiones USB.',
      FR: 'Nous offrons une connexion fibre optique dédiée de plus de 100 Mbps symétriques, un bureau en bois massif et une chaise ergonomique.',
    },
  },
  {
    id: 'transit',
    icon: Compass,
    question: {
      GR: 'Πόσο εύκολη είναι η πρόσβαση στα μέσα μεταφοράς και στο κέντρο της Αθήνας;',
      EN: 'How easy is public transit to the Acropolis, airport, and ports?',
      DE: 'Wie gut ist die Anbindung an Akropolis, Flughafen und Hafen?',
      IT: 'Come sono i collegamenti per l’Acropoli, l’aeroporto e il porto?',
      ES: '¿Cómo es el transporte hacia la Acrópolis, el aeropuerto y el puerto?',
      FR: 'Quelle est la proximité avec l’Acropole, l’aéroport et les ports ?',
    },
    answer: {
      GR: 'Εξαιρετικά βολική: Βρίσκεστε 5 λεπτά με τα πόδια από το Μετρό Νέου Κόσμου και Συγγρού-Φιξ (κόκκινη γραμμή). Σε 15–20 λεπτά φτάνετε στο Λιμάνι του Πειραιά, ενώ σε 10–15 λεπτά στην παραλιακή λεωφόρο και τη θάλασσα.',
      EN: 'Extremely convenient: Just a 5-minute walk to Neos Kosmos and Sygrou-Fix Metro Stations (Red Line, direct to Acropolis and Syntagma). The Port of Piraeus is only 15–20 minutes away, and the Athenian coastal riviera is 10–15 minutes south.',
      DE: 'Erstklassig: Nur 5 Gehminuten zu den Metrostationen Neos Kosmos und Sygrou-Fix (Rote Linie direkt zur Akropolis). Der Hafen von Piräus ist in 15–20 Minuten erreichbar, die Küste in 10–15 Minuten.',
      IT: 'Comodissima: a soli 5 minuti a piedi dalle fermate Metro Neos Kosmos e Sygrou-Fix (Linea Rossa per Acropoli e Syntagma). Il porto del Pireo dista 15–20 minuti e la costa 10–15 minuti.',
      ES: 'Inmejorable: a 5 minutos a pie de las estaciones de Metro Neos Kosmos y Sygrou-Fix (Línea Roja directa a la Acrópolis). El puerto del Pireo está a 15–20 min y la costa a 10–15 min.',
      FR: 'Idéale : à 5 minutes à pied des stations de métro Neos Kosmos et Sygrou-Fix (Ligne rouge directe Acropole et Syntagma). Le port du Pirée est à 15–20 min et la côte à 10–15 min.',
    },
  },
];

export const FAQ: React.FC<FAQProps> = ({ currentLang, theme }) => {
  const [openId, setOpenId] = useState<string | null>('check-in-out');

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const headerTexts = {
    GR: {
      badge: 'ΧΡΗΣΙΜΕΣ ΠΛΗΡΟΦΟΡΙΕΣ',
      title: 'Συχνές Ερωτήσεις & Κανονισμοί',
      subtitle: 'Ολα όσα χρειάζεται να γνωρίζετε πριν και κατά τη διάρκεια της διαμονής σας.',
      directQuestion: 'Εχετε κάποια άλλη απορία;',
      askHost: 'Επικοινωνήστε απευθείας με τον οικοδεσπότη NITSOPA 369',
      whatsappBtn: 'Μήνυμα στο WhatsApp',
      phoneBtn: 'Κλήση στον οικοδεσπότη',
    },
    EN: {
      badge: 'GUEST ESSENTIALS',
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know for a seamless, relaxing stay in Athens.',
      directQuestion: 'Have a specific question or special request?',
      askHost: 'Chat directly with your host NITSOPA 369',
      whatsappBtn: 'Message on WhatsApp',
      phoneBtn: 'Call Concierge',
    },
    DE: {
      badge: 'GÄSTE-INFORMATIONEN',
      title: 'Häufig Gestellte Fragen & Hausregeln',
      subtitle: 'Alles Wissenswerte für einen entspannten Aufenthalt in Athen.',
      directQuestion: 'Haben Sie eine andere Frage oder einen Sonderwunsch?',
      askHost: 'Schreiben oder rufen Sie Gastgeber NITSOPA 369 direkt an',
      whatsappBtn: 'WhatsApp-Nachricht',
      phoneBtn: 'Gastgeber Anrufen',
    },
    IT: {
      badge: 'INFO UTILI PER GLI OSPITI',
      title: 'Domande Frequenti & Regole della Casa',
      subtitle: 'Tutto ciò che c’è da sapere per un soggiorno perfetto ad Atene.',
      directQuestion: 'Hai un’altra domanda o una richiesta speciale?',
      askHost: 'Parla direttamente con l’host NITSOPA 369',
      whatsappBtn: 'Scrivi su WhatsApp',
      phoneBtn: 'Chiama l’Host',
    },
    ES: {
      badge: 'INFORMACIÓN PARA HUÉSPEDES',
      title: 'Preguntas Frecuentes & Normas',
      subtitle: 'Todo lo que necesitas saber para una estancia inolvidable en Atenas.',
      directQuestion: '¿Tienes alguna otra duda o petición especial?',
      askHost: 'Contacta directamente con el anfitrión NITSOPA 369',
      whatsappBtn: 'Mensaje por WhatsApp',
      phoneBtn: 'Llamar al anfitrión',
    },
    FR: {
      badge: 'GUIDE PRATIQUE DU VOYAGEUR',
      title: 'Foire Aux Questions & Règles',
      subtitle: 'Tout ce que vous devez savoir pour un séjour serein à Athènes.',
      directQuestion: 'Vous avez une question spécifique ou une demande particulière ?',
      askHost: 'Échangez directement avec l’hôte NITSOPA 369',
      whatsappBtn: 'Écrire sur WhatsApp',
      phoneBtn: 'Appeler l’hôte',
    },
  }[currentLang];

  return (
    <section
      id="faq"
      className={`py-20 sm:py-28 border-b transition-colors ${
        theme === 'dark'
          ? 'bg-[#0F0F11] border-[#2E2E33]'
          : 'bg-[#F5F2EB] border-[#E7E3D8]'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.2em] mb-2 ${
              theme === 'dark' ? 'text-[#D4AF37]' : 'text-[#9E8058]'
            }`}
          >
            {headerTexts.badge}
          </p>
          <h2
            className={`font-condensed text-3xl sm:text-5xl font-bold uppercase tracking-tight leading-tight ${
              theme === 'dark' ? 'text-[#F4F4F5]' : 'text-[#1C1917]'
            }`}
          >
            {headerTexts.title}
          </h2>
          <p
            className={`mt-3 text-base sm:text-lg ${
              theme === 'dark' ? 'text-[#A1A1AA]' : 'text-[#78716C]'
            }`}
          >
            {headerTexts.subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => {
            const Icon = item.icon;
            const isOpen = openId === item.id;
            const questionText = item.question[currentLang];
            const answerText = item.answer[currentLang];
            const detailsList = item.details?.[currentLang];

            return (
              <div
                key={item.id}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  theme === 'dark'
                    ? isOpen
                      ? 'bg-[#18181B] border-[#D4AF37]/50 shadow-lg shadow-black/30'
                      : 'bg-[#141417] border-[#2E2E33] hover:border-stone-700'
                    : isOpen
                      ? 'bg-white border-[#9E8058]/60 shadow-md'
                      : 'bg-[#FAFAF9] border-[#E7E3D8] hover:border-stone-400'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <div
                      className={`p-2.5 rounded-lg shrink-0 transition-colors ${
                        isOpen
                          ? theme === 'dark'
                            ? 'bg-[#D4AF37]/20 text-[#D4AF37]'
                            : 'bg-[#9E8058]/15 text-[#9E8058]'
                          : theme === 'dark'
                            ? 'bg-[#1F1F23] text-stone-400'
                            : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`font-semibold text-base sm:text-lg tracking-tight ${
                        theme === 'dark'
                          ? isOpen
                            ? 'text-white'
                            : 'text-stone-200'
                          : isOpen
                            ? 'text-stone-950'
                            : 'text-stone-800'
                      }`}
                    >
                      {questionText}
                    </span>
                  </div>

                  <div
                    className={`p-1.5 rounded-full shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-amber-500' : 'text-stone-400'
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base leading-relaxed border-t border-inherit/40">
                        <p
                          className={
                            theme === 'dark' ? 'text-stone-300' : 'text-stone-600'
                          }
                        >
                          {answerText}
                        </p>

                        {detailsList && detailsList.length > 0 && (
                          <ul className="mt-3.5 space-y-1.5 text-xs sm:text-sm">
                            {detailsList.map((detail, idx) => (
                              <li
                                key={idx}
                                className={`flex items-start gap-2 ${
                                  theme === 'dark'
                                    ? 'text-stone-400'
                                    : 'text-stone-500'
                                }`}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${
                                    theme === 'dark'
                                      ? 'bg-[#D4AF37]'
                                      : 'bg-[#9E8058]'
                                  }`}
                                />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Direct Host Contact Banner */}
        <div
          className={`mt-12 p-6 sm:p-8 rounded-2xl border text-center flex flex-col sm:flex-row items-center justify-between gap-6 ${
            theme === 'dark'
              ? 'bg-[#18181B] border-[#2E2E33]'
              : 'bg-white border-[#E7E3D8]'
          }`}
        >
          <div className="text-left space-y-1">
            <h4
              className={`font-condensed text-xl font-bold uppercase tracking-tight ${
                theme === 'dark' ? 'text-[#F4F4F5]' : 'text-[#1C1917]'
              }`}
            >
              {headerTexts.directQuestion}
            </h4>
            <p
              className={`text-xs sm:text-sm ${
                theme === 'dark' ? 'text-stone-400' : 'text-stone-600'
              }`}
            >
              {headerTexts.askHost}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${PROPERTY_CONFIG.hostWhatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{headerTexts.whatsappBtn}</span>
            </a>
            <a
              href={`tel:${PROPERTY_CONFIG.hostPhoneRaw}`}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold border transition-colors ${
                theme === 'dark'
                  ? 'bg-[#0F0F11] border-[#2E2E33] text-stone-200 hover:text-white hover:border-[#D4AF37]'
                  : 'bg-[#FAFAF9] border-[#E7E3D8] text-stone-700 hover:text-stone-900 hover:border-stone-400'
              }`}
            >
              <span>{headerTexts.phoneBtn}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
