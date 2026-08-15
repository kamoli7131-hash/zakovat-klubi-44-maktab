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
  Bell,
  AlertTriangle,
  Flame,
  HelpCircle,
  X
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
  const [showAnswersTray, setShowAnswersTray] = useState(true);

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

  // Fullscreen change listener to keep state perfectly synchronized
  useEffect(() => {
    const handleFsChange = () => {
      const isFs = !!(document.fullscreenElement || (document as any).webkitFullscreenElement);
      setIsFullscreen(isFs);
    };

    document.addEventListener('fullscreenchange', handleFsChange);
    document.addEventListener('webkitfullscreenchange', handleFsChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      document.removeEventListener('webkitfullscreenchange', handleFsChange);
    };
  }, []);

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
    if (!document.fullscreenElement && !(document as any).webkitFullscreenElement) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen().catch((err) => {
          console.warn('Fullscreen error:', err);
        });
      } else if ((containerRef.current as any)?.webkitRequestFullscreen) {
        (containerRef.current as any).webkitRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch((err) => {
          console.warn('Exit fullscreen error:', err);
        });
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const handleStartTimer = () => {
    if (!isRunning) {
      if (timeLeft === 60 && soundEnabled) {
        soundEffects.playGong();
      }
      if (timeLeft === 0) {
        setTimeLeft(60);
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

  const handleRestart60s = () => {
    setIsRunning(false);
    setTimeLeft(60);
    setIsAnswerRevealed(false);
    if (soundEnabled) {
      soundEffects.playGong();
    }
    setTimeout(() => {
      setIsRunning(true);
    }, 100);
  };

  const handleRevealAnswer = () => {
    setIsAnswerRevealed(true);
    if (soundEnabled) {
      soundEffects.playSuccess();
    }
  };

  const handleToggleRevealAnswer = () => {
    if (!isAnswerRevealed) {
      handleRevealAnswer();
    } else {
      setIsAnswerRevealed(false);
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

  // Keyboard Shortcuts for Host / Moderator
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        if (isRunning) {
          handlePauseTimer();
        } else {
          handleStartTimer();
        }
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNextQuestion();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrevQuestion();
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        handleResetTimer();
      } else if (e.code === 'KeyA') {
        e.preventDefault();
        handleToggleRevealAnswer();
      } else if (e.code === 'KeyF') {
        e.preventDefault();
        handleToggleFullscreen();
      } else if (e.code === 'KeyG') {
        e.preventDefault();
        if (soundEnabled) soundEffects.playGong();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRunning, timeLeft, currentIndex, questions.length, isAnswerRevealed, soundEnabled]);

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
          ? 'fixed inset-0 z-50 bg-[#0c0906] text-amber-50 p-4 sm:p-6 md:p-8 overflow-y-auto flex flex-col justify-between select-none'
          : 'max-w-7xl mx-auto px-4 py-8 space-y-6'
      }`}
    >
      {/* 1. TOP HEADER & QUICK TOOLBAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#1e1711]/95 backdrop-blur border border-amber-500/30 p-3 sm:p-4 rounded-2xl shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-md">
            <Tv className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-black text-amber-400 flex items-center gap-2">
              JONLI PROYEKTOR VA TURNIR
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] px-2 py-0.5 rounded-full font-bold">
                Akt Zali Ekrani
              </span>
            </h2>
            <p className="text-[11px] text-amber-200/70">
              Savol {currentIndex + 1} / {questions.length || 1} • <span className="text-amber-400 font-semibold">Probel</span> (Vaqt), <span className="text-amber-400 font-semibold">→</span> (Keyingi), <span className="text-amber-400 font-semibold">A</span> (Javob)
            </p>
          </div>
        </div>

        {/* Action buttons toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {onExit && !isFullscreen && (
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
            <span className="hidden sm:inline">{soundEnabled ? 'Ovoz: Yoniq' : 'Ovoz: O\'chiq'}</span>
          </button>

          {/* Test Gong */}
          <button
            onClick={() => soundEffects.playGong()}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-[#241d16] hover:bg-[#2d251d] text-amber-300 border border-amber-500/30 transition-all flex items-center space-x-1.5 cursor-pointer"
            title="Rasmiy Gong ovozini yangratish (Klaviatura: G)"
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
            <span className="hidden sm:inline">QR Javob Yuborish</span>
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
            title="Akt zali proyektoriga to'liq ekran qilish (Klaviatura: F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span className="font-black">{isFullscreen ? 'Kichraytirish' : 'To\'liq Ekran'}</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN PROYEKTOR BIG STAGE */}
      <div className={`relative bg-gradient-to-b from-[#1c1611] to-[#120d09] border-2 border-amber-500/40 rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl overflow-hidden flex flex-col justify-between my-4 ${
        isFullscreen ? 'min-h-[65vh] md:min-h-[72vh]' : 'min-h-[540px]'
      }`}>
        {/* Ambient Glowing Ornament */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header inside stage: Question Number + Category + Big Timer */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="px-4 py-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-xl font-black text-sm sm:text-base tracking-wide">
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

          {/* Big High-Contrast Radial Timer */}
          <div className={`flex items-center space-x-3 sm:space-x-4 px-4 sm:px-6 py-2 rounded-2xl border transition-all shadow-inner ${
            timeLeft === 0 
              ? 'bg-rose-950/80 border-rose-500/80 animate-pulse' 
              : timeLeft <= 10 
              ? 'bg-rose-950/40 border-rose-500/50' 
              : 'bg-[#140e0a]/90 border-amber-500/40'
          }`}>
            <Clock className={`w-6 h-6 sm:w-7 sm:h-7 ${
              timeLeft === 0 
                ? 'text-rose-400 animate-bounce' 
                : timeLeft <= 10 
                ? 'text-rose-500 animate-bounce' 
                : 'text-amber-400'
            }`} />
            <div className="flex flex-col">
              <span className="text-[9.5px] uppercase font-bold text-amber-200/60 tracking-wider">
                {timeLeft === 0 ? 'STATUS' : 'VAQT'}
              </span>
              <span className={`font-mono text-2xl sm:text-4xl font-black tracking-tight ${
                timeLeft === 0 
                  ? 'text-rose-400 font-extrabold' 
                  : timeLeft <= 10 
                  ? 'text-rose-500 animate-pulse' 
                  : timeLeft <= 20 
                  ? 'text-amber-400' 
                  : 'text-amber-300'
              }`}>
                {timeLeft === 0 ? '00:00' : `00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}`}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Question Body & Media */}
        <div className="relative z-10 py-4 sm:py-6 space-y-4 sm:space-y-6 flex-1 flex flex-col justify-center">
          
          {/* Audio attachment */}
          {currentQ?.mediaType === 'audio' && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-4 max-w-xl mx-auto animate-fadeIn">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center animate-pulse">
                  <Music className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-amber-200 text-sm">{currentQ.audioTitle || 'Mumtoz Musiqa Parchasi'}</h4>
                  <p className="text-[11px] text-amber-200/60">Kompozitor va musiqiy asarni diqqat bilan tinglang</p>
                </div>
              </div>
              <button
                onClick={handlePlayAudioQuestion}
                disabled={isPlayingAudioSnippet}
                className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isPlayingAudioSnippet ? 'Yangramoqda...' : 'Kuni Yangratish'}</span>
              </button>
            </div>
          )}

          {/* Image attachment with max-height to ensure controls never get pushed off */}
          {currentQ?.imageUrl && (
            <div className="flex justify-center my-1 sm:my-2">
              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl max-h-48 sm:max-h-56 md:max-h-64 max-w-lg bg-black/40">
                <img 
                  src={currentQ.imageUrl} 
                  alt="Savol rasmi" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain max-h-48 sm:max-h-56 md:max-h-64"
                />
              </div>
            </div>
          )}

          {/* Large High-Contrast Question Text */}
          <div className="max-w-4xl mx-auto text-center px-2">
            <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-amber-50 leading-relaxed tracking-wide drop-shadow-md">
              "{currentQ?.questionText}"
            </p>
          </div>

          {/* TIME EXPIRED (00:00) ACTION BANNER */}
          {timeLeft === 0 && !isAnswerRevealed && (
            <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-gradient-to-r from-rose-950/90 via-[#2a1310] to-rose-950/90 border-2 border-rose-500/80 shadow-2xl text-center space-y-3 animate-fadeIn">
              <div className="flex items-center justify-center gap-2 text-rose-400 font-black text-sm uppercase tracking-wider">
                <AlertTriangle className="w-5 h-5 animate-bounce" />
                <span>DIQQAT: 60 SONIYA VAQT TUGADI!</span>
              </div>
              <p className="text-xs text-amber-200/80">
                Jamoalar javob yuborishi to'xtatildi. Quyidagi amallardan birini tanlang:
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
                <button
                  onClick={handleRestart60s}
                  className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/30 cursor-pointer active:scale-95 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Qayta 60s Boshlash</span>
                </button>

                <button
                  onClick={handleRevealAnswer}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/30 cursor-pointer active:scale-95 transition-all"
                >
                  <Eye className="w-4 h-4" />
                  <span>Javobni Ochish</span>
                </button>

                {currentIndex < questions.length - 1 && (
                  <button
                    onClick={handleNextQuestion}
                    className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-sky-500/30 cursor-pointer active:scale-95 transition-all"
                  >
                    <span>Keyingi Savol</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Answer Box (Revealed with animation) */}
          {isAnswerRevealed && (
            <div className="max-w-3xl mx-auto p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-amber-500/20 via-amber-600/20 to-yellow-500/20 border-2 border-amber-400 shadow-2xl text-center space-y-3 animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                To'g'ri Javob
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-amber-300">
                {currentQ?.answer}
              </h3>
              {currentQ?.explanation && (
                <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-sans max-w-2xl mx-auto pt-2 border-t border-amber-400/20">
                  <strong className="text-amber-300">Izoh: </strong> {currentQ.explanation}
                </p>
              )}
            </div>
          )}

          {!isAnswerRevealed && timeLeft > 0 && (
            <div className="text-center py-2">
              <span className="text-xs font-semibold text-amber-200/50 italic tracking-wider">
                [ 60 soniya muhokama davom etmoqda • Javob vaqt tugagach yoki moderator tomonidan ochiladi ]
              </span>
            </div>
          )}
        </div>

        {/* 3. PERMANENT STAGE BOTTOM CONTROLS (ALWAYS VISIBLE) */}
        <div className="relative z-10 pt-4 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-3 bg-[#16100b]/80 p-3 rounded-2xl">
          
          {/* Navigation between questions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevQuestion}
              disabled={currentIndex === 0}
              className="p-2.5 sm:p-3 rounded-xl bg-[#241d16] hover:bg-[#2e241c] text-amber-200 border border-amber-500/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
              title="Oldingi savol (←)"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Oldingi</span>
            </button>

            <span className="text-xs font-bold text-amber-300 px-2">
              {currentIndex + 1} / {questions.length}
            </span>

            <button
              onClick={handleNextQuestion}
              disabled={currentIndex === questions.length - 1}
              className="p-2.5 sm:p-3 rounded-xl bg-[#241d16] hover:bg-[#2e241c] text-amber-200 border border-amber-500/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
              title="Keyingi savol (→)"
            >
              <span className="hidden sm:inline">Keyingi</span>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Central Timer action triggers */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {!isRunning ? (
              <button
                onClick={handleStartTimer}
                className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm md:text-base flex items-center space-x-2 shadow-lg shadow-amber-500/30 cursor-pointer active:scale-95 transition-transform"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                <span>{timeLeft === 0 ? 'QAYTA 60S BOSHLASH' : '60S BOSHLASH (GONG)'}</span>
              </button>
            ) : (
              <button
                onClick={handlePauseTimer}
                className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm md:text-base flex items-center space-x-2 shadow-lg cursor-pointer"
              >
                <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                <span>TO'XTATISH (PAUSE)</span>
              </button>
            )}

            <button
              onClick={handleResetTimer}
              className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[#241d16] hover:bg-[#2e241c] text-amber-300 border border-amber-500/30 transition-all cursor-pointer"
              title="Taymerni qayta o'rnatish (Klaviatura: R)"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Answer reveal button */}
          <div className="flex items-center space-x-2">
            {!isAnswerRevealed ? (
              <button
                onClick={handleRevealAnswer}
                className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm flex items-center space-x-1.5 shadow-lg shadow-emerald-500/20 cursor-pointer active:scale-95 transition-all"
                title="To'g'ri javobni ko'rsatish (Klaviatura: A)"
              >
                <Eye className="w-4 h-4" />
                <span>JAVOBNI OCHISH</span>
              </button>
            ) : (
              <button
                onClick={() => setIsAnswerRevealed(false)}
                className="px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-[#241d16] hover:bg-[#2f251d] text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center space-x-1.5 cursor-pointer"
              >
                <EyeOff className="w-4 h-4" />
                <span>Yopish</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* 4. REAL-TIME MODERATOR JUDGE & INCOMING TEAM ANSWERS */}
      <div className="bg-[#18120d] border border-amber-500/30 rounded-3xl p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/20 pb-3">
          <div className="flex items-center space-x-2.5">
            <Users className="w-5 h-5 text-amber-400" />
            <h3 className="font-extrabold text-amber-200 text-sm sm:text-base">
              Jamoalardan Kelib Tushgan Javoblar ({currentQAnswers.length})
            </h3>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-amber-200/60 hidden sm:inline">
              Hakamlar / Moderator uchun tezkor baholash paneli
            </span>
            <button
              onClick={() => setShowAnswersTray(!showAnswersTray)}
              className="px-2.5 py-1 rounded-lg bg-[#241d16] text-amber-300 border border-amber-500/20 text-xs cursor-pointer"
            >
              {showAnswersTray ? "Yashirish" : "Ko'rsatish"}
            </button>
          </div>
        </div>

        {showAnswersTray && (
          <>
            {currentQAnswers.length === 0 ? (
              <div className="text-center py-6 text-amber-200/50 text-xs space-y-2">
                <Clock className="w-7 h-7 mx-auto text-amber-500/40" />
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
                    className={`p-3.5 rounded-2xl border transition-all ${
                      ans.status === 'accepted'
                        ? 'bg-emerald-950/40 border-emerald-500/50'
                        : ans.status === 'rejected'
                        ? 'bg-rose-950/40 border-rose-500/50 opacity-60'
                        : 'bg-[#221b14] border-amber-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-extrabold text-xs sm:text-sm text-amber-300 truncate">
                        {ans.teamName}
                      </span>
                      <span className="text-[10px] text-amber-200/60 bg-[#15100c] px-2 py-0.5 rounded">
                        {ans.secondsUsed}s da keldi
                      </span>
                    </div>

                    <p className="text-xs font-medium text-amber-100 bg-[#120d09] p-2.5 rounded-xl border border-amber-500/10 mb-3">
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
          </>
        )}
      </div>

      {/* 5. QR CODE MODAL FOR HALL DISPLAY */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1c1611] border-2 border-amber-500/50 rounded-3xl max-w-md w-full p-6 sm:p-8 text-center space-y-4 shadow-2xl animate-fadeIn">
            <div className="flex justify-between items-center border-b border-amber-500/20 pb-3">
              <h3 className="font-extrabold text-amber-300 text-base sm:text-lg flex items-center gap-2">
                <QrCode className="w-5 h-5 text-amber-400" />
                Kapitanlar Uchun QR-Kod
              </h3>
              <button 
                onClick={() => setShowQrModal(false)}
                className="text-amber-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-amber-200/80">
              Har bir jamoa sardori o'z telefon kamerasini ushbu QR kodga qaratib, 60 soniya ichida o'z jamoasi javobini to'g'ridan-to'g'ri proyektor tizimiga yuborishi mumkin!
            </p>

            {/* QR Code Graphical Box */}
            <div className="p-4 bg-white rounded-2xl inline-block shadow-xl border-4 border-amber-400 mx-auto">
              <div className="w-44 h-44 bg-slate-950 flex flex-col items-center justify-center p-3 rounded-lg text-white">
                <QrCode className="w-28 h-28 text-amber-400 animate-pulse" />
                <span className="text-[10px] text-amber-300 font-mono mt-1 font-bold">ZAKOVAT-44-LIVE</span>
              </div>
            </div>

            <div className="bg-[#120d09] p-2.5 rounded-xl border border-amber-500/20 text-xs text-amber-300">
              Havola: <code className="text-amber-400 font-mono">zakovat.44maktab.uz/live/{currentQ?.id}</code>
            </div>

            <button
              onClick={() => {
                setShowQrModal(false);
                setShowSubmissionModal(true);
              }}
              className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs cursor-pointer shadow-md"
            >
              Test Qilish: Javob Yozish Oynasini Ochish
            </button>
          </div>
        </div>
      )}

      {/* 6. TEAM ANSWER SUBMISSION SIMULATION MODAL */}
      {showSubmissionModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1c1611] border-2 border-amber-500/50 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-fadeIn">
            <div className="flex justify-between items-center border-b border-amber-500/20 pb-3">
              <h3 className="font-extrabold text-amber-300 text-base flex items-center gap-2">
                <Send className="w-5 h-5 text-amber-400" />
                Jamoa Javobini Yuborish
              </h3>
              <button 
                onClick={() => setShowSubmissionModal(false)}
                className="text-amber-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendTeamAnswer} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-amber-400 uppercase mb-1">
                  Jamoangizni Tanlang:
                </label>
                <select
                  value={submittingTeam}
                  onChange={(e) => setSubmittingTeam(e.target.value)}
                  className="w-full bg-[#120d09] border border-amber-500/30 rounded-xl px-3 py-2 text-xs text-amber-100 focus:outline-none focus:border-amber-400"
                >
                  {teams.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name} (Sardor: {t.captain})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-400 uppercase mb-1">
                  Jamoaning Yakuniy Javobi:
                </label>
                <textarea
                  required
                  rows={3}
                  value={submittedAnswerInput}
                  onChange={(e) => setSubmittedAnswerInput(e.target.value)}
                  placeholder="Jamoangiz variantini aniq va lo'nda yozing..."
                  className="w-full bg-[#120d09] border border-amber-500/30 rounded-xl p-3 text-xs text-amber-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-amber-200/60 bg-[#140e0a] p-2.5 rounded-xl">
                <span>Qolgan vaqt: <strong className="text-amber-400">00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</strong></span>
                <span>Savol: <strong className="text-amber-400">{currentIndex + 1}-savol</strong></span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSubmissionModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#241d16] text-amber-200/70 hover:text-white cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 cursor-pointer shadow-lg shadow-amber-500/20"
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
