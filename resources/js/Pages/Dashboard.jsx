import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Wallet, 
    Package, 
    Activity, 
    FileText, 
    ShieldCheck, 
    ArrowUpRight, 
    Calendar,
    ChevronRight,
    TrendingUp,
    Clock
} from 'lucide-react';

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
                    <h2 className="font-semibold text-xl text-[#1d1d1f] leading-tight tracking-tight">
                        Overview
                    </h2>
                    <div className="text-xs font-medium text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
                        {today}
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8 bg-[#f5f5f7] min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* GREETING SECTION */}
                    <div className="mb-10">
                        <h1 className="text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tighter mb-2">
                            Selamat Datang, <span className="text-emerald-600">{firstName}.</span>
                        </h1>
                        <p className="text-xl text-gray-500 font-medium">
                            Berikut ringkasan aktivitas masjid hari ini.
                        </p>
                    </div>

                    {/* MAIN BENTO GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        
                        {/* 1. HERO CARD: WALLET (Dark Theme) */}
                        <div className="md:col-span-2 bg-[#1d1d1f] text-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-gray-300 relative overflow-hidden group">
                            {/* Abstract Background */}
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-700"></div>
                            
                            <div className="relative z-10 flex flex-col justify-between h-full min-h-[220px]">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3 text-emerald-400">
                                        <div className="p-2 bg-emerald-500/20 rounded-xl">
                                            <Wallet size={24} />
                                        </div>
                                        <span className="font-bold tracking-widest text-xs uppercase">Total Kas Masjid</span>
                                    </div>
                                    <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md border border-white/10 flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                                        Live
                                    </span>
                                </div>
                                
                                <div>
                                    <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-2">
                                        {formatIDR(stats?.balance)}
                                    </h2>
                                    <p className="text-gray-400 text-sm font-medium flex items-center gap-2">
                                        <TrendingUp size={16} className="text-emerald-400" />
                                        Dana umat yang amanah & transparan.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 2. STATS COLUMN */}
                        <div className="space-y-6">
                            {/* INVENTORY STAT */}
                            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-white/50 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between h-[48%]">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                        <Package size={24} />
                                    </div>
                                    <span className="text-xs font-bold text-gray-400 uppercase">Aset</span>
                                </div>
                                <div>
                                    <div className="text-4xl font-semibold text-[#1d1d1f] tracking-tight mb-1">
                                        {stats?.total_items || 0}
                                    </div>
                                    <p className="text-gray-500 text-sm font-medium">Total Inventaris</p>
                                </div>
                            </div>

                            {/* LOAN STAT */}
                            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-white/50 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between h-[48%]">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                                        <Activity size={24} />
                                    </div>
                                    <span className="text-xs font-bold text-gray-400 uppercase">Pinjaman</span>
                                </div>
                                <div>
                                    <div className="text-4xl font-semibold text-[#1d1d1f] tracking-tight mb-1">
                                        {stats?.active_loans || 0}
                                    </div>
                                    <p className="text-gray-500 text-sm font-medium">Sedang Dipinjam</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CONTROL CENTER / QUICK ACTIONS */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-semibold text-[#1d1d1f] tracking-tight">Menu Cepat.</h3>
                            {auth?.user?.role === 'admin' && (
                                <span className="text-xs font-bold bg-black text-white px-3 py-1 rounded-full">ADMIN MODE</span>
                            )}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <QuickAction 
                                href={route('inventory.index')}
                                icon={<Package />}
                                title="Inventaris"
                                subtitle="Kelola Barang"
                                color="blue"
                            />
                            <QuickAction 
                                href={route('finance.index')}
                                icon={<Wallet />}
                                title="Keuangan"
                                subtitle="Catat Kas"
                                color="emerald"
                            />
                            <QuickAction 
                                href={route('articles.index')}
                                icon={<FileText />}
                                title="Berita"
                                subtitle="Tulis Artikel"
                                color="purple"
                            />
                            {auth?.user?.role === 'admin' && (
                                <QuickAction 
                                    href={route('admin.loans.index')}
                                    icon={<ShieldCheck />}
                                    title="Persetujuan"
                                    subtitle="Validasi Peminjaman"
                                    color="slate"
                                    dark
                                />
                            )}
                        </div>
                    </div>

                    {/* RECENT ACTIVITY OR NEWS TEASER */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <Clock className="text-gray-400" />
                                <h3 className="text-xl font-bold text-[#1d1d1f]">Informasi Terkini</h3>
                            </div>
                            <Link href={route('articles.index')} className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                                Lihat Semua <ChevronRight size={16} />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 bg-gray-50 rounded-3xl hover:bg-emerald-50 transition-colors cursor-pointer group">
                                <div className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide group-hover:text-emerald-500">System Update</div>
                                <h4 className="text-lg font-bold text-[#1d1d1f] mb-2">Selamat Datang di Portal Baru</h4>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Nikmati kemudahan manajemen masjid dengan tampilan baru yang lebih modern dan cepat.
                                </p>
                            </div>
                            {/* Placeholder for second item */}
                            <div className="p-6 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-400 font-medium text-sm border-2 border-dashed border-gray-200">
                                Tidak ada notifikasi baru
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
        purple: 'text-purple-600 bg-purple-50 group-hover:bg-purple-600 group-hover:text-white',
        slate: 'text-white bg-slate-700 group-hover:bg-slate-600',
    };

    return (
        <Link 
            href={href} 
            className={`group relative p-6 rounded-3xl transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between h-40
                ${dark 
                    ? 'bg-[#1d1d1f] text-white shadow-xl shadow-gray-400/20' 
                    : 'bg-white text-[#1d1d1f] shadow-sm hover:shadow-xl hover:shadow-gray-200/50 border border-gray-100'}`}
        >
            <div className="flex justify-between items-start">
                <div className={`p-3 rounded-2xl transition-colors duration-300 ${dark ? 'bg-white/10' : colorClasses[color]}`}>
                    {icon}
                </div>
                <ArrowUpRight size={20} className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${dark ? 'text-gray-400' : 'text-gray-300'}`} />
            </div>
            
            <div>
                <h4 className="text-lg font-bold tracking-tight mb-0.5">{title}</h4>
                <p className={`text-xs font-medium ${dark ? 'text-gray-400' : 'text-gray-400'}`}>{subtitle}</p>
            </div>
        </Link>
    );
}