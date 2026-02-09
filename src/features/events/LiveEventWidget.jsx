import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Activity } from 'lucide-react';

// --- MOCK SERVICE (Symulacja API) ---
// W przyszłości podmienisz to na fetch() do API-Football
const MOCK_LIVE_MATCHES = [
  {
    id: 1,
    league: "Premier League",
    homeTeam: "Arsenal",
    awayTeam: "Liverpool",
    score: "1 - 1",
    minute: 34,
    bgImage: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?q=80&w=2023&auto=format&fit=crop", // Stadion
    status: "LIVE"
  },
  {
    id: 2,
    league: "La Liga",
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona",
    score: "0 - 0",
    minute: 12,
    bgImage: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=2038&auto=format&fit=crop", // Stadion piłkarski
    status: "LIVE"
  },
  {
    id: 3,
    league: "NBA",
    homeTeam: "Lakers",
    awayTeam: "Warriors",
    score: "45 - 42",
    minute: "Q2 08:30",
    bgImage: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2069&auto=format&fit=crop", // Koszykówka
    status: "LIVE"
  }
];

export const LiveEventWidget = () => {
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [matchData, setMatchData] = useState(MOCK_LIVE_MATCHES[0]);
  const [simulatedMinute, setSimulatedMinute] = useState(matchData.minute);

  // Efekt 1: Symulacja upływu czasu (Zegar meczowy)
  useEffect(() => {
    if (typeof simulatedMinute === 'string') return; // Pomiń dla NBA (format tekstowy)
    
    const timer = setInterval(() => {
      setSimulatedMinute(prev => (prev < 90 ? prev + 1 : prev));
    }, 5000); // Przyspieszony czas dla efektu demo (co 5 sekund dodaje minutę)

    return () => clearInterval(timer);
  }, [currentMatchIndex]);

  // Efekt 2: Rotacja meczów co 10 sekund (żeby pokazać, że "dużo się dzieje")
  useEffect(() => {
    const rotation = setInterval(() => {
      setCurrentMatchIndex(prev => (prev + 1) % MOCK_LIVE_MATCHES.length);
    }, 10000);
    return () => clearInterval(rotation);
  }, []);

  // Aktualizacja danych po zmianie indeksu
  useEffect(() => {
    setMatchData(MOCK_LIVE_MATCHES[currentMatchIndex]);
    setSimulatedMinute(MOCK_LIVE_MATCHES[currentMatchIndex].minute);
  }, [currentMatchIndex]);

  return (
    <div className="relative w-full h-[500px] lg:h-[600px] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-brand-surface group">
      
      <AnimatePresence mode='wait'>
        <motion.div
          key={matchData.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Tło Zdjęcia z API */}
          <img 
            src={matchData.bgImage} 
            alt="Stadium" 
            className="w-full h-full object-cover opacity-60 transition-transform duration-[10s] ease-linear scale-100 group-hover:scale-110"
          />
          {/* Gradient dla czytelności */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-brand-dark/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* UI Widgetu */}
      <div className="absolute inset-0 flex flex-col justify-end p-8">
        
        {/* Górny Tag LIVE */}
        <div className="absolute top-6 right-6 flex items-center gap-2 bg-red-600/90 backdrop-blur-sm text-white px-3 py-1 rounded text-xs font-bold animate-pulse">
          <span className="w-2 h-2 bg-white rounded-full" />
          LIVE
        </div>

        {/* Info o lidze */}
        <motion.div 
          key={matchData.league}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-brand-accent font-bold uppercase tracking-widest text-sm mb-2"
        >
          {matchData.league}
        </motion.div>

        {/* Wynik i Zespoły */}
        <div className="flex items-end justify-between">
          <div>
            <motion.h3 
              key={matchData.homeTeam}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-3xl md:text-5xl font-bold text-white leading-tight"
            >
              {matchData.homeTeam} <span className="text-brand-muted mx-2">vs</span> <br/>
              {matchData.awayTeam}
            </motion.h3>
          </div>
          
          <div className="text-right">
             <div className="text-4xl md:text-6xl font-mono font-bold text-white mb-1">
                {matchData.score}
             </div>
          </div>
        </div>

        {/* Pasek postępu / Czas */}
        <div className="mt-6 border-t border-slate-600 pt-4 flex justify-between items-center text-sm font-mono text-brand-muted">
           <div className="flex items-center gap-2 text-brand-accent">
             <Clock size={16} />
             <span className="text-white font-bold text-lg">
               {typeof simulatedMinute === 'number' ? `${simulatedMinute}'` : simulatedMinute}
             </span>
           </div>
           
           <div className="flex items-center gap-2">
             <Activity size={16} className="text-brand-rivalry" />
             <span>Wysoka Intensywność</span>
           </div>
        </div>

      </div>

      {/* Ozdobna ramka UI (Skauting style) */}
      <div className="absolute top-0 left-0 w-full h-full border-2 border-slate-700/50 rounded-2xl pointer-events-none">
         <div className="absolute top-1/2 left-0 w-2 h-16 bg-brand-accent -translate-y-1/2 rounded-r" />
         <div className="absolute top-1/2 right-0 w-2 h-16 bg-brand-rivalry -translate-y-1/2 rounded-l" />
      </div>
    </div>
  );
};