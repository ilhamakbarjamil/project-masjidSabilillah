import { Link, Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    LayoutDashboard, 
    LogIn, 
    UserPlus, 
    Wallet, 
    Package, 
    BookOpen, 
    MapPin, 
    Clock, 
    ChevronRight,
    CalendarDays,
    Users,
    Heart
} from 'lucide-react';

export default function Welcome({ auth = {}, articles = [], schedules = [], balance = 0 }) {
    const [jadwalSholat, setJadwalSholat] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        // Update jam
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
        { id: 'subuh', label: 'Subuh' },
        { id: 'dzuhur', label: 'Dzuhur' },
        { id: 'ashar', label: 'Ashar' },
        { id: 'maghrib', label: 'Maghrib' },
        { id: 'isya', label: 'Isya' },
    ];

    return (
        <div className="bg-[#FAFBFC] min-h-screen font-sans text-slate-900 selection:bg-emerald-100">
            <Head title="Masjid Sabilillah - Portal Digital" />
            
            {/* NAVBAR */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
                            <span className="text-white font-bold text-xl">S</span>
                        </div>
                        <div className="text-xl font-bold tracking-tight text-slate-800 uppercase">
                            MASJID <span className="text-emerald-600">SABILILLAH</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {auth?.user ? (
                            <Link href={route('dashboard')} className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full font-medium transition hover:bg-slate-800">
                                <LayoutDashboard size={18} /> Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="hidden sm:flex items-center gap-2 text-slate-600 font-semibold px-4 py-2 hover:text-emerald-600">
                                    <LogIn size={18} /> Masuk
                                </Link>
                                <Link href={route('register')} className="bg-emerald-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition">
                                    <UserPlus size={18} /> Daftar
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* HERO SECTION */}
            <header className="relative pt-20 pb-32 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8">
                        Portal Digital Terintegrasi
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight text-slate-900 tracking-tighter">
                        Berkhidmat untuk <br />
                        <span className="text-emerald-600 italic">Kebaikan Umat.</span>
                    </h1>
                    <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Manajemen masjid modern untuk transparansi keuangan, peminjaman inventaris, dan pusat informasi kegiatan jamaah.
                    </p>
                    
                    {/* Display Saldo Kas di Hero */}
                    <div className="bg-white inline-flex items-center gap-4 px-8 py-4 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 mb-12 transform hover:scale-105 transition duration-500">
                        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                            <Wallet size={24} />
                        </div>
                        <div className="text-left">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Saldo Kas Masjid</p>
                            <p className="text-2xl font-black text-slate-800">{formatIDR(balance)}</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href={route('donations.index')} className="flex items-center justify-center gap-3 bg-emerald-600 text-white px-10 py-5 rounded-[2rem] font-black uppercase text-xs tracking-widest hover:bg-emerald-700 transition shadow-xl shadow-emerald-100">
                            <Heart size={18} /> Infaq Sekarang
                        </Link>
                        <Link href={route('inventory.index')} className="flex items-center justify-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-[2rem] font-black uppercase text-xs tracking-widest hover:bg-slate-800 transition">
                            Pinjam Alat
                        </Link>
                    </div>
                </div>
            </header>

            {/* JADWAL SHALAT */}
            <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
                <div className="bg-emerald-900 rounded-[3rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                            <div className="text-center md:text-left">
                                <h2 className="text-3xl font-black flex items-center gap-3 justify-center md:justify-start">
                                    <Clock className="text-emerald-400" /> Jadwal Shalat
                                </h2>
                                <p className="text-emerald-300/80 font-bold mt-2 uppercase tracking-widest text-xs">
                                    {currentTime.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                </p>
                            </div>
                            <div className="text-5xl font-mono font-black bg-white/10 px-8 py-3 rounded-3xl backdrop-blur-md border border-white/5 shadow-inner">
                                {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                            {prayerTimes.map((item) => (
                                <div key={item.id} className="bg-white/5 border border-white/10 backdrop-blur-sm p-8 rounded-[2.5rem] text-center transition hover:bg-white/10">
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 mb-3 font-black">{item.label}</p>
                                    <p className="text-3xl font-black italic">
                                        {loading ? '--:--' : (jadwalSholat ? jadwalSholat[item.id] : '--:--')}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-emerald-500 rounded-full blur-[120px] opacity-20"></div>
                </div>
            </section>

            {/* AGENDA MENDATANG */}
            <section className="py-32 max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-end mb-16 px-4">
                    <div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Agenda Mendatang</h2>
                        <p className="text-slate-400 font-bold mt-2 italic">Ikuti kajian dan kegiatan ibadah di Masjid Sabilillah.</p>
                    </div>
                    <Link href={route('schedules.index')} className="text-emerald-600 font-black text-xs uppercase tracking-widest border-b-2 border-emerald-100 hover:border-emerald-600 transition pb-1">Lihat Semua</Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {schedules.length > 0 ? schedules.map((item) => (
                        <div key={item.id} className="bg-white rounded-[3rem] p-2 shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-500 group overflow-hidden">
                            <div className="p-8">
                                <div className="relative mb-8">
                                    <div className="w-24 h-24 rounded-3xl overflow-hidden bg-emerald-50 border-4 border-white shadow-xl relative z-10 mx-auto">
                                        {item.image ? (
                                            <img src={`/storage/${item.image}`} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt={item.ustadz_name} />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-emerald-600"><Users size={40} /></div>
                                        )}
                                    </div>
                                    <div className={`absolute top-0 right-0 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${item.type === 'pengajian' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                                        {item.type}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black mb-6 text-slate-800 text-center leading-tight group-hover:text-emerald-600 transition">{item.title}</h3>
                                <div className="space-y-4 text-slate-500 text-sm font-bold uppercase tracking-tight">
                                    <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl"><Users size={18} className="text-emerald-500" /> {item.ustadz_name}</div>
                                    <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl"><Clock size={18} className="text-emerald-500" /> {item.time.substring(0,5)} WIB</div>
                                    <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl"><MapPin size={18} className="text-emerald-500" /> {item.location}</div>
                                </div>
                            </div>
                            <div className="bg-slate-900 p-6 text-center text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 rounded-b-[2.5rem]">
                                {new Date(item.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
                            </div>
                        </div>
                    )) : <p className="col-span-3 text-center text-slate-300 italic py-20">Belum ada agenda terdekat.</p>}
                </div>
            </section>

            {/* BERITA & ARTIKEL */}
            <section className="py-32 max-w-7xl mx-auto px-6 bg-emerald-50/50 rounded-[5rem]">
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Berita & Agenda</h2>
                    <p className="text-slate-400 font-bold mt-2 italic">Informasi terbaru seputar kegiatan Masjid Sabilillah.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6">
                    {articles.length > 0 ? articles.map((article) => (
                        <div key={article.id} className="group cursor-pointer">
                            <div className="h-72 w-full rounded-[3rem] overflow-hidden mb-8 shadow-lg border-4 border-white transition-transform group-hover:-translate-y-2">
                                {article.image ? <img src={`/storage/${article.image}`} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt={article.title} /> : <div className="w-full h-full bg-emerald-100 flex items-center justify-center text-5xl">📰</div>}
                            </div>
                            <h3 className="text-2xl font-black text-slate-800 group-hover:text-emerald-600 transition mb-4 leading-tight">{article.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-6 font-medium">{article.content}</p>
                            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                <span>{article.user?.name}</span><span>•</span><span>{new Date(article.created_at).toLocaleDateString('id-ID')}</span>
                            </div>
                        </div>
                    )) : <p className="col-span-3 text-center text-slate-300 italic">Belum ada berita terbaru.</p>}
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-slate-900 py-24 px-6 text-white text-center mt-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-3xl font-black mb-6 tracking-tighter uppercase">
                        MASJID <span className="text-emerald-400">SABILILLAH</span>
                    </div>
                    <p className="text-slate-500 max-w-lg mx-auto leading-relaxed italic mb-12">
                        Membangun peradaban umat melalui teknologi, transparansi, dan keterbukaan informasi untuk kemaslahatan bersama.
                    </p>
                    <div className="flex justify-center gap-10 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                        <Link href="/" className="hover:text-white transition">Home</Link>
                        <Link href="/inventory" className="hover:text-white transition">Inventory</Link>
                        <Link href="/finance" className="hover:text-white transition">Finance</Link>
                        <Link href="/articles" className="hover:text-white transition">News</Link>
                    </div>
                </div>
                <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 text-[15rem] font-black text-white/[0.02] pointer-events-none uppercase">
                    SABILILLAH
                </div>
            </footer>
        </div>
    );
}