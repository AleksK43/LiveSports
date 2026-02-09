import React from 'react';

export default function Contact() {
  return (
    // ZMIANA: bg-brand-light -> bg-brand-dark
    <div className="min-h-screen bg-brand-dark text-brand-text">
      <div className="container mx-auto px-4 py-20 pt-32">
        <h1 className="text-4xl font-bold text-white mb-8 border-l-4 border-brand-rivalry pl-4">
          Kontakt
        </h1>
        
        {/* ZMIANA: bg-white -> bg-brand-surface */}
        <div className="max-w-2xl mx-auto bg-brand-surface border border-slate-800 rounded-2xl shadow-2xl p-8 md:p-12">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-brand-muted uppercase tracking-wider mb-2">
                Imię i nazwisko
              </label>
              <input
                type="text"
                id="name"
                // ZMIANA: Style inputów na ciemne
                className="w-full px-4 py-3 bg-brand-dark border border-slate-700 rounded-lg text-white focus:ring-1 focus:ring-brand-rivalry focus:border-brand-rivalry outline-none transition-all placeholder:text-slate-600"
                placeholder="Jan Kowalski"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brand-muted uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 bg-brand-dark border border-slate-700 rounded-lg text-white focus:ring-1 focus:ring-brand-rivalry focus:border-brand-rivalry outline-none transition-all placeholder:text-slate-600"
                placeholder="jan@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-brand-muted uppercase tracking-wider mb-2">
                Wiadomość
              </label>
              <textarea
                id="message"
                rows="5"
                className="w-full px-4 py-3 bg-brand-dark border border-slate-700 rounded-lg text-white focus:ring-1 focus:ring-brand-rivalry focus:border-brand-rivalry outline-none transition-all placeholder:text-slate-600"
                placeholder="Twoja wiadomość..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-rivalry text-white py-4 rounded-lg font-bold hover:bg-amber-600 transition-colors shadow-glow-orange text-lg"
            >
              Wyślij wiadomość
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}