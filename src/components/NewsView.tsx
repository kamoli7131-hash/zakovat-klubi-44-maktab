import React, { useState } from 'react';
import { NewsArticle } from '../types';
import { Newspaper, Calendar, Eye, ArrowRight, X, User, Image as ImageIcon } from 'lucide-react';

interface NewsViewProps {
  news: NewsArticle[];
  searchQuery: string;
}

export const NewsView: React.FC<NewsViewProps> = ({ news, searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [activeImagePreview, setActiveImagePreview] = useState<string | null>(null);

  const categories = ['all', 'G\'oliblar', 'E\'lonlar', 'Rasmiy', 'Tadbirlar'];

  const filteredNews = news.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 space-y-6 text-amber-50 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Newspaper className="w-4 h-4 text-amber-400" />
            <span>44-Maktab Zakovat Xabarlari</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-amber-50 font-serif">
            YANGILIKLAR VA E'LONLAR
          </h2>
          <p className="text-amber-200/70 text-xs sm:text-sm mt-0.5">
            Klubimiz hayotidagi so'nggi voqealar, g'oliblar, turnir e'lonlari va fotoreportajlar.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black shadow-md'
                  : 'bg-[#211a13] text-amber-200/80 border border-amber-500/25 hover:bg-[#2c2219]'
              }`}
            >
              {cat === 'all' ? 'Barchasi' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredNews.map((article) => (
          <div
            key={article.id}
            onClick={() => {
              setSelectedArticle(article);
              setActiveImagePreview(article.imageUrl);
            }}
            className="bg-[#211a13]/90 border border-amber-500/30 hover:border-amber-400/60 rounded-2xl overflow-hidden transition-all shadow-xl backdrop-blur-md cursor-pointer group flex flex-col justify-between hover:-translate-y-1"
          >
            <div>
              <div className="relative h-44 overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-full uppercase shadow-md">
                  {article.category}
                </span>

                {article.images && article.images.length > 1 && (
                  <span className="absolute bottom-3 right-3 bg-black/80 text-amber-300 backdrop-blur-md text-[10px] font-bold px-2.5 py-1 rounded-lg border border-amber-500/30 flex items-center gap-1">
                    <ImageIcon className="w-3 h-3 text-amber-400" />
                    {article.images.length} ta rasm
                  </span>
                )}
              </div>

              <div className="p-4 space-y-2.5">
                <div className="flex items-center space-x-3 text-[11px] text-amber-200/60">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" /> {article.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-amber-200/50" /> {article.views} ta ko'rish
                  </span>
                </div>

                <h3 className="font-bold text-amber-50 text-sm sm:text-base leading-snug group-hover:text-amber-300 transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-amber-200/75 text-xs leading-relaxed line-clamp-3">
                  {article.summary}
                </p>
              </div>
            </div>

            <div className="px-4 pb-4 pt-2 flex items-center justify-between text-xs font-bold text-amber-300 border-t border-amber-500/20 mt-2">
              <span>Batafsil o'qish</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>

          </div>
        ))}
      </div>

      {/* Full Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#211a13] border border-amber-500/40 rounded-2xl max-w-3xl w-full p-5 sm:p-7 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto text-amber-50">
            
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 text-amber-300 hover:text-white p-1.5 rounded-lg bg-[#2a2119] border border-amber-500/30 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-[10px] px-3 py-1 rounded-full uppercase">
                {selectedArticle.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-amber-50 leading-tight font-serif pt-1">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center space-x-4 text-xs text-amber-200/70 border-b border-amber-500/20 pb-3">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-amber-400" /> {selectedArticle.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" /> {selectedArticle.date}
                </span>
              </div>
            </div>

            {/* Featured Active Image */}
            <div className="h-60 sm:h-72 rounded-xl overflow-hidden border border-amber-500/30 shadow-lg">
              <img
                src={activeImagePreview || selectedArticle.imageUrl}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Gallery Thumbnails if multiple images exist */}
            {selectedArticle.images && selectedArticle.images.length > 1 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4" />
                  <span>Maqola Fotogalereyasi ({selectedArticle.images.length} ta rasm):</span>
                </h4>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {selectedArticle.images.map((imgUrl, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImagePreview(imgUrl)}
                      className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        activeImagePreview === imgUrl ? 'border-amber-400 ring-2 ring-amber-500/50 scale-105' : 'border-amber-500/20 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt={`gallery-${index}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="text-amber-100 text-xs sm:text-sm leading-relaxed space-y-3 font-sans">
              <p className="text-amber-200/90 font-medium bg-[#18120d] p-3.5 rounded-xl border border-amber-500/20">
                {selectedArticle.summary}
              </p>
              <p className="whitespace-pre-line text-amber-100/90">
                {selectedArticle.content}
              </p>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setSelectedArticle(null)}
                className="bg-[#2a2119] hover:bg-[#342a20] border border-amber-500/30 text-amber-100 px-5 py-2 rounded-xl text-xs font-bold cursor-pointer"
              >
                Yopish
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
