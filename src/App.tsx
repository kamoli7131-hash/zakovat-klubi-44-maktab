import React, { useState } from 'react';
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
} from './types';
import { 
  INITIAL_TEAMS, 
  INITIAL_PLAYERS, 
  INITIAL_TOURNAMENTS, 
  INITIAL_QUESTIONS, 
  INITIAL_NEWS, 
  INITIAL_GALLERY,
  INITIAL_REGISTRATIONS,
  INITIAL_QUESTION_PACKAGES,
  INITIAL_SCHOOL_INFO
} from './data/initialData';

import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TeamsView } from './components/TeamsView';
import { PlayersView } from './components/PlayersView';
import { TournamentsView } from './components/TournamentsView';
import { QuestionBankView } from './components/QuestionBankView';
import { OpenQuestionsView } from './components/OpenQuestionsView';
import { NewsView } from './components/NewsView';
import { GalleryView } from './components/GalleryView';
import { AboutView } from './components/AboutView';
import { RegistrationModal } from './components/RegistrationModal';
import { TeamCabinetModal } from './components/TeamCabinetModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';

// New Features: Live Host / Projector Mode, Certificate Generator, Daily Marathon, and Duel Arena
import { LiveHostProjectorView } from './components/LiveHostProjectorView';
import { CertificatesGeneratorView } from './components/CertificatesGeneratorView';
import { DailyMarathonView } from './components/DailyMarathonView';
import { DuelBattleView } from './components/DuelBattleView';

import zakovatBg from './assets/images/zakovat_bg_1786515842559.jpg';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Persistent / dynamic application state with localStorage fallbacks
  const [teams, setTeams] = useState<Team[]>(() => {
    try {
      const saved = localStorage.getItem('zakovat44_teams');
      return saved ? JSON.parse(saved) : INITIAL_TEAMS;
    } catch {
      return INITIAL_TEAMS;
    }
  });

  const [players, setPlayers] = useState<Player[]>(() => {
    try {
      const saved = localStorage.getItem('zakovat44_players');
      return saved ? JSON.parse(saved) : INITIAL_PLAYERS;
    } catch {
      return INITIAL_PLAYERS;
    }
  });

  const [tournaments, setTournaments] = useState<Tournament[]>(() => {
    try {
      const saved = localStorage.getItem('zakovat44_tournaments');
      return saved ? JSON.parse(saved) : INITIAL_TOURNAMENTS;
    } catch {
      return INITIAL_TOURNAMENTS;
    }
  });

  const [questions, setQuestions] = useState<Question[]>(() => {
    try {
      const saved = localStorage.getItem('zakovat44_questions');
      return saved ? JSON.parse(saved) : INITIAL_QUESTIONS;
    } catch {
      return INITIAL_QUESTIONS;
    }
  });

  const [news, setNews] = useState<NewsArticle[]>(() => {
    try {
      const saved = localStorage.getItem('zakovat44_news');
      return saved ? JSON.parse(saved) : INITIAL_NEWS;
    } catch {
      return INITIAL_NEWS;
    }
  });

  const [gallery, setGallery] = useState<GalleryMedia[]>(() => {
    try {
      const saved = localStorage.getItem('zakovat44_gallery');
      return saved ? JSON.parse(saved) : INITIAL_GALLERY;
    } catch {
      return INITIAL_GALLERY;
    }
  });

  const [registrations, setRegistrations] = useState<TeamRegistration[]>(() => {
    try {
      const saved = localStorage.getItem('zakovat44_registrations');
      return saved ? JSON.parse(saved) : INITIAL_REGISTRATIONS;
    } catch {
      return INITIAL_REGISTRATIONS;
    }
  });

  const [questionPackages, setQuestionPackages] = useState<QuestionPackage[]>(() => {
    try {
      const saved = localStorage.getItem('zakovat44_question_packages');
      return saved ? JSON.parse(saved) : INITIAL_QUESTION_PACKAGES;
    } catch {
      return INITIAL_QUESTION_PACKAGES;
    }
  });

  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo>(() => {
    try {
      const saved = localStorage.getItem('zakovat44_school_info');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Clean up legacy teleoyin announcement if saved in browser storage
        if (parsed.headerAnnouncement && (parsed.headerAnnouncement.includes("teleo'yin") || parsed.headerAnnouncement.includes("teleoyin"))) {
          parsed.headerAnnouncement = '';
          parsed.headerAnnouncementLink = '';
        }
        return { ...INITIAL_SCHOOL_INFO, ...parsed };
      }
      return INITIAL_SCHOOL_INFO;
    } catch {
      return INITIAL_SCHOOL_INFO;
    }
  });

  // Dynamic Browser Tab Title
  React.useEffect(() => {
    const schoolNum = schoolInfo?.schoolNumber || '44';
    const club = schoolInfo?.clubName || 'Zakovat Intellektual Klubi';
    document.title = `${schoolNum}-Maktab ${club} | Rasmiy Portal`;
  }, [schoolInfo]);

  // Admin / Coordinator Authentication State
  const [adminCredentials, setAdminCredentials] = useState(() => {
    try {
      const saved = localStorage.getItem('zakovat44_admin_creds');
      return saved ? JSON.parse(saved) : { username: 'admin', password: 'zakovat44' };
    } catch {
      return { username: 'admin', password: 'zakovat44' };
    }
  });

  // Save to localStorage whenever state changes
  React.useEffect(() => {
    try {
      localStorage.setItem('zakovat44_teams', JSON.stringify(teams));
    } catch (e) {
      console.error(e);
    }
  }, [teams]);

  React.useEffect(() => {
    try {
      localStorage.setItem('zakovat44_players', JSON.stringify(players));
    } catch (e) {
      console.error(e);
    }
  }, [players]);

  React.useEffect(() => {
    try {
      localStorage.setItem('zakovat44_tournaments', JSON.stringify(tournaments));
    } catch (e) {
      console.error(e);
    }
  }, [tournaments]);

  React.useEffect(() => {
    try {
      localStorage.setItem('zakovat44_questions', JSON.stringify(questions));
    } catch (e) {
      console.error(e);
    }
  }, [questions]);

  React.useEffect(() => {
    try {
      localStorage.setItem('zakovat44_news', JSON.stringify(news));
    } catch (e) {
      console.error(e);
    }
  }, [news]);

  React.useEffect(() => {
    try {
      localStorage.setItem('zakovat44_gallery', JSON.stringify(gallery));
    } catch (e) {
      console.error(e);
    }
  }, [gallery]);

  React.useEffect(() => {
    try {
      localStorage.setItem('zakovat44_registrations', JSON.stringify(registrations));
    } catch (e) {
      console.error(e);
    }
  }, [registrations]);

  React.useEffect(() => {
    try {
      localStorage.setItem('zakovat44_question_packages', JSON.stringify(questionPackages));
    } catch (e) {
      console.error(e);
    }
  }, [questionPackages]);

  React.useEffect(() => {
    try {
      localStorage.setItem('zakovat44_school_info', JSON.stringify(schoolInfo));
    } catch (e) {
      console.error(e);
    }
  }, [schoolInfo]);

  React.useEffect(() => {
    try {
      localStorage.setItem('zakovat44_admin_creds', JSON.stringify(adminCredentials));
    } catch (e) {
      console.error(e);
    }
  }, [adminCredentials]);

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);

  // Team Cabinet Authentication State
  const [loggedInTeamId, setLoggedInTeamId] = useState<string | null>(null);
  const [isTeamCabinetOpen, setIsTeamCabinetOpen] = useState<boolean>(false);

  // Public modals
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Handlers
  const handleRegisterTeamSubmit = (regData: TeamRegistration) => {
    const newReg: TeamRegistration = {
      ...regData,
      id: `reg-${Date.now()}`,
      status: 'approved'
    };
    setRegistrations((prev) => [newReg, ...prev]);

    // Also auto-create active Team entry
    const newTeamObj: Team = {
      id: `t-${Date.now()}`,
      name: regData.teamName,
      classGrade: regData.classGrade,
      captain: regData.captainName,
      captainPhone: regData.captainPhone,
      username: regData.username || regData.teamName.toLowerCase().replace(/\s+/g, ''),
      password: regData.password || '123456',
      members: regData.memberNames || [regData.captainName],
      points: 0,
      gamesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      ratingRank: teams.length + 1,
      logoColor: 'from-amber-500 to-amber-700',
      motto: regData.motto || 'Mantiq va g\'alaba!',
      achievements: ['Yangi a\'zo jamoa']
    };
    setTeams((prev) => [...prev, newTeamObj]);
  };

  const handleAddPlayerToTeam = (teamId: string, player: Omit<Player, 'id'>) => {
    const newPlayer: Player = {
      ...player,
      id: `p-${Date.now()}`
    };
    setPlayers((prev) => [newPlayer, ...prev]);

    // Update members list in teams array
    setTeams((prev) => prev.map((t) => {
      if (t.id === teamId) {
        return {
          ...t,
          members: Array.from(new Set([...t.members, player.fullName]))
        };
      }
      return t;
    }));
  };

  const handleRemovePlayerFromTeam = (teamId: string, playerId: string, playerFullName: string) => {
    setPlayers((prev) => prev.filter((p) => p.id !== playerId));
    setTeams((prev) => prev.map((t) => {
      if (t.id === teamId) {
        return {
          ...t,
          members: t.members.filter((m) => !m.toLowerCase().includes(playerFullName.toLowerCase()))
        };
      }
      return t;
    }));
  };

  const handleUpdateTeamInfo = (teamId: string, motto: string, captainPhone: string) => {
    setTeams((prev) => prev.map((t) => {
      if (t.id === teamId) {
        return {
          ...t,
          motto: motto || t.motto,
          captainPhone: captainPhone || t.captainPhone
        };
      }
      return t;
    }));
  };

  const handleAddQuestion = (qData: Omit<Question, 'id' | 'likes'>) => {
    const newQ: Question = {
      ...qData,
      id: `q-${Date.now()}`,
      likes: 1
    };
    setQuestions((prev) => [newQ, ...prev]);
  };

  const handleOpenAdminPanel = () => {
    if (isAdminAuthenticated) {
      setActiveTab('admin');
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setIsAdminLoginOpen(false);
    setActiveTab('admin');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setActiveTab('home');
  };

  const handleWipeAllData = () => {
    setTeams([]);
    setPlayers([]);
    setTournaments([]);
    setQuestions([]);
    setQuestionPackages([]);
    setNews([]);
    setGallery([]);
    setRegistrations([]);
    try {
      localStorage.setItem('zakovat44_teams', '[]');
      localStorage.setItem('zakovat44_players', '[]');
      localStorage.setItem('zakovat44_tournaments', '[]');
      localStorage.setItem('zakovat44_questions', '[]');
      localStorage.setItem('zakovat44_question_packages', '[]');
      localStorage.setItem('zakovat44_news', '[]');
      localStorage.setItem('zakovat44_gallery', '[]');
      localStorage.setItem('zakovat44_registrations', '[]');
    } catch (e) {
      console.error(e);
    }
  };

  // If activeTab is 'admin' and authenticated, render full-screen Admin Dashboard
  if (activeTab === 'admin' && isAdminAuthenticated) {
    return (
      <AdminDashboard
        teams={teams}
        players={players}
        tournaments={tournaments}
        questions={questions}
        news={news}
        gallery={gallery}
        registrations={registrations}
        questionPackages={questionPackages}
        schoolInfo={schoolInfo}
        adminCredentials={adminCredentials}
        onUpdateTeams={setTeams}
        onUpdatePlayers={setPlayers}
        onUpdateTournaments={setTournaments}
        onUpdateQuestions={setQuestions}
        onUpdateNews={setNews}
        onUpdateGallery={setGallery}
        onUpdateRegistrations={setRegistrations}
        onUpdateQuestionPackages={setQuestionPackages}
        onUpdateSchoolInfo={setSchoolInfo}
        onUpdateAdminCredentials={setAdminCredentials}
        onWipeAllData={handleWipeAllData}
        onExitAdmin={() => setActiveTab('home')}
        onLogout={handleAdminLogout}
      />
    );
  }

  return (
    <div 
      className="min-h-screen text-amber-50/95 flex flex-col font-sans antialiased selection:bg-amber-500 selection:text-slate-950 relative bg-[#18130e]"
      style={{
        backgroundImage: `radial-gradient(circle at 50% 0%, rgba(212, 163, 89, 0.22), transparent 80%), linear-gradient(to bottom, rgba(22, 17, 13, 0.82), rgba(16, 12, 9, 0.94)), url(${zakovatBg})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      
      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenLogin={handleOpenAdminPanel}
        onOpenCoordinator={handleOpenAdminPanel}
        onOpenTeamCabinet={() => setIsTeamCabinetOpen(true)}
        schoolInfo={schoolInfo}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">
        
        {/* Render Tab Contents */}
        {activeTab === 'home' && (
          <div className="space-y-5 sm:space-y-6 animate-fadeIn pb-6">
            <HeroSection
              onNavigate={(tab) => setActiveTab(tab)}
              onOpenRegister={() => setIsRegisterOpen(true)}
              onOpenTeamCabinet={() => setIsTeamCabinetOpen(true)}
              schoolInfo={schoolInfo}
            />
            <OpenQuestionsView
              packages={questionPackages}
              searchQuery={searchQuery}
            />
            <TournamentsView
              tournaments={tournaments}
              onOpenRegister={() => setIsRegisterOpen(true)}
            />
            <TeamsView
              teams={teams}
              searchQuery={searchQuery}
              onOpenRegister={() => setIsRegisterOpen(true)}
            />
            <QuestionBankView
              questions={questions}
              onAddQuestion={handleAddQuestion}
            />
            <NewsView
              news={news}
              searchQuery={searchQuery}
            />
          </div>
        )}

        {activeTab === 'live-host' && (
          <div className="animate-fadeIn">
            <LiveHostProjectorView
              questions={questions}
              teams={teams}
              onUpdateTeams={setTeams}
              onExit={() => setActiveTab('home')}
            />
          </div>
        )}

        {activeTab === 'marathon' && (
          <div className="animate-fadeIn">
            <DailyMarathonView onNavigate={(tab) => setActiveTab(tab)} />
          </div>
        )}

        {activeTab === 'duel' && (
          <div className="animate-fadeIn">
            <DuelBattleView teams={teams} players={players} />
          </div>
        )}

        {activeTab === 'certificates' && (
          <div className="animate-fadeIn">
            <CertificatesGeneratorView
              teams={teams}
              players={players}
              tournaments={tournaments}
              schoolInfo={schoolInfo}
            />
          </div>
        )}

        {activeTab === 'open-questions' && (
          <div className="animate-fadeIn">
            <OpenQuestionsView
              packages={questionPackages}
              searchQuery={searchQuery}
            />
          </div>
        )}

        {activeTab === 'tournaments' && (
          <div className="animate-fadeIn">
            <TournamentsView
              tournaments={tournaments}
              onOpenRegister={() => setIsRegisterOpen(true)}
            />
          </div>
        )}

        {activeTab === 'teams' && (
          <div className="animate-fadeIn">
            <TeamsView
              teams={teams}
              searchQuery={searchQuery}
              onOpenRegister={() => setIsRegisterOpen(true)}
            />
          </div>
        )}

        {activeTab === 'players' && (
          <div className="animate-fadeIn">
            <PlayersView
              players={players}
              searchQuery={searchQuery}
            />
          </div>
        )}

        {activeTab === 'questions' && (
          <div className="animate-fadeIn">
            <QuestionBankView
              questions={questions}
              onAddQuestion={handleAddQuestion}
            />
          </div>
        )}

        {activeTab === 'news' && (
          <div className="animate-fadeIn">
            <NewsView
              news={news}
              searchQuery={searchQuery}
            />
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="animate-fadeIn">
            <GalleryView gallery={gallery} />
          </div>
        )}

        {activeTab === 'about' && (
          <div className="animate-fadeIn">
            <AboutView 
              schoolInfo={schoolInfo}
              onOpenRegister={() => setIsRegisterOpen(true)} 
            />
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer onNavigate={(tab) => setActiveTab(tab)} schoolInfo={schoolInfo} />

      {/* Modals */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onRegisterTeam={handleRegisterTeamSubmit}
      />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
        adminCredentials={adminCredentials}
      />

      <TeamCabinetModal
        isOpen={isTeamCabinetOpen}
        onClose={() => setIsTeamCabinetOpen(false)}
        teams={teams}
        players={players}
        loggedInTeamId={loggedInTeamId}
        onLoginSuccess={(teamId) => setLoggedInTeamId(teamId)}
        onLogout={() => setLoggedInTeamId(null)}
        onAddPlayerToTeam={handleAddPlayerToTeam}
        onRemovePlayerFromTeam={handleRemovePlayerFromTeam}
        onUpdateTeamInfo={handleUpdateTeamInfo}
      />

    </div>
  );
}
