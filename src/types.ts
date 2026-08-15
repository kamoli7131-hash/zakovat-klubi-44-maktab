export interface TeamGameScore {
  gameDate: string;
  roundTitle: string;
  round1: number;
  round2: number;
  round3: number;
  total: number;
  rank: number;
}

export interface Team {
  id: string;
  name: string;
  classGrade: string; // e.g. "11-A", "10-B"
  captain: string;
  captainPhone?: string;
  username?: string; // Team Cabinet login
  password?: string; // Team Cabinet password
  members: string[];
  points: number;
  gamesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  ratingRank: number;
  logoColor: string;
  motto?: string;
  achievements: string[];
  gameHistory?: TeamGameScore[];
}

export interface Player {
  id: string;
  fullName: string;
  teamName: string;
  classGrade: string;
  role: 'Kapitan' | 'A\'zo' | 'Ekspert';
  bestScore: number;
  correctAnswers: number;
  avatarUrl: string;
  badge: string;
  bio?: string;
}

export interface TournamentRound {
  roundNumber: number;
  title: string;
  date: string;
  time: string;
  venue: string; // e.g. "44-Maktab Akt Zali"
  status: 'Kutilmoqda' | 'Bajarilmoqda' | 'Yakunlangan';
  teamsCount: number;
  winnerTeam?: string;
}

export interface TournamentExcelScoreRow {
  teamName: string;
  round1: number;
  round2: number;
  round3: number;
  total: number;
  rank: number;
}

export interface TournamentExcelResult {
  id: string;
  fileName: string;
  uploadDate: string;
  roundTitle: string;
  scores: TournamentExcelScoreRow[];
}

export interface Tournament {
  id: string;
  title: string;
  season: string; // "Kuz-2026", "Bahor-2026"
  description: string;
  startDate: string;
  endDate: string;
  registrationStartDate?: string;
  registrationEndDate?: string;
  isRegistrationOpen?: boolean;
  status: 'O\'tkazilmoqda' | 'Ro\'yxatga olish' | 'Yakunlangan';
  rounds: TournamentRound[];
  champion?: string;
  runnerUp?: string;
  thirdPlace?: string;
  excelResults?: TournamentExcelResult[];
}

export interface Question {
  id: string;
  questionText: string;
  category: 'Mantiq' | 'Tarix' | 'Adabiyot' | 'Fan va Texnika' | 'Geografiya' | 'Boshqotirma';
  difficulty: 'Oson' | 'O\'rta' | 'Murakkab';
  answer: string;
  explanation: string;
  source: string;
  author: string;
  likes: number;
  imageUrl?: string;
  mediaType?: 'text' | 'image' | 'audio' | 'video';
  audioUrl?: string;
  videoUrl?: string;
  audioTitle?: string;
}

export interface PackageQuestion {
  id: string;
  number: number;
  questionText: string;
  imageUrl?: string;
  mediaType?: 'text' | 'image' | 'audio' | 'video';
  audioUrl?: string;
  videoUrl?: string;
  audioTitle?: string;
  answer: string;
  explanation?: string;
  note?: string; // "Diqqat savol: ..."
  likes: number;
  isBookmarked?: boolean;
}

export interface LiveTeamAnswer {
  id: string;
  questionId: string;
  teamName: string;
  answerText: string;
  submittedAt: string;
  secondsUsed: number;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface DailyQuestionRecord {
  id: string;
  date: string;
  questionText: string;
  category: string;
  difficulty: string;
  answer: string;
  hints: string[];
  explanation: string;
  funFact?: string;
  imageUrl?: string;
  mediaType?: 'text' | 'image' | 'audio' | 'video';
  audioUrl?: string;
}

export interface CertificateData {
  id: string;
  type: '1st_place' | '2nd_place' | '3rd_place' | 'best_player' | 'best_captain' | 'active_participant';
  recipientName: string;
  teamName?: string;
  classGrade?: string;
  tournamentTitle: string;
  date: string;
  schoolName: string;
  coordinatorName: string;
  certificateNumber: string;
  qrCodeUrl?: string;
  customNotes?: string;
}

export interface DuelRoundQuestion {
  id: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
}

export interface QuestionPackage {
  id: string;
  title: string;
  category: 'Professional' | 'Tashkilot' | 'Oliy ta\'lim' | 'O\'rta-maxsus va professional ta\'lim' | 'Maktab' | 'Mahalla';
  description: string;
  questionCount: number;
  language: string; // 'Uzbek', 'Russian'
  date: string;
  season?: string;
  playedGamesCount: number;
  downloadUrl?: string; // docx download or simulated link
  wordFileName?: string;
  questions: PackageQuestion[];
  isBookmarked?: boolean;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  category: 'G\'oliblar' | 'E\'lonlar' | 'Rasmiy' | 'Tadbirlar';
  imageUrl: string;
  images?: string[]; // Multiple images support
  author: string;
  views: number;
}

export interface GalleryMedia {
  id: string;
  title: string;
  date: string;
  category: 'Turnirlar' | 'Taqdirlash' | 'Treninglar';
  imageUrl: string;
  caption: string;
}

export interface TeamRegistration {
  id: string;
  teamName: string;
  classGrade: string;
  captainName: string;
  captainPhone: string;
  username?: string;
  password?: string;
  memberNames: string[];
  motto: string;
  registrationDate: string;
  status: 'pending' | 'approved' | 'rejected';
  selectedTournamentId?: string;
}

export interface SchoolInfo {
  schoolName: string;
  schoolNumber: string;
  clubName: string;
  motto: string;
  address: string;
  phone: string;
  email: string;
  telegramChannel: string;
  youtubeChannel?: string;
  headerAnnouncement?: string;
  headerAnnouncementLink?: string;
  footerDescription?: string;
  footerCopyright?: string;
  coordinatorName: string;
  coordinatorPhone: string;
  historyAndAbout: string;
  clubRules: string;
  workingHours: string;
  faqList: Array<{ question: string; answer: string }>;
  [key: string]: any;
}
