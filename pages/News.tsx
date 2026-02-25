import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, ArrowLeft, User } from 'lucide-react';
import { GET_NEWS_ARTICLES } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const News: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const articles = GET_NEWS_ARTICLES(t);

  return (
    <div className={`animate-in fade-in duration-700 ${isRtl ? 'text-right' : 'text-left'}`}>
      {/* Header */}
      <section className="bg-prolaw-navy py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{t('news.header_title')}</h1>
          <p className="text-xl text-slate-300 max-w-2xl font-light">
            {t('news.header_subtitle')}
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {articles.map((article: any) => (
              <article key={article.id} className="flex flex-col bg-slate-50 rounded-lg overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                <Link to={`/blog/${article.id}`} className="block h-56 overflow-hidden relative">
                  <img 
                    src={`https://picsum.photos/seed/news${article.id}/800/600`} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'}`}>
                    <span className="bg-prolaw-navy text-prolaw-goldLight text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                      {t(`news.categories.${article.category}`)}
                    </span>
                  </div>
                </Link>
                <div className="p-8 flex-grow flex flex-col">
                  <div className={`flex items-center gap-4 text-slate-400 text-[10px] mb-4 uppercase tracking-widest font-bold ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={12} />
                      <span>{article.author}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-prolaw-navy mb-4 leading-snug group-hover:text-prolaw-gold transition-colors">
                    <Link to={`/blog/${article.id}`}>{article.title}</Link>
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                    {article.summary}
                  </p>
                  <Link 
                    to={`/blog/${article.id}`} 
                    className={`inline-flex items-center gap-2 text-prolaw-gold font-bold text-sm hover:gap-3 transition-all ${isRtl ? 'flex-row-reverse' : ''}`}
                  >
                    {t('news.read_more')}
                    {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup Placeholder */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-prolaw-navy mb-4">
            {isRtl ? 'ابقَ على اطلاع دائم' : 'Stay Informed'}
          </h2>
          <p className="text-slate-600 mb-8">
            {isRtl ? 'اشترك في نشرتنا الإخبارية لتلقي آخر التحديثات القانونية مباشرة في بريدك الإلكتروني.' : 'Subscribe to our legal briefing to receive the latest regulatory updates directly in your inbox.'}
          </p>
          <form className={`flex flex-col sm:flex-row gap-4 max-w-md mx-auto ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
            <input 
              type="email" 
              placeholder={isRtl ? 'بريدك الإلكتروني' : 'Your Email Address'}
              className={`flex-grow p-4 rounded bg-white border border-slate-200 outline-none focus:ring-2 focus:ring-prolaw-gold ${isRtl ? 'text-right' : ''}`}
            />
            <button className="bg-prolaw-navy text-white px-8 py-4 rounded font-bold hover:bg-prolaw-gold transition-colors">
              {isRtl ? 'اشتراك' : 'Subscribe'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default News;