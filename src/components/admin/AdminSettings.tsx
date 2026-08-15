import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Save, 
  Download, 
  Upload, 
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Trash2,
  AlertOctagon,
  X,
  FileSpreadsheet
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

interface AdminSettingsProps {
  adminCredentials: { username: string; password: string };
  schoolInfo: SchoolInfo;
  teams: Team[];
  players: Player[];
  tournaments: Tournament[];
  questions: Question[];
  news: NewsArticle[];
  gallery: GalleryMedia[];
  registrations: TeamRegistration[];
  questionPackages: QuestionPackage[];
  onUpdateAdminCredentials: (cred: { username: string; password: string }) => void;
  onRestoreAllData: (data: any) => void;
  onResetToDefaults: () => void;
  onWipeAllData?: () => void;
  showToast: (msg: string) => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({
  adminCredentials,
  schoolInfo,
  teams,
  players,
  tournaments,
  questions,
  news,
  gallery,
  registrations,
  questionPackages,
  onUpdateAdminCredentials,
  onRestoreAllData,
  onResetToDefaults,
  onWipeAllData,
  showToast
}) => {
  const [username, setUsername] = useState(adminCredentials.username || 'admin');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Wipe All Data Confirmation Modal State
  const [isWipeModalOpen, setIsWipeModalOpen] = useState(false);
  const [wipeAgreed, setWipeAgreed] = useState(false);
  const [wipeConfirmText, setWipeConfirmText] = useState('');

  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) {
      alert("Foydalanuvchi nomini kiriting!");
      return;
    }
    if (newPassword && newPassword !== confirmPassword) {
      alert("Yangi parollar bir-biriga mos kelmadi!");
      return;
    }

    onUpdateAdminCredentials({
      username,
      password: newPassword || adminCredentials.password
    });
    setNewPassword('');
    setConfirmPassword('');
    showToast("Admin login va paroli muvaffaqiyatli yangilandi!");
  };

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
    a.download = `zakovat44_full_database_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Saytning to'liq ma'lumotlar bazasi (JSON) yuklab olindi!");
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
    if (confirm("DIQQAT: Barcha kiritilgan ma'lumotlar dastlabki (namunaviy) holatiga qaytariladi. Davom etasizmi?")) {
      onResetToDefaults();
      showToast("Barcha ma'lumotlar dastlabki namunaviy holatga qaytarildi!");
    }
  };

  const handleExecuteWipe = () => {
    if (!wipeAgreed) {
      alert("Iltimos, avval rozilik katakchasini belgilang!");
      return;
    }
    if (onWipeAllData) {
      onWipeAllData();
    }
    setIsWipeModalOpen(false);
    setWipeAgreed(false);
    setWipeConfirmText('');
    showToast("Sayt barcha ma'lumotlardan to'liq tozalandi! Barcha ro'yxatlar bo'shatildi.");
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans text-amber-50">
      
      {/* Header */}
      <div className="border-b border-amber-500/20 pb-4">
        <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
          <ShieldCheck className="w-4 h-4" />
          <span>Xavfsizlik, Zaxiralash va Saytni Tozalash</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-amber-50 font-serif">
          ADMIN SOZLAMALARI VA MA'LUMOTLAR BOSHQARUVI
        </h2>
        <p className="text-xs text-amber-200/70 mt-0.5">
          Admin hisob ma'lumotlarini boshqarish, to'liq zaxira nusxa (JSON) olish hamda saytni tozalash (bo'shatish).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Admin Credentials Change */}
        <div className="bg-[#211a13]/90 border border-amber-500/30 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl backdrop-blur-md">
          <h3 className="text-sm font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <Lock className="w-4 h-4" />
            <span>Admin Login va Parolini O'zgartirish</span>
          </h3>

          <form onSubmit={handleSaveCredentials} className="space-y-3">
            <div>
              <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Login (Foydalanuvchi Nomi)</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Yangi Parol (O'zgartirishni istasangiz yozing)</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Yangi parol..."
                className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Yangi Parolni Qayta Kiriting</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Yangi parolni takrorlang..."
                className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 cursor-pointer shadow-md mt-2 transition-all active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Login va Parolni Saqlash</span>
            </button>
          </form>
        </div>

        {/* Backup & Restore JSON */}
        <div className="bg-[#211a13]/90 border border-amber-500/30 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl backdrop-blur-md flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span>Sayt Ma'lumotlarini Zaxiralash (Full Backup / Restore)</span>
            </h3>
            <p className="text-xs text-amber-200/80 leading-relaxed mt-2">
              Saytda mavjud bo'lgan barcha jamoalar, reytinglar, Word to'plamlari, turnirlar, yangiliklar va fotolarni xavfsiz JSON fayl ko'rinishida yuklab oling. Keyinchalik ushbu fayl orqali barcha ma'lumotlarni 1 soniyada tiklashingiz mumkin.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-amber-500/15">
            <button
              onClick={handleExportBackupJSON}
              className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-md cursor-pointer transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Zaxira Nusxa Yuklab Olish (JSON)</span>
            </button>

            <label className="bg-[#18120d] hover:bg-[#281e15] text-amber-300 border border-amber-500/30 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 cursor-pointer transition-all">
              <Upload className="w-4 h-4" />
              <span>JSON Nusxadan Tiklash</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportBackupJSON}
                className="hidden"
              />
            </label>
          </div>
        </div>

      </div>

      {/* System Cleaning & Reset Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        
        {/* NEW FEATURE: Saytni Butunlay Tozalash (Pustoy holatga keltirish) */}
        <div className="bg-gradient-to-br from-red-950/70 via-[#200c0c] to-[#160808] border-2 border-red-500/50 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xl relative overflow-hidden">
          <div className="flex items-center space-x-2.5 text-red-400">
            <div className="w-8 h-8 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center">
              <Trash2 className="w-4 h-4 text-red-400" />
            </div>
            <div>
              <h3 className="text-sm font-black text-red-300 uppercase tracking-wider">
                Saytni To'liq Tozalash (Pustoy / Bo'shatish)
              </h3>
              <p className="text-[11px] text-red-300/70">Barcha kiritilgan ma'lumotlarni 100% o'chirish</p>
            </div>
          </div>

          <p className="text-xs text-red-200/90 leading-relaxed">
            Ushbu funksiya saytdagi <strong>barcha jamoalar, bilimdonlar, turnirlar, savollar, Word paketlari, yangiliklar, galereya va arizalarni butunlay o'chiradi</strong> va saytni mutlaqo toza (bo'sh) holatga keltiradi.
          </p>

          <div className="bg-red-950/80 border border-red-500/30 rounded-xl p-3 text-[11px] text-red-200/90 flex items-start gap-2">
            <AlertOctagon className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>
              Amalga oshirishdan oldin ogohlantirish oynasi chiqadi va sizning tasdig'ingiz talab qilinadi.
            </span>
          </div>

          <button
            onClick={() => {
              setWipeAgreed(false);
              setWipeConfirmText('');
              setIsWipeModalOpen(true);
            }}
            className="w-full bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-black py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg shadow-red-900/40 cursor-pointer transition-all active:scale-95"
          >
            <Trash2 className="w-4 h-4" />
            <span>SAYTNI TO'LIQ TOZALASH (HAMMASINI O'CHIRISH)</span>
          </button>
        </div>

        {/* Reset to Demo Defaults */}
        <div className="bg-[#211a13]/90 border border-amber-500/30 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl backdrop-blur-md">
          <div className="flex items-center space-x-2.5 text-amber-400">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
              <RotateCcw className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-black text-amber-300 uppercase tracking-wider">
                Namunaviy Holatga Qaytarish (Reset to Defaults)
              </h3>
              <p className="text-[11px] text-amber-300/70">Dastlabki 44-maktab test ma'lumotlarini tiklash</p>
            </div>
          </div>

          <p className="text-xs text-amber-200/80 leading-relaxed">
            Agar sinovlar o'tkazib bo'lingach yoki tizimni namunaviy ma'lumotlar (namunaviy jamoalar, turnirlar va savollar) bilan to'ldirmoqchi bo'lsangiz, ushbu tugmani bosing.
          </p>

          <div className="pt-3">
            <button
              onClick={handleConfirmReset}
              className="bg-[#18120d] hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 cursor-pointer transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span>Dastlabki Namunaviy Ma'lumotlarni Tiklash</span>
            </button>
          </div>
        </div>

      </div>

      {/* Confirmation Modal for Wiping All Data */}
      {isWipeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#1a0f0f] border-2 border-red-500/60 rounded-2xl max-w-lg w-full p-6 space-y-5 text-amber-50 shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-red-500/30 pb-3">
              <div className="flex items-center space-x-2.5 text-red-400">
                <AlertOctagon className="w-6 h-6 text-red-500 animate-pulse" />
                <h3 className="text-base sm:text-lg font-black font-serif uppercase tracking-tight text-red-200">
                  DIQQAT: SAYTNI TO'LIQ TOZALASH!
                </h3>
              </div>
              <button
                onClick={() => setIsWipeModalOpen(false)}
                className="text-red-400 hover:text-white p-1 rounded-lg hover:bg-red-500/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Warning Message Body */}
            <div className="space-y-3 text-xs text-red-200/90 leading-relaxed bg-red-950/40 p-4 rounded-xl border border-red-500/30">
              <p className="font-bold text-red-100 text-sm">
                Siz haqiqatdan ham saytdagi barcha ma'lumotlarni butunlay o'chirib, saytni bo'shatmoqchimisiz?
              </p>
              <p>
                Ushbu amal bajarilgach quyidagi barcha ma'lumotlar o'chiriladi:
              </p>
              <ul className="list-disc list-inside space-y-1 text-red-300 font-medium pl-1">
                <li>Barcha ro'yxatdan o'tgan Jamoalar va Bilimdonlar</li>
                <li>Barcha Turnirlar, jadvallar va o'yin natijalari</li>
                <li>Barcha Viktorina savollari va Ochiq Word paketlari</li>
                <li>Barcha Yangiliklar, E'lonlar va Fotogalereya</li>
                <li>Barcha kutayotgan jamoa Arizalari</li>
              </ul>
              <p className="text-[11px] text-amber-300/80 pt-1">
                💡 Maslahat: Agar ushbu ma'lumotlar kerak bo'lsa, avval "Zaxira Nusxa Yuklab Olish (JSON)" tugmasini bosgan holda faylni saqlab oling.
              </p>
            </div>

            {/* Agreement Checkbox */}
            <label className="flex items-start space-x-3 cursor-pointer select-none bg-[#241010] p-3 rounded-xl border border-red-500/30">
              <input
                type="checkbox"
                checked={wipeAgreed}
                onChange={(e) => setWipeAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-red-600 focus:ring-red-500 bg-black/50 border-red-500/40"
              />
              <span className="text-xs text-red-100 font-medium">
                Men saytdagi barcha ma'lumotlar to'liq o'chib ketishini tushundim va saytni bo'sh (pustoy) holatga keltirishga <strong>roziman</strong>.
              </span>
            </label>

            {/* Modal Actions */}
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setIsWipeModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Bekor qilish
              </button>

              <button
                type="button"
                disabled={!wipeAgreed}
                onClick={handleExecuteWipe}
                className={`px-5 py-2.5 rounded-xl text-xs font-black flex items-center space-x-2 shadow-lg transition-all ${
                  wipeAgreed
                    ? 'bg-red-600 hover:bg-red-500 text-white cursor-pointer shadow-red-900/50 active:scale-95'
                    : 'bg-red-950/60 text-red-400/40 border border-red-500/20 cursor-not-allowed'
                }`}
              >
                <Trash2 className="w-4 h-4" />
                <span>HA, BARCHASINI O'CHIRISH VA BO'SHATISH</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
