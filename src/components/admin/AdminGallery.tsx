import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Save, 
  X, 
  Calendar,
  Eye
} from 'lucide-react';
import { GalleryMedia } from '../../types';

interface AdminGalleryProps {
  gallery: GalleryMedia[];
  onUpdateGallery: (gallery: GalleryMedia[]) => void;
  showToast: (msg: string) => void;
}

export const AdminGallery: React.FC<AdminGalleryProps> = ({
  gallery,
  onUpdateGallery,
  showToast
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMediaId, setEditingMediaId] = useState<string | null>(null);
  const [mediaForm, setMediaForm] = useState<Partial<GalleryMedia>>({
    title: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Turnirlar',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
    caption: ''
  });

  const handleOpenCreateModal = () => {
    setEditingMediaId(null);
    setMediaForm({
      title: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Turnirlar',
      imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
      caption: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: GalleryMedia) => {
    setEditingMediaId(item.id);
    setMediaForm({ ...item });
    setIsModalOpen(true);
  };

  const handleSaveMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaForm.title || !mediaForm.imageUrl) {
      alert("Sarlavha va rasm URL manzilini kiriting!");
      return;
    }

    if (editingMediaId) {
      const updated = gallery.map(g => 
        g.id === editingMediaId ? { ...g, ...mediaForm } as GalleryMedia : g
      );
      onUpdateGallery(updated);
      showToast("Foto ma'lumotlari muvaffaqiyatli yangilandi!");
    } else {
      const newMedia: GalleryMedia = {
        id: `g-${Date.now()}`,
        title: mediaForm.title || 'Foto',
        date: mediaForm.date || new Date().toISOString().split('T')[0],
        category: mediaForm.category || 'Turnirlar',
        imageUrl: mediaForm.imageUrl || 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
        caption: mediaForm.caption || ''
      };
      onUpdateGallery([newMedia, ...gallery]);
      showToast("Yangi foto galereyaga qo'shildi!");
    }
    setIsModalOpen(false);
  };

  const handleDeleteMedia = (id: string) => {
    if (confirm("Ushbu fotoni galereyadan o'chirmoqchimisiz?")) {
      onUpdateGallery(gallery.filter(g => g.id !== id));
      showToast("Foto o'chirildi.");
    }
  };

  const filtered = gallery.filter(g => {
    const matchesSearch = !searchQuery || 
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.caption.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'Barchasi' || g.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 animate-fadeIn font-sans text-amber-50">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ImageIcon className="w-4 h-4" />
            <span>Fotogalereya va Medialar (CRUD)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-amber-50 font-serif">
            FOTOGALEREYA BOSHQARUVI
          </h2>
          <p className="text-xs text-amber-200/70 mt-0.5">
            Turnirlar, taqdirlash marosimlari va treninglardan olingan yorqin fotosuratlarni qo'shish va tartibga solish.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-md cursor-pointer transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi Foto Qo'shish</span>
        </button>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-3 text-amber-400/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Foto sarlavhasi yoki izohini qidirish..."
            className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl pl-9 pr-3 py-2.5 text-xs text-amber-50 placeholder-amber-200/40 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 w-full sm:w-auto">
          {['Barchasi', 'Turnirlar', 'Taqdirlash', 'Treninglar'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : 'bg-[#211a13] text-amber-200/80 border border-amber-500/20 hover:bg-[#2c2219]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-[#211a13]/90 border border-amber-500/30 hover:border-amber-400/60 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between backdrop-blur-md transition-all hover:-translate-y-0.5"
          >
            <div>
              <div className="relative h-44 w-full bg-[#18120d] overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <span className="absolute top-2 left-2 text-[9px] bg-black/70 border border-amber-400/40 text-amber-300 font-bold px-2 py-0.5 rounded-full uppercase backdrop-blur-md">
                  {item.category}
                </span>
                <span className="absolute bottom-2 right-2 text-[9px] bg-black/70 text-amber-200/80 px-2 py-0.5 rounded backdrop-blur-md">
                  {item.date}
                </span>
              </div>

              <div className="p-3 space-y-1">
                <h3 className="text-sm font-black text-amber-50 line-clamp-1 font-serif">
                  {item.title}
                </h3>
                {item.caption && (
                  <p className="text-[11px] text-amber-200/70 line-clamp-2 leading-tight">
                    {item.caption}
                  </p>
                )}
              </div>
            </div>

            <div className="p-3 pt-0 flex items-center justify-end space-x-1.5 border-t border-amber-500/15 mt-2">
              <button
                onClick={() => handleOpenEditModal(item)}
                className="p-1.5 rounded-lg bg-[#18120d] text-amber-400 hover:bg-[#2c2219] border border-amber-500/25 cursor-pointer"
                title="Fotoni tahrirlash"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDeleteMedia(item.id)}
                className="p-1.5 rounded-lg bg-rose-950/50 text-rose-300 hover:bg-rose-900 border border-rose-500/30 cursor-pointer"
                title="Fotoni o'chirish"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* ================= MODAL: CREATE / EDIT MEDIA ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#211a13] border border-amber-500/40 rounded-2xl p-5 sm:p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl text-amber-50">
            
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
              <h3 className="text-base font-black text-amber-50 font-serif flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-amber-400" />
                <span>{editingMediaId ? "Foto Ma'lumotlarini Tahrirlash" : "Yangi Foto Qo'shish"}</span>
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-amber-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMedia} className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Foto Sarlavhasi</label>
                <input
                  type="text"
                  required
                  value={mediaForm.title || ''}
                  onChange={(e) => setMediaForm({ ...mediaForm, title: e.target.value })}
                  placeholder="Masalan: Bahorgi Final Taqdirlash Onlari"
                  className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Bo'lim (Kategoriya)</label>
                  <select
                    value={mediaForm.category || 'Turnirlar'}
                    onChange={(e) => setMediaForm({ ...mediaForm, category: e.target.value as any })}
                    className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="Turnirlar">Turnirlar</option>
                    <option value="Taqdirlash">Taqdirlash</option>
                    <option value="Treninglar">Treninglar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Sana</label>
                  <input
                    type="date"
                    value={mediaForm.date || ''}
                    onChange={(e) => setMediaForm({ ...mediaForm, date: e.target.value })}
                    className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Rasm URL Manzili</label>
                <input
                  type="url"
                  required
                  value={mediaForm.imageUrl || ''}
                  onChange={(e) => setMediaForm({ ...mediaForm, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                />
              </div>

              {mediaForm.imageUrl && (
                <div className="relative h-32 rounded-xl overflow-hidden border border-amber-500/30">
                  <img
                    src={mediaForm.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Qisqacha Izoh (Caption)</label>
                <textarea
                  rows={2}
                  value={mediaForm.caption || ''}
                  onChange={(e) => setMediaForm({ ...mediaForm, caption: e.target.value })}
                  placeholder="Fotosurat ostiga yoziladigan matn..."
                  className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl p-2.5 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-amber-500/20">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-[#18120d] text-amber-200/80 rounded-xl text-xs font-bold border border-amber-500/25 cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-5 py-2 rounded-xl text-xs flex items-center space-x-1.5 cursor-pointer shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>Saqlash</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
