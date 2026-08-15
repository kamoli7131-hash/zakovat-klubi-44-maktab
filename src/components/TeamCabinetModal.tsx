import React, { useState } from 'react';
import { Team, Player } from '../types';
import { 
  X, 
  UserPlus, 
  Users, 
  Lock, 
  Key, 
  LogIn, 
  LogOut, 
  ShieldCheck, 
  Award, 
  Trash2, 
  Edit2, 
  Check, 
  Plus, 
  Brain, 
  Star, 
  Zap, 
  Info,
  Crown
} from 'lucide-react';

interface TeamCabinetModalProps {
  isOpen: boolean;
  onClose: () => void;
  teams: Team[];
  players: Player[];
  loggedInTeamId: string | null;
  onLoginSuccess: (teamId: string) => void;
  onLogout: () => void;
  onAddPlayerToTeam: (teamId: string, player: Omit<Player, 'id'>) => void;
  onRemovePlayerFromTeam: (teamId: string, playerId: string, playerFullName: string) => void;
  onUpdateTeamInfo: (teamId: string, motto: string, captainPhone: string) => void;
}

export const TeamCabinetModal: React.FC<TeamCabinetModalProps> = ({
  isOpen,
  onClose,
  teams,
  players,
  loggedInTeamId,
  onLoginSuccess,
  onLogout,
  onAddPlayerToTeam,
  onRemovePlayerFromTeam,
  onUpdateTeamInfo,
}) => {
  // Login form state
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Add / edit player form state
  const [isAddingPlayer, setIsAddingPlayer] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerRole, setNewPlayerRole] = useState<'Kapitan' | 'A\'zo' | 'Ekspert'>('A\'zo');
  const [newPlayerBadge, setNewPlayerBadge] = useState('⚡ Faol bilimdon');
  const [newPlayerBio, setNewPlayerBio] = useState('');
  const [newPlayerAvatar, setNewPlayerAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80');

  // Edit team info state
  const [isEditingTeam, setIsEditingTeam] = useState(false);
  const [editMotto, setEditMotto] = useState('');
  const [editPhone, setEditPhone] = useState('');

  if (!isOpen) return null;

  const currentTeam = teams.find((t) => t.id === loggedInTeamId);
  const currentTeamPlayers = currentTeam 
    ? players.filter((p) => p.teamName.toLowerCase() === currentTeam.name.toLowerCase())
    : [];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const foundTeam = teams.find(
      (t) => 
        (t.username?.toLowerCase() === usernameInput.trim().toLowerCase() || t.name.toLowerCase() === usernameInput.trim().toLowerCase()) &&
        (t.password === passwordInput || passwordInput === '123456')
    );

    if (foundTeam) {
      onLoginSuccess(foundTeam.id);
      setUsernameInput('');
      setPasswordInput('');
    } else {
      setLoginError('Login yoki parol xato! Masalan: login "genius", parol "123456"');
    }
  };

  const handleQuickDemoLogin = (team: Team) => {
    onLoginSuccess(team.id);
  };

  const handleCreatePlayerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTeam || !newPlayerName) return;

    onAddPlayerToTeam(currentTeam.id, {
      fullName: newPlayerName.trim(),
      teamName: currentTeam.name,
      classGrade: currentTeam.classGrade,
      role: newPlayerRole,
      bestScore: 100 + Math.floor(Math.random() * 40),
      correctAnswers: 30 + Math.floor(Math.random() * 50),
      avatarUrl: newPlayerAvatar,
      badge: newPlayerBadge,
      bio: newPlayerBio || `${currentTeam.name} jamoasining iqtidorli a'zosi.`
    });

    // Reset form
    setNewPlayerName('');
    setNewPlayerBio('');
    setIsAddingPlayer(false);
  };

  const handleSaveTeamInfo = () => {
    if (!currentTeam) return;
    onUpdateTeamInfo(currentTeam.id, editMotto, editPhone);
    setIsEditingTeam(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {!loggedInTeamId || !currentTeam ? (
          /* LOGIN SCREEN */
          <div className="space-y-6">
            <div>
              <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-2.5 py-0.5 rounded border border-amber-500/30">
                Jamoa Shaxsiy Kabineti
              </span>
              <h3 className="text-2xl font-black text-white flex items-center gap-2 pt-1">
                <Users className="w-6 h-6 text-amber-400" />
                Jamoa Sifatida Tizimga Kirish
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Eslatma: Bilimdonlar alohida ro'yxatdan o'tmaydi. Jamoangiz logini va paroli orqali kirib, a'zolaringizni qo'lda kiritasiz!
              </p>
            </div>

            {loginError && (
              <div className="bg-rose-500/10 border border-rose-500/40 text-rose-300 p-3 rounded-xl text-xs font-medium">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 text-xs font-bold mb-1">
                    Jamoa Logini yoki Nomi *
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={usernameInput}
                      onChange={(e) => setUsernameInput(e.target.value)}
                      placeholder="Masalan: genius yoki lochinlar"
                      className="w-full bg-slate-950 text-white text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 text-xs font-bold mb-1">
                    Parol *
                  </label>
                  <div className="relative">
                    <Key className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="Parol kiritning (standart: 123456)"
                      className="w-full bg-slate-950 text-white text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-2.5 rounded-xl text-xs shadow-lg shadow-amber-500/20 flex items-center space-x-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Kabinetga Kirish</span>
                </button>
              </div>
            </form>

            {/* Quick Demo Login Buttons for existing teams */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Tezkor Namunaviy Kirish (Mavjud Jamoalar):
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {teams.slice(0, 4).map((team) => (
                  <button
                    key={team.id}
                    onClick={() => handleQuickDemoLogin(team)}
                    className="bg-slate-950 hover:bg-slate-800 border border-slate-800 p-2.5 rounded-xl text-left transition-all"
                  >
                    <div className="font-bold text-white text-xs">{team.name}</div>
                    <div className="text-[10px] text-amber-400">{team.classGrade} Sinf</div>
                    <div className="text-[9px] text-slate-500">Kap: {team.captain}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* LOGGED IN TEAM CABINET DASHBOARD */
          <div className="space-y-6">
            
            {/* Header banner */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${currentTeam.logoColor} flex items-center justify-center text-white font-black text-xl shadow-lg shrink-0`}>
                  {currentTeam.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-white">{currentTeam.name}</h3>
                    <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-2 py-0.5 rounded border border-amber-500/30">
                      {currentTeam.classGrade} Sinf
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Kapitan: <strong className="text-slate-200">{currentTeam.captain}</strong> ({currentTeam.captainPhone || "+998 90 123 45 67"})
                  </p>
                  {currentTeam.motto && (
                    <p className="text-xs text-amber-300/80 italic mt-1">"{currentTeam.motto}"</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => {
                    setEditMotto(currentTeam.motto || '');
                    setEditPhone(currentTeam.captainPhone || '');
                    setIsEditingTeam(!isEditingTeam);
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3 py-2 rounded-xl border border-slate-700 flex items-center gap-1.5"
                >
                  <Edit2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Jamoani Tahrirlash</span>
                </button>

                <button
                  onClick={onLogout}
                  className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Chiqish</span>
                </button>
              </div>
            </div>

            {/* Team stats summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
              <div>
                <span className="text-[10px] text-slate-400 font-medium block">Reyting O'rni</span>
                <span className="text-base font-black text-amber-400">#{currentTeam.ratingRank}-O'rin</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-medium block">Jami Ochko</span>
                <span className="text-base font-black text-amber-400">{currentTeam.points} Ochko</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-medium block">G'alabalari</span>
                <span className="text-base font-black text-emerald-400">{currentTeam.wins} ta</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-medium block">O'yinlar Soni</span>
                <span className="text-base font-black text-slate-200">{currentTeam.gamesPlayed} ta</span>
              </div>
            </div>

            {/* Edit Team Info Drawer Form */}
            {isEditingTeam && (
              <div className="bg-slate-950 p-4 rounded-2xl border border-amber-500/30 space-y-3 animate-fadeIn">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Jamoa Ma'lumotlarini Tahrirlash
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1 font-bold">
                      Jamoa Shiori (Motto)
                    </label>
                    <input
                      type="text"
                      value={editMotto}
                      onChange={(e) => setEditMotto(e.target.value)}
                      className="w-full bg-slate-900 text-white text-xs p-2 rounded-xl border border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1 font-bold">
                      Kapitan Telefon Raqami
                    </label>
                    <input
                      type="text"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full bg-slate-900 text-white text-xs p-2 rounded-xl border border-slate-700"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    onClick={() => setIsEditingTeam(false)}
                    className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg text-xs"
                  >
                    Bekor qilish
                  </button>
                  <button
                    onClick={handleSaveTeamInfo}
                    className="bg-amber-500 text-slate-950 font-bold px-4 py-1.5 rounded-lg text-xs"
                  >
                    Saqlash
                  </button>
                </div>
              </div>
            )}

            {/* MAIN CORE FEATURE: MANUALLY MANAGING BILIMDONLAR (TEAM MEMBERS) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div>
                  <h4 className="text-lg font-black text-white flex items-center gap-2">
                    <Brain className="w-5 h-5 text-amber-400" />
                    Jamoa Bilimdonlari (A'zolari) Ro'yxati
                  </h4>
                  <p className="text-xs text-slate-400">
                    O'z jamoangiz bilimdonlarini qo'lda kiritib boring. Kiritilgan bilimdonlar saytning "Bilimdonlar" bo'limida avtomatik ko'rinadi.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddingPlayer(!isAddingPlayer)}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3.5 py-2 rounded-xl text-xs shadow-md flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Yangi Bilimdon Qo'shish</span>
                </button>
              </div>

              {/* Form to Add New Player */}
              {isAddingPlayer && (
                <form onSubmit={handleCreatePlayerSubmit} className="bg-slate-950 p-4 rounded-2xl border border-amber-500/40 space-y-3 animate-fadeIn text-xs">
                  <div className="font-bold text-amber-400 text-xs">
                    Yangi Bilimdon (A'zo) Ma'lumotlarini Kiritish
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">
                        Bilimdon Ismi va Familiyasi *
                      </label>
                      <input
                        type="text"
                        required
                        value={newPlayerName}
                        onChange={(e) => setNewPlayerName(e.target.value)}
                        placeholder="Masalan: Sardorbek Rahimov"
                        className="w-full bg-slate-900 text-white p-2 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-bold mb-1">
                        Roli *
                      </label>
                      <select
                        value={newPlayerRole}
                        onChange={(e) => setNewPlayerRole(e.target.value as any)}
                        className="w-full bg-slate-900 text-white p-2 rounded-xl border border-slate-700"
                      >
                        <option value="A'zo">A'zo (Asosiy tarkib)</option>
                        <option value="Kapitan">Kapitan</option>
                        <option value="Ekspert">Ekspert / Zaxira</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">
                        Unvoni / Nishoni (Badge)
                      </label>
                      <input
                        type="text"
                        value={newPlayerBadge}
                        onChange={(e) => setNewPlayerBadge(e.target.value)}
                        placeholder="Masalan: ⚡ Mantiqiy savollar ustasi"
                        className="w-full bg-slate-900 text-white p-2 rounded-xl border border-slate-700"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-bold mb-1">
                        Profil Rasmi (Avatar Linki)
                      </label>
                      <input
                        type="text"
                        value={newPlayerAvatar}
                        onChange={(e) => setNewPlayerAvatar(e.target.value)}
                        placeholder="Rasm URL havolasi"
                        className="w-full bg-slate-900 text-white p-2 rounded-xl border border-slate-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      Bilimdon Haqida Qisqacha (Bio / Kuchli tarafi)
                    </label>
                    <input
                      type="text"
                      value={newPlayerBio}
                      onChange={(e) => setNewPlayerBio(e.target.value)}
                      placeholder="Masalan: Tarix va Geografiya yo'nalishidagi savollarda juda kuchli."
                      className="w-full bg-slate-900 text-white p-2 rounded-xl border border-slate-700"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingPlayer(false)}
                      className="bg-slate-800 text-slate-300 px-4 py-2 rounded-xl font-bold"
                    >
                      Bekor qilish
                    </button>
                    <button
                      type="submit"
                      className="bg-amber-500 text-slate-950 font-extrabold px-5 py-2 rounded-xl shadow"
                    >
                      Saqlash va Qo'shish
                    </button>
                  </div>
                </form>
              )}

              {/* List of Current Team Members */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentTeamPlayers.length > 0 ? (
                  currentTeamPlayers.map((player) => (
                    <div key={player.id} className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between gap-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={player.avatarUrl}
                          alt={player.fullName}
                          className="w-11 h-11 rounded-xl object-cover border border-amber-500/40"
                        />
                        <div>
                          <div className="font-bold text-white text-xs flex items-center gap-1.5">
                            <span>{player.fullName}</span>
                            {player.role === 'Kapitan' && (
                              <span className="bg-amber-500/20 text-amber-300 text-[10px] px-1.5 py-0.2 rounded font-bold border border-amber-500/30">
                                Kapitan
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            {player.badge}
                          </div>
                          <div className="text-[10px] text-emerald-400 font-medium">
                            Javoblar: {player.correctAnswers} ta
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemovePlayerFromTeam(currentTeam.id, player.id, player.fullName)}
                        className="text-rose-400 hover:text-rose-300 p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20"
                        title="Bilimdonni o'chirish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  /* Fallback if list from Player object is empty, display text members */
                  currentTeam.members.map((memberName, idx) => (
                    <div key={idx} className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between gap-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs border border-amber-500/30">
                          {idx + 1}
                        </div>
                        <div>
                          <div className="font-bold text-white text-xs">{memberName}</div>
                          <div className="text-[10px] text-slate-400">{currentTeam.classGrade} Sinf Bilimdoni</div>
                        </div>
                      </div>

                      <span className="text-[10px] text-slate-500 font-medium">Qo'lda kiritilgan</span>
                    </div>
                  ))
                )}
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
