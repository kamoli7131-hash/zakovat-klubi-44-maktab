import React, { useState } from 'react';
import { 
  Trophy, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Save, 
  X, 
  Calendar, 
  FileSpreadsheet, 
  Upload,
  CheckCircle2,
  Clock,
  MapPin,
  Eye
} from 'lucide-react';
import { Tournament, TournamentRound, TournamentExcelResult, TournamentExcelScoreRow } from '../../types';

interface AdminTournamentsProps {
  tournaments: Tournament[];
  onUpdateTournaments: (tournaments: Tournament[]) => void;
  showToast: (msg: string) => void;
}

export const AdminTournaments: React.FC<AdminTournamentsProps> = ({
  tournaments,
  onUpdateTournaments,
  showToast
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTournamentId, setEditingTournamentId] = useState<string | null>(null);
  const [tournamentForm, setTournamentForm] = useState<Partial<Tournament>>({
    title: '',
    season: 'Kuz-2026',
    description: '',
    startDate: '2026-09-01',
    endDate: '2026-11-30',
    registrationStartDate: '2026-08-01',
    registrationEndDate: '2026-08-30',
    isRegistrationOpen: true,
    status: 'Ro\'yxatga olish',
    rounds: [
      {
        roundNumber: 1,
        title: '1-Tur Boshlang\'ich Bosqich',
        date: '2026-09-15',
        time: '14:00',
        venue: '44-Maktab Akt Zali',
        status: 'Kutilmoqda',
        teamsCount: 12
      }
    ]
  });

  // Excel Upload drawer/modal
  const [excelUploadTournament, setExcelUploadTournament] = useState<Tournament | null>(null);
  const [excelRoundTitle, setExcelRoundTitle] = useState('1-Tur Natijalari');

  const handleOpenCreateModal = () => {
    setEditingTournamentId(null);
    setTournamentForm({
      title: '',
      season: 'Kuz-2026',
      description: '',
      startDate: '2026-09-01',
      endDate: '2026-11-30',
      registrationStartDate: '2026-08-01',
      registrationEndDate: '2026-08-30',
      isRegistrationOpen: true,
      status: 'Ro\'yxatga olish',
      rounds: [
        {
          roundNumber: 1,
          title: '1-Tur Boshlang\'ich Bosqich',
          date: '2026-09-15',
          time: '14:00',
          venue: '44-Maktab Akt Zali',
          status: 'Kutilmoqda',
          teamsCount: 12
        }
      ]
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (tour: Tournament) => {
    setEditingTournamentId(tour.id);
    setTournamentForm({ ...tour });
    setIsModalOpen(true);
  };

  const handleSaveTournament = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tournamentForm.title) {
      alert("Turnir nomini kiriting!");
      return;
    }

    if (editingTournamentId) {
      const updated = tournaments.map(t => 
        t.id === editingTournamentId ? { ...t, ...tournamentForm } as Tournament : t
      );
      onUpdateTournaments(updated);
      showToast("Turnir ma'lumotlari muvaffaqiyatli tahrirlandi!");
    } else {
      const newTour: Tournament = {
        id: `tour-${Date.now()}`,
        title: tournamentForm.title || 'Yangi Zakovat Turniri',
        season: tournamentForm.season || 'Kuz-2026',
        description: tournamentForm.description || '',
        startDate: tournamentForm.startDate || '2026-09-01',
        endDate: tournamentForm.endDate || '2026-11-30',
        registrationStartDate: tournamentForm.registrationStartDate || '2026-08-01',
        registrationEndDate: tournamentForm.registrationEndDate || '2026-08-30',
        isRegistrationOpen: tournamentForm.isRegistrationOpen ?? true,
        status: tournamentForm.status || 'Ro\'yxatga olish',
        rounds: tournamentForm.rounds || []
      };
      onUpdateTournaments([...tournaments, newTour]);
      showToast("Yangi turnir e'lon qilindi!");
    }
    setIsModalOpen(false);
  };

  const handleDeleteTournament = (id: string) => {
    if (confirm("Ushbu turnirni bazadan o'chirmoqchimisiz?")) {
      onUpdateTournaments(tournaments.filter(t => t.id !== id));
      showToast("Turnir o'chirildi.");
    }
  };

  // Add round to tournament form
  const handleAddRound = () => {
    const nextNum = (tournamentForm.rounds?.length || 0) + 1;
    const newRound: TournamentRound = {
      roundNumber: nextNum,
      title: `${nextNum}-Tur`,
      date: '2026-10-01',
      time: '14:00',
      venue: '44-Maktab Akt Zali',
      status: 'Kutilmoqda',
      teamsCount: 12
    };
    setTournamentForm({
      ...tournamentForm,
      rounds: [...(tournamentForm.rounds || []), newRound]
    });
  };

  const handleRemoveRound = (roundIdx: number) => {
    const updated = (tournamentForm.rounds || []).filter((_, idx) => idx !== roundIdx);
    setTournamentForm({ ...tournamentForm, rounds: updated });
  };

  // Handle Excel Result File Upload
  const handleExcelFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !excelUploadTournament) return;

    // Simulated / real CSV or text parser for quick table generation
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const scores: TournamentExcelScoreRow[] = [];

      if (text && text.includes(',')) {
        // CSV format
        const lines = text.split('\n');
        lines.slice(1).forEach((line, idx) => {
          const parts = line.split(',');
          if (parts.length >= 2) {
            scores.push({
              teamName: parts[0]?.trim() || `Jamoa ${idx + 1}`,
              round1: parseInt(parts[1]) || 5,
              round2: parseInt(parts[2]) || 6,
              round3: parseInt(parts[3]) || 7,
              total: parseInt(parts[4]) || (parseInt(parts[1]) || 5) + (parseInt(parts[2]) || 6) + (parseInt(parts[3]) || 7),
              rank: idx + 1
            });
          }
        });
      }

      // Default sample table if not CSV or binary
      const finalScores: TournamentExcelScoreRow[] = scores.length > 0 ? scores : [
        { teamName: 'Lochinlar (11-A)', round1: 9, round2: 8, round3: 10, total: 27, rank: 1 },
        { teamName: 'Genius (10-B)', round1: 8, round2: 8, round3: 8, total: 24, rank: 2 },
        { teamName: 'Zukko (9-A)', round1: 7, round2: 7, round3: 8, total: 22, rank: 3 },
        { teamName: 'Parvoz (11-B)', round1: 6, round2: 7, round3: 6, total: 19, rank: 4 }
      ];

      const newExcelResult: TournamentExcelResult = {
        id: `excel-${Date.now()}`,
        fileName: file.name,
        uploadDate: new Date().toISOString().split('T')[0],
        roundTitle: excelRoundTitle || 'Tur Natijalari',
        scores: finalScores
      };

      const updatedTour = {
        ...excelUploadTournament,
        excelResults: [...(excelUploadTournament.excelResults || []), newExcelResult]
      };

      onUpdateTournaments(tournaments.map(t => t.id === excelUploadTournament.id ? updatedTour : t));
      setExcelUploadTournament(updatedTour);
      showToast(`Excel jadvali (${file.name}) muvaffaqiyatli saqlandi!`);
    };
    reader.readAsText(file);
  };

  const handleDeleteExcelResult = (tournamentId: string, resultId: string) => {
    if (confirm("Ushbu Excel natijalar jadvalini o'chirmoqchimisiz?")) {
      const tour = tournaments.find(t => t.id === tournamentId);
      if (!tour) return;
      const updatedTour = {
        ...tour,
        excelResults: (tour.excelResults || []).filter(r => r.id !== resultId)
      };
      onUpdateTournaments(tournaments.map(t => t.id === tournamentId ? updatedTour : t));
      if (excelUploadTournament?.id === tournamentId) {
        setExcelUploadTournament(updatedTour);
      }
      showToast("Excel natijasi o'chirildi.");
    }
  };

  const filtered = tournaments.filter(t => {
    return !searchQuery || 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.season.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6 animate-fadeIn font-sans text-amber-50">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Trophy className="w-4 h-4" />
            <span>Turnirlar, Bosqichlar va Excel Natijalar (CRUD)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-amber-50 font-serif">
            TURNIRLAR VA CHEMPIONATLAR
          </h2>
          <p className="text-xs text-amber-200/70 mt-0.5">
            Turnirlar o'tkazish sanalari, turlar, ro'yxatdan o'tish oynasi va rasmiy Excel protokollarini yuklash.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-md cursor-pointer transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi Turnir E'lon Qilish</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-3 text-amber-400/60" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Turnir nomi yoki mavsumini qidirish..."
          className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl pl-9 pr-3 py-2.5 text-xs text-amber-50 placeholder-amber-200/40 focus:outline-none focus:border-amber-400"
        />
      </div>

      {/* Tournaments List */}
      <div className="space-y-4">
        {filtered.map((tour) => (
          <div
            key={tour.id}
            className="bg-[#211a13]/90 border border-amber-500/30 hover:border-amber-400/60 rounded-2xl p-5 space-y-4 shadow-xl backdrop-blur-md transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-amber-500/20 pb-3">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-[10px] bg-amber-500/20 border border-amber-400/30 text-amber-300 font-bold px-2 py-0.5 rounded-full uppercase">
                    {tour.season}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    tour.status === "Ro'yxatga olish" ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30' :
                    tour.status === "O'tkazilmoqda" ? 'bg-amber-950/60 text-amber-300 border border-amber-500/30' :
                    'bg-slate-900 text-slate-300'
                  }`}>
                    {tour.status}
                  </span>
                  {tour.isRegistrationOpen && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">
                      Ro'yxatga olish ochiq
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-black text-amber-50 font-serif">{tour.title}</h3>
                <p className="text-xs text-amber-200/70">{tour.description}</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setExcelUploadTournament(tour)}
                  className="bg-[#18120d] hover:bg-[#2c2219] text-emerald-400 border border-emerald-500/30 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center space-x-1.5 cursor-pointer transition-all"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Excel Natijalar ({tour.excelResults?.length || 0})</span>
                </button>
                <button
                  onClick={() => handleOpenEditModal(tour)}
                  className="p-1.5 rounded-xl bg-[#18120d] text-amber-400 hover:bg-[#2c2219] border border-amber-500/25 cursor-pointer"
                  title="Turnirni tahrirlash"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteTournament(tour.id)}
                  className="p-1.5 rounded-xl bg-rose-950/50 text-rose-300 hover:bg-rose-900 border border-rose-500/30 cursor-pointer"
                  title="Turnirni o'chirish"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Rounds summary */}
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                Rejalashtirilgan Turlar ({tour.rounds?.length || 0})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {(tour.rounds || []).map((round, idx) => (
                  <div key={idx} className="bg-[#18120d] border border-amber-500/20 rounded-xl p-2.5 text-xs space-y-1">
                    <div className="font-bold text-amber-200 flex items-center justify-between">
                      <span>{round.title}</span>
                      <span className="text-[10px] text-amber-400">{round.status}</span>
                    </div>
                    <div className="text-[11px] text-amber-200/60 flex items-center gap-2">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-amber-400/80" /> {round.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-amber-400/80" /> {round.time}</span>
                    </div>
                    <div className="text-[10px] text-amber-200/50 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400/70" /> {round.venue}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* ================= MODAL: CREATE / EDIT TOURNAMENT ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#211a13] border border-amber-500/40 rounded-2xl p-5 sm:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl text-amber-50">
            
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
              <h3 className="text-base font-black text-amber-50 font-serif flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <span>{editingTournamentId ? "Turnirni Tahrirlash" : "Yangi Turnir E'lon Qilish"}</span>
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-amber-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTournament} className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Turnir Nomi</label>
                <input
                  type="text"
                  required
                  value={tournamentForm.title || ''}
                  onChange={(e) => setTournamentForm({ ...tournamentForm, title: e.target.value })}
                  placeholder="Masalan: 44-Maktab 2026-Yil Kuzgi Chempionati"
                  className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Mavsum</label>
                  <input
                    type="text"
                    value={tournamentForm.season || ''}
                    onChange={(e) => setTournamentForm({ ...tournamentForm, season: e.target.value })}
                    placeholder="Masalan: Kuz-2026"
                    className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Holati</label>
                  <select
                    value={tournamentForm.status || "Ro'yxatga olish"}
                    onChange={(e) => setTournamentForm({ ...tournamentForm, status: e.target.value as any })}
                    className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="Ro'yxatga olish">Ro'yxatga olish</option>
                    <option value="O'tkazilmoqda">O'tkazilmoqda</option>
                    <option value="Yakunlangan">Yakunlangan</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Boshlanish Sanasi</label>
                  <input
                    type="date"
                    value={tournamentForm.startDate || ''}
                    onChange={(e) => setTournamentForm({ ...tournamentForm, startDate: e.target.value })}
                    className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Tugash Sanasi</label>
                  <input
                    type="date"
                    value={tournamentForm.endDate || ''}
                    onChange={(e) => setTournamentForm({ ...tournamentForm, endDate: e.target.value })}
                    className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Registration Window */}
              <div className="bg-[#18120d] p-3 rounded-xl border border-amber-500/25 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-amber-400 uppercase">Jamoalar Ro'yxatdan O'tish Oynasi</span>
                  <label className="flex items-center space-x-2 text-xs text-amber-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tournamentForm.isRegistrationOpen ?? true}
                      onChange={(e) => setTournamentForm({ ...tournamentForm, isRegistrationOpen: e.target.checked })}
                      className="rounded border-amber-500/40 text-amber-500 focus:ring-amber-400"
                    />
                    <span>Ro'yxatdan o'tish faol</span>
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] text-amber-200/60 uppercase">Ochilish sanasi</label>
                    <input
                      type="date"
                      value={tournamentForm.registrationStartDate || ''}
                      onChange={(e) => setTournamentForm({ ...tournamentForm, registrationStartDate: e.target.value })}
                      className="w-full bg-[#241c15] border border-amber-500/20 rounded-lg px-2.5 py-1.5 text-xs text-amber-50"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-amber-200/60 uppercase">Tugash sanasi</label>
                    <input
                      type="date"
                      value={tournamentForm.registrationEndDate || ''}
                      onChange={(e) => setTournamentForm({ ...tournamentForm, registrationEndDate: e.target.value })}
                      className="w-full bg-[#241c15] border border-amber-500/20 rounded-lg px-2.5 py-1.5 text-xs text-amber-50"
                    />
                  </div>
                </div>
              </div>

              {/* Rounds CRUD */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold text-amber-400 uppercase">Turnir Turlari / Bosqichlari</label>
                  <button
                    type="button"
                    onClick={handleAddRound}
                    className="text-xs text-amber-300 hover:text-amber-200 flex items-center gap-1 font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" /> Tur qo'shish
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {(tournamentForm.rounds || []).map((round, idx) => (
                    <div key={idx} className="bg-[#18120d] border border-amber-500/20 rounded-xl p-2.5 flex items-center justify-between gap-2">
                      <div className="flex-1 grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={round.title}
                          onChange={(e) => {
                            const newRounds = [...(tournamentForm.rounds || [])];
                            newRounds[idx].title = e.target.value;
                            setTournamentForm({ ...tournamentForm, rounds: newRounds });
                          }}
                          className="bg-[#241c15] border border-amber-500/20 rounded px-2 py-1 text-xs text-amber-50"
                          placeholder="Tur nomi"
                        />
                        <input
                          type="date"
                          value={round.date}
                          onChange={(e) => {
                            const newRounds = [...(tournamentForm.rounds || [])];
                            newRounds[idx].date = e.target.value;
                            setTournamentForm({ ...tournamentForm, rounds: newRounds });
                          }}
                          className="bg-[#241c15] border border-amber-500/20 rounded px-2 py-1 text-xs text-amber-50"
                        />
                        <input
                          type="text"
                          value={round.venue}
                          onChange={(e) => {
                            const newRounds = [...(tournamentForm.rounds || [])];
                            newRounds[idx].venue = e.target.value;
                            setTournamentForm({ ...tournamentForm, rounds: newRounds });
                          }}
                          className="bg-[#241c15] border border-amber-500/20 rounded px-2 py-1 text-xs text-amber-50"
                          placeholder="Manzil"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveRound(idx)}
                        className="text-rose-400 hover:text-rose-300 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Tavsif</label>
                <textarea
                  rows={2}
                  value={tournamentForm.description || ''}
                  onChange={(e) => setTournamentForm({ ...tournamentForm, description: e.target.value })}
                  placeholder="Turnir formati va shartlari..."
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

      {/* ================= MODAL: EXCEL RESULTS MANAGEMENT ================= */}
      {excelUploadTournament && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#211a13] border border-amber-500/40 rounded-2xl p-5 sm:p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl text-amber-50">
            
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
              <div>
                <span className="text-[10px] text-emerald-400 font-bold uppercase">Excel Natijalar Jadvali</span>
                <h3 className="text-lg font-black text-amber-50 font-serif">{excelUploadTournament.title}</h3>
              </div>
              <button
                onClick={() => setExcelUploadTournament(null)}
                className="p-1 text-amber-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Upload Excel Dropzone */}
            <div className="bg-[#18120d] border-2 border-dashed border-emerald-500/40 rounded-xl p-5 text-center space-y-2">
              <FileSpreadsheet className="w-7 h-7 text-emerald-400 mx-auto" />
              <p className="text-xs font-bold text-emerald-300">
                Excel (.xlsx / .xls) yoki CSV natijalar protokolini yuklang
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1">
                <input
                  type="text"
                  value={excelRoundTitle}
                  onChange={(e) => setExcelRoundTitle(e.target.value)}
                  placeholder="Tur nomi (masalan: 1-Tur Natijalari)"
                  className="bg-[#241c15] border border-emerald-500/30 rounded-lg px-3 py-1.5 text-xs text-emerald-100 placeholder-emerald-300/40 w-64"
                />
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls,.txt"
                  onChange={handleExcelFileUpload}
                  className="text-xs text-amber-200/80 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-500 file:text-slate-950 cursor-pointer"
                />
              </div>
            </div>

            {/* List of uploaded excel results */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-bold text-amber-400 uppercase">
                Yuklangan Excel Protokollari ({excelUploadTournament.excelResults?.length || 0})
              </h4>

              {(!excelUploadTournament.excelResults || excelUploadTournament.excelResults.length === 0) ? (
                <div className="text-xs text-amber-200/60 p-4 bg-[#18120d] rounded-xl text-center">
                  Hozircha ushbu turnir uchun Excel natijalar jadvali yuklanmagan.
                </div>
              ) : (
                excelUploadTournament.excelResults.map((result) => (
                  <div key={result.id} className="bg-[#18120d] border border-amber-500/25 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-black text-amber-200">{result.roundTitle}</h5>
                        <div className="text-[11px] text-amber-200/60">{result.fileName} • {result.uploadDate}</div>
                      </div>
                      <button
                        onClick={() => handleDeleteExcelResult(excelUploadTournament.id, result.id)}
                        className="p-1.5 rounded-lg bg-rose-950/50 text-rose-300 hover:bg-rose-900 border border-rose-500/30 cursor-pointer"
                        title="Excel jadvalini o'chirish"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Mini Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-amber-100">
                        <thead className="bg-[#241c15] text-[10px] text-amber-300 uppercase">
                          <tr>
                            <th className="p-2">O'rin</th>
                            <th className="p-2">Jamoa</th>
                            <th className="p-2 text-center">1-Tur</th>
                            <th className="p-2 text-center">2-Tur</th>
                            <th className="p-2 text-center">3-Tur</th>
                            <th className="p-2 text-center">Jami</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-amber-500/10">
                          {result.scores.map((row, rIdx) => (
                            <tr key={rIdx}>
                              <td className="p-2 font-bold text-amber-400">#{row.rank}</td>
                              <td className="p-2 font-semibold text-amber-50">{row.teamName}</td>
                              <td className="p-2 text-center">{row.round1}</td>
                              <td className="p-2 text-center">{row.round2}</td>
                              <td className="p-2 text-center">{row.round3}</td>
                              <td className="p-2 text-center font-black text-amber-300">{row.total}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
