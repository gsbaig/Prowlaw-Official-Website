
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, ArrowRight, Share2, TrendingUp } from 'lucide-react';
import { GET_NEWS_ARTICLES } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const Post: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, isRtl } = useLanguage();
  const articles = GET_NEWS_ARTICLES(t);
  const article = articles.find((a: any) => a.id === id);

  // Get related posts (excluding current post, same category if possible)
  const relatedPosts = articles
    .filter((a: any) => a.id !== id)
    .sort((a: any, b: any) => (a.category === article?.category ? -1 : 1))
    .slice(0, 3);

  if (!article) {
    return <Navigate to="/blog" />;
  }

  return (
    <div className={`animate-in fade-in duration-700 ${isRtl ? 'text-right' : 'text-left'}`}>
      {/* Header Overlay */}
      <section className="relative h-[450px] md:h-[650px] flex items-end">
        <div className="absolute inset-0 bg-prolaw-navy/80 z-10" />
        <img 
          src={`https://picsum.photos/seed/news${article.id}/1920/800`} 
          className="absolute inset-0 w-full h-full object-cover" 
          alt={article.title} 
        />
        <div className="relative z-20 max-w-5xl mx-auto px-6 pb-20 w-full text-white">
          <Link 
            to="/blog" 
            className={`inline-flex items-center gap-3 text-prolaw-gold text-[11px] font-bold uppercase tracking-[0.3em] mb-12 hover:text-white transition-colors ${isRtl ? 'flex-row-reverse' : ''}`}
          >
            {isRtl ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
            {t('news.back_to_news')}
          </Link>
          <div className={`flex gap-4 mb-8 ${isRtl ? 'flex-row-reverse' : ''}`}>
             <span className="bg-prolaw-gold px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm">
               {t(`news.categories.${article.category}`)}
             </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.1] tracking-tight max-w-4xl">{article.title}</h1>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className={`flex flex-wrap items-center justify-between border-b border-slate-100 pb-12 mb-16 gap-8 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-10 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                <Calendar size={18} className="text-prolaw-gold" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                <User size={18} className="text-prolaw-gold" />
                <span>{t('news.author')} {article.author}</span>
              </div>
            </div>
            <button className={`flex items-center gap-3 text-slate-400 hover:text-prolaw-gold transition-colors text-xs font-bold uppercase tracking-widest ${isRtl ? 'flex-row-reverse' : ''}`}>
              <Share2 size={18} />
              {isRtl ? 'مشاركة المنشور' : 'Share Insights'}
            </button>
          </div>

          <div className="prose prose-xl prose-slate max-w-none text-slate-700 leading-[1.8] space-y-12">
            <p className="text-2xl md:text-3xl font-light text-prolaw-navy italic leading-relaxed border-l-4 border-prolaw-gold pl-8 py-2">
              {article.summary}
            </p>
            <div className="text-lg font-light text-slate-600 space-y-8">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <h3 className="text-3xl font-serif font-bold text-prolaw-navy mt-16 mb-8">Strategic Implications</h3>
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
              <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
            </div>
            <div className="bg-slate-50 p-10 md:p-14 rounded-sm border border-slate-100 italic text-prolaw-navy shadow-sm mt-20">
              <p className="text-sm leading-relaxed font-light opacity-80">
                {isRtl 
                  ? 'ملاحظة: المعلومات المقدمة في هذه المقالة هي لأغراض إعلامية عامة فقط ولا تشكل استشارة قانونية.' 
                  : 'Disclaimer: The information provided in this article is for general informational purposes only and does not constitute legal advice. Please seek qualified legal counsel for specific matters.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts Section */}
      <section className="py-32 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`flex items-center gap-5 mb-16 ${isRtl ? 'flex-row-reverse' : ''}`}>
             <TrendingUp size={24} className="text-prolaw-gold" />
             <h2 className="text-3xl font-serif font-bold text-prolaw-navy tracking-tight">{t('common.relatedPosts')}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {relatedPosts.map((related: any) => (
              <Link 
                key={related.id} 
                to={`/blog/${related.id}`} 
                className="group flex flex-col bg-white border border-slate-100 p-8 hover:border-prolaw-gold hover:shadow-2xl transition-all duration-500 rounded-sm"
              >
                <div className="h-48 overflow-hidden mb-8 grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img src={`https://picsum.photos/seed/news${related.id}/600/400`} alt={related.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className={`text-prolaw-gold text-[10px] font-bold uppercase tracking-widest mb-4 ${isRtl ? 'text-right' : ''}`}>
                  {t(`news.categories.${related.category}`)}
                </div>
                <h3 className="text-xl font-bold text-prolaw-navy mb-6 leading-snug group-hover:text-prolaw-gold transition-colors tracking-tight line-clamp-2">
                  {related.title}
                </h3>
                <div className={`mt-auto flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 group-hover:text-prolaw-navy transition-colors ${isRtl ? 'flex-row-reverse' : ''}`}>
                   {isRtl ? 'اقرأ المزيد' : 'Read Article'}
                   {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-32 bg-prolaw-navy text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-10 tracking-tight">
            {isRtl ? 'هل لديك أسئلة قانونية؟' : 'Expert Consultation'}
          </h2>
          <p className="text-slate-300 text-lg md:text-xl font-light mb-12 leading-relaxed">
            {isRtl 
              ? 'فريقنا متاح لمناقشة التأثيرات المحددة لهذه التطورات على عمليات عملك.' 
              : 'Our regional experts are available to provide tailored advice based on the latest regulatory changes.'}
          </p>
          <Link to="/contact" className="inline-flex bg-prolaw-gold hover:bg-white hover:text-prolaw-navy text-white px-12 py-6 rounded-sm text-sm font-bold uppercase tracking-widest transition-all duration-500 shadow-2xl">
            {t('nav.consult')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Post;
