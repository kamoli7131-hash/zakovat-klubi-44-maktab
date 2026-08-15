import React from 'react';
import { 
  Users, 
  Brain, 
  Trophy, 
  HelpCircle, 
  Newspaper, 
  Image as ImageIcon, 
  FileText, 
  Plus, 
  Download, 
  Upload, 
  RotateCcw,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet,
  FileUp,
  School
} from 'lucide-react';
import { 
  Team, 
  Player, 
  Tournament, 
  Question, 
  NewsArticle, 
  GalleryMedia, 
  TeamRegistration,
  QuestionPackage,
  SchoolInfo
} from '../../types';
import { 
  INITIAL_TEAMS, 
  INITIAL_PLAYERS, 
  INITIAL_TOURNAMENTS, 
  INITIAL_QUESTIONS, 
  INITIAL_NEWS, 
  INITIAL_GALLERY, 
  INITIAL_QUESTION_PACKAGES, 
  INITIAL_SCHOOL_INFO, 
  INITIAL_REGISTRATIONS 
} from '../../data/initialData';

interface AdminOverviewProps {
  teams: Team[];
  players: Player[];
  tournaments: Tournament[];
  questions: Question[];
  news: NewsArticle[];
  gallery: GalleryMedia[];
  registrations: TeamRegistration[];
  questionPackages: QuestionPackage[];
  schoolInfo: SchoolInfo;
  onNavigateTab: (tab: any) => void;
  onRestoreAllData: (data: any) => void;
  onResetToDefaults: () => void;
  showToast: (msg: string) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  teams,
  players,
  tournaments,
  questions,
  news,
  gallery,
  registrations,
  questionPackages,
  schoolInfo,
  onNavigateTab,
  onRestoreAllData,
  onResetToDefaults,
  showToast
}) => {
  const pendingRegs = registrations.filter(r => r.status === 'pending');
  const totalPackageQuestions = questionPackages.reduce((acc, p) => acc + (p.questions?.length || p.questionCount || 0), 0);

  const handleExportBackupJSON = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      schoolInfo,
      teams,
      players,
      tournaments,
      questionPackages,
      questions,
      news,
      gallery,
      registrations
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zakovat44_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("To'liq ma'lumotlar bazasi zaxira nusxasi (JSON) yuklab olindi!");
  };

  const handleImportBackupJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        onRestoreAllData(parsed);
        showToast("Barcha ma'lumotlar zaxira nusxadan muvaffaqiyatli tiklandi!");
      } catch (err) {
        alert("JSON fayli noto'g'ri yoki buzilgan.");
      }
    };
    reader.readAsText(file);
  };

  const handleConfirmReset = () => {
    if (confirm("DIQQAT: Barcha ma'lumotlar dastlabki (zavod) holatiga qaytariladi. Davom etasizmi?")) {
      onResetToDefaults();
      showToast("Barcha ma'lumotlar dastlabki holatga qaytarildi!");
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans text-amber-50">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-500/25 via-[#2a2118] to-amber-500/10 border border-amber-500/40 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>44-Maktab Zakovat Klubi Markaziy Boshqaruvi</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-amber-50 font-serif">
            Xush kelibsiz, Bosh Administrator!
          </h2>
          <p className="text-xs sm:text-sm text-amber-200/80 mt-1 max-w-2xl">
            Saytning barcha ko'rinuvchi ma'lumotlarini (Jamoalar, Bilimdonlar, Turnirlar, Word savollar to'plamlari, Viktorina, Yangiliklar, Fotogalereya, Maktab ma'lumotlari va FAQ) shu yerdan to'liq boshqaring (CRUD).
          </p>
        </div>

        {/* Pending Applications notification badge */}
        {pendingRegs.length > 0 && (
          <button
            onClick={() => onNavigateTab('applications')}
            className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-lg animate-pulse shrink-0 cursor-pointer"
          >
            <Users className="w-4 h-4" />
            <span>{pendingRegs.length} ta yangi ariza kutmoqda!</span>
          </button>
        )}
      </div>

      {/* Primary 8 Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        
        <div 
          onClick={() => onNavigateTab('teams')}
          className="bg-[#211a13]/90 border border-amber-500/30 hover:border-amber-400/60 p-4 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-lg group"
        >
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-bold bg-amber-500/15 px-2 py-0.5 rounded-full">Jamoalar</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-50">{teams.length}</div>
          <div className="text-[11px] text-amber-200/60 mt-1">Ro'yxatdagi faol jamoalar</div>
        </div>

        <div 
          onClick={() => onNavigateTab('players')}
          className="bg-[#211a13]/90 border border-amber-500/30 hover:border-amber-400/60 p-4 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-lg group"
        >
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <Brain className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-bold bg-amber-500/15 px-2 py-0.5 rounded-full">Bilimdonlar</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-50">{players.length}</div>
          <div className="text-[11px] text-amber-200/60 mt-1">Reytingdagi o'quvchilar</div>
        </div>

        <div 
          onClick={() => onNavigateTab('tournaments')}
          className="bg-[#211a13]/90 border border-amber-500/30 hover:border-amber-400/60 p-4 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-lg group"
        >
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <Trophy className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-bold bg-amber-500/15 px-2 py-0.5 rounded-full">Turnirlar</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-50">{tournaments.length}</div>
          <div className="text-[11px] text-amber-200/60 mt-1">Kuzgi va bahorgi musobaqalar</div>
        </div>

        <div 
          onClick={() => onNavigateTab('question-packages')}
          className="bg-[#211a13]/90 border border-amber-500/30 hover:border-amber-400/60 p-4 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-lg group"
        >
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-bold bg-amber-500/15 px-2 py-0.5 rounded-full">To'plamlar</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-50">{questionPackages.length}</div>
          <div className="text-[11px] text-amber-200/60 mt-1">{totalPackageQuestions} ta savol jamlangan</div>
        </div>

        <div 
          onClick={() => onNavigateTab('questions')}
          className="bg-[#211a13]/90 border border-amber-500/30 hover:border-amber-400/60 p-4 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-lg group"
        >
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <HelpCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-bold bg-amber-500/15 px-2 py-0.5 rounded-full">Viktorina</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-50">{questions.length}</div>
          <div className="text-[11px] text-amber-200/60 mt-1">Live o'yin savollari</div>
        </div>

        <div 
          onClick={() => onNavigateTab('news')}
          className="bg-[#211a13]/90 border border-amber-500/30 hover:border-amber-400/60 p-4 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-lg group"
        >
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <Newspaper className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-bold bg-amber-500/15 px-2 py-0.5 rounded-full">Yangiliklar</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-50">{news.length}</div>
          <div className="text-[11px] text-amber-200/60 mt-1">E'lon va g'oliblar xabarlari</div>
        </div>

        <div 
          onClick={() => onNavigateTab('gallery')}
          className="bg-[#211a13]/90 border border-amber-500/30 hover:border-amber-400/60 p-4 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-lg group"
        >
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <ImageIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-bold bg-amber-500/15 px-2 py-0.5 rounded-full">Fotogalereya</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-50">{gallery.length}</div>
          <div className="text-[11px] text-amber-200/60 mt-1">O'yinlardan yorqin fotolar</div>
        </div>

        <div 
          onClick={() => onNavigateTab('applications')}
          className="bg-[#211a13]/90 border border-amber-500/30 hover:border-amber-400/60 p-4 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-lg group"
        >
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-bold bg-amber-500/15 px-2 py-0.5 rounded-full">Arizalar</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-50">{registrations.length}</div>
          <div className="text-[11px] text-amber-200/60 mt-1">{pendingRegs.length} kutilmoqda</div>
        </div>

      </div>

      {/* Quick Action Operations */}
      <div className="bg-[#211a13]/90 border border-amber-500/30 rounded-2xl p-5 sm:p-6 space-y-4">
        <h3 className="text-base font-black text-amber-50 font-serif flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Tezkor Amallar va Yangi Ma'lumot Qo'shish</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => onNavigateTab('question-packages')}
            className="p-3 bg-[#18120d] border border-amber-500/25 hover:border-amber-400/60 rounded-xl text-left transition-all hover:-translate-y-0.5 cursor-pointer group"
          >
            <FileUp className="w-5 h-5 text-amber-400 mb-1.5 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-amber-100">Word Savollar Yuklash</div>
            <div className="text-[10px] text-amber-200/60">.doc / .txt fayldan import</div>
          </button>

          <button
            onClick={() => onNavigateTab('tournaments')}
            className="p-3 bg-[#18120d] border border-amber-500/25 hover:border-amber-400/60 rounded-xl text-left transition-all hover:-translate-y-0.5 cursor-pointer group"
          >
            <FileSpreadsheet className="w-5 h-5 text-emerald-400 mb-1.5 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-amber-100">Excel Natija Yuklash</div>
            <div className="text-[10px] text-amber-200/60">Jadvallarni sinxronlash</div>
          </button>

          <button
            onClick={() => onNavigateTab('teams')}
            className="p-3 bg-[#18120d] border border-amber-500/25 hover:border-amber-400/60 rounded-xl text-left transition-all hover:-translate-y-0.5 cursor-pointer group"
          >
            <Plus className="w-5 h-5 text-amber-400 mb-1.5 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-amber-100">Yangi Jamoa Kiritish</div>
            <div className="text-[10px] text-amber-200/60">Sinf va tarkib bilan</div>
          </button>

          <button
            onClick={() => onNavigateTab('school-info')}
            className="p-3 bg-[#18120d] border border-amber-500/25 hover:border-amber-400/60 rounded-xl text-left transition-all hover:-translate-y-0.5 cursor-pointer group"
          >
            <School className="w-5 h-5 text-amber-400 mb-1.5 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-amber-100">Header, Footer & Maktab</div>
            <div className="text-[10px] text-amber-200/60">Sarlavha, footer va kontaktlar</div>
          </button>
        </div>
      </div>

      {/* Database Backup & Restore Center */}
      <div className="bg-[#211a13]/90 border border-amber-500/30 rounded-2xl p-5 sm:p-6 space-y-4">
        <h3 className="text-base font-black text-amber-50 font-serif flex items-center gap-2">
          <Download className="w-4 h-4 text-amber-400" />
          <span>Ma'lumotlar Bazasi Zaxira Nusxasi (Backup & Restore)</span>
        </h3>
        <p className="text-xs text-amber-200/80">
          Saytdagi barcha 100% ma'lumotlarni (jamoalar, savollar, natijalar, yangiliklar) xavfsiz JSON fayl sifatida yuklab oling yoki avvalgi zaxira nusxani qayta yuklang.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleExportBackupJSON}
            className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-md cursor-pointer transition-all active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Zaxira Nusxani Yuklab Olish (JSON Backup)</span>
          </button>

          <label className="bg-[#18120d] hover:bg-[#281e15] text-amber-300 border border-amber-500/30 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 cursor-pointer transition-all">
            <Upload className="w-4 h-4" />
            <span>JSON Nusxani Qayta Yuklash (Restore)</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportBackupJSON}
              className="hidden"
            />
          </label>

          <button
            onClick={handleConfirmReset}
            className="bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-500/30 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 cursor-pointer transition-all ml-auto"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Boshlang'ich Holatga Qaytarish (Reset)</span>
          </button>
        </div>
      </div>

    </div>
  );
};
