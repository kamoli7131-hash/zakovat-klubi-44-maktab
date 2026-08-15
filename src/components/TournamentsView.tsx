import React, { useState } from 'react';
import { Tournament } from '../types';
import { Trophy, Calendar, MapPin, Clock, Award, CheckCircle2, AlertCircle, ChevronRight, Users, FileSpreadsheet } from 'lucide-react';

interface TournamentsViewProps {
  tournaments: Tournament[];
  onOpenRegister: () => void;
}

export const TournamentsView: React.FC<TournamentsViewProps> = ({ tournaments, onOpenRegister }) => {
  const [activeTourId, setActiveTourId] = useState<string>(tournaments[0]?.id || '');

  const currentTour = tournaments.find((t) => t.id === activeTourId) || tournaments[0];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 space-y-6 text-amber-50 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>44-Maktab Intellektual Turnirlari</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-amber-50 font-serif">
            TURNIRLAR VA LIGALAR
          </h2>
          <p className="text-amber-200/70 text-xs sm:text-sm mt-0.5">
            Maktab ichki chempionatlari, kubok bahslari va bosqichma-bosqich o'yinlar jadvali.
          </p>
        </div>

        <button
          onClick={onOpenRegister}
          className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs transition-all shadow-lg shadow-amber-500/20 cursor-pointer active:scale-95"
        >
          Turnirga Jamoani Ro'yxatdan O'tkazish
        </button>
      </div>

      {/* Tournament Selector Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {tournaments.map((tour) => (
          <button
            key={tour.id}
            onClick={() => setActiveTourId(tour.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 border cursor-pointer ${
              activeTourId === tour.id
                ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 border-amber-300 shadow-lg shadow-amber-500/20'
                : 'bg-[#211a13]/90 text-amber-100/80 border-amber-500/25 hover:border-amber-400/50 hover:bg-[#2c2219]'
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{tour.title}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                activeTourId === tour.id
                  ? 'bg-slate-950 text-amber-300'
                  : 'bg-[#18120d] text-amber-400 border border-amber-500/30'
              }`}>
                {tour.season}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Tournament Overview Box */}
      {currentTour && (
        <div className="bg-[#211a13]/90 border border-amber-500/30 rounded-2xl p-5 sm:p-7 space-y-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/20 pb-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold px-3 py-1 rounded-full">
                  {currentTour.season} Mavsumi
                </span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  currentTour.status === 'Ro\'yxatga olish'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse'
                    : 'bg-[#18120d] text-amber-200/70 border border-amber-500/20'
                }`}>
                  {currentTour.status}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-amber-50 font-serif">
                {currentTour.title}
              </h3>
              <p className="text-amber-200/80 text-xs sm:text-sm max-w-3xl leading-relaxed">
                {currentTour.description}
              </p>

              {/* Registration Period Info */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-amber-300 bg-[#140f0a] p-3 rounded-xl border border-amber-500/25 w-fit">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Ro'yxatdan o'tish muddati: <strong className="text-amber-100">{currentTour.registrationStartDate || '2026-08-01'} - {currentTour.registrationEndDate || '2026-08-30'}</strong></span>
                </div>
                <span className="text-amber-900/60">|</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Ro'yxatdan o'tish holati: <strong className={currentTour.isRegistrationOpen ? 'text-emerald-400' : 'text-rose-400'}>{currentTour.isRegistrationOpen ? 'OCHIQ' : 'YOPILGAN'}</strong></span>
                </div>
              </div>
            </div>

            {/* Winner Badge if completed */}
            {currentTour.champion && (
              <div className="bg-[#483313] border border-amber-400/40 p-4 rounded-2xl text-amber-200 text-xs space-y-1 shrink-0 shadow-lg">
                <div className="font-black text-amber-300 flex items-center gap-1.5 text-xs uppercase tracking-wide">
                  <Trophy className="w-4 h-4 text-amber-400" /> CHEMPION JAMOA:
                </div>
                <div className="text-lg font-black text-white">{currentTour.champion}</div>
                {currentTour.runnerUp && (
                  <div className="text-amber-200/70 text-[11px]">2-o'rin: {currentTour.runnerUp}</div>
                )}
              </div>
            )}
          </div>

          {/* Rounds List */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" /> Turnir Bosqichlari va Turlar Jadvali
            </h4>

            {currentTour.rounds.length === 0 ? (
              <div className="bg-[#140f0a] p-6 rounded-xl border border-amber-500/20 text-center text-amber-200/60 text-xs">
                Ushbu turnir yakunlangan. Tez orada yangi bosqich jadvali e'lon qilinadi.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {currentTour.rounds.map((round) => (
                  <div
                    key={round.roundNumber}
                    className="bg-[#18120d] border border-amber-500/25 hover:border-amber-400/50 rounded-xl p-4 space-y-2.5 transition-all"
                  >
                    <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
                      <span className="text-xs font-black text-amber-400">
                        {round.roundNumber}-TUR
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        round.status === 'Yakunlangan'
                          ? 'bg-[#2a2119] text-amber-200/60'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                      }`}>
                        {round.status}
                      </span>
                    </div>

                    <h5 className="font-bold text-amber-50 text-xs sm:text-sm">
                      {round.title}
                    </h5>

                    <div className="space-y-1 text-xs text-amber-200/70 pt-0.5">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-400/60" />
                        <span>Sana: <strong className="text-amber-100">{round.date}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-400/60" />
                        <span>Vaqt: <strong className="text-amber-100">{round.time}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-400/60" />
                        <span>Manzil: <strong className="text-amber-300">{round.venue}</strong></span>
                      </div>
                    </div>

                    {round.winnerTeam && (
                      <div className="pt-2 border-t border-amber-500/20 text-xs text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> G'olib: {round.winnerTeam}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Excel Uploaded Match Score Tables Display Section */}
          {currentTour.excelResults && currentTour.excelResults.length > 0 && (
            <div className="space-y-3 pt-3 border-t border-amber-500/20">
              <h4 className="text-xs font-extrabold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>O'yin Natijalari (Rasmiy Excel Jadvali)</span>
              </h4>

              <div className="space-y-3">
                {currentTour.excelResults.map((ex) => (
                  <div key={ex.id} className="bg-[#18120d] rounded-xl p-4 border border-amber-500/25 space-y-2.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-amber-500/20 pb-2">
                      <span className="font-bold text-amber-100 text-xs">{ex.roundTitle}</span>
                      <span className="text-[10px] text-amber-200/50">Excel fayl: {ex.fileName} ({ex.uploadDate})</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-amber-100">
                        <thead className="bg-[#241c15] text-amber-300 font-bold uppercase text-[10px]">
                          <tr>
                            <th className="p-2">O'rin</th>
                            <th className="p-2">Jamoa Nomi</th>
                            <th className="p-2 text-center">1-Tur</th>
                            <th className="p-2 text-center">2-Tur</th>
                            <th className="p-2 text-center">3-Tur</th>
                            <th className="p-2 text-center font-black text-amber-400">Jami</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-amber-500/15">
                          {ex.scores.map((sc, idx) => (
                            <tr key={idx} className="hover:bg-[#241c15]/60">
                              <td className="p-2 font-bold text-amber-400">#{sc.rank}</td>
                              <td className="p-2 font-bold text-amber-50">{sc.teamName}</td>
                              <td className="p-2 text-center">{sc.round1}</td>
                              <td className="p-2 text-center">{sc.round2}</td>
                              <td className="p-2 text-center">{sc.round3}</td>
                              <td className="p-2 text-center font-black text-amber-300 text-sm">{sc.total}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
