import { Link, Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { 
    LayoutDashboard, Wallet, Package, 
    ArrowRight, Users, ArrowUpRight, 
    Clock, MapPin, Sparkles, Moon, Star, 
    Sunrise, Sunset, Utensils, HeartHandshake
} from 'lucide-react';

export default function Welcome({ auth = {}, articles = [], schedules = [], balance = 0 }) {
    const [jadwalSholat, setJadwalSholat] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [scrolled, setScrolled] = useState(false);
    const [nextPrayer, setNextPrayer] = useState(null);
    const [timeToMaghrib, setTimeToMaghrib] = useState(null);

    // --- LOGIC SECTION ---
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now);
        }, 1000);
        
        // Fetch Jadwal Sholat
        const date = new Date();
        fetch(`https://api.myquran.com/v2/sholat/jadwal/1301/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`)
            .then(res => res.json())
            .then(data => {
                if (data?.data?.jadwal) {
                    setJadwalSholat(data.data.jadwal);
                    determineNextPrayer(data.data.jadwal);
                    calculateIftarCountdown(data.data.jadwal);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));

        return () => {
            clearInterval(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Hitung mundur Buka Puasa
    const calculateIftarCountdown = (jadwal) => {
        if (!jadwal) return;
        const now = new Date();
        const [h, m] = jadwal.maghrib.split(':').map(Number);
        const maghribTime = new Date();
        maghribTime.setHours(h, m, 0);

        if (now < maghribTime) {
            const diff = maghribTime - now;
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            setTimeToMaghrib(`${hours}j ${minutes}m menuju Buka Puasa`);
        } else {
            setTimeToMaghrib("Selamat Berbuka Puasa");
        }
    };

    const determineNextPrayer = (jadwal) => {
        const now = new Date();
        const curTimeVal = now.getHours() * 60 + now.getMinutes();
        
        const times = [
            { id: 'subuh', label: 'Subuh', time: jadwal.subuh },
            { id: 'dzuhur', label: 'Dzuhur', time: jadwal.dzuhur },
            { id: 'ashar', label: 'Ashar', time: jadwal.ashar },
            { id: 'maghrib', label: 'Maghrib', time: jadwal.maghrib },
            { id: 'isya', label: 'Isya', time: jadwal.isya },
        ];

        let found = false;
        for (let p of times) {
            const [h, m] = p.time.split(':').map(Number);
            const pTimeVal = h * 60 + m;
            if (pTimeVal > curTimeVal) {
                setNextPrayer(p.id);
                found = true;
                break;
            }
        }
        if (!found) setNextPrayer('subuh');
    };

    const formatIDR = (price) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price || 0);
    
    const prayerTimesList = [
        { id: 'imsak', label: 'Imsak', icon: <Moon size={16}/> },
        { id: 'subuh', label: 'Subuh', icon: <Sunrise size={16}/> },
        { id: 'dzuhur', label: 'Dzuhur', icon: <Clock size={16}/> },
        { id: 'ashar', label: 'Ashar', icon: <Clock size={16}/> },
        { id: 'maghrib', label: 'Maghrib', icon: <Sunset size={16}/> },
        { id: 'isya', label: 'Isya', icon: <Moon size={16}/> },
    ];

    return (
        // UBAH BACKGROUND UTAMA KE DARK (Slate-950) dan TEXT KE LIGHT (Slate-200)
        <div className="bg-[#0f172a] min-h-screen font-sans text-slate-200 antialiased selection:bg-amber-500 selection:text-white overflow-x-hidden">
            <Head title="Ramadhan Bersama Masjid Sabilillah" />

            {/* --- BACKGROUND PATTERN (Islamic Geometry - Opacity disesuaikan untuk dark mode) --- */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" 
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
            </div>
            
            {/* --- NAVBAR FLOAT (Disesuaikan untuk Dark Mode) --- */}
            <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
                <nav className={`transition-all duration-500 ease-out ${scrolled ? 'w-full max-w-4xl bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 py-3 shadow-2xl shadow-black/20' : 'w-full max-w-6xl bg-[#0f172a]/50 backdrop-blur-md border border-white/5 py-4 shadow-sm'} rounded-full px-6 flex justify-between items-center`}>
                    
                    {/* Brand */}
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform group-hover:rotate-12 bg-amber-500 text-white`}>
                            <span className="font-bold text-lg">S</span>
                        </div>
                        <span className="font-semibold tracking-tight text-white">Sabilillah.</span>
                    </div>

                    {/* Menu Desktop */}
                    <div className="hidden md:flex items-center gap-1">
                        {['Jadwal', 'Ekosistem', 'Berita'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className={`px-4 py-2 rounded-full text-sm font-medium transition-all text-slate-300 hover:text-amber-400 hover:bg-white/5`}>
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Auth Button */}
                    <div className="flex items-center gap-2">
                        {auth?.user ? (
                            <Link href={route('dashboard')} className="bg-amber-500 hover:bg-amber-400 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-amber-500/20 hover:scale-105 flex items-center gap-2">
                                <LayoutDashboard size={16} /> Dashboard
                            </Link>
                        ) : (
                            <Link href={route('login')} className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105 bg-white text-black hover:bg-slate-200 shadow-lg`}>
                                Masuk
                            </Link>
                        )}
                    </div>
                </nav>
            </div>

            {/* --- HERO SECTION SPESIAL RAMADHAN (Sudah Dark, tidak banyak berubah) --- */}
            <header className="relative pt-44 pb-32 px-6 flex flex-col items-center text-center overflow-hidden">
                
                {/* Lantern Decorations */}
                <div className="absolute top-0 left-10 md:left-40 animate-bounce duration-[3000ms]">
                    <div className="w-1 h-32 bg-amber-400/30 mx-auto"></div>
                    <div className="text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]"><Sparkles size={48} fill="currentColor" className="opacity-90"/></div>
                </div>
                <div className="absolute top-0 right-10 md:right-40 animate-bounce duration-[4000ms]">
                    <div className="w-1 h-20 bg-amber-400/30 mx-auto"></div>
                    <div className="text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]"><Moon size={32} fill="currentColor" className="opacity-90"/></div>
                </div>

                {/* Abstract Night Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-b from-amber-900/20 via-[#0f172a] to-transparent rounded-b-full -z-10 pointer-events-none opacity-90"></div>
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-600/10 blur-[120px] -z-10"></div>

                <div className="max-w-5xl mx-auto z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 mt-10">
                    
                    {/* RAMADHAN BADGE */}
                    <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur border border-amber-500/30 rounded-full px-5 py-2 shadow-lg mb-8 animate-pulse">
                        <Star size={14} className="text-amber-400" fill="currentColor"/>
                        <span className="text-sm font-bold text-amber-200 tracking-widest uppercase">Marhaban Ya Ramadhan 1446 H</span>
                        <Star size={14} className="text-amber-400" fill="currentColor"/>
                    </div>

                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] text-white mb-8 drop-shadow-2xl">
                        Bulan Suci.<br/>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200">Penuh Berkah.</span>
                    </h1>
                    
                    <p className="text-lg md:text-2xl text-slate-400 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
                        Mari hidupkan malam dengan ibadah dan siangi hari dengan amal shaleh. Kelola zakat, infaq, dan kegiatan Ramadhan dalam satu genggaman.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href={route('donations.index')} className="group relative px-8 py-4 bg-amber-500 text-white rounded-full text-lg font-bold overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(245,158,11,0.5)]">
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-400 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative flex items-center gap-2 text-slate-900">Salurkan Infaq <HeartHandshake size={20}/></span>
                        </Link>
                        <a href="#jadwal" className="px-8 py-4 bg-white/5 backdrop-blur border border-white/10 text-white rounded-full text-lg font-bold hover:bg-white/10 transition-all flex items-center gap-2">
                            Jadwal Imsakiyah <Clock size={20} />
                        </a>
                    </div>
                </div>
            </header>

            {/* --- JADWAL SHOLAT (Ubah Card jadi Dark) --- */}
            <section id="jadwal" className="px-4 mb-24 -mt-10 relative z-20">
                {/* Ubah bg-white jadi bg-[#1e293b] (Slate 800) dan border disesuaikan */}
                <div className="max-w-7xl mx-auto bg-[#1e293b] rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl shadow-black/30 border border-white/5">
                    
                    {/* Header Jadwal */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-8">
                        <div>
                            <div className="flex items-center gap-2 text-amber-500 font-bold mb-2 uppercase tracking-wider text-xs">
                                <MapPin size={16}/> Kota Malang & Sekitarnya
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">Jadwal Imsakiyah</h2>
                        </div>
                        <div className="text-right mt-6 md:mt-0">
                            {/* COUNTDOWN BUKA PUASA */}
                            {timeToMaghrib && (
                                <div className="mb-2 inline-block bg-emerald-900/50 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-lg text-xs font-bold uppercase animate-pulse">
                                    {timeToMaghrib}
                                </div>
                            )}
                            <p className="text-5xl font-mono text-white font-bold tracking-tighter">
                                {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            <p className="text-slate-400 font-medium mt-1">
                                {currentTime.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                        </div>
                    </div>

                    {/* Grid Waktu Sholat */}
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                        {prayerTimesList.map((item) => {
                            const isActive = nextPrayer === item.id;
                            const isSpecial = item.id === 'maghrib' || item.id === 'imsak'; 
                            
                            return (
                                <div key={item.id} className={`relative rounded-3xl p-6 flex flex-col items-center justify-center overflow-hidden transition-all duration-500 group ${isActive 
                                    ? 'bg-gradient-to-br from-amber-600 to-amber-800 text-white scale-105 shadow-xl shadow-amber-600/30 border border-amber-400/50' 
                                    : isSpecial 
                                        // Ubah bg special jadi dark
                                        ? 'bg-[#0f172a] border border-amber-500/30 hover:border-amber-500/60' 
                                        // Ubah bg biasa jadi dark
                                        : 'bg-[#0f172a] border border-white/5 hover:bg-[#0f172a]/70'
                                }`}>
                                    
                                    {isActive && <div className="absolute top-3 right-3"><span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-white opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span></div>}
                                    
                                    <div className={`mb-3 ${isActive ? 'text-amber-200' : isSpecial ? 'text-amber-500' : 'text-slate-500'}`}>
                                        {item.id === 'maghrib' && !isActive ? <Utensils size={20}/> : item.icon}
                                    </div>
                                    
                                    <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${isActive ? 'text-white' : 'text-slate-400'}`}>
                                        {item.id === 'maghrib' ? 'Berbuka' : item.label}
                                    </div>
                                    
                                    <div className={`text-2xl md:text-3xl font-bold tracking-tight ${isActive ? 'text-white' : 'text-white'}`}>
                                        {loading ? <div className="h-6 w-16 bg-white/10 animate-pulse rounded"></div> : (jadwalSholat ? jadwalSholat[item.id] : '--:--')}
                                    </div>

                                    {item.id === 'maghrib' && !isActive && (
                                        <div className="mt-2 text-[10px] font-bold text-slate-900 bg-amber-500 px-2 py-0.5 rounded">IFTHAR</div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* --- BENTO GRID SYSTEM (Disesuaikan Dark Mode) --- */}
            <section id="ekosistem" className="px-4 max-w-7xl mx-auto mb-32">
                <div className="mb-16 text-center max-w-2xl mx-auto">
                    <span className="text-amber-500 font-bold tracking-widest text-xs uppercase mb-2 block">Ekosistem Digital</span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">Amal Jariyah.<br/>Lebih Mudah.</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[650px]">
                    
                    {/* CARD 1: ZAKAT & INFAQ (Sudah Dark, hanya penyesuaian sedikit) */}
                    <div className="md:col-span-2 md:row-span-2 bg-[#1e293b] rounded-[2.5rem] p-10 shadow-2xl shadow-black/20 border border-white/5 flex flex-col justify-between overflow-hidden relative group transition-all duration-500">
                        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
                        
                        <div className="absolute top-0 right-0 p-16 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:rotate-12 group-hover:scale-110 origin-top-right">
                            <Wallet size={300} className="text-white" />
                        </div>
                        
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-amber-500 text-black rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/20">
                                <Wallet size={24} />
                            </div>
                            <h3 className="text-4xl font-bold tracking-tight text-white mb-2">Infaq & Sedekah.</h3>
                            <p className="text-slate-400 font-medium max-w-xs leading-relaxed">Sucikan harta di bulan mulia. Pantau penyaluran dana secara transparan.</p>
                        </div>
                        
                        <div className="mt-12 relative z-10">
                            <div className="inline-block px-4 py-2 bg-white/5 rounded-lg border border-white/10 mb-2">
                                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Total Kas Masjid</span>
                            </div>
                            <p className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
                                {formatIDR(balance)}
                            </p>
                        </div>
                    </div>

                    {/* CARD 2: INVENTARIS (Sudah Dark Gradient) */}
                    <div className="md:col-span-2 bg-gradient-to-br from-emerald-600 to-teal-800 rounded-[2.5rem] p-8 shadow-xl border border-white/10 relative group overflow-hidden cursor-pointer">
                         <Link href={route('inventory.index')} className="absolute inset-0 z-20"></Link>
                        <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="flex justify-between items-start relative z-10 h-full">
                            <div className="flex flex-col justify-between h-full">
                                <div>
                                    <div className="flex items-center gap-2 text-emerald-200 font-bold mb-2 text-xs uppercase tracking-widest">
                                        <Package size={14} /> Inventaris
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-2">Peminjaman Aset.</h3>
                                    <p className="text-emerald-100/80 text-sm max-w-[200px]">Pinjam peralatan untuk kegiatan Buka Bersama atau Kajian.</p>
                                </div>
                                <div className="mt-4 flex items-center gap-2 text-white font-bold text-sm group-hover:gap-4 transition-all">
                                    Cek Ketersediaan <ArrowRight size={16}/>
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl group-hover:rotate-12 transition-transform duration-500">
                                <Package className="text-white w-8 h-8" />
                            </div>
                        </div>
                    </div>

                    {/* CARD 3: AGENDA (Dark Mode Adjustment) */}
                    <div className="md:col-span-1 bg-[#1e293b] text-white border border-white/5 rounded-[2.5rem] p-8 shadow-xl flex flex-col justify-between group cursor-pointer hover:border-amber-500/50 transition-colors relative overflow-hidden">
                        <Link href={route('schedules.index')} className="absolute inset-0 z-20"></Link>
                        
                        <div className="relative z-10 flex justify-between items-start">
                            <div className="bg-amber-500/20 p-2 rounded-xl text-amber-500">
                                <Moon size={20} />
                            </div>
                            <span className="text-[10px] font-bold bg-amber-500 text-slate-900 px-2 py-1 rounded uppercase">Agenda</span>
                        </div>
                        
                        <div className="relative z-10 mt-4">
                            {schedules.length > 0 ? (
                                <>
                                    <p className="text-xs text-slate-400 mb-1 font-bold uppercase tracking-wider">{new Date(schedules[0].date).toLocaleDateString('id-ID', { weekday: 'long' })}</p>
                                    <h3 className="text-xl font-bold leading-tight line-clamp-3 group-hover:text-amber-400 transition-colors">{schedules[0].title}</h3>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-xl font-bold leading-tight">Sholat Tarawih & Witir</h3>
                                    <p className="text-xs text-slate-400 mt-1">Setiap malam ba'da Isya.</p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* CARD 4: BERITA (Dark Mode Adjustment) */}
                    <div className="md:col-span-1 bg-[#1e293b] border border-white/5 rounded-[2.5rem] p-8 shadow-lg flex flex-col justify-between group cursor-pointer hover:border-emerald-500/50 transition-all relative overflow-hidden">
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-600/20 rounded-full blur-3xl group-hover:bg-emerald-500/30 transition-colors"></div>
                        
                        <div className="flex items-center justify-between relative z-10">
                            <div className="bg-white/5 p-2 rounded-xl text-slate-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-colors">
                                <Users size={20} />
                            </div>
                            <ArrowUpRight className="text-slate-500 group-hover:text-white transition-colors" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-1 text-white">Kabar<br/>Ramadhan.</h3>
                            <p className="text-slate-400 text-xs font-medium">Dokumentasi kegiatan.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- LATEST NEWS SECTION (Dark Mode) --- */}
            <section id="berita" className="py-24 bg-[#0f172a] border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <span className="text-amber-500 font-bold tracking-widest text-xs uppercase mb-2 block">Tausiyah & Berita</span>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Kajian Terbaru.</h2>
                        </div>
                        <Link href={route('articles.index')} className="hidden md:flex items-center gap-2 text-slate-300 font-bold hover:text-white transition-colors bg-white/5 px-5 py-2 rounded-full hover:bg-white/10">
                            Lihat Semua <ArrowRight size={16}/>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {articles.length > 0 ? articles.map((article) => (
                            <Link href="#" key={article.id} className="group cursor-pointer">
                                <div className="aspect-[16/10] rounded-[2rem] overflow-hidden mb-6 bg-[#1e293b] relative shadow-md group-hover:shadow-xl transition-all duration-500 border border-white/5">
                                    {article.image ? (
                                        <img src={`/storage/${article.image}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" alt={article.title} />
                                    ) : (
                                        <div className="flex items-center justify-center w-full h-full text-slate-600 bg-[#1e293b]">
                                            <Moon className="w-12 h-12 opacity-30"/>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                                    <div className="absolute bottom-5 left-5 right-5">
                                         <span className="inline-block px-3 py-1 bg-amber-500/90 backdrop-blur-md rounded-lg text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-2 shadow-lg">
                                            {new Date(article.created_at).toLocaleDateString('id-ID')}
                                        </span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-white leading-snug group-hover:text-amber-400 transition-colors line-clamp-2 mb-2">
                                    {article.title}
                                </h3>
                                <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
                                    {article.content ? article.content.substring(0, 100).replace(/<[^>]*>?/gm, '') : 'Klik untuk membaca selengkapnya...'}
                                </p>
                            </Link>
                        )) : (
                            <div className="col-span-3 py-20 text-center border-2 border-dashed border-white/10 rounded-3xl">
                                <p className="text-slate-400 font-medium">Belum ada artikel dipublikasikan.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* --- FOOTER (Dark Mode) --- */}
            <footer className="bg-[#0f172a] pt-20 pb-10 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                            <div className="w-8 h-8 bg-amber-500 text-slate-900 rounded-lg flex items-center justify-center font-bold">S</div>
                            <span className="font-bold text-xl tracking-tight text-white">Sabilillah.</span>
                        </div>
                        <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
                            Mewujudkan tata kelola masjid yang transparan, modern, dan melayani umat dengan sepenuh hati di bulan yang suci.
                        </p>
                    </div>
                    
                    <div className="flex gap-8 text-sm font-bold text-slate-300">
                        <a href="#" className="hover:text-amber-400 transition-colors">Tentang Kami</a>
                        <a href="#" className="hover:text-amber-400 transition-colors">Layanan</a>
                        <a href="#" className="hover:text-amber-400 transition-colors">Kontak</a>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-medium">
                    <p>&copy; 2025 Masjid Sabilillah Digital. All rights reserved.</p>
                    <p className="text-amber-500/80">Ramadhan Kareem.</p>
                </div>
            </footer>
        </div>
    );
}