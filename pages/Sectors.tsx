
import React from 'react';
import { SECTORS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const Sectors: React.FC = () => {
  const { t } = useLanguage();
  const sectors = SECTORS(t);

  return (
    <div className="animate-in fade-in duration-700">
      <section className="bg-prolaw-navy py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">{t('common.sectorsTitle')}</h1>
          <p className="text-xl text-slate-300 max-w-2xl font-light">
            {t('common.sectorsSubtitle')}
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectors.map((sector) => (
              <div key={sector.id} className="relative group overflow-hidden rounded-lg shadow-lg aspect-[4/3]">
                <img 
                  src={sector.image} 
                  alt={sector.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-prolaw-navy via-prolaw-navy/40 to-transparent flex flex-col justify-end p-8">
                  <div className="text-prolaw-goldLight mb-3 transform group-hover:-translate-y-2 transition-transform duration-500 flex">
                    {sector.icon}
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white group-hover:-translate-y-2 transition-transform duration-500">{sector.title}</h3>
                  <p className="text-slate-200 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-3">
                    {sector.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
             <span className="text-prolaw-gold font-bold text-xs uppercase tracking-[0.4em] mb-6 block">Regional Strategic Outlook</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-prolaw-navy mb-10 tracking-tight">{t('common.regionalPerspectiveTitle')}</h2>
            <div className="h-1 w-24 bg-prolaw-gold mb-10" />
            <p className="text-slate-600 text-xl md:text-2xl font-light leading-relaxed mb-8">
              {t('common.regionalPerspectiveDesc1')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sectors;
