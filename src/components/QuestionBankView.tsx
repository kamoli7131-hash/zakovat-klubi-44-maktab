import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { 
  HelpCircle, 
  Play, 
  RotateCcw, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  Send, 
  PlusCircle, 
  BookOpen, 
  ThumbsUp, 
  Sparkles,
  Volume2,
  VolumeX,
  X,
  Music,
  Video,
  Image as ImageIcon,
  Film
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface QuestionBankViewProps {
  questions: Question[];
  onAddQuestion: (q: Omit<Question, 'id' | 'likes'>) => void;
}

export const QuestionBankView: React.FC<QuestionBankViewProps> = ({ questions, onAddQuestion }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedMediaType, setSelectedMediaType] = useState<string>('all');
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  
  // Timer State for 60-second Zakovat countdown
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isPlayingAudioSnippet, setIsPlayingAudioSnippet] = useState(false);

  // Quiz state
  const [userAnswerInput, setUserAnswerInput] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [aiEvaluation, setAiEvaluation] = useState<{ status: 'correct' | 'partial' | 'wrong' | null; message: string }>({ status: null, message: '' });

  // Add question modal
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [newQuestionData, setNewQuestionData] = useState({
    questionText: '',
    category: 'Mantiq' as Question['category'],
    difficulty: 'O\'rta' as Question['difficulty'],
    mediaType: 'text' as 'text' | 'image' | 'audio' | 'video',
    imageUrl: '',
    audioTitle: '',
    answer: '',
    explanation: '',
    source: '44-Maktab O\'quvchisi',
    author: ''
  });

  const categories = ['all', 'Mantiq', 'Tarix', 'Adabiyot', 'Fan va Texnika', 'Geografiya', 'Boshqotirma'];

  const filteredQuestions = questions.filter((q) => {
    const matchCat = selectedCategory === 'all' || q.category === selectedCategory;
    const matchDiff = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    const matchMedia = selectedMediaType === 'all' || (q.mediaType || 'text') === selectedMediaType;
    return matchCat && matchDiff && matchMedia;
  });

  const currentQ = filteredQuestions[currentIdx] || questions[0];

  // Timer interval effect
  useEffect(() => {
    let timer: any = null;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          const nextVal = prev - 1;
          if (soundEnabled) {
            if (nextVal <= 10 && nextVal > 0) {
              soundEffects.playTick(true);
            } else if (nextVal > 10) {
              soundEffects.playTick(false);
            }
            if (nextVal === 10) soundEffects.playWarningChime();
          }

          if (nextVal === 0) {
            setIsTimerRunning(false);
            if (soundEnabled) soundEffects.playTimesUp();
          }
          return nextVal;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft, soundEnabled]);

  const handleStartTimer = () => {
    setTimeLeft(60);
    setIsTimerRunning(true);
    setShowAnswer(false);
    setShowHint(false);
    setAiEvaluation({ status: null, message: '' });
    if (soundEnabled) soundEffects.playGong();
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(60);
  };

  const handleNextQuestion = () => {
    setShowAnswer(false);
    setShowHint(false);
    setUserAnswerInput('');
    setAiEvaluation({ status: null, message: '' });
    setTimeLeft(60);
    setIsTimerRunning(false);

    if (filteredQuestions.length > 0) {
      setCurrentIdx((prev) => (prev + 1) % filteredQuestions.length);
    }
  };

  const handlePlayAudioQuestion = () => {
    setIsPlayingAudioSnippet(true);
    soundEffects.playMelodySnippet();
    setTimeout(() => setIsPlayingAudioSnippet(false), 3200);
  };

  // Evaluate user answer
  const handleCheckAnswer = () => {
    if (!userAnswerInput.trim()) return;

    const target = currentQ.answer.toLowerCase();
    const input = userAnswerInput.toLowerCase().trim();

    // Fuzzy matching evaluation
    if (input === target || target.includes(input) || input.includes(target.split(' ')[0])) {
      setAiEvaluation({
        status: 'correct',
        message: "Barakalla! Javobingiz to'g'ri!"
      });
      if (soundEnabled) soundEffects.playSuccess();
    } else if (input.length > 3 && target.slice(0, 4) === input.slice(0, 4)) {
      setAiEvaluation({
        status: 'partial',
        message: 'Deyarli to\'g\'ri! Aniqroq variantini ko\'rib chiqing.'
      });
    } else {
      setAiEvaluation({
        status: 'wrong',
        message: 'Noto\'g\'ri. Yana bir oz o\'ylab ko\'ring yoki javobni ko\'ring.'
      });
      if (soundEnabled) soundEffects.playWrong();
    }
    setShowAnswer(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionData.questionText || !newQuestionData.answer) return;

    onAddQuestion({
      ...newQuestionData,
      author: newQuestionData.author || '44-Maktab Bilimdoni'
    });

    setIsSubmitModalOpen(false);
    setNewQuestionData({
      questionText: '',
      category: 'Mantiq',
      difficulty: 'O\'rta',
      mediaType: 'text',
      imageUrl: '',
      audioTitle: '',
      answer: '',
      explanation: '',
      source: '44-Maktab O\'quvchisi',
      author: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 space-y-6 text-amber-50 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>44-Maktab Interaktiv Trenajori</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-amber-50 font-serif">
            SAVOLLAR BAZASI VA LIVE QUIZ
          </h2>
          <p className="text-amber-200/70 text-xs sm:text-sm mt-0.5">
            60 soniyalik sekundomer, mantiqiy savollar va o'z bilimlaringizni sinash uchun maxsus simulyator.
          </p>
        </div>

        <button
          onClick={() => setIsSubmitModalOpen(true)}
          className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs transition-all shadow-lg shadow-amber-500/20 flex items-center space-x-2 cursor-pointer active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Yangi Savol Yuborish</span>
        </button>
      </div>

      {/* Category and Difficulty Selectors */}
      <div className="bg-[#211a13]/90 border border-amber-500/30 p-3.5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-3 shadow-xl backdrop-blur-md">
        
        {/* Categories */}
        <div className="flex items-center space-x-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <span className="text-xs font-bold text-amber-300/80 mr-2 shrink-0">Bo'lim:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentIdx(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-md font-black'
                  : 'bg-[#18120d] text-amber-200/80 hover:text-white hover:bg-[#2c2219] border border-amber-500/20'
              }`}
            >
              {cat === 'all' ? "Barcha Bo'limlar" : cat}
            </button>
          ))}
        </div>

        {/* Media Format filter */}
        <div className="flex items-center space-x-2 shrink-0">
          <span className="text-xs text-amber-300/80 font-bold">Format:</span>
          {[
            { id: 'all', label: 'Barchasi' },
            { id: 'audio', label: '🎵 Audio' },
            { id: 'video', label: '🎬 Video' },
            { id: 'image', label: '🖼️ Rasm' }
          ].map((fmt) => (
            <button
              key={fmt.id}
              onClick={() => {
                setSelectedMediaType(fmt.id);
                setCurrentIdx(0);
              }}
              className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer transition-all ${
                selectedMediaType === fmt.id
                  ? 'bg-amber-400 text-slate-950 font-black'
                  : 'bg-[#18120d] text-amber-200/70 hover:bg-[#281e15] border border-amber-500/20'
              }`}
            >
              {fmt.label}
            </button>
          ))}
        </div>

        {/* Difficulty buttons */}
        <div className="flex items-center space-x-2 shrink-0">
          <span className="text-xs text-amber-300/80 font-bold">Daraja:</span>
          {['all', 'Oson', 'O\'rta', 'Murakkab'].map((diff) => (
            <button
              key={diff}
              onClick={() => {
                setSelectedDifficulty(diff);
                setCurrentIdx(0);
              }}
              className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer ${
                selectedDifficulty === diff
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                  : 'bg-[#18120d] text-amber-200/60 border border-amber-500/15'
              }`}
            >
              {diff === 'all' ? 'Barchasi' : diff}
            </button>
          ))}
        </div>

      </div>

      {/* MAIN LIVE QUIZ SIMULATOR CARD */}
      {currentQ ? (
        <div className="bg-[#211a13]/90 border-2 border-amber-500/40 rounded-3xl p-5 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
          
          {/* Top metadata & 60-Second Timer Widget */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
            
            <div className="flex items-center space-x-2.5">
              <span className="bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-[10px] px-3 py-1 rounded-full uppercase">
                {currentQ.category}
              </span>
              <span className="bg-[#18120d] text-amber-300 border border-amber-500/30 text-xs px-2.5 py-1 rounded-full font-bold">
                {currentQ.difficulty} daraja
              </span>
              {currentQ.mediaType && currentQ.mediaType !== 'text' && (
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                  {currentQ.mediaType === 'audio' && <Music className="w-3.5 h-3.5" />}
                  {currentQ.mediaType === 'video' && <Video className="w-3.5 h-3.5" />}
                  {currentQ.mediaType === 'image' && <ImageIcon className="w-3.5 h-3.5" />}
                  <span className="uppercase">{currentQ.mediaType}</span>
                </span>
              )}
              <span className="text-xs text-amber-200/60 hidden sm:inline-block">
                Savol #{currentIdx + 1} / {filteredQuestions.length}
              </span>
            </div>

            {/* Audio Toggle & Countdown Clock Display */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                  soundEnabled ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' : 'bg-[#18120d] border-slate-700 text-slate-400'
                }`}
                title="Ovoz effektlari"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <div className="flex items-center space-x-3 bg-[#18120d] p-2 px-4 rounded-2xl border border-amber-500/30 shadow-inner">
                <Clock className={`w-5 h-5 ${timeLeft <= 10 ? 'text-red-500 animate-bounce' : 'text-amber-400'}`} />
                <div className="font-mono text-xl sm:text-2xl font-black tracking-widest text-amber-50">
                  00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                </div>
                <div className="flex items-center space-x-1 pl-2 border-l border-amber-500/20">
                  {!isTimerRunning ? (
                    <button
                      onClick={handleStartTimer}
                      className="p-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 rounded-xl transition-all font-black text-xs flex items-center space-x-1 shadow cursor-pointer active:scale-95"
                      title="Sekundomerni boshlash (60s)"
                    >
                      <Play className="w-3.5 h-3.5 fill-slate-950" />
                      <span>Boshlash</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleResetTimer}
                      className="p-2 bg-[#2c2219] hover:bg-[#382b1f] text-amber-100 rounded-xl transition-all text-xs flex items-center space-x-1 border border-amber-500/30 cursor-pointer"
                      title="Qayta tiklash"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Media Player Box if audio/video/image question */}
          {currentQ.mediaType === 'audio' && (
            <div className="p-4 rounded-2xl bg-[#140e0a] border border-amber-500/30 flex items-center justify-between gap-3 animate-fadeIn">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center">
                  <Music className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-amber-200">{currentQ.audioTitle || 'Mumtoz audio parcha'}</h4>
                  <p className="text-[11px] text-amber-200/60">Ohangni tinglang va muallif yoki asarni toping</p>
                </div>
              </div>
              <button
                onClick={handlePlayAudioQuestion}
                disabled={isPlayingAudioSnippet}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isPlayingAudioSnippet ? 'Yangramoqda...' : 'Kuni Tinglash'}</span>
              </button>
            </div>
          )}

          {currentQ.imageUrl && (
            <div className="flex justify-center">
              <div className="rounded-2xl overflow-hidden border border-amber-500/30 max-h-64 shadow-xl">
                <img 
                  src={currentQ.imageUrl} 
                  alt="Savol tasviri"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Question Text */}
          <div className="space-y-3">
            <h3 className="text-lg sm:text-2xl font-bold text-amber-50 leading-relaxed font-serif">
              "{currentQ.questionText}"
            </h3>
            <div className="text-xs text-amber-200/60 flex items-center gap-4">
              <span>Manba: {currentQ.source}</span>
              <span>Muallif: {currentQ.author}</span>
            </div>
          </div>

          {/* Interactive Answer Input & Actions */}
          <div className="space-y-3 pt-3 border-t border-amber-500/20">
            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              <input
                type="text"
                value={userAnswerInput}
                onChange={(e) => setUserAnswerInput(e.target.value)}
                placeholder="Taxminiy javobingizni yozing..."
                className="w-full bg-[#18120d] text-amber-50 placeholder-amber-200/40 text-xs sm:text-sm rounded-xl px-4 py-2.5 border border-amber-500/30 focus:border-amber-400 focus:outline-none"
                onKeyDown={(e) => e.key === 'Enter' && handleCheckAnswer()}
              />
              <button
                onClick={handleCheckAnswer}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs px-6 py-2.5 rounded-xl transition-all shadow-md shrink-0 flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Tekshirish</span>
              </button>
            </div>

            {/* Answer & Hint buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="bg-[#18120d] hover:bg-[#281f16] text-amber-300 text-xs font-bold px-3.5 py-2 rounded-xl border border-amber-500/30 flex items-center space-x-1.5 transition-all cursor-pointer"
                >
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>{showHint ? 'Maslahatni Bekitish' : 'Maslahat (Hint)'}</span>
                </button>

                <button
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="bg-[#18120d] hover:bg-[#281f16] text-amber-100 text-xs font-bold px-3.5 py-2 rounded-xl border border-amber-500/30 flex items-center space-x-1.5 transition-all cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <span>{showAnswer ? 'Javobni Yashirish' : 'Rasmiy Javobni Ko\'rish'}</span>
                </button>
              </div>

              <button
                onClick={handleNextQuestion}
                className="bg-[#18120d] hover:bg-amber-400 hover:text-slate-950 text-amber-300 font-black text-xs px-4 py-2 rounded-xl border border-amber-500/40 transition-all flex items-center space-x-2 ml-auto cursor-pointer"
              >
                <span>Keyingi Savol</span>
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* AI / Client Evaluation result banner */}
          {aiEvaluation.status && (
            <div className={`p-4 rounded-xl border text-xs font-semibold flex items-center space-x-2 animate-fadeIn ${
              aiEvaluation.status === 'correct'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : aiEvaluation.status === 'partial'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
            }`}>
              {aiEvaluation.status === 'correct' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
              )}
              <span>{aiEvaluation.message}</span>
            </div>
          )}

          {/* Hint Card */}
          {showHint && (
            <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl text-amber-200 text-xs space-y-1 animate-fadeIn">
              <div className="font-bold text-amber-400 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" /> Maslahat:
              </div>
              <p>Diqqat bilan kalit so'zlarga va mantiqiy zanjirga e'tibor bering!</p>
            </div>
          )}

          {/* Official Answer Box */}
          {showAnswer && (
            <div className="bg-slate-950 border border-amber-500/40 p-6 rounded-2xl space-y-3 text-xs animate-fadeIn">
              <div className="text-amber-400 font-extrabold text-sm uppercase flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> RASMIY JAVOB: {currentQ.answer}
              </div>
              <p className="text-slate-300 leading-relaxed font-sans text-sm">
                <strong>Izoh:</strong> {currentQ.explanation}
              </p>
            </div>
          )}

        </div>
      ) : (
        <div className="bg-slate-900 p-8 rounded-2xl text-center text-slate-400 text-sm">
          Afsuski, ushbu filter bo'yicha savollar topilmadi.
        </div>
      )}

      {/* SUBMIT NEW QUESTION MODAL */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#211a13] border border-amber-500/40 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative text-amber-50">
            <button
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute top-4 right-4 text-amber-300 hover:text-white p-1.5 rounded-lg bg-[#2a2119] border border-amber-500/30 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-amber-50 flex items-center gap-2 font-serif">
              <PlusCircle className="w-5 h-5 text-amber-400" />
              Yangi Mantiqiy Savol Yuborish
            </h3>
            <p className="text-xs text-amber-200/70">
              O'zingiz tuzgan yoki topgan savolingizni maktabimiz Zakovat bazasiga qo'shing.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-amber-200/90 font-bold mb-1">Savol matni *</label>
                <textarea
                  required
                  rows={3}
                  value={newQuestionData.questionText}
                  onChange={(e) => setNewQuestionData({ ...newQuestionData, questionText: e.target.value })}
                  placeholder="Diqqat, savol: ..."
                  className="w-full bg-[#18120d] text-amber-50 p-3 rounded-xl border border-amber-500/30 focus:border-amber-400 focus:outline-none placeholder-amber-200/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-amber-200/90 font-bold mb-1">Bo'lim</label>
                  <select
                    value={newQuestionData.category}
                    onChange={(e) => setNewQuestionData({ ...newQuestionData, category: e.target.value as any })}
                    className="w-full bg-[#18120d] text-amber-50 p-2.5 rounded-xl border border-amber-500/30 focus:border-amber-400 focus:outline-none cursor-pointer"
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
                  <label className="block text-amber-200/90 font-bold mb-1">Murakkablik</label>
                  <select
                    value={newQuestionData.difficulty}
                    onChange={(e) => setNewQuestionData({ ...newQuestionData, difficulty: e.target.value as any })}
                    className="w-full bg-[#18120d] text-amber-50 p-2.5 rounded-xl border border-amber-500/30 focus:border-amber-400 focus:outline-none cursor-pointer"
                  >
                    <option value="Oson">Oson</option>
                    <option value="O'rta">O'rta</option>
                    <option value="Murakkab">Murakkab</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-amber-200/90 font-bold mb-1">Javob *</label>
                <input
                  type="text"
                  required
                  value={newQuestionData.answer}
                  onChange={(e) => setNewQuestionData({ ...newQuestionData, answer: e.target.value })}
                  placeholder="To'g'ri javob"
                  className="w-full bg-[#18120d] text-amber-50 p-2.5 rounded-xl border border-amber-500/30 focus:border-amber-400 focus:outline-none placeholder-amber-200/40"
                />
              </div>

              <div>
                <label className="block text-amber-200/90 font-bold mb-1">Izoh / Manba</label>
                <input
                  type="text"
                  value={newQuestionData.explanation}
                  onChange={(e) => setNewQuestionData({ ...newQuestionData, explanation: e.target.value })}
                  placeholder="Mantiqiy tushuntirish..."
                  className="w-full bg-[#18120d] text-amber-50 p-2.5 rounded-xl border border-amber-500/30 focus:border-amber-400 focus:outline-none placeholder-amber-200/40"
                />
              </div>

              <div>
                <label className="block text-amber-200/90 font-bold mb-1">Muallif F.I.Sh</label>
                <input
                  type="text"
                  value={newQuestionData.author}
                  onChange={(e) => setNewQuestionData({ ...newQuestionData, author: e.target.value })}
                  placeholder="Ismingiz va sinfingiz (masalan, Sardor 10-A)"
                  className="w-full bg-[#18120d] text-amber-50 p-2.5 rounded-xl border border-amber-500/30 focus:border-amber-400 focus:outline-none placeholder-amber-200/40"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="bg-[#2a2119] text-amber-200 border border-amber-500/30 px-4 py-2 rounded-xl font-bold cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black px-5 py-2 rounded-xl shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  Yuborish
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
