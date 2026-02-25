import React from 'react';
import { GET_TEAM_MEMBERS } from '../constants';
import { Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Team: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const teamMembers = GET_TEAM_MEMBERS(t);

  return (
    <div className={`animate-in fade-in duration-700 ${isRtl ? 'text-right' : ''}`}>
      <section className="bg-prolaw-navy py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{t('team.header_title')}</h1>
          <p className="text-xl text-slate-300 max-w-2xl font-light">
            {t('team.header_subtitle')}
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {teamMembers.map((member: any) => (
              <div key={member.id} className="group bg-slate-50 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100">
                <div className="h-[400px] overflow-hidden">
                  <img src={member.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={member.name} />
                </div>
                <div className="p-8">
                  <div className={`text-prolaw-gold font-bold text-xs uppercase tracking-widest mb-1 ${isRtl ? 'text-right' : ''}`}>{member.role}</div>
                  <h3 className="text-2xl font-bold text-prolaw-navy mb-4">{member.name}</h3>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                    {member.bio}
                  </p>
                  <div className={`flex flex-wrap gap-2 mb-8 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    {member.expertise.map((exp: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold uppercase text-slate-500">
                        {exp}
                      </span>
                    ))}
                  </div>
                  <div className={`flex gap-4 pt-4 border-t border-slate-200 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <a href="#" className="text-slate-400 hover:text-prolaw-gold transition-colors"><Linkedin size={20} /></a>
                    <a href="#" className="text-slate-400 hover:text-prolaw-gold transition-colors"><Mail size={20} /></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;