import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { 
    Wallet, 
    ArrowUpCircle, 
    ArrowDownCircle, 
    TrendingUp, 
    TrendingDown, 
    Plus, 
    Trash2, 
    Calendar,
    DollarSign,
    PieChart
} from 'lucide-react';

export default function Index({ auth, finances = [], summary = {} }) {
    const { data, setData, post, reset, processing } = useForm({
        description: '',
        amount: '',
        type: 'income',
        date: new Date().toISOString().split('T')[0],
    });

    const user = auth?.user;

    const submit = (e) => {
        e.preventDefault();
        post(route('finance.store'), { 
            onSuccess: () => reset(),
            preserveScroll: true
        });
    };

    const handleDelete = (id) => {
        if(confirm('Hapus catatan transaksi ini?')) {
            router.delete(route('finance.destroy', id), {
                preserveScroll: true
            });
        }
    };

    const formatIDR = (price) => new Intl.NumberFormat('id-ID', { 
        style: 'currency', 
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price || 0);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'long', year: 'numeric'
        });
    };

    return (
        <AuthenticatedLayout 
            user={user} 
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-[#1d1d1f] leading-tight tracking-tight">
                        Laporan Keuangan
                    </h2>
                    <div className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200">
                        <Calendar size={14} />
                        <span>Periode Berjalan</span>
                    </div>
                </div>
            }
        >
            <Head title="Keuangan Masjid" />

            <div className="py-8 bg-[#f5f5f7] min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* SECTION 1: WALLET CARDS */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                        {/* Main Balance Card (Dark Premium) */}
                        <div className="lg:col-span-1 bg-[#1d1d1f] text-white rounded-[2.5rem] p-8 shadow-2xl shadow-gray-400/20 relative overflow-hidden flex flex-col justify-between h-64 group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px] group-hover:bg-emerald-500/30 transition-all duration-700"></div>
                            
                            <div className="relative z-10 flex justify-between items-start">
                                <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl">
                                    <Wallet size={24} className="text-emerald-400" />
                                </div>
                                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest border border-emerald-500/30 px-2 py-1 rounded-lg">
                                    Kas Masjid
                                </span>
                            </div>

                            <div className="relative z-10">
                                <p className="text-gray-400 text-sm font-medium mb-1">Total Saldo Aktif</p>
                                <h3 className="text-4xl xl:text-5xl font-semibold tracking-tighter">
                                    {formatIDR(summary?.balance)}
                                </h3>
                            </div>
                        </div>

                        {/* Income & Expense Cards */}
                        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Pemasukan */}
                            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col justify-center h-64 hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                                        <ArrowUpCircle size={28} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pemasukan</p>
                                        <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold mt-1">
                                            <TrendingUp size={12} />
                                            <span>Inflow</span>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-3xl font-semibold text-[#1d1d1f] tracking-tight">
                                    {formatIDR(summary?.total_income)}
                                </h3>
                            </div>

                            {/* Pengeluaran */}
                            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col justify-center h-64 hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
                                        <ArrowDownCircle size={28} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pengeluaran</p>
                                        <div className="flex items-center gap-1 text-rose-500 text-xs font-bold mt-1">
                                            <TrendingDown size={12} />
                                            <span>Outflow</span>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-3xl font-semibold text-[#1d1d1f] tracking-tight">
                                    {formatIDR(summary?.total_expense)}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* SECTION 2: ADMIN FORM (Left Column) */}
                        {user?.role === 'admin' && (
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-[2.5rem] p-8 shadow-lg shadow-gray-200/50 border border-gray-100 sticky top-24">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="bg-[#1d1d1f] text-white p-2 rounded-xl">
                                            <Plus size={20} />
                                        </div>
                                        <h3 className="text-lg font-bold text-[#1d1d1f]">Catat Transaksi</h3>
                                    </div>

                                    <form onSubmit={submit} className="space-y-5">
                                        {/* Type Selector (Segmented Control) */}
                                        <div className="p-1 bg-gray-100 rounded-2xl flex">
                                            <button
                                                type="button"
                                                onClick={() => setData('type', 'income')}
                                                className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${data.type === 'income' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                            >
                                                <ArrowUpCircle size={16} /> Pemasukan
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setData('type', 'expense')}
                                                className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${data.type === 'expense' ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                            >
                                                <ArrowDownCircle size={16} /> Pengeluaran
                                            </button>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Keterangan</label>
                                            <input 
                                                type="text" 
                                                className="w-full px-5 py-3 bg-gray-50 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-0 rounded-2xl transition-all font-medium text-[#1d1d1f] placeholder-gray-300"
                                                placeholder="Contoh: Infaq Jumat"
                                                value={data.description} 
                                                onChange={e => setData('description', e.target.value)} 
                                                required 
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Nominal (Rp)</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                                    <span className="font-bold">Rp</span>
                                                </div>
                                                <input 
                                                    type="number" 
                                                    className="w-full pl-12 pr-5 py-3 bg-gray-50 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-0 rounded-2xl transition-all font-bold text-[#1d1d1f] placeholder-gray-300"
                                                    placeholder="0"
                                                    value={data.amount} 
                                                    onChange={e => setData('amount', e.target.value)} 
                                                    required 
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Tanggal</label>
                                            <input 
                                                type="date" 
                                                className="w-full px-5 py-3 bg-gray-50 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-0 rounded-2xl transition-all font-medium text-[#1d1d1f]"
                                                value={data.date} 
                                                onChange={e => setData('date', e.target.value)} 
                                                required 
                                            />
                                        </div>

                                        <button 
                                            disabled={processing}
                                            className="w-full py-4 bg-[#1d1d1f] hover:bg-black text-white rounded-2xl font-bold shadow-lg shadow-black/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 mt-4"
                                        >
                                            <Wallet size={18} /> Simpan Data
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* SECTION 3: TRANSACTION LIST (Right Column) */}
                        <div className={`${user?.role === 'admin' ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
                            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
                                <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-[#1d1d1f]">Riwayat Transaksi</h3>
                                    <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                                        <PieChart size={20} />
                                    </button>
                                </div>

                                <div className="divide-y divide-gray-50">
                                    {finances.length > 0 ? (
                                        finances.map((item) => (
                                            <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                                                <div className="flex items-center gap-4">
                                                    {/* Icon Indicator */}
                                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                                                        item.type === 'income' 
                                                            ? 'bg-emerald-50 text-emerald-600' 
                                                            : 'bg-rose-50 text-rose-600'
                                                    }`}>
                                                        {item.type === 'income' ? <ArrowUpCircle size={24} /> : <ArrowDownCircle size={24} />}
                                                    </div>
                                                    
                                                    {/* Text Info */}
                                                    <div>
                                                        <h4 className="text-base font-bold text-[#1d1d1f] mb-0.5">
                                                            {item.description}
                                                        </h4>
                                                        <p className="text-xs font-medium text-gray-400 flex items-center gap-1">
                                                            {formatDate(item.date)}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Amount & Action */}
                                                <div className="flex items-center justify-between sm:justify-end gap-6 pl-16 sm:pl-0">
                                                    <span className={`text-lg font-bold tracking-tight ${
                                                        item.type === 'income' ? 'text-emerald-600' : 'text-[#1d1d1f]'
                                                    }`}>
                                                        {item.type === 'income' ? '+' : '-'} {formatIDR(item.amount)}
                                                    </span>
                                                    
                                                    {user?.role === 'admin' && (
                                                        <button 
                                                            onClick={() => handleDelete(item.id)}
                                                            className="p-2 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
                                                            title="Hapus Transaksi"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-20 text-center">
                                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
                                                <DollarSign size={40} />
                                            </div>
                                            <h3 className="text-gray-900 font-bold text-lg">Belum ada transaksi</h3>
                                            <p className="text-gray-400 text-sm">Data keuangan akan muncul di sini.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}