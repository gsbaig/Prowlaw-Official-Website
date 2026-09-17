import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Shield, Loader2, FileText, CheckCircle2 } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

const Admin: React.FC = () => {
  const { user, isAdmin, loading, loginWithGoogle, logout } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    await loginWithGoogle();
    setIsLoggingIn(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-prolaw-gold" size={48} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-xl border border-slate-100 flex flex-col items-center">
          <Shield size={64} className="text-prolaw-gold mb-6" />
          <h1 className="text-3xl font-serif font-bold text-prolaw-navy mb-2">Admin Portal</h1>
          <p className="text-slate-600 mb-8 text-center">Sign in to access the Prolaw administration panel to manage news and content.</p>
          <button 
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="w-full bg-prolaw-navy text-white px-6 py-4 rounded-lg font-bold hover:bg-prolaw-gold transition-colors flex justify-center items-center gap-3 disabled:opacity-50"
          >
            {isLoggingIn ? <Loader2 className="animate-spin" size={20} /> : <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 bg-white rounded-full p-0.5" />}
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
        <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-6">
          <Shield size={40} />
        </div>
        <h1 className="text-3xl font-serif font-bold text-prolaw-navy mb-4 text-center">Access Denied</h1>
        <p className="text-slate-600 mb-8 max-w-md text-center bg-white p-6 rounded-lg shadow-sm">
          You are signed in as <strong>{user.email}</strong>, but this account does not have administrator privileges.
        </p>
        <button 
          onClick={logout}
          className="text-prolaw-navy underline hover:text-prolaw-gold font-bold transition-colors"
        >
          Sign out and try another account
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 relative">
            <div>
              <h1 className="text-4xl font-serif font-bold text-prolaw-navy mb-2">Admin Dashboard</h1>
              <p className="text-slate-500 flex items-center gap-2">Signed in as {user.email} <CheckCircle2 size={16} className="text-green-500" /></p>
            </div>
            <button 
              onClick={logout}
              className="text-slate-500 hover:text-red-500 underline text-sm transition-colors"
            >
              Log out
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 hover:border-prolaw-gold transition-colors group">
              <div className="w-14 h-14 bg-prolaw-navy text-prolaw-gold rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileText size={28} />
              </div>
              <h2 className="text-2xl font-bold text-prolaw-navy mb-3">Manage News</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Add, edit, or remove news articles from the website's News section. Published articles are immediately visible to visitors.
              </p>
              <Link 
                to="/blog"
                className="bg-prolaw-gold text-prolaw-navy px-6 py-3 rounded font-bold hover:bg-prolaw-navy hover:text-white transition-colors inline-block"
              >
                Go to News Manager
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
