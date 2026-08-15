import React, { useState, useEffect } from 'react';
import { 
  Swords, 
  Trophy, 
  Clock, 
  Zap, 
  Users, 
  RotateCcw, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Play, 
  Bot, 
  Volume2, 
  VolumeX,
  Flame
} from 'lucide-react';
import { Team, Player, DuelRoundQuestion } from '../types';
import { INITIAL_DUEL_QUESTIONS } from '../data/initialData';
import { soundEffects } from '../utils/soundEffects';

interface DuelBattleViewProps {
  teams?: Team[];
  players?: Player[];
}

export const DuelBattleView: React.FC<DuelBattleViewProps> = ({ teams = [], players = [] }) => {
  // Setup state
  const [battleMode, setBattleMode] = useState<'pvp' | 'tvt' | 'bot'>('pvp');
  const [player1Name, setPlayer1Name] = useState(players[0]?.fullName || 'Sardorbek Ergashev');
  const [player2Name, setPlayer2Name] = useState(players[1]?.fullName || 'Malika Rustamova');
  const [isMatchActive, setIsMatchActive] = useState(false);
  const [matchEnded, setMatchEnded] = useState(false);

  // Game state
  const [currentRound, setCurrentRound] = useState(0);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [activeBuzzer, setActiveBuzzer] = useState<'p1' | 'p2' | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [roundFeedback, setRoundFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const duelQuestions = INITIAL_DUEL_QUESTIONS;
  const currentQ = duelQuestions[currentRound] || duelQuestions[0];

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isMatchActive && !matchEnded && !roundFeedback && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimeExpire();
            return 0;
          }
          if (prev <= 5) {
            soundEffects.playTick(true);
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isMatchActive, matchEnded, roundFeedback, timeLeft]);

  // Handle bot automatic buzzer reaction if in bot mode
  useEffect(() => {
    if (battleMode === 'bot' && isMatchActive && !activeBuzzer && !roundFeedback && timeLeft > 5) {
      const botReactionTime = Math.random() * 6000 + 3000;
      const botTimer = setTimeout(() => {
        if (!activeBuzzer && isMatchActive && !roundFeedback) {
          handlePressBuzzer('p2');
          // Bot picks answer after 1.5s
          setTimeout(() => {
            const isBotCorrect = Math.random() > 0.35; // 65% bot accuracy
            const ans = isBotCorrect ? currentQ.correctAnswer : (currentQ.options?.find(o => o !== currentQ.correctAnswer) || currentQ.correctAnswer);
            handleSelectAnswer(ans, 'p2');
          }, 1500);
        }
      }, botReactionTime);

      return () => clearTimeout(botTimer);
    }
  }, [battleMode, isMatchActive, activeBuzzer, currentRound, roundFeedback]);

  const handleStartDuel = () => {
    setIsMatchActive(true);
    setMatchEnded(false);
    setCurrentRound(0);
    setScore1(0);
    setScore2(0);
    setTimeLeft(15);
    setActiveBuzzer(null);
    setSelectedOption(null);
    setRoundFeedback(null);
    soundEffects.playGong();
  };

  const handlePressBuzzer = (who: 'p1' | 'p2') => {
    if (activeBuzzer || roundFeedback || matchEnded) return;
    setActiveBuzzer(who);
    soundEffects.playBuzzer();
  };

  const handleSelectAnswer = (option: string, who: 'p1' | 'p2') => {
    if (roundFeedback) return;
    setSelectedOption(option);

    const isCorrect = option === currentQ.correctAnswer;
    if (isCorrect) {
      soundEffects.playSuccess();
      if (who === 'p1') setScore1((s) => s + 10);
      else setScore2((s) => s + 10);
      setRoundFeedback({
        isCorrect: true,
        text: `To'g'ri javob! (+10 ball ${who === 'p1' ? player1Name : player2Name}ga)`
      });
    } else {
      soundEffects.playWrong();
      if (who === 'p1') setScore1((s) => Math.max(0, s - 5));
      else setScore2((s) => Math.max(0, s - 5));
      setRoundFeedback({
        isCorrect: false,
        text: `Noto'g'ri javob! (-5 ball)`
      });
    }

    // Advance round after delay
    setTimeout(() => {
      if (currentRound < duelQuestions.length - 1) {
        setCurrentRound((r) => r + 1);
        setTimeLeft(15);
        setActiveBuzzer(null);
        setSelectedOption(null);
        setRoundFeedback(null);
      } else {
        setMatchEnded(true);
        soundEffects.playSuccess();
      }
    }, 2400);
  };

  const handleTimeExpire = () => {
    soundEffects.playTimesUp();
    setRoundFeedback({
      isCorrect: false,
      text: `Vaqt tugadi! To'g'ri javob: ${currentQ.correctAnswer}`
    });

    setTimeout(() => {
      if (currentRound < duelQuestions.length - 1) {
        setCurrentRound((r) => r + 1);
        setTimeLeft(15);
        setActiveBuzzer(null);
        setSelectedOption(null);
        setRoundFeedback(null);
      } else {
        setMatchEnded(true);
      }
    }, 2400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8" id="duel-battle">
      
      {/* Header Banner */}
      <div className="bg-[#1c1510] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-amber-600 flex items-center justify-center text-slate-950 shadow-lg shadow-red-500/20">
            <Swords className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-amber-300 flex items-center gap-2">
              JAMOALARARO VA BILIMDONLAR TEZKOR DUELI
              <span className="bg-red-500/20 text-red-300 border border-red-500/40 text-[10px] px-2 py-0.5 rounded-full font-bold">
                1v1 / Blitz Arena
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/70">
              5 ta tezkor savol • Buzzer tugmasini birinchi bosgan jamoa javob beradi!
            </p>
          </div>
        </div>

        {!isMatchActive && (
          <button
            onClick={handleStartDuel}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm flex items-center space-x-2 shadow-lg shadow-amber-500/30 cursor-pointer active:scale-95 transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Duelni Boshlash ⚔️</span>
          </button>
        )}
      </div>

      {/* If match is not active: Setup Screen */}
      {!isMatchActive ? (
        <div className="bg-[#18120d] border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl max-w-2xl mx-auto space-y-6">
          <h3 className="text-lg font-black text-amber-300 text-center border-b border-amber-500/20 pb-4">
            Raqiblarni Tanlash
          </h3>

          {/* Mode switch */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                setBattleMode('pvp');
                setPlayer2Name(players[1]?.fullName || 'Malika Rustamova');
              }}
              className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                battleMode === 'pvp'
                  ? 'bg-amber-400 text-slate-950 shadow'
                  : 'bg-[#241d16] text-amber-200 hover:bg-[#2e241c]'
              }`}
            >
              1v1 Bilimdonlar
            </button>
            <button
              onClick={() => {
                setBattleMode('tvt');
                setPlayer1Name(teams[0]?.name || 'Lochinlar');
                setPlayer2Name(teams[1]?.name || 'Genius');
              }}
              className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                battleMode === 'tvt'
                  ? 'bg-amber-400 text-slate-950 shadow'
                  : 'bg-[#241d16] text-amber-200 hover:bg-[#2e241c]'
              }`}
            >
              Jamoa vs Jamoa
            </button>
            <button
              onClick={() => {
                setBattleMode('bot');
                setPlayer2Name('Zakovat AI Mastermind 🤖');
              }}
              className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                battleMode === 'bot'
                  ? 'bg-amber-400 text-slate-950 shadow'
                  : 'bg-[#241d16] text-amber-200 hover:bg-[#2e241c]'
              }`}
            >
              AI Botga qarshi
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Player 1 Selection */}
            <div className="p-4 rounded-2xl bg-[#221a13] border border-amber-500/20 space-y-2">
              <span className="text-xs font-bold text-amber-400 block">1-Ishtirokchi (Moviy burchak):</span>
              {battleMode === 'tvt' ? (
                <select
                  value={player1Name}
                  onChange={(e) => setPlayer1Name(e.target.value)}
                  className="w-full bg-[#120d09] text-amber-100 text-xs rounded-xl p-2.5 border border-amber-500/30"
                >
                  {teams.map((t) => (
                    <option key={t.id} value={t.name}>{t.name} ({t.classGrade})</option>
                  ))}
                </select>
              ) : (
                <select
                  value={player1Name}
                  onChange={(e) => setPlayer1Name(e.target.value)}
                  className="w-full bg-[#120d09] text-amber-100 text-xs rounded-xl p-2.5 border border-amber-500/30"
                >
                  {players.map((p) => (
                    <option key={p.id} value={p.fullName}>{p.fullName} ({p.teamName})</option>
                  ))}
                </select>
              )}
            </div>

            {/* Player 2 Selection */}
            <div className="p-4 rounded-2xl bg-[#221a13] border border-amber-500/20 space-y-2">
              <span className="text-xs font-bold text-red-400 block">2-Ishtirokchi (Qizil burchak):</span>
              {battleMode === 'bot' ? (
                <div className="w-full bg-[#120d09] text-amber-100 text-xs rounded-xl p-2.5 border border-amber-500/30 font-bold flex items-center gap-2">
                  <Bot className="w-4 h-4 text-red-400" />
                  <span>Zakovat AI Mastermind</span>
                </div>
              ) : battleMode === 'tvt' ? (
                <select
                  value={player2Name}
                  onChange={(e) => setPlayer2Name(e.target.value)}
                  className="w-full bg-[#120d09] text-amber-100 text-xs rounded-xl p-2.5 border border-amber-500/30"
                >
                  {teams.map((t) => (
                    <option key={t.id} value={t.name}>{t.name} ({t.classGrade})</option>
                  ))}
                </select>
              ) : (
                <select
                  value={player2Name}
                  onChange={(e) => setPlayer2Name(e.target.value)}
                  className="w-full bg-[#120d09] text-amber-100 text-xs rounded-xl p-2.5 border border-amber-500/30"
                >
                  {players.map((p) => (
                    <option key={p.id} value={p.fullName}>{p.fullName} ({p.teamName})</option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div className="pt-4 text-center">
            <button
              onClick={handleStartDuel}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-base shadow-xl shadow-amber-500/30 cursor-pointer active:scale-95 transition-all"
            >
              Jangni Boshlash! ⚡
            </button>
          </div>
        </div>
      ) : (
        /* Active Duel Arena Screen */
        <div className="space-y-6">
          
          {/* Duel Scoreboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#140e0a] border-2 border-amber-500/40 rounded-3xl p-6 shadow-2xl items-center">
            
            {/* Player 1 Card */}
            <div className={`p-4 rounded-2xl border text-center transition-all ${
              activeBuzzer === 'p1' ? 'bg-sky-500/20 border-sky-400 ring-2 ring-sky-400' : 'bg-[#201811] border-amber-500/20'
            }`}>
              <span className="text-[10px] uppercase font-bold text-sky-400 tracking-wider">1-Burchak</span>
              <h4 className="text-base sm:text-lg font-extrabold text-amber-100 truncate">{player1Name}</h4>
              <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono mt-1">
                {score1} <span className="text-xs text-amber-200/60 font-sans">ball</span>
              </div>
            </div>

            {/* Center Round & Timer */}
            <div className="text-center space-y-2">
              <div className="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-black">
                {currentRound + 1} / {duelQuestions.length} - RAUND
              </div>
              <div className="text-4xl sm:text-5xl font-mono font-black text-amber-300">
                00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
              </div>
              <p className="text-[11px] text-amber-200/60 font-bold">
                {activeBuzzer 
                  ? `${activeBuzzer === 'p1' ? player1Name : player2Name} javob bermoqda!`
                  : 'Buzzer tugmasini bosing!'}
              </p>
            </div>

            {/* Player 2 Card */}
            <div className={`p-4 rounded-2xl border text-center transition-all ${
              activeBuzzer === 'p2' ? 'bg-rose-500/20 border-rose-400 ring-2 ring-rose-400' : 'bg-[#201811] border-amber-500/20'
            }`}>
              <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider">2-Burchak</span>
              <h4 className="text-base sm:text-lg font-extrabold text-amber-100 truncate">{player2Name}</h4>
              <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono mt-1">
                {score2} <span className="text-xs text-amber-200/60 font-sans">ball</span>
              </div>
            </div>

          </div>

          {/* Duel Question Stage */}
          {!matchEnded ? (
            <div className="bg-[#1c1611] border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
              
              <div className="text-center space-y-3">
                <span className="text-xs text-amber-300 font-extrabold uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  Tezkor Blitz Savol
                </span>
                <p className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-amber-50 leading-relaxed max-w-3xl mx-auto">
                  "{currentQ?.question}"
                </p>
              </div>

              {/* Buzzer Buttons Row (If no one has pressed buzzer yet) */}
              {!activeBuzzer && !roundFeedback && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 max-w-xl mx-auto">
                  <button
                    onClick={() => handlePressBuzzer('p1')}
                    className="py-6 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 font-black text-base shadow-xl shadow-sky-500/20 flex flex-col items-center justify-center gap-1 cursor-pointer active:scale-95 transition-all"
                  >
                    <Zap className="w-6 h-6" />
                    <span>{player1Name} BUZZER</span>
                    <span className="text-[10px] opacity-80">(Birinchi bosish)</span>
                  </button>

                  <button
                    onClick={() => handlePressBuzzer('p2')}
                    disabled={battleMode === 'bot'}
                    className="py-6 rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 text-slate-950 font-black text-base shadow-xl shadow-rose-500/20 flex flex-col items-center justify-center gap-1 cursor-pointer active:scale-95 transition-all disabled:opacity-50"
                  >
                    <Zap className="w-6 h-6" />
                    <span>{player2Name} BUZZER</span>
                    <span className="text-[10px] opacity-80">{battleMode === 'bot' ? '(AI avtomatik bosadi)' : '(Birinchi bosish)'}</span>
                  </button>
                </div>
              )}

              {/* Multiple Choice Options (Enabled for whoever pressed buzzer) */}
              {activeBuzzer && !roundFeedback && currentQ?.options && (
                <div className="space-y-3 max-w-2xl mx-auto pt-2 animate-fadeIn">
                  <p className="text-center text-xs font-bold text-amber-300">
                    👉 {activeBuzzer === 'p1' ? player1Name : player2Name}, variantlardan birini tanlang:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentQ.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectAnswer(opt, activeBuzzer)}
                        className="p-4 rounded-2xl bg-[#241d16] hover:bg-amber-500/20 text-amber-100 border border-amber-500/30 font-bold text-sm text-left transition-all cursor-pointer flex items-center justify-between"
                      >
                        <span>{opt}</span>
                        <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs flex items-center justify-center font-mono">
                          {String.fromCharCode(65 + idx)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Round Feedback Banner */}
              {roundFeedback && (
                <div className={`p-6 rounded-2xl border text-center space-y-2 max-w-xl mx-auto animate-fadeIn ${
                  roundFeedback.isCorrect
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-500 text-rose-200'
                }`}>
                  <p className="text-base sm:text-lg font-black">{roundFeedback.text}</p>
                  <p className="text-xs opacity-80">{currentQ?.explanation}</p>
                  <p className="text-[11px] text-amber-300 font-bold">Keyingi raund yuklanmoqda...</p>
                </div>
              )}

            </div>
          ) : (
            /* Match Ended Winner Screen */
            <div className="bg-[#1c1611] border-2 border-amber-400 rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-6 animate-fadeIn">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-950 flex items-center justify-center mx-auto shadow-2xl shadow-amber-500/30">
                <Trophy className="w-12 h-12" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-amber-300">
                  DUEL YAKUNLANDI! 🎉
                </h3>
                <p className="text-lg sm:text-xl font-bold text-amber-100">
                  G'olib: <strong className="text-amber-400">{score1 > score2 ? player1Name : score2 > score1 ? player2Name : 'Do\'stlik (Durang)'}</strong>
                </p>
                <p className="text-sm text-amber-200/70">
                  Hisob: <strong className="font-mono text-amber-300">{score1} : {score2}</strong>
                </p>
              </div>

              <div className="flex justify-center gap-3 pt-4">
                <button
                  onClick={handleStartDuel}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-sm shadow-lg cursor-pointer"
                >
                  Qayta O'ynash ⚔️
                </button>
                <button
                  onClick={() => setIsMatchActive(false)}
                  className="px-6 py-3 rounded-2xl bg-[#241d16] text-amber-200 border border-amber-500/30 font-bold text-sm cursor-pointer"
                >
                  Raqiblarni O'zgartirish
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
