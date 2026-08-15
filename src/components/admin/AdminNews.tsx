import React, { useState } from 'react';
import { 
  Newspaper, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Save, 
  X, 
  Image as ImageIcon,
  Calendar,
  User,
  Eye
} from 'lucide-react';
import { NewsArticle } from '../../types';

interface AdminNewsProps {
  news: NewsArticle[];
  onUpdateNews: (news: NewsArticle[]) => void;
  showToast: (msg: string) => void;
}

export const AdminNews: React.FC<AdminNewsProps> = ({
  news,
  onUpdateNews,
  showToast
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [newsForm, setNewsForm] = useState<Partial<NewsArticle>>({
    title: '',
    summary: '',
    content: '',
    category: 'G\'oliblar',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    images: [],
    author: '44-Maktab Matbuot Xizmati'
  });
  const [imagesInput, setImagesInput] = useState('');

  const handleOpenCreateModal = () => {
    setEditingNewsId(null);
    setNewsForm({
      title: '',
      summary: '',
      content: '',
      category: 'G\'oliblar',
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
      images: [],
      author: '44-Maktab Matbuot Xizmati'
    });
    setImagesInput('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (article: NewsArticle) => {
    setEditingNewsId(article.id);
    setNewsForm({ ...article });
    setImagesInput((article.images || []).join('\n'));
    setIsModalOpen(true);
  };

  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsForm.title || !newsForm.summary) {
      alert("Sarlavha va qisqacha tavsifni to'ldiring!");
      return;
    }

    const multiImages = imagesInput
      .split('\n')
      .map(url => url.trim())
      .filter(Boolean);

    const primaryImg = newsForm.imageUrl || multiImages[0] || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80';

    if (editingNewsId) {
      const updated = news.map(n => 
        n.id === editingNewsId ? { 
          ...n, 
          ...newsForm, 
          imageUrl: primaryImg, 
          images: multiImages.length > 0 ? multiImages : [primaryImg] 
        } as NewsArticle : n
      );
      onUpdateNews(updated);
      showToast("Yangilik muvaffaqiyatli tahrirlandi!");
    } else {
      const newArticle: NewsArticle = {
        id: `n-${Date.now()}`,
        title: newsForm.title || '',
        summary: newsForm.summary || '',
        content: newsForm.content || newsForm.summary || '',
        date: new Date().toISOString().split('T')[0],
        category: newsForm.category || 'G\'oliblar',
        imageUrl: primaryImg,
        images: multiImages.length > 0 ? multiImages : [primaryImg],
        author: newsForm.author || '44-Maktab Matbuot Xizmati',
        views: 1
      };
      onUpdateNews([newArticle, ...news]);
      showToast("Yangi yangilik e'lon qilindi!");
    }
    setIsModalOpen(false);
  };

  const handleDeleteNews = (id: string) => {
    if (confirm("Ushbu yangilikni o'chirmoqchimisiz?")) {
      onUpdateNews(news.filter(n => n.id !== id));
      showToast("Yangilik o'chirildi.");
    }
  };

  const filtered = news.filter(n => {
    const matchesSearch = !searchQuery || 
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'Barchasi' || n.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 animate-fadeIn font-sans text-amber-50">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Newspaper className="w-4 h-4" />
            <span>Yangiliklar va E'lonlar (CRUD)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-amber-50 font-serif">
            YANGILIKLAR VA E'LONLAR BOSHQARUVI
          </h2>
          <p className="text-xs text-amber-200/70 mt-0.5">
            G'oliblar, turnir sharhlari, fotoreportajlar va rasmiy e'lonlarni chop etish hamda tahrirlash.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-md cursor-pointer transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi Yangilik Chop Etish</span>
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
            placeholder="Yangilik sarlavhasi yoki matnini qidirish..."
            className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl pl-9 pr-3 py-2.5 text-xs text-amber-50 placeholder-amber-200/40 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 w-full sm:w-auto">
          {['Barchasi', 'G\'oliblar', 'E\'lonlar', 'Rasmiy', 'Tadbirlar'].map(cat => (
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

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((article) => (
          <div
            key={article.id}
            className="bg-[#211a13]/90 border border-amber-500/30 hover:border-amber-400/60 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between backdrop-blur-md transition-all hover:-translate-y-0.5"
          >
            <div>
              <div className="relative h-44 w-full overflow-hidden bg-[#18120d]">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <span className="absolute top-2 left-2 text-[10px] bg-black/70 border border-amber-400/40 text-amber-300 font-bold px-2 py-0.5 rounded-full uppercase backdrop-blur-md">
                  {article.category}
                </span>
                <span className="absolute bottom-2 right-2 text-[10px] bg-black/70 text-amber-200/80 px-2 py-0.5 rounded backdrop-blur-md">
                  {article.date}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-base font-black text-amber-50 line-clamp-2 font-serif">
                  {article.title}
                </h3>
                <p className="text-xs text-amber-200/70 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 pt-0 border-t border-amber-500/15 flex items-center justify-between mt-2">
              <span className="text-[11px] text-amber-300/70 font-semibold">{article.author}</span>
              <div className="flex items-center space-x-1.5 pt-2">
                <button
                  onClick={() => handleOpenEditModal(article)}
                  className="p-1.5 rounded-lg bg-[#18120d] text-amber-400 hover:bg-[#2c2219] border border-amber-500/25 cursor-pointer"
                  title="Yangilikni tahrirlash"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteNews(article.id)}
                  className="p-1.5 rounded-lg bg-rose-950/50 text-rose-300 hover:bg-rose-900 border border-rose-500/30 cursor-pointer"
                  title="Yangilikni o'chirish"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* ================= MODAL: CREATE / EDIT NEWS ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#211a13] border border-amber-500/40 rounded-2xl p-5 sm:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl text-amber-50">
            
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
              <h3 className="text-base font-black text-amber-50 font-serif flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-amber-400" />
                <span>{editingNewsId ? "Yangilikni Tahrirlash" : "Yangi Yangilik Chop Etish"}</span>
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-amber-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNews} className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Sarlavha</label>
                <input
                  type="text"
                  required
                  value={newsForm.title || ''}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  placeholder="Masalan: Kuzgi chempionat finalchilari aniqlandi"
                  className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Rukn (Kategoriya)</label>
                  <select
                    value={newsForm.category || 'G\'oliblar'}
                    onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value as any })}
                    className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="G'oliblar">G'oliblar</option>
                    <option value="E'lonlar">E'lonlar</option>
                    <option value="Rasmiy">Rasmiy</option>
                    <option value="Tadbirlar">Tadbirlar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Muallif / Matbuot Xizmati</label>
                  <input
                    type="text"
                    value={newsForm.author || ''}
                    onChange={(e) => setNewsForm({ ...newsForm, author: e.target.value })}
                    placeholder="44-Maktab Matbuot Xizmati"
                    className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Qisqacha Anons (Summary)</label>
                <textarea
                  rows={2}
                  required
                  value={newsForm.summary || ''}
                  onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                  placeholder="Yangilik haqida 1-2 jumlalik qisqacha anons..."
                  className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl p-2.5 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">To'liq Maqola Matni</label>
                <textarea
                  rows={4}
                  value={newsForm.content || ''}
                  onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                  placeholder="Yangilikning to'liq matni va tafsilotlari..."
                  className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl p-2.5 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Asosiy Muqova Rasmi (URL)</label>
                <input
                  type="url"
                  value={newsForm.imageUrl || ''}
                  onChange={(e) => setNewsForm({ ...newsForm, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#18120d] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Qo'shimcha Galereya Rasmlari (Har bir qatorda bitta URL)</label>
                <textarea
                  rows={2}
                  value={imagesInput}
                  onChange={(e) => setImagesInput(e.target.value)}
                  placeholder="https://images.unsplash.com/... (har bir rasm havolasini yangi qatorda yozing)"
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
