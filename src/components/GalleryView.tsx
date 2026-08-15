import React, { useState } from 'react';
import { GalleryMedia } from '../types';
import { Image as ImageIcon, Calendar, X, ZoomIn } from 'lucide-react';

interface GalleryViewProps {
  gallery: GalleryMedia[];
}

export const GalleryView: React.FC<GalleryViewProps> = ({ gallery }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeMedia, setActiveMedia] = useState<GalleryMedia | null>(null);

  const categories = ['all', 'Turnirlar', 'Taqdirlash', 'Treninglar'];

  const filteredGallery = gallery.filter((item) => {
    return selectedCategory === 'all' || item.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 space-y-6 text-amber-50 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ImageIcon className="w-4 h-4 text-amber-400" />
            <span>44-Maktab Zakovat Foto va Medialari</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-amber-50 font-serif">
            FOTO GALLEREYA
          </h2>
          <p className="text-amber-200/70 text-xs sm:text-sm mt-0.5">
            Intellektual bellashuvlar, g'oliblarni taqdirlash va qiziqarli o'yinlardan yorqin lahzalar.
          </p>
        </div>

        {/* Categories */}
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

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredGallery.map((media) => (
          <div
            key={media.id}
            onClick={() => setActiveMedia(media)}
            className="bg-[#211a13]/90 border border-amber-500/30 hover:border-amber-400/60 rounded-2xl overflow-hidden shadow-xl cursor-pointer group relative backdrop-blur-md transition-all hover:-translate-y-1"
          >
            <div className="h-56 relative overflow-hidden">
              <img
                src={media.imageUrl}
                alt={media.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-[#120e0a]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-amber-300 font-black text-xs gap-2">
                <ZoomIn className="w-5 h-5 text-amber-400" />
                <span>Kattalashtirish</span>
              </div>
            </div>

            <div className="p-4 space-y-1.5">
              <span className="text-[10px] bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black px-2.5 py-0.5 rounded-full uppercase">
                {media.category}
              </span>
              <h4 className="font-bold text-amber-50 text-sm line-clamp-1 group-hover:text-amber-300 transition-colors">
                {media.title}
              </h4>
              <p className="text-amber-200/60 text-xs flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400/60" /> {media.date}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeMedia && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="max-w-4xl w-full bg-[#211a13] border border-amber-500/40 rounded-2xl p-5 sm:p-6 space-y-4 relative shadow-2xl text-amber-50">
            <button
              onClick={() => setActiveMedia(null)}
              className="absolute top-4 right-4 text-amber-300 hover:text-white p-2 rounded-xl bg-[#2a2119] border border-amber-500/30 z-10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] rounded-xl overflow-hidden border border-amber-500/20 flex items-center justify-center bg-black">
              <img
                src={activeMedia.imageUrl}
                alt={activeMedia.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="space-y-1 pt-2">
              <h3 className="text-xl font-black text-amber-50 font-serif">{activeMedia.title}</h3>
              <p className="text-amber-200/80 text-xs italic">{activeMedia.caption}</p>
              <p className="text-amber-400 text-xs pt-1 font-semibold">{activeMedia.date} • {activeMedia.category}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
