import React, { useState } from 'react';
import { QuestionPackage, PackageQuestion } from '../types';
import { 
  Search, 
  Download, 
  Bookmark, 
  ThumbsUp, 
  Eye, 
  ArrowLeft, 
  FileText, 
  HelpCircle, 
  Filter, 
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  Share2
} from 'lucide-react';

interface OpenQuestionsViewProps {
  packages: QuestionPackage[];
  searchQuery?: string;
  onDownloadPackage?: (pkg: QuestionPackage) => void;
}

export const OpenQuestionsView: React.FC<OpenQuestionsViewProps> = ({ packages, searchQuery: propSearchQuery = '', onDownloadPackage }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Barchasi');
  const [localSearchQuery, setLocalSearchQuery] = useState<string>('');
  const [selectedSeason, setSelectedSeason] = useState<string>('Barchasi');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('Barchasi');
  
  // Combined search query (from props or local input)
  const activeSearch = (localSearchQuery || propSearchQuery).trim().toLowerCase();

  // Active package view (Screenshot 2 view)
  const [activePackage, setActivePackage] = useState<QuestionPackage | null>(null);
  
  // State for showing all answers in active package
  const [showAllAnswers, setShowAllAnswers] = useState<boolean>(false);
  const [expandedAnswers, setExpandedAnswers] = useState<Record<string, boolean>>({});
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});

  const categories = [
    'Barchasi',
    'Professional',
    'Tashkilot',
    'Oliy ta\'lim',
    'O\'rta-maxsus va professional ta\'lim',
    'Maktab',
    'Mahalla'
  ];

  // Filter packages
  const filteredPackages = packages.filter((pkg) => {
    const matchesCategory = selectedCategory === 'Barchasi' || pkg.category === selectedCategory;
    const matchesSearch = 
      !activeSearch ||
      pkg.title.toLowerCase().includes(activeSearch) ||
      pkg.description.toLowerCase().includes(activeSearch) ||
      pkg.questions.some(q => 
        q.questionText.toLowerCase().includes(activeSearch) ||
        q.answer.toLowerCase().includes(activeSearch)
      );
    const matchesSeason = selectedSeason === 'Barchasi' || (pkg.season && pkg.season.includes(selectedSeason));
    const matchesLanguage = selectedLanguage === 'Barchasi' || pkg.language === selectedLanguage;

    return matchesCategory && matchesSearch && matchesSeason && matchesLanguage;
  });

  const toggleAnswer = (questionId: string) => {
    setExpandedAnswers(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setBookmarkedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleLike = (id: string, currentLikes: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLikesMap(prev => ({
      ...prev,
      [id]: (prev[id] !== undefined ? prev[id] : currentLikes) + 1
    }));
  };

  const downloadFile = (pkg: QuestionPackage, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (onDownloadPackage) {
      onDownloadPackage(pkg);
      return;
    }

    // Generate downloadable Word-compatible file
    const content = `
${pkg.title}
===========================================
Kategoriya: ${pkg.category}
Sana: ${pkg.date}
Savollar soni: ${pkg.questionCount}
Tili: ${pkg.language}

${pkg.questions.map(q => `
-------------------------------------------
${q.number}-SAVOL:
${q.questionText}
${q.note ? `Diqqat savol: ${q.note}` : ''}

JAVOB: ${q.answer}
${q.explanation ? `IZOH: ${q.explanation}` : ''}
`).join('\n')}

Manba: 44-Maktab Zakovat Intellektual Klubi Ochiq Savollar Bazasi
    `.trim();

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = pkg.wordFileName || `${pkg.title.slice(0, 30)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // If viewing a specific package
  if (activePackage) {
    return (
      <div className="py-4 font-sans text-amber-50 max-w-7xl mx-auto px-3 sm:px-4">
        
        {/* Top Control Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <button
            onClick={() => {
              setActivePackage(null);
              setShowAllAnswers(false);
            }}
            className="inline-flex items-center space-x-2 bg-[#2a2119] hover:bg-[#34291f] text-amber-200 border border-amber-500/30 font-bold px-3.5 py-2 rounded-xl transition-all w-fit cursor-pointer text-xs"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span>Paketlar ro'yxatiga qaytish</span>
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowAllAnswers(!showAllAnswers)}
              className="inline-flex items-center space-x-2 bg-[#221a13] border border-amber-500/30 hover:bg-[#2b2118] text-amber-200 font-medium px-3.5 py-2 rounded-xl transition-all text-xs cursor-pointer"
            >
              <Eye className="w-4 h-4 text-amber-400" />
              <span>{showAllAnswers ? "Barcha javoblarni yashirish" : "Barcha javoblarni ko'rish"}</span>
            </button>

            <button
              onClick={(e) => downloadFile(activePackage, e)}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-4 py-2 rounded-xl shadow-md transition-all text-xs cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Paketni yuklab olish (.docx)</span>
            </button>
          </div>
        </div>

        {/* Package Title Header Card */}
        <div className="bg-[#221a13]/90 rounded-2xl p-4 sm:p-6 shadow-md border border-amber-500/30 mb-5">
          <div className="flex items-center space-x-3 mb-2">
            <span className="bg-amber-500/20 text-amber-300 border border-amber-400/30 font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {activePackage.category}
            </span>
            <span className="text-amber-200/60 text-xs flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              {activePackage.date}
            </span>
            <span className="text-amber-200/60 text-xs">
              • {activePackage.language} tili
            </span>
          </div>

          <h1 className="text-lg md:text-xl font-extrabold text-amber-50 leading-snug uppercase mb-2">
            {activePackage.title}
          </h1>

          <p className="text-amber-200/80 text-xs leading-relaxed mb-3">
            {activePackage.description}
          </p>

          <div className="flex flex-wrap items-center gap-5 pt-3 border-t border-amber-500/20 text-xs text-amber-200/70">
            <div>
              <span className="font-bold text-amber-300 uppercase tracking-wide">Paketdagi savollar:</span>{' '}
              <span className="font-semibold text-amber-400">{activePackage.questions.length || activePackage.questionCount} ta</span>
            </div>
            <div>
              <span className="font-bold text-amber-300 uppercase tracking-wide">Paket tili:</span>{' '}
              <span className="font-semibold text-amber-100">{activePackage.language}</span>
            </div>
            <div>
              <span className="font-bold text-amber-300 uppercase tracking-wide">O'ynalgan o'yinlar:</span>{' '}
              <span className="font-semibold text-amber-100">{activePackage.playedGamesCount} marta</span>
            </div>
          </div>
        </div>

        {/* List of Questions inside this package */}
        <div className="space-y-4">
          {activePackage.questions.map((q, idx) => {
            const isAnswerVisible = showAllAnswers || expandedAnswers[q.id];
            const isBookmarked = bookmarkedIds[q.id];
            const likes = likesMap[q.id] !== undefined ? likesMap[q.id] : q.likes;

            return (
              <div 
                key={q.id || idx}
                className="bg-[#221a13]/90 rounded-2xl p-4 sm:p-5 shadow-sm border border-amber-500/25 hover:border-amber-400/40 transition-all relative group"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-400 font-extrabold text-xs flex items-center justify-center">
                      {q.number || idx + 1}
                    </div>
                    <span className="font-bold text-amber-300 text-xs tracking-wider uppercase">
                      SAVOL
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => toggleBookmark(q.id, e)}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                        isBookmarked 
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300' 
                          : 'bg-[#18120d] border-amber-500/20 text-amber-200/50 hover:text-amber-200'
                      }`}
                      title="Saqlab qo'yish"
                    >
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                    </button>

                    <button
                      onClick={(e) => handleLike(q.id, q.likes, e)}
                      className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border border-amber-500/25 bg-[#18120d] hover:bg-amber-500/15 text-amber-200 text-xs font-semibold transition-all cursor-pointer"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-amber-400" />
                      <span>{likes}</span>
                    </button>
                  </div>
                </div>

                {/* Question Content Body */}
                <div className="space-y-3">
                  <p className="text-amber-50 text-sm md:text-base leading-relaxed font-medium">
                    {q.questionText}
                  </p>

                  {/* Optional Image in Question */}
                  {q.imageUrl && (
                    <div className="my-3 overflow-hidden rounded-xl border border-amber-500/30 bg-[#120e0a] max-w-xl">
                      <img 
                        src={q.imageUrl} 
                        alt="Savol rasmi" 
                        className="w-full max-h-80 object-contain"
                      />
                    </div>
                  )}

                  {/* Note / Diqqat savol */}
                  {q.note && (
                    <div className="bg-amber-500/15 border-l-4 border-amber-400 p-2.5 rounded-r-xl text-amber-200 text-xs font-semibold">
                      {q.note}
                    </div>
                  )}

                  {/* Toggle Answer Button */}
                  <div className="pt-1">
                    <button
                      onClick={() => toggleAnswer(q.id)}
                      className="inline-flex items-center space-x-1.5 text-amber-300 bg-[#18120d] hover:bg-amber-500/20 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border border-amber-500/30 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isAnswerVisible ? "Javobni yashirish" : "Javobni ko'rish"}</span>
                    </button>

                    {/* Revealed Answer Box */}
                    {isAnswerVisible && (
                      <div className="mt-2.5 p-3.5 bg-emerald-950/60 border border-emerald-500/40 rounded-xl space-y-1.5 animate-fadeIn">
                        <div className="text-emerald-300 font-bold text-xs flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>JAVOB:</span>
                          <span className="text-emerald-100 font-extrabold text-sm ml-1">
                            {q.answer}
                          </span>
                        </div>
                        {q.explanation && (
                          <p className="text-emerald-200/80 text-xs leading-relaxed border-t border-emerald-500/20 pt-2 mt-1.5">
                            <span className="font-semibold uppercase tracking-wider text-emerald-300">Izoh:</span> {q.explanation}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    );
  }

  // Main Open Questions Packages List
  return (
    <div className="py-4 font-sans text-amber-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        
        {/* Page Title & Breadcrumb Header */}
        <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black text-amber-50 tracking-tight flex items-center gap-2.5">
              <FileText className="w-6 h-6 text-amber-400" />
              <span>Ochiq Savollar Bazasi</span>
            </h1>
            <p className="text-amber-200/70 text-xs mt-0.5">
              "Zakovat" teleo'yini va rasmiy turnirlarining savollar paketlari to'plami.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-[#221a13] px-3.5 py-1.5 rounded-xl border border-amber-500/30 text-xs font-semibold text-amber-200">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>Jami paketlar: <strong className="text-amber-400">{filteredPackages.length} ta</strong></span>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-[#221a13] hover:bg-[#2b2118] text-amber-200/80 border border-amber-500/25'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Filter and Search Bar Container */}
        <div className="bg-[#221a13]/90 rounded-2xl p-3 sm:p-4 border border-amber-500/30 mb-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5">
            
            {/* Main Search Input */}
            <div className="md:col-span-4 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-amber-400/60">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                placeholder="Savolni yoki javobni qidir..."
                className="w-full pl-9 pr-3 py-2 bg-[#16110c] border border-amber-500/25 rounded-xl text-xs font-medium text-amber-50 placeholder-amber-200/40 focus:outline-none focus:border-amber-400 transition-all"
              />
            </div>

            {/* Filter 1: Turnir */}
            <div className="md:col-span-2">
              <select
                className="w-full py-2 px-3 bg-[#16110c] border border-amber-500/25 rounded-xl text-xs font-medium text-amber-100 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="">Turnirni tanlang</option>
                <option value="kuz">Kuzgi Liga - 2026</option>
                <option value="bahor">Bahorgi Chempionat</option>
                <option value="gambit">Zakovat-Gambit</option>
              </select>
            </div>

            {/* Filter 2: Mavsum */}
            <div className="md:col-span-2">
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="w-full py-2 px-3 bg-[#16110c] border border-amber-500/25 rounded-xl text-xs font-medium text-amber-100 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="Barchasi">Mavsumni tanlang</option>
                <option value="Yozgi">Yozgi Mavsum</option>
                <option value="Bahorgi">Bahorgi Mavsum</option>
                <option value="Kuzgi">Kuzgi Mavsum</option>
              </select>
            </div>

            {/* Filter 3: Til */}
            <div className="md:col-span-2">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full py-2 px-3 bg-[#16110c] border border-amber-500/25 rounded-xl text-xs font-medium text-amber-100 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="Barchasi">Tilni tanlang</option>
                <option value="Uzbek">Uzbek</option>
                <option value="Russian">Russian</option>
              </select>
            </div>

            {/* Qidirish Button */}
            <div className="md:col-span-2">
              <button
                onClick={() => {}}
                className="w-full h-full py-2 px-4 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs rounded-xl transition-all shadow-sm flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Qidirish</span>
              </button>
            </div>

          </div>
        </div>

        {/* Packages List Cards */}
        <div className="space-y-3">
          {filteredPackages.length === 0 ? (
            <div className="bg-[#221a13]/90 rounded-2xl p-8 text-center border border-amber-500/30">
              <HelpCircle className="w-10 h-10 text-amber-400/50 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-amber-200">Birorta ham savol paketi topilmadi</h3>
              <p className="text-amber-200/60 text-xs mt-1">Qidiruv yoki kategoriya filtrini o'zgartirib ko'ring.</p>
            </div>
          ) : (
            filteredPackages.map((pkg, idx) => {
              const isBookmarked = bookmarkedIds[pkg.id];

              return (
                <div
                  key={pkg.id || idx}
                  onClick={() => setActivePackage(pkg)}
                  className="bg-[#221a13]/90 rounded-2xl p-4 sm:p-5 border border-amber-500/25 hover:border-amber-400 hover:shadow-lg transition-all cursor-pointer relative group"
                >
                  <div className="flex items-start gap-3">
                    
                    {/* Number Badge Pill */}
                    <div className="w-9 h-8 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-400 font-extrabold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </div>

                    {/* Main Details */}
                    <div className="flex-1 min-w-0">
                      
                      <div className="flex items-start justify-between gap-3">
                        <h2 className="text-xs sm:text-sm font-extrabold text-amber-50 group-hover:text-amber-300 transition-colors uppercase leading-snug">
                          {pkg.title}
                        </h2>

                        <button
                          onClick={(e) => toggleBookmark(pkg.id, e)}
                          className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                            isBookmarked 
                              ? 'text-amber-300 bg-amber-500/20' 
                              : 'text-amber-200/40 hover:text-amber-200'
                          }`}
                          title="Saqlash"
                        >
                          <Bookmark className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>

                      <p className="text-amber-200/75 text-xs mt-1 leading-relaxed line-clamp-2">
                        {pkg.description}
                      </p>

                      {/* Package Meta Info Rows */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-xs">
                        <div>
                          <span className="font-bold text-amber-300 uppercase text-[10px]">SAVOLLAR SONI:</span>
                          <span className="text-amber-100 font-semibold block md:inline md:ml-1">{pkg.questions.length || pkg.questionCount} ta</span>
                        </div>
                        <div>
                          <span className="font-bold text-amber-300 uppercase text-[10px]">TILI:</span>
                          <span className="text-amber-100 font-semibold block md:inline md:ml-1">{pkg.language}</span>
                        </div>
                      </div>

                      {/* Bottom Footer Tags & Buttons */}
                      <div className="flex flex-wrap items-center justify-between gap-2.5 mt-3 pt-2.5 border-t border-amber-500/20">
                        
                        <div className="flex items-center space-x-2">
                          <span className="bg-amber-500/20 text-amber-300 font-bold text-[10px] px-2 py-0.5 rounded-md border border-amber-400/30">
                            {pkg.category}
                          </span>
                          <span className="text-amber-200/60 text-[10px] bg-[#18120d] px-2 py-0.5 rounded-md border border-amber-500/20">
                            O'ynalgan: {pkg.playedGamesCount}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => downloadFile(pkg, e)}
                            className="inline-flex items-center space-x-1 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs px-3 py-1.5 rounded-lg transition-all shadow-xs cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Paketni yuklab olish</span>
                          </button>
                        </div>

                      </div>

                    </div>

                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};
