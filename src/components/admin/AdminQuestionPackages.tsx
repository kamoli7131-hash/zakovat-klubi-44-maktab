import React, { useState } from 'react';
import { 
  FileText, 
  FileUp, 
  Plus, 
  Edit3, 
  Trash2, 
  Upload, 
  Search, 
  Eye, 
  HelpCircle, 
  CheckCircle2, 
  Save, 
  X,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { QuestionPackage, PackageQuestion } from '../../types';

interface AdminQuestionPackagesProps {
  questionPackages: QuestionPackage[];
  onUpdateQuestionPackages: (packages: QuestionPackage[]) => void;
  showToast: (msg: string) => void;
}

export const AdminQuestionPackages: React.FC<AdminQuestionPackagesProps> = ({
  questionPackages,
  onUpdateQuestionPackages,
  showToast
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');

  // Package Modal (Add / Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);
  const [formState, setFormState] = useState<Partial<QuestionPackage>>({
    title: '',
    category: 'Maktab',
    description: '',
    language: 'Uzbek',
    date: new Date().toISOString().split('T')[0],
    playedGamesCount: 0,
    questions: []
  });

  // Package Questions Detail Drawer / Sub-modal
  const [viewingPackage, setViewingPackage] = useState<QuestionPackage | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<PackageQuestion | null>(null);
  const [isNewQuestionForPackage, setIsNewQuestionForPackage] = useState(false);
  const [questionDraft, setQuestionDraft] = useState<Partial<PackageQuestion>>({
    number: 1,
    questionText: '',
    answer: '',
    explanation: '',
    note: ''
  });

  // ================= WORD / TXT FILE PARSER =================
  const handleWordFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        parseTextToQuestions(text);
      }
    };
    reader.readAsText(file);
  };

  const parseTextToQuestions = (text: string) => {
    const lines = text.split('\n');
    const parsedQuestions: PackageQuestion[] = [];
    
    let currentQ: Partial<PackageQuestion> | null = null;
    let qCount = 1;

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) return;

      const savolMatch = trimmed.match(/^(?:(\d+)[\.\-]?\s*savol|savol\s*(\d+)|(\d+)[\.\)])/i);
      const isJavob = trimmed.toLowerCase().startsWith('javob:') || trimmed.toLowerCase().startsWith('j:');
      const isIzoh = trimmed.toLowerCase().startsWith('izoh:') || trimmed.toLowerCase().startsWith('manba:');
      const isNote = trimmed.toLowerCase().startsWith('diqqat savol:') || trimmed.toLowerCase().startsWith('diqqat:');

      if (savolMatch) {
        if (currentQ && currentQ.questionText) {
          parsedQuestions.push({
            id: `pq-${Date.now()}-${qCount}`,
            number: currentQ.number || qCount,
            questionText: currentQ.questionText || '',
            answer: currentQ.answer || 'Javob topilmadi',
            explanation: currentQ.explanation || '',
            note: currentQ.note || '',
            likes: 0
          });
          qCount++;
        }
        currentQ = {
          number: parseInt(savolMatch[1] || savolMatch[2] || savolMatch[3] || `${qCount}`),
          questionText: trimmed.replace(/^(?:(\d+)[\.\-]?\s*savol|savol\s*(\d+)|(\d+)[\.\)])\s*:?/i, '').trim()
        };
      } else if (isJavob && currentQ) {
        currentQ.answer = trimmed.replace(/^(?:javob|j)\s*:?/i, '').trim();
      } else if (isIzoh && currentQ) {
        currentQ.explanation = trimmed.replace(/^(?:izoh|manba)\s*:?/i, '').trim();
      } else if (isNote && currentQ) {
        currentQ.note = trimmed.replace(/^(?:diqqat savol|diqqat)\s*:?/i, '').trim();
      } else if (currentQ) {
        if (currentQ.answer) {
          currentQ.explanation = (currentQ.explanation ? currentQ.explanation + ' ' : '') + trimmed;
        } else {
          currentQ.questionText = (currentQ.questionText ? currentQ.questionText + ' ' : '') + trimmed;
        }
      }
    });

    if (currentQ && currentQ.questionText) {
      parsedQuestions.push({
        id: `pq-${Date.now()}-${qCount}`,
        number: currentQ.number || qCount,
        questionText: currentQ.questionText || '',
        answer: currentQ.answer || 'Javob ko\'rsatilgan',
        explanation: currentQ.explanation || '',
        note: currentQ.note || '',
        likes: 0
      });
    }

    if (parsedQuestions.length > 0) {
      setFormState(prev => ({
        ...prev,
        questions: parsedQuestions,
        questionCount: parsedQuestions.length
      }));
      showToast(`Word/Matn fayldan ${parsedQuestions.length} ta savol avtomatik ajratib olindi!`);
    } else {
      showToast("Matndan savollar avtomatik ajratilmadi. Matn '1-savol:', 'Javob:' shaklida ekanligiga ishonch hosil qiling.");
    }
  };

  const handleOpenCreateModal = () => {
    setEditingPackageId(null);
    setFormState({
      title: '',
      category: 'Maktab',
      description: '',
      language: 'Uzbek',
      date: new Date().toISOString().split('T')[0],
      playedGamesCount: 0,
      questions: []
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (pkg: QuestionPackage) => {
    setEditingPackageId(pkg.id);
    setFormState({ ...pkg });
    setIsModalOpen(true);
  };

  const handleSavePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title) {
      alert("Iltimos, to'plam nomini kiriting!");
      return;
    }

    if (editingPackageId) {
      const updated = questionPackages.map(p => 
        p.id === editingPackageId ? { ...p, ...formState, questionCount: formState.questions?.length || p.questionCount } as QuestionPackage : p
      );
      onUpdateQuestionPackages(updated);
      showToast("Savol to'plami muvaffaqiyatli tahrirlandi!");
    } else {
      const newPkg: QuestionPackage = {
        id: `pack-${Date.now()}`,
        title: formState.title || 'Yangi Savol To\'plami',
        category: formState.category || 'Maktab',
        description: formState.description || 'Zakovat savollar to\'plami',
        questionCount: formState.questions?.length || 1,
        language: formState.language || 'Uzbek',
        date: formState.date || new Date().toISOString().split('T')[0],
        playedGamesCount: Number(formState.playedGamesCount) || 0,
        questions: formState.questions || [],
        wordFileName: formState.wordFileName || `${(formState.title || 'savollar').slice(0, 20)}.docx`
      };
      onUpdateQuestionPackages([newPkg, ...questionPackages]);
      showToast("Yangi savol to'plami muvaffaqiyatli saqlandi!");
    }
    setIsModalOpen(false);
  };

  const handleDeletePackage = (id: string) => {
    if (confirm("Rostdan ham ushbu savol to'plamini o'chirib tashlamoqchimisiz?")) {
      onUpdateQuestionPackages(questionPackages.filter(p => p.id !== id));
      if (viewingPackage?.id === id) setViewingPackage(null);
      showToast("To'plam o'chirildi.");
    }
  };

  // ================= INDIVIDUAL QUESTIONS CRUD INSIDE PACKAGE =================
  const handleOpenAddQuestionToPackage = () => {
    if (!viewingPackage) return;
    setIsNewQuestionForPackage(true);
    setQuestionDraft({
      number: (viewingPackage.questions.length || 0) + 1,
      questionText: '',
      answer: '',
      explanation: '',
      note: ''
    });
  };

  const handleOpenEditQuestionInPackage = (q: PackageQuestion) => {
    setIsNewQuestionForPackage(false);
    setEditingQuestion(q);
    setQuestionDraft({ ...q });
  };

  const handleSaveQuestionDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!viewingPackage || !questionDraft.questionText || !questionDraft.answer) {
      alert("Savol matni va to'g'ri javobni kiriting!");
      return;
    }

    let updatedQuestions: PackageQuestion[] = [];

    if (isNewQuestionForPackage) {
      const newQ: PackageQuestion = {
        id: `pq-${Date.now()}`,
        number: Number(questionDraft.number) || (viewingPackage.questions.length + 1),
        questionText: questionDraft.questionText,
        answer: questionDraft.answer,
        explanation: questionDraft.explanation || '',
        note: questionDraft.note || '',
        likes: 0
      };
      updatedQuestions = [...viewingPackage.questions, newQ];
      showToast("To'plamga yangi savol qo'shildi!");
    } else if (editingQuestion) {
      updatedQuestions = viewingPackage.questions.map(q => 
        q.id === editingQuestion.id ? { ...q, ...questionDraft } as PackageQuestion : q
      );
      showToast("Savol muvaffaqiyatli tahrirlandi!");
    }

    const updatedPackage = {
      ...viewingPackage,
      questions: updatedQuestions,
      questionCount: updatedQuestions.length
    };

    const updatedAllPackages = questionPackages.map(p => 
      p.id === viewingPackage.id ? updatedPackage : p
    );

    onUpdateQuestionPackages(updatedAllPackages);
    setViewingPackage(updatedPackage);
    setEditingQuestion(null);
    setIsNewQuestionForPackage(false);
  };

  const handleDeleteQuestionFromPackage = (questionId: string) => {
    if (!viewingPackage) return;
    if (confirm("Ushbu savolni to'plamdan o'chirmoqchimisiz?")) {
      const updatedQuestions = viewingPackage.questions.filter(q => q.id !== questionId);
      const updatedPackage = {
        ...viewingPackage,
        questions: updatedQuestions,
        questionCount: updatedQuestions.length
      };

      const updatedAllPackages = questionPackages.map(p => 
        p.id === viewingPackage.id ? updatedPackage : p
      );

      onUpdateQuestionPackages(updatedAllPackages);
      setViewingPackage(updatedPackage);
      showToast("Savol o'chirildi.");
    }
  };

  // Filtered packages
  const filtered = questionPackages.filter(p => {
    const matchesCat = selectedCategory === 'Barchasi' || p.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn font-sans text-amber-50">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            <span>Savollar To'plami va Word Import (CRUD)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-amber-50 font-serif">
            SAVOL PAKETLARI BOSHQARUVI
          </h2>
          <p className="text-xs text-amber-200/70 mt-0.5">
            Word fayllardan tayyor savollarni avtomatik yuklang yoki qo'lda to'plam va uning ichidagi har bir savolni tahrirlang.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-md cursor-pointer transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi Savol To'plami Yaratish</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-3 text-amber-400/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="To'plam nomi yoki tavsifini qidirish..."
            className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl pl-9 pr-3 py-2.5 text-xs text-amber-50 placeholder-amber-200/40 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-1 w-full sm:w-auto">
          {['Barchasi', 'Maktab', 'Professional', 'Oliy ta\'lim', 'Tashkilot'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : 'bg-[#211a13] text-amber-200/80 border border-amber-500/20 hover:bg-[#2c2219]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-[#211a13]/90 border border-amber-500/30 hover:border-amber-400/60 rounded-2xl p-5 space-y-3 shadow-lg flex flex-col justify-between backdrop-blur-md transition-all hover:-translate-y-0.5"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] bg-amber-500/15 border border-amber-400/30 text-amber-300 font-bold px-2.5 py-0.5 rounded-full uppercase">
                  {pkg.category}
                </span>
                <span className="text-[11px] text-amber-200/60 font-semibold">{pkg.date}</span>
              </div>

              <h3 className="text-base font-black text-amber-50 line-clamp-1 font-serif">
                {pkg.title}
              </h3>
              <p className="text-xs text-amber-200/70 mt-1 line-clamp-2">
                {pkg.description}
              </p>

              <div className="mt-3 pt-3 border-t border-amber-500/20 flex items-center justify-between text-xs">
                <span className="text-amber-400 font-black">
                  {pkg.questions?.length || pkg.questionCount || 0} ta savol
                </span>
                <span className="text-amber-200/60 text-[11px]">
                  {pkg.language} tili
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setViewingPackage(pkg)}
                className="bg-[#18120d] hover:bg-[#2a2118] text-amber-300 border border-amber-500/30 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center space-x-1.5 cursor-pointer transition-all"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Savollarni ko'rish / CRUD</span>
              </button>

              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => handleOpenEditModal(pkg)}
                  className="p-2 rounded-xl bg-[#18120d] text-amber-400 hover:bg-[#2a2118] border border-amber-500/25 cursor-pointer"
                  title="To'plamni tahrirlash"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeletePackage(pkg.id)}
                  className="p-2 rounded-xl bg-rose-950/50 text-rose-300 hover:bg-rose-900 border border-rose-500/30 cursor-pointer"
                  title="To'plamni o'chirish"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* ================= MODAL: CREATE / EDIT PACKAGE ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#211a13] border border-amber-500/40 rounded-2xl p-5 sm:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl text-amber-50">
            
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
              <h3 className="text-base font-black text-amber-50 font-serif flex items-center gap-2">
                <FileUp className="w-5 h-5 text-amber-400" />
                <span>{editingPackageId ? "Savol To'plamini Tahrirlash" : "Yangi Savol To'plami Yaratish / Word Yuklash"}</span>
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-amber-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Word File Upload Dropzone */}
            <div className="bg-[#18120d] border-2 border-dashed border-amber-500/40 hover:border-amber-400 rounded-xl p-5 text-center space-y-2">
              <Upload className="w-7 h-7 text-amber-400 mx-auto" />
              <p className="text-xs font-bold text-amber-100">
                Word (.docx / .doc) yoki matn (.txt) faylini tanlang
              </p>
              <p className="text-[11px] text-amber-200/60">
                Fayl ichidagi "1-savol:", "Javob:", "Izoh:" avtomatik ravishda ajratib olinadi.
              </p>
              <input
                type="file"
                accept=".txt,.doc,.docx"
                onChange={handleWordFileUpload}
                className="text-xs text-amber-200/80 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-amber-500 file:text-slate-950 hover:file:bg-amber-400 cursor-pointer"
              />
              {formState.questions && formState.questions.length > 0 && (
                <div className="text-xs text-emerald-400 font-bold pt-1">
                  ✓ {formState.questions.length} ta savol tayyor holatda yuklangan
                </div>
              )}
            </div>

            <form onSubmit={handleSavePackage} className="space-y-3 pt-2">
              <div>
                <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">To'plam Nomi</label>
                <input
                  type="text"
                  required
                  value={formState.title || ''}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  placeholder="Masalan: 44-Maktab Kuzgi Chempionat Savollari"
                  className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Toifa</label>
                  <select
                    value={formState.category || 'Maktab'}
                    onChange={(e) => setFormState({ ...formState, category: e.target.value as any })}
                    className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                  >
                    <option value="Maktab">Maktab</option>
                    <option value="Professional">Professional</option>
                    <option value="Oliy ta'lim">Oliy ta'lim</option>
                    <option value="Tashkilot">Tashkilot</option>
                    <option value="Mahalla">Mahalla</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Tili</label>
                  <select
                    value={formState.language || 'Uzbek'}
                    onChange={(e) => setFormState({ ...formState, language: e.target.value })}
                    className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                  >
                    <option value="Uzbek">O'zbekcha</option>
                    <option value="Russian">Ruscha</option>
                    <option value="English">Inglizcha</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Qisqacha Tavsif</label>
                <textarea
                  rows={2}
                  value={formState.description || ''}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  placeholder="Savollar to'plami haqida umumiy izoh..."
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

      {/* ================= MODAL / DRAWER: PACKAGE INDIVIDUAL QUESTIONS CRUD ================= */}
      {viewingPackage && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#211a13] border border-amber-500/40 rounded-2xl p-5 sm:p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl text-amber-50">
            
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
              <div>
                <span className="text-[10px] text-amber-400 font-bold uppercase">{viewingPackage.category} to'plami</span>
                <h3 className="text-lg font-black text-amber-50 font-serif">{viewingPackage.title}</h3>
                <p className="text-xs text-amber-200/70">{viewingPackage.questions.length} ta savol mavjud</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleOpenAddQuestionToPackage}
                  className="bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black px-3.5 py-1.5 rounded-xl text-xs flex items-center space-x-1 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Savol Qo'shish</span>
                </button>
                <button
                  onClick={() => {
                    setViewingPackage(null);
                    setEditingQuestion(null);
                    setIsNewQuestionForPackage(false);
                  }}
                  className="p-1.5 text-amber-400 hover:text-white rounded-xl bg-[#18120d] border border-amber-500/25 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* If Adding or Editing Single Question inside this package */}
            {(isNewQuestionForPackage || editingQuestion) && (
              <form onSubmit={handleSaveQuestionDraft} className="bg-[#18120d] border border-amber-500/35 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-amber-300 uppercase">
                    {isNewQuestionForPackage ? "To'plamga yangi savol kiritish" : `${editingQuestion?.number}-savolni tahrirlash`}
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingQuestion(null);
                      setIsNewQuestionForPackage(false);
                    }}
                    className="text-xs text-amber-200/60 hover:text-white"
                  >
                    Yopish
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  <div className="col-span-1">
                    <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Raqami</label>
                    <input
                      type="number"
                      value={questionDraft.number || 1}
                      onChange={(e) => setQuestionDraft({ ...questionDraft, number: Number(e.target.value) })}
                      className="w-full bg-[#241c15] border border-amber-500/25 rounded-lg px-2.5 py-1.5 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="col-span-3">
                    <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Diqqat (Eslatma)</label>
                    <input
                      type="text"
                      value={questionDraft.note || ''}
                      onChange={(e) => setQuestionDraft({ ...questionDraft, note: e.target.value })}
                      placeholder="Masalan: Ushbu savolda 1 daqiqa vaqt beriladi"
                      className="w-full bg-[#241c15] border border-amber-500/25 rounded-lg px-2.5 py-1.5 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Savol Matni</label>
                  <textarea
                    rows={3}
                    required
                    value={questionDraft.questionText || ''}
                    onChange={(e) => setQuestionDraft({ ...questionDraft, questionText: e.target.value })}
                    placeholder="Savol matnini to'liq yozing..."
                    className="w-full bg-[#241c15] border border-amber-500/25 rounded-lg p-2.5 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-emerald-400 uppercase mb-1">To'g'ri Javob</label>
                  <input
                    type="text"
                    required
                    value={questionDraft.answer || ''}
                    onChange={(e) => setQuestionDraft({ ...questionDraft, answer: e.target.value })}
                    placeholder="To'g'ri javob..."
                    className="w-full bg-[#241c15] border border-emerald-500/30 rounded-lg px-3 py-2 text-xs text-emerald-300 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Izoh / Manba</label>
                  <input
                    type="text"
                    value={questionDraft.explanation || ''}
                    onChange={(e) => setQuestionDraft({ ...questionDraft, explanation: e.target.value })}
                    placeholder="Javob izohi va qiziqarli faktlar..."
                    className="w-full bg-[#241c15] border border-amber-500/25 rounded-lg px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 cursor-pointer shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>Savolni To'plamga Saqlash</span>
                </button>
              </form>
            )}

            {/* Questions List */}
            <div className="space-y-3">
              {viewingPackage.questions.map((q, idx) => (
                <div 
                  key={q.id}
                  className="bg-[#18120d] border border-amber-500/25 rounded-xl p-4 space-y-2 hover:border-amber-400/50 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-xs font-black text-amber-400 bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                        {q.number || idx + 1}-savol
                      </span>
                      <p className="text-xs text-amber-100 font-medium pt-1">
                        {q.questionText}
                      </p>
                      {q.note && (
                        <p className="text-[11px] text-amber-300/80 italic">
                          Diqqat: {q.note}
                        </p>
                      )}
                      <p className="text-xs text-emerald-400 font-bold pt-1">
                        <strong>Javob:</strong> {q.answer}
                      </p>
                      {q.explanation && (
                        <p className="text-[11px] text-amber-200/70">
                          <strong>Izoh:</strong> {q.explanation}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center space-x-1.5 shrink-0">
                      <button
                        onClick={() => handleOpenEditQuestionInPackage(q)}
                        className="p-1.5 rounded-lg bg-[#241c15] text-amber-400 hover:bg-[#32271e] border border-amber-500/25 cursor-pointer"
                        title="Savolni tahrirlash"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteQuestionFromPackage(q.id)}
                        className="p-1.5 rounded-lg bg-rose-950/50 text-rose-300 hover:bg-rose-900 border border-rose-500/30 cursor-pointer"
                        title="Savolni o'chirish"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
