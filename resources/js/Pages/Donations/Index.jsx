import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios';
// PERBAIKAN: Menambahkan 'Users' ke dalam import lucide-react
import { 
    Heart, 
    ShieldCheck, 
    CreditCard, 
    History, 
    CheckCircle2, 
    Clock, 
    Users 
} from 'lucide-react';

export default function Index({ auth, donations = [], my_donations = [] }) {
    const { data, setData } = useForm({
        donor_name: auth.user?.name || '',
        amount: '',
    });

    const user = auth?.user;

    const handlePayment = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(route('donations.pay'), data);
            const snapToken = response.data.snap_token;

            window.snap.pay(snapToken, {
                onSuccess: function(result) {
                    alert("Infaq Berhasil! Terima kasih.");
                    window.location.reload();
                },
                onPending: function(result) {
                    alert("Menunggu pembayaran Anda.");
                    window.location.reload();
                },
                onError: function(result) {
                    alert("Pembayaran gagal.");
                }
            });
        } catch (error) {
            alert("Terjadi kesalahan, pastikan nominal minimal Rp 10.000");
        }
    };

    const formatIDR = (price) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price || 0);

    return (
        <AuthenticatedLayout user={user} header={<h2 className="font-black text-xl text-emerald-800 uppercase tracking-tight">💖 Infaq Digital</h2>}>
            <Head title="Infaq Sabilillah" />

            <div className="py-12 bg-[#F8FAFC] min-h-screen">
                <div className="max-w-7xl mx-auto px-6">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Kiri: Form Infaq & Riwayat Pribadi */}
                        <div className="lg:col-span-2 space-y-10">
                            
                            {/* Card Form */}
                            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 text-gray-900">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-600">
                                        <Heart />
                                    </div>
                                    <h3 className="text-2xl font-black">Salurkan Infaq Anda</h3>
                                </div>
                                <form onSubmit={handlePayment} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Nama Anda</label>
                                            <input type="text" className="w-full border-slate-100 bg-slate-50 rounded-2xl p-4 font-bold"
                                                value={data.donor_name} onChange={e => setData('donor_name', e.target.value)} required />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Nominal Infaq</label>
                                            <input type="number" className="w-full border-slate-100 bg-slate-50 rounded-2xl p-4 font-bold text-emerald-600 text-xl"
                                                value={data.amount} onChange={e => setData('amount', e.target.value)} placeholder="Rp" required />
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full bg-emerald-600 text-white font-black py-5 rounded-[2rem] hover:bg-emerald-700 transition shadow-xl shadow-emerald-100 flex items-center justify-center gap-3 uppercase text-xs tracking-[0.2em]">
                                        <CreditCard /> Bayar Sekarang
                                    </button>
                                </form>
                            </div>

                            {/* Card Riwayat Pribadi */}
                            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 text-gray-900">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
                                        <History />
                                    </div>
                                    <h3 className="text-2xl font-black tracking-tight">Riwayat Infaq Saya</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {my_donations.length > 0 ? my_donations.map((item) => (
                                        <div key={item.id} className="p-6 rounded-3xl border border-slate-50 bg-slate-50/50 flex justify-between items-center">
                                            <div>
                                                <p className="font-bold text-slate-800">{formatIDR(item.amount)}</p>
                                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{new Date(item.created_at).toLocaleDateString()}</p>
                                            </div>
                                            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase ${item.status === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                                                {item.status === 'success' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                                                {item.status}
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="col-span-2 py-10 text-center text-slate-400 italic font-medium">Anda belum memiliki riwayat infaq.</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Kanan: Riwayat Publik */}
                        <div className="text-gray-900">
                            <h3 className="text-xl font-black mb-6 italic text-slate-800 flex items-center gap-2">
                                <Users size={20} className="text-emerald-500" /> Donatur Terbaru
                            </h3>
                            <div className="space-y-4">
                                {donations.map((item) => (
                                    <div key={item.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex justify-between items-center animate-in fade-in slide-in-from-right-4">
                                        <div>
                                            <p className="font-bold text-slate-700">{item.donor_name}</p>
                                            <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">Infaq Berhasil</p>
                                        </div>
                                        <div className="text-emerald-600 font-black tracking-tighter">{formatIDR(item.amount)}</div>
                                    </div>
                                ))}
                                {donations.length === 0 && (
                                    <p className="text-center text-slate-300 italic py-10">Belum ada donatur terbaru.</p>
                                )}
                            </div>

                            <div className="mt-8 p-6 bg-emerald-50 rounded-3xl flex gap-4 items-center border border-emerald-100">
                                <ShieldCheck className="text-emerald-500 shrink-0" size={32} />
                                <p className="text-[10px] text-emerald-800 leading-relaxed font-bold uppercase tracking-tight">Pembayaran aman & terenkripsi melalui sistem Midtrans.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}