
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Award, ChevronLeft, ChevronRight, Settings, Landmark, ShieldCheck, TrendingUp, ArrowRight } from 'lucide-react';
import { GET_SERVICES, GET_NEWS_ARTICLES } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

type TransitionStyle = 'fade' | 'slide' | 'zoom' | 'premium';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const services = GET_SERVICES(t);
  const articles = GET_NEWS_ARTICLES(t).slice(0, 3);
  const slides = Array.isArray(t('hero.slides')) ? t('hero.slides') : [];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionStyle, setTransitionStyle] = useState<TransitionStyle>('premium');
  const [showTransitionMenu, setShowTransitionMenu] = useState(false);
  const timerRef = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    if (isTransitioning || slides.length === 0) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 1200);
  }, [slides.length, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning || slides.length === 0) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 1200);
  }, [slides.length, isTransitioning]);

  useEffect(() => {
    if (slides.length > 0) timerRef.current = window.setInterval(nextSlide, 8000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [nextSlide, slides.length]);

  const getTransitionClasses = (index: number) => {
    const isActive = index === currentSlide;
    let classes = "absolute inset-0 transition-all duration-1000 ease-in-out ";
    if (transitionStyle === 'fade') classes += isActive ? "opacity-100 z-10" : "opacity-0 z-0";
    else if (transitionStyle === 'slide') classes += isActive ? "opacity-100 translate-x-0 z-10" : "opacity-0 -translate-x-full z-0";
    else if (transitionStyle === 'zoom') classes += isActive ? "opacity-100 scale-100 z-10" : "opacity-0 scale-90 z-0";
    else classes += isActive ? "opacity-100 translate-x-0 scale-100 z-10" : "opacity-0 -translate-x-12 scale-105 z-0";
    return classes;
  };

  return (
    <div className="animate-in fade-in duration-700">
      <section className="relative h-screen min-h-[850px] overflow-hidden bg-prolaw-navy">
        <div className="absolute top-44 md:top-56 right-8 z-50">
          <button onClick={() => setShowTransitionMenu(!showTransitionMenu)} className="p-3.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-prolaw-gold transition-all shadow-xl">
            <Settings size={22} className={showTransitionMenu ? 'rotate-90' : ''} />
          </button>
          {showTransitionMenu && (
            <div className="absolute top-16 right-0 bg-prolaw-navy border border-white/10 rounded-xl shadow-2xl p-2 w-52 animate-in zoom-in-95">
              {(['fade', 'slide', 'zoom', 'premium'] as TransitionStyle[]).map((style) => (
                <button key={style} onClick={() => { setTransitionStyle(style); setShowTransitionMenu(false); }} className={`w-full text-left px-5 py-3 rounded-lg text-[11px] font-bold uppercase tracking-widest ${transitionStyle === style ? 'bg-prolaw-gold text-white' : 'text-slate-300 hover:bg-white/5'}`}>{style} Mode</button>
              ))}
            </div>
          )}
        </div>

        {slides.map((slide: any, index: number) => (
          <div key={index} className={getTransitionClasses(index)}>
            <div className={`absolute inset-0 transition-transform duration-[12000ms] ${index === currentSlide ? 'scale-110 translate-y-4' : 'scale-100'}`}>
              <img src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-prolaw-navy/85 via-prolaw-navy/30 to-prolaw-navy/95 z-10" />
            </div>
            <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex items-center w-full">
              <div className="max-w-4xl pt-40 md:pt-64">
                <div className={`flex items-center gap-5 mb-8 transition-all duration-1000 delay-300 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  <span className="w-16 h-[2px] bg-prolaw-gold" />
                  <span className="text-prolaw-gold text-[11px] font-bold uppercase tracking-[0.4em]">{t('hero.badge')}</span>
                </div>
                <h1 className={`text-3xl md:text-5xl lg:text-6xl font-serif font-bold leading-[1.05] mb-8 text-white transition-all duration-1000 delay-500 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>{slide.title}</h1>
                <p className={`text-lg md:text-2xl text-slate-200 mb-10 leading-relaxed font-light max-w-2xl transition-all duration-1000 delay-700 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>{slide.subtitle}</p>
                <div className={`flex flex-col sm:flex-row gap-6 transition-all duration-1000 delay-900 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                  <Link to="/contact" className="bg-prolaw-gold hover:bg-white hover:text-prolaw-navy text-white px-10 py-5 rounded-sm text-[11px] font-bold uppercase tracking-widest transition-all shadow-2xl text-center">{t('hero.ctaPrimary')}</Link>
                  <Link to="/about" className="backdrop-blur-md bg-white/5 border border-white/20 hover:bg-white/20 text-white px-10 py-5 rounded-sm text-[11px] font-bold uppercase tracking-widest transition-all text-center">{t('hero.ctaSecondary')}</Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-12 right-0 left-0 z-30 flex items-center justify-between max-w-7xl mx-auto px-6">
          <div className="flex gap-4">
            {slides.map((_: any, idx: number) => (
              <button key={idx} onClick={() => { if (!isTransitioning) { setIsTransitioning(true); setCurrentSlide(idx); setTimeout(() => setIsTransitioning(false), 1200); } }} className="group relative h-12 flex items-center px-1">
                <div className={`h-[2px] transition-all duration-700 rounded-full ${idx === currentSlide ? 'w-16 md:w-24 bg-prolaw-gold' : 'w-5 bg-white/20 hover:bg-white/50'}`} />
              </button>
            ))}
          </div>
          <div className="flex gap-5">
            <button onClick={prevSlide} className="w-14 h-14 md:w-20 md:h-20 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-prolaw-gold transition-all"><ChevronLeft size={28} /></button>
            <button onClick={nextSlide} className="w-14 h-14 md:w-20 md:h-20 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-prolaw-gold transition-all"><ChevronRight size={28} /></button>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40 bg-prolaw-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-prolaw-gold/5 -skew-x-12 translate-x-1/4" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <span className="text-prolaw-gold font-bold text-[11px] uppercase tracking-[0.5em] mb-4 block">Regional Outlook</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-tight">Strategic Regional Alignment</h2>
            <div className="h-1.5 w-24 bg-prolaw-gold mx-auto mt-8" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32">
            <div className="bg-white/5 border border-white/10 p-12 md:p-20 rounded-xl backdrop-blur-sm group hover:bg-white/10 transition-all duration-500">
              <Landmark className="text-prolaw-gold mb-10 w-16 h-16 group-hover:scale-110 transition-transform" />
              <h3 className="text-3xl font-serif font-bold text-white mb-6">Saudi Vision 2030</h3>
              <p className="text-slate-400 text-lg leading-relaxed font-light mb-10">
                We support the economic transformation of the Kingdom of Saudi Arabia by providing innovative legal solutions fully aligned with Vision 2030, focusing on enhancing foreign investment and implementing modern commercial regulations, ensuring sustainable growth and safeguarding our clients’ interests.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 p-12 md:p-20 rounded-xl backdrop-blur-sm group hover:bg-white/10 transition-all duration-500">
              <TrendingUp className="text-prolaw-gold mb-10 w-16 h-16 group-hover:scale-110 transition-transform" />
              <h3 className="text-3xl font-serif font-bold text-white mb-6">Jordan Vision</h3>
              <p className="text-slate-400 text-lg leading-relaxed font-light mb-10">
                We contribute to Jordan’s Economic Modernization Vision by facilitating major investments and providing legal protection for strategic national projects across various sectors, ensuring sustainable growth and legal stability that enhances business success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Summary Section */}
      <section className="py-32 md:py-64 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" className="rounded-sm shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000" alt="Office Professionalism" />
            <div className="absolute -bottom-12 right-[-1rem] md:right-[-3rem] bg-prolaw-navy p-8 md:p-14 rounded-sm shadow-2xl border-b-8 border-prolaw-gold">
              <div className="flex items-center gap-8 mb-6">
                <Award className="text-prolaw-gold w-12 h-12" />
                <span className="text-4xl md:text-6xl font-bold text-white tracking-tighter">{t('common.years')}</span>
              </div>
              <p className="text-[12px] text-slate-400 font-bold uppercase tracking-[0.5em]">{t('common.yearsSub')}</p>
            </div>
          </div>
          <div className="space-y-10 md:space-y-16">
            <div>
               <span className="text-prolaw-gold font-bold text-[11px] md:text-sm uppercase tracking-[0.5em] mb-6 block">Established Excellence</span>
               <h2 className="text-4xl md:text-7xl font-serif font-bold text-prolaw-navy tracking-tight">{t('about.whoTitle')}</h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-xl md:text-3xl font-light border-l-[2px] border-prolaw-gold pl-8 md:pl-14 py-4">{t('about.whoDesc1')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
              {[
                { title: t('about.vIntegrity'), desc: t('about.vIntegrityDesc') },
                { title: t('about.vProfessionalism'), desc: t('about.vProfessionalismDesc') },
                { title: t('about.vCommitment'), desc: t('about.vCommitmentDesc') },
                { title: t('about.vExcellence'), desc: t('about.vExcellenceDesc') }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-prolaw-gold shrink-0" />
                    <span className="text-prolaw-navy font-bold text-[13px] md:text-base uppercase tracking-widest">{item.title}</span>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed pl-8">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-32 md:py-64 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-24 md:mb-40">
            <span className="text-prolaw-gold font-bold text-[11px] md:text-sm uppercase tracking-[0.5em] mb-6 block">Our Practice</span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-prolaw-navy mb-16 tracking-tight">{t('common.servicesTitle')}</h2>
            <div className="h-[2px] w-32 bg-prolaw-gold mx-auto" />
            <p className="text-slate-500 text-xl md:text-2xl leading-relaxed font-light mt-16">{t('common.servicesSub')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {services.map((service) => (
              <div key={service.id} className="group bg-white p-12 border border-slate-100 hover:border-prolaw-gold transition-all duration-500 shadow-sm hover:shadow-2xl flex flex-col">
                <div className="mb-16 flex">
                  <div className="p-7 bg-slate-50 rounded group-hover:bg-prolaw-navy transition-all duration-500 shadow-sm">
                    {React.cloneElement(service.icon as React.ReactElement, { className: "w-12 h-12 text-prolaw-gold group-hover:text-white transition-all duration-500" })}
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-prolaw-navy mb-8 group-hover:text-prolaw-gold transition-colors tracking-tight">{service.title}</h3>
                <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-16 font-light flex-grow">{service.description}</p>
                <Link to={`/services/${service.id}`} className="text-prolaw-navy font-bold text-[11px] uppercase tracking-[0.3em] flex items-center gap-4 group-hover:text-prolaw-gold">Explore <ArrowRight size={22} /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
