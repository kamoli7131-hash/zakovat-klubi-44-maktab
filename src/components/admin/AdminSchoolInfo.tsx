import React, { useState } from 'react';
import { 
  School, 
  Save, 
  HelpCircle, 
  Plus, 
  Edit3, 
  Trash2, 
  Phone, 
  Mail, 
  Send, 
  Sparkles,
  BookOpen,
  MapPin,
  Clock,
  User,
  Eye,
  CheckCircle2,
  X,
  Globe,
  Youtube
} from 'lucide-react';
import { SchoolInfo } from '../../types';

interface AdminSchoolInfoProps {
  schoolInfo: SchoolInfo;
  onUpdateSchoolInfo: (info: SchoolInfo) => void;
  showToast: (msg: string) => void;
}

export const AdminSchoolInfo: React.FC<AdminSchoolInfoProps> = ({
  schoolInfo,
  onUpdateSchoolInfo,
  showToast
}) => {
  const [formState, setFormState] = useState<SchoolInfo>({ ...schoolInfo });
  const [showLivePreview, setShowLivePreview] = useState(true);
  
  // FAQ Modal state
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [editingFaqIdx, setEditingFaqIdx] = useState<number | null>(null);
  const [faqForm, setFaqForm] = useState<{ question: string; answer: string }>({
    question: '',
    answer: ''
  });

  const handleSaveMainInfo = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSchoolInfo(formState);
    showToast("Header, Footer va Maktab ma'lumotlari muvaffaqiyatli saqlandi!");
  };

  // FAQ CRUD
  const handleOpenAddFaq = () => {
    setEditingFaqIdx(null);
    setFaqForm({ question: '', answer: '' });
    setIsFaqModalOpen(true);
  };

  const handleOpenEditFaq = (idx: number) => {
    const item = (formState.faqList || (formState as any).faq || [])[idx];
    if (item) {
      setEditingFaqIdx(idx);
      setFaqForm({ ...item });
      setIsFaqModalOpen(true);
    }
  };

  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqForm.question || !faqForm.answer) {
      alert("Savol va javobni to'liq kiriting!");
      return;
    }

    const currentFaqs = [...(formState.faqList || (formState as any).faq || [])];
    if (editingFaqIdx !== null) {
      currentFaqs[editingFaqIdx] = faqForm;
      showToast("FAQ savoli muvaffaqiyatli yangilandi!");
    } else {
      currentFaqs.push(faqForm);
      showToast("Yangi FAQ savol-javobi qo'shildi!");
    }

    const updated = {
      ...formState,
      faqList: currentFaqs
    };

    setFormState(updated);
    onUpdateSchoolInfo(updated);
    setIsFaqModalOpen(false);
  };

  const handleDeleteFaq = (idx: number) => {
    if (confirm("Ushbu FAQ savol-javobini o'chirmoqchimisiz?")) {
      const currentFaqs = [...(formState.faqList || (formState as any).faq || [])];
      currentFaqs.splice(idx, 1);
      const updated = {
        ...formState,
        faqList: currentFaqs
      };
      setFormState(updated);
      onUpdateSchoolInfo(updated);
      showToast("FAQ savoli o'chirildi.");
    }
  };

  const currentFaqList = formState.faqList || (formState as any).faq || [];

  return (
    <div className="space-y-6 animate-fadeIn font-sans text-amber-50">
      
      {/* Top Header & Save Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <School className="w-4 h-4" />
            <span>Sayt Boshqaruvi & Maktab Sozlamalari</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-amber-50 font-serif">
            HEADER, FOOTER VA MAKTAB MA'LUMOTLARI
          </h2>
          <p className="text-xs text-amber-200/70 mt-0.5">
            Saytning yuqori (Header), pastki (Footer) qismlari, telefon, email, manzil, shior va boshqa barcha ma'lumotlarni tahrirlang.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowLivePreview(!showLivePreview)}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-[#1e1711] border border-amber-500/30 text-amber-300 hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>{showLivePreview ? "Jonli ko'rinishni yopish" : "Jonli ko'rinishni ochish"}</span>
          </button>

          <button
            type="button"
            onClick={handleSaveMainInfo}
            className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 flex items-center space-x-2 transition-all active:scale-95 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>O'zgarishlarni Saqlash</span>
          </button>
        </div>
      </div>

      {/* Live Interactive Preview Box */}
      {showLivePreview && (
        <div className="bg-[#18120d] border-2 border-amber-500/40 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
              <Eye className="w-4 h-4" />
              <span>JONLI KO'RINISH (PREVIEW) — SAYTDA QANDAY AKSETISHI</span>
            </div>
            <span className="text-[10px] text-amber-300/60">Kiritilgan ma'lumotlar real vaqtda yangilanadi</span>
          </div>

          {/* 1. Header Preview */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
              <span>🔺 1. Header (Yuqori Qism) Ko'rinishi:</span>
            </span>

            {/* Top Bar Preview */}
            <div className="bg-[#120e0a] border border-amber-500/30 rounded-t-xl px-3 py-1.5 text-[11px] flex flex-wrap items-center justify-between gap-2 text-amber-200/80">
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1 text-amber-300 font-medium">
                  <Mail className="w-3 h-3 text-amber-400" />
                  <span>{formState.email || "Email kiritilmagan"}</span>
                </span>
                <span className="flex items-center gap-1 text-amber-300 font-medium">
                  <Phone className="w-3 h-3 text-amber-400" />
                  <span>{formState.phone || "Telefon kiritilmagan"}</span>
                </span>
                {formState.telegramChannel && (
                  <span className="flex items-center gap-1 text-sky-400 font-bold">
                    <Send className="w-3 h-3" />
                    <span>{formState.telegramChannel}</span>
                  </span>
                )}
                {formState.headerAnnouncement && (
                  <span className="flex items-center gap-1 text-amber-300 font-semibold bg-amber-500/10 px-2 py-0.5 rounded">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>{formState.headerAnnouncement}</span>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-[10px] text-amber-200/60">
                <span>Ochiq savollar</span>
                <span>•</span>
                <span>Biz haqimizda</span>
                <span>•</span>
                <span className="text-amber-400 font-bold">Admin Panel</span>
              </div>
            </div>

            {/* Main Header Brand Preview */}
            <div className="bg-[#1c1611] border border-amber-500/30 rounded-b-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-xs shadow-md">
                  {formState.schoolNumber || '44'}
                </div>
                <div>
                  <h4 className="text-sm font-black text-amber-50 uppercase tracking-tight">
                    {formState.schoolNumber || '44'}-MAKTAB <span className="text-amber-400">{formState.clubName || 'ZAKOVAT INTELLEKTUAL KLUBI'}</span>
                  </h4>
                  <p className="text-[10.5px] text-amber-200/70">
                    {formState.motto || "Bilim — kuchda emas, mantiqda va birdamlikda!"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Footer Preview */}
          <div className="space-y-2 pt-2 border-t border-amber-500/20">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
              <span>🔻 2. Footer (Saytning Pastki Qismi) Ko'rinishi:</span>
            </span>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-400 text-xs space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="text-amber-400 font-black uppercase text-xs">
                    {formState.schoolNumber || '44'}-MAKTAB {formState.clubName || 'ZAKOVAT KLUBI'}
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    {formState.footerDescription || "Maktab Zakovat intellektual klubi rasmiy portali..."}
                  </p>
                  {formState.telegramChannel && (
                    <div className="text-sky-400 text-[11px] font-bold flex items-center gap-1">
                      <Send className="w-3 h-3" />
                      <span>Telegram: {formState.telegramChannel}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1 text-[11px]">
                  <div className="text-white font-bold mb-1">Bo'limlar</div>
                  <div>• Bosh sahifa</div>
                  <div>• Proyektor / Akt Zali</div>
                  <div>• Kun Savoli & Tezkor Duel</div>
                  <div>• Turnirlar & Savollar Bazasi</div>
                </div>

                <div className="space-y-1.5 text-[11px] text-slate-300">
                  <div className="text-white font-bold mb-1">Bog'lanish</div>
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{formState.address || "Manzil kiritilmagan"}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{formState.phone || "Telefon kiritilmagan"}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{formState.email || "Email kiritilmagan"}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-900 text-[10.5px] text-slate-500">
                {formState.footerCopyright || `© 2026 ${formState.schoolNumber || '44'}-Sonli Maktab Zakovat Klubi. Barcha huquqlar himoyalangan.`}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Edit Form */}
      <form onSubmit={handleSaveMainInfo} className="space-y-6">
        
        {/* SECTION 1: HEADER SOZLAMALARI */}
        <div className="bg-[#211a13]/90 border border-amber-500/30 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
            <h3 className="text-sm font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <School className="w-4 h-4" />
              <span>1. Header (Yuqori Qism) va Asosiy Brend Sozlamalari</span>
            </h3>
            <span className="text-[10px] text-amber-300/70 font-semibold">Sayt yuqorisidagi brend va logotip</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">
                Maktab Raqami <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formState.schoolNumber || ''}
                onChange={(e) => setFormState({ ...formState, schoolNumber: e.target.value })}
                placeholder="44"
                className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400 font-bold"
              />
              <span className="text-[9.5px] text-amber-200/50 mt-0.5 block">Logotip markazida va matnda aks etadi</span>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">
                Maktab To'liq Nomi <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formState.schoolName || ''}
                onChange={(e) => setFormState({ ...formState, schoolName: e.target.value })}
                placeholder="44-sonli umumiy o'rta ta'lim maktabi"
                className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">
                Zakovat Klubi Nomi <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formState.clubName || ''}
                onChange={(e) => setFormState({ ...formState, clubName: e.target.value })}
                placeholder="Zakovat Intellektual Klubi"
                className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400 font-bold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">
                Klub Shiari (Motto)
              </label>
              <input
                type="text"
                value={formState.motto || ''}
                onChange={(e) => setFormState({ ...formState, motto: e.target.value })}
                placeholder="Bilim — kuchda emas, mantiqda va birdamlikda!"
                className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Optional Announcement */}
          <div className="pt-3 border-t border-amber-500/15 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Header Tepasidagi Maxsus E'lon Matni (Ixtiyoriy)</span>
              </label>
              <input
                type="text"
                value={formState.headerAnnouncement || ''}
                onChange={(e) => setFormState({ ...formState, headerAnnouncement: e.target.value })}
                placeholder="Masalan: Yozgi Zakovat turniri ro'yxatdan o'tishi boshlandi!"
                className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
              />
              <span className="text-[9.5px] text-amber-200/50 mt-0.5 block">Bo'sh qoldirsangiz, yuqori satrda faqat telefon va email ko'rinadi</span>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">
                E'lon Havolasi (Link - Ixtiyoriy)
              </label>
              <input
                type="text"
                value={formState.headerAnnouncementLink || ''}
                onChange={(e) => setFormState({ ...formState, headerAnnouncementLink: e.target.value })}
                placeholder="https://t.me/zakovat44_maktab"
                className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: FOOTER SOZLAMALARI */}
        <div className="bg-[#211a13]/90 border border-amber-500/30 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
            <h3 className="text-sm font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>2. Footer (Saytning Pastki Qismi) Sozlamalari</span>
            </h3>
            <span className="text-[10px] text-amber-300/70 font-semibold">Tavsif va mualliflik huquqi matnlari</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">
                Footer Qisqacha Tavsif Matni <span className="text-red-400">*</span>
              </label>
              <textarea
                rows={2}
                value={formState.footerDescription || ''}
                onChange={(e) => setFormState({ ...formState, footerDescription: e.target.value })}
                placeholder="44-sonli umumiy o'rta ta'lim maktabi Zakovat intellektual klubi rasmiy portali. Yoshlar intellektual salohiyatini oshirish maydoni."
                className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl p-3 text-xs text-amber-50 focus:outline-none focus:border-amber-400 leading-relaxed"
              />
              <span className="text-[9.5px] text-amber-200/50 mt-0.5 block">Footerning chap qismida brend ostida ko'rinadi</span>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">
                Footer Mualliflik Huquqi (Copyright) Matni <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formState.footerCopyright || ''}
                onChange={(e) => setFormState({ ...formState, footerCopyright: e.target.value })}
                placeholder="© 2026 44-Sonli Maktab Zakovat Klubi. Barcha huquqlar himoyalangan."
                className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
              />
              <span className="text-[9.5px] text-amber-200/50 mt-0.5 block">Saytning eng quyi qismida chiqadi</span>
            </div>
          </div>
        </div>

        {/* SECTION 3: ALOQA VA BOG'LANISH (HEADER VA FOOTERDA BIRGALIKDA AKSETADI) */}
        <div className="bg-[#211a13]/90 border border-amber-500/30 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
            <h3 className="text-sm font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>3. Bog'lanish va Aloqa Ma'lumotlari (Header va Footerda aks etadi)</span>
            </h3>
            <span className="text-[10px] text-amber-300/70 font-semibold">Telefon, email, manzil va ijtimoiy tarmoqlar</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1 flex items-center gap-1">
                <Phone className="w-3 h-3 text-amber-400" />
                <span>Telefon Raqami</span>
              </label>
              <input
                type="text"
                value={formState.phone || ''}
                onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                placeholder="+998 (95) 145-09-19"
                className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1 flex items-center gap-1">
                <Mail className="w-3 h-3 text-amber-400" />
                <span>Email Manzili</span>
              </label>
              <input
                type="email"
                value={formState.email || ''}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                placeholder="malumot@zakovat.tv"
                className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1 flex items-center gap-1">
                <Send className="w-3 h-3 text-sky-400" />
                <span>Telegram Kanal / Guruh</span>
              </label>
              <input
                type="text"
                value={formState.telegramChannel || ''}
                onChange={(e) => setFormState({ ...formState, telegramChannel: e.target.value })}
                placeholder="@zakovat44_maktab"
                className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400" />
                <span>To'liq Manzil (Joylashuv)</span>
              </label>
              <input
                type="text"
                value={formState.address || ''}
                onChange={(e) => setFormState({ ...formState, address: e.target.value })}
                placeholder="Samarqand viloyati, Pastdarg'om tumani, Go'zal MFY, 44-maktab"
                className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1 flex items-center gap-1">
                <Youtube className="w-3 h-3 text-red-400" />
                <span>YouTube Kanali (Ixtiyoriy)</span>
              </label>
              <input
                type="text"
                value={formState.youtubeChannel || ''}
                onChange={(e) => setFormState({ ...formState, youtubeChannel: e.target.value })}
                placeholder="https://youtube.com/..."
                className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>

        {/* SECTION 4: KOORDINATOR VA TASHKILIY MA'LUMOTLAR */}
        <div className="bg-[#211a13]/90 border border-amber-500/30 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
            <h3 className="text-sm font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>4. Klub Koordinatori va Ish Vaqti</span>
            </h3>
            <span className="text-[10px] text-amber-300/70 font-semibold">Koordinator bo'limi ma'lumotlari</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Koordinator F.I.Sh</label>
              <input
                type="text"
                value={formState.coordinatorName || ''}
                onChange={(e) => setFormState({ ...formState, coordinatorName: e.target.value })}
                placeholder="Bahriddinov O'ktam Hikmatovich"
                className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Koordinator Telefoni</label>
              <input
                type="text"
                value={formState.coordinatorPhone || ''}
                onChange={(e) => setFormState({ ...formState, coordinatorPhone: e.target.value })}
                placeholder="+998 90 456 78 90"
                className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Ish Vaqti / Jadvali</label>
              <input
                type="text"
                value={formState.workingHours || ''}
                onChange={(e) => setFormState({ ...formState, workingHours: e.target.value })}
                placeholder="Dushanba - Shanba: 08:00 - 17:00"
                className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>

        {/* SECTION 5: KLUB TARIXI VA QOIDALARI */}
        <div className="bg-[#211a13]/90 border border-amber-500/30 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
            <h3 className="text-sm font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>5. Klub Tarixi, Maqsadi va Nizom Qoidalari</span>
            </h3>
            <span className="text-[10px] text-amber-300/70 font-semibold">"Biz haqimizda" sahifasida aks etadi</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Klub Tarixi va Faoliyati Matni</label>
              <textarea
                rows={3}
                value={formState.historyAndAbout || ''}
                onChange={(e) => setFormState({ ...formState, historyAndAbout: e.target.value })}
                placeholder="44-sonli umumiy o'rta ta'lim maktabi Zakovat Intellektual Klubi 2018-yilda tashkil etilgan..."
                className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl p-3 text-xs text-amber-50 focus:outline-none focus:border-amber-400 leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Klub O'yin Qoidalari va Nizomi</label>
              <textarea
                rows={3}
                value={formState.clubRules || ''}
                onChange={(e) => setFormState({ ...formState, clubRules: e.target.value })}
                placeholder="1. Jamoada 6 nafar bilimdon bo'ladi...&#10;2. Har bir savolga 60 soniya beriladi..."
                className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl p-3 text-xs text-amber-50 focus:outline-none focus:border-amber-400 leading-relaxed font-mono"
              />
            </div>
          </div>
        </div>

        {/* SECTION 6: FAQ SAVOL-JAVOBLARI (CRUD) */}
        <div className="bg-[#211a13]/90 border border-amber-500/30 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-3">
            <div>
              <h3 className="text-sm font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                <span>6. Ko'p Beriladigan Savol-Javoblar (FAQ Boshqaruvi)</span>
              </h3>
              <p className="text-[11px] text-amber-200/60 mt-0.5">
                O'quvchilar va kapitanlar eng ko'p so'raydigan savollarga tayyor javoblar ro'yxati ({currentFaqList.length} ta).
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenAddFaq}
              className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 hover:text-white px-3 py-1.5 rounded-xl text-xs font-bold border border-amber-500/30 flex items-center gap-1.5 cursor-pointer transition-colors self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi FAQ Savol Qo'shish</span>
            </button>
          </div>

          <div className="space-y-3">
            {currentFaqList.map((item, idx) => (
              <div 
                key={idx}
                className="bg-[#18120d] border border-amber-500/20 hover:border-amber-400/40 rounded-xl p-3.5 flex items-start justify-between gap-4 transition-all"
              >
                <div className="space-y-1 flex-1">
                  <div className="text-xs font-black text-amber-200 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    <span>{item.question}</span>
                  </div>
                  <p className="text-xs text-amber-200/70 pl-7 leading-relaxed">
                    {item.answer}
                  </p>
                </div>

                <div className="flex items-center gap-1 shrink-0 pt-0.5">
                  <button
                    type="button"
                    onClick={() => handleOpenEditFaq(idx)}
                    className="p-1.5 text-amber-400 hover:text-white hover:bg-amber-500/20 rounded-lg transition-colors cursor-pointer"
                    title="Tahrirlash"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteFaq(idx)}
                    className="p-1.5 text-red-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-colors cursor-pointer"
                    title="O'chirish"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {currentFaqList.length === 0 && (
              <div className="text-center py-6 text-xs text-amber-200/50 border border-dashed border-amber-500/20 rounded-xl">
                Hozircha hech qanday FAQ savoli mavjud emas. Yuqoridagi tugma orqali qo'shing.
              </div>
            )}
          </div>
        </div>

        {/* Bottom Floating-style Save Button */}
        <div className="sticky bottom-4 z-20 bg-[#1c1611]/95 border border-amber-500/40 p-4 rounded-2xl shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 backdrop-blur-md">
          <div className="text-xs text-amber-200/80">
            Kiritilgan barcha o'zgarishlar darhol butun sayt bo'ylab (Header, Footer, Biz haqimizda sahifalari) faollashadi.
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm px-6 py-2.5 rounded-xl shadow-lg shadow-amber-500/25 flex items-center justify-center space-x-2 transition-all active:scale-95 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>BARCHA O'ZGARISHLARNI SAQLASH</span>
          </button>
        </div>

      </form>

      {/* FAQ ADD / EDIT MODAL */}
      {isFaqModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#1e1711] border border-amber-500/30 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
              <h3 className="text-base font-black text-amber-50 font-serif flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                <span>{editingFaqIdx !== null ? "FAQ Savolini Tahrirlash" : "Yangi FAQ Savol-Javob Qo'shish"}</span>
              </h3>
              <button 
                onClick={() => setIsFaqModalOpen(false)}
                className="text-amber-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFaq} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-amber-400 uppercase mb-1">
                  Savol Matni <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={faqForm.question}
                  onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                  placeholder="Masalan: Jamoaga kimlar a'zo bo'la oladi?"
                  className="w-full bg-[#140f0b] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-400 uppercase mb-1">
                  Javob Matni <span className="text-red-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={faqForm.answer}
                  onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                  placeholder="Batafsil javobni kiriting..."
                  className="w-full bg-[#140f0b] border border-amber-500/25 rounded-xl p-3 text-xs text-amber-50 focus:outline-none focus:border-amber-400 leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFaqModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-amber-200/70 hover:text-white bg-[#2a1f16] border border-amber-500/20 cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-5 py-2 rounded-xl text-xs font-black shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
