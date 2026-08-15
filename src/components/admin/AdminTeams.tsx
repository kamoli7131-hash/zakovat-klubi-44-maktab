import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Save, 
  X, 
  Trophy, 
  Award, 
  ShieldCheck,
  Star,
  Lock
} from 'lucide-react';
import { Team } from '../../types';

interface AdminTeamsProps {
  teams: Team[];
  onUpdateTeams: (teams: Team[]) => void;
  showToast: (msg: string) => void;
}

export const AdminTeams: React.FC<AdminTeamsProps> = ({
  teams,
  onUpdateTeams,
  showToast
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('Barchasi');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
  const [teamForm, setTeamForm] = useState<Partial<Team>>({
    name: '',
    classGrade: '11-A',
    captain: '',
    captainPhone: '+998 90 123 45 67',
    username: '',
    password: '',
    members: [],
    points: 0,
    gamesPlayed: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    logoColor: 'from-amber-500 to-amber-700',
    motto: '',
    achievements: []
  });
  const [membersInput, setMembersInput] = useState('');
  const [achievementsInput, setAchievementsInput] = useState('');

  const handleOpenCreateModal = () => {
    setEditingTeamId(null);
    setTeamForm({
      name: '',
      classGrade: '11-A',
      captain: '',
      captainPhone: '+998 90 123 45 67',
      username: '',
      password: '',
      members: [],
      points: 0,
      gamesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      logoColor: 'from-amber-500 to-amber-700',
      motto: 'Bilim va g\'alaba!',
      achievements: ['44-Maktab Ishtirokchisi']
    });
    setMembersInput('');
    setAchievementsInput('44-Maktab Ishtirokchisi');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (team: Team) => {
    setEditingTeamId(team.id);
    setTeamForm({ ...team });
    setMembersInput(team.members.join(', '));
    setAchievementsInput((team.achievements || []).join(', '));
    setIsModalOpen(true);
  };

  const handleSaveTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamForm.name) {
      alert("Jamoa nomini kiriting!");
      return;
    }

    const membersList = membersInput
      .split(',')
      .map(m => m.trim())
      .filter(Boolean);

    const achievementsList = achievementsInput
      .split(',')
      .map(a => a.trim())
      .filter(Boolean);

    if (editingTeamId) {
      const updated = teams.map(t => 
        t.id === editingTeamId 
          ? {
              ...t,
              ...teamForm,
              members: membersList.length > 0 ? membersList : t.members,
              achievements: achievementsList,
              points: Number(teamForm.points) || 0,
              gamesPlayed: Number(teamForm.gamesPlayed) || 0,
              wins: Number(teamForm.wins) || 0,
              draws: Number(teamForm.draws) || 0,
              losses: Number(teamForm.losses) || 0
            } as Team
          : t
      );
      onUpdateTeams(updated);
      showToast("Jamoa ma'lumotlari muvaffaqiyatli yangilandi!");
    } else {
      const newTeam: Team = {
        id: `t-${Date.now()}`,
        name: teamForm.name || 'Yangi Jamoa',
        classGrade: teamForm.classGrade || '11-A',
        captain: teamForm.captain || 'Kapitan',
        captainPhone: teamForm.captainPhone || '+998 90 000 00 00',
        username: teamForm.username || `team_${Date.now().toString().slice(-4)}`,
        password: teamForm.password || 'zakovat123',
        members: membersList.length > 0 ? membersList : [teamForm.captain || 'Kapitan'],
        points: Number(teamForm.points) || 0,
        gamesPlayed: Number(teamForm.gamesPlayed) || 0,
        wins: Number(teamForm.wins) || 0,
        draws: Number(teamForm.draws) || 0,
        losses: Number(teamForm.losses) || 0,
        ratingRank: teams.length + 1,
        logoColor: teamForm.logoColor || 'from-amber-500 to-amber-700',
        motto: teamForm.motto || 'Bilim va mantiq!',
        achievements: achievementsList.length > 0 ? achievementsList : ['Yangi Jamoa']
      };
      onUpdateTeams([...teams, newTeam]);
      showToast("Yangi jamoa safiga qo'shildi!");
    }
    setIsModalOpen(false);
  };

  const handleDeleteTeam = (id: string) => {
    if (confirm("Rostdan ham ushbu jamoani butunlay o'chirib tashlamoqchimisiz?")) {
      onUpdateTeams(teams.filter(t => t.id !== id));
      showToast("Jamoa o'chirildi.");
    }
  };

  const filtered = teams.filter(t => {
    const matchesSearch = !searchQuery || 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.captain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.classGrade.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = selectedGrade === 'Barchasi' || t.classGrade.includes(selectedGrade);
    return matchesSearch && matchesGrade;
  });

  return (
    <div className="space-y-6 animate-fadeIn font-sans text-amber-50">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>Jamoalar Boshqaruvi va Turnir Reytingi (CRUD)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-amber-50 font-serif">
            ZAKOVAT JAMOALARI RO'YXATI
          </h2>
          <p className="text-xs text-amber-200/70 mt-0.5">
            Maktab sinf jamoalarini kiritish, ballarini o'zgartirish, a'zolarini yangilash va kabinet parollarini boshqarish.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-md cursor-pointer transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi Jamoa Qo'shish</span>
        </button>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-3 text-amber-400/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Jamoa nomi, kapitan yoki sinfni qidirish..."
            className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl pl-9 pr-3 py-2.5 text-xs text-amber-50 placeholder-amber-200/40 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 w-full sm:w-auto">
          {['Barchasi', '11', '10', '9', '8'].map(gr => (
            <button
              key={gr}
              onClick={() => setSelectedGrade(gr)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                selectedGrade === gr
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : 'bg-[#211a13] text-amber-200/80 border border-amber-500/20 hover:bg-[#2c2219]'
              }`}
            >
              {gr === 'Barchasi' ? 'Barchasi' : `${gr}-sinflar`}
            </button>
          ))}
        </div>
      </div>

      {/* Teams Table */}
      <div className="bg-[#211a13]/90 border border-amber-500/30 rounded-2xl overflow-hidden shadow-xl backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-amber-100">
            <thead className="bg-[#18120d] text-amber-300/80 uppercase font-black text-[10px] tracking-wider border-b border-amber-500/20">
              <tr>
                <th className="p-3.5">#</th>
                <th className="p-3.5">Jamoa Nomi</th>
                <th className="p-3.5">Sinf</th>
                <th className="p-3.5">Kapitan</th>
                <th className="p-3.5">A'zolar</th>
                <th className="p-3.5 text-center">Ochko</th>
                <th className="p-3.5 text-center">O'yinlar</th>
                <th className="p-3.5 text-center">G'/D/M</th>
                <th className="p-3.5 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-500/15">
              {filtered.map((team, index) => (
                <tr key={team.id} className="hover:bg-amber-500/5 transition-colors">
                  <td className="p-3.5 font-black text-amber-400">#{index + 1}</td>
                  <td className="p-3.5">
                    <div className="font-black text-amber-50 text-sm flex items-center gap-1.5">
                      <span>{team.name}</span>
                    </div>
                    {team.motto && (
                      <div className="text-[10px] text-amber-200/60 italic mt-0.5">
                        "{team.motto}"
                      </div>
                    )}
                  </td>
                  <td className="p-3.5 font-bold text-amber-200">{team.classGrade}</td>
                  <td className="p-3.5 font-semibold text-amber-100">
                    <div>{team.captain}</div>
                    {team.captainPhone && (
                      <div className="text-[10px] text-amber-300/70">{team.captainPhone}</div>
                    )}
                  </td>
                  <td className="p-3.5 text-amber-200/80 text-[11px]">
                    {team.members.join(', ')}
                  </td>
                  <td className="p-3.5 text-center font-black text-amber-400 text-sm">
                    {team.points}
                  </td>
                  <td className="p-3.5 text-center font-bold text-amber-200">
                    {team.gamesPlayed}
                  </td>
                  <td className="p-3.5 text-center text-amber-200/80 text-xs font-bold">
                    <span className="text-emerald-400">{team.wins}</span> / <span className="text-amber-400">{team.draws}</span> / <span className="text-rose-400">{team.losses}</span>
                  </td>
                  <td className="p-3.5 text-right space-x-1.5">
                    <button
                      onClick={() => handleOpenEditModal(team)}
                      className="p-1.5 rounded-lg bg-[#18120d] text-amber-400 hover:bg-[#2c2219] border border-amber-500/25 cursor-pointer"
                      title="Jamoani tahrirlash"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteTeam(team.id)}
                      className="p-1.5 rounded-lg bg-rose-950/50 text-rose-300 hover:bg-rose-900 border border-rose-500/30 cursor-pointer"
                      title="Jamoani o'chirish"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MODAL: CREATE / EDIT TEAM ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#211a13] border border-amber-500/40 rounded-2xl p-5 sm:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl text-amber-50">
            
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
              <h3 className="text-base font-black text-amber-50 font-serif flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-400" />
                <span>{editingTeamId ? "Jamoa Ma'lumotlarini Tahrirlash" : "Yangi Jamoa Ro'yxatdan O'tkazish"}</span>
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-amber-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTeam} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Jamoa Nomi</label>
                  <input
                    type="text"
                    required
                    value={teamForm.name || ''}
                    onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                    placeholder="Masalan: Lochinlar"
                    className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Sinf / Bosqich</label>
                  <input
                    type="text"
                    required
                    value={teamForm.classGrade || ''}
                    onChange={(e) => setTeamForm({ ...teamForm, classGrade: e.target.value })}
                    placeholder="Masalan: 11-A"
                    className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Kapitan Ismi</label>
                  <input
                    type="text"
                    required
                    value={teamForm.captain || ''}
                    onChange={(e) => setTeamForm({ ...teamForm, captain: e.target.value })}
                    placeholder="Masalan: Jasur Aliyev"
                    className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Kapitan Telefoni</label>
                  <input
                    type="text"
                    value={teamForm.captainPhone || ''}
                    onChange={(e) => setTeamForm({ ...teamForm, captainPhone: e.target.value })}
                    placeholder="+998 90 123 45 67"
                    className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Cabinet Credentials */}
              <div className="bg-[#18120d] p-3 rounded-xl border border-amber-500/25 space-y-2">
                <div className="flex items-center space-x-1.5 text-amber-400 text-xs font-bold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Jamoa Kabineti Login & Paroli</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-bold text-amber-200/70 uppercase mb-0.5">Login (Username)</label>
                    <input
                      type="text"
                      value={teamForm.username || ''}
                      onChange={(e) => setTeamForm({ ...teamForm, username: e.target.value })}
                      placeholder="lochinlar"
                      className="w-full bg-[#211a13] border border-amber-500/20 rounded-lg px-2.5 py-1.5 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-amber-200/70 uppercase mb-0.5">Parol</label>
                    <input
                      type="text"
                      value={teamForm.password || ''}
                      onChange={(e) => setTeamForm({ ...teamForm, password: e.target.value })}
                      placeholder="parol123"
                      className="w-full bg-[#211a13] border border-amber-500/20 rounded-lg px-2.5 py-1.5 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">A'zolar Ro'yxati (Vergul bilan ajrating)</label>
                <textarea
                  rows={2}
                  value={membersInput}
                  onChange={(e) => setMembersInput(e.target.value)}
                  placeholder="Jasur Aliyev, Sardor Komilov, Nigora Karimova, Bobur Saidov..."
                  className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl p-2.5 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-5 gap-2">
                <div>
                  <label className="block text-[9px] font-bold text-amber-400 uppercase mb-1">Ochko</label>
                  <input
                    type="number"
                    value={teamForm.points || 0}
                    onChange={(e) => setTeamForm({ ...teamForm, points: Number(e.target.value) })}
                    className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-2 py-1.5 text-xs text-amber-50 text-center font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-amber-400 uppercase mb-1">O'yinlar</label>
                  <input
                    type="number"
                    value={teamForm.gamesPlayed || 0}
                    onChange={(e) => setTeamForm({ ...teamForm, gamesPlayed: Number(e.target.value) })}
                    className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-2 py-1.5 text-xs text-amber-50 text-center font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-emerald-400 uppercase mb-1">G'alaba</label>
                  <input
                    type="number"
                    value={teamForm.wins || 0}
                    onChange={(e) => setTeamForm({ ...teamForm, wins: Number(e.target.value) })}
                    className="w-full bg-[#18120d] border border-emerald-500/30 rounded-xl px-2 py-1.5 text-xs text-emerald-300 text-center font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-amber-300 uppercase mb-1">Durang</label>
                  <input
                    type="number"
                    value={teamForm.draws || 0}
                    onChange={(e) => setTeamForm({ ...teamForm, draws: Number(e.target.value) })}
                    className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-2 py-1.5 text-xs text-amber-300 text-center font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-rose-400 uppercase mb-1">Mag'lubiyat</label>
                  <input
                    type="number"
                    value={teamForm.losses || 0}
                    onChange={(e) => setTeamForm({ ...teamForm, losses: Number(e.target.value) })}
                    className="w-full bg-[#18120d] border border-rose-500/30 rounded-xl px-2 py-1.5 text-xs text-rose-300 text-center font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Shior</label>
                <input
                  type="text"
                  value={teamForm.motto || ''}
                  onChange={(e) => setTeamForm({ ...teamForm, motto: e.target.value })}
                  placeholder="Masalan: Bilim qudratdir!"
                  className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Yutuqlar (Vergul bilan)</label>
                <input
                  type="text"
                  value={achievementsInput}
                  onChange={(e) => setAchievementsInput(e.target.value)}
                  placeholder="2026-yil Bahorgi Chempion, Tuman 1-o'rin"
                  className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-amber-500/20">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-[#18120d] text-amber-200/80 rounded-xl text-xs font-bold border border-amber-500/25 cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-5 py-2 rounded-xl text-xs flex items-center space-x-1.5 cursor-pointer shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>Saqlash</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
