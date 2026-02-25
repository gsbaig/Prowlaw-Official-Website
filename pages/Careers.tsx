
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { CheckCircle2, Mail, MapPin, Briefcase, GraduationCap, Users } from 'lucide-react';

const Careers: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const rawRoles = t('careers.roles');
  const roles = Array.isArray(rawRoles) ? rawRoles : [];
  const benefits = t('careers.benefits');

  return (
    <div className={`animate-in fade-in duration-700 ${isRtl ? 'text-right' : 'text-left'}`}>
      {/* Header */}
      <section className="bg-prolaw-navy py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 tracking-tight">
              {t('careers.header_title')}
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
              {t('careers.header_subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className={`${isRtl ? 'lg:order-2' : ''}`}>
             <span className="text-prolaw-gold font-bold text-[11px] md:text-sm uppercase tracking-[0.5em] mb-6 block">Our Environment</span>
             <h2 className="text-3xl md:text-5xl font-serif font-bold text-prolaw-navy mb-8 tracking-tight">{t('careers.cultureTitle')}</h2>
             <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-12 font-light">
               {t('careers.cultureDesc')}
             </p>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {Array.isArray(benefits) && benefits.map((benefit: string, i: number) => (
                  <div key={i} className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <CheckCircle2 size={20} className="text-prolaw-gold shrink-0" />
                    <span className="text-prolaw-navy font-bold text-sm uppercase tracking-widest">{benefit}</span>
                  </div>
                ))}
             </div>
          </div>
          <div className={`relative ${isRtl ? 'lg:order-1' : ''}`}>
            <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200" className="rounded-sm shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000" alt="Team working" />
            <div className={`absolute -bottom-10 ${isRtl ? '-left-10' : '-right-10'} bg-prolaw-gold p-8 rounded-sm shadow-xl hidden md:block`}>
               <Users size={48} className="text-white mb-4" />
               <p className="text-white font-bold text-lg leading-tight">Join a community of experts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-24 md:py-40 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-prolaw-navy mb-6 tracking-tight">{t('careers.positionsTitle')}</h2>
            <div className="h-[2px] w-24 bg-prolaw-gold mx-auto" />
          </div>

          {roles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {roles.map((role: any, idx: number) => (
                <div key={idx} className="bg-white p-10 border border-slate-100 hover:border-prolaw-gold transition-all duration-500 shadow-sm hover:shadow-xl flex flex-col group">
                   <div className="mb-8 p-4 bg-slate-50 w-fit rounded group-hover:bg-prolaw-navy transition-colors duration-500">
                      <Briefcase size={28} className="text-prolaw-gold" />
                   </div>
                   <h3 className="text-2xl font-bold text-prolaw-navy mb-4">{role.title}</h3>
                   <div className="flex flex-col gap-3 mb-10 text-slate-500 text-sm font-medium uppercase tracking-widest">
                      <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <MapPin size={14} className="text-prolaw-gold" />
                        <span>{role.location}</span>
                      </div>
                      <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <GraduationCap size={14} className="text-prolaw-gold" />
                        <span>{role.type}</span>
                      </div>
                   </div>
                   <button className="mt-auto py-4 border-2 border-prolaw-navy group-hover:bg-prolaw-navy group-hover:text-white text-prolaw-navy text-[11px] font-bold uppercase tracking-widest transition-all duration-500">
                     View Position
                   </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-dashed border-slate-300 rounded-lg">
              <p className="text-slate-500 text-lg italic">{t('careers.noPositions')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Apply Section */}
      <section className="py-24 md:py-40 bg-prolaw-navy text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-10 tracking-tight">{t('careers.applyTitle')}</h2>
          <p className="text-slate-300 text-lg md:text-xl font-light mb-12 leading-relaxed">
            {t('careers.applyDesc')}
          </p>
          <a 
            href={`mailto:${t('careers.email')}`}
            className="inline-flex items-center gap-4 bg-prolaw-gold hover:bg-white hover:text-prolaw-navy text-white px-12 py-6 rounded-sm text-sm font-bold uppercase tracking-widest transition-all duration-500 shadow-2xl"
          >
            <Mail size={20} />
            {t('careers.email')}
          </a>
        </div>
      </section>
    </div>
  );
};

export default Careers;
