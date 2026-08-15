import React, { useState } from 'react';
import { 
  Users, 
  Brain, 
  Trophy, 
  HelpCircle, 
  Newspaper, 
  Image as ImageIcon, 
  FileText, 
  School, 
  ShieldCheck, 
  Settings, 
  LogOut, 
  ArrowLeft,
  LayoutDashboard,
  CheckCircle2,
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import { 
  Team, 
  Player, 
  Tournament, 
  Question, 
  NewsArticle, 
  GalleryMedia, 
  TeamRegistration,
  QuestionPackage,
  SchoolInfo
} from '../types';
import { 
  INITIAL_TEAMS, 
  INITIAL_PLAYERS, 
  INITIAL_TOURNAMENTS, 
  INITIAL_QUESTIONS, 
  INITIAL_NEWS, 
  INITIAL_GALLERY, 
  INITIAL_QUESTION_PACKAGES, 
  INITIAL_SCHOOL_INFO, 
  INITIAL_REGISTRATIONS 
} from '../data/initialData';

import { AdminOverview } from './admin/AdminOverview';
import { AdminQuestionPackages } from './admin/AdminQuestionPackages';
import { AdminTeams } from './admin/AdminTeams';
import { AdminPlayers } from './admin/AdminPlayers';
import { AdminTournaments } from './admin/AdminTournaments';
import { AdminQuestions } from './admin/AdminQuestions';
import { AdminNews } from './admin/AdminNews';
import { AdminGallery } from './admin/AdminGallery';
import { AdminSchoolInfo } from './admin/AdminSchoolInfo';
import { AdminApplications } from './admin/AdminApplications';
import { AdminSettings } from './admin/AdminSettings';

export type AdminTab = 
  | 'overview'
  | 'question-packages'
  | 'teams'
  | 'players'
  | 'tournaments'
  | 'questions'
  | 'news'
  | 'gallery'
  | 'school-info'
  | 'applications'
  | 'settings';

interface AdminDashboardProps {
  teams: Team[];
  players: Player[];
  tournaments: Tournament[];
  questions: Question[];
  news: NewsArticle[];
  gallery: GalleryMedia[];
  registrations: TeamRegistration[];
  questionPackages: QuestionPackage[];
  schoolInfo: SchoolInfo;
  adminCredentials: { username: string; password: string };
  onUpdateTeams: (teams: Team[]) => void;
  onUpdatePlayers: (players: Player[]) => void;
  onUpdateTournaments: (tournaments: Tournament[]) => void;
  onUpdateQuestions: (questions: Question[]) => void;
  onUpdateNews: (news: NewsArticle[]) => void;
  onUpdateGallery: (gallery: GalleryMedia[]) => void;
  onUpdateRegistrations: (registrations: TeamRegistration[]) => void;
  onUpdateQuestionPackages: (packages: QuestionPackage[]) => void;
  onUpdateSchoolInfo: (schoolInfo: SchoolInfo) => void;
  onUpdateAdminCredentials: (cred: { username: string; password: string }) => void;
  onWipeAllData?: () => void;
  onExitAdmin: () => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  teams,
  players,
  tournaments,
  questions,
  news,
  gallery,
  registrations,
  questionPackages,
  schoolInfo,
  adminCredentials,
  onUpdateTeams,
  onUpdatePlayers,
  onUpdateTournaments,
  onUpdateQuestions,
  onUpdateNews,
  onUpdateGallery,
  onUpdateRegistrations,
  onUpdateQuestionPackages,
  onUpdateSchoolInfo,
  onUpdateAdminCredentials,
  onWipeAllData,
  onExitAdmin,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleRestoreAllData = (backup: any) => {
    if (backup.schoolInfo) onUpdateSchoolInfo(backup.schoolInfo);
    if (backup.teams) onUpdateTeams(backup.teams);
    if (backup.players) onUpdatePlayers(backup.players);
    if (backup.tournaments) onUpdateTournaments(backup.tournaments);
    if (backup.questions) onUpdateQuestions(backup.questions);
    if (backup.news) onUpdateNews(backup.news);
    if (backup.gallery) onUpdateGallery(backup.gallery);
    if (backup.questionPackages) onUpdateQuestionPackages(backup.questionPackages);
    if (backup.registrations) onUpdateRegistrations(backup.registrations);
  };

  const handleResetToDefaults = () => {
    onUpdateTeams(INITIAL_TEAMS);
    onUpdatePlayers(INITIAL_PLAYERS);
    onUpdateTournaments(INITIAL_TOURNAMENTS);
    onUpdateQuestions(INITIAL_QUESTIONS);
    onUpdateNews(INITIAL_NEWS);
    onUpdateGallery(INITIAL_GALLERY);
    onUpdateQuestionPackages(INITIAL_QUESTION_PACKAGES);
    onUpdateSchoolInfo(INITIAL_SCHOOL_INFO);
    onUpdateRegistrations(INITIAL_REGISTRATIONS);
  };

  const pendingCount = registrations.filter(r => r.status === 'pending').length;

  const navItems: Array<{ id: AdminTab; label: string; icon: React.ElementType; badge?: number }> = [
    { id: 'overview', label: 'Boshqaruv Paneli', icon: LayoutDashboard },
    { id: 'question-packages', label: "Savol To'plamlari (Word)", icon: FileText, badge: questionPackages.length },
    { id: 'teams', label: 'Jamoalar (CRUD)', icon: Users, badge: teams.length },
    { id: 'players', label: 'Bilimdonlar (CRUD)', icon: Brain, badge: players.length },
    { id: 'tournaments', label: 'Turnirlar & Excel', icon: Trophy, badge: tournaments.length },
    { id: 'questions', label: 'Viktorina Savollari', icon: HelpCircle, badge: questions.length },
    { id: 'news', label: "Yangiliklar va E'lonlar", icon: Newspaper, badge: news.length },
    { id: 'gallery', label: 'Fotogalereya', icon: ImageIcon, badge: gallery.length },
    { id: 'school-info', label: 'Maktab va FAQ', icon: School },
    { id: 'applications', label: 'Jamoa Arizalari', icon: CheckCircle2, badge: pendingCount > 0 ? pendingCount : undefined },
    { id: 'settings', label: 'Sozlamalar & Backup', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#140f0b] text-amber-50 font-sans flex flex-col selection:bg-amber-500 selection:text-slate-950">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-xs px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-2 border border-amber-300 animate-bounce">
          <Sparkles className="w-4 h-4 fill-slate-950" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="h-16 border-b border-amber-500/20 bg-[#1c1611]/90 backdrop-blur-md px-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="md:hidden p-2 text-amber-400 hover:text-white rounded-xl bg-[#241c15] border border-amber-500/25 cursor-pointer"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-slate-950 font-serif text-sm shadow-md">
              44
            </div>
            <div>
              <h1 className="text-xs sm:text-sm font-black text-amber-50 font-serif tracking-tight">
                ZAKOVAT KLUBI • ADMIN PORTAL
              </h1>
              <span className="text-[10px] text-amber-300/70 font-semibold">
                To'liq Ma'lumotlar Boshqaruvi (Full CRUD)
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={onExitAdmin}
            className="bg-[#241c15] hover:bg-[#32271e] text-amber-300 border border-amber-500/30 text-xs font-bold px-3 sm:px-4 py-2 rounded-xl flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Saytga Qaytish</span>
          </button>

          <button
            onClick={onLogout}
            className="bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-500/30 text-xs font-bold px-3 sm:px-4 py-2 rounded-xl flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Chiqish</span>
          </button>
        </div>
      </header>

      {/* Main Layout (Sidebar + Content) */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar Desktop & Mobile */}
        <aside className={`
          fixed md:static inset-y-0 left-0 z-40 w-64 bg-[#18120d] border-r border-amber-500/20 p-4 space-y-2 flex flex-col justify-between transition-transform duration-300 md:translate-x-0
          ${isMobileSidebarOpen ? 'translate-x-0 top-16 shadow-2xl' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="space-y-1 overflow-y-auto max-h-[calc(100vh-8rem)]">
            <div className="text-[10px] font-bold text-amber-400/60 uppercase tracking-wider px-3 mb-2">
              Boshqaruv Bo'limlari
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                      : 'text-amber-200/80 hover:bg-[#241c15] hover:text-amber-100'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                      isActive
                        ? 'bg-slate-950 text-amber-400'
                        : item.id === 'applications' && pendingCount > 0
                        ? 'bg-amber-500 text-slate-950 animate-pulse'
                        : 'bg-[#241c15] text-amber-300 border border-amber-500/20'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-3 bg-[#211a13] border border-amber-500/20 rounded-xl text-[11px] text-amber-200/60 text-center">
            44-Maktab Zakovat v2.6<br />
            <span className="text-emerald-400 font-semibold">Tizim Faol Holatda</span>
          </div>
        </aside>

        {/* Main View Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[calc(100vh-4rem)]">
          {activeTab === 'overview' && (
            <AdminOverview
              teams={teams}
              players={players}
              tournaments={tournaments}
              questions={questions}
              news={news}
              gallery={gallery}
              registrations={registrations}
              questionPackages={questionPackages}
              schoolInfo={schoolInfo}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onRestoreAllData={handleRestoreAllData}
              onResetToDefaults={handleResetToDefaults}
              showToast={showToast}
            />
          )}

          {activeTab === 'question-packages' && (
            <AdminQuestionPackages
              questionPackages={questionPackages}
              onUpdateQuestionPackages={onUpdateQuestionPackages}
              showToast={showToast}
            />
          )}

          {activeTab === 'teams' && (
            <AdminTeams
              teams={teams}
              onUpdateTeams={onUpdateTeams}
              showToast={showToast}
            />
          )}

          {activeTab === 'players' && (
            <AdminPlayers
              players={players}
              teams={teams}
              onUpdatePlayers={onUpdatePlayers}
              showToast={showToast}
            />
          )}

          {activeTab === 'tournaments' && (
            <AdminTournaments
              tournaments={tournaments}
              onUpdateTournaments={onUpdateTournaments}
              showToast={showToast}
            />
          )}

          {activeTab === 'questions' && (
            <AdminQuestions
              questions={questions}
              onUpdateQuestions={onUpdateQuestions}
              showToast={showToast}
            />
          )}

          {activeTab === 'news' && (
            <AdminNews
              news={news}
              onUpdateNews={onUpdateNews}
              showToast={showToast}
            />
          )}

          {activeTab === 'gallery' && (
            <AdminGallery
              gallery={gallery}
              onUpdateGallery={onUpdateGallery}
              showToast={showToast}
            />
          )}

          {activeTab === 'school-info' && (
            <AdminSchoolInfo
              schoolInfo={schoolInfo}
              onUpdateSchoolInfo={onUpdateSchoolInfo}
              showToast={showToast}
            />
          )}

          {activeTab === 'applications' && (
            <AdminApplications
              registrations={registrations}
              teams={teams}
              players={players}
              onUpdateRegistrations={onUpdateRegistrations}
              onUpdateTeams={onUpdateTeams}
              onUpdatePlayers={onUpdatePlayers}
              showToast={showToast}
            />
          )}

          {activeTab === 'settings' && (
            <AdminSettings
              adminCredentials={adminCredentials}
              schoolInfo={schoolInfo}
              teams={teams}
              players={players}
              tournaments={tournaments}
              questions={questions}
              news={news}
              gallery={gallery}
              registrations={registrations}
              questionPackages={questionPackages}
              onUpdateAdminCredentials={onUpdateAdminCredentials}
              onRestoreAllData={handleRestoreAllData}
              onResetToDefaults={handleResetToDefaults}
              onWipeAllData={onWipeAllData}
              showToast={showToast}
            />
          )}
        </main>

      </div>

    </div>
  );
};
