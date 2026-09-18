
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, ChevronDown, AlertCircle, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { GET_SERVICES } from '../constants';

interface FormState {
  name: string;
  email: string;
  phone: string;
  expertise: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  expertise?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const { t, isRtl, lang } = useLanguage();
  const services = GET_SERVICES(t);

  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    expertise: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateField = (name: string, value: string) => {
    let error = '';
    
    if (name === 'name') {
      if (!value.trim()) error = lang === 'ar' ? 'الاسم مطلوب' : 'Full name is required';
      else if (value.length < 3) error = lang === 'ar' ? 'الاسم يجب أن يكون 3 أحرف على الأقل' : 'Name must be at least 3 characters';
    }

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) error = lang === 'ar' ? 'البريد مطلوب' : 'Email is required';
      else if (!emailRegex.test(value)) error = lang === 'ar' ? 'صيغة البريد غير صحيحة' : 'Please enter a valid email address';
    }

    if (name === 'phone') {
      // Validate international phone format: +XXXXXXXXXXX, 8-15 digits
      const phoneRegex = /^\+?[\d\s-]{8,15}$/;
      if (value && !phoneRegex.test(value)) {
        error = lang === 'ar' ? 'رقم الهاتف غير صحيح' : 'Invalid phone number format';
      }
    }

    if (name === 'expertise' && !value) {
      error = lang === 'ar' ? 'يرجى اختيار الخبرة' : 'Please select an expertise area';
    }

    if (name === 'message') {
      if (!value.trim()) error = lang === 'ar' ? 'الرسالة مطلوبة' : 'Message is required';
      else if (value.length < 10) error = lang === 'ar' ? 'الرسالة قصيرة جداً' : 'Message must be at least 10 characters';
    }

    setErrors(prev => ({ ...prev, [name]: error || undefined }));
    return !error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear errors as user types
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final validation sweep
    const isNameValid = validateField('name', formData.name);
    const isEmailValid = validateField('email', formData.email);
    const isExpertiseValid = validateField('expertise', formData.expertise);
    const isMessageValid = validateField('message', formData.message);
    const isPhoneValid = validateField('phone', formData.phone);

    if (isNameValid && isEmailValid && isExpertiseValid && isMessageValid && isPhoneValid) {
      setIsSubmitting(true);
      
      try {
        const response = await fetch('/contact.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          body: new URLSearchParams(formData as Record<string, string>).toString()
        });

        let data;
        const text = await response.text(); // Read as text first to handle cPanel injection
        
        try {
          data = JSON.parse(text);
        } catch (err) {
          // If status is 200 but it's not JSON, assume success (cPanel often injects HTML into PHP responses)
          if (response.ok) {
            console.warn("Server returned success but response was not JSON:", text);
            data = { success: true };
          } else {
            throw new Error(`Server returned a non-JSON response. Status: ${response.status}. Response: ${text.substring(0, 50)}...`);
          }
        }

        if (response.ok) {
          setSubmitted(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setTimeout(() => setSubmitted(false), 8000);
          setFormData({ name: '', email: '', phone: '', expertise: '', message: '' });
        } else {
          // Handle error (e.g. backend validation or email service error)
          alert(lang === 'ar' ? `حدث خطأ: ${data.error}` : `Error: ${data.error}`);
        }
      } catch (error: any) {
        console.error("Submission error:", error);
        alert(lang === 'ar' ? `فشل في إرسال النموذج. التفاصيل: ${error.message}` : `Failed to submit form. Details: ${error.message}`);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className={`animate-in fade-in duration-700 ${isRtl ? 'text-right' : ''}`}>
      {/* Header */}
      <section className="bg-prolaw-navy py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight font-serif">{t('contact.title')}</h1>
          <p className="text-xl text-slate-300 max-w-2xl font-light leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`grid grid-cols-1 lg:grid-cols-3 gap-16`}>
            <div className={`lg:col-span-1 space-y-12 ${isRtl ? 'lg:order-2' : ''}`}>
              <div>
                <h3 className="text-2xl font-serif font-bold text-prolaw-navy mb-8 border-b-2 border-prolaw-gold pb-4 inline-block">{isRtl ? 'ابق على تواصل' : 'Get in Touch'}</h3>
                <div className="space-y-8">
                  {[
                    { icon: <MapPin className="text-prolaw-gold" />, title: t('common.amman'), detail: t('common.ammanAddress') },
                    { icon: <MapPin className="text-prolaw-gold" />, title: t('common.riyadh'), detail: t('common.riyadhAddress') },
                    { icon: <Phone className="text-prolaw-gold" />, title: isRtl ? 'دعم الهاتف' : 'Phone Support', detail: '+962 6 5678110 , + 962 6 565 4400' },
                    { icon: <Mail className="text-prolaw-gold" />, title: isRtl ? 'راسلنا' : 'Email Us', detail: 'Info@prolaw-jordan.com' },
                    { icon: <Globe className="text-prolaw-gold" />, title: isRtl ? 'الموقع الإلكتروني' : 'Website', detail: 'www.prolaw-jordan.com' },
                    { icon: <Clock className="text-prolaw-gold" />, title: isRtl ? 'ساعات العمل' : 'Business Hours', detail: isRtl ? 'الأحد – الخميس | 9:00 ص – 6:00 م' : 'Sun – Thu | 9:00 AM – 6:00 PM' }
                  ].map((item, idx) => (
                    <div key={idx} className={`flex gap-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center shrink-0 shadow-sm border border-slate-100">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-prolaw-navy text-sm uppercase tracking-wider">{item.title}</h4>
                        <p className="text-slate-600 text-sm mt-1 leading-relaxed" dir={idx > 1 ? 'ltr' : undefined}>{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-slate-50 p-8 md:p-14 rounded-2xl shadow-xl border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-prolaw-gold/5 rounded-full -mr-16 -mt-16" />
                <h3 className="text-3xl font-serif font-bold text-prolaw-navy mb-10">{t('contact.formTitle')}</h3>
                
                {submitted ? (
                  <div className="bg-white border border-green-100 p-12 rounded-xl text-center animate-in zoom-in duration-500 shadow-2xl">
                    <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                       <Send size={40} />
                    </div>
                    <h4 className="text-2xl font-bold mb-4 text-slate-800">{t('contact.successTitle')}</h4>
                    <p className="text-slate-500">{t('contact.successMsg')}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">{t('contact.name')}</label>
                        <input 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          onBlur={(e) => validateField('name', e.target.value)}
                          required 
                          type="text" 
                          className={`w-full bg-white border p-4 rounded-lg outline-none transition-all shadow-sm ${errors.name ? 'border-red-400 ring-1 ring-red-100' : 'border-slate-200 focus:ring-1 focus:ring-prolaw-gold'} ${isRtl ? 'text-right' : 'text-left'}`} 
                        />
                        {errors.name && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 mt-1"><AlertCircle size={10}/> {errors.name}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">{t('contact.email')}</label>
                        <input 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onBlur={(e) => validateField('email', e.target.value)}
                          required 
                          type="email" 
                          className={`w-full bg-white border p-4 rounded-lg outline-none transition-all shadow-sm ${errors.email ? 'border-red-400 ring-1 ring-red-100' : 'border-slate-200 focus:ring-1 focus:ring-prolaw-gold'} ${isRtl ? 'text-right' : 'text-left'}`} 
                        />
                        {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 mt-1"><AlertCircle size={10}/> {errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">{t('contact.phone')}</label>
                        <input 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          onBlur={(e) => validateField('phone', e.target.value)}
                          type="tel" 
                          placeholder="+XXX XXXXXXXX"
                          className={`w-full bg-white border p-4 rounded-lg outline-none transition-all shadow-sm ${errors.phone ? 'border-red-400 ring-1 ring-red-100' : 'border-slate-200 focus:ring-1 focus:ring-prolaw-gold'} ${isRtl ? 'text-right' : 'text-left'}`} 
                        />
                        {errors.phone && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 mt-1"><AlertCircle size={10}/> {errors.phone}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">{t('contact.practice')}</label>
                        <div className="relative">
                          <select 
                            name="expertise"
                            value={formData.expertise}
                            onChange={handleInputChange}
                            onBlur={(e) => validateField('expertise', e.target.value)}
                            required 
                            className={`w-full bg-white border p-4 rounded-lg outline-none transition-all appearance-none shadow-sm cursor-pointer ${errors.expertise ? 'border-red-400 ring-1 ring-red-100' : 'border-slate-200 focus:ring-1 focus:ring-prolaw-gold'} ${isRtl ? 'text-right pl-12 pr-4' : 'text-left pr-12 pl-4'}`}
                          >
                            <option value="" disabled>{isRtl ? 'اختر مجال الخبرة' : 'Select an expertise area'}</option>
                            {services.map(s => (
                              <option key={s.id} value={s.id}>{s.title}</option>
                            ))}
                            <option value="other">{isRtl ? 'أخرى' : 'Other'}</option>
                          </select>
                          <ChevronDown size={18} className={`absolute top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none ${isRtl ? 'left-4' : 'right-4'}`} />
                        </div>
                        {errors.expertise && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 mt-1"><AlertCircle size={10}/> {errors.expertise}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">{t('contact.message')}</label>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        onBlur={(e) => validateField('message', e.target.value)}
                        required 
                        rows={5} 
                        className={`w-full bg-white border p-4 rounded-lg outline-none transition-all shadow-sm ${errors.message ? 'border-red-400 ring-1 ring-red-100' : 'border-slate-200 focus:ring-1 focus:ring-prolaw-gold'} ${isRtl ? 'text-right' : 'text-left'}`}
                      ></textarea>
                      {errors.message && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 mt-1"><AlertCircle size={10}/> {errors.message}</p>}
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className={`w-full bg-prolaw-navy hover:bg-prolaw-gold text-white px-12 py-6 rounded-lg font-bold text-sm uppercase tracking-[0.2em] transition-all shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-50 disabled:translate-y-0 ${isRtl ? 'flex-row-reverse' : ''}`}
                    >
                      {isSubmitting ? (lang === 'ar' ? 'جاري الإرسال...' : 'Sending...') : t('contact.submit')}
                      {!isSubmitting && <Send size={20} />}
                    </button>
                    <p className="text-[10px] text-slate-400 italic mt-6 leading-relaxed">
                      {lang === 'en' 
                        ? 'Disclaimer: Submitting this form does not establish an attorney-client relationship. Please do not send confidential or sensitive information.'
                        : 'إخلاء مسؤولية: تقديم هذا النموذج لا ينشئ علاقة بين المحامي والموكل. يرجى عدم إرسال معلومات سرية أو حساسة.'}
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
