
import React, { useState, useEffect, useRef } from 'react';
import { X, Mail, Lock, User, ArrowRight, CheckCircle2, AlertCircle, Chrome } from 'lucide-react';
import Button from './Button';
import { api } from '../api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState<{ type: 'error' | 'success', message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const googleBtnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && (window as any).google) {
      const google = (window as any).google;
      
      // Initialize Google Identity Services
      google.accounts.id.initialize({
        client_id: "576284646535-q1h8u6o2p9vkspsbnt8h6u4m2j5p2j6p.apps.googleusercontent.com", // Generic Client ID for dev
        callback: handleGoogleResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
        // Disable FedCM to prevent permission errors in sandboxed environments
        use_fedcm_for_prompt: false,
      });

      // Render the standard button
      if (googleBtnRef.current) {
        google.accounts.id.renderButton(googleBtnRef.current, {
          theme: "outline",
          size: "large",
          width: googleBtnRef.current.offsetWidth || 400,
          text: "continue_with",
          shape: "pill",
        });
      }

      // Trigger One Tap prompt (fetches gmail IDs automatically)
      google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed()) {
          console.warn("One Tap prompt not displayed:", notification.getNotDisplayedReason());
        }
      });
    }
  }, [isOpen, isLogin]);

  const handleGoogleResponse = async (response: any) => {
    setIsLoading(true);
    try {
      // Decode the JWT credential from Google to get user info
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      
      const data = await api.googleLogin({
        email: payload.email,
        name: payload.name,
        imageUrl: payload.picture,
        sub: payload.sub
      });

      localStorage.setItem('token', data.token);
      onLoginSuccess(data.user);
      onClose();
    } catch (err: any) {
      setStatus({ type: 'error', message: "Google Authentication failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setIsLoading(true);
    
    try {
      if (isLogin) {
        const data = await api.login({ email: formData.email.trim(), password: formData.password });
        localStorage.setItem('token', data.token);
        onLoginSuccess(data.user);
        onClose();
      } else {
        await api.register({ 
          name: formData.name.trim(), 
          email: formData.email.trim(), 
          password: formData.password 
        });
        setIsLogin(true);
        setStatus({ type: 'success', message: 'Registration successful! You can now log in.' });
      }
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-zinc-900 border border-white/10 rounded-3xl w-full max-w-md p-10 shadow-2xl">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"><X size={24} /></button>
        
        <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tight">
            {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-400 text-sm">
            {isLogin ? 'Your summit dashboard is waiting.' : 'Join the elite community of visionaries.'}
            </p>
        </div>

        {status && (
          <div className={`flex items-center gap-3 p-4 rounded-xl mb-6 text-sm font-medium border ${
            status.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}>
            {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            {status.message}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all" placeholder="Enter your name" />
              </div>
            </div>
          )}
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all" placeholder="name@company.com" />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input required type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all" placeholder="••••••••" />
            </div>
          </div>
          
          <Button disabled={isLoading} className="w-full py-4.5 mt-2 flex items-center justify-center gap-2 text-base">
            {isLoading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')} {!isLoading && <ArrowRight size={20} />}
          </Button>
        </form>

        <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10"></span></div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold"><span className="bg-zinc-900 px-4 text-gray-500">Or connect with</span></div>
        </div>

        {/* Google One Tap / Button Container */}
        <div className="flex flex-col gap-3">
             <div ref={googleBtnRef} className="w-full overflow-hidden rounded-full flex justify-center"></div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button onClick={() => { setIsLogin(!isLogin); setStatus(null); }} className="text-orange-500 font-bold hover:underline">
            {isLogin ? 'Create One' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
