import { Link, Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { 
    LayoutDashboard, 
    LogIn, 
    UserPlus, 
    Wallet, 
    Package, 
    MapPin, 
    Clock, 
    ChevronRight,
    Users,
    ArrowUpRight,
    Play,
    Zap
} from 'lucide-react';

export default function Welcome({ auth = {}, articles = [], schedules = [], balance = 0 }) {
    const [jadwalSholat, setJadwalSholat] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        
        fetch(`https://api.myquran.com/v2/sholat/jadwal/1301/${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`)
            .then(res => res.json())
            .then(data => {
                if (data?.data?.jadwal) setJadwalSholat(data.data.jadwal);
                setLoading(false);
            })
            .catch(() => setLoading(false));

        return () => {
            clearInterval(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const formatIDR = (price) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price || 0);
    
    const prayerTimes = [
        { id: 'subuh', label: 'Subuh' },
        { id: 'dzuhur', label: 'Dzuhur' },
        { id: 'ashar', label: 'Ashar' },
        { id: 'maghrib', label: 'Maghrib' },
        { id: 'isya', label: 'Isya' },
    ];

    return (
        <div className="bg-[#f5f5f7] min-h-screen font-sans text-[#1d1d1f] antialiased selection:bg-emerald-500 selection:text-white">
            <Head title="Masjid Sabilillah - The Future of Worship" />
            
            {/* DYNAMIC ISLAND STYLE NAVBAR */}
            <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
                <nav className={`transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${scrolled ? 'w-full max-w-5xl bg-black/80 backdrop-blur-2xl py-3' : 'w-full max-w-7xl bg-transparent py-4'} rounded-full px-6 flex justify-between items-center shadow-2xl shadow-black/5`}>
                    <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${scrolled ? 'bg-white text-black' : 'bg-black text-white'}`}>
                            <span className="font-bold text-lg">S</span>
                        </div>
                        <span className={`font-semibold tracking-tight transition-colors ${scrolled ? 'text-white' : 'text-black'}`}>Sabilillah.</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        {['Jadwal', 'Keuangan', 'Berita', 'Inventaris'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className={`text-sm font-medium hover:text-emerald-500 transition-colors ${scrolled ? 'text-gray-300' : 'text-gray-600'}`}>
                                {item}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        {auth?.user ? (
                            <Link href={route('dashboard')} className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105">
                                Dashboard
                            </Link>
                        ) : (
                            <Link href={route('login')} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${scrolled ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>
                                Masuk
                            </Link>
                        )}
                    </div>
                </nav>
            </div>

            {/* HERO SECTION - APPLE STYLE */}
            <header className="relative pt-48 pb-24 px-6 overflow-hidden flex flex-col items-center text-center">
                <div className="max-w-4xl mx-auto z-10 animate-fade-in-up">
                    <h2 className="text-emerald-600 font-semibold text-xl md:text-2xl mb-4 tracking-wide">Selamat Datang</h2>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter leading-[0.9] text-[#1d1d1f] mb-8">
                        Spiritual.<br/>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-400">Connected.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
                        Ekosistem manajemen masjid modern. Transparansi keuangan, peminjaman aset, dan informasi jamaah dalam satu genggaman.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="#jadwal" className="bg-[#0071e3] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#0077ed] transition-all hover:scale-105 flex items-center gap-2">
                            Lihat Jadwal <ArrowUpRight size={20} />
                        </Link>
                        <Link href={route('inventory.index')} className="text-[#0071e3] hover:underline text-lg font-medium flex items-center gap-2">
                            Pinjam Aset Masjid <ChevronRight size={20} />
                        </Link>
                    </div>
                </div>
            </header>

            {/* PRAYER TIMES - DARK MODE PREMIUM SECTION */}
            <section id="jadwal" className="bg-black text-white py-32 px-6 rounded-[3rem] mx-2 md:mx-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-emerald-900/20 blur-[120px] rounded-full pointer-events-none"></div>
                
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
                        <div>
                            <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-2">Waktu Sholat.</h2>
                            <p className="text-gray-400 text-xl">Akurat. Tepat Waktu.</p>
                        </div>
                        <div className="text-right mt-6 md:mt-0">
                            <p className="text-3xl font-mono text-emerald-400 font-bold">
                                {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            <p className="text-gray-500 font-medium">
                                {currentTime.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {prayerTimes.map((item, idx) => (
                            <div key={item.id} className="group relative bg-[#1c1c1e] hover:bg-[#2c2c2e] transition-all duration-300 rounded-3xl p-8 flex flex-col items-center justify-center overflow-hidden">
                                <span className="absolute top-4 left-4 text-xs font-bold text-gray-500 uppercase tracking-widest">{idx + 1}</span>
                                <div className="text-gray-400 text-sm font-medium mb-2 group-hover:text-emerald-400 transition-colors">{item.label}</div>
                                <div className="text-3xl md:text-4xl font-bold tracking-tight">
                                    {loading ? '...' : (jadwalSholat ? jadwalSholat[item.id] : '--:--')}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* BENTO GRID - ECOSYSTEM SECTION */}
            <section className="py-32 px-4 max-w-7xl mx-auto">
                <div className="mb-16 text-center">
                    <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter text-[#1d1d1f] mb-4">Sistem Terintegrasi.</h2>
                    <p className="text-xl text-gray-500">Semua yang Anda butuhkan untuk aktivitas masjid.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
                    
                    {/* FINANCE CARD - LARGE SQUARE */}
                    <div className="md:col-span-2 md:row-span-2 bg-white rounded-[2.5rem] p-10 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col justify-between overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Wallet size={200} className="text-emerald-500 rotate-12" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 text-emerald-600 font-bold mb-2">
                                <Wallet size={20} />
                                <span>KEUANGAN</span>
                            </div>
                            <h3 className="text-4xl font-semibold tracking-tight text-gray-900 mb-2">Transparansi Dana Umat.</h3>
                            <p className="text-gray-500 font-medium max-w-xs">Pantau arus kas masjid secara realtime dan akuntabel.</p>
                        </div>
                        <div className="mt-8">
                            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Total Saldo Kas</p>
                            <p className="text-5xl md:text-6xl font-bold text-[#1d1d1f] tracking-tighter">{formatIDR(balance)}</p>
                        </div>
                    </div>

                    {/* INVENTORY CARD - WIDE RECTANGLE */}
                    <div className="md:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100 relative group overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-500">
                        <Link href={route('inventory.index')} className="absolute inset-0 z-10"></Link>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="flex justify-between items-start relative z-20">
                            <div>
                                <div className="flex items-center gap-2 text-blue-600 font-bold mb-2">
                                    <Package size={20} />
                                    <span>INVENTARIS</span>
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900">Peminjaman Aset</h3>
                                <p className="text-gray-500 text-sm mt-1">Pinjam alat masjid dengan mudah.</p>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-full">
                                <ArrowUpRight className="text-blue-600" />
                            </div>
                        </div>
                        <div className="mt-8 flex gap-4 overflow-hidden relative z-20">
                            {/* Dummy items visualization */}
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 w-24 h-24 flex items-center justify-center">
                                <Zap className="text-gray-300" />
                            </div>
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 w-24 h-24 flex items-center justify-center">
                                <LayoutDashboard className="text-gray-300" />
                            </div>
                        </div>
                    </div>

                    {/* UPCOMING AGENDA - SMALL SQUARE */}
                    <div className="md:col-span-1 bg-[#1d1d1f] text-white rounded-[2.5rem] p-8 shadow-xl flex flex-col justify-between group cursor-pointer hover:bg-black transition-colors">
                        <Link href={route('schedules.index')} className="h-full flex flex-col justify-between">
                            <div className="flex items-center justify-between">
                                <Clock className="text-emerald-400" />
                                <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded-md text-emerald-400">NEXT</span>
                            </div>
                            <div>
                                {schedules.length > 0 ? (
                                    <>
                                        <p className="text-sm text-gray-400 mb-1">{new Date(schedules[0].date).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric' })}</p>
                                        <h3 className="text-xl font-bold leading-tight line-clamp-2">{schedules[0].title}</h3>
                                    </>
                                ) : (
                                    <p className="text-gray-400">Belum ada agenda</p>
                                )}
                            </div>
                        </Link>
                    </div>

                    {/* NEWS - SMALL SQUARE */}
                    <div className="md:col-span-1 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-[2.5rem] p-8 shadow-xl flex flex-col justify-between group cursor-pointer overflow-hidden relative">
                         {/* Abstract Shape */}
                         <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
                        
                        <div className="flex items-center justify-between relative z-10">
                            <Users />
                            <ArrowUpRight />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-1">Berita &<br/>Artikel</h3>
                            <p className="text-emerald-100 text-sm">Update terkini kegiatan.</p>
                        </div>
                    </div>

                </div>
            </section>

            {/* FEATURED ARTICLES - CAROUSEL LOOK */}
            <section id="berita" className="py-24 bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-end mb-12">
                        <h2 className="text-4xl font-semibold tracking-tight text-[#1d1d1f]">Bacaan Terbaru.</h2>
                        <Link href="#" className="text-[#0071e3] font-medium hover:underline">Lihat Semua Arsip</Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {articles.length > 0 ? articles.map((article) => (
                            <div key={article.id} className="group cursor-pointer">
                                <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-gray-100 relative">
                                    {article.image ? (
                                        <img src={`/storage/${article.image}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt={article.title} />
                                    ) : (
                                        <div className="flex items-center justify-center w-full h-full text-gray-300">
                                            <span className="text-4xl">News</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                                </div>
                                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2 block">
                                    {new Date(article.created_at).toLocaleDateString('id-ID')}
                                </span>
                                <h3 className="text-2xl font-bold text-[#1d1d1f] leading-snug group-hover:text-[#0071e3] transition-colors">
                                    {article.title}
                                </h3>
                            </div>
                        )) : (
                            <div className="col-span-3 py-20 text-center text-gray-400">
                                Belum ada artikel dipublikasikan.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* FOOTER - MINIMALIST */}
            <footer className="bg-[#f5f5f7] py-20 border-t border-gray-200">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="flex items-center justify-center gap-2 mb-8 opacity-50">
                        <div className="w-6 h-6 bg-black rounded-lg"></div>
                        <span className="font-bold text-black tracking-tight">Sabilillah.</span>
                    </div>
                    
                    <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                        Masjid Sabilillah berkomitmen untuk memberikan layanan terbaik bagi jamaah melalui teknologi digital. 
                        Sistem ini dikelola oleh pengurus masjid untuk transparansi dan kemudahan akses informasi.
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-medium text-gray-600">
                        <Link href="#" className="hover:text-black transition-colors">Kebijakan Privasi</Link>
                        <Link href="#" className="hover:text-black transition-colors">Syarat Penggunaan</Link>
                        <Link href="#" className="hover:text-black transition-colors">Kontak Pengurus</Link>
                        <Link href="#" className="hover:text-black transition-colors">Peta Lokasi</Link>
                    </div>
                    
                    <div className="mt-8 text-xs text-gray-400">
                        &copy; 2025 Masjid Sabilillah Digital Portal. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}