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
  Shield,
  Clock,
  X
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
    showToast("Maktab va klub ma'lumotlari muvaffaqiyatli saqlandi!");
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
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <School className="w-4 h-4" />
            <span>Maktab, Klub, Kontaktlar va FAQ Sozlamalari (CRUD)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-amber-50 font-serif">
            MAKTAB VA KLUB HAQIDA MA'LUMOTLAR
          </h2>
          <p className="text-xs text-amber-200/70 mt-0.5">
            Barcha umumiy matnlar, shiorlar, koordinator raqamlari, nizom va saytdagi FAQ bo'limini boshqaring.
          </p>
        </div>
      </div>

      <form onSubmit={handleSaveMainInfo} className="space-y-6">
        
        {/* Header & Brand Customization */}
        <div className="bg-[#211a13]/90 border border-amber-500/30 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl backdrop-blur-md">
          <h3 className="text-sm font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <School className="w-4 h-4" />
            <span>Header (Yuqori Qism) va Maktab / Klub Brendi</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Maktab Raqami</label>
              <input
                type="text"
                value={formState.schoolNumber || ''}
                onChange={(e) => setFormState({ ...formState, schoolNumber: e.target.value })}
                placeholder="44"
                className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Maktab To'liq Nomi</label>
              <input
                type="text"
                value={formState.schoolName || ''}
                onChange={(e) => setFormState({ ...formState, schoolName: e.target.value })}
                placeholder="44-sonli umumiy o'rta ta'lim maktabi"
                className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Klub Nomi</label>
              <input
                type="text"
                value={formState.clubName || ''}
                onChange={(e) => setFormState({ ...formState, clubName: e.target.value })}
                placeholder="Zakovat Intellektual Klubi"
                className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Klub Shiari (Motto)</label>
              <input
                type="text"
                value={formState.motto || ''}
                onChange={(e) => setFormState({ ...formState, motto: e.target.value })}
                placeholder="Bilim — kuchda emas, mantiqda va birdamlikda!"
                className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Top Bar Announcement */}
          <div className="pt-2 border-t border-amber-500/15 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">
                Nav Bar Tepasidagi E'lon Matni
              </label>
              <input
                type="text"
                value={formState.headerAnnouncement || ''}
                onChange={(e) => setFormState({ ...formState, headerAnnouncement: e.target.value })}
                placeholder="Zakovat teleo'yiniga savol yuborish"
                className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">
                Nav Bar Tepasidagi E'lon Havolasi (Link)
              </label>
              <input
                type="text"
                value={formState.headerAnnouncementLink || ''}
                onChange={(e) => setFormState({ ...formState, headerAnnouncementLink: e.target.value })}
                placeholder="https://t.me/zakovat"
                className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Footer Customization */}
        <div className="bg-[#211a13]/90 border border-amber-500/30 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl backdrop-blur-md">
          <h3 className="text-sm font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>Footer (Sayt Pastki Qismi) Sozlamalari</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Footer Qisqacha Tavsif Matni</label>
              <textarea
                rows={2}
                value={formState.footerDescription || ''}
                onChange={(e) => setFormState({ ...formState, footerDescription: e.target.value })}
                placeholder="44-sonli umumiy o'rta ta'lim maktabi Zakovat intellektual klubi rasmiy portali..."
                className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl p-2.5 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Footer Mualliflik Huquqi (Copyright) Matni</label>
              <input
                type="text"
                value={formState.footerCopyright || ''}
                onChange={(e) => setFormState({ ...formState, footerCopyright: e.target.value })}
                placeholder="© 2026 44-Sonli Umumiy O'rta Ta'lim Maktabi Zakovat Klubi. Barcha huquqlar himoyalangan."
                className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Contacts & Coordinator */}
        <div className="bg-[#211a13]/90 border border-amber-500/30 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl backdrop-blur-md">
          <h3 className="text-sm font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>Aloqa va Koordinator Ma'lumotlari</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Koordinator Ismi</label>
              <input
                type="text"
                value={formState.coordinatorName || ''}
                onChange={(e) => setFormState({ ...formState, coordinatorName: e.target.value })}
                className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Koordinator Telefoni</label>
              <input
                type="text"
                value={formState.coordinatorPhone || ''}
                onChange={(e) => setFormState({ ...formState, coordinatorPhone: e.target.value })}
                className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Telegram Kanal / Guruh</label>
              <input
                type="text"
                value={formState.telegramChannel || ''}
                onChange={(e) => setFormState({ ...formState, telegramChannel: e.target.value })}
                placeholder="https://t.me/..."
                className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Email Manzili</label>
              <input
                type="email"
                value={formState.email || ''}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Manzil</label>
              <input
                type="text"
                value={formState.address || ''}
                onChange={(e) => setFormState({ ...formState, address: e.target.value })}
                className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Ish Vaqti</label>
              <input
                type="text"
                value={formState.workingHours || ''}
                onChange={(e) => setFormState({ ...formState, workingHours: e.target.value })}
                className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>

        {/* History & Rules Text */}
        <div className="bg-[#211a13]/90 border border-amber-500/30 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl backdrop-blur-md">
          <h3 className="text-sm font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>Klub Tarixi va O'yin Qoidalari</span>
          </h3>

          <div>
            <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Klub Tarixi va Faoliyati Matni</label>
            <textarea
              rows={3}
              value={formState.historyAndAbout || ''}
              onChange={(e) => setFormState({ ...formState, historyAndAbout: e.target.value })}
              className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl p-2.5 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Klub Nizomi va O'yin Qoidalari Matni</label>
            <textarea
              rows={3}
              value={formState.clubRules || ''}
              onChange={(e) => setFormState({ ...formState, clubRules: e.target.value })}
              className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl p-2.5 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-lg cursor-pointer transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Maktab Sozlamalarini Saqlash</span>
          </button>
        </div>
      </form>

      {/* ================= FAQ SECTION (FULL CRUD) ================= */}
      <div className="bg-[#211a13]/90 border border-amber-500/30 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
          <div>
            <h3 className="text-sm font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              <span>Tez-Tez Beriladigan Savollar (FAQ) CRUD</span>
            </h3>
            <p className="text-xs text-amber-200/70">
              Foydalanuvchilar "Haqida" bo'limida ko'radigan savol-javoblar ro'yxatini to'liq boshqaring.
            </p>
          </div>

          <button
            onClick={handleOpenAddFaq}
            className="bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black px-3.5 py-1.5 rounded-xl text-xs flex items-center space-x-1 cursor-pointer shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Yangi FAQ Qo'shish</span>
          </button>
        </div>

        <div className="space-y-3">
          {currentFaqList.map((faqItem, idx) => (
            <div
              key={idx}
              className="bg-[#18120d] border border-amber-500/25 rounded-xl p-4 flex items-start justify-between gap-3 hover:border-amber-400/50 transition-all"
            >
              <div className="space-y-1">
                <h4 className="text-xs font-black text-amber-300">
                  {idx + 1}. {faqItem.question}
                </h4>
                <p className="text-xs text-amber-100/90 leading-relaxed">
                  {faqItem.answer}
                </p>
              </div>

              <div className="flex items-center space-x-1.5 shrink-0">
                <button
                  onClick={() => handleOpenEditFaq(idx)}
                  className="p-1.5 rounded-lg bg-[#241c15] text-amber-400 hover:bg-[#32271e] border border-amber-500/25 cursor-pointer"
                  title="FAQ ni tahrirlash"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteFaq(idx)}
                  className="p-1.5 rounded-lg bg-rose-950/50 text-rose-300 hover:bg-rose-900 border border-rose-500/30 cursor-pointer"
                  title="FAQ ni o'chirish"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= MODAL: ADD / EDIT FAQ ================= */}
      {isFaqModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#211a13] border border-amber-500/40 rounded-2xl p-5 max-w-lg w-full space-y-4 shadow-2xl text-amber-50">
            
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
              <h3 className="text-base font-black text-amber-50 font-serif flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                <span>{editingFaqIdx !== null ? "FAQ Savolini Tahrirlash" : "Yangi FAQ Savoli Qo'shish"}</span>
              </h3>
              <button 
                onClick={() => setIsFaqModalOpen(false)}
                className="p-1 text-amber-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFaq} className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Savol Matni</label>
                <input
                  type="text"
                  required
                  value={faqForm.question}
                  onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                  placeholder="Masalan: Jamoa a'zolari soni qancha bo'lishi kerak?"
                  className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Javob Matni</label>
                <textarea
                  rows={4}
                  required
                  value={faqForm.answer}
                  onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                  placeholder="Batafsil javobni yozing..."
                  className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl p-2.5 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-amber-500/20">
                <button
                  type="button"
                  onClick={() => setIsFaqModalOpen(false)}
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
