import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Index({ auth, articles = [] }) {
    const { data, setData, post, reset, delete: destroy } = useForm({
        title: '',
        content: '',
        image: null,
    });

    const user = auth?.user;

    const submit = (e) => {
        e.preventDefault();
        post(route('articles.store'), { 
            onSuccess: () => reset(),
            forceFormData: true 
        });
    };

    return (
        <AuthenticatedLayout user={user} header={<h2 className="font-black text-xl text-emerald-800 uppercase tracking-tight">📰 Berita & Agenda Masjid</h2>}>
            <Head title="Berita" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* FORM INPUT ADMIN */}
                    {user?.role === 'admin' && (
                        <div className="bg-white p-10 rounded-[3rem] shadow-sm mb-12 border border-gray-100">
                            <h3 className="text-xl font-black mb-6 text-gray-800 italic">Tulis Pengumuman Baru</h3>
                            <form onSubmit={submit} className="space-y-6">
                                <input type="text" placeholder="Judul Berita/Kajian" className="w-full border-gray-100 bg-gray-50 rounded-2xl p-4 font-bold"
                                    value={data.title} onChange={e => setData('title', e.target.value)} required />
                                
                                <textarea placeholder="Isi berita lengkap..." className="w-full border-gray-100 bg-gray-50 rounded-2xl p-4 h-40"
                                    value={data.content} onChange={e => setData('content', e.target.value)} required></textarea>
                                
                                <div className="p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Unggah Foto Berita (Opsional)</label>
                                    <input type="file" className="text-xs" onChange={e => setData('image', e.target.files[0])} />
                                </div>

                                <button className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-emerald-700 shadow-xl shadow-emerald-100 transition">Publish Berita</button>
                            </form>
                        </div>
                    )}

                    {/* LIST BERITA */}
                    <div className="space-y-12">
                        {articles.map((article) => (
                            <div key={article.id} className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition group">
                                {/* Tampilkan Gambar Jika Ada */}
                                {article.image && (
                                    <div className="h-64 w-full overflow-hidden">
                                        <img src={`/storage/${article.image}`} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt={article.title} />
                                    </div>
                                )}
                                
                                <div className="p-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <h2 className="text-3xl font-black text-gray-800 leading-tight group-hover:text-emerald-700 transition">{article.title}</h2>
                                        {user?.role === 'admin' && (
                                            <button onClick={() => { if(confirm('Hapus berita?')) destroy(route('articles.destroy', article.id)) }} className="text-red-300 hover:text-red-600 text-[10px] font-black uppercase">Hapus</button>
                                        )}
                                    </div>
                                    <p className="text-gray-500 leading-relaxed whitespace-pre-wrap text-lg italic">{article.content}</p>
                                    
                                    <div className="mt-8 pt-8 border-t border-gray-50 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                                        <span>Penulis: {article.user?.name}</span>
                                        <span>{new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}