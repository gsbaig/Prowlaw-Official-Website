
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, ChevronDown, Linkedin, Twitter, ArrowRight, Plus, Minus } from 'lucide-react';
import { NAV_LINKS, GET_SERVICES } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const Logo: React.FC<{ light?: boolean; isScrolled?: boolean }> = ({ light = false, isScrolled = false }) => {
  return (
    <div className={`flex flex-col items-center justify-center transition-all duration-500 hover:opacity-90`}>
      <img 
        src="https://i.ibb.co/qYpmHN2d/prolaw-logo.png" 
        alt="Prolaw Law Firm Logo" 
        className={`transition-all duration-500 object-contain ${isScrolled ? 'w-[150px]' : 'w-[200px]'} h-auto ${light ? 'brightness-0 invert' : ''}`}
        onError={(e) => {
          e.currentTarget.src = "https://i.ibb.co/C2S4m3Y/prolaw-logo.png";
        }}
      />
      <span className={`text-[9px] font-bold tracking-[0.2em] uppercase mt-[-5rem] ${light ? 'text-white/80' : 'text-prolaw-navy/80'}`}>Since 1992</span>
    </div>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();
  const dropdownTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
  }, [isMenuOpen]);

  const handleMouseEnter = (link: any) => {
    if (dropdownTimeoutRef.current) window.clearTimeout(dropdownTimeoutRef.current);
    if (link.children && link.children.length > 0) setActiveDropdown(link.name);
    else setActiveDropdown(null);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = window.setTimeout(() => setActiveDropdown(null), 150);
  };

  const isHomePage = location.pathname === '/';
  const navBgClass = isScrolled ? 'bg-white shadow-xl' : isHomePage ? 'bg-transparent' : 'bg-prolaw-navy';
  const navLinkColor = isScrolled ? 'text-prolaw-navy' : 'text-white';
  const consultBtnClass = isScrolled ? 'bg-prolaw-navy text-white hover:bg-prolaw-gold' : 'bg-prolaw-gold text-white hover:bg-white hover:text-prolaw-navy';
  const mainPaddingTop = isHomePage ? 'pt-0' : 'pt-32 md:pt-44';
  const links = NAV_LINKS(t);

  return (
    <div className="flex flex-col min-h-screen bg-white text-prolaw-navy">
      {/* Top Utility Bar */}
      <div className={`fixed top-0 left-0 right-0 z-[130] transition-all duration-500 overflow-hidden ${isScrolled ? 'h-0 opacity-0' : 'h-10 opacity-100'} bg-prolaw-navy border-b border-white/5`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em]">
          <div className="flex items-center gap-6 text-white/60">
             <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"><Phone size={12} className="text-prolaw-gold"/> +962 6 5678110</span>
             <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"><Mail size={12} className="text-prolaw-gold"/> Info@prolaw-jordan.com</span>
          </div>
        </div>
      </div>

      <header className={`fixed top-0 left-0 right-0 z-[120] transition-all duration-500 ease-in-out ${navBgClass}`} style={{ top: isScrolled ? '0px' : '40px', height: isScrolled ? '80px' : '120px' }} onMouseLeave={handleMouseLeave}>
        <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between relative">
          <Link to="/" className="flex items-center transition-transform duration-500 hover:scale-105 shrink-0">
            <Logo light={!isScrolled} isScrolled={isScrolled} />
          </Link>
          <div className="flex-grow min-w-[1rem] lg:min-w-[3rem]" />
          <div className="hidden lg:flex items-center h-full gap-8 xl:gap-12">
            {links.map((link: any) => (
              <div key={link.name} className="h-full flex items-center" onMouseEnter={() => handleMouseEnter(link)}>
                <Link to={link.path} className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:text-prolaw-gold flex items-center gap-2 h-full ${location.pathname === link.path ? 'text-prolaw-gold' : navLinkColor}`}>
                  {link.name}
                  {link.children && link.children.length > 0 && <ChevronDown size={10} className={`transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />}
                </Link>
              </div>
            ))}
            <Link to="/contact" className={`px-8 py-4 rounded-sm text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap ${consultBtnClass}`}>
              {t('nav.consult')}
            </Link>
          </div>
          <button className={`lg:hidden p-2 transition-colors flex items-center gap-2 ${navLinkColor} shrink-0`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] hidden sm:inline">Menu</span>
            <div className="relative w-6 h-6 flex items-center justify-center">
              <Menu size={24} className={`absolute transition-all duration-500 ${isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`} />
              <X size={24} className={`absolute transition-all duration-500 ${isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
            </div>
          </button>
        </div>

        {/* Desktop Mega Menu */}
        <div className={`absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-2xl transition-all duration-500 overflow-hidden hidden lg:block ${activeDropdown ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
          <div className="max-w-7xl mx-auto flex">
            <div className="w-1/4 bg-prolaw-navy p-12 text-white relative">
              <div className="absolute top-0 bottom-0 right-0 w-1 bg-prolaw-gold" />
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-prolaw-gold mb-4">{activeDropdown}</h4>
              <p className="text-[13px] text-slate-300 leading-relaxed font-light mb-8">{t('common.footerDesc')}</p>
              <Link to="/contact" onClick={() => setActiveDropdown(null)} className="group inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white hover:text-prolaw-gold transition-colors">
                {t('nav.request')}
                <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-prolaw-gold group-hover:border-prolaw-gold transition-all">
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
            <div className="w-3/4 p-12 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-10">
                {links.find(l => l.name === activeDropdown)?.children?.map((child: any, idx: number) => (
                  <Link key={idx} to={child.path} onClick={() => setActiveDropdown(null)} className="group/child flex items-center gap-3 py-2 border-b border-transparent hover:border-slate-50">
                    <div className="w-8 h-8 shrink-0 bg-slate-50 rounded flex items-center justify-center text-slate-400 group-hover/child:bg-prolaw-navy group-hover/child:text-prolaw-gold transition-all">
                      {React.cloneElement(child.icon as React.ReactElement, { size: 14 })}
                    </div>
                    <div className="text-[12px] font-bold uppercase tracking-wider text-prolaw-navy group-hover/child:text-prolaw-gold transition-colors">{child.name}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`lg:hidden fixed inset-0 z-[150] transition-all duration-500 ease-in-out ${isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className={`absolute inset-0 bg-prolaw-navy/70 backdrop-blur-md transition-opacity duration-700 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMenuOpen(false)} />
        <div className={`absolute top-0 bottom-0 right-0 w-full max-w-[320px] bg-white shadow-2xl flex flex-col transition-all duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <Link to="/" onClick={() => setIsMenuOpen(false)}><Logo isScrolled={true} /></Link>
            <button onClick={() => setIsMenuOpen(false)} className="w-10 h-10 flex items-center justify-center text-prolaw-navy hover:bg-slate-50 rounded-full"><X size={24} /></button>
          </div>
          <div className="flex-grow overflow-y-auto px-6 py-6 custom-scrollbar">
            {links.map((link: any) => (
              <div key={link.name} className="mb-3">
                <div className="flex items-center justify-between w-full">
                  <Link to={link.path} onClick={() => setIsMenuOpen(false)} className="flex-grow text-[13px] font-bold uppercase tracking-widest py-4 px-4 text-prolaw-navy">{link.name}</Link>
                  {link.children && <button onClick={() => setMobileExpanded(mobileExpanded === link.name ? null : link.name)} className="p-4 text-slate-300">{mobileExpanded === link.name ? <Minus size={16}/> : <Plus size={16}/>}</button>}
                </div>
                {link.children && mobileExpanded === link.name && (
                  <div className="flex flex-col gap-1 pl-6 border-l border-slate-100 mt-1">
                    {link.children.map((child: any, idx: number) => (
                      <Link key={idx} to={child.path} onClick={() => setIsMenuOpen(false)} className="py-3 px-4 text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-prolaw-gold">{child.name}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="p-8 bg-slate-50 border-t border-slate-100">
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="w-full bg-prolaw-navy text-white py-4 rounded-lg font-bold uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3">{t('nav.consult')}</Link>
          </div>
        </div>
      </div>

      <main className={`flex-grow ${mainPaddingTop}`}>{children}</main>

      <footer className="bg-prolaw-navy text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <Logo light={true} isScrolled={isScrolled} />
            <p className="text-slate-400 text-sm leading-relaxed font-light">{t('common.footerDesc')}</p>
          </div>
          <div>
            <h4 className="text-prolaw-gold text-[10px] font-bold uppercase tracking-widest mb-8">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-slate-400 hover:text-white text-sm">{t('nav.about')}</Link></li>
              <li><Link to="/services" className="text-slate-400 hover:text-white text-sm">Practice Areas</Link></li>
              <li><Link to="/sectors" className="text-slate-400 hover:text-white text-sm">{t('nav.sectors')}</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-white text-sm">{t('nav.contact')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-prolaw-gold text-[10px] font-bold uppercase tracking-widest mb-8">{t('nav.services')}</h4>
            <ul className="space-y-4">
              {GET_SERVICES(t).map((s) => (
                <li key={s.id}><Link to={`/services/${s.id}`} className="text-slate-400 hover:text-white text-sm">{s.title}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-prolaw-gold text-[10px] font-bold uppercase tracking-widest mb-8">{t('common.offices')}</h4>
            <div className="space-y-6">
              <p className="text-sm text-slate-400"><span className="text-white block font-bold mb-1">{t('common.amman')}</span>{t('common.ammanAddress')}</p>
              <p className="text-sm text-slate-400"><span className="text-white block font-bold mb-1">{t('common.riyadh')}</span>{t('common.riyadhAddress')}</p>
            </div>
          </div>
          <div>
            <h4 className="text-prolaw-gold text-[10px] font-bold uppercase tracking-widest mb-8">{t('common.disclaimerTitle')}</h4>
            <p className="text-[11px] text-slate-500 italic leading-relaxed">{t('common.disclaimerText')}</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 text-[10px] uppercase tracking-widest text-slate-500 font-bold flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Prolaw Law Firm. All Rights Reserved.</p>
          <Link to="/privacy-disclaimer" className="hover:text-prolaw-gold transition-colors">Privacy & Disclaimer</Link>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
