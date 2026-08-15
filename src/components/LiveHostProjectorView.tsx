import React, { useState, useEffect, useRef } from 'react';
import { 
  Tv, 
  Maximize2, 
  Minimize2, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Eye, 
  EyeOff, 
  ChevronLeft, 
  ChevronRight, 
  QrCode, 
  Send, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Sparkles, 
  Music, 
  Video, 
  Image as ImageIcon, 
  Users, 
  Award,
  Bell
} from 'lucide-react';
import { Question, Team, LiveTeamAnswer } from '../types';
import { soundEffects } from '../utils/soundEffects';

interface LiveHostProjectorViewProps {
  questions?: Question[];
  teams?: Team[];
  onUpdateTeams?: React.Dispatch<React.SetStateAction<Team[]>> | ((updater: (prev: Team[]) => Team[]) => void);
  onExit?: () => void;
}

export const LiveHostProjectorView: React.FC<LiveHostProjectorViewProps> = ({
  questions = [],
  teams = [],
  onUpdateTeams,
  onExit
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Timer states
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  // Online answer submission simulation / Host inbox
  const [liveAnswers, setLiveAnswers] = useState<LiveTeamAnswer[]>(() => {
    try {
      const saved = localStorage.getItem('zakovat44_live_answers');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [showQrModal, setShowQrModal] = useState(false);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [submittingTeam, setSubmittingTeam] = useState(teams[0]?.name || '');
  const [submittedAnswerInput, setSubmittedAnswerInput] = useState('');
  const [isPlayingAudioSnippet, setIsPlayingAudioSnippet] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const currentQ = (questions && questions.length > 0) ? (questions[currentIndex] || questions[0]) : null;

  // Save live answers
  useEffect(() => {
    try {
      localStorage.setItem('zakovat44_live_answers', JSON.stringify(liveAnswers));
    } catch (e) {
      console.error(e);
    }
  }, [liveAnswers]);

  // Timer countdown hook
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          const nextVal = prev - 1;
          if (soundEnabled) {
            if (nextVal <= 10 && nextVal > 0) {
              soundEffects.playTick(true);
            } else if (nextVal > 10) {
              soundEffects.playTick(false);
            }

            if (nextVal === 10) {
              soundEffects.playWarningChime();
            }
          }

          if (nextVal === 0) {
            setIsRunning(false);
            if (soundEnabled) {
              soundEffects.playTimesUp();
            }
          }
          return nextVal;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, soundEnabled]);

  // Fullscreen toggle handler
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.warn('Fullscreen error:', err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => {
        console.warn('Exit fullscreen error:', err);
      });
      setIsFullscreen(false);
    }
  };

  const handleStartTimer = () => {
    if (!isRunning) {
      if (timeLeft === 60 && soundEnabled) {
        soundEffects.playGong();
      }
      setIsRunning(true);
    }
  };

  const handlePauseTimer = () => {
    setIsRunning(false);
  };

  const handleResetTimer = () => {
    setIsRunning(false);
    setTimeLeft(60);
    setIsAnswerRevealed(false);
  };

  const handleRevealAnswer = () => {
    setIsAnswerRevealed(true);
    if (soundEnabled) {
      soundEffects.playSuccess();
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      handleResetTimer();
    }
  };

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      handleResetTimer();
    }
  };

  // Submit Answer from Team
  const handleSendTeamAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submittedAnswerInput.trim() || !submittingTeam) return;

    const newAns: LiveTeamAnswer = {
      id: `ans-${Date.now()}`,
      questionId: currentQ?.id || 'q-curr',
      teamName: submittingTeam,
      answerText: submittedAnswerInput.trim(),
      submittedAt: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      secondsUsed: 60 - timeLeft,
      status: 'pending'
    };

    setLiveAnswers((prev) => [newAns, ...prev]);
    setSubmittedAnswerInput('');
    setShowSubmissionModal(false);
    if (soundEnabled) {
      soundEffects.playWarningChime();
    }
  };

  // Moderator Judge Decision (+1 Point to Team)
  const handleJudgeAnswer = (ansId: string, isCorrect: boolean, teamName: string) => {
    setLiveAnswers((prev) =>
      prev.map((a) => (a.id === ansId ? { ...a, status: isCorrect ? 'accepted' : 'rejected' } : a))
    );

    if (isCorrect) {
      if (soundEnabled) soundEffects.playSuccess();
      // Add point to team
      if (onUpdateTeams) {
        onUpdateTeams((prev) =>
          prev.map((t) => (t.name === teamName ? { ...t, points: t.points + 1, wins: t.wins + 1 } : t))
        );
      }
    } else {
      if (soundEnabled) soundEffects.playWrong();
    }
  };

  // Play embedded audio sample
  const handlePlayAudioQuestion = () => {
    setIsPlayingAudioSnippet(true);
    soundEffects.playMelodySnippet();
    setTimeout(() => setIsPlayingAudioSnippet(false), 3000);
  };

  const currentQAnswers = liveAnswers.filter((a) => a.questionId === currentQ?.id);

  return (
    <div 
      ref={containerRef}
      id="live-projector-view"
      className={`transition-all duration-300 ${
        isFullscreen 
          ? 'fixed inset-0 z-50 bg-[#0d0a07] text-amber-50 p-6 md:p-12 overflow-y-auto flex flex-col justify-between'
          : 'max-w-7xl mx-auto px-4 py-8 space-y-6'
      }`}
    >
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#1e1711]/90 backdrop-blur border border-amber-500/30 p-3.5 rounded-2xl shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-md">
            <Tv className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-amber-400 flex items-center gap-2">
              JONLI TURNIR VA PROYEKTOR REJIMI
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] px-2 py-0.5 rounded-full font-bold">
                Akt Zali Ekrani
              </span>
            </h2>
            <p className="text-xs text-amber-200/60">
              Savol {currentIndex + 1} / {questions.length || 1} • Katta shrift va rasmiy Zakovat ovozlari
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {onExit && (
            <button
              onClick={onExit}
              className="px-3 py-2 rounded-xl text-xs font-bold bg-[#241d16] hover:bg-[#2e241c] text-amber-200 border border-amber-500/20 transition-all cursor-pointer"
            >
              Chiqish
            </button>
          )}

          {/* Audio toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1.5 cursor-pointer ${
              soundEnabled 
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                : 'bg-[#241d16] border-slate-700 text-slate-400'
            }`}
            title="Ovoz effektlari (Gong, taymer, fanfara)"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
            <span>{soundEnabled ? 'Ovoz: Yoniq' : 'Ovoz: O\'chiq'}</span>
          </button>

          {/* Test Gong */}
          <button
            onClick={() => soundEffects.playGong()}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-[#241d16] hover:bg-[#2d251d] text-amber-300 border border-amber-500/30 transition-all flex items-center space-x-1.5 cursor-pointer"
            title="Rasmiy Gong ovozini yangratish"
          >
            <Bell className="w-4 h-4 text-amber-400" />
            <span>Gong</span>
          </button>

          {/* QR Code Online Submission */}
          <button
            onClick={() => setShowQrModal(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md flex items-center space-x-1.5 cursor-pointer"
          >
            <QrCode className="w-4 h-4" />
            <span>QR Javob Yuborish</span>
          </button>

          {/* Simulate Team Mobile Submit */}
          <button
            onClick={() => setShowSubmissionModal(true)}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-[#2e2319] hover:bg-[#382b1f] text-amber-200 border border-amber-500/30 flex items-center space-x-1.5 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-amber-400" />
            <span>Javob Yozish</span>
          </button>

          {/* Fullscreen toggle */}
          <button
            onClick={handleToggleFullscreen}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center space-x-1.5 cursor-pointer shadow-md"
            title="Akt zali proyektoriga to'liq ekran qilish"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Kichraytirish' : 'To\'liq Ekran'}</span>
          </button>
        </div>
      </div>

      {/* Main Big Stage / Projector Screen Card */}
      <div className={`relative bg-gradient-to-b from-[#1c1611] to-[#120d09] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden flex flex-col justify-between ${
        isFullscreen ? 'min-h-[75vh]' : 'min-h-[580px]'
      }`}>
        {/* Subtle Ambient Glowing Ornament */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header inside stage */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-amber-500/20 pb-5">
          <div className="flex items-center space-x-3">
            <span className="px-4 py-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-xl font-extrabold text-sm sm:text-base tracking-wide">
              {currentIndex + 1}-SAVOL
            </span>
            <span className="px-3 py-1 bg-[#241d16] text-amber-200/80 rounded-lg text-xs font-medium border border-amber-500/20">
              Kategoriya: <strong className="text-amber-300">{currentQ?.category || 'Mantiq'}</strong>
            </span>
            {currentQ?.mediaType && currentQ.mediaType !== 'text' && (
              <span className="px-3 py-1 bg-amber-400 text-slate-950 rounded-lg text-xs font-extrabold flex items-center gap-1">
                {currentQ.mediaType === 'audio' && <Music className="w-3.5 h-3.5" />}
                {currentQ.mediaType === 'video' && <Video className="w-3.5 h-3.5" />}
                {currentQ.mediaType === 'image' && <ImageIcon className="w-3.5 h-3.5" />}
                <span className="uppercase">{currentQ.mediaType} SAVOLI</span>
              </span>
            )}
          </div>

          {/* Big Circular / Radial Timer */}
          <div className="flex items-center space-x-4 bg-[#140e0a]/90 px-5 py-2.5 rounded-2xl border border-amber-500/30 shadow-inner">
            <Clock className={`w-6 h-6 ${timeLeft <= 10 ? 'text-rose-500 animate-bounce' : 'text-amber-400'}`} />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-amber-200/60 tracking-wider">Vaqt</span>
              <span className={`font-mono text-3xl sm:text-4xl font-extrabold tracking-tight ${
                timeLeft <= 10 
                  ? 'text-rose-500 animate-pulse' 
                  : timeLeft <= 20 
                  ? 'text-amber-400' 
                  : 'text-amber-300'
              }`}>
                00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Question Body & Media */}
        <div className="relative z-10 py-6 sm:py-10 space-y-6">
          
          {/* Media attachment rendering */}
          {currentQ?.mediaType === 'audio' && (
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-4 max-w-xl mx-auto animate-fadeIn">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center animate-pulse">
                  <Music className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-amber-200 text-sm">{currentQ.audioTitle || 'Mumtoz Musiqa Parchasi'}</h4>
                  <p className="text-xs text-amber-200/60">Kompozitor va musiqiy asarni diqqat bilan tinglang</p>
                </div>
              </div>
              <button
                onClick={handlePlayAudioQuestion}
                disabled={isPlayingAudioSnippet}
                className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md cursor-pointer disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isPlayingAudioSnippet ? 'Yangramoqda...' : 'Kuni Yangratish'}</span>
              </button>
            </div>
          )}

          {currentQ?.imageUrl && (
            <div className="flex justify-center my-4">
              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl max-h-72 max-w-lg">
                <img 
                  src={currentQ.imageUrl} 
                  alt="Savol rasmi" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Large High-Contrast Question Text */}
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-amber-50 leading-relaxed tracking-wide drop-shadow-md">
              "{currentQ?.questionText}"
            </p>
          </div>

          {/* Answer Box (Revealed with animation) */}
          {isAnswerRevealed ? (
            <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/20 via-amber-600/20 to-yellow-500/20 border-2 border-amber-400 shadow-2xl text-center space-y-3 animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                To'g'ri Javob
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-300">
                {currentQ?.answer}
              </h3>
              {currentQ?.explanation && (
                <p className="text-sm sm:text-base text-amber-100/90 leading-relaxed font-sans max-w-2xl mx-auto pt-2 border-t border-amber-400/20">
                  <strong className="text-amber-300">Izoh: </strong> {currentQ.explanation}
                </p>
              )}
            </div>
          ) : (
            <div className="text-center py-4">
              <span className="text-xs sm:text-sm font-semibold text-amber-200/50 italic tracking-wider">
                [ 60 soniya muhokama davom etmoqda • Javob vaqt tugagach yoki moderator tomonidan ochiladi ]
              </span>
            </div>
          )}
        </div>

        {/* Bottom Timer Controls & Switcher */}
        <div className="relative z-10 pt-6 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-4">
          
          {/* Navigation between questions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevQuestion}
              disabled={currentIndex === 0}
              className="p-3 rounded-xl bg-[#241d16] hover:bg-[#2e241c] text-amber-200 border border-amber-500/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              title="Oldingi savol"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={currentIndex === questions.length - 1}
              className="p-3 rounded-xl bg-[#241d16] hover:bg-[#2e241c] text-amber-200 border border-amber-500/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              title="Keyingi savol"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Central Timer action triggers */}
          <div className="flex items-center space-x-3">
            {!isRunning ? (
              <button
                onClick={handleStartTimer}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm sm:text-base flex items-center space-x-2 shadow-lg shadow-amber-500/30 cursor-pointer active:scale-95 transition-transform"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>60S BOSHLASH (GONG)</span>
              </button>
            ) : (
              <button
                onClick={handlePauseTimer}
                className="px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-black text-sm sm:text-base flex items-center space-x-2 shadow-lg cursor-pointer"
              >
                <Pause className="w-5 h-5 fill-current" />
                <span>TO'XTATISH</span>
              </button>
            )}

            <button
              onClick={handleResetTimer}
              className="p-3 rounded-2xl bg-[#241d16] hover:bg-[#2e241c] text-amber-300 border border-amber-500/30 transition-all cursor-pointer"
              title="Taymerni qayta o'rnatish"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          {/* Answer reveal button */}
          <div>
            {!isAnswerRevealed ? (
              <button
                onClick={handleRevealAnswer}
                className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm flex items-center space-x-2 shadow-lg shadow-emerald-500/20 cursor-pointer active:scale-95 transition-all"
              >
                <Eye className="w-4 h-4" />
                <span>JAVOBNI OCHISH</span>
              </button>
            ) : (
              <button
                onClick={() => setIsAnswerRevealed(false)}
                className="px-4 py-3 rounded-2xl bg-[#241d16] hover:bg-[#2f251d] text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center space-x-2 cursor-pointer"
              >
                <EyeOff className="w-4 h-4" />
                <span>Yopish</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Real-time Moderator Judge & Incoming Team Answers Inbox */}
      <div className="bg-[#18120d] border border-amber-500/30 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
          <div className="flex items-center space-x-2.5">
            <Users className="w-5 h-5 text-amber-400" />
            <h3 className="font-extrabold text-amber-200 text-base">
              Jamoalardan Kelib Tushgan Javoblar ({currentQAnswers.length})
            </h3>
          </div>
          <span className="text-xs text-amber-200/60">
            Hakamlar / Moderator uchun tezkor baholash paneli
          </span>
        </div>

        {currentQAnswers.length === 0 ? (
          <div className="text-center py-8 text-amber-200/50 text-xs space-y-2">
            <Clock className="w-8 h-8 mx-auto text-amber-500/40" />
            <p>Ushbu savol uchun hali jamoalar javob yuborishmadi.</p>
            <p className="text-[11px] text-amber-400/80">
              Kapitanlar QR-kod orqali yoki "Javob Yozish" tugmasini bosib o'z javoblarini yo'llashlari mumkin.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {currentQAnswers.map((ans) => (
              <div 
                key={ans.id}
                className={`p-4 rounded-2xl border transition-all ${
                  ans.status === 'accepted'
                    ? 'bg-emerald-950/40 border-emerald-500/50'
                    : ans.status === 'rejected'
                    ? 'bg-rose-950/40 border-rose-500/50 opacity-60'
                    : 'bg-[#221b14] border-amber-500/30'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-extrabold text-sm text-amber-300 truncate">
                    {ans.teamName}
                  </span>
                  <span className="text-[10px] text-amber-200/60 bg-[#15100c] px-2 py-0.5 rounded">
                    {ans.secondsUsed}s da keldi
                  </span>
                </div>

                <p className="text-sm font-medium text-amber-100 bg-[#120d09] p-2.5 rounded-xl border border-amber-500/10 mb-3">
                  "{ans.answerText}"
                </p>

                {ans.status === 'pending' ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleJudgeAnswer(ans.id, true, ans.teamName)}
                      className="flex-1 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>+1 To'g'ri</span>
                    </button>
                    <button
                      onClick={() => handleJudgeAnswer(ans.id, false, ans.teamName)}
                      className="flex-1 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Noto'g'ri</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className={ans.status === 'accepted' ? 'text-emerald-400' : 'text-rose-400'}>
                      {ans.status === 'accepted' ? '✓ Qabul qilindi (+1 ball)' : '✗ Rad etildi'}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* QR Code Modal for Hall Display */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1c1611] border-2 border-amber-500/50 rounded-3xl max-w-md w-full p-6 sm:p-8 text-center space-y-5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-amber-500/20 pb-3">
              <h3 className="font-extrabold text-amber-300 text-lg flex items-center gap-2">
                <QrCode className="w-5 h-5 text-amber-400" />
                Kapitanlar Uchun QR-Kod
              </h3>
              <button 
                onClick={() => setShowQrModal(false)}
                className="text-amber-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-amber-200/80">
              Har bir jamoa sardori o'z telefon kamerasini ushbu QR kodga qaratib, 60 soniya ichida o'z jamoasi javobini to'g'ridan-to'g'ri proyektor tizimiga yuborishi mumkin!
            </p>

            {/* QR Code Graphical Placeholder Box */}
            <div className="p-6 bg-white rounded-2xl inline-block shadow-xl border-4 border-amber-400 mx-auto">
              <div className="w-48 h-48 bg-slate-950 flex flex-col items-center justify-center p-3 rounded-lg text-white">
                <QrCode className="w-32 h-32 text-amber-400 animate-pulse" />
                <span className="text-[10px] text-amber-300 font-mono mt-1 font-bold">ZAKOVAT-44-LIVE</span>
              </div>
            </div>

            <div className="bg-[#120d09] p-3 rounded-xl border border-amber-500/20 text-xs text-amber-300">
              Havola: <code className="text-amber-400 font-mono">zakovat.44maktab.uz/live/{currentQ?.id}</code>
            </div>

            <button
              onClick={() => {
                setShowQrModal(false);
                setShowSubmissionModal(true);
              }}
              className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs cursor-pointer shadow-lg"
            >
              Telefondan Javob Yuborishni Sinash (Simulyatsiya)
            </button>
          </div>
        </div>
      )}

      {/* Online Answer Input Modal */}
      {showSubmissionModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1c1611] border-2 border-amber-500/50 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-amber-500/20 pb-3">
              <h3 className="font-extrabold text-amber-300 text-lg flex items-center gap-2">
                <Send className="w-5 h-5 text-amber-400" />
                Jamoa Javobini Yuborish
              </h3>
              <button 
                onClick={() => setShowSubmissionModal(false)}
                className="text-amber-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendTeamAnswer} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1.5">
                  Jamoangizni tanlang:
                </label>
                <select
                  value={submittingTeam}
                  onChange={(e) => setSubmittingTeam(e.target.value)}
                  className="w-full bg-[#120d09] text-amber-100 text-sm rounded-xl px-3.5 py-2.5 border border-amber-500/30 focus:border-amber-400 focus:outline-none"
                  required
                >
                  {teams.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name} ({t.classGrade})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1.5">
                  {currentIndex + 1}-Savol bo'yicha jamoangiz javobi:
                </label>
                <textarea
                  value={submittedAnswerInput}
                  onChange={(e) => setSubmittedAnswerInput(e.target.value)}
                  rows={3}
                  placeholder="Javobingizni aniq va lo'nda yozing..."
                  className="w-full bg-[#120d09] text-amber-100 text-sm rounded-xl p-3.5 border border-amber-500/30 focus:border-amber-400 focus:outline-none"
                  required
                  autoFocus
                />
              </div>

              <div className="flex justify-between items-center text-xs text-amber-200/60">
                <span>Qolgan vaqt: <strong className="text-amber-400">{timeLeft}s</strong></span>
                <span>Savol ID: #{currentQ?.id}</span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSubmissionModal(false)}
                  className="w-1/3 py-2.5 rounded-xl bg-[#241d16] text-amber-200 font-bold text-xs"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  Javobni Yuborish 🚀
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
