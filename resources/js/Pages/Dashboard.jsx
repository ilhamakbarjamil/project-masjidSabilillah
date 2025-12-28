import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Wallet, 
    Package, 
    Handshake, 
    FileText, 
    CheckCircle, 
    ArrowUpRight, 
    Calendar,
    Users
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

    return (
        <AuthenticatedLayout
            user={auth?.user}
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="font-black text-2xl text-slate-800 leading-tight">Dashboard</h2>
                        <p className="text-slate-500 text-sm flex items-center gap-2 mt-1">
                            <Calendar size={14} /> {today}
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-10 bg-[#FBFCFE] min-h-screen">
                <div className="max-w-7xl mx-auto px-6">
                    
                    {/* WELCOME HERO */}
                    <div className="relative overflow-hidden bg-emerald-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl shadow-emerald-200/50 mb-10">
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="text-center md:text-left">
                                <h3 className="text-4xl font-black mb-3 tracking-tight">
                                    Assalamu'alaikum, <span className="text-emerald-400">{auth?.user?.name.split('')[0]}!</span>
                                </h3>
                                <p className="text-emerald-100/80 text-lg max-w-md leading-relaxed">
                                    Selamat datang kembali di portal manajemen Masjid Sabilillah. Mari berkhidmat untuk umat hari ini.
                                </p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl text-center min-w-[200px]">
                                <p className="text-emerald-300 text-xs uppercase tracking-widest font-bold mb-1">Status Akun</p>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                                    <span className="text-xl font-bold capitalize">{auth?.user?.role || 'Jamaah'}</span>
                                </div>
                            </div>
                        </div>
                        {/* Decorative Circles */}
                        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-emerald-500 rounded-full blur-[80px] opacity-20"></div>
                        <div className="absolute bottom-[-20%] left-[-5%] w-40 h-40 bg-emerald-400 rounded-full blur-[60px] opacity-10"></div>
                    </div>

                    {/* STATS GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        <StatCard 
                            title="Saldo Kas" 
                            value={formatIDR(stats?.balance)} 
                            icon={<Wallet className="text-emerald-600" size={24} />} 
                            trend="Update Real-time"
                            color="bg-emerald-50" 
                        />
                        <StatCard 
                            title="Total Alat" 
                            value={`${stats?.total_items || 0} Unit`} 
                            icon={<Package className="text-blue-600" size={24} />} 
                            trend="Inventaris Masjid"
                            color="bg-blue-50" 
                        />
                        <StatCard 
                            title="Pinjaman Aktif" 
                            value={`${stats?.active_loans || 0} Orang`} 
                            icon={<Handshake className="text-amber-600" size={24} />} 
                            trend="Perlu Dipantau"
                            color="bg-amber-50" 
                        />
                        <StatCard 
                            title="Total Berita" 
                            value={`${stats?.total_articles || 0} Post`} 
                            icon={<FileText className="text-purple-600" size={24} />} 
                            trend="Kegiatan Jamaah"
                            color="bg-purple-50" 
                        />
                    </div>

                    {/* QUICK ACTIONS SECTION */}
                    <div className="mb-6">
                        <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                            Akses Cepat <div className="h-px flex-1 bg-slate-100"></div>
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <QuickLink 
                                href={route('inventory.index')} 
                                label="Kelola Alat" 
                                sublabel="Inventaris & Stok"
                                icon={<Package size={24} />} 
                            />
                            <QuickLink 
                                href={route('finance.index')} 
                                label="Catat Kas" 
                                sublabel="Pemasukan & Pengeluaran"
                                icon={<Wallet size={24} />} 
                            />
                            <QuickLink 
                                href={route('articles.index')} 
                                label="Tulis Berita" 
                                sublabel="Update Kegiatan"
                                icon={<FileText size={24} />} 
                            />
                            {auth?.user?.role === 'admin' && (
                                <QuickLink 
                                    href={route('admin.loans.index')} 
                                    label="Persetujuan" 
                                    sublabel="Validasi Peminjaman"
                                    icon={<CheckCircle size={24} />} 
                                    variant="admin"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// Komponen StatCard yang Elegan
function StatCard({ title, value, icon, trend, color }) {
    return (
        <div className="bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-6">
                <div className={`${color} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>
                    {icon}
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{trend}</div>
            </div>
            <div>
                <p className="text-sm font-semibold text-slate-500 mb-1">{title}</p>
                <h4 className="text-2xl font-black text-slate-800 tracking-tight">{value}</h4>
            </div>
        </div>
    );
}

// Komponen QuickLink Modern
function QuickLink({ href, label, sublabel, icon, variant = 'default' }) {
    const isAdmin = variant === 'admin';
    return (
        <Link 
            href={href} 
            className={`group p-6 rounded-[2rem] border transition-all duration-300 flex flex-col items-start gap-4
                ${isAdmin 
                    ? 'bg-slate-900 border-slate-900 text-white hover:bg-slate-800' 
                    : 'bg-white border-slate-100 text-slate-800 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/5'}`}
        >
            <div className={`p-3 rounded-xl transition-colors ${isAdmin ? 'bg-white/10 text-emerald-400' : 'bg-slate-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white'}`}>
                {icon}
            </div>
            <div className="flex justify-between items-end w-full">
                <div>
                    <span className="block font-bold text-lg leading-tight">{label}</span>
                    <span className={`text-xs ${isAdmin ? 'text-slate-400' : 'text-slate-500'}`}>{sublabel}</span>
                </div>
                <ArrowUpRight size={20} className={`transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${isAdmin ? 'text-emerald-400' : 'text-slate-300'}`} />
            </div>
        </Link>
    );
}