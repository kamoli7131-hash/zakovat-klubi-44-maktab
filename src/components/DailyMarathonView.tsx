import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  BookOpen, 
  Brain, 
  Clock, 
  Key, 
  Users, 
  Award, 
  ShieldCheck, 
  ChevronRight,
  Send,
  Zap,
  Target
} from 'lucide-react';
import { INITIAL_DAILY_QUESTIONS, ZAKOVAT_TACTICS } from '../data/initialData';
import { soundEffects } from '../utils/soundEffects';

interface DailyMarathonViewProps {
  onNavigate?: (tab: string) => void;
}

export const DailyMarathonView: React.FC<DailyMarathonViewProps> = ({ onNavigate }) => {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const dailyQ = INITIAL_DAILY_QUESTIONS[currentDayIndex] || INITIAL_DAILY_QUESTIONS[0];

  // User Marathon Streak State
  const [streak, setStreak] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('zakovat44_marathon_streak');
      return saved ? parseInt(saved, 10) : 3;
    } catch {
      return 3;
    }
  });

  const [totalScore, setTotalScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('zakovat44_marathon_xp');
      return saved ? parseInt(saved, 10) : 180;
    } catch {
      return 180;
    }
  });

  const [userAnswerInput, setUserAnswerInput] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [revealedHints, setRevealedHints] = useState<number>(0);
  const [activeTacticTab, setActiveTacticTab] = useState<string>('t-1');

  // Time left until next midnight question
  const [timeLeftUntilMidnight, setTimeLeftUntilMidnight] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
      const diff = tomorrow.getTime() - now.getTime();

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeftUntilMidnight(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCheckAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswerInput.trim()) return;

    const cleanInput = userAnswerInput.trim().toLowerCase();
    const cleanAnswer = dailyQ.answer.toLowerCase();

    // Check if input matches primary keywords
    const keywords = cleanAnswer.split(/[\s,()\/]+/).filter((w) => w.length > 2);
    const hasMatch = keywords.some((kw) => cleanInput.includes(kw)) || cleanInput.includes(cleanAnswer);

    setIsAnswered(true);
    if (hasMatch) {
      setIsCorrect(true);
      const newStreak = streak + 1;
      const newScore = totalScore + 25;
      setStreak(newStreak);
      setTotalScore(newScore);
      localStorage.setItem('zakovat44_marathon_streak', newStreak.toString());
      localStorage.setItem('zakovat44_marathon_xp', newScore.toString());
      soundEffects.playSuccess();
    } else {
      setIsCorrect(false);
      soundEffects.playWrong();
    }
  };

  const handleRevealNextHint = () => {
    if (revealedHints < dailyQ.hints.length) {
      setRevealedHints((prev) => prev + 1);
      soundEffects.playWarningChime();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10" id="daily-marathon">
      
      {/* Top Banner & Streak Counter */}
      <div className="bg-gradient-to-r from-[#241a12] via-[#1c140e] to-[#241a12] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 shadow-lg shadow-orange-500/30 animate-pulse">
              <Flame className="w-9 h-9 fill-current" />
            </div>
            <span className="absolute -bottom-1 -right-1 bg-slate-950 border border-amber-400 text-amber-300 text-[10px] font-black px-1.5 py-0.5 rounded-full">
              LIVE
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-amber-300">
                KUN SAVOLI VA KUNLIK BILIM MAROFONI
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-amber-200/70">
              Har kuni 1 ta mantiqiy jumboq • Bilimingizni charxlang va doimiy seriya (streak) yig'ing!
            </p>
          </div>
        </div>

        {/* Streak & XP Stats Chips */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-[#120d09] border border-amber-500/30 px-4 py-2.5 rounded-2xl flex items-center space-x-3">
            <Flame className="w-6 h-6 text-orange-500 fill-orange-500" />
            <div>
              <span className="text-[10px] text-amber-200/60 uppercase font-bold block">Kunlik Seriya</span>
              <span className="text-lg font-black text-amber-300">{streak} Kun 🔥</span>
            </div>
          </div>

          <div className="bg-[#120d09] border border-amber-500/30 px-4 py-2.5 rounded-2xl flex items-center space-x-3">
            <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            <div>
              <span className="text-[10px] text-amber-200/60 uppercase font-bold block">Bilim Ballari</span>
              <span className="text-lg font-black text-amber-300">{totalScore} XP</span>
            </div>
          </div>

          <div className="bg-[#120d09] border border-amber-500/30 px-4 py-2.5 rounded-2xl flex items-center space-x-2">
            <Clock className="w-5 h-5 text-amber-400" />
            <div>
              <span className="text-[10px] text-amber-200/60 uppercase font-bold block">Keyingi Savolga</span>
              <span className="text-sm font-mono font-bold text-amber-200">{timeLeftUntilMidnight}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-column Grid: Today's Daily Question + Badges & Mini marathon */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left (7 cols): Active Daily Question Card */}
        <div className="lg:col-span-7 bg-[#1c1611] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 flex flex-col justify-between">
          
          <div className="space-y-4">
            {/* Header Badge */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-500/20 pb-4">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Bugungi Mantiqiy Jumboq
                </span>
                <span className="text-xs text-amber-200/60 font-medium">
                  {dailyQ.category}
                </span>
              </div>
              <span className="text-xs bg-[#241d16] text-amber-300 px-2.5 py-1 rounded-lg border border-amber-500/20 font-bold">
                Mukofot: +25 XP
              </span>
            </div>

            {/* Question Text */}
            <div className="py-2 space-y-3">
              <p className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-amber-100 leading-relaxed">
                "{dailyQ.questionText}"
              </p>
            </div>

            {/* Hints Section */}
            {dailyQ.hints && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-yellow-400" />
                    Yordamchi Ishoralar ({revealedHints}/{dailyQ.hints.length})
                  </span>
                  {revealedHints < dailyQ.hints.length && !isAnswered && (
                    <button
                      onClick={handleRevealNextHint}
                      className="text-xs text-amber-400 hover:text-amber-300 underline font-bold cursor-pointer"
                    >
                      + Ishorani ochish
                    </button>
                  )}
                </div>

                {revealedHints > 0 && (
                  <div className="space-y-1.5 animate-fadeIn">
                    {dailyQ.hints.slice(0, revealedHints).map((hint, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-2">
                        <span className="font-bold text-amber-400">#{idx + 1}:</span>
                        <span>{hint}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Answer Input or Result Card */}
            {!isAnswered ? (
              <form onSubmit={handleCheckAnswer} className="space-y-3 pt-3">
                <label className="block text-xs font-bold text-amber-300">
                  O'z taxminiy javobingizni yozing:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={userAnswerInput}
                    onChange={(e) => setUserAnswerInput(e.target.value)}
                    placeholder="Javobingizni kiriting..."
                    className="flex-1 bg-[#120d09] text-amber-100 text-sm rounded-xl px-4 py-3 border border-amber-500/30 focus:border-amber-400 focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 cursor-pointer flex items-center gap-1.5 active:scale-95 transition-transform"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Tekshirish</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className={`p-5 rounded-2xl border space-y-3 animate-fadeIn ${
                isCorrect 
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-100' 
                  : 'bg-rose-950/40 border-rose-500/50 text-rose-100'
              }`}>
                <div className="flex items-center gap-2">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      <span className="font-extrabold text-base text-emerald-300">
                        Ajoyib! Javobingiz to'g'ri (+25 XP) 🎉
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-6 h-6 text-rose-400" />
                      <span className="font-extrabold text-base text-rose-300">
                        Kechirasiz, noto'g'ri taxmin!
                      </span>
                    </>
                  )}
                </div>

                <div className="pt-2 border-t border-amber-500/20 space-y-1">
                  <p className="text-sm font-bold text-amber-300">
                    To'g'ri javob: <span className="underline">{dailyQ.answer}</span>
                  </p>
                  <p className="text-xs text-amber-100/80 leading-relaxed font-sans">
                    <strong>Mantiqiy izoh:</strong> {dailyQ.explanation}
                  </p>
                  {dailyQ.funFact && (
                    <div className="mt-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                      <span><strong>Qiziqarli fakt:</strong> {dailyQ.funFact}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setIsAnswered(false);
                      setUserAnswerInput('');
                      setCurrentDayIndex((prev) => (prev + 1) % INITIAL_DAILY_QUESTIONS.length);
                      setRevealedHints(0);
                    }}
                    className="text-xs font-bold text-amber-300 hover:text-white underline cursor-pointer"
                  >
                    Keyingi mashg'ulot savolini sinab ko'rish →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="pt-4 border-t border-amber-500/20 flex items-center justify-between text-xs text-amber-200/60">
            <span>📅 Bugungi sana: {dailyQ.date}</span>
            <span>🏆 Zakovat 44 Marofoni</span>
          </div>

        </div>

        {/* Right (5 cols): Badges, Achievements & Marathon Ranks */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Nishonlar (Badges) Card */}
          <div className="bg-[#18120d] border border-amber-500/30 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="font-extrabold text-amber-300 text-base flex items-center gap-2 border-b border-amber-500/20 pb-3">
              <Award className="w-5 h-5 text-amber-400" />
              Shaxsiy Nishonlar va Mukofotlar
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#221a13] border border-amber-500/30 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-lg">
                  🔥
                </div>
                <div>
                  <h4 className="font-bold text-xs text-amber-200">Faol Qatnashchi</h4>
                  <p className="text-[10px] text-amber-200/60">3 kunlik seriya</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#221a13] border border-amber-500/30 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-500 text-slate-950 flex items-center justify-center font-bold text-lg">
                  🧠
                </div>
                <div>
                  <h4 className="font-bold text-xs text-amber-200">Mantiq Ustasi</h4>
                  <p className="text-[10px] text-amber-200/60">100+ XP to'plandi</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#221a13] border border-amber-500/30 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-600 text-slate-950 flex items-center justify-center font-bold text-lg">
                  ⚡
                </div>
                <div>
                  <h4 className="font-bold text-xs text-amber-200">Tezkor Tafakkur</h4>
                  <p className="text-[10px] text-amber-200/60">Ishorasiz topildi</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#221a13]/50 border border-slate-700/50 flex items-center space-x-3 opacity-60">
                <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 flex items-center justify-center font-bold text-lg">
                  👑
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-400">Mavsum Chempioni</h4>
                  <p className="text-[10px] text-slate-500">7 kunlik seriyada ochiladi</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Marathons Leaderboard */}
          <div className="bg-[#18120d] border border-amber-500/30 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="font-extrabold text-amber-300 text-base flex items-center gap-2 border-b border-amber-500/20 pb-3">
              <Target className="w-5 h-5 text-amber-400" />
              Kunlik Marofon Yetakchilari
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#221a13] border border-amber-500/20">
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] flex items-center justify-center">1</span>
                  <span className="font-bold text-amber-100">Sardorbek Ergashev (11-A)</span>
                </div>
                <span className="text-amber-400 font-extrabold">12 kun 🔥</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#221a13] border border-amber-500/20">
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-slate-300 text-slate-950 font-black text-[10px] flex items-center justify-center">2</span>
                  <span className="font-bold text-amber-100">Malika Rustamova (10-B)</span>
                </div>
                <span className="text-amber-400 font-extrabold">9 kun 🔥</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#221a13] border border-amber-500/20">
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-amber-700 text-amber-100 font-black text-[10px] flex items-center justify-center">3</span>
                  <span className="font-bold text-amber-100">Jasur Mirzayev (9-A)</span>
                </div>
                <span className="text-amber-400 font-extrabold">7 kun 🔥</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Section 2: Zakovat Qo'llanmasi & Taktikalar (Interactive Strategy Handbook) */}
      <div className="bg-[#18120d] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6" id="tactics-guide">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-amber-300">
                ZAKOVAT QO'LLANMASI VA STRATEGIK TAKTIKALAR
              </h3>
              <p className="text-xs text-amber-200/60">
                Yangi va tajribali bilimdonlar uchun professional intellektual o'yin sirlari
              </p>
            </div>
          </div>
        </div>

        {/* Tactics Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ZAKOVAT_TACTICS.map((tactic) => (
            <button
              key={tactic.id}
              onClick={() => setActiveTacticTab(tactic.id)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                activeTacticTab === tactic.id
                  ? 'bg-gradient-to-br from-amber-500/25 to-amber-600/20 border-amber-400 text-amber-200 shadow-lg'
                  : 'bg-[#221b14] border-amber-500/20 text-amber-200/70 hover:bg-[#2a221a]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-extrabold text-xs text-amber-300">{tactic.title.split('.')[0]}</span>
                <Brain className="w-4 h-4 text-amber-400" />
              </div>
              <h4 className="font-bold text-xs text-amber-100 line-clamp-2">
                {tactic.title}
              </h4>
            </button>
          ))}
        </div>

        {/* Active Tactic Detailed Explanation Card */}
        {(() => {
          const curTactic = ZAKOVAT_TACTICS.find((t) => t.id === activeTacticTab) || ZAKOVAT_TACTICS[0];
          return (
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#221a13] to-[#16100c] border border-amber-500/30 space-y-5 animate-fadeIn">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-black text-amber-300">{curTactic.title}</h4>
                  <p className="text-xs text-amber-200/70">{curTactic.summary}</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h5 className="text-xs uppercase font-extrabold text-amber-400 tracking-wider">
                  Amaliy Qoidalar va Maslahatlar:
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {curTactic.tips.map((tip, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#120d09] border border-amber-500/20 text-xs text-amber-100/90 space-y-2">
                      <span className="inline-block w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 font-black text-center leading-6 text-[11px] border border-amber-500/30">
                        {idx + 1}
                      </span>
                      <p className="leading-relaxed font-sans">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

      </div>

    </div>
  );
};
