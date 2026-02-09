import React from 'react';

export default function Events() {
  const events = [
    {
      id: 1,
      title: "Finał Ligi Mistrzów",
      date: "15.06.2026",
      location: "Londyn, Wembley",
      category: "Piłka nożna"
    },
    {
      id: 2,
      title: "Wimbledon 2026",
      date: "28.06.2026",
      location: "Londyn, All England Club",
      category: "Tenis"
    },
    {
      id: 3,
      title: "NBA Finals",
      date: "05.06.2026",
      location: "USA",
      category: "Koszykówka"
    }
  ];

  return (
    // ZMIANA: bg-brand-light -> bg-brand-dark
    <div className="min-h-screen bg-brand-dark text-brand-text">
      <div className="container mx-auto px-4 py-20 pt-32"> {/* Dodatkowy padding góra dla Navbara */}
        <h1 className="text-4xl font-bold text-white mb-8 border-l-4 border-brand-accent pl-4">
          Nadchodzące Wydarzenia
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            // ZMIANA: bg-white -> bg-brand-surface, dodany border
            <div key={event.id} className="bg-brand-surface border border-slate-800 rounded-xl overflow-hidden hover:border-brand-accent transition-all group shadow-lg">
              <div className="h-48 bg-gradient-to-br from-brand-dark to-slate-800 relative">
                 {/* Ozdobnik */}
                 <div className="absolute inset-0 bg-brand-accent/5"></div>
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-brand-accent/20 text-brand-accent text-xs font-bold uppercase tracking-wider rounded mb-3">
                  {event.category}
                </span>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-accent transition-colors">
                  {event.title}
                </h3>
                <div className="text-brand-muted text-sm space-y-1 mb-6">
                    <p>📅 {event.date}</p>
                    <p>📍 {event.location}</p>
                </div>
                <button className="w-full bg-transparent border border-brand-accent text-brand-accent py-3 rounded-lg font-bold hover:bg-brand-accent hover:text-brand-dark transition-all shadow-glow-green">
                  Zobacz szczegóły
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}