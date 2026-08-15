import React, { useState } from 'react';
import { Team } from '../types';
import { 
  Trophy, 
  Users, 
  Crown, 
  Search, 
  Medal, 
  Award, 
  ChevronRight, 
  X, 
  CheckCircle2, 
  Zap, 
  TrendingUp,
  UserPlus
} from 'lucide-react';

interface TeamsViewProps {
  teams: Team[];
  searchQuery: string;
  onOpenRegister: () => void;
}

export const TeamsView: React.FC<TeamsViewProps> = ({ teams, searchQuery, onOpenRegister }) => {
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const classesList = ['all', '11-A', '11-B', '10-A', '10-B', '9-A', '9-B', '8-A', '8-B'];

  const filteredTeams = teams.filter((team) => {
    const matchesSearch = 
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.captain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.classGrade.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass === 'all' || team.classGrade === selectedClass;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 space-y-6 text-amber-50 font-sans">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Users className="w-4 h-4 text-amber-400" />
            <span>44-Maktab Intellektual Jamoalari</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-amber-50 font-serif">
            JAMOALAR REYTING JADVALI
          </h2>
          <p className="text-amber-200/70 text-xs sm:text-sm mt-0.5">
            Maktabimizning barcha sinf jamoalari, ularning erishgan ochkolari va g'alabalari statistikasi.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenRegister}
            className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs transition-all flex items-center space-x-2 shadow-lg shadow-amber-500/20 cursor-pointer active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            <span>Yangi Jamoa Qo'shish</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#211a13]/90 p-3.5 rounded-2xl border border-amber-500/30 backdrop-blur-md shadow-xl">
        
        {/* Class Filter Badges */}
        <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
          <span className="text-xs font-bold text-amber-300/80 mr-2 shrink-0">Sinf:</span>
          {classesList.map((cls) => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedClass === cls
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-md font-black'
                  : 'bg-[#18120d] text-amber-200/80 hover:text-white hover:bg-[#2c2219] border border-amber-500/20'
              }`}
            >
              {cls === 'all' ? 'Barchasi' : cls}
            </button>
          ))}
        </div>

        {/* View mode toggle */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
              viewMode === 'grid' ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40' : 'bg-[#18120d] text-amber-200/60'
            }`}
          >
            Karta ko'rinishi
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
              viewMode === 'table' ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40' : 'bg-[#18120d] text-amber-200/60'
            }`}
          >
            Jadval ko'rinishi
          </button>
        </div>

      </div>

      {/* Top 3 Podium */}
      {selectedClass === 'all' && !searchQuery && filteredTeams.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          
          {/* 2nd Place */}
          <div className="bg-[#211a13]/90 border border-amber-500/30 rounded-2xl p-5 relative overflow-hidden shadow-xl order-2 md:order-1 flex flex-col justify-between backdrop-blur-md">
            <div className="absolute top-3 right-3 bg-[#18120d] text-slate-300 font-extrabold text-[11px] px-2.5 py-1 rounded-full border border-slate-600 flex items-center gap-1">
              <Medal className="w-3.5 h-3.5 text-slate-300" /> 2-O'rin
            </div>
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-700 flex items-center justify-center text-white font-black text-base shadow-md">
                {filteredTeams[1].name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-black text-amber-50 flex items-center gap-2">
                  {filteredTeams[1].name}
                  <span className="text-[10px] bg-[#18120d] text-amber-300 px-2 py-0.5 rounded font-bold border border-amber-500/20">
                    {filteredTeams[1].classGrade}
                  </span>
                </h3>
                <p className="text-xs text-amber-200/70 mt-0.5">Kapitan: {filteredTeams[1].captain}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-amber-500/20 mt-3 flex items-center justify-between text-xs">
              <span className="text-amber-200/70">Ochko: <strong className="text-cyan-400 text-base font-black">{filteredTeams[1].points}</strong></span>
              <button
                onClick={() => setSelectedTeam(filteredTeams[1])}
                className="text-amber-300 hover:text-amber-100 font-bold flex items-center gap-1 cursor-pointer"
              >
                Tafsilot <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 1st Place Champion */}
          <div className="bg-[#523812] border-2 border-amber-400/80 rounded-2xl p-5 relative overflow-hidden shadow-2xl shadow-amber-500/20 order-1 md:order-2 flex flex-col justify-between transform md:-translate-y-2">
            <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-[10px] px-3 py-1 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
              <Crown className="w-3.5 h-3.5" /> 1-O'RIN CHEMPION
            </div>
            <div className="space-y-3 pt-1">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-300 to-yellow-500 flex items-center justify-center text-slate-950 font-black text-lg shadow-lg shadow-amber-500/20">
                {filteredTeams[0].name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="text-xl font-black text-amber-50 flex items-center gap-2">
                  {filteredTeams[0].name}
                  <span className="text-[10px] bg-slate-950/80 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded font-black">
                    {filteredTeams[0].classGrade}
                  </span>
                </h3>
                <p className="text-xs text-amber-100/90 mt-0.5">Kapitan: {filteredTeams[0].captain}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-amber-400/30 mt-3 flex items-center justify-between text-xs">
              <span className="text-amber-100">Jami Ochko: <strong className="text-amber-300 text-lg font-black">{filteredTeams[0].points}</strong></span>
              <button
                onClick={() => setSelectedTeam(filteredTeams[0])}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-3 py-1.5 rounded-lg transition-all text-xs cursor-pointer"
              >
                Tafsilot
              </button>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="bg-[#211a13]/90 border border-amber-500/30 rounded-2xl p-5 relative overflow-hidden shadow-xl order-3 flex flex-col justify-between backdrop-blur-md">
            <div className="absolute top-3 right-3 bg-[#18120d] text-amber-300 border border-amber-500/30 font-extrabold text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-400" /> 3-O'rin
            </div>
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white font-black text-base shadow-md">
                {filteredTeams[2].name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-black text-amber-50 flex items-center gap-2">
                  {filteredTeams[2].name}
                  <span className="text-[10px] bg-[#18120d] text-amber-300 px-2 py-0.5 rounded font-bold border border-amber-500/20">
                    {filteredTeams[2].classGrade}
                  </span>
                </h3>
                <p className="text-xs text-amber-200/70 mt-0.5">Kapitan: {filteredTeams[2].captain}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-amber-500/20 mt-3 flex items-center justify-between text-xs">
              <span className="text-amber-200/70">Ochko: <strong className="text-emerald-400 text-base font-black">{filteredTeams[2].points}</strong></span>
              <button
                onClick={() => setSelectedTeam(filteredTeams[2])}
                className="text-amber-300 hover:text-amber-100 font-bold flex items-center gap-1 cursor-pointer"
              >
                Tafsilot <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredTeams.map((team) => (
            <div
              key={team.id}
              onClick={() => setSelectedTeam(team)}
              className="bg-[#211a13]/90 hover:border-amber-400/60 border border-amber-500/30 rounded-2xl p-4 transition-all cursor-pointer group shadow-xl backdrop-blur-md flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between pb-2.5 border-b border-amber-500/20 mb-2.5">
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                    #{team.ratingRank} - O'rin
                  </span>
                  <span className="bg-[#18120d] text-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded border border-amber-500/20">
                    {team.classGrade} Sinf
                  </span>
                </div>

                <div className="flex items-center space-x-2.5 mb-2.5">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${team.logoColor} flex items-center justify-center text-white font-black text-xs shadow-md shrink-0`}>
                    {team.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="truncate">
                    <h4 className="font-bold text-amber-50 text-xs sm:text-sm group-hover:text-amber-300 transition-colors truncate">
                      {team.name}
                    </h4>
                    <p className="text-[11px] text-amber-200/60 truncate">
                      Kapitan: {team.captain}
                    </p>
                  </div>
                </div>

                {team.motto && (
                  <p className="text-amber-200/80 text-[11px] italic line-clamp-2 bg-[#18120d] p-2 rounded-lg border border-amber-500/15 my-2">
                    "{team.motto}"
                  </p>
                )}
              </div>

              <div className="pt-2.5 border-t border-amber-500/20 flex items-center justify-between text-xs mt-2">
                <div className="text-amber-200/60 text-[11px]">
                  O'yinlar: <span className="text-amber-100 font-bold">{team.gamesPlayed}</span>
                </div>
                <div className="text-amber-300 font-black text-sm">
                  {team.points} Ochko
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-[#211a13]/90 border border-amber-500/30 rounded-2xl overflow-x-auto shadow-xl backdrop-blur-md">
          <table className="w-full text-left text-xs text-amber-100">
            <thead className="bg-[#18120d] text-amber-300 uppercase font-bold text-[10px] border-b border-amber-500/20">
              <tr>
                <th className="py-3 px-3.5">O'rin</th>
                <th className="py-3 px-3.5">Jamoa</th>
                <th className="py-3 px-3.5">Sinf</th>
                <th className="py-3 px-3.5">Kapitan</th>
                <th className="py-3 px-3.5 text-center">O'yin</th>
                <th className="py-3 px-3.5 text-center">G'alaba</th>
                <th className="py-3 px-3.5 text-center">Durrang</th>
                <th className="py-3 px-3.5 text-center">Mag'lubiyat</th>
                <th className="py-3 px-3.5 text-right">Ochko</th>
                <th className="py-3 px-3.5 text-center">Amal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-500/15">
              {filteredTeams.map((team) => (
                <tr key={team.id} className="hover:bg-[#2c2219] transition-colors">
                  <td className="py-3 px-3.5 font-black text-amber-400">
                    #{team.ratingRank}
                  </td>
                  <td className="py-3 px-3.5 font-bold text-amber-50 flex items-center gap-2">
                    <div className={`w-6 h-6 rounded bg-gradient-to-br ${team.logoColor} flex items-center justify-center text-white text-[9px] font-black shrink-0`}>
                      {team.name.substring(0, 2).toUpperCase()}
                    </div>
                    <span>{team.name}</span>
                  </td>
                  <td className="py-3 px-3.5 text-amber-200/80 font-medium">
                    {team.classGrade}
                  </td>
                  <td className="py-3 px-3.5 text-amber-200/80">
                    {team.captain}
                  </td>
                  <td className="py-3 px-3.5 text-center font-semibold">
                    {team.gamesPlayed}
                  </td>
                  <td className="py-3.5 px-4 text-center text-emerald-400 font-bold">
                    {team.wins}
                  </td>
                  <td className="py-3.5 px-4 text-center text-amber-400 font-semibold">
                    {team.draws}
                  </td>
                  <td className="py-3.5 px-4 text-center text-rose-400">
                    {team.losses}
                  </td>
                  <td className="py-3.5 px-4 text-right font-black text-amber-400 text-sm">
                    {team.points}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => setSelectedTeam(team)}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded text-[11px] font-medium"
                    >
                      Batafsil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Team Detail Modal */}
      {selectedTeam && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#211a13] border border-amber-500/40 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto text-amber-50">
            
            <button
              onClick={() => setSelectedTeam(null)}
              className="absolute top-4 right-4 text-amber-300 hover:text-white p-1.5 rounded-lg bg-[#2a2119] border border-amber-500/30 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center space-x-4 border-b border-amber-500/20 pb-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedTeam.logoColor} flex items-center justify-center text-white font-black text-xl shadow-xl shrink-0`}>
                {selectedTeam.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black text-amber-50 font-serif">{selectedTeam.name}</h3>
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold px-2.5 py-0.5 rounded">
                    {selectedTeam.classGrade} Sinf
                  </span>
                </div>
                <p className="text-xs text-amber-200/70 mt-1">
                  Kapitan: <strong className="text-amber-100">{selectedTeam.captain}</strong>
                </p>
              </div>
            </div>

            {/* Motto */}
            {selectedTeam.motto && (
              <div className="bg-[#18120d] p-3 rounded-xl border border-amber-500/20 text-amber-200/90 italic text-xs font-medium">
                "{selectedTeam.motto}"
              </div>
            )}

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-2 bg-[#18120d] p-3 rounded-xl border border-amber-500/20 text-center text-xs">
              <div>
                <div className="text-amber-200/60 text-[10px]">O'yinlar</div>
                <div className="text-sm font-black text-amber-100">{selectedTeam.gamesPlayed}</div>
              </div>
              <div>
                <div className="text-amber-200/60 text-[10px]">G'alaba</div>
                <div className="text-sm font-black text-emerald-400">{selectedTeam.wins}</div>
              </div>
              <div>
                <div className="text-amber-200/60 text-[10px]">Durrang</div>
                <div className="text-sm font-black text-amber-300">{selectedTeam.draws}</div>
              </div>
              <div>
                <div className="text-amber-200/60 text-[10px]">Jami Ochko</div>
                <div className="text-sm font-black text-amber-400">{selectedTeam.points}</div>
              </div>
            </div>

            {/* Team Members List */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-400" /> Jamoa Tarkibi ({selectedTeam.members.length} Naush)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedTeam.members.map((member, idx) => (
                  <div key={idx} className="bg-[#18120d] p-2.5 rounded-lg border border-amber-500/15 flex items-center justify-between text-xs">
                    <span className="font-semibold text-amber-100">{member}</span>
                    {idx === 0 && (
                      <span className="bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold px-1.5 py-0.5 rounded">
                        Kapitan
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            {selectedTeam.achievements.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-amber-500/20">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-400" /> Yutuqlar va Unvonlar
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTeam.achievements.map((ach, idx) => (
                    <span key={idx} className="bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs px-2.5 py-1 rounded-lg font-medium">
                      🏆 {ach}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 text-right">
              <button
                onClick={() => setSelectedTeam(null)}
                className="bg-[#2a2119] hover:bg-[#342a20] border border-amber-500/30 text-amber-100 px-5 py-2 rounded-xl text-xs font-bold cursor-pointer"
              >
                Yopish
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
