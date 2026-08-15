import React, { useState } from 'react';
import { 
  Trophy, 
  Users, 
  Brain, 
  HelpCircle, 
  Newspaper, 
  Image as ImageIcon, 
  Info, 
  Search, 
  UserPlus, 
  Sparkles, 
  Menu, 
  X, 
  Lock, 
  Globe, 
  FileText, 
  Mail, 
  Phone, 
  Send,
  Tv,
  Award,
  Swords,
  Flame
} from 'lucide-react';

import { SchoolInfo } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenRegister: () => void;
  onOpenLogin: () => void;
  onOpenCoordinator: () => void;
  onOpenTeamCabinet?: () => void;
  schoolInfo?: SchoolInfo;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onOpenRegister,
  onOpenLogin,
  onOpenCoordinator,
  onOpenTeamCabinet,
  schoolInfo
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const contactEmail = schoolInfo?.email || 'malumot@zakovat.tv';
  const contactPhone = schoolInfo?.phone || '+998 (95) 145-09-19';
  const telegramHandle = schoolInfo?.telegramChannel || '@zakovat44_maktab';
  const telegramUrl = telegramHandle ? (telegramHandle.startsWith('http') ? telegramHandle : `https://t.me/${telegramHandle.replace('@', '')}`) : '';
  const headerAnnouncement = schoolInfo?.headerAnnouncement || '';
  const headerLink = schoolInfo?.headerAnnouncementLink || telegramUrl;
  const schoolNum = schoolInfo?.schoolNumber || '44';
  const clubTitle = schoolInfo?.clubName || 'ZAKOVAT KLUBI';

  const navItems = [
    { id: 'home', label: 'Bosh sahifa', icon: Sparkles },
    { id: 'live-host', label: 'Proyektor Rejimi', icon: Tv, badge: 'Akt Zali' },
    { id: 'marathon', label: 'Kun Savoli & Taktika', icon: Flame, badge: 'Kunlik' },
    { id: 'duel', label: 'Tezkor Duel', icon: Swords, badge: '1v1' },
    { id: 'open-questions', label: 'Ochiq Savollar', icon: FileText, badge: 'Yangilandi' },
    { id: 'tournaments', label: 'Turnirlar', icon: Trophy },
    { id: 'teams', label: 'Jamoalar', icon: Users },
    { id: 'questions', label: 'Live Quiz', icon: HelpCircle },
    { id: 'certificates', label: 'Diplomlar', icon: Award, badge: 'PDF' },
    { id: 'news', label: 'Yangiliklar', icon: Newspaper },
    { id: 'gallery', label: 'Galereya', icon: ImageIcon },
    { id: 'about', label: 'Biz haqimizda', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#1c1611]/90 backdrop-blur-md border-b border-amber-500/25 text-amber-50 shadow-xl transition-all">
      
      {/* Top Contact & Quick Nav Bar */}
      <div className="bg-[#120e0a]/95 border-b border-amber-500/20 text-[11px] py-1.5 px-4 text-amber-200/80">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          
          {/* Left contact info */}
          <div className="flex flex-wrap items-center gap-4 text-amber-200/70">
            {contactEmail && (
              <a href={`mailto:${contactEmail}`} className="hover:text-amber-400 flex items-center gap-1 transition-colors">
                <Mail className="w-3 h-3 text-amber-400" />
                <span>{contactEmail}</span>
              </a>
            )}
            {contactPhone && (
              <a href={`tel:${contactPhone.replace(/[^0-9+]/g, '')}`} className="hover:text-amber-400 flex items-center gap-1 transition-colors">
                <Phone className="w-3 h-3 text-amber-400" />
                <span>{contactPhone}</span>
              </a>
            )}
            {telegramUrl && (
              <>
                <span className="hidden md:inline-block text-amber-900/60">|</span>
                <a 
                  href={telegramUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="hidden md:inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 font-medium transition-colors cursor-pointer"
                >
                  <Send className="w-3 h-3 text-sky-400" />
                  <span>{telegramHandle}</span>
                </a>
              </>
            )}
            {headerAnnouncement && (
              <>
                <span className="hidden md:inline-block text-amber-900/60">|</span>
                <a 
                  href={headerLink || '#'} 
                  target={headerLink?.startsWith('http') ? '_blank' : '_self'} 
                  rel="noreferrer"
                  className="hidden md:inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 font-medium transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{headerAnnouncement}</span>
                </a>
              </>
            )}
          </div>

          {/* Right quick links */}
          <div className="flex items-center space-x-3 shrink-0 text-amber-200/70">
            <button 
              onClick={() => setActiveTab('open-questions')} 
              className="hover:text-amber-400 transition-colors"
            >
              Ochiq savollar
            </button>
            <span>•</span>
            <button 
              onClick={() => setActiveTab('about')} 
              className="hover:text-amber-400 transition-colors"
            >
              Biz haqimizda
            </button>
            <span>•</span>
            <button 
              onClick={onOpenCoordinator} 
              className="hover:text-amber-300 flex items-center gap-1 transition-colors text-amber-400 font-bold"
              title="Koordinator boshqaruv paneli"
            >
              <Lock className="w-3 h-3 text-amber-400" />
              <span>Admin Panel</span>
            </button>
            <span>•</span>
            <button 
              onClick={onOpenLogin}
              className="hover:text-white font-medium text-amber-100 transition-colors bg-amber-500/15 hover:bg-amber-500/25 px-2 py-0.5 rounded text-[10px] border border-amber-400/30"
            >
              Kirish
            </button>
          </div>

        </div>
      </div>

      {/* Main Header Brand & Search */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        
        {/* Logo & Brand Name */}
        <div 
          onClick={() => setActiveTab('home')} 
          className="flex items-center space-x-3 cursor-pointer group shrink-0"
        >
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-700 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-full bg-[#18120d] flex items-center justify-center relative overflow-hidden border border-amber-400/40">
              <div className="flex flex-col items-center justify-center text-amber-400 font-extrabold text-center leading-none">
                <span className="text-[9px] tracking-widest text-amber-300">{schoolNum}</span>
                <Brain className="w-3.5 h-3.5 text-amber-400 my-0.2" />
                <span className="text-[6.5px] uppercase tracking-tighter text-amber-200">Zakovat</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base md:text-lg font-bold tracking-tight text-amber-50 font-sans flex items-center gap-1.5 uppercase">
                {schoolNum}-MAKTAB <span className="text-amber-400 font-extrabold">{clubTitle}</span>
              </h1>
            </div>
            <p className="text-[10.5px] text-amber-200/60 hidden sm:block">
              {schoolInfo?.motto || "Intellektual o'yinlar va Ochiq Savollar Portali"}
            </p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="hidden lg:flex items-center relative max-w-xs w-full">
          <Search className="w-4 h-4 absolute left-3 text-amber-400/60 pointer-events-none" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Jamoa, savol yoki yangilik..."
            className="w-full bg-[#120e0a]/90 text-amber-100 placeholder-amber-200/40 text-xs rounded-lg pl-9 pr-8 py-2 border border-amber-500/30 focus:border-amber-400 focus:outline-none transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-2 text-amber-300 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center space-x-2">
          {onOpenTeamCabinet && (
            <button
              onClick={onOpenTeamCabinet}
              className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs px-3.5 py-2 rounded-lg transition-all flex items-center space-x-1.5 shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer"
              title="Jamoa shaxsiy kabinetiga kirish va bilimdonlarni kiritish"
            >
              <Users className="w-4 h-4" />
              <span>Jamoa Kabineti</span>
            </button>
          )}

          <button
            onClick={onOpenCoordinator}
            className="bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-400/40 text-xs font-bold px-3 py-2 rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer"
            title="Koordinator boshqaruv paneli"
          >
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>Admin Panel</span>
          </button>

          <button
            onClick={onOpenRegister}
            className="bg-[#2a2119] hover:bg-[#34291f] text-amber-200 border border-amber-500/30 font-bold text-xs px-3.5 py-2 rounded-lg transition-all flex items-center space-x-1.5 active:scale-95 cursor-pointer"
          >
            <UserPlus className="w-4 h-4 text-amber-400" />
            <span>Ro'yxatdan O'tish</span>
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-xl bg-[#241d16] text-amber-200 hover:text-white border border-amber-500/30 min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95"
          aria-label="Menuni ochish/yopish"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Main Glass Navigation Tabs Row */}
      <nav className="bg-[#140f0b]/80 border-t border-amber-500/20 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center space-x-1 md:space-x-1.5 py-1 min-w-max">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center space-x-1.5 px-3 py-2 rounded-lg font-bold text-xs transition-all whitespace-nowrap cursor-pointer min-h-[40px] ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-amber-100/80 hover:text-white hover:bg-amber-500/10'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>{item.label}</span>

                {item.badge && (
                  <span className={`ml-1 text-[8.5px] font-extrabold px-1.5 py-0.3 rounded ${
                    isActive ? 'bg-slate-950 text-amber-400' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#18120d] border-b border-amber-500/30 p-4 space-y-4 animate-fadeIn shadow-2xl">
          
          {/* Mobile Search input */}
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-3.5 text-amber-400/60 pointer-events-none" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Jamoa, savol yoki yangilik..."
              className="w-full bg-[#120e0a] text-amber-100 placeholder-amber-200/40 text-xs rounded-xl pl-9 pr-8 py-3 border border-amber-500/30 focus:border-amber-400 focus:outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-amber-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 p-3 rounded-xl text-xs font-bold transition-all min-h-[44px] ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-md'
                      : 'bg-[#241d16] text-amber-100/90 hover:bg-[#2e251c]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-amber-500/20 flex flex-col gap-2.5">
            {onOpenTeamCabinet && (
              <button
                onClick={() => {
                  onOpenTeamCabinet();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-extrabold text-xs py-3 rounded-xl flex items-center justify-center space-x-2 min-h-[44px] shadow-lg shadow-amber-500/20"
              >
                <Users className="w-4 h-4" />
                <span>Jamoa Shaxsiy Kabineti</span>
              </button>
            )}

            <button
              onClick={() => {
                onOpenCoordinator();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-[#241d16] text-amber-300 border border-amber-500/30 font-bold text-xs py-3 rounded-xl flex items-center justify-center space-x-2 min-h-[44px]"
            >
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Koordinator Admin Paneli</span>
            </button>

            <button
              onClick={() => {
                onOpenRegister();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-[#2a2119] text-amber-100 border border-amber-500/30 font-bold text-xs py-3 rounded-xl flex items-center justify-center space-x-2 min-h-[44px]"
            >
              <UserPlus className="w-4 h-4 text-amber-400" />
              <span>Jamoani Ro'yxatdan O'tkazish</span>
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
