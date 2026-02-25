
import React, { useEffect } from 'react';
import { Shield, FileText, Lock, Cookie, AlertCircle, Scale, Globe, Copyright } from 'lucide-react';

const PrivacyDisclaimer: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: 'Your Data & Privacy',
      icon: <Lock className="w-6 h-6 text-prolaw-gold" />,
      content: 'At Prolaw, we respect your privacy. Providing personal data (name, email, address, etc.) is voluntary. We will not share your information with third parties without your consent. Data may be used to improve your experience, respond to inquiries, or recommend relevant services.'
    },
    {
      title: 'Content & Accuracy',
      icon: <FileText className="w-6 h-6 text-prolaw-gold" />,
      content: 'Information on this website is for general purposes only. We do not guarantee its accuracy or completeness and are not responsible for any damage resulting from its use.'
    },
    {
      title: 'Copyright & Usage',
      icon: <Copyright className="w-6 h-6 text-prolaw-gold" />,
      content: 'All content is protected by copyright. You may not copy, reproduce, or use it without prior written consent from Prolaw.'
    },
    {
      title: 'Cookies',
      icon: <Cookie className="w-6 h-6 text-prolaw-gold" />,
      content: 'We use cookies to improve your experience and analyze website usage. Cookies can be disabled in your browser, but some functions may be affected.'
    },
    {
      title: 'Your Rights',
      icon: <Scale className="w-6 h-6 text-prolaw-gold" />,
      content: 'You have rights regarding your personal data, including access, correction, deletion, restriction, objection, withdrawal of consent, and data portability, where applicable.'
    },
    {
      title: 'Third-Party Content',
      icon: <Globe className="w-6 h-6 text-prolaw-gold" />,
      content: 'We are not responsible for content provided by third parties or linked through this website, unless we have actual knowledge of illegal content and remove it promptly.'
    },
    {
      title: 'Google Analytics',
      icon: <AlertCircle className="w-6 h-6 text-prolaw-gold" />,
      content: 'This website uses Google Analytics to analyze usage. Data collected helps us improve the site and services. You may disable cookies via your browser settings, but some features may be limited.'
    }
  ];

  return (
    <div className="animate-in fade-in duration-700">
      <section className="bg-prolaw-navy py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">Privacy & Disclaimer</h1>
          <p className="text-xl text-slate-300 max-w-2xl font-light">
            Transparency, integrity, and trust form the foundation of our relationship with you.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid gap-12">
            {sections.map((section, index) => (
              <div key={index} className="flex gap-6 group">
                <div className="shrink-0 pt-1">
                  <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-prolaw-navy group-hover:border-prolaw-navy transition-all duration-300 shadow-sm">
                    {React.cloneElement(section.icon, { className: "w-6 h-6 text-prolaw-gold" })}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-prolaw-navy mb-4">{section.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-light text-lg border-l-2 border-slate-100 pl-6 group-hover:border-prolaw-gold transition-colors duration-300">
                    {section.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyDisclaimer;
