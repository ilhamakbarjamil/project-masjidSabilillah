import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Wallet, Package, Activity, FileText, ShieldCheck, 
    ArrowUpRight, Calendar, ChevronRight, TrendingUp, Clock,
    Moon, Star, Sparkles, LayoutList
} from 'lucide-react'; // Tambah icon Ramadhan

export default function Dashboard({ auth, stats }) {
    
    const formatIDR = (price) => {
        return new Intl.NumberFormat('id-ID', { 
            style: 'currency', 
            currency: 'IDR',
            minimumFractionDigits: 0 
        }).format(price || 0);
    };

    const today = new Date().toLocaleDateString('id-ID', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });

    const firstName = auth?.user?.name.split(' ')[0];

    return (
        <AuthenticatedLayout
            user={auth?.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-slate-800 leading-tight tracking-tight">
                        Dashboard
                    </h2>
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
                        <Moon size={12} fill="currentColor"/>
                        {today}
                    </div>
                </div>
            }
        >
            <Head title="Dashboard Ramadhan" />

            <div className="py-8 bg-[#f8fafc] min-h-screen font-sans relative overflow-hidden">
                {/* Background Pattern Subtle */}
                <div className="absolute top-0 right-0 w-full h-96 bg-gradient-to-b from-amber-50/50 to-transparent pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    
                    {/* GREETING SECTION */}
                    <div className="mb-10">
                        <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-slate-900 text-amber-400 text-[10px] font-bold uppercase tracking-widest">
                            <Sparkles size={10} /> Edisi Ramadhan
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-2">
                            Marhaban, <span className="text-amber-500">{firstName}.</span>
                        </h1>
                        <p className="text-lg text-slate-500 font-medium">
                            Semoga harimu penuh berkah. Berikut ringkasan aktivitas masjid.
                        </p>
                    </div>

                    {/* MAIN BENTO GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        
                        {/* 1. HERO CARD: WALLET (Ramadhan Theme - Dark Gold) */}
                        <div className="md:col-span-2 bg-[#0f172a] text-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-slate-300 relative overflow-hidden group">
                            
                            {/* Decorative Elements */}
                            <div className="absolute top-[-20px] right-[-20px] text-amber-500/10 rotate-12">
                                <Moon size={200} fill="currentColor"/>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-amber-900/20 to-transparent"></div>
                            
                            <div className="relative z-10 flex flex-col justify-between h-full min-h-[220px]">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3 text-amber-400">
                                        <div className="p-2 bg-amber-500/20 rounded-xl border border-amber-500/20">
                                            <Wallet size={24} />
                                        </div>
                                        <span className="font-bold tracking-widest text-xs uppercase">Kas & Infaq</span>
                                    </div>
                                    <span className="bg-white/5 px-3 py-1 rounded-full text-xs font-bold text-amber-200 backdrop-blur-md border border-white/10 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></div>
                                        Live Update
                                    </span>
                                </div>
                                
                                <div>
                                    <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-2 text-white">
                                        {formatIDR(stats?.balance)}
                                    </h2>
                                    <p className="text-slate-400 text-sm font-medium flex items-center gap-2">
                                        <TrendingUp size={16} className="text-amber-500" />
                                        Dana amanah untuk kemaslahatan umat.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 2. STATS COLUMN */}
                        <div className="space-y-6">
                            {/* INVENTORY STAT */}
                            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-[48%] group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                        <Package size={24} />
                                    </div>
                                    <span className="text-xs font-bold text-slate-400 uppercase">Aset</span>
                                </div>
                                <div>
                                    <div className="text-4xl font-black text-slate-900 tracking-tight mb-1">
                                        {stats?.total_items || 0}
                                    </div>
                                    <p className="text-slate-500 text-sm font-bold">Total Inventaris</p>
                                </div>
                            </div>

                            {/* LOAN STAT */}
                            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-[48%] group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                        <Activity size={24} />
                                    </div>
                                    <span className="text-xs font-bold text-slate-400 uppercase">Dipinjam</span>
                                </div>
                                <div>
                                    <div className="text-4xl font-black text-slate-900 tracking-tight mb-1">
                                        {stats?.active_loans || 0}
                                    </div>
                                    <p className="text-slate-500 text-sm font-bold">Sedang Digunakan</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CONTROL CENTER / QUICK ACTIONS */}
                    <div className="mb-10">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Akses Cepat.</h3>
                            {auth?.user?.role === 'admin' && (
                                <span className="text-[10px] font-bold bg-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-widest">Administrator</span>
                            )}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <QuickAction 
                                href={route('schedules.index')}
                                icon={<Calendar />}
                                title="Agenda"
                                subtitle="Jadwal Ramadhan"
                                color="amber" // Warna Emas
                            />
                            <QuickAction 
                                href={route('finance.index')}
                                icon={<Wallet />}
                                title="Keuangan"
                                subtitle="Catat Infaq"
                                color="emerald"
                            />
                            <QuickAction 
                                href={route('articles.index')}
                                icon={<FileText />}
                                title="Kultum"
                                subtitle="Tulis Artikel"
                                color="blue"
                            />
                            {auth?.user?.role === 'admin' && (
                                <QuickAction 
                                    href={route('admin.loans.index')}
                                    icon={<ShieldCheck />}
                                    title="Validasi"
                                    subtitle="Cek Peminjaman"
                                    color="slate"
                                    dark
                                />
                            )}
                        </div>
                    </div>

                    {/* RECENT ACTIVITY */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-slate-100 rounded-lg text-slate-500"><Clock size={18} /></div>
                                <h3 className="text-xl font-bold text-slate-900">Aktivitas Terkini</h3>
                            </div>
                            <Link href={route('articles.index')} className="text-sm font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full">
                                Lihat Semua <ChevronRight size={14} />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Card Info 1 */}
                            <div className="p-6 bg-slate-50 rounded-3xl hover:bg-amber-50 transition-colors cursor-pointer group border border-slate-100 hover:border-amber-100">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="text-[10px] font-black text-amber-500 mb-2 uppercase tracking-widest bg-amber-100 px-2 py-1 rounded w-fit">Info Ramadhan</div>
                                    <Star size={16} className="text-slate-300 group-hover:text-amber-400 fill-current transition-colors" />
                                </div>
                                <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-700">Jadwal Imsakiyah Tersedia</h4>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                                    Jadwal imsakiyah dan waktu sholat selama bulan Ramadhan kini dapat diakses langsung di halaman depan.
                                </p>
                            </div>
                            
                            {/* Card Info 2 */}
                            <div className="p-6 bg-white rounded-3xl flex items-center justify-center text-slate-400 font-bold text-sm border-2 border-dashed border-slate-200">
                                Belum ada notifikasi baru
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// Reusable Component for Quick Actions
function QuickAction({ href, icon, title, subtitle, color, dark = false }) {
    const colorClasses = {
        blue: 'text-blue-600 bg-blue-50 group-hover:bg-blue-600 group-hover:text-white',
        emerald: 'text-emerald-600 bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white',
        amber: 'text-amber-600 bg-amber-50 group-hover:bg-amber-500 group-hover:text-white', // Warna Ramadhan
        slate: 'text-white bg-slate-800 group-hover:bg-slate-700',
    };

    return (
        <Link 
            href={href} 
            className={`group relative p-6 rounded-3xl transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between h-40
                ${dark 
                    ? 'bg-[#0f172a] text-white shadow-xl shadow-slate-900/20' 
                    : 'bg-white text-slate-900 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 border border-slate-100'}`}
        >
            <div className="flex justify-between items-start">
                <div className={`p-3 rounded-2xl transition-colors duration-300 ${dark ? 'bg-white/10' : colorClasses[color]}`}>
                    {icon}
                </div>
                <ArrowUpRight size={20} className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${dark ? 'text-slate-400' : 'text-slate-300'}`} />
            </div>
            
            <div>
                <h4 className="text-lg font-bold tracking-tight mb-0.5">{title}</h4>
                <p className={`text-xs font-bold ${dark ? 'text-slate-400' : 'text-slate-400'}`}>{subtitle}</p>
            </div>
        </Link>
    );
}