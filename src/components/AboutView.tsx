import React, { useState } from 'react';
import { SchoolInfo } from '../types';
import { FAQ_LIST } from '../data/initialData';
import { Info, Shield, Users, CheckCircle2, ChevronDown, ChevronUp, UserPlus, Phone, BookOpen, Award, School, Mail, Send } from 'lucide-react';

interface AboutViewProps {
  schoolInfo?: SchoolInfo;
  onOpenRegister: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ schoolInfo, onOpenRegister }) => {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const faqItems = (schoolInfo?.faqList && schoolInfo.faqList.length > 0) ? schoolInfo.faqList : (schoolInfo?.faq || FAQ_LIST);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 space-y-8 text-amber-50 font-sans">
      
      {/* Header */}
      <div className="border-b border-amber-500/20 pb-4">
        <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Info className="w-4 h-4 text-amber-400" />
          <span>{schoolInfo?.schoolName || "44-Sonli Umumiy O'rta Ta'lim Maktabi"}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-amber-50 font-serif uppercase">
          {schoolInfo?.clubName || "44-MAKTAB ZAKOVAT KLUBI HAQIDA"}
        </h2>
        <p className="text-amber-200/70 text-xs sm:text-sm mt-0.5 max-w-3xl">
          {schoolInfo?.motto ? `Shior: "${schoolInfo.motto}"` : "44-maktab Zakovat intellektual klubi o'quvchilar o'rtasida kitobxonlik va mantiqiy fikrlashni targ'ib qiladi."}
        </p>
      </div>

      {/* History and About text */}
      {schoolInfo?.historyAndAbout && (
        <div className="bg-[#211a13]/90 border border-amber-500/30 rounded-2xl p-5 sm:p-7 space-y-4 shadow-xl backdrop-blur-md">
          <h3 className="text-lg font-black text-amber-300 flex items-center gap-2 font-serif">
            <School className="w-5 h-5 text-amber-400" />
            <span>Klub va Maktab Haqida Ma'lumot</span>
          </h3>
          <p className="text-amber-100/90 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
            {schoolInfo.historyAndAbout}
          </p>
        </div>
      )}

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        <div className="bg-[#211a13]/90 border border-amber-500/30 rounded-2xl p-5 space-y-3 shadow-xl backdrop-blur-md">
          <div className="w-11 h-11 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-base font-black text-amber-50">Bizning Maqsadimiz</h3>
          <p className="text-amber-200/80 text-xs leading-relaxed">
            Maktabimiz o'quvchilarining mantiqiy salohiyatini oshirish, bilimli va tashabbuskor yoshlarni birlashtirish hamda turnirlarda yuqori natijalarga erishish.
          </p>
        </div>

        <div className="bg-[#211a13]/90 border border-amber-500/30 rounded-2xl p-5 space-y-3 shadow-xl backdrop-blur-md">
          <div className="w-11 h-11 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center font-bold">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-base font-black text-amber-50">Nizom va Qoidalar</h3>
          <p className="text-amber-200/80 text-xs leading-relaxed line-clamp-4">
            {schoolInfo?.clubRules || "O'yinlar klassik Zakovat va Breton qoidalari asosida o'tkaziladi. Har bir savol uchun 60 soniya vaqt beriladi."}
          </p>
        </div>

        <div className="bg-[#211a13]/90 border border-amber-500/30 rounded-2xl p-5 space-y-3 shadow-xl backdrop-blur-md">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-black text-amber-50">Bog'lanish</h3>
          <div className="text-amber-200/80 text-xs space-y-1.5">
            <p><strong>Telefon:</strong> <span className="text-amber-300">{schoolInfo?.phone || "+998 (95) 145-09-19"}</span></p>
            <p><strong>Email:</strong> <span className="text-amber-300">{schoolInfo?.email || "malumot@zakovat.tv"}</span></p>
            <p><strong>Koordinator:</strong> <span className="text-amber-100">{schoolInfo?.coordinatorName || "Sardorbek Rahimov"}</span></p>
          </div>
        </div>

      </div>

      {/* Leadership Section */}
      <div className="bg-[#211a13]/90 border border-amber-500/30 rounded-2xl p-5 sm:p-7 space-y-5 shadow-2xl backdrop-blur-md">
        <h3 className="text-lg font-black text-amber-50 flex items-center gap-2 font-serif">
          <Users className="w-5 h-5 text-amber-400" />
          Klub Rahbariyati va Koordinatorlar
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-[#18120d] p-4 rounded-xl border border-amber-500/25 flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-black text-base shrink-0">
              K
            </div>
            <div>
              <h4 className="font-bold text-amber-50 text-sm">{schoolInfo?.coordinatorName || "Sardorbek Rahimov"}</h4>
              <p className="text-xs text-amber-400 font-bold">Zakovat Bosh Koordinatori</p>
              <p className="text-[11px] text-amber-200/60">44-Maktab Intellektual Klubi Boshlig'i</p>
            </div>
          </div>

          <div className="bg-[#18120d] p-4 rounded-xl border border-amber-500/25 flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center justify-center font-black text-base shrink-0">
              M
            </div>
            <div>
              <h4 className="font-bold text-amber-50 text-sm">N.K. Karimova</h4>
              <p className="text-xs text-amber-400 font-bold">Klub Ilmiy Maslahatchisi</p>
              <p className="text-[11px] text-amber-200/60">Oliy toifali o'qituvchi</p>
            </div>
          </div>

          <div className="bg-[#18120d] p-4 rounded-xl border border-amber-500/25 flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center font-black text-base shrink-0">
              J
            </div>
            <div>
              <h4 className="font-bold text-amber-50 text-sm">Jasurbek Aliyev</h4>
              <p className="text-xs text-amber-400 font-bold">Mantiqiy Savollar Eksperti</p>
              <p className="text-[11px] text-amber-200/60">10-B sinf, "Genius" kapitani</p>
            </div>
          </div>
        </div>
      </div>

      {/* Registration CTA Banner */}
      <div className="bg-gradient-to-r from-amber-500/20 via-[#261d15] to-amber-500/10 border border-amber-500/40 rounded-2xl p-5 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-5 shadow-2xl">
        <div className="space-y-1.5 text-center md:text-left">
          <h3 className="text-xl sm:text-2xl font-black text-amber-50 font-serif">
            Siz ham o'z sinf jamoangizni shakllantiring!
          </h3>
          <p className="text-amber-200/80 text-xs sm:text-sm max-w-2xl">
            6 nafar do'stingizni to'plang, jamoangizga nom va shior tanlang hamda 44-maktab Zakovat chempionatida ishtirok eting.
          </p>
        </div>

        <button
          onClick={onOpenRegister}
          className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-6 py-3 rounded-xl text-xs transition-all shadow-xl shadow-amber-500/20 shrink-0 flex items-center space-x-2 cursor-pointer active:scale-95"
        >
          <UserPlus className="w-4 h-4" />
          <span>Hoziroq Ro'yxatdan O'ting</span>
        </button>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-3">
        <h3 className="text-lg font-black text-amber-50 font-serif">
          Ko'p So'raladigan Savollar (FAQ)
        </h3>

        <div className="space-y-2.5">
          {faqItems.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div
                key={idx}
                className="bg-[#211a13]/90 border border-amber-500/30 rounded-xl overflow-hidden transition-all backdrop-blur-md"
              >
                <button
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-bold text-amber-100 text-xs sm:text-sm flex items-center justify-between hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4 text-amber-400/60" />}
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-amber-200/80 text-xs border-t border-amber-500/20 leading-relaxed font-sans">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
