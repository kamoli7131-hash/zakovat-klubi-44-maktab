import React, { useState } from 'react';
import { Player } from '../types';
import { Brain, Award, Crown, CheckCircle2, Search, Star, Zap, UserCheck } from 'lucide-react';

interface PlayersViewProps {
  players: Player[];
  searchQuery: string;
}

export const PlayersView: React.FC<PlayersViewProps> = ({ players, searchQuery }) => {
  const [roleFilter, setRoleFilter] = useState<'all' | 'Kapitan' | 'A\'zo'>('all');

  const filteredPlayers = players.filter((player) => {
    const matchesSearch =
      player.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.classGrade.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || player.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 space-y-6 text-amber-50 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Brain className="w-4 h-4 text-amber-400" />
            <span>44-Maktab Zukko Bilimdonlari</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-amber-50 font-serif">
            TOP BILIMDONLAR REYTINGI
          </h2>
          <p className="text-amber-200/70 text-xs sm:text-sm mt-0.5">
            Eng ko'p to'g'ri javob bergan va jamoalarini g'alabaga yetaklagan top-o'quvchilar ro'yxati.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center space-x-1.5 bg-[#211a13]/90 p-1.5 rounded-xl border border-amber-500/30">
          <button
            onClick={() => setRoleFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              roleFilter === 'all' 
                ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black shadow-md' 
                : 'text-amber-200/80 hover:text-white'
            }`}
          >
            Barchasi
          </button>
          <button
            onClick={() => setRoleFilter('Kapitan')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              roleFilter === 'Kapitan' 
                ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black shadow-md' 
                : 'text-amber-200/80 hover:text-white'
            }`}
          >
            Kapitanlar
          </button>
          <button
            onClick={() => setRoleFilter('A\'zo')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              roleFilter === 'A\'zo' 
                ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black shadow-md' 
                : 'text-amber-200/80 hover:text-white'
            }`}
          >
            A'zolar
          </button>
        </div>
      </div>

      {/* Players Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPlayers.map((player, index) => (
          <div
            key={player.id}
            className="bg-[#211a13]/90 border border-amber-500/30 hover:border-amber-400/60 rounded-2xl p-5 transition-all shadow-xl space-y-4 relative overflow-hidden group backdrop-blur-md hover:-translate-y-1"
          >
            {/* Index rank badge */}
            <div className="absolute top-3 right-3 bg-[#18120d] text-amber-300 font-black text-xs px-2.5 py-1 rounded-full border border-amber-500/30">
              #{index + 1} Bilimdon
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative shrink-0">
                <img
                  src={player.avatarUrl}
                  alt={player.fullName}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400/50 shadow-lg"
                />
                <span className="absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 p-1 rounded-full shadow-md">
                  <Star className="w-3 h-3 fill-slate-950" />
                </span>
              </div>

              <div>
                <h3 className="font-black text-amber-50 text-base group-hover:text-amber-300 transition-colors">
                  {player.fullName}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-xs">
                  <span className="bg-[#18120d] text-amber-200/80 border border-amber-500/20 px-2 py-0.5 rounded font-bold">
                    {player.classGrade} Sinf
                  </span>
                  <span className="text-amber-400 font-bold">
                    {player.teamName}
                  </span>
                </div>
              </div>
            </div>

            {/* Special Badge */}
            <div className="bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs px-3 py-1.5 rounded-xl font-bold flex items-center space-x-2">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{player.badge}</span>
            </div>

            {/* Bio description if available */}
            {player.bio && (
              <p className="text-amber-200/70 text-xs leading-relaxed line-clamp-2">
                {player.bio}
              </p>
            )}

            {/* Stats row */}
            <div className="pt-3 border-t border-amber-500/20 grid grid-cols-2 gap-2 text-center text-xs">
              <div className="bg-[#18120d] p-2.5 rounded-xl border border-amber-500/20">
                <span className="text-amber-200/60 text-[10px] block font-medium">To'g'ri Javoblar</span>
                <span className="text-emerald-400 font-black text-sm">{player.correctAnswers} ta</span>
              </div>
              <div className="bg-[#18120d] p-2.5 rounded-xl border border-amber-500/20">
                <span className="text-amber-200/60 text-[10px] block font-medium">Eng Yuqori Ochko</span>
                <span className="text-amber-300 font-black text-sm">{player.bestScore} p</span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
