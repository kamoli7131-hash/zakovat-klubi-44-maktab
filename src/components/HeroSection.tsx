import React, { useState } from 'react';
import { 
  Trophy, 
  Brain, 
  Search, 
  MessageSquare, 
  UserPlus, 
  Sparkles
} from 'lucide-react';
import zakovatBg from '../assets/images/zakovat_bg_1786515842559.jpg';

import { SchoolInfo } from '../types';

interface HeroSectionProps {
  onNavigate: (tab: string) => void;
  onOpenRegister: () => void;
  onOpenTeamCabinet?: () => void;
  schoolInfo?: SchoolInfo;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  onNavigate, 
  onOpenRegister,
  schoolInfo
}) => {
  // Hero Filter State
  const [searchFilterName, setSearchFilterName] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const schoolTitle = schoolInfo?.schoolName || "44-sonli maktab";
  const clubTitle = schoolInfo?.clubName || "Zakovat";

  const handleFilterSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('teams');
  };

  return (
    <div className="relative text-white overflow-hidden border-b border-amber-500/20 bg-[#16110c]">
      
      {/* Background Ornate Image / Art Deco Metallic Glow */}
      <div 
        className="absolute inset-0 opacity-25 pointer-events-none bg-cover bg-center"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 30%, rgba(229, 184, 92, 0.25), transparent 70%), url(${zakovatBg})`
        }}
      />
      
      {/* Subtle gold grid line accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,163,89,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,163,89,0.08)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 pt-3 sm:pt-5 pb-5 sm:pb-6 relative z-10 space-y-5">
        
        {/* Top Hero Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          
          {/* Left Text & Actions */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Top Badge */}
            <div className="inline-flex items-center space-x-2 bg-amber-500/15 border border-amber-400/40 text-amber-300 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{schoolTitle} "{clubTitle}" Intellektual Portali</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-amber-50 leading-tight font-serif">
              Zakovat ila ilmingni <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-500 drop-shadow-sm">
                charxla va ziyoda qil
              </span>
            </h1>

            {/* Primary Action Button & Callout Box */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              
              {/* Primary Gold Pill Button: A'ZO BO'LISH */}
              <button
                onClick={onOpenRegister}
                className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-lg shadow-amber-500/25 transition-all uppercase tracking-wider flex items-center justify-center space-x-2 active:scale-95 cursor-pointer shrink-0 border border-amber-300/50"
              >
                <UserPlus className="w-4 h-4 fill-slate-950" />
                <span>A'ZO BO'LISH</span>
              </button>

              {/* Callout speech bubble box */}
              <div className="flex items-center space-x-3 bg-[#231b14]/90 border border-amber-500/35 p-3 rounded-2xl max-w-md shadow-md backdrop-blur-md">
                <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/30">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <p className="text-amber-100/90 text-xs leading-snug">
                  "Zakovat" o'yinida o'z savolingiz bilan bilimdonlarga qarshi o'ynamoqchimisiz? Bizga qiziqarli savollaringizni yo'llashingiz mumkin!
                </p>
              </div>

            </div>

            {/* Quick Feature Action Launchers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              <button
                onClick={() => onNavigate('live-host')}
                className="p-2.5 rounded-xl bg-gradient-to-br from-[#2a1f15] to-[#1f170f] hover:from-amber-500/20 hover:to-amber-600/10 border border-amber-500/30 text-left transition-all group cursor-pointer"
              >
                <span className="text-[10px] text-amber-400 font-black uppercase flex items-center gap-1">
                  🎤 Akt Zali
                </span>
                <p className="text-xs font-bold text-amber-100 group-hover:text-amber-300 mt-0.5">Proyektor Rejimi</p>
              </button>

              <button
                onClick={() => onNavigate('marathon')}
                className="p-2.5 rounded-xl bg-gradient-to-br from-[#2a1f15] to-[#1f170f] hover:from-amber-500/20 hover:to-amber-600/10 border border-amber-500/30 text-left transition-all group cursor-pointer"
              >
                <span className="text-[10px] text-orange-400 font-black uppercase flex items-center gap-1">
                  🔥 Kun Savoli
                </span>
                <p className="text-xs font-bold text-amber-100 group-hover:text-amber-300 mt-0.5">Marafon & Taktika</p>
              </button>

              <button
                onClick={() => onNavigate('duel')}
                className="p-2.5 rounded-xl bg-gradient-to-br from-[#2a1f15] to-[#1f170f] hover:from-amber-500/20 hover:to-amber-600/10 border border-amber-500/30 text-left transition-all group cursor-pointer"
              >
                <span className="text-[10px] text-red-400 font-black uppercase flex items-center gap-1">
                  ⚔️ 1v1 Arena
                </span>
                <p className="text-xs font-bold text-amber-100 group-hover:text-amber-300 mt-0.5">Tezkor Duel</p>
              </button>

              <button
                onClick={() => onNavigate('certificates')}
                className="p-2.5 rounded-xl bg-gradient-to-br from-[#2a1f15] to-[#1f170f] hover:from-amber-500/20 hover:to-amber-600/10 border border-amber-500/30 text-left transition-all group cursor-pointer"
              >
                <span className="text-[10px] text-cyan-400 font-black uppercase flex items-center gap-1">
                  📜 Diplomlar
                </span>
                <p className="text-xs font-bold text-amber-100 group-hover:text-amber-300 mt-0.5">PDF Generatori</p>
              </button>
            </div>

            {/* Quick Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-amber-500/20">
              <div className="bg-[#211a13]/80 border border-amber-500/25 p-2.5 rounded-xl text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-black text-amber-400">28+</div>
                <div className="text-[10px] text-amber-200/70 font-bold uppercase">Faol Jamoalar</div>
              </div>
              <div className="bg-[#211a13]/80 border border-amber-500/25 p-2.5 rounded-xl text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-black text-amber-300">180+</div>
                <div className="text-[10px] text-amber-200/70 font-bold uppercase">Bilimdonlar</div>
              </div>
              <div className="bg-[#211a13]/80 border border-amber-500/25 p-2.5 rounded-xl text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-black text-amber-400">1,500+</div>
                <div className="text-[10px] text-amber-200/70 font-bold uppercase">Savollar Bazasi</div>
              </div>
              <div className="bg-[#211a13]/80 border border-amber-500/25 p-2.5 rounded-xl text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-black text-amber-300">14+</div>
                <div className="text-[10px] text-amber-200/70 font-bold uppercase">Turnirlar</div>
              </div>
            </div>

          </div>

          {/* Right 3D Hourglass (Qum soati) Visual Rendering */}
          <div className="lg:col-span-5 flex justify-center relative py-2 lg:py-0">
            
            {/* Glowing backdrop aura */}
            <div className="absolute w-56 h-56 bg-amber-500/25 rounded-full blur-2xl -z-10 pointer-events-none" />

            <div className="relative w-full max-w-xs flex items-center justify-center">
              
              {/* Hourglass Container Graphic */}
              <div className="relative w-52 h-64 bg-gradient-to-b from-[#241c15] via-[#1d1610] to-[#241c15] border-2 border-amber-500/50 rounded-2xl p-4 shadow-xl flex flex-col items-center justify-between overflow-hidden group">
                
                {/* Wood Frame Top */}
                <div className="w-full h-4 bg-gradient-to-r from-amber-800 via-yellow-600 to-amber-800 rounded-full border border-amber-400/50 shadow-md" />
                
                {/* Glass & Golden Sand Animation */}
                <div className="relative w-28 h-44 flex flex-col items-center justify-between py-1">
                  
                  {/* Top Glass Cone */}
                  <div className="w-24 h-20 bg-gradient-to-b from-amber-400/20 to-amber-500/40 rounded-b-full border border-amber-400/40 relative overflow-hidden flex items-end justify-center">
                    <div className="w-16 h-10 bg-amber-400 rounded-b-full opacity-80 animate-pulse" />
                  </div>

                  {/* Sand Flow Stream */}
                  <div className="w-1 h-8 bg-amber-300 animate-pulse rounded-full shadow-[0_0_10px_#f59e0b]" />

                  {/* Bottom Glass Cone */}
                  <div className="w-24 h-20 bg-gradient-to-t from-amber-400/30 to-amber-500/10 rounded-t-full border border-amber-400/40 relative overflow-hidden flex items-end justify-center">
                    <div className="w-20 h-14 bg-amber-400 rounded-t-full opacity-90 shadow-lg" />
                  </div>

                </div>

                {/* Wood Frame Bottom */}
                <div className="w-full h-4 bg-gradient-to-r from-amber-800 via-yellow-600 to-amber-800 rounded-full border border-amber-400/50 shadow-md" />

                {/* Floating sparkles overlay */}
                <div className="absolute top-3 right-3 bg-amber-500/20 text-amber-300 p-1.5 rounded-full border border-amber-400/30 animate-bounce">
                  <Brain className="w-4 h-4" />
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* BOTTOM FLOATING FILTER BAR */}
        <div className="bg-[#241d16]/95 border border-amber-500/30 rounded-2xl p-2.5 sm:p-3 shadow-xl backdrop-blur-md relative z-20">
          <form onSubmit={handleFilterSearch} className="flex flex-col lg:flex-row items-center gap-2.5">
            
            {/* Left Trophy Badge */}
            <div className="flex items-center space-x-2 px-2 py-1 border-b lg:border-b-0 lg:border-r border-amber-500/20 shrink-0 w-full lg:w-auto">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black border border-amber-400/30">
                <Trophy className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-amber-200 lg:hidden">Qidiruv & Filtr</span>
            </div>

            {/* Field 1: Bilimdoning ismi yoki IDsi */}
            <div className="flex-1 w-full">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-amber-400/70 pointer-events-none" />
                <input
                  type="text"
                  value={searchFilterName}
                  onChange={(e) => setSearchFilterName(e.target.value)}
                  placeholder="Bilimdon ismi yoki IDsi..."
                  className="w-full bg-[#18120d] text-amber-50 text-xs pl-8 pr-3 py-2.5 rounded-xl border border-amber-500/25 focus:outline-none focus:border-amber-400 placeholder-amber-200/40"
                />
              </div>
            </div>

            {/* Field 2: Hudud / Sinf */}
            <div className="w-full lg:w-36">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full bg-[#18120d] text-amber-100 text-xs p-2.5 rounded-xl border border-amber-500/25 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="">Hudud / Sinf</option>
                <option value="11-A">11-A Sinf</option>
                <option value="11-B">11-B Sinf</option>
                <option value="10-A">10-A Sinf</option>
                <option value="10-B">10-B Sinf</option>
                <option value="9-A">9-A Sinf</option>
                <option value="8-A">8-A Sinf</option>
              </select>
            </div>

            {/* Field 3: Tuman / Shahar / Liga */}
            <div className="w-full lg:w-36">
              <select
                value={selectedLeague}
                onChange={(e) => setSelectedLeague(e.target.value)}
                className="w-full bg-[#18120d] text-amber-100 text-xs p-2.5 rounded-xl border border-amber-500/25 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="">Tuman/Shahar</option>
                <option value="oliy">Oliy Liga</option>
                <option value="maktab">Maktab Ligasi</option>
                <option value="yoshlar">Yoshlar Ligasi</option>
              </select>
            </div>

            {/* Field 4: Rukn / Kategoriya */}
            <div className="w-full lg:w-36">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#18120d] text-amber-100 text-xs p-2.5 rounded-xl border border-amber-500/25 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="">Rukn</option>
                <option value="Mantiq">Mantiq</option>
                <option value="Tarix">Tarix</option>
                <option value="Adabiyot">Adabiyot</option>
                <option value="Fan">Fan va Texnika</option>
              </select>
            </div>

            {/* Gold Search Pill Button: QIDIRISH */}
            <button
              type="submit"
              className="w-full lg:w-auto bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs px-6 py-2.5 rounded-xl transition-all uppercase tracking-wider shrink-0 cursor-pointer shadow-md shadow-amber-500/20 active:scale-95"
            >
              QIDIRISH
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

