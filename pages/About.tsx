
import React from 'react';
import { Target, Shield, Award, Zap, MapPin, User, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="animate-in fade-in duration-700">
      <section className="bg-prolaw-navy py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight font-serif">{t('about.title')}</h1>
          <p className="text-xl text-slate-300 max-w-2xl font-light leading-relaxed">{t('about.subtitle')}</p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-serif font-bold text-prolaw-navy">{t('about.whoTitle')}</h2>
            <div className="space-y-6 text-slate-600 leading-relaxed text-lg font-light">
              <p>{t('about.whoDesc1')}</p>
              <p>{t('about.whoDesc2')}</p>
            </div>
            <div className="flex gap-12 pt-4">
              <div><div className="text-3xl font-bold text-prolaw-gold mb-1">30+</div><div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{t('about.stats.years')}</div></div>
            </div>
          </div>
          <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200" className="rounded shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000" alt="Office" />
        </div>
      </section>

      <section className="py-24 bg-prolaw-navy relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-prolaw-gold/5 -skew-x-12" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-20">
            <span className="text-prolaw-gold font-bold text-[11px] uppercase tracking-[0.4em] mb-4 block">Our Reach</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">Strategic Regional Presence</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white/5 border border-white/10 p-12 rounded-2xl group hover:border-prolaw-gold transition-all duration-500 shadow-2xl">
              <div className="flex justify-between items-start mb-10"><MapPin className="text-prolaw-gold" size={28} /></div>
              <h3 className="text-2xl font-bold mb-4">{t('common.amman')}</h3>
              <p className="text-slate-400 font-light mb-8 leading-relaxed">
                Located in the heart of Amman’s business district, serving Levant clients with specialized local expertise.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 p-12 rounded-2xl group hover:border-prolaw-gold transition-all duration-500 shadow-2xl">
              <div className="flex justify-between items-start mb-10"><MapPin className="text-prolaw-gold" size={28} /></div>
              <h3 className="text-2xl font-bold mb-4">{t('common.riyadh')}</h3>
              <p className="text-slate-400 font-light mb-8 leading-relaxed">
                Our Riyadh presence represents our commitment to Vision 2030, offering high-stakes strategic counsel.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-prolaw-gold font-bold text-[11px] uppercase tracking-[0.4em] mb-4 block">Our Ethos</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-prolaw-navy tracking-tight">{t('about.values')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: t('about.vIntegrity'), desc: t('about.vIntegrityDesc'), icon: <Shield size={32} /> },
              { title: t('about.vProfessionalism'), desc: t('about.vProfessionalismDesc'), icon: <Award size={32} /> },
              { title: t('about.vCommitment'), desc: t('about.vCommitmentDesc'), icon: <Target size={32} /> },
              { title: t('about.vExcellence'), desc: t('about.vExcellenceDesc'), icon: <Zap size={32} /> }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:border-prolaw-gold transition-all duration-300 group">
                <div className="text-prolaw-gold mb-6 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h3 className="text-xl font-serif font-bold text-prolaw-navy mb-4">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-50 rounded-2xl p-10 md:p-16 border border-slate-100 relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
            <div className="absolute top-0 left-0 w-2 h-full bg-prolaw-gold" />
            <div className="w-20 h-20 bg-prolaw-navy rounded-xl flex items-center justify-center shrink-0 shadow-xl"><Zap className="text-prolaw-gold" size={32} /></div>
            <div className="flex-grow">
              <span className="text-prolaw-gold font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Our Philosophy</span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-prolaw-navy mb-6 tracking-tight">Our Approach to Legal Excellence</h2>
              <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed max-w-4xl italic">{t('about.philosophy')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 bg-white" id="founder">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <span className="text-prolaw-gold font-bold text-[11px] uppercase tracking-[0.4em] mb-4 block">Leadership & Counsel</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-prolaw-navy tracking-tight">Our Founder</h2>
            <div className="h-1.5 w-24 bg-prolaw-gold mx-auto mt-6" />
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8 pt-4">
              <div>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-prolaw-navy mb-2">Attorney Fares Al-Shahwan</h3>
                <div className="w-12 h-1 bg-slate-100 mb-8" />
              </div>

              <div className="prose prose-lg text-slate-600 font-light leading-relaxed">
                <p className="mb-6 relative">
                  <span className="text-6xl text-prolaw-gold/20 font-serif absolute -top-6 -left-4 -z-10">“</span>
                  We firmly believe that the success of our clients is our own success. We are committed to the principle that every step must lead to the ultimate goal: delivering the best and most distinguished results for those who place their trust in us.
                </p>
                <p className="mb-6">
                   Our founder is a distinguished figure in the Jordanian legal community, with over thirty years of professional experience in litigation, dispute resolution, and arbitration. His vision has always been to achieve excellence in legal practice. Through his dedicated work, Prolaw has grown into a leading legal institution, recognized for its deep expertise and unwavering commitment to ensuring success for its clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-serif font-bold text-prolaw-navy tracking-tight">Our Team</h2>
             <div className="h-1.5 w-24 bg-prolaw-gold mx-auto mt-6" />
          </div>
          <div className="max-w-4xl mx-auto text-center space-y-8 text-slate-600 leading-relaxed text-lg font-light">
            <p>
              At Prolaw, we operate as a unified team dedicated to protecting our clients’ interests and achieving the best possible outcomes. Our lawyers and legal consultants combine practical experience with the highest standards of professionalism to deliver precise and distinguished legal solutions.
            </p>
            <p>
              For every matter, we collaborate across practice areas, examining issues from multiple perspectives and integrating diverse specializations within the firm to develop fully comprehensive legal strategies—whether in litigation, arbitration, or corporate and commercial matters. This team-based approach ensures that our clients benefit from precise legal knowledge, collective expertise, and the highest standard of comprehensive legal services.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
