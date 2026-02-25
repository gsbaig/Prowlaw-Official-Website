
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ChevronRight, Globe, ShieldCheck, CheckCircle2, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { GET_SERVICES } from '../constants';

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const services = GET_SERVICES(t);
  
  // Cast the service object to include the new fields we added in constants.tsx
  const service = services.find(s => s.id === id) as typeof services[0] & {
    fullDescription: string;
    subSectionTitle?: string;
    fullBody?: string;
    keyPoints?: string[];
    successStories?: string[];
  };

  if (!service) return <Navigate to="/services" />;

  return (
    <div className="animate-in fade-in duration-700">
      <section className="bg-prolaw-navy py-24 md:py-32 relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-prolaw-gold/5 -skew-x-12 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-4 text-prolaw-gold text-[10px] uppercase tracking-[0.3em] mb-8">
             <Link to="/services" className="hover:text-white transition-colors">{t('nav.services')}</Link>
             <ChevronRight size={14} />
             <span className="text-white/60">{service.title}</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-8 leading-tight">{service.title}</h1>
          <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">{service.description}</p>
        </div>
      </section>

      <section className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 space-y-12">
            {service.keyPoints && (
              <div className="bg-slate-50 p-10 rounded-xl border border-slate-100">
                <h3 className="text-2xl font-bold text-prolaw-navy mb-6">Key Focus Areas</h3>
                <ul className="space-y-4">
                  {service.keyPoints.map((p, i) => (
                    <li key={i} className="flex items-start gap-4 text-slate-600 text-sm font-medium leading-relaxed">
                      <CheckCircle2 size={18} className="text-prolaw-gold shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="p-10 border-l-4 border-prolaw-gold bg-prolaw-navy text-white rounded-r-xl">
               <Globe className="text-prolaw-gold mb-6" size={24} />
               <h4 className="text-lg font-bold mb-4">Regional Expertise</h4>
               <p className="text-slate-400 text-sm leading-relaxed">
                 Deeply rooted in Jordan and Saudi Arabia, providing expert legal counsel that bridges local frameworks with international standards.
               </p>
            </div>
          </div>
          
          <div className="lg:col-span-8 prose prose-xl prose-slate max-w-none text-slate-600 font-light">
            <p className="text-2xl text-prolaw-navy font-normal mb-8 leading-relaxed">
              {service.fullDescription}
            </p>
            
            {service.subSectionTitle && (
              <h3 className="text-3xl font-serif font-bold text-prolaw-navy mt-12 mb-6">{service.subSectionTitle}</h3>
            )}
            
            {service.fullBody && (
              <div className="mb-8 leading-relaxed whitespace-pre-line">{service.fullBody}</div>
            )}

            {/* Special Section for Success Stories (e.g., Tax) */}
            {service.successStories && service.successStories.length > 0 && (
              <div className="mt-16">
                <h3 className="text-3xl font-serif font-bold text-prolaw-navy mb-8 flex items-center gap-3">
                  <Award className="text-prolaw-gold" />
                  Success Record
                </h3>
                <div className="space-y-6">
                  {service.successStories.map((story, i) => (
                    <div key={i} className="bg-slate-50 p-6 rounded-lg border-l-4 border-prolaw-gold">
                      <p className="text-base text-slate-700 font-normal leading-relaxed">{story}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
