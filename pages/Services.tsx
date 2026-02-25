
import React from 'react';
import { GET_SERVICES } from '../constants';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck, Globe, Scale } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Services: React.FC = () => {
  const { t, isRtl, lang } = useLanguage();
  const services = GET_SERVICES(t);

  return (
    <div className={`animate-in fade-in duration-700 ${isRtl ? 'text-right' : ''}`}>
      {/* Header */}
      <section className="bg-prolaw-navy py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-prolaw-gold/5 -skew-x-12 transform translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 tracking-tight">{t('services.header_title')}</h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl font-light leading-relaxed">
            {t('services.header_subtitle')}
          </p>
        </div>
      </section>

      {/* Intro Stats/Trust */}
      <section className="py-16 bg-white border-b border-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
           <div className={`flex items-start gap-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <ShieldCheck className="text-prolaw-gold shrink-0" size={32} />
              <div>
                <h4 className="font-bold text-prolaw-navy uppercase tracking-widest text-sm mb-2">Regional Expertise</h4>
                <p className="text-slate-500 text-xs leading-relaxed">Deeply rooted in Jordan and Saudi Arabia legal frameworks.</p>
              </div>
           </div>
           <div className={`flex items-start gap-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <Globe className="text-prolaw-gold shrink-0" size={32} />
              <div>
                <h4 className="font-bold text-prolaw-navy uppercase tracking-widest text-sm mb-2">Global Standards</h4>
                <p className="text-slate-500 text-xs leading-relaxed">Bridging local laws with international business expectations.</p>
              </div>
           </div>
           <div className={`flex items-start gap-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <Scale className="text-prolaw-gold shrink-0" size={32} />
              <div>
                <h4 className="font-bold text-prolaw-navy uppercase tracking-widest text-sm mb-2">Strategic Advocacy</h4>
                <p className="text-slate-500 text-xs leading-relaxed">Protecting your interests with precision and integrity.</p>
              </div>
           </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 gap-16 md:gap-32">
            {services.map((service, index) => (
              <div key={service.id} className={`flex flex-col lg:flex-row gap-16 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="lg:w-1/2 relative group">
                  <div className="absolute inset-0 bg-prolaw-gold/20 -translate-x-4 translate-y-4 rounded-lg -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
                  <img src={`https://picsum.photos/seed/${service.id}/1000/700`} className="rounded-lg shadow-2xl w-full h-[450px] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt={service.title} />
                  <div className={`absolute bottom-6 ${isRtl ? 'left-6' : 'right-6'} p-4 bg-prolaw-navy rounded-lg shadow-xl`}>
                    {React.cloneElement(service.icon as React.ReactElement, { size: 24, className: 'text-prolaw-gold' })}
                  </div>
                </div>
                <div className="lg:w-1/2 space-y-8">
                  <span className="text-prolaw-gold font-bold text-xs uppercase tracking-[0.4em] mb-4 block">Expertise Area</span>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-prolaw-navy tracking-tight">{service.title}</h2>
                  <p className="text-slate-600 leading-relaxed text-xl font-light">
                    {service.description}
                  </p>
                  <p className="text-slate-500 leading-relaxed font-light">
                    {lang === 'en' 
                      ? 'Our firm provides deep-rooted legal guidance across the region, ensuring that our clients are compliant with both Jordanian and Saudi Arabian regulations while maintaining commercial agility. We assist international investors and domestic corporations in navigating the complexities of regional statutes.'
                      : 'تقدم شركتنا توجيهاً قانونياً عميقاً عبر المنطقة، مما يضمن توافق عملائنا مع كل من الأنظمة الأردنية والسعودية مع الحفاظ على المرونة التجارية. نحن نساعد المستثمرين الدوليين والشركات المحلية في التنقل عبر تعقيدات الأنظمة الإقليمية.'}
                  </p>
                  <Link 
                    to={`/services/${service.id}`} 
                    className={`inline-flex items-center gap-4 py-5 px-10 border-2 border-prolaw-navy text-prolaw-navy hover:bg-prolaw-navy hover:text-white font-bold text-sm uppercase tracking-widest transition-all ${isRtl ? 'flex-row-reverse' : ''}`}
                  >
                    {isRtl ? 'استكشف المزيد' : 'View Full Details'} 
                    {isRtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-40 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-prolaw-gold font-bold text-xs uppercase tracking-[0.4em] mb-6 block">Ready to Connect</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-prolaw-navy mb-8 tracking-tight">{t('common.needAdvice')}</h2>
          <p className="text-slate-500 mb-12 text-lg md:text-xl font-light leading-relaxed">
            {t('common.teamReady')}
          </p>
          <Link to="/contact" className="inline-block bg-prolaw-navy hover:bg-prolaw-gold text-white px-12 py-6 rounded-sm text-sm font-bold uppercase tracking-widest transition-all shadow-xl hover:shadow-prolaw-gold/20">
            {t('common.speakTeam')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
