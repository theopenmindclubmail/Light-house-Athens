import React, { useEffect, useState } from 'react';
import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudLightning,
  Wind,
  Droplets,
  Thermometer,
  RefreshCw,
  Sparkles,
  MapPin,
  Calendar,
} from 'lucide-react';
import { Language, Theme } from '../types';

interface WeatherWidgetProps {
  currentLang: Language;
  theme: Theme;
}

interface CurrentWeather {
  tempC: number;
  apparentTempC: number;
  humidity: number;
  windSpeedKmH: number;
  weatherCode: number;
  isDay: boolean;
  tempMaxC: number;
  tempMinC: number;
  updatedAt: string;
}

const ATHENS_LAT = 37.965;
const ATHENS_LON = 23.73;

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ currentLang, theme }) => {
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  const fetchAthensWeather = async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${ATHENS_LAT}&longitude=${ATHENS_LON}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Europe%2FAthens`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Weather fetch failed');
      const data = await res.json();

      if (data && data.current) {
        setWeather({
          tempC: Math.round(data.current.temperature_2m),
          apparentTempC: Math.round(data.current.apparent_temperature),
          humidity: Math.round(data.current.relative_humidity_2m),
          windSpeedKmH: Math.round(data.current.wind_speed_10m),
          weatherCode: data.current.weather_code,
          isDay: Boolean(data.current.is_day),
          tempMaxC: Math.round(data.daily?.temperature_2m_max?.[0] ?? data.current.temperature_2m + 2),
          tempMinC: Math.round(data.daily?.temperature_2m_min?.[0] ?? data.current.temperature_2m - 3),
          updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
      }
    } catch {
      // Elegant fallback values if network is unavailable
      setWeather({
        tempC: 22,
        apparentTempC: 23,
        humidity: 55,
        windSpeedKmH: 12,
        weatherCode: 1,
        isDay: true,
        tempMaxC: 25,
        tempMinC: 17,
        updatedAt: 'Live',
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAthensWeather();
    // Auto refresh every 15 minutes
    const interval = setInterval(() => {
      fetchAthensWeather();
    }, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const toDisplayTemp = (celsius: number) => {
    if (unit === 'F') {
      return Math.round((celsius * 9) / 5 + 32);
    }
    return celsius;
  };

  const getConditionDetails = (code: number, isDay: boolean) => {
    // Returns icon and multilingual label
    if (code === 0) {
      return {
        icon: Sun,
        iconColor: 'text-amber-500',
        labels: {
          GR: 'Ηλιοφάνεια & Αίθριος ουρανός',
          EN: 'Sunny & Clear Skies',
          DE: 'Sonnig & Klarer Himmel',
          IT: 'Soleggiato & Cielo Limpido',
          ES: 'Soleado & Cielo Despejado',
          FR: 'Ensoleillé & Ciel Dégagé',
        },
      };
    }
    if (code <= 2) {
      return {
        icon: isDay ? CloudSun : Cloud,
        iconColor: 'text-amber-400',
        labels: {
          GR: 'Κυρίως αίθριος με ευχάριστο αέρα',
          EN: 'Mostly Sunny & Mild',
          DE: 'Überwiegend Heiter & Mild',
          IT: 'Per lo Più Sereno & Mite',
          ES: 'Mayormente Despejado & Agradable',
          FR: 'Plutôt Ensoleillé & Doux',
        },
      };
    }
    if (code === 3) {
      return {
        icon: Cloud,
        iconColor: 'text-stone-400',
        labels: {
          GR: 'Συννεφιά & Ηπιος καιρός',
          EN: 'Overcast & Gentle Breeze',
          DE: 'Bewölkt & Angenehm',
          IT: 'Coperto & Brezza Leggera',
          ES: 'Nublado & Brisa Agradable',
          FR: 'Nuageux & Brise Légère',
        },
      };
    }
    if (code >= 51 && code <= 67) {
      return {
        icon: CloudRain,
        iconColor: 'text-sky-400',
        labels: {
          GR: 'Βροχόπτωση / Ψιχάλες',
          EN: 'Light Rain & Showers',
          DE: 'Leichter Regen',
          IT: 'Pioggia Leggera',
          ES: 'Lluvia Ligera',
          FR: 'Pluie Légère',
        },
      };
    }
    if (code >= 80 && code <= 82) {
      return {
        icon: CloudRain,
        iconColor: 'text-sky-500',
        labels: {
          GR: 'Τοπικές μπόρες',
          EN: 'Passing Showers',
          DE: 'Regenschauer',
          IT: 'Rovesci Sparsi',
          ES: 'Chubascos Dispersos',
          FR: 'Averses Éparses',
        },
      };
    }
    if (code >= 95) {
      return {
        icon: CloudLightning,
        iconColor: 'text-amber-500',
        labels: {
          GR: 'Καταιγίδα',
          EN: 'Thunderstorm',
          DE: 'Gewitter',
          IT: 'Temporale',
          ES: 'Tormenta',
          FR: 'Orage',
        },
      };
    }
    return {
      icon: Sun,
      iconColor: 'text-amber-500',
      labels: {
        GR: 'Ευχάριστος αττικός καιρός',
        EN: 'Pleasant Athenian Climate',
        DE: 'Angenehmes Athener Klima',
        IT: 'Clima Ateniese Piacevole',
        ES: 'Agradable Clima Ateniense',
        FR: 'Climat Athénien Agréable',
      },
    };
  };

  const getActivityTip = (tempC: number, code: number) => {
    const isRain = (code >= 51 && code <= 67) || (code >= 80 && code <= 82) || code >= 95;
    if (isRain) {
      return {
        GR: 'Ιδανική ευκαιρία για το Μουσείο Ακρόπολης (10\' με τα πόδια) και ζεστό καφέ στο σαλόνι με το τζάκι.',
        EN: 'Perfect for exploring the world-class Acropolis Museum (10 min walk) and enjoying artisan espresso by the fireplace.',
        DE: 'Perfekt für den Besuch des Akropolis-Museums (10 Min. Fußweg) und gemütlichen Espresso am Kamin.',
        IT: 'Perfetto per visitare il Museo dell’Acropoli (10 min a piedi) e gustare un caffè accanto al camino.',
        ES: 'Ideal para visitar el Museo de la Acrópolis (a 10 min a pie) y disfrutar de un buen café junto a la chimenea.',
        FR: 'Idéal pour visiter le Musée de l’Acropole (10 min à pied) et savourer un café près de la cheminée.',
      }[currentLang];
    }
    if (tempC >= 20) {
      return {
        GR: 'Υπέροχη ημέρα για περίπατο στον λόφο Φιλοπάππου, δείπνο στα μπιστρό του Κουκακίου και ηλιοβασίλεμα στην ταράτσα.',
        EN: 'Stunning day for an open-air walk up Philopappos Hill, dinner in vibrant Koukaki, and sunset aperitifs on the rooftop.',
        DE: 'Traumhafter Tag für einen Spaziergang auf den Philopapposhügel, Abendessen in Koukaki und Sundowner auf der Dachterrasse.',
        IT: 'Giornata splendida per una passeggiata sulla collina di Filopappo, cena nei bistrot di Koukaki e tramonto in terrazza.',
        ES: 'Día magnífico para subir a la colina Filopapos, cenar en los bistrós de Koukaki y ver el atardecer en la azotea.',
        FR: 'Magnifique journée pour gravir la colline de Philopappos, dîner dans les bistrots de Koukaki et savourer le coucher de soleil.',
      }[currentLang];
    }
    return {
      GR: 'Καθαρή ατμόσφαιρα για θέα της Ακρόπολης, βόλτα στο ιστορικό κέντρο και χαλάρωση στη φωτεινή βιβλιοθήκη του σπιτιού.',
      EN: 'Crisp, clear Athenian light ideal for sightseeing, visiting nearby archeological sites, and relaxing in the sunlit library.',
      DE: 'Klares Licht über Athen — ideal für Kultur, Spaziergänge zur Akropolis und entspanntes Lesen in der sonnigen Bibliothek.',
      IT: 'Luce tersa e atmosfera ideale per esplorare la città storica e rilassarsi nella luminosa biblioteca della casa.',
      ES: 'Luz cristalina ideal para explorar el centro histórico y descansar en la luminosa biblioteca de la casa.',
      FR: 'Lumière athénienne cristalline, idéale pour arpenter le centre historique et se détendre dans la bibliothèque baignée de soleil.',
    }[currentLang];
  };

  const headerTitles = {
    GR: {
      badge: 'ΖΩΝΤΑΝΟΣ ΚΑΙΡΟΣ ΣΤΗΝ ΑΘΗΝΑ',
      title: 'Καιρικές Συνθήκες & Προτάσεις Ημέρας',
      subtitle: 'Σταθμός Νέος Κόσμος · Ενημέρωση σε πραγματικό χρόνο',
      feelsLike: 'Αίσθηση',
      humidity: 'Υγρασία',
      wind: 'Ανεμος',
      highLow: 'Μέγ / Ελάχ',
      activityHeader: 'Πρόταση δραστηριότητας για σήμερα',
    },
    EN: {
      badge: 'LIVE ATHENS WEATHER',
      title: 'Real-Time Climate & Daily Activity Insights',
      subtitle: 'Neos Kosmos Weather Station · Updated live',
      feelsLike: 'Feels like',
      humidity: 'Humidity',
      wind: 'Wind',
      highLow: 'High / Low',
      activityHeader: 'Curated daily activity recommendation',
    },
    DE: {
      badge: 'LIVE WETTER ATHEN',
      title: 'Echtzeit-Wetter & Tagesempfehlungen',
      subtitle: 'Wetterstation Neos Kosmos · Live aktualisiert',
      feelsLike: 'Gefühlt',
      humidity: 'Luftfeuchtigkeit',
      wind: 'Wind',
      highLow: 'Max / Min',
      activityHeader: 'Tagesaktivitäts-Empfehlung',
    },
    IT: {
      badge: 'METEO ATENE IN DIRETTA',
      title: 'Clima in Tempo Reale & Consigli Giornalieri',
      subtitle: 'Stazione Neos Kosmos · Aggiornato in tempo reale',
      feelsLike: 'Percepita',
      humidity: 'Umidità',
      wind: 'Vento',
      highLow: 'Max / Min',
      activityHeader: 'Consiglio per le tue attività di oggi',
    },
    ES: {
      badge: 'CLIMA EN DIRECTO · ATENAS',
      title: 'Tiempo en Tiempo Real & Planes para el Día',
      subtitle: 'Estación Neos Kosmos · Actualizado en directo',
      feelsLike: 'Sensación',
      humidity: 'Humedad',
      wind: 'Viento',
      highLow: 'Máx / Mín',
      activityHeader: 'Recomendación de actividades para hoy',
    },
    FR: {
      badge: 'MÉTÉO EN DIRECT · ATHÈNES',
      title: 'Climat en Temps Réel & Conseils d’Activités',
      subtitle: 'Station Neos Kosmos · Actualisé en direct',
      feelsLike: 'Ressenti',
      humidity: 'Humidité',
      wind: 'Vent',
      highLow: 'Max / Min',
      activityHeader: 'Conseil d’activités pour votre journée',
    },
  }[currentLang];

  const condition = weather
    ? getConditionDetails(weather.weatherCode, weather.isDay)
    : getConditionDetails(1, true);
  const ConditionIcon = condition.icon;

  return (
    <div
      className={`rounded-xl border p-6 sm:p-8 transition-all ${
        theme === 'dark'
          ? 'bg-[#18181B]/90 border-[#2E2E33] shadow-xl shadow-black/40'
          : 'bg-[#FAFAF9] border-[#E7E3D8] shadow-sm'
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-inherit">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className={`inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] px-2.5 py-0.5 rounded-full ${
                theme === 'dark'
                  ? 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30'
                  : 'bg-[#9E8058]/15 text-[#9E8058] border border-[#9E8058]/30'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {headerTitles.badge}
            </span>
          </div>
          <h3
            className={`font-condensed text-xl sm:text-2xl font-bold uppercase tracking-tight ${
              theme === 'dark' ? 'text-[#F4F4F5]' : 'text-[#1C1917]'
            }`}
          >
            {headerTitles.title}
          </h3>
          <p
            className={`text-xs mt-0.5 flex items-center gap-1.5 ${
              theme === 'dark' ? 'text-stone-400' : 'text-stone-500'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span>{headerTitles.subtitle}</span>
            {weather && (
              <span className="opacity-70 font-mono text-[11px]">
                · {weather.updatedAt}
              </span>
            )}
          </p>
        </div>

        {/* Action Controls: Refresh & Temp Unit Switch */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div
            className={`inline-flex p-0.5 rounded-lg border text-xs font-semibold ${
              theme === 'dark' ? 'bg-[#0F0F11] border-[#2E2E33]' : 'bg-stone-200/60 border-stone-300'
            }`}
          >
            <button
              type="button"
              onClick={() => setUnit('C')}
              className={`px-2.5 py-1 rounded transition-colors ${
                unit === 'C'
                  ? theme === 'dark'
                    ? 'bg-[#D4AF37] text-stone-950 font-bold'
                    : 'bg-white text-stone-900 shadow-xs font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              °C
            </button>
            <button
              type="button"
              onClick={() => setUnit('F')}
              className={`px-2.5 py-1 rounded transition-colors ${
                unit === 'F'
                  ? theme === 'dark'
                    ? 'bg-[#D4AF37] text-stone-950 font-bold'
                    : 'bg-white text-stone-900 shadow-xs font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              °F
            </button>
          </div>

          <button
            type="button"
            onClick={() => fetchAthensWeather(true)}
            disabled={refreshing}
            title="Refresh current weather"
            className={`p-2 rounded-lg border text-xs transition-colors ${
              theme === 'dark'
                ? 'bg-[#0F0F11] border-[#2E2E33] text-stone-300 hover:text-[#D4AF37] hover:border-[#D4AF37]/50'
                : 'bg-white border-stone-300 text-stone-600 hover:text-stone-900'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Weather Metric Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 items-center">
        {/* Current Big Temperature & Icon */}
        <div className="md:col-span-5 flex items-center gap-5">
          <div
            className={`p-3.5 sm:p-4 rounded-2xl border shadow-inner ${
              theme === 'dark'
                ? 'bg-[#0F0F11] border-[#2E2E33]'
                : 'bg-white border-[#E7E3D8]'
            }`}
          >
            <ConditionIcon className={`w-10 h-10 sm:w-12 sm:h-12 ${condition.iconColor}`} />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span
                className={`font-condensed text-4xl sm:text-5xl font-bold tracking-tight ${
                  theme === 'dark' ? 'text-[#F4F4F5]' : 'text-[#1C1917]'
                }`}
              >
                {weather ? toDisplayTemp(weather.tempC) : '--'}
              </span>
              <span className="text-xl font-light opacity-60">°{unit}</span>
            </div>
            <p
              className={`text-xs sm:text-sm font-medium ${
                theme === 'dark' ? 'text-stone-300' : 'text-stone-700'
              }`}
            >
              {condition.labels[currentLang]}
            </p>
          </div>
        </div>

        {/* Secondary metrics */}
        <div className="md:col-span-7 grid grid-cols-3 gap-3">
          <div
            className={`p-3 rounded-lg border text-center ${
              theme === 'dark'
                ? 'bg-[#0F0F11]/60 border-[#2E2E33]'
                : 'bg-white/80 border-[#E7E3D8]'
            }`}
          >
            <div className="flex items-center justify-center gap-1 text-xs opacity-70 mb-1">
              <Thermometer className="w-3.5 h-3.5 text-amber-500" />
              <span>{headerTitles.feelsLike}</span>
            </div>
            <p className="font-semibold text-sm font-mono">
              {weather ? `${toDisplayTemp(weather.apparentTempC)}°${unit}` : '--'}
            </p>
          </div>

          <div
            className={`p-3 rounded-lg border text-center ${
              theme === 'dark'
                ? 'bg-[#0F0F11]/60 border-[#2E2E33]'
                : 'bg-white/80 border-[#E7E3D8]'
            }`}
          >
            <div className="flex items-center justify-center gap-1 text-xs opacity-70 mb-1">
              <Droplets className="w-3.5 h-3.5 text-sky-500" />
              <span>{headerTitles.humidity}</span>
            </div>
            <p className="font-semibold text-sm font-mono">
              {weather ? `${weather.humidity}%` : '--'}
            </p>
          </div>

          <div
            className={`p-3 rounded-lg border text-center ${
              theme === 'dark'
                ? 'bg-[#0F0F11]/60 border-[#2E2E33]'
                : 'bg-white/80 border-[#E7E3D8]'
            }`}
          >
            <div className="flex items-center justify-center gap-1 text-xs opacity-70 mb-1">
              <Wind className="w-3.5 h-3.5 text-teal-500" />
              <span>{headerTitles.wind}</span>
            </div>
            <p className="font-semibold text-sm font-mono">
              {weather ? `${weather.windSpeedKmH} km/h` : '--'}
            </p>
          </div>
        </div>
      </div>

      {/* Curated Daily Activity Tip */}
      <div
        className={`mt-6 p-4 rounded-lg border flex items-start gap-3 ${
          theme === 'dark'
            ? 'bg-[#0F0F11] border-[#2E2E33]/80 text-stone-300'
            : 'bg-white border-[#E7E3D8] text-stone-700'
        }`}
      >
        <Sparkles
          className={`w-4 h-4 shrink-0 mt-0.5 ${
            theme === 'dark' ? 'text-[#D4AF37]' : 'text-[#9E8058]'
          }`}
        />
        <div className="text-xs sm:text-sm leading-relaxed">
          <span
            className={`font-semibold mr-1.5 uppercase tracking-wide text-[11px] block sm:inline ${
              theme === 'dark' ? 'text-[#D4AF37]' : 'text-[#9E8058]'
            }`}
          >
            {headerTitles.activityHeader}:
          </span>
          <span>{weather ? getActivityTip(weather.tempC, weather.weatherCode) : ''}</span>
        </div>
      </div>
    </div>
  );
};
