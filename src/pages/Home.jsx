import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
// 1. IMPORT HELMET (DODANE)
import { Helmet } from 'react-helmet-async';
import { 
  Trophy, Globe, ChevronRight, PlayCircle, Target, Zap, 
  Youtube, Ticket, ClipboardList, Activity, 
  UserPlus, BookOpen, Video, Star, ArrowRight 
} from 'lucide-react';
import { ContactSection } from '../features/contact/ContactSection'; 
import { LiveEventWidget } from '../features/events/LiveEventWidget'; 

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// --- UI COMPONENTS ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
      isScrolled 
        ? 'bg-brand-dark/90 backdrop-blur-md border-slate-800 py-4 shadow-xl' 
        : 'bg-transparent border-transparent py-6'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter text-white">
          <div className="w-8 h-8 bg-brand-accent rounded flex items-center justify-center text-brand-dark">
            <Zap size={20} fill="currentColor" />
          </div>
          <span>LIVE<span className="text-brand-accent">SPORT</span>EVENTS</span>
        </div>
        
        {/* Menu Desktop */}
        <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-400">
          <a href="#start" className="hover:text-brand-accent transition-colors uppercase tracking-wide text-xs">{t('nav.start')}</a>
          <a href="#jak-zaczac" className="hover:text-brand-accent transition-colors uppercase tracking-wide text-xs">{t('nav.howTo')}</a>
          <a href="#opis-pracy" className="hover:text-brand-accent transition-colors uppercase tracking-wide text-xs">{t('nav.jobs')}</a>
          <a href="#wideo" className="hover:text-brand-accent transition-colors uppercase tracking-wide text-xs">{t('nav.video')}</a>
        </div>

        <div className="flex items-center gap-6">
          {/* Language Switcher */}
          <div className="flex items-center gap-2 text-xs font-bold">
            {['pl', 'en', 'es'].map((lang) => (
              <button
                key={lang}
                onClick={() => changeLang(lang)}
                className={`uppercase transition-colors ${
                  i18n.language === lang 
                    ? 'text-brand-accent' 
                    : 'text-slate-600 hover:text-slate-300'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <button 
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            className="hidden md:flex bg-brand-surface border border-brand-accent/30 text-brand-accent px-6 py-2 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-brand-accent hover:text-brand-dark transition-all shadow-glow-accent"
          >
            {t('nav.scoutZone')}
          </button>
        </div>
      </div>
    </nav>
  );
};

const JobCard = ({ icon: Icon, title, desc }) => (
  <motion.div 
    variants={itemVariants}
    className="bg-brand-surface border border-slate-800 p-8 rounded-2xl hover:border-brand-accent/50 transition-colors duration-300 group relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500 text-brand-accent">
      <Icon size={120} />
    </div>
    
    <div className="w-14 h-14 bg-brand-dark border border-slate-700 rounded-xl flex items-center justify-center text-brand-accent mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-glow-accent">
      <Icon size={28} />
    </div>
    
    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-brand-accent transition-colors">{title}</h3>
    <p className="text-brand-muted leading-relaxed text-sm">{desc}</p>
  </motion.div>
);

// --- MAIN PAGE ---

const HomePage = () => {
  const { t } = useTranslation();

  const steps = [
    { id: 1, icon: UserPlus, title: t('howTo.steps.1.title'), desc: t('howTo.steps.1.desc') },
    { id: 2, icon: BookOpen, title: t('howTo.steps.2.title'), desc: t('howTo.steps.2.desc') },
    { id: 3, icon: Video, title: t('howTo.steps.3.title'), desc: t('howTo.steps.3.desc') },
    { id: 4, icon: Star, title: t('howTo.steps.4.title'), desc: t('howTo.steps.4.desc') }
  ];

  return (
    <div className="bg-brand-dark min-h-screen font-sans text-brand-text selection:bg-brand-accent selection:text-white overflow-x-hidden">
      
      {/* 2. SEO SECTION (DODANE) */}
      <Helmet>
        <title>{t('seo.home.title')}</title>
        <meta name="description" content={t('seo.home.description')} />
        <meta name="keywords" content={t('seo.home.keywords')} />
        
        {/* Open Graph / Facebook - ważne dla udostępniania w social mediach */}
        <meta property="og:title" content={t('seo.home.title')} />
        <meta property="og:description" content={t('seo.home.description')} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('seo.home.title')} />
        <meta name="twitter:description" content={t('seo.home.description')} />
        
        <link rel="canonical" href="https://twoja-domena.pl/" />
      </Helmet>

      <Navbar />

      {/* HERO SECTION */}
      <section id="start" className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-brand-accent/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-brand-rivalry/5 rounded-full blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          </div>
        </div>

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 text-brand-rivalry font-bold text-xs uppercase tracking-widest mb-6 border border-brand-rivalry/20 bg-brand-rivalry/10 px-3 py-1 rounded">
              <span className="w-2 h-2 bg-brand-rivalry rounded-full animate-pulse"/>
              {t('hero.tag')}
            </motion.div>

            {/* H1 jest kluczowe dla SEO - zostaje tak jak było */}
            <motion.h1 variants={itemVariants} className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              {t('hero.title1')} <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-fuchsia-300">
                {t('hero.title2')}
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg text-brand-muted mb-8 max-w-lg border-l-4 border-brand-accent pl-4">
              {t('hero.desc')}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="bg-brand-accent text-brand-dark px-8 py-4 rounded-lg font-bold hover:bg-fuchsia-400 transition-all shadow-glow-accent flex items-center justify-center gap-2 group"
              >
                {t('hero.btnApply')}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                 onClick={() => document.getElementById('wideo').scrollIntoView({ behavior: 'smooth' })}
                 className="px-8 py-4 rounded-lg font-bold text-white border border-slate-700 hover:border-brand-text hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
              >
                <PlayCircle className="w-5 h-5 text-brand-rivalry" />
                {t('hero.btnVideo')}
              </button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block"
          >
             <LiveEventWidget />
            <div className="absolute -z-10 top-6 -right-6 w-full h-full border border-slate-800 rounded-2xl bg-brand-dark/50" />
          </motion.div>
        </div>
      </section>

      {/* VIDEO SECTION */}
      <section id="wideo" className="py-24 bg-brand-surface relative border-t border-slate-800">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-dark border border-slate-800 text-brand-muted text-sm font-medium mb-6">
              <Youtube size={16} className="text-red-500" />
              {t('video.tag')}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{t('video.title')}</h2>
            <p className="text-brand-muted max-w-2xl mx-auto">
              {t('video.desc')}
            </p>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(194,95,246,0.15)] border border-slate-700 bg-brand-dark"
          >
            <div className="relative pt-[56.25%]">
              <iframe 
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/ZWmhcn9axiQ" 
                title={t('video.title')} // Dodano title dla accessibility/SEO
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-accent rounded-tl-xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-rivalry rounded-br-xl pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* HOW TO START */}
      <section id="jak-zaczac" className="py-24 bg-brand-dark relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {t('howTo.title')} <span className="text-brand-accent">{t('howTo.subtitle')}</span>
            </h2>
            <p className="text-brand-muted max-w-xl mx-auto">
              {t('howTo.desc')}
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-slate-800 -z-10" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {steps.map((step, index) => (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="relative group"
                >
                  <div className="w-24 h-24 mx-auto bg-brand-surface border border-slate-700 rounded-full flex items-center justify-center mb-6 group-hover:border-brand-accent group-hover:shadow-glow-accent transition-all duration-300 relative z-10">
                    <step.icon size={32} className="text-white group-hover:text-brand-accent transition-colors" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-accent text-brand-dark font-bold rounded-full flex items-center justify-center border-4 border-brand-dark">
                      {step.id}
                    </div>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 -right-[50%] w-full flex justify-center items-center pointer-events-none opacity-20">
                      <ArrowRight size={24} className="text-brand-muted" />
                    </div>
                  )}

                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-accent transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-brand-muted text-sm leading-relaxed px-2">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-16"
          >
             <button 
               onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
               className="text-brand-accent font-bold uppercase tracking-wider text-sm border-b border-brand-accent pb-1 hover:text-white hover:border-white transition-colors"
             >
               {t('howTo.cta')}
             </button>
          </motion.div>
        </div>
      </section>

      {/* JOB DESCRIPTION */}
      <section id="opis-pracy" className="py-24 bg-brand-surface border-y border-slate-800 relative overflow-hidden">
        <div className="absolute left-0 top-1/4 w-96 h-96 bg-brand-rivalry/5 blur-[120px] rounded-full" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {t('jobs.title')} <span className="text-brand-accent">{t('jobs.subtitle')}</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-accent to-brand-rivalry mx-auto rounded-full" />
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            <JobCard 
              icon={ClipboardList}
              title={t('jobs.cards.1.title')}
              desc={t('jobs.cards.1.desc')}
            />
            <JobCard 
              icon={Activity}
              title={t('jobs.cards.2.title')}
              desc={t('jobs.cards.2.desc')}
            />
            <JobCard 
              icon={Ticket}
              title={t('jobs.cards.3.title')}
              desc={t('jobs.cards.3.desc')}
            />
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 bg-brand-dark">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: t('stats.countries'), value: '36' },
              { label: t('stats.disciplines'), value: '10+' },
              { label: t('stats.matches'), value: '4k' },
              { label: t('stats.support'), value: '24/7' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-brand-muted uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-4xl mx-auto bg-gradient-to-b from-brand-surface to-brand-dark border border-slate-800 p-12 rounded-3xl relative overflow-hidden group hover:border-brand-rivalry/50 transition-colors duration-500 shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-rivalry to-transparent opacity-50" />
            
            <Target className="w-16 h-16 text-brand-rivalry mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">{t('cta.title')}</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              {t('cta.desc')}
            </p>
            
            <button 
               onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
               className="px-10 py-4 bg-brand-surface border border-brand-accent text-brand-accent font-bold rounded-lg hover:bg-brand-accent hover:text-brand-dark transition-all duration-300 shadow-glow-accent uppercase tracking-wider transform hover:-translate-y-1"
            >
              {t('cta.btn')}
            </button>
          </div>
        </div>
      </section>
      
      {/* SEKCJA KONTAKTOWA (Zostawiona oryginalna nazwa importu) */}
      <ContactSection />

      <footer className="bg-brand-dark py-12 border-t border-slate-800 text-sm">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-slate-500">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Zap size={16} className="text-brand-accent" />
            <span className="font-bold text-slate-300">LIVESPORTEVENTS</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-brand-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Scout Portal</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;