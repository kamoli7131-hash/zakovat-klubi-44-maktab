import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, ShieldCheck, AlertCircle, X, Sparkles } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  adminCredentials: { username: string; password: string };
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  adminCredentials
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const inputUser = username.trim().toLowerCase();
    const inputPass = password.trim();

    // Check against configured credentials or fallback 4444
    if (
      (inputUser === adminCredentials.username.toLowerCase() || inputUser === 'admin') &&
      (inputPass === adminCredentials.password || inputPass === 'zakovat44' || inputPass === '4444')
    ) {
      onLoginSuccess();
      setUsername('');
      setPassword('');
      setErrorMsg('');
    } else {
      setErrorMsg('Login yoki parol xato! Qaytadan urinib ko\'ring.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        
        {/* Glow background accent */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/80 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge & Title */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30 shadow-inner">
            <Lock className="w-8 h-8 text-amber-400" />
          </div>

          <div className="inline-flex items-center space-x-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider mt-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Xavfsiz Tizim</span>
          </div>

          <h3 className="text-2xl font-black text-white tracking-tight">
            44-Maktab Koordinator Kirishi
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Maktab Zakovat klubi administratorlik boshqaruv paneliga kirish uchun xizmat ma'lumotlarini kiriting.
          </p>
        </div>

        {/* Demo credentials hint box */}
        <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-3 text-xs text-amber-200/90 flex items-start space-x-2.5">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-bold text-white text-[11px]">🔑 Sinov uchun kirish ma'lumotlari:</p>
            <p className="font-mono text-[11px] text-amber-300">
              Login: <strong className="text-white">admin</strong> | Parol: <strong className="text-white">zakovat44</strong> <span className="text-slate-400">(yoki 4444)</span>
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="bg-rose-950/60 border border-rose-500/40 text-rose-300 p-3 rounded-xl text-xs flex items-center space-x-2 animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-300">
              Koordinator Logini *
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-3 text-slate-400 pointer-events-none" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="masalan: admin"
                className="w-full bg-slate-950 text-white text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-300">
              Maxfiy Parol *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 text-white text-xs pl-9 pr-10 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-white p-0.5"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all active:scale-[0.98] mt-2"
          >
            Boshqaruv Paneliga Kirish
          </button>

        </form>

      </div>
    </div>
  );
};
