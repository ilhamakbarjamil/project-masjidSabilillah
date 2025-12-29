import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { 
    Check, 
    X, 
    RotateCcw, 
    Package, 
    Calendar, 
    User, 
    Clock, 
    AlertCircle, 
    CheckCircle2,
    Timer,
    ArrowUpRight
} from 'lucide-react';

export default function Loans({ auth, loans = [] }) {
    const user = auth?.user;

    // Hitung statistik sederhana untuk Header
    const stats = {
        pending: loans.filter(l => l.status === 'pending').length,
        active: loans.filter(l => l.status === 'approved').length,
        returned: loans.filter(l => l.status === 'returned').length
    };

    const updateStatus = (id, status) => {
        let message = '';
        if (status === 'approved') message = 'Setujui peminjaman ini?';
        else if (status === 'rejected') message = 'Tolak peminjaman ini?';
        else if (status === 'returned') message = 'Konfirmasi barang sudah kembali?';

        if(confirm(message)) {
            router.patch(route('admin.loans.update', id), { 
                status: status 
            }, {
                preserveScroll: true,
                onSuccess: () => {
                    // Optional: Toast notification logic here
                }
            });
        }
    };

    // Helper untuk warna status
    const getStatusStyle = (status) => {
        switch(status) {
            case 'pending': return 'bg-amber-50 text-amber-700 border-amber-100 ring-amber-500/20';
            case 'approved': return 'bg-emerald-50 text-emerald-700 border-emerald-100 ring-emerald-500/20';
            case 'returned': return 'bg-blue-50 text-blue-700 border-blue-100 ring-blue-500/20';
            case 'rejected': return 'bg-red-50 text-red-700 border-red-100 ring-red-500/20';
            default: return 'bg-gray-50 text-gray-600 border-gray-100';
        }
    };

    const getStatusLabel = (status) => {
        switch(status) {
            case 'pending': return 'Menunggu Persetujuan';
            case 'approved': return 'Sedang Dipinjam';
            case 'returned': return 'Sudah Dikembalikan';
            case 'rejected': return 'Ditolak';
            default: return status;
        }
    };

    return (
        <AuthenticatedLayout user={user} header={<h2 className="font-bold text-xl text-slate-800 tracking-tight">Kelola Peminjaman</h2>}>
            <Head title="Admin Peminjaman" />
            
            <div className="py-12 bg-slate-50 min-h-screen font-sans">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* STATS HEADER */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
                            <div className="p-3 bg-amber-50 rounded-2xl text-amber-600"><Timer size={24} /></div>
                            <div>
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Perlu Persetujuan</p>
                                <p className="text-2xl font-black text-slate-800">{stats.pending}</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
                            <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600"><ArrowUpRight size={24} /></div>
                            <div>
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Sedang Dipinjam</p>
                                <p className="text-2xl font-black text-slate-800">{stats.active}</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
                            <div className="p-3 bg-blue-50 rounded-2xl text-blue-600"><CheckCircle2 size={24} /></div>
                            <div>
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Selesai / Kembali</p>
                                <p className="text-2xl font-black text-slate-800">{stats.returned}</p>
                            </div>
                        </div>
                    </div>

                    {/* TABLE SECTION */}
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100 text-left">
                                        <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest pl-8">Jamaah / Peminjam</th>
                                        <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Barang Inventaris</th>
                                        <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                        <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest text-right pr-8">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {loans.length > 0 ? loans.map((loan) => (
                                        <tr key={loan.id} className="hover:bg-slate-50 transition duration-150 group">
                                            
                                            {/* USER COLUMN */}
                                            <td className="p-6 pl-8">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm">
                                                        {loan.user?.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-slate-800 text-sm">{loan.user?.name}</div>
                                                        <div className="flex items-center gap-1 text-slate-400 text-xs mt-0.5">
                                                            <Calendar size={12} />
                                                            <span>{new Date(loan.loan_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* ITEM COLUMN */}
                                            <td className="p-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                                                        <Package size={18} />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-slate-700 text-sm">{loan.item?.name}</div>
                                                        <div className="text-xs font-medium text-slate-400">{loan.quantity} Unit</div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* STATUS COLUMN */}
                                            <td className="p-6">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ring-1 ${getStatusStyle(loan.status)}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${
                                                        loan.status === 'pending' ? 'bg-amber-500' :
                                                        loan.status === 'approved' ? 'bg-emerald-500' :
                                                        loan.status === 'returned' ? 'bg-blue-500' : 'bg-red-500'
                                                    }`}></span>
                                                    {getStatusLabel(loan.status)}
                                                </span>
                                            </td>

                                            {/* ACTIONS COLUMN */}
                                            <td className="p-6 pr-8 text-right">
                                                <div className="flex justify-end gap-2">
                                                    {loan.status === 'pending' && (
                                                        <>
                                                            <button 
                                                                onClick={() => updateStatus(loan.id, 'approved')} 
                                                                className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-100"
                                                                title="Setujui"
                                                            >
                                                                <Check size={16} /> <span className="hidden sm:inline">Terima</span>
                                                            </button>
                                                            <button 
                                                                onClick={() => updateStatus(loan.id, 'rejected')} 
                                                                className="flex items-center gap-2 bg-white border border-red-200 text-red-500 px-3 py-2 rounded-xl text-xs font-bold hover:bg-red-50 transition"
                                                                title="Tolak"
                                                            >
                                                                <X size={16} />
                                                            </button>
                                                        </>
                                                    )}
                                                    
                                                    {loan.status === 'approved' && (
                                                        <button 
                                                            onClick={() => updateStatus(loan.id, 'returned')} 
                                                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100 ml-auto"
                                                        >
                                                            <RotateCcw size={16} /> Kembalikan Barang
                                                        </button>
                                                    )}
                                                    
                                                    {['returned', 'rejected'].includes(loan.status) && (
                                                        <span className="text-slate-300 text-xs font-medium italic flex items-center justify-end gap-1">
                                                            <CheckCircle2 size={14} /> Selesai
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="4" className="p-12 text-center">
                                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                                    <Clock size={32} />
                                                </div>
                                                <h3 className="text-slate-900 font-bold">Belum ada data peminjaman</h3>
                                                <p className="text-slate-400 text-sm mt-1">Permintaan peminjaman barang akan muncul di sini.</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}