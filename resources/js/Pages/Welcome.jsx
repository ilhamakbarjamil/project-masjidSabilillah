import { Link, Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    LayoutDashboard, LogIn, UserPlus, Wallet, Package,
    BookOpen, MapPin, Clock, ChevronRight, CalendarDays, Users,
    Moon, Star, Lamp
} from 'lucide-react';

export default function Welcome({ auth = {}, articles = [], schedules = [], balance = 0 }) {
    const [jadwalSholat, setJadwalSholat] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);

        // API Jadwal Sholat (Jakarta ID: 1301)
        axios.get(`https://api.myquran.com/v2/sholat/jadwal/1301/${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`)
            .then(res => {
                if (res.data?.data?.jadwal) setJadwalSholat(res.data.data.jadwal);
                setLoading(false);
            })
            .catch(() => setLoading(false));

        return () => clearInterval(timer);
    }, []);

    const formatIDR = (price) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price || 0);
    const prayerTimes = [
        { id: 'subuh', label: 'Subuh', icon: <Moon size={24} className="text-amber-300" /> },
        { id: 'dzuhur', label: 'Dzuhur', icon: <Sun size={24} className="text-amber-400" /> },
        { id: 'ashar', label: 'Ashar', icon: <Sun size={24} className="text-orange-400" /> },
        { id: 'maghrib', label: 'Maghrib', icon: <Moon size={24} className="text-purple-300" /> },
        { id: 'isya', label: 'Isya', icon: <Star size={24} className="text-blue-300" /> },
    ];

    return (
        <div className="bg-gradient-to-b from-amber-50/30 to-white min-h-screen font-sans text-slate-900 selection:bg-amber-100/50 selection:text-amber-900">
            <Head title="Masjid Sabilillah - Portal Digital" />

            {/* NAVBAR - ELEGANT ISLAMIC DESIGN */}
            <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-amber-100/30 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 bg-gradient-to-br from-emerald-700 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-xl tracking-tight">S</span>
                            <div className="absolute -bottom-1 -right-1 bg-amber-300 text-amber-900 text-xs font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                                M
                            </div>
                        </div>
                        <div className="text-xl font-bold tracking-tight text-slate-800">
                            <span className="hidden md:inline">MASJID</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-amber-600">SABILILLAH</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-3">
                        {auth?.user ? (
                            <Link href={route('dashboard')} className="flex items-center gap-2 bg-gradient-to-r from-emerald-700 to-amber-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-amber-500/20 active:scale-[0.98]">
                                <LayoutDashboard size={18} />
                                <span className="hidden sm:inline">Dashboard</span>
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="hidden sm:flex items-center gap-2 text-slate-600 font-medium px-4 py-2 hover:text-emerald-700 transition-colors">
                                    <LogIn size={18} /> Masuk
                                </Link>
                                <Link href={route('register')} className="flex items-center gap-2 bg-gradient-to-r from-emerald-700 to-amber-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-amber-500/30 transition-all active:scale-[0.98]">
                                    <UserPlus size={18} /> <span className="hidden md:inline">Daftar Jamaah</span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* HERO - ISLAMIC PATTERNS & ELEGANT DESIGN */}
            <header className="relative pt-28 pb-32 px-6 overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
                        <div className="absolute top-[-10%] left-[-15%] w-[45%] h-[60%] bg-amber-50 rounded-full blur-[150px] opacity-40"></div>
                        <div className="absolute bottom-0 right-[-10%] w-[35%] h-[50%] bg-emerald-50 rounded-full blur-[120px] opacity-30"></div>
                        
                        {/* Islamic geometric pattern overlay */}
                        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22 preserveAspectRatio=%22none%22><path d=%22M0,0 L50,100 L100,0 Z%22 fill=%22%23e0d7c9%22 opacity=%220.1%22/><path d=%22M0,100 L50,0 L100,100 Z%22 fill=%22%23c8b9a8%22 opacity=%220.1%22/></svg>')] bg-cover"></div>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-100/80 to-amber-50 px-6 py-3 rounded-full text-amber-900 mb-10 backdrop-blur-sm border border-amber-200/50">
                        <Lamp className="text-amber-600" size={24} />
                        <span className="font-medium text-lg">Portal Digital Terintegrasi</span>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-[1.1] text-slate-900 tracking-tight">
                        Cahaya Ilmu, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-amber-600">Kemuliaan Ibadah</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Platform manajemen masjid modern yang menggabungkan teknologi dengan nilai-nilai Islami untuk pelayanan jamaah yang lebih baik.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-5">
                        <Link href={route('inventory.index')} className="group flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-700 to-emerald-800 text-white px-8 py-4 rounded-2xl font-semibold transition-all hover:shadow-lg hover:shadow-emerald-500/30 active:scale-[0.98]">
                            <Package className="text-amber-200" size={22} /> Pinjam Fasilitas
                            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href={route('finance.index')} className="flex items-center justify-center gap-3 bg-white/80 backdrop-blur-sm border border-slate-200 px-8 py-4 rounded-2xl font-semibold hover:bg-white transition-all shadow-md hover:shadow-amber-200/50">
                            <Wallet className="text-emerald-600" size={22} /> Transparansi Keuangan
                        </Link>
                    </div>
                </div>
            </header>

            {/* JADWAL SHALAT CARD - ISLAMIC ELEGANCE */}
            <section className="max-w-7xl mx-auto px-6 -mt-12 relative z-20 mb-24">
                <div className="bg-gradient-to-br from-slate-900/90 to-emerald-900/90 rounded-3xl p-6 md:p-8 backdrop-blur-xl border border-amber-500/20 shadow-2xl shadow-emerald-900/20 relative overflow-hidden">
                    {/* Ornamental border */}
                    <div className="absolute inset-0 opacity-30 pointer-events-none">
                        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-amber-400/50"></div>
                        <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-amber-400/50"></div>
                        <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-amber-400/50"></div>
                        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-amber-400/50"></div>
                    </div>
                    
                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3 text-white">
                                    <Clock className="text-amber-300" /> Jadwal Shalat & Imsakiyah
                                </h2>
                                <p className="text-amber-100/90 text-sm mt-1 flex items-center gap-2">
                                    <MapPin size={14} /> Jakarta Pusat • {currentTime.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                </p>
                            </div>
                            <div className="text-3xl md:text-4xl font-mono font-bold tracking-tighter bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text text-transparent px-4 py-2 rounded-xl border border-amber-400/30">
                                {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                            {loading ? (
                                <div className="col-span-5 py-12 text-center animate-pulse text-amber-300">
                                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-amber-400 border-t-transparent"></div>
                                    <div className="mt-4">Memuat jadwal shalat...</div>
                                </div>
                            ) : (
                                prayerTimes.map((item) => (
                                    <div 
                                        key={item.id} 
                                        className="group p-4 sm:p-5 rounded-2xl text-center transition-all duration-300 border backdrop-blur-sm border-amber-300/20 hover:border-amber-400/40"
                                    >
                                        <div className="mb-2 flex justify-center">
                                            {item.icon}
                                        </div>
                                        <p className="text-xs uppercase tracking-wide text-amber-200 font-medium mb-1">{item.label}</p>
                                        <p className="text-2xl sm:text-3xl font-bold text-white">
                                            {jadwalSholat ? jadwalSholat[item.id] : '--:--'}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION AGENDA MENDATANG - ISLAMIC DESIGN */}
<section className="py-24 max-w-7xl mx-auto px-6">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">Agenda Mendatang</h2>
            <p className="text-slate-600 font-medium">Ikuti kajian dan kegiatan ibadah di Masjid Sabilillah</p>
        </div>
        <Link href={route('schedules.index')} className="text-emerald-700 font-bold hover:underline flex items-center gap-1 group">
            Lihat Semua <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {schedules.length > 0 ? schedules.map((item) => (
            <div 
                key={item.id} 
                className="bg-white border border-amber-100/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group relative"
            >
                {/* Decorative header */}
                <div className={`h-2 bg-gradient-to-r ${item.type === 'pengajian' ? 'from-emerald-600 to-emerald-400' : 'from-blue-600 to-blue-400'}`}></div>
                
                <div className="p-6">
                    {/* PHOTO AT THE TOP - CENTERED */}
                    <div className="flex justify-center mb-6">
                        <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-white shadow-md">
                            {item.image ? (
                                <img
                                    src={`/storage/${item.image}`}
                                    className="w-full h-full object-cover"
                                    alt={item.ustadz_name}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-emerald-600"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>`;
                                    }}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-emerald-600">
                                    <Users size={32} strokeWidth={1.5} />
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* TEXT CONTENT BELOW PHOTO */}
                    <div className="text-center mb-4">
                        <div className={`px-3 py-1 rounded-full text-xs font-bold inline-block mb-2 ${item.type === 'pengajian' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}`}>
                            {item.type === 'pengajian' ? 'Kajian Rutin' : 'Kegiatan Khusus'}
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 group-hover:text-emerald-700 transition">{item.title}</h3>
                        <p className="text-slate-600 text-sm mt-1">{item.ustadz_name}</p>
                    </div>

                    <div className="space-y-3 text-slate-600">
                        <div className="flex items-start gap-3">
                            <div className="mt-1 w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                                <Clock size={16} className="text-amber-600" strokeWidth={1.5} />
                            </div>
                            <div>
                                <div className="font-medium">{item.time.substring(0, 5)} WIB</div>
                                <div className="text-xs text-slate-500">Waktu pelaksanaan</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="mt-1 w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                                <MapPin size={16} className="text-amber-600" strokeWidth={1.5} />
                            </div>
                            <div>
                                <div className="font-medium">{item.location}</div>
                                <div className="text-xs text-slate-500">Lokasi kegiatan</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DATE BADGE */}
                <div className="bg-gradient-to-r from-amber-50 to-amber-100 py-3 px-6 flex justify-between items-center border-t border-amber-200/50">
                    <div className="text-sm font-medium text-amber-800">
                        {new Date(item.date).toLocaleDateString('id-ID', { weekday: 'long' })}
                    </div>
                    <div className="text-2xl font-bold text-amber-700">
                        {new Date(item.date).getDate()}
                    </div>
                </div>
            </div>
        )) : (
            <div className="col-span-3 text-center py-20 bg-gradient-to-br from-amber-50 to-white rounded-2xl border border-dashed border-amber-200/50">
                <div className="w-20 h-20 bg-amber-100/50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CalendarDays size={32} className="text-amber-600" />
                </div>
                <p className="text-amber-700 font-medium text-lg">Belum ada agenda terdekat minggu ini</p>
                <p className="text-slate-500 mt-2">Kunjungi kembali untuk informasi terbaru tentang kegiatan masjid</p>
            </div>
        )}
    </div>
</section>


            {/* BERITA TERBARU - ISLAMIC DESIGN */}
            <section className="py-24 max-w-7xl mx-auto px-6 bg-gradient-to-b from-amber-50 to-transparent">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center">
                            <BookOpen className="text-amber-600" size={32} />
                        </div>
                    </div>
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">Berita & Artikel</h2>
                    <p className="text-slate-600">Update terbaru seputar kegiatan Masjid Sabilillah</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {articles.map((article) => (
                        <div 
                            key={article.id} 
                            className="group bg-white rounded-3xl overflow-hidden border border-amber-100/50 hover:border-amber-300 transition-all duration-300 hover:shadow-lg"
                        >
                            <div className="h-64 w-full overflow-hidden">
                                {article.image ? (
                                    <img 
                                        src={`/storage/${article.image}`} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        alt={article.title}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.parentElement.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-emerald-50 to-amber-50 flex flex-col items-center justify-center p-6 text-center"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke-linecap="round" stroke-linejoin="round"/></svg><p class="mt-4 text-amber-700 font-medium">Gambar tidak tersedia</p></div>`;
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-amber-50 flex flex-col items-center justify-center p-6 text-center">
                                        <BookOpen size={48} className="text-amber-400" strokeWidth={1.5} />
                                        <p className="mt-4 text-amber-700 font-medium">Artikel Tanpa Gambar</p>
                                    </div>
                                )}
                            </div>
                            
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-slate-800 group-hover:text-emerald-700 transition mb-3 leading-tight line-clamp-2">
                                    {article.title}
                                </h3>
                                <p className="text-slate-600 line-clamp-3 mb-5">{article.content.substring(0, 100)}...</p>
                                
                                <div className="flex flex-wrap items-center gap-3 text-xs text-amber-700 font-medium">
                                    <div className="flex items-center">
                                        <Users size={14} className="mr-1 text-amber-500" />
                                        {article.user?.name}
                                    </div>
                                    <span>•</span>
                                    <div className="flex items-center">
                                        <CalendarDays size={14} className="mr-1 text-amber-500" />
                                        {new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CALL TO ACTION - RAMADHAN */}
            <section className="py-24 bg-gradient-to-br from-emerald-900/90 to-amber-900/90 text-white overflow-hidden relative">
                <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22 preserveAspectRatio=%22none%22><path d=%22M0,0 L50,100 L100,0 Z%22 fill=%22%23ffffff%22 opacity=%220.1%22/><path d=%22M0,100 L50,0 L100,100 Z%22 fill=%22%23ffffff%22 opacity=%220.1%22/></svg>')] bg-cover"></div>
                
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                            <Lamp className="text-amber-200" size={40} />
                        </div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Bersama Menghadirkan <br />
                        <span className="text-amber-300">Kemuliaan Ramadan</span>
                    </h2>
                    <p className="text-lg text-amber-100/90 mb-10 max-w-2xl mx-auto">
                        Jadilah bagian dari keberkahan bulan suci dengan berkontribusi melalui donasi, sukarela, atau partisipasi aktif dalam program-program Ramadan Masjid Sabilillah.
                    </p>
                    <Link href="#" className="inline-flex items-center gap-3 bg-white text-emerald-900 font-bold px-8 py-4 rounded-2xl hover:bg-amber-100 transition-all shadow-lg hover:shadow-amber-500/30">
                        <Wallet size={22} /> Program Ramadan 1446 H
                        <ChevronRight size={20} />
                    </Link>
                </div>
            </section>

            {/* FOOTER - ISLAMIC ELEGANCE */}
            <footer className="bg-gradient-to-t from-slate-900 to-slate-800 pt-24 pb-12 px-6 text-white overflow-hidden relative">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                                <span className="font-bold text-white text-xl">S</span>
                            </div>
                            <div className="text-2xl font-bold">
                                MASJID <span className="text-amber-300">SABILILLAH</span>
                            </div>
                        </div>
                        <p className="text-slate-300 leading-relaxed mb-6 max-w-xs">
                            "Dan janganlah kamu berbuat kerusakan di muka bumi, sesudah (Allah) memperbaikinya." <span className="block mt-2 font-medium text-amber-200">(QS. Al-A'raf: 56)</span>
                        </p>
                        <div className="flex gap-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white">
                                    <span className="text-lg">i</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-5 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                                    <MapPin size={16} />
                                </span>
                                Lokasi
                            </h3>
                            <ul className="space-y-3 text-slate-300">
                                <li className="flex gap-3">
                                    <span className="mt-1">📍</span>
                                    <span>Jl. Kebajikan No. 14,<br/>Jakarta Pusat 10110</span>
                                </li>
                                <li className="flex gap-3 mt-2">
                                    <span className="mt-1">📱</span>
                                    <span>+62 21 1234 5678<br/>info@sabilillah.org</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-bold mb-5 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                                    <Clock size={16} />
                                </span>
                                Jam Operasional
                            </h3>
                            <ul className="space-y-3 text-slate-300">
                                <li className="flex justify-between">
                                    <span>Senin - Jumat</span>
                                    <span>08.00 - 20.00</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Sabtu - Minggu</span>
                                    <span>08.00 - 21.00</span>
                                </li>
                                <li className="flex justify-between mt-2 pt-2 border-t border-slate-700">
                                    <span>Shalat Jumat</span>
                                    <span>11.30 - 14.00</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-bold mb-5 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                    <BookOpen size={16} />
                                </span>
                                Program Unggulan
                            </h3>
                            <ul className="space-y-3 text-slate-300">
                                <li className="flex gap-3">
                                    <span>✨</span>
                                    <span>Kajian Al-Qur'an Setiap Pagi</span>
                                </li>
                                <li className="flex gap-3">
                                    <span>🤲</span>
                                    <span>Program Buka Puasa Bersama</span>
                                </li>
                                <li className="flex gap-3">
                                    <span>🧺</span>
                                    <span>Santunan Anak Yatim</span>
                                </li>
                                <li className="mt-4">
                                    <Link href="#" className="inline-flex items-center text-amber-300 hover:text-white transition-colors">
                                        Lihat Semua Program <ChevronRight size={18} className="ml-1" />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 text-center text-slate-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} Masjid Sabilillah. All rights reserved.</p>
                    <p className="mt-2 text-amber-300/80 italic">
                        Platform digital untuk kemakmuran masjid dan kemaslahatan umat
                    </p>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-20 right-10 opacity-10 animate-pulse-slow">
                    <Moon size={120} className="text-amber-300" />
                </div>
            </footer>
        </div>
    );
}

// Custom Sun icon component
const Sun = ({ size = 24, className = "" }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5"
        className={className}
    >
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
);
