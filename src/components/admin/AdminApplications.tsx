import React, { useState } from 'react';
import { 
  Users, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  Search, 
  Phone, 
  Calendar, 
  ShieldCheck,
  Clock,
  Sparkles
} from 'lucide-react';
import { TeamRegistration, Team, Player } from '../../types';

interface AdminApplicationsProps {
  registrations: TeamRegistration[];
  teams: Team[];
  players: Player[];
  onUpdateRegistrations: (regs: TeamRegistration[]) => void;
  onUpdateTeams: (teams: Team[]) => void;
  onUpdatePlayers: (players: Player[]) => void;
  showToast: (msg: string) => void;
}

export const AdminApplications: React.FC<AdminApplicationsProps> = ({
  registrations,
  teams,
  players,
  onUpdateRegistrations,
  onUpdateTeams,
  onUpdatePlayers,
  showToast
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  // Approve Application -> Transforms directly into an official Team & Captain Player
  const handleApprove = (reg: TeamRegistration) => {
    // 1. Create Team
    const newTeam: Team = {
      id: `t-${Date.now()}`,
      name: reg.teamName,
      classGrade: reg.classGrade,
      captain: reg.captainName,
      captainPhone: reg.captainPhone,
      username: reg.username || `team_${Date.now().toString().slice(-4)}`,
      password: reg.password || 'zakovat123',
      members: reg.memberNames.length > 0 ? reg.memberNames : [reg.captainName],
      points: 0,
      gamesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      ratingRank: teams.length + 1,
      logoColor: 'from-amber-500 to-amber-700',
      motto: reg.motto || 'Yangi jamoa',
      achievements: ['44-Maktab Ro\'yxatdan O\'tgan Jamoasi']
    };

    // 2. Create Captain Player
    const newCaptain: Player = {
      id: `p-${Date.now()}`,
      fullName: reg.captainName,
      teamName: reg.teamName,
      classGrade: reg.classGrade,
      role: 'Kapitan',
      bestScore: 0,
      correctAnswers: 0,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      badge: 'Yangi Kapitan',
      bio: `"${reg.teamName}" jamoasi sardori.`
    };

    onUpdateTeams([...teams, newTeam]);
    onUpdatePlayers([...players, newCaptain]);

    const updatedRegs = registrations.map(r => 
      r.id === reg.id ? { ...r, status: 'approved' as const } : r
    );
    onUpdateRegistrations(updatedRegs);
    showToast(`"${reg.teamName}" jamoasi tasdiqlandi va rasmiy ro'yxatga qo'shildi!`);
  };

  const handleReject = (id: string) => {
    const updatedRegs = registrations.map(r => 
      r.id === id ? { ...r, status: 'rejected' as const } : r
    );
    onUpdateRegistrations(updatedRegs);
    showToast("Ariza rad etildi.");
  };

  const handleDelete = (id: string) => {
    if (confirm("Ushbu arizani butunlay o'chirib tashlamoqchimisiz?")) {
      onUpdateRegistrations(registrations.filter(r => r.id !== id));
      showToast("Ariza o'chirildi.");
    }
  };

  const filtered = registrations.filter(r => {
    const matchesSearch = !searchQuery || 
      r.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.captainName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.classGrade.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || r.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fadeIn font-sans text-amber-50">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>Turnirga Kelib Tushgan Arizalar (CRUD)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-amber-50 font-serif">
            JAMOA RO'YXATDAN O'TISH ARIZALARI
          </h2>
          <p className="text-xs text-amber-200/70 mt-0.5">
            O'quvchilar tomonidan yuborilgan arizalarni ko'rib chiqish, bir bosishda rasmiy jamoa va kapitan qilish yoki rad etish.
          </p>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-3 text-amber-400/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Jamoa, kapitan yoki sinfni qidirish..."
            className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl pl-9 pr-3 py-2.5 text-xs text-amber-50 placeholder-amber-200/40 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 w-full sm:w-auto">
          {[
            { id: 'all', label: 'Barchasi' },
            { id: 'pending', label: 'Kutilmoqda' },
            { id: 'approved', label: 'Tasdiqlangan' },
            { id: 'rejected', label: 'Rad etilgan' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedStatus(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                selectedStatus === tab.id
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : 'bg-[#211a13] text-amber-200/80 border border-amber-500/20 hover:bg-[#2c2219]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-3">
        {filtered.map((reg) => (
          <div
            key={reg.id}
            className="bg-[#211a13]/90 border border-amber-500/30 hover:border-amber-400/60 rounded-2xl p-4 sm:p-5 space-y-3 shadow-lg backdrop-blur-md transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-amber-500/15 pb-3">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                    reg.status === 'approved' ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30' :
                    reg.status === 'rejected' ? 'bg-rose-950/60 text-rose-300 border border-rose-500/30' :
                    'bg-amber-950/60 text-amber-300 border border-amber-500/30 animate-pulse'
                  }`}>
                    {reg.status === 'approved' ? '✓ Tasdiqlangan' :
                     reg.status === 'rejected' ? '✗ Rad etilgan' : '⏳ Kutilmoqda'}
                  </span>
                  <span className="text-xs text-amber-200/60">{reg.registrationDate}</span>
                </div>
                <h3 className="text-lg font-black text-amber-50 font-serif">
                  {reg.teamName} <span className="text-sm font-normal text-amber-300">({reg.classGrade}-sinf)</span>
                </h3>
              </div>

              {/* Status Action Buttons */}
              <div className="flex items-center space-x-2">
                {reg.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleApprove(reg)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black px-3.5 py-1.5 rounded-xl text-xs flex items-center space-x-1.5 shadow-md cursor-pointer transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4 fill-slate-950 text-emerald-600" />
                      <span>Tasdiqlash & Rasmiy qilish</span>
                    </button>
                    <button
                      onClick={() => handleReject(reg.id)}
                      className="bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-500/30 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center space-x-1 cursor-pointer transition-all"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Rad etish</span>
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleDelete(reg.id)}
                  className="p-1.5 rounded-xl bg-rose-950/40 text-rose-300 hover:bg-rose-900 border border-rose-500/30 cursor-pointer"
                  title="Arizani butunlay o'chirish"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-amber-400 font-bold">Kapitan: </span>
                <span className="text-amber-100">{reg.captainName}</span>
                <div className="text-[11px] text-amber-200/60 mt-0.5">{reg.captainPhone}</div>
              </div>

              <div className="sm:col-span-2">
                <span className="text-amber-400 font-bold">Tarkib ({reg.memberNames.length} kishi): </span>
                <span className="text-amber-100/90">{reg.memberNames.join(', ')}</span>
                {reg.motto && (
                  <div className="text-[11px] text-amber-300/80 italic mt-0.5">
                    Shior: "{reg.motto}"
                  </div>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
