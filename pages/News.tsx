import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, ArrowLeft, User, Plus, X, Loader2, Edit, Search, Trash2 } from 'lucide-react';
import { GET_NEWS_ARTICLES } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../hooks/useAuth';
import { db, OperationType, handleFirestoreError } from '../lib/firebase';
import { collection, onSnapshot, query, addDoc, serverTimestamp, doc, updateDoc, deleteDoc, orderBy, where } from 'firebase/firestore';

interface NewsArticle {
  id: string;
  title: string;
  category: string;
  summary: string;
  author: string;
  date: string;
  status: string;
  createdAt: any;
  isFirebase?: boolean;
  imageUrl?: string;
  additionalImages?: string[];
}

const News: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const staticArticles = GET_NEWS_ARTICLES(t);
  const { user, isAdmin, loginWithGoogle, logout } = useAuth();
  
  const [firebaseArticles, setFirebaseArticles] = useState<NewsArticle[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form State
  const [formData, setFormData] = useState<{
    id?: string;
    title: string;
    category: string;
    summary: string;
    author: string;
    date: string;
    imageUrl?: string;
    additionalImages?: string[];
  }>({
    title: '',
    category: 'insights',
    summary: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isHeader: boolean) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX = 800;

          if (width > height) {
            if (width > MAX) {
              height *= MAX / width;
              width = MAX;
            }
          } else {
            if (height > MAX) {
              width *= MAX / height;
              height = MAX;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Use heavily compressed JPEG to keep size small for Firestore docs
          const base64String = canvas.toDataURL('image/jpeg', 0.6);
          
          setFormData(prev => {
            if (isHeader) {
               return { ...prev, imageUrl: base64String };
            } else {
               const current = prev.additionalImages || [];
               if (current.length >= 3) return prev; // max 3 additional images
               return { ...prev, additionalImages: [...current, base64String] };
            }
          });
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'insights',
      summary: '',
      author: '',
      date: new Date().toISOString().split('T')[0],
      imageUrl: undefined,
      additionalImages: undefined,
      id: undefined
    });
  };

  const handleEditClick = (article: NewsArticle) => {
    if (!article.isFirebase) return;
    setFormData({
      id: article.id,
      title: article.title,
      category: article.category,
      summary: article.summary,
      author: article.author,
      date: article.date,
      imageUrl: article.imageUrl,
      additionalImages: article.additionalImages,
    });
    setIsModalOpen(true);
  };

  useEffect(() => {
    let q;
    if (isAdmin) {
      q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
    } else {
      q = query(collection(db, 'news'), where('status', '==', 'published'));
    }
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const articles: NewsArticle[] = [];
      snapshot.forEach((doc) => {
        articles.push({ id: doc.id, ...doc.data(), isFirebase: true } as NewsArticle);
      });
      if (!isAdmin) {
        articles.sort((a, b) => {
           const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
           const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
           return timeB - timeA;
        });
      }
      setFirebaseArticles(articles);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'news');
    });

    return () => unsubscribe();
  }, [isAdmin]);

  const allArticles = [...firebaseArticles, ...staticArticles];

  const filteredArticles = allArticles.filter(article => {
    const term = searchTerm.toLowerCase();
    return article.title.toLowerCase().includes(term) || article.category.toLowerCase().includes(term);
  });

  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    setIsSubmitting(true);
    
    try {
      const payload: any = {
        title: formData.title,
        category: formData.category,
        summary: formData.summary,
        author: formData.author || (user?.displayName || 'Admin'),
        date: formData.date,
        status: 'published',
      };
      
      if (formData.imageUrl) payload.imageUrl = formData.imageUrl;
      if (formData.additionalImages && formData.additionalImages.length > 0) {
        payload.additionalImages = formData.additionalImages;
      }

      if (formData.id) {
        await updateDoc(doc(db, 'news', formData.id), payload);
      } else {
        payload.createdAt = serverTimestamp();
        await addDoc(collection(db, 'news'), payload);
      }

      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      handleFirestoreError(error, formData.id ? OperationType.UPDATE : OperationType.CREATE, formData.id ? `news/${formData.id}` : 'news');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, bypassConfirm: boolean = false) => {
    if (!isAdmin) return;
    try {
      await deleteDoc(doc(db, 'news', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `news/${id}`);
    }
  };

  return (
    <div className={`animate-in fade-in duration-700 ${isRtl ? 'text-right' : 'text-left'}`}>
      {/* Header */}
      <section className="bg-prolaw-navy py-20 relative">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-end">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{t('news.header_title')}</h1>
            <p className="text-xl text-slate-300 max-w-2xl font-light">
              {t('news.header_subtitle')}
            </p>
          </div>
          {isAdmin && (
            <button 
              onClick={() => { resetForm(); setIsModalOpen(true); }}
              className="bg-prolaw-gold text-prolaw-navy px-6 py-3 rounded font-bold hover:bg-white transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              {isRtl ? 'إضافة خبر' : 'Add News'}
            </button>
          )}
        </div>
      </section>

      {/* News Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {isAdmin && (
            <div className="mb-12 relative max-w-xl">
              <div className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'right-4' : 'left-4'} text-slate-400`}>
                <Search size={20} />
              </div>
              <input 
                type="text" 
                placeholder={isRtl ? 'البحث عن المقالات حسب العنوان أو الفئة...' : 'Search articles by title or category...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full p-4 rounded-lg bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-prolaw-gold ${isRtl ? 'pr-12 text-right' : 'pl-12 text-left'}`}
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredArticles.length === 0 && (
               <div className="col-span-full py-20 text-center bg-slate-50 border border-slate-100 rounded-lg">
                 <p className="text-xl text-slate-500 font-serif">No articles available.</p>
                 {isAdmin ? (
                   <p className="text-sm text-slate-400 mt-2">Use the "Add News Article" button to create an article.</p>
                 ) : (
                   <p className="text-sm text-slate-400 mt-2">Check back later for updates.</p>
                 )}
               </div>
            )}
            {filteredArticles.map((article: any) => (
              <article key={article.id} className="flex flex-col bg-slate-50 rounded-lg overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative">
                {isAdmin && article.isFirebase && (
                  <div className="absolute top-2 right-2 z-10 flex gap-2">
                    <button onClick={(e) => { e.preventDefault(); handleEditClick(article); }} className="bg-prolaw-navy text-white p-2 rounded-full hover:bg-prolaw-gold transition-colors">
                      <Edit size={16} />
                    </button>
                    <button onClick={(e) => { e.preventDefault(); handleDelete(article.id); }} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
                <Link to={`/blog/${article.id}`} className="block h-56 overflow-hidden relative">
                  <img 
                    src={article.imageUrl || `https://picsum.photos/seed/news${article.id}/800/600`} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 bg-slate-200" 
                  />
                  <div className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'}`}>
                    <span className="bg-prolaw-navy text-prolaw-goldLight text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                      {article.isFirebase ? article.category : t(`news.categories.${article.category}`)}
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

      {/* Auth Context */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex justify-end text-sm">
         {user ? (
           <div className="flex items-center gap-4 text-slate-500">
             <span>Signed in as {user.email} {isAdmin && '(Admin)'}</span>
             <Link to="/admin" className="underline hover:text-prolaw-navy font-bold">Admin Portal</Link>
           </div>
         ) : (
           <Link to="/admin" className="text-slate-400 hover:text-prolaw-navy transition-colors">Admin Login</Link>
         )}
      </div>

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

      {/* Add News Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-prolaw-navy/80 z-[150] flex items-center justify-center p-4 backdrop-blur-sm">
           <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="flex justify-between items-center p-6 border-b border-slate-100">
                 <h2 className="text-2xl font-bold text-prolaw-navy font-serif">{formData.id ? 'Edit News Article' : 'Add News Article'}</h2>
                 <button onClick={() => { setIsModalOpen(false); resetForm(); }} className="text-slate-400 hover:text-red-500 transition-colors">
                   <X size={24} />
                 </button>
              </div>
              <form onSubmit={handleAddNews} className="p-6 overflow-y-auto flex-grow flex flex-col gap-6">
                 <div>
                   <label className="block text-sm font-bold text-prolaw-navy mb-2 uppercase tracking-wide">Title</label>
                   <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded focus:ring-2 focus:ring-prolaw-gold outline-none" />
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                   <div>
                     <label className="block text-sm font-bold text-prolaw-navy mb-2 uppercase tracking-wide">Category</label>
                     <input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded focus:ring-2 focus:ring-prolaw-gold outline-none" placeholder="e.g. Insights" />
                   </div>
                   <div>
                     <label className="block text-sm font-bold text-prolaw-navy mb-2 uppercase tracking-wide">Date</label>
                     <input required type="text" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded focus:ring-2 focus:ring-prolaw-gold outline-none" />
                   </div>
                 </div>
                 <div>
                   <label className="block text-sm font-bold text-prolaw-navy mb-2 uppercase tracking-wide">Author</label>
                   <input required type="text" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded focus:ring-2 focus:ring-prolaw-gold outline-none" />
                 </div>
                 <div>
                   <label className="block text-sm font-bold text-prolaw-navy mb-2 uppercase tracking-wide">Summary</label>
                   <textarea required rows={4} value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded focus:ring-2 focus:ring-prolaw-gold outline-none resize-none"></textarea>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                   <div>
                     <label className="block text-sm font-bold text-prolaw-navy mb-2 uppercase tracking-wide">Header Image</label>
                     <input type="file" accept="image/*" onChange={e => handleImageUpload(e, true)} className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-prolaw-gold/10 file:text-prolaw-navy hover:file:bg-prolaw-gold/20 transition-colors" />
                     {formData.imageUrl && (
                        <div className="mt-2 w-full h-24 rounded overflow-hidden">
                           <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Header Preview" />
                        </div>
                     )}
                   </div>
                   <div>
                     <label className="block text-sm font-bold text-prolaw-navy mb-2 uppercase tracking-wide">Additional Images (Max 3)</label>
                     <input type="file" accept="image/*" multiple onChange={e => handleImageUpload(e, false)} disabled={(formData.additionalImages?.length || 0) >= 3} className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-prolaw-gold/10 file:text-prolaw-navy hover:file:bg-prolaw-gold/20 transition-colors disabled:opacity-50" />
                     {formData.additionalImages && formData.additionalImages.length > 0 && (
                        <div className="mt-2 flex gap-2 overflow-x-auto pb-2">
                           {formData.additionalImages.map((img, idx) => (
                             <div key={idx} className="w-16 h-16 shrink-0 rounded overflow-hidden">
                               <img src={img} className="w-full h-full object-cover" alt={`Preview ${idx}`} />
                             </div>
                           ))}
                        </div>
                     )}
                   </div>
                 </div>

                 <div className="pt-4 border-t border-slate-100 flex justify-between items-center gap-4">
                    {formData.id ? (
                      <button type="button" onClick={() => { setIsModalOpen(false); handleDelete(formData.id!); resetForm(); }} className="px-6 py-3 text-red-500 font-bold hover:bg-red-50 rounded transition-colors flex items-center gap-2 border border-red-200">
                        <Trash2 size={18} /> Delete
                      </button>
                    ) : <div></div>}
                    <div className="flex gap-4">
                      <button type="button" onClick={() => { setIsModalOpen(false); resetForm(); }} className="px-6 py-3 text-slate-500 font-bold hover:text-prolaw-navy">Cancel</button>
                      <button type="submit" disabled={isSubmitting} className="bg-prolaw-gold text-prolaw-navy px-8 py-3 rounded font-bold hover:bg-prolaw-navy hover:text-white transition-colors flex items-center gap-2">
                        {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : (formData.id ? 'Update Article' : 'Publish Article')}
                      </button>
                    </div>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default News;