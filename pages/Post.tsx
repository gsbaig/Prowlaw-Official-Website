
import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, ArrowRight, Share2, TrendingUp, Loader2, Linkedin, Twitter, Link2 } from 'lucide-react';
import { GET_NEWS_ARTICLES } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';

const Post: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, isRtl } = useLanguage();
  const staticArticles = GET_NEWS_ARTICLES(t);
  
  const [article, setArticle] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      
      let currentArticle: any = null;
      
      // 1. Fetch current article
      const staticMatch = staticArticles.find((a: any) => a.id === id);
      if (staticMatch) {
         currentArticle = staticMatch;
      } else {
         try {
            if (!id) throw new Error("No ID");
            const docRef = doc(db, 'news', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                currentArticle = { id: docSnap.id, ...docSnap.data(), isFirebase: true };
            }
         } catch (err) {
            console.error("Error fetching article", err);
         }
      }
      
      setArticle(currentArticle);
      
      // 2. Fetch related posts
      if (currentArticle) {
         try {
            let firebaseRelated: any[] = [];
            const q = query(collection(db, 'news'), where('status', '==', 'published'));
            const docsSnap = await getDocs(q);
            
            docsSnap.forEach(docSnap => {
              if (docSnap.id !== id) {
                firebaseRelated.push({ id: docSnap.id, ...docSnap.data(), isFirebase: true });
              }
            });

            const staticFiltered = staticArticles.filter((a: any) => a.id !== id);

            const allRelated = [...firebaseRelated, ...staticFiltered]
                .sort((a: any, b: any) => {
                   // prioritize same category
                   if (a.category === currentArticle.category && b.category !== currentArticle.category) return -1;
                   if (b.category === currentArticle.category && a.category !== currentArticle.category) return 1;
                   // then by date descending
                   const dateA = a.createdAt?.toDate?.()?.getTime() || new Date(a.date).getTime() || 0;
                   const dateB = b.createdAt?.toDate?.()?.getTime() || new Date(b.date).getTime() || 0;
                   return dateB - dateA;
                })
                .slice(0, 3);
                
            setRelatedPosts(allRelated);
         } catch (err) {
            console.error("Error fetching related posts", err);
         }
      }

      setLoading(false);
    };

    fetchContent();
  }, [id, t, staticArticles]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert(isRtl ? 'تم نسخ الرابط!' : 'Link copied to clipboard!');
  };

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(article.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  if (loading) {
     return <div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-prolaw-gold w-12 h-12" /></div>;
  }

  // Not found fallback
  if (!article && !loading) {
    return <Navigate to="/blog" />;
  }

  return (
    <div className={`animate-in fade-in duration-700 ${isRtl ? 'text-right' : 'text-left'}`}>
      {/* Header Overlay */}
      <section className="relative h-[450px] md:h-[650px] flex items-end">
        <div className="absolute inset-0 bg-prolaw-navy/80 z-10" />
        <img 
          src={article.imageUrl || `https://picsum.photos/seed/news${article.id}/1920/800`} 
          className="absolute inset-0 w-full h-full object-cover bg-slate-200" 
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
             <span className="bg-prolaw-gold px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm shadow-sm text-prolaw-navy">
               {article.isFirebase ? article.category : t(`news.categories.${article.category}`)}
             </span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold leading-[1.2] tracking-tight max-w-4xl">{article.title}</h1>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className={`flex flex-wrap items-center justify-between border-b border-slate-100 pb-12 mb-16 gap-8 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-6 md:gap-10 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                <Calendar size={18} className="text-prolaw-gold" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                <User size={18} className="text-prolaw-gold" />
                <span>{t('news.author')} {article.author}</span>
              </div>
            </div>
            
            <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm font-bold text-slate-400 tracking-widest uppercase">{t('common.share') || 'Share:'}</span>
              <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <button onClick={shareOnLinkedIn} className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-prolaw-navy hover:border-prolaw-navy transition-colors" aria-label="Share on LinkedIn">
                  <Linkedin size={18} />
                </button>
                <button onClick={shareOnTwitter} className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-400 transition-colors" aria-label="Share on Twitter">
                  <Twitter size={18} />
                </button>
                <button onClick={copyToClipboard} className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-prolaw-gold hover:border-prolaw-gold transition-colors" aria-label="Copy link">
                  <Link2 size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="prose prose-xl prose-slate max-w-none text-slate-700 leading-[1.8] space-y-12">
            <p className="text-2xl md:text-3xl font-light text-prolaw-navy italic leading-relaxed border-l-4 border-prolaw-gold pl-8 py-2">
              {article.summary}
            </p>
            
            {article.additionalImages && article.additionalImages.length > 0 && (
                <div className={`grid grid-cols-1 ${article.additionalImages.length === 2 ? 'md:grid-cols-2' : article.additionalImages.length === 3 ? 'md:grid-cols-3' : ''} gap-6 my-12`}>
                   {article.additionalImages.map((img: string, idx: number) => (
                      <div key={idx} className="w-full aspect-video rounded overflow-hidden shadow-lg border border-slate-100">
                          <img src={img} alt={`Additional content ${idx}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 bg-slate-100" />
                      </div>
                   ))}
                </div>
            )}
            
            {/* Fallback Text for Firebase Articles without true content field */}
            {article.isFirebase && (
               <div className="text-lg font-light text-slate-600 space-y-8">
                 <p>This article is dynamically loaded from the server and does not have additional body content specified at upload.</p>
               </div>
            )}

            {!article.isFirebase && (
                <div className="text-lg font-light text-slate-600 space-y-8">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  <h3 className="text-3xl font-serif font-bold text-prolaw-navy mt-16 mb-8">Strategic Implications</h3>
                  <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                  <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
                </div>
            )}

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
      {relatedPosts.length > 0 && (
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
                  <img src={related.imageUrl || `https://picsum.photos/seed/news${related.id}/600/400`} alt={related.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 bg-slate-200" />
                </div>
                <div className={`text-prolaw-gold text-[10px] font-bold uppercase tracking-widest mb-4 ${isRtl ? 'text-right' : ''}`}>
                  {related.isFirebase ? related.category : t(`news.categories.${related.category}`)}
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
      )}

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
