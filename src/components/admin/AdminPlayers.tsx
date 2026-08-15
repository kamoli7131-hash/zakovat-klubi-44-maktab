import React, { useState } from 'react';
import { 
  Brain, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Save, 
  X, 
  Award, 
  User,
  Star,
  Sparkles
} from 'lucide-react';
import { Player, Team } from '../../types';

interface AdminPlayersProps {
  players: Player[];
  teams: Team[];
  onUpdatePlayers: (players: Player[]) => void;
  showToast: (msg: string) => void;
}

export const AdminPlayers: React.FC<AdminPlayersProps> = ({
  players,
  teams,
  onUpdatePlayers,
  showToast
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('Barchasi');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);
  const [playerForm, setPlayerForm] = useState<Partial<Player>>({
    fullName: '',
    teamName: '',
    classGrade: '11-A',
    role: 'A\'zo',
    bestScore: 0,
    correctAnswers: 0,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    badge: 'Zukko Bilimdon',
    bio: ''
  });

  const handleOpenCreateModal = () => {
    setEditingPlayerId(null);
    setPlayerForm({
      fullName: '',
      teamName: teams[0]?.name || 'Lochinlar',
      classGrade: '11-A',
      role: 'A\'zo',
      bestScore: 10,
      correctAnswers: 15,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      badge: 'Zukko Bilimdon',
      bio: 'Zakovat klubining faol a\'zosi'
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (player: Player) => {
    setEditingPlayerId(player.id);
    setPlayerForm({ ...player });
    setIsModalOpen(true);
  };

  const handleSavePlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerForm.fullName) {
      alert("Iltimos, bilimdonning to'liq ism-familiyasini kiriting!");
      return;
    }

    if (editingPlayerId) {
      const updated = players.map(p => 
        p.id === editingPlayerId 
          ? {
              ...p,
              ...playerForm,
              bestScore: Number(playerForm.bestScore) || 0,
              correctAnswers: Number(playerForm.correctAnswers) || 0
            } as Player 
          : p
      );
      onUpdatePlayers(updated);
      showToast("Bilimdon ma'lumotlari yangilandi!");
    } else {
      const newPlayer: Player = {
        id: `p-${Date.now()}`,
        fullName: playerForm.fullName || 'Yangi Bilimdon',
        teamName: playerForm.teamName || (teams[0]?.name || 'Jamoasiz'),
        classGrade: playerForm.classGrade || '10-A',
        role: playerForm.role || 'A\'zo',
        bestScore: Number(playerForm.bestScore) || 0,
        correctAnswers: Number(playerForm.correctAnswers) || 0,
        avatarUrl: playerForm.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        badge: playerForm.badge || 'Bilimdon',
        bio: playerForm.bio || ''
      };
      onUpdatePlayers([...players, newPlayer]);
      showToast("Yangi bilimdon bazaga kiritildi!");
    }
    setIsModalOpen(false);
  };

  const handleDeletePlayer = (id: string) => {
    if (confirm("Rostdan ham ushbu bilimdonni bazadan o'chirmoqchimisiz?")) {
      onUpdatePlayers(players.filter(p => p.id !== id));
      showToast("Bilimdon o'chirildi.");
    }
  };

  const filtered = players.filter(p => {
    const matchesSearch = !searchQuery || 
      p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.classGrade.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'Barchasi' || p.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 animate-fadeIn font-sans text-amber-50">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Brain className="w-4 h-4" />
            <span>Bilimdonlar Reytingi va Profillari (CRUD)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-amber-50 font-serif">
            TOP BILIMDONLAR RO'YXATI
          </h2>
          <p className="text-xs text-amber-200/70 mt-0.5">
            Maktab o'quvchilari, jamoa kapitanlari, to'g'ri javoblar soni, medallar va shaxsiy tavsiflarini to'liq boshqaring.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-md cursor-pointer transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi Bilimdon Kiritish</span>
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
            placeholder="Ism-familiya, jamoa yoki sinfni qidirish..."
            className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl pl-9 pr-3 py-2.5 text-xs text-amber-50 placeholder-amber-200/40 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 w-full sm:w-auto">
          {['Barchasi', 'Kapitan', "A'zo", 'Ekspert'].map(r => (
            <button
              key={r}
              onClick={() => setSelectedRole(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                selectedRole === r
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : 'bg-[#211a13] text-amber-200/80 border border-amber-500/20 hover:bg-[#2c2219]'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((player) => (
          <div
            key={player.id}
            className="bg-[#211a13]/90 border border-amber-500/30 hover:border-amber-400/60 rounded-2xl p-4 shadow-lg flex items-center justify-between gap-3 backdrop-blur-md transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-center space-x-3">
              <img
                src={player.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'}
                alt={player.fullName}
                className="w-12 h-12 rounded-xl object-cover border border-amber-500/40 shrink-0"
              />
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-black text-amber-50 line-clamp-1 font-serif">
                    {player.fullName}
                  </h3>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                    player.role === 'Kapitan' 
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40' 
                      : 'bg-slate-800 text-amber-200/70'
                  }`}>
                    {player.role}
                  </span>
                </div>
                <div className="text-xs text-amber-300 font-semibold">
                  {player.teamName} ({player.classGrade})
                </div>
                <div className="text-[11px] text-amber-200/60 flex items-center gap-2 pt-0.5">
                  <span>To'g'ri javoblar: <strong className="text-amber-400">{player.correctAnswers}</strong></span>
                  <span>•</span>
                  <span>Eng yuqori: <strong className="text-amber-300">{player.bestScore}</strong></span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-1 shrink-0">
              <button
                onClick={() => handleOpenEditModal(player)}
                className="p-1.5 rounded-lg bg-[#18120d] text-amber-400 hover:bg-[#2c2219] border border-amber-500/25 cursor-pointer"
                title="Bilimdonni tahrirlash"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDeletePlayer(player.id)}
                className="p-1.5 rounded-lg bg-rose-950/50 text-rose-300 hover:bg-rose-900 border border-rose-500/30 cursor-pointer"
                title="Bilimdonni o'chirish"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* ================= MODAL: CREATE / EDIT PLAYER ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#211a13] border border-amber-500/40 rounded-2xl p-5 sm:p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl text-amber-50">
            
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
              <h3 className="text-base font-black text-amber-50 font-serif flex items-center gap-2">
                <Brain className="w-5 h-5 text-amber-400" />
                <span>{editingPlayerId ? "Bilimdon Ma'lumotlarini Tahrirlash" : "Yangi Bilimdon Qo'shish"}</span>
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-amber-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePlayer} className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">F.I.SH (Ism va Familiya)</label>
                <input
                  type="text"
                  required
                  value={playerForm.fullName || ''}
                  onChange={(e) => setPlayerForm({ ...playerForm, fullName: e.target.value })}
                  placeholder="Masalan: Sardorbek Rustamov"
                  className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Jamoasi</label>
                  <select
                    value={playerForm.teamName || ''}
                    onChange={(e) => setPlayerForm({ ...playerForm, teamName: e.target.value })}
                    className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="Jamoasiz">Jamoasiz (Erkin)</option>
                    {teams.map(t => (
                      <option key={t.id} value={t.name}>{t.name} ({t.classGrade})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Sinfi</label>
                  <input
                    type="text"
                    value={playerForm.classGrade || ''}
                    onChange={(e) => setPlayerForm({ ...playerForm, classGrade: e.target.value })}
                    placeholder="Masalan: 11-A"
                    className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Roli</label>
                  <select
                    value={playerForm.role || 'A\'zo'}
                    onChange={(e) => setPlayerForm({ ...playerForm, role: e.target.value as any })}
                    className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="Kapitan">Kapitan</option>
                    <option value="A'zo">A'zo</option>
                    <option value="Ekspert">Ekspert</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Unvoni (Badge)</label>
                  <input
                    type="text"
                    value={playerForm.badge || ''}
                    onChange={(e) => setPlayerForm({ ...playerForm, badge: e.target.value })}
                    placeholder="Masalan: Oltin Boyqush Sohibi"
                    className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">To'g'ri Javoblar Soni</label>
                  <input
                    type="number"
                    value={playerForm.correctAnswers || 0}
                    onChange={(e) => setPlayerForm({ ...playerForm, correctAnswers: Number(e.target.value) })}
                    className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Eng Yuqori Ochko</label>
                  <input
                    type="number"
                    value={playerForm.bestScore || 0}
                    onChange={(e) => setPlayerForm({ ...playerForm, bestScore: Number(e.target.value) })}
                    className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Rasm (Avatar) URL manzili</label>
                <input
                  type="url"
                  value={playerForm.avatarUrl || ''}
                  onChange={(e) => setPlayerForm({ ...playerForm, avatarUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Qisqacha Bio (Haqida)</label>
                <textarea
                  rows={2}
                  value={playerForm.bio || ''}
                  onChange={(e) => setPlayerForm({ ...playerForm, bio: e.target.value })}
                  placeholder="Bilimdonning qiziqishlari, kuchli mavzulari..."
                  className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl p-2.5 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
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
