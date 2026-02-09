import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail, Send, CheckCircle, Globe, AlertCircle, Loader2 } from 'lucide-react';
import DOMPurify from 'dompurify'; // Biblioteka do sanityzacji XSS


const InputGroup = ({ label, type = "text", placeholder, name, value, onChange, error, required }) => (
  <div className="flex flex-col space-y-2">
    <label className="text-sm font-medium text-brand-muted uppercase tracking-wider flex justify-between">
      <span>{label} {required && <span className="text-brand-accent">*</span>}</span>
      {/* Wyświetlanie błędu */}
      {error && <span className="text-red-500 text-xs normal-case flex items-center gap-1"><AlertCircle size={12} /> {error}</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      // Dodajemy warunkowe style dla błędu (czerwona ramka)
      className={`w-full bg-white border rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-1 transition-all duration-300 placeholder:text-gray-400 ${
        error 
          ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
          : 'border-slate-300 focus:border-brand-accent focus:ring-brand-accent'
      }`}
    />
  </div>
);

const SelectGroup = ({ label, optionKeys, name, value, onChange, t }) => (
  <div className="flex flex-col space-y-2">
    <label className="text-sm font-medium text-brand-muted uppercase tracking-wider">
      {label}
    </label>
    <div className="relative">
      <select 
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-brand-accent appearance-none cursor-pointer"
      >
        {optionKeys.map(key => (
          <option key={key} value={key}>
            {t(`contact.form.options.${key}`)}
          </option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
        ▼
      </div>
    </div>
  </div>
);

// --- GŁÓWNY KOMPONENT ---

export const ContactSection = () => {
  const { t } = useTranslation();
  
  // Stan formularza
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    country: '',
    city: '',
    subject: '',
    source: 'google',
    message: '',
    // HONEYPOT: Pole pułapka dla botów (ukryte w CSS)
    _gotcha: '' 
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const sourceOptions = ['google', 'social', 'job_ad', 'referral', 'other'];

  // --- LOGIKA WALIDACJI ---
  const validate = (data) => {
    let tempErrors = {};
    
    // Walidacja imienia (min 2 znaki, bez znaków specjalnych typu <> )
    if (!data.fullname.trim()) tempErrors.fullname = "To pole jest wymagane.";
    else if (data.fullname.length < 2) tempErrors.fullname = "Minimum 2 znaki.";
    
    // Walidacja Email (Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email) tempErrors.email = "Email jest wymagany.";
    else if (!emailRegex.test(data.email)) tempErrors.email = "Niepoprawny format email.";

    // Walidacja reszty pól
    if (!data.country.trim()) tempErrors.country = "Kraj jest wymagany.";
    if (!data.city.trim()) tempErrors.city = "Miasto jest wymagane.";
    if (!data.subject.trim()) tempErrors.subject = "Temat jest wymagany.";
    
    // Walidacja długości wiadomości (max 5000 znaków - ochrona przed Buffer Overflow na backendzie)
    if (data.message.length > 5000) tempErrors.message = "Wiadomość jest zbyt długa.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Czyścimy błąd edytowanego pola
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. SPRAWDZENIE HONEYPOT (Ochrona przed botami)
    if (formData._gotcha !== '') {
      // Jeśli bot wypełnił ukryte pole, udajemy sukces, ale nic nie wysyłamy
      console.warn("Bot detected via honeypot.");
      setStatus('success'); 
      return;
    }

    // 2. WALIDACJA
    if (!validate(formData)) {
      // Jeśli błędy, przerywamy
      return;
    }

    setStatus('submitting');

    // 3. SANITYZACJA (Ochrona przed XSS)
    // Czyścimy wszystkie stringi z potencjalnego kodu HTML/JS
    const sanitizedData = {
      fullname: DOMPurify.sanitize(formData.fullname),
      email: DOMPurify.sanitize(formData.email),
      country: DOMPurify.sanitize(formData.country),
      city: DOMPurify.sanitize(formData.city),
      subject: DOMPurify.sanitize(formData.subject),
      source: DOMPurify.sanitize(formData.source),
      message: DOMPurify.sanitize(formData.message),
    };

    try {
      // 4. WYSYŁKA (Symulacja lub prawdziwe API)
      
      // Tutaj normalnie byłby: await fetch('https://twoje-api.com/contact', { ... })
      // Symulujemy opóźnienie sieciowe:
      await new Promise(resolve => setTimeout(resolve, 2000));

      /* PRZYKŁAD PRAWDZIWEGO FETCH (odkomentuj jak będziesz miał endpoint):
      const response = await fetch('https://api.livesportevents.co.uk/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sanitizedData)
      });
      if (!response.ok) throw new Error('Server error');
      */

      setStatus('success');
      setFormData({ fullname: '', email: '', country: '', city: '', subject: '', source: 'google', message: '', _gotcha: '' });
      
      // Reset statusu po 5 sekundach
      setTimeout(() => setStatus('idle'), 5000);

    } catch (error) {
      console.error("Submission error:", error);
      setStatus('error');
    }
  };

  return (
    <section className="relative py-24 bg-brand-dark overflow-hidden" id="contact">
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-brand-accent/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-brand-rivalry/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* LEWA STRONA (Bez zmian) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('contact.header.title1')} <br />
              <span className="text-brand-accent">{t('contact.header.title2')}</span>
            </h2>
            <p className="text-lg text-brand-muted mb-10 leading-relaxed">
              {t('contact.header.desc')}
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-brand-surface rounded-full text-brand-accent shadow-lg border border-brand-accent/20">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">{t('contact.info.global.title')}</h4>
                  <p className="text-brand-muted">{t('contact.info.global.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-brand-surface rounded-full text-brand-accent shadow-lg border border-brand-accent/20">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">{t('contact.info.email.title')}</h4>
                  <p className="text-brand-muted">{t('contact.info.email.desc')}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* PRAWA STRONA - FORMULARZ */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-brand-surface p-8 md:p-10 rounded-2xl shadow-2xl border border-slate-800"
          >
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 space-y-4 animate-fade-in-up">
                <motion.div 
                  initial={{ scale: 0 }} animate={{ scale: 1 }} 
                  className="text-brand-accent"
                >
                  <CheckCircle className="w-20 h-20" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white">{t('contact.success.title')}</h3>
                <p className="text-brand-muted">{t('contact.success.desc')}</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-4 text-sm text-brand-accent hover:text-white underline"
                >
                  Wyślij kolejną wiadomość
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* HONEYPOT FIELD - Niewidoczne dla usera, widoczne dla bota */}
                <div style={{ display: 'none', opacity: 0, position: 'absolute', left: '-9999px' }} aria-hidden="true">
                  <input 
                    type="text" 
                    name="_gotcha" 
                    tabIndex="-1" 
                    value={formData._gotcha} 
                    onChange={handleChange} 
                    autoComplete="off"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <InputGroup 
                    label={t('contact.form.name')} 
                    name="fullname" 
                    value={formData.fullname}
                    onChange={handleChange}
                    error={errors.fullname}
                    placeholder={t('contact.form.name_ph')} 
                    required 
                  />
                  <InputGroup 
                    label={t('contact.form.email')} 
                    type="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder={t('contact.form.email_ph')} 
                    required 
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <InputGroup 
                    label={t('contact.form.country')} 
                    name="country" 
                    value={formData.country}
                    onChange={handleChange}
                    error={errors.country}
                    placeholder={t('contact.form.country_ph')} 
                    required 
                  />
                  <InputGroup 
                    label={t('contact.form.city')} 
                    name="city" 
                    value={formData.city}
                    onChange={handleChange}
                    error={errors.city}
                    placeholder={t('contact.form.city_ph')} 
                    required 
                  />
                </div>

                <InputGroup 
                  label={t('contact.form.subject')} 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  error={errors.subject}
                  placeholder={t('contact.form.subject_ph')} 
                  required 
                />

                <SelectGroup 
                  label={t('contact.form.source')} 
                  name="source" 
                  value={formData.source}
                  onChange={handleChange}
                  optionKeys={sourceOptions}
                  t={t}
                />

                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-brand-muted uppercase tracking-wider flex justify-between">
                    <span>{t('contact.form.message')}</span>
                    {errors.message && <span className="text-red-500 text-xs normal-case flex items-center gap-1"><AlertCircle size={12} /> {errors.message}</span>}
                  </label>
                  <textarea 
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full bg-white border rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-1 transition-all resize-none placeholder:text-gray-400 ${
                      errors.message 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                        : 'border-slate-300 focus:border-brand-accent focus:ring-brand-accent'
                    }`}
                    placeholder={t('contact.form.message_ph')}
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-brand-surface border border-brand-accent text-brand-accent font-bold py-4 rounded-lg hover:bg-brand-accent hover:text-brand-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-glow-accent flex items-center justify-center group uppercase tracking-wider text-sm"
                >
                  {status === 'submitting' ? (
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  ) : (
                    <>
                      {t('contact.form.btn')}
                      <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                
                {status === 'error' && (
                  <div className="text-center text-red-500 text-sm mt-2">
                    Wystąpił błąd podczas wysyłania. Spróbuj ponownie.
                  </div>
                )}
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};