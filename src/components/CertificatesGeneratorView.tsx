import React, { useState, useRef } from 'react';
import { 
  Award, 
  Printer, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  QrCode, 
  Users, 
  User, 
  Trophy, 
  FileText,
  Calendar,
  Layers,
  RotateCcw
} from 'lucide-react';
import { Team, Player, Tournament, SchoolInfo } from '../types';

interface CertificatesGeneratorViewProps {
  teams?: Team[];
  players?: Player[];
  tournaments?: Tournament[];
  schoolInfo?: SchoolInfo;
}

export const CertificatesGeneratorView: React.FC<CertificatesGeneratorViewProps> = ({
  teams = [],
  players = [],
  tournaments = [],
  schoolInfo = {} as SchoolInfo
}) => {
  const [certType, setCertType] = useState<'1st_place' | '2nd_place' | '3rd_place' | 'best_player' | 'best_captain' | 'active_participant'>('1st_place');
  const [recipientType, setRecipientType] = useState<'team' | 'player' | 'custom'>('team');
  const [recipientName, setRecipientName] = useState(teams[0]?.name || 'Lochinlar');
  const [classGrade, setClassGrade] = useState('11-A sinf');
  const [tournamentTitle, setTournamentTitle] = useState(tournaments[0]?.title || '44-Maktab "Bahorgi Zakovat Chempionati - 2026"');
  const [coordinatorName, setCoordinatorName] = useState(schoolInfo?.coordinatorName || "Bahriddinov O'ktam Hikmatovich");
  const [certDate, setCertDate] = useState(new Date().toLocaleDateString('uz-UZ'));
  const [certNumber, setCertNumber] = useState(`ZK44-${Math.floor(1000 + Math.random() * 9000)}`);
  const [customSubtitle, setCustomSubtitle] = useState('');

  const certificateRef = useRef<HTMLDivElement>(null);

  // Auto-populate when selecting team or player
  const handleSelectTeam = (tName: string) => {
    const t = teams.find((item) => item.name === tName);
    if (t) {
      setRecipientName(t.name);
      setClassGrade(t.classGrade);
    }
  };

  const handleSelectPlayer = (pName: string) => {
    const p = players.find((item) => item.fullName === pName);
    if (p) {
      setRecipientName(p.fullName);
      setClassGrade(`${p.teamName} jamoasi, ${p.classGrade}`);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getTitleAndText = () => {
    switch (certType) {
      case '1st_place':
        return {
          title: 'I DARAJALI DIPLOM',
          subtitle: 'Mantiqiy teranlik va yuksak bilim namoyishi uchun',
          description: `Maktabimizda o'tkazilgan "${tournamentTitle}" intellektual o'yinlarida barcha raqiblarini mantiqiy jihatdan yengib, faxrli 1-O'RINNI egallaganligi munosabati bilan taqdirlanadi.`,
          badge: '1-O\'RIN G\'OLIBI'
        };
      case '2nd_place':
        return {
          title: 'II DARAJALI DIPLOM',
          subtitle: 'Yuksak intellektual salohiyat va faollik uchun',
          description: `"${tournamentTitle}" turnirida yuksak jamoaviy birdamlik va zukkolik ko'rsatib, faxrli 2-O'RINNI qo'lga kiritganligi munosabati bilan taqdirlanadi.`,
          badge: '2-O\'RIN SOVRINDORI'
        };
      case '3rd_place':
        return {
          title: 'III DARAJALI DIPLOM',
          subtitle: 'Qat\'iyatli bilim va iroda uchun',
          description: `"${tournamentTitle}" intellektual bellashuvida munosib ishtirok etib, faxrli 3-O'RINNI egallaganligi munosabati bilan taqdirlanadi.`,
          badge: '3-O\'RIN SOVRINDORI'
        };
      case 'best_player':
        return {
          title: 'FAXRIY YORLIQ',
          subtitle: 'Mavsumning Eng Yaxshi Bilimdoni',
          description: `Zakovat klubi faoliyatida o'zining tezkor mantiqiy fikrlashi, eng ko'p to'g'ri javoblari va individual mahorati bilan tengdoshlariga o'rnak bo'lganligi uchun taqdirlanadi.`,
          badge: 'ENG YAXSHI BILIMDON'
        };
      case 'best_captain':
        return {
          title: 'FAXRIY YORLIQ',
          subtitle: 'Mavsumning Eng Faol va Yetakchi Kapitani',
          description: `Jamoani mohirona boshqargani, muhokama paytida to'g'ri strategik qarorlar qabul qilgani va klub rivojiga qo'shgan hissasi uchun taqdirlanadi.`,
          badge: 'ENG FAOL KAPITAN'
        };
      case 'active_participant':
      default:
        return {
          title: 'SERTIFIKAT',
          subtitle: 'Faol Ishtirok va Intellektual Tashabbus',
          description: `"${tournamentTitle}"da munosib qatnashgani, tafakkur va ilmga bo'lgan intilishi uchun taqdim etiladi.`,
          badge: 'FAOL ISHTIROKCHI'
        };
    }
  };

  const currentMeta = getTitleAndText();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8" id="certificates-generator">
      
      {/* Header Info Box */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#1e1711] border border-amber-500/30 p-6 rounded-3xl shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-amber-300 flex items-center gap-2">
              AVTOMATIK DIPLOM VA FAXRIY YORLIQLAR GENERATORI
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/70">
              44-Maktab ramzi, QR-tasdiq kodi va rasmiy koordinator imzosi bilan bir bosishda chop etish yoki saqlash
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center space-x-2 shadow-lg shadow-amber-500/30 cursor-pointer active:scale-95 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Chop Etish / PDF Saqlash</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Control Panel + Live Certificate Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form Settings (4 cols) */}
        <div className="lg:col-span-4 space-y-5 bg-[#18120d] border border-amber-500/30 p-5 sm:p-6 rounded-3xl shadow-xl">
          <h3 className="font-extrabold text-amber-300 text-base flex items-center gap-2 border-b border-amber-500/20 pb-3">
            <Layers className="w-4 h-4 text-amber-400" />
            Diplom Ma'lumotlarini Sozlash
          </h3>

          {/* Certificate Type */}
          <div>
            <label className="block text-xs font-bold text-amber-300 mb-1.5">
              Hujjat Toifasi:
            </label>
            <select
              value={certType}
              onChange={(e) => setCertType(e.target.value as any)}
              className="w-full bg-[#120d09] text-amber-100 text-xs rounded-xl p-3 border border-amber-500/30 focus:border-amber-400 focus:outline-none"
            >
              <option value="1st_place">🥇 1-O'rin G'olibi (I Darajali Diplom)</option>
              <option value="2nd_place">🥈 2-O'rin G'olibi (II Darajali Diplom)</option>
              <option value="3rd_place">🥉 3-O'rin G'olibi (III Darajali Diplom)</option>
              <option value="best_player">⭐ Mavsumning Eng Yaxshi Bilimdoni (Faxriy Yorliq)</option>
              <option value="best_captain">👑 Eng Faol Kapitan (Faxriy Yorliq)</option>
              <option value="active_participant">📜 Faol Ishtirokchi (Sertifikat)</option>
            </select>
          </div>

          {/* Quick Winner / Recipient Selector */}
          <div>
            <label className="block text-xs font-bold text-amber-300 mb-1.5">
              Tezkor Tanlash (Jamoalar va Bilimdonlar):
            </label>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <button
                type="button"
                onClick={() => setRecipientType('team')}
                className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                  recipientType === 'team'
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-[#241d16] text-amber-200 hover:bg-[#2d241c]'
                }`}
              >
                Jamoalar
              </button>
              <button
                type="button"
                onClick={() => setRecipientType('player')}
                className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                  recipientType === 'player'
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-[#241d16] text-amber-200 hover:bg-[#2d241c]'
                }`}
              >
                Bilimdonlar
              </button>
            </div>

            {recipientType === 'team' ? (
              <select
                onChange={(e) => handleSelectTeam(e.target.value)}
                className="w-full bg-[#120d09] text-amber-100 text-xs rounded-xl p-2.5 border border-amber-500/30 mb-2"
              >
                <option value="">Jamoani tanlang...</option>
                {teams.map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name} ({t.classGrade})
                  </option>
                ))}
              </select>
            ) : (
              <select
                onChange={(e) => handleSelectPlayer(e.target.value)}
                className="w-full bg-[#120d09] text-amber-100 text-xs rounded-xl p-2.5 border border-amber-500/30 mb-2"
              >
                <option value="">Bilimdonni tanlang...</option>
                {players.map((p) => (
                  <option key={p.id} value={p.fullName}>
                    {p.fullName} ({p.teamName})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Recipient Name Input */}
          <div>
            <label className="block text-xs font-bold text-amber-300 mb-1.5">
              Mukofotlanuvchi Nomi / Jamoa:
            </label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="w-full bg-[#120d09] text-amber-100 text-sm font-bold rounded-xl p-2.5 border border-amber-500/30"
              placeholder="Masalan: Lochinlar jamoasi yoki Sardorbek Ergashev"
            />
          </div>

          {/* Class Grade */}
          <div>
            <label className="block text-xs font-bold text-amber-300 mb-1.5">
              Sinfi / Qo'shimcha Izoh:
            </label>
            <input
              type="text"
              value={classGrade}
              onChange={(e) => setClassGrade(e.target.value)}
              className="w-full bg-[#120d09] text-amber-100 text-xs rounded-xl p-2.5 border border-amber-500/30"
              placeholder="11-A sinf"
            />
          </div>

          {/* Tournament Selection */}
          <div>
            <label className="block text-xs font-bold text-amber-300 mb-1.5">
              Turnir / Musobaqa Nomi:
            </label>
            <input
              type="text"
              value={tournamentTitle}
              onChange={(e) => setTournamentTitle(e.target.value)}
              className="w-full bg-[#120d09] text-amber-100 text-xs rounded-xl p-2.5 border border-amber-500/30"
            />
          </div>

          {/* Coordinator & Date */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-amber-300 mb-1.5">
                Sana:
              </label>
              <input
                type="text"
                value={certDate}
                onChange={(e) => setCertDate(e.target.value)}
                className="w-full bg-[#120d09] text-amber-100 text-xs rounded-xl p-2.5 border border-amber-500/30"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-amber-300 mb-1.5">
                Raqam:
              </label>
              <input
                type="text"
                value={certNumber}
                onChange={(e) => setCertNumber(e.target.value)}
                className="w-full bg-[#120d09] text-amber-100 text-xs rounded-xl p-2.5 border border-amber-500/30 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-amber-300 mb-1.5">
              Mas'ul Koordinator:
            </label>
            <input
              type="text"
              value={coordinatorName}
              onChange={(e) => setCoordinatorName(e.target.value)}
              className="w-full bg-[#120d09] text-amber-100 text-xs rounded-xl p-2.5 border border-amber-500/30"
            />
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setCertNumber(`ZK44-${Math.floor(1000 + Math.random() * 9000)}`);
              }}
              className="w-full py-2 rounded-xl bg-[#241d16] hover:bg-[#2e241c] text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Yangi QR va Raqam Generatsiya Qilish</span>
            </button>
          </div>
        </div>

        {/* Right Column: High-Res Diploma Preview (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between text-xs text-amber-200/70 px-2">
            <span>Jonli Vizual Ko'rinish (A4 Format):</span>
            <span>Chop etganda maxsus oq fon va tillarang hoshiyada chiqadi</span>
          </div>

          {/* The Physical Printable Certificate Wrapper */}
          <div 
            ref={certificateRef}
            id="printable-certificate"
            className="w-full bg-[#fffdf9] text-slate-900 rounded-2xl shadow-2xl p-6 sm:p-10 border-8 border-[#d4af37] relative overflow-hidden flex flex-col justify-between aspect-[1.414/1] min-h-[520px]"
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 80%)'
            }}
          >
            {/* Guilloche Ornamental Corner Accents */}
            <div className="absolute top-2 left-2 w-12 h-12 border-t-4 border-l-4 border-[#b8860b] pointer-events-none" />
            <div className="absolute top-2 right-2 w-12 h-12 border-t-4 border-r-4 border-[#b8860b] pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-12 h-12 border-b-4 border-l-4 border-[#b8860b] pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-12 h-12 border-b-4 border-r-4 border-[#b8860b] pointer-events-none" />
            
            {/* Inner Gold Thin Border */}
            <div className="absolute inset-3 border border-[#b8860b]/40 pointer-events-none rounded-sm" />

            {/* Header: School Emblem & Official Heading */}
            <div className="text-center relative z-10 space-y-1">
              <div className="flex items-center justify-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#120d09] border-2 border-[#b8860b] flex items-center justify-center text-[#d4af37] shadow">
                  <span className="font-extrabold text-xs">44</span>
                </div>
              </div>
              <p className="text-[11px] sm:text-xs font-serif uppercase tracking-widest text-[#8c6d1f] font-bold">
                O'ZBEKISTON RESPUBLIKASI MAKTABGACHA VA MAKTAB TA'LIMI VAZIRLIGI
              </p>
              <p className="text-xs sm:text-sm font-serif font-bold text-slate-800 tracking-wide uppercase">
                44-SONLI UMUMIY O'RTA TA'LIM MAKTABI ZAKOVAT INTELLEKTUAL KLUBI
              </p>
            </div>

            {/* Central Certificate Title & Badge */}
            <div className="text-center relative z-10 my-4 sm:my-6 space-y-2">
              <div className="inline-block px-5 py-1 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] text-slate-950 font-serif font-black text-sm sm:text-base uppercase tracking-widest shadow-sm">
                {currentMeta.badge}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-[#8c6d1f] drop-shadow-sm uppercase">
                {currentMeta.title}
              </h1>

              <p className="text-xs sm:text-sm font-serif italic text-slate-600 font-medium max-w-lg mx-auto">
                {currentMeta.subtitle}
              </p>
            </div>

            {/* Recipient Details & Congratulations */}
            <div className="text-center relative z-10 space-y-3 max-w-2xl mx-auto">
              <p className="text-xs sm:text-sm text-slate-600 uppercase font-sans tracking-wider">
                Ushbu diplom munosib ravishda taqdim etiladi:
              </p>
              <div className="border-b-2 border-[#b8860b] pb-1 inline-block min-w-[280px]">
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900">
                  {recipientName}
                </h2>
              </div>
              {classGrade && (
                <p className="text-xs sm:text-sm font-semibold text-[#8c6d1f]">
                  ({classGrade})
                </p>
              )}
              <p className="text-xs sm:text-sm font-serif text-slate-700 leading-relaxed pt-1">
                {currentMeta.description}
              </p>
            </div>

            {/* Footer: Date, QR Stamp & Coordinator Signature */}
            <div className="relative z-10 pt-6 mt-4 border-t border-[#d4af37]/40 flex items-end justify-between gap-4 text-xs">
              
              {/* Left Date & Cert Number */}
              <div className="space-y-1 text-slate-700">
                <p className="font-semibold">Sana: <span className="font-serif">{certDate}</span></p>
                <p className="text-[10px] text-slate-500 font-mono">Qayd raqami: {certNumber}</p>
                <div className="flex items-center gap-1.5 text-[9px] text-[#8c6d1f]">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Rasmiy Maktab Reyestri Tasdiqlangan</span>
                </div>
              </div>

              {/* Center QR Verification Stamp */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 p-1 bg-white border-2 border-[#b8860b] rounded-lg shadow-sm flex flex-col items-center justify-center">
                  <QrCode className="w-full h-full text-slate-900" />
                </div>
                <span className="text-[8.5px] text-slate-500 mt-1 font-mono">QR Tekshiruv</span>
              </div>

              {/* Right Signature & Seal */}
              <div className="text-right space-y-1 text-slate-800">
                <p className="text-[11px] font-bold text-[#8c6d1f]">Klub Koordinatori:</p>
                <div className="font-serif font-bold text-xs sm:text-sm text-slate-900 border-b border-slate-400 pb-0.5 inline-block">
                  {coordinatorName}
                </div>
                <div className="text-[9.5px] text-slate-500 italic">
                  (Imzo va 44-maktab muhri o'rni)
                </div>
              </div>

            </div>

          </div>

          <div className="text-center text-xs text-amber-300/80">
            💡 Maslahat: Yuqoridagi "Chop Etish / PDF Saqlash" tugmasini bosib, to'g'ridan-to'g'ri rangli printerda yoki PDF formatida yuklab olishingiz mumkin.
          </div>
        </div>

      </div>

    </div>
  );
};
