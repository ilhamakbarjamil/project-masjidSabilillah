import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { 
    PenTool, 
    Image as ImageIcon, 
    Trash2, 
    Calendar, 
    User, 
    ArrowRight, 
    Search,
    Send
} from 'lucide-react';

export default function Index({ auth, articles = [] }) {
    const { data, setData, post, reset, processing } = useForm({
        title: '',
        content: '',
        image: null,
    });
    
    const [searchQuery, setSearchQuery] = useState('');
    const user = auth?.user;

    const submit = (e) => {
        e.preventDefault();
        post(route('articles.store'), { 
            onSuccess: () => reset(),
            forceFormData: true 
        });
    };

    const handleDelete = (id) => {
        if(confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
            router.delete(route('articles.destroy', id), {
                preserveScroll: true
            });
        }
    };

    // Filter artikel berdasarkan pencarian
    const filteredArticles = articles.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AuthenticatedLayout 
            user={user} 
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h2 className="font-semibold text-xl text-[#1d1d1f] leading-tight tracking-tight">
                        Newsroom
                    </h2>
                    {/* Search Bar */}
                    <div className="relative group w-full md:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={16} className="text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                        </div>
                        <input 
                            type="text"
                            placeholder="Cari berita..." 
                            className="block w-full pl-10 pr-3 py-2 border-none rounded-full bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-sm"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            }
        >
            <Head title="Berita & Agenda" />

            <div className="py-8 bg-[#f5f5f7] min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* PAGE HEADER */}
                    <div className="mb-12 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tighter mb-3">
                            Berita & Wawasan.
                        </h1>
                        <p className="text-xl text-gray-500 font-medium max-w-2xl">
                            Informasi terkini, kajian, dan agenda kegiatan Masjid Sabilillah.
                        </p>
                    </div>

                    {/* FORM INPUT ADMIN (COLLAPSIBLE / CARD) */}
                    {user?.role === 'admin' && (
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-gray-200/50 mb-16 border border-white/50 relative overflow-hidden">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-[#1d1d1f] text-white rounded-2xl">
                                    <PenTool size={20} />
                                </div>
                                <h3 className="text-xl font-bold text-[#1d1d1f]">Tulis Artikel Baru</h3>
                            </div>

                            <form onSubmit={submit} className="space-y-6">
                                <div className="space-y-2">
                                    <input 
                                        type="text" 
                                        placeholder="Judul Utama yang Menarik..." 
                                        className="w-full px-6 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-0 rounded-2xl text-xl font-bold text-[#1d1d1f] placeholder-gray-400 transition-all"
                                        value={data.title} 
                                        onChange={e => setData('title', e.target.value)} 
                                        required 
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <textarea 
                                        placeholder="Tulis isi berita lengkap di sini..." 
                                        className="w-full px-6 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-0 rounded-2xl text-base font-medium text-[#1d1d1f] placeholder-gray-400 transition-all min-h-[200px]"
                                        value={data.content} 
                                        onChange={e => setData('content', e.target.value)} 
                                        required
                                    ></textarea>
                                </div>

                                <div className="flex flex-col md:flex-row items-center gap-4">
                                    <label className="flex-1 w-full md:w-auto flex items-center gap-3 px-6 py-4 bg-gray-50 border border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors group">
                                        <div className="p-2 bg-white rounded-full text-gray-400 group-hover:text-emerald-600 shadow-sm transition-colors">
                                            <ImageIcon size={20} />
                                        </div>
                                        <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700 truncate">
                                            {data.image ? data.image.name : "Tambahkan Foto Sampul (Opsional)"}
                                        </span>
                                        <input type="file" className="hidden" onChange={e => setData('image', e.target.files[0])} />
                                    </label>

                                    <button 
                                        disabled={processing}
                                        className="w-full md:w-auto px-8 py-4 bg-[#1d1d1f] text-white font-bold rounded-2xl hover:bg-black transition-transform hover:scale-[1.02] shadow-lg shadow-black/20 flex items-center justify-center gap-2"
                                    >
                                        <Send size={18} /> Publikasikan
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* ARTICLES GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredArticles.length > 0 ? (
                            filteredArticles.map((article) => (
                                <article key={article.id} className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 border border-gray-100 flex flex-col h-full">
                                    
                                    {/* Image Wrapper */}
                                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                                        {article.image ? (
                                            <img 
                                                src={`/storage/${article.image}`} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                                                alt={article.title} 
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 bg-gray-50">
                                                <div className="p-4 bg-white rounded-full shadow-sm mb-2">
                                                    <span className="text-2xl">📰</span>
                                                </div>
                                                <span className="text-xs font-bold uppercase tracking-widest">No Image</span>
                                            </div>
                                        )}

                                        {/* Date Badge */}
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-[#1d1d1f] shadow-sm flex items-center gap-2">
                                            <Calendar size={12} className="text-emerald-600" />
                                            {new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                        </div>

                                        {/* Admin Delete Button */}
                                        {user?.role === 'admin' && (
                                            <button 
                                                onClick={() => handleDelete(article.id)}
                                                className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100 shadow-sm"
                                                title="Hapus Artikel"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="mb-4">
                                            <h2 className="text-xl font-bold text-[#1d1d1f] leading-snug mb-3 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                                                {article.title}
                                            </h2>
                                            <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 font-medium">
                                                {article.content}
                                            </p>
                                        </div>

                                        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wide">
                                                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                                    <User size={12} />
                                                </div>
                                                <span className="truncate max-w-[100px]">{article.user?.name.split(' ')[0]}</span>
                                            </div>
                                            <button className="text-emerald-600 text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all">
                                                Baca <ArrowRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center">
                                
                                <h3 className="text-xl font-bold text-[#1d1d1f] mb-2">Belum ada berita</h3>
                                <p className="text-gray-500">Jadilah yang pertama menulis artikel di sini.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}