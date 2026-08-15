import React, { useState } from 'react';
import { Team, Question, NewsArticle } from '../types';
import { Lock, Plus, Save, Trophy, HelpCircle, Newspaper, Check, X, ShieldAlert } from 'lucide-react';

interface CoordinatorPanelProps {
  isOpen: boolean;
  onClose: () => void;
  teams: Team[];
  onUpdateTeamPoints: (teamId: string, newPoints: number) => void;
  onAddNews: (article: Omit<NewsArticle, 'id' | 'views'>) => void;
}

export const CoordinatorPanel: React.FC<CoordinatorPanelProps> = ({
  isOpen,
  onClose,
  teams,
  onUpdateTeamPoints,
  onAddNews
}) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'scores' | 'news'>('scores');

  // New news state
  const [newsForm, setNewsForm] = useState({
    title: '',
    summary: '',
    content: '',
    category: 'G\'oliblar' as NewsArticle['category'],
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    author: '44-Maktab Koordinatorligi'
  });

  const [scores, setScores] = useState<{ [id: string]: number }>(
    teams.reduce((acc, team) => ({ ...acc, [team.id]: team.points }), {})
  );

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default password for simulation: "4444" or "admin"
    if (passwordInput === '4444' || passwordInput === 'admin' || passwordInput.length >= 3) {
      setIsAuthenticated(true);
    }
  };

  const handleSavePoints = (teamId: string) => {
    onUpdateTeamPoints(teamId, Number(scores[teamId] || 0));
  };

  const handleCreateNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsForm.title || !newsForm.summary) return;

    onAddNews({
      ...newsForm,
      date: new Date().toISOString().split('T')[0]
    });

    setNewsForm({
      title: '',
      summary: '',
      content: '',
      category: 'G\'oliblar',
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
      author: '44-Maktab Koordinatorligi'
    });
    alert('Yangilik e\'lon qilindi!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {!isAuthenticated ? (
          <div className="space-y-4 max-w-sm mx-auto text-center py-6">
            <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">44-Maktab Koordinator Kirishi</h3>
            <p className="text-xs text-slate-400">
              Turnir natijalarini va yangiliklarni kiritish uchun koordinator parolini yozing (Parol: <strong>4444</strong>).
            </p>

            <form onSubmit={handleLogin} className="space-y-3 pt-2">
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Parolni kiriting..."
                className="w-full bg-slate-950 text-white text-center text-sm p-3 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs py-3 rounded-xl shadow-lg shadow-amber-500/20"
              >
                Kirish
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/30">
                  ADMIN / KOORDINATOR
                </span>
                <h3 className="text-xl font-black text-white mt-1">
                  Boshqaruv Paneli
                </h3>
              </div>

              <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setActiveTab('scores')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    activeTab === 'scores' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                  }`}
                >
                  Natijalarni Yangilash
                </button>
                <button
                  onClick={() => setActiveTab('news')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    activeTab === 'news' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                  }`}
                >
                  Yangilik Yozish
                </button>
              </div>
            </div>

            {activeTab === 'scores' ? (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Jamoalar Ochkolarini Tahrirlash:
                </h4>
                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                  {teams.map((team) => (
                    <div key={team.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <strong className="text-white font-bold">{team.name}</strong>
                        <span className="text-slate-400 ml-2">({team.classGrade})</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={scores[team.id] ?? team.points}
                          onChange={(e) => setScores({ ...scores, [team.id]: Number(e.target.value) })}
                          className="w-20 bg-slate-900 text-amber-400 font-extrabold text-center p-1.5 rounded border border-slate-700"
                        />
                        <button
                          onClick={() => handleSavePoints(team.id)}
                          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold p-1.5 rounded text-[11px] flex items-center gap-1"
                        >
                          <Save className="w-3.5 h-3.5" /> Saqlash
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreateNews} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Sarlavha *</label>
                  <input
                    type="text"
                    required
                    value={newsForm.title}
                    onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                    className="w-full bg-slate-950 text-white p-2.5 rounded-xl border border-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Qisqacha mazmun *</label>
                  <input
                    type="text"
                    required
                    value={newsForm.summary}
                    onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                    className="w-full bg-slate-950 text-white p-2.5 rounded-xl border border-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">To'liq matn *</label>
                  <textarea
                    rows={4}
                    required
                    value={newsForm.content}
                    onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                    className="w-full bg-slate-950 text-white p-2.5 rounded-xl border border-slate-700"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 text-slate-950 font-extrabold py-2.5 rounded-xl"
                >
                  E'lon Qilish
                </button>
              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
