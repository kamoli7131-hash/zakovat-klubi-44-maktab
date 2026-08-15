import React, { useState } from 'react';
import { TeamRegistration } from '../types';
import { UserPlus, X, CheckCircle2, ShieldCheck, Users, Lock, Key, Info } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterTeam: (data: TeamRegistration) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  onRegisterTeam,
}) => {
  const [formData, setFormData] = useState({
    teamName: '',
    classGrade: '10-A',
    captainName: '',
    captainPhone: '',
    username: '',
    password: '',
    motto: '',
    member1: '',
    member2: '',
    member3: '',
    member4: '',
    member5: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.teamName || !formData.captainName) return;

    const memberNames = [
      formData.captainName + ' (Kapitan)',
      formData.member1,
      formData.member2,
      formData.member3,
      formData.member4,
      formData.member5,
    ].filter(Boolean);

    const generatedUsername = formData.username || formData.teamName.toLowerCase().replace(/\s+/g, '');
    const generatedPassword = formData.password || '123456';

    onRegisterTeam({
      teamName: formData.teamName,
      classGrade: formData.classGrade,
      captainName: formData.captainName,
      captainPhone: formData.captainPhone,
      username: generatedUsername,
      password: generatedPassword,
      memberNames,
      motto: formData.motto || 'Mantiq va bilim – g\'alaba kalitidir!',
      registrationDate: new Date().toISOString().split('T')[0],
      status: 'approved'
    });

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            <div className="space-y-1">
              <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-2.5 py-0.5 rounded border border-amber-500/30">
                44-Maktab Zakovat Portal
              </span>
              <h3 className="text-2xl font-black text-white flex items-center gap-2 pt-1">
                <UserPlus className="w-6 h-6 text-amber-400" />
                JAMOANI RO'YXATDAN O'TKAZISH
              </h3>
              <p className="text-xs text-slate-300">
                Sinfingiz jamoasi uchun bitta hisob yarating. Keyinchalik Shaxsiy Kabinetingizga kirib bilimdonlarni qo'lda kiritasiz!
              </p>
            </div>

            {/* Architecture note banner */}
            <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-2xl flex items-start gap-2 text-amber-200 text-xs">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>Diqqat:</strong> Klubimizda bilimdonlar (o'quvchilar) alohida ro'yxatdan o'tmaydi! Faqat Jamoa ro'yxatdan o'tib, login va parol oladi. Shaxsiy Kabinetda barcha a'zolarni o'zingiz kiritasiz.
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Jamoa Nomi *</label>
                  <input
                    type="text"
                    required
                    value={formData.teamName}
                    onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                    placeholder="Masalan: Lochinlar"
                    className="w-full bg-slate-950 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Sinf *</label>
                  <select
                    value={formData.classGrade}
                    onChange={(e) => setFormData({ ...formData, classGrade: e.target.value })}
                    className="w-full bg-slate-950 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-500"
                  >
                    <option value="11-A">11-A Sinf</option>
                    <option value="11-B">11-B Sinf</option>
                    <option value="10-A">10-A Sinf</option>
                    <option value="10-B">10-B Sinf</option>
                    <option value="9-A">9-A Sinf</option>
                    <option value="9-B">9-B Sinf</option>
                    <option value="8-A">8-A Sinf</option>
                    <option value="8-B">8-B Sinf</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Kapitan F.I.Sh. *</label>
                  <input
                    type="text"
                    required
                    value={formData.captainName}
                    onChange={(e) => setFormData({ ...formData, captainName: e.target.value })}
                    placeholder="Ism va familiya"
                    className="w-full bg-slate-950 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Telefon Raqam *</label>
                  <input
                    type="text"
                    required
                    value={formData.captainPhone}
                    onChange={(e) => setFormData({ ...formData, captainPhone: e.target.value })}
                    placeholder="+998 90 123 45 67"
                    className="w-full bg-slate-950 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Cabinet Credentials */}
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-3">
                <div className="font-bold text-amber-400 text-xs flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" /> Jamoa Shaxsiy Kabineti Uchun Kirish Ma'lumotlari:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 text-[11px] font-medium mb-1">
                      Login (Username)
                    </label>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      placeholder={formData.teamName ? formData.teamName.toLowerCase().replace(/\s+/g, '') : "masalan: genius10b"}
                      className="w-full bg-slate-900 text-white p-2 rounded-xl border border-slate-700 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[11px] font-medium mb-1">
                      Parol
                    </label>
                    <input
                      type="text"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="masalan: 123456"
                      className="w-full bg-slate-900 text-white p-2 rounded-xl border border-slate-700 text-xs"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Jamoa Shiori (Motto)</label>
                <input
                  type="text"
                  value={formData.motto}
                  onChange={(e) => setFormData({ ...formData, motto: e.target.value })}
                  placeholder="Mantiq va bilim – g'alaba kalitidir!"
                  className="w-full bg-slate-950 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Members list inputs */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="block text-slate-300 font-bold">
                  Boshqa A'zolar (Ism Familiyalari):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="2-A'zo F.I.Sh."
                    value={formData.member1}
                    onChange={(e) => setFormData({ ...formData, member1: e.target.value })}
                    className="bg-slate-950 text-white p-2 rounded-lg border border-slate-700 text-xs"
                  />
                  <input
                    type="text"
                    placeholder="3-A'zo F.I.Sh."
                    value={formData.member2}
                    onChange={(e) => setFormData({ ...formData, member2: e.target.value })}
                    className="bg-slate-950 text-white p-2 rounded-lg border border-slate-700 text-xs"
                  />
                  <input
                    type="text"
                    placeholder="4-A'zo F.I.Sh."
                    value={formData.member3}
                    onChange={(e) => setFormData({ ...formData, member3: e.target.value })}
                    className="bg-slate-950 text-white p-2 rounded-lg border border-slate-700 text-xs"
                  />
                  <input
                    type="text"
                    placeholder="5-A'zo F.I.Sh."
                    value={formData.member4}
                    onChange={(e) => setFormData({ ...formData, member4: e.target.value })}
                    className="bg-slate-950 text-white p-2 rounded-lg border border-slate-700 text-xs"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-slate-800 text-slate-300 px-5 py-2.5 rounded-xl font-bold"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-2.5 rounded-xl shadow-lg shadow-amber-500/20"
                >
                  Ro'yxatdan O'tkazish
                </button>
              </div>

            </form>
          </>
        ) : (
          <div className="text-center space-y-4 py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-white">
              Tashakkur! Jamoangiz Qabul Qilindi!
            </h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              "{formData.teamName}" ({formData.classGrade} sinf) jamoasi muvaffaqiyatli ro'yxatga olindi. Koordinatorlarimiz ko'rsatilgan telefon raqami orqali kapitan bilan bog'lanishadi.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="bg-amber-500 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs"
            >
              Tushunarli
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
