import React from 'react';
import { Brain, MapPin, Phone, Mail, Globe, Heart, Award, ArrowUp, Send } from 'lucide-react';
import { SchoolInfo } from '../types';

interface FooterProps {
  onNavigate: (tab: string) => void;
  schoolInfo?: SchoolInfo;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, schoolInfo }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const schoolNum = schoolInfo?.schoolNumber || '44';
  const clubTitle = schoolInfo?.clubName || 'ZAKOVAT KLUBI';
  const schoolTitle = schoolInfo?.schoolName || "44-sonli umumiy o'rta ta'lim maktabi";
  const desc = schoolInfo?.footerDescription || `${schoolTitle} Zakovat intellektual klubi rasmiy portali. Yoshlar intellektual salohiyatini oshirish maydoni.`;
  const address = schoolInfo?.address || "Samarqand viloyati, Pastdarg'om tumani, Go'zal MFY, 44-maktab";
  const phone = schoolInfo?.phone || "+998 (95) 145 09 19";
  const email = schoolInfo?.email || "malumot@zakovat.tv";
  const copyright = schoolInfo?.footerCopyright || `© ${new Date().getFullYear()} ${schoolNum}-Sonli Maktab Zakovat Klubi. Barcha huquqlar himoyalangan.`;
  const telegram = schoolInfo?.telegramChannel || "@zakovat44_maktab";

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2 text-white font-bold text-base">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950">
                <Brain className="w-4 h-4" />
              </div>
              <span className="text-amber-400 font-black uppercase">{schoolNum}-MAKTAB {clubTitle}</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              {desc}
            </p>
            {telegram && (
              <a 
                href={`https://t.me/${telegram.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-bold transition-colors pt-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Telegram: {telegram}</span>
              </a>
            )}
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Bo'limlar</h4>
            <ul className="space-y-1.5">
              <li><button onClick={() => onNavigate('home')} className="hover:text-amber-400 transition-colors">Bosh sahifa</button></li>
              <li><button onClick={() => onNavigate('live-host')} className="hover:text-amber-400 transition-colors">🎤 Proyektor / Akt Zali</button></li>
              <li><button onClick={() => onNavigate('marathon')} className="hover:text-amber-400 transition-colors">🔥 Kun Savoli & Taktika</button></li>
              <li><button onClick={() => onNavigate('duel')} className="hover:text-amber-400 transition-colors">⚔️ Tezkor Duel (1v1)</button></li>
              <li><button onClick={() => onNavigate('certificates')} className="hover:text-amber-400 transition-colors">📜 Diplom Generatori (PDF)</button></li>
              <li><button onClick={() => onNavigate('tournaments')} className="hover:text-amber-400 transition-colors">Turnirlar va Ligalar</button></li>
              <li><button onClick={() => onNavigate('teams')} className="hover:text-amber-400 transition-colors">Jamoalar Reytingi</button></li>
              <li><button onClick={() => onNavigate('questions')} className="hover:text-amber-400 transition-colors">Savollar Bazasi & Quiz</button></li>
            </ul>
          </div>

          {/* Col 3: Rules & Info */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Axborot</h4>
            <ul className="space-y-1.5">
              <li><button onClick={() => onNavigate('news')} className="hover:text-amber-400 transition-colors">Yangiliklar va E'lonlar</button></li>
              <li><button onClick={() => onNavigate('gallery')} className="hover:text-amber-400 transition-colors">Foto Gallereya</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors">Klub Haqida & Nizom</button></li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Bog'lanish</h4>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="hover:text-amber-400 transition-colors">{phone}</a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-amber-400 transition-colors">{email}</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & scroll button */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            {copyright}
          </div>

          <button
            onClick={scrollToTop}
            className="bg-slate-900 hover:bg-slate-800 text-slate-300 p-2 rounded-xl border border-slate-800 flex items-center space-x-1 cursor-pointer"
          >
            <span>Yuqoriga</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
