import React, { useState } from 'react';
import { 
  HelpCircle, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Save, 
  X, 
  Filter,
  Sparkles,
  Heart
} from 'lucide-react';
import { Question } from '../../types';

interface AdminQuestionsProps {
  questions: Question[];
  onUpdateQuestions: (questions: Question[]) => void;
  showToast: (msg: string) => void;
}

export const AdminQuestions: React.FC<AdminQuestionsProps> = ({
  questions,
  onUpdateQuestions,
  showToast
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [questionForm, setQuestionForm] = useState<Partial<Question>>({
    questionText: '',
    category: 'Mantiq',
    difficulty: 'O\'rta',
    answer: '',
    explanation: '',
    source: '44-Maktab Zakovat Baza',
    author: 'Koordinator',
    imageUrl: ''
  });

  const handleOpenCreateModal = () => {
    setEditingQuestionId(null);
    setQuestionForm({
      questionText: '',
      category: 'Mantiq',
      difficulty: 'O\'rta',
      answer: '',
      explanation: '',
      source: '44-Maktab Zakovat Baza',
      author: 'Koordinator',
      imageUrl: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (q: Question) => {
    setEditingQuestionId(q.id);
    setQuestionForm({ ...q });
    setIsModalOpen(true);
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionForm.questionText || !questionForm.answer) {
      alert("Savol matni va to'g'ri javobni to'ldiring!");
      return;
    }

    if (editingQuestionId) {
      const updated = questions.map(q => 
        q.id === editingQuestionId ? { ...q, ...questionForm } as Question : q
      );
      onUpdateQuestions(updated);
      showToast("Savol muvaffaqiyatli tahrirlandi!");
    } else {
      const newQ: Question = {
        id: `q-${Date.now()}`,
        questionText: questionForm.questionText || '',
        category: questionForm.category || 'Mantiq',
        difficulty: questionForm.difficulty || 'O\'rta',
        answer: questionForm.answer || '',
        explanation: questionForm.explanation || '',
        source: questionForm.source || '44-Maktab Baza',
        author: questionForm.author || 'Koordinator',
        likes: 1,
        imageUrl: questionForm.imageUrl || ''
      };
      onUpdateQuestions([newQ, ...questions]);
      showToast("Yangi savol bazaga qo'shildi!");
    }
    setIsModalOpen(false);
  };

  const handleDeleteQuestion = (id: string) => {
    if (confirm("Ushbu savolni bazadan o'chirmoqchimisiz?")) {
      onUpdateQuestions(questions.filter(q => q.id !== id));
      showToast("Savol o'chirildi.");
    }
  };

  const filtered = questions.filter(q => {
    const matchesSearch = !searchQuery || 
      q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'Barchasi' || q.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 animate-fadeIn font-sans text-amber-50">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <HelpCircle className="w-4 h-4" />
            <span>Savollar Banki va Viktorina (CRUD)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-amber-50 font-serif">
            ZAKOVAT SAVOLLARI BAZASI
          </h2>
          <p className="text-xs text-amber-200/70 mt-0.5">
            Mantiqiy, tarixiy, adabiyot va fan bo'yicha savollarni qo'shish, to'g'ri javoblari va rasmlarini tahrirlash.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-md cursor-pointer transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi Savol Kiritish</span>
        </button>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-3 text-amber-400/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Savol matni, javobi yoki muallifini qidirish..."
            className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl pl-9 pr-3 py-2.5 text-xs text-amber-50 placeholder-amber-200/40 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 w-full sm:w-auto">
          {['Barchasi', 'Mantiq', 'Tarix', 'Adabiyot', 'Fan va Texnika', 'Geografiya', 'Boshqotirma'].map(cat => (
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

      {/* Questions Grid */}
      <div className="space-y-3">
        {filtered.map((q, idx) => (
          <div
            key={q.id}
            className="bg-[#211a13]/90 border border-amber-500/30 hover:border-amber-400/60 rounded-2xl p-4 sm:p-5 space-y-3 shadow-lg backdrop-blur-md transition-all"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] bg-amber-500/20 border border-amber-400/30 text-amber-300 font-bold px-2 py-0.5 rounded-full uppercase">
                    {q.category}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    q.difficulty === 'Oson' ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30' :
                    q.difficulty === 'O\'rta' ? 'bg-amber-950/60 text-amber-300 border border-amber-500/30' :
                    'bg-rose-950/60 text-rose-300 border border-rose-500/30'
                  }`}>
                    {q.difficulty}
                  </span>
                  <span className="text-[11px] text-amber-200/60 font-medium">Muallif: {q.author}</span>
                </div>

                <p className="text-xs sm:text-sm font-medium text-amber-50 leading-relaxed">
                  {q.questionText}
                </p>

                {q.imageUrl && (
                  <img
                    src={q.imageUrl}
                    alt="Savol rasmi"
                    className="w-44 h-28 object-cover rounded-xl border border-amber-500/30 my-2"
                  />
                )}

                <div className="pt-1">
                  <span className="text-xs font-black text-emerald-400">Javob: </span>
                  <span className="text-xs font-bold text-amber-100">{q.answer}</span>
                </div>

                {q.explanation && (
                  <p className="text-[11px] text-amber-200/70">
                    <strong className="text-amber-300">Izoh:</strong> {q.explanation}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-1.5 shrink-0">
                <button
                  onClick={() => handleOpenEditModal(q)}
                  className="p-1.5 rounded-lg bg-[#18120d] text-amber-400 hover:bg-[#2c2219] border border-amber-500/25 cursor-pointer"
                  title="Savolni tahrirlash"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteQuestion(q.id)}
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

      {/* ================= MODAL: CREATE / EDIT QUESTION ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#211a13] border border-amber-500/40 rounded-2xl p-5 sm:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl text-amber-50">
            
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
              <h3 className="text-base font-black text-amber-50 font-serif flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                <span>{editingQuestionId ? "Savolni Tahrirlash" : "Yangi Savol Kiritish"}</span>
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-amber-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Toifa (Kategoriya)</label>
                  <select
                    value={questionForm.category || 'Mantiq'}
                    onChange={(e) => setQuestionForm({ ...questionForm, category: e.target.value as any })}
                    className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="Mantiq">Mantiq</option>
                    <option value="Tarix">Tarix</option>
                    <option value="Adabiyot">Adabiyot</option>
                    <option value="Fan va Texnika">Fan va Texnika</option>
                    <option value="Geografiya">Geografiya</option>
                    <option value="Boshqotirma">Boshqotirma</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Qiyinlik Darajasi</label>
                  <select
                    value={questionForm.difficulty || 'O\'rta'}
                    onChange={(e) => setQuestionForm({ ...questionForm, difficulty: e.target.value as any })}
                    className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="Oson">Oson</option>
                    <option value="O'rta">O'rta</option>
                    <option value="Murakkab">Murakkab</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Savol Matni</label>
                <textarea
                  rows={4}
                  required
                  value={questionForm.questionText || ''}
                  onChange={(e) => setQuestionForm({ ...questionForm, questionText: e.target.value })}
                  placeholder="Savol matnini to'liq yozing..."
                  className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl p-2.5 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-emerald-400 uppercase mb-1">To'g'ri Javob</label>
                <input
                  type="text"
                  required
                  value={questionForm.answer || ''}
                  onChange={(e) => setQuestionForm({ ...questionForm, answer: e.target.value })}
                  placeholder="To'g'ri javob..."
                  className="w-full bg-[#18120d] border border-emerald-500/30 rounded-xl px-3 py-2 text-xs text-emerald-300 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Izoh / Tarixiy Fakt</label>
                <textarea
                  rows={2}
                  value={questionForm.explanation || ''}
                  onChange={(e) => setQuestionForm({ ...questionForm, explanation: e.target.value })}
                  placeholder="Javob izohi..."
                  className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl p-2.5 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Muallif</label>
                  <input
                    type="text"
                    value={questionForm.author || ''}
                    onChange={(e) => setQuestionForm({ ...questionForm, author: e.target.value })}
                    placeholder="Muallif ismi..."
                    className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Rasm (URL)</label>
                  <input
                    type="url"
                    value={questionForm.imageUrl || ''}
                    onChange={(e) => setQuestionForm({ ...questionForm, imageUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                  />
                </div>
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

    </div>
  );
};
