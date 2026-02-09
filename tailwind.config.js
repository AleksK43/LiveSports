/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#020617',       // Slate-950: Głęboka noc
          surface: '#0F172A',    // Slate-900: Tło kart
          
          // NOWY KOLOR (R 194, G 95, B 246) -> HEX #C25FF6
          accent: '#C25FF6',     
          
          rivalry: '#F59E0B',    // Amber-500: Rywalizacja (Orange)
          text: '#F8FAFC',       // Slate-50: Tekst
          muted: '#64748B',      // Slate-500: Szary
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        // Zaktualizowany cień pod nowy kolor (fiolet)
        'glow-accent': '0 0 20px -5px rgba(194, 95, 246, 0.4)',
        'glow-orange': '0 0 20px -5px rgba(245, 158, 11, 0.4)',
      }
    },
  },
  plugins: [],
}