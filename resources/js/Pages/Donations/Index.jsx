import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios';
import { 
    Heart, 
    ShieldCheck, 
    CreditCard, 
    History, 
    CheckCircle2, 
    Clock, 
    Users,
    Wallet,
    ArrowRight
} from 'lucide-react';

export default function Index({ auth, donations = [], my_donations = [] }) {
    const { data, setData } = useForm({
        donor_name: auth.user?.name || '',
        amount: '',
    });

    // State untuk animasi loading
    const [isLoading, setIsLoading] = useState(false);

    const handlePayment = async (e) => {
        e.preventDefault();
        setIsLoading(true);
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
                    setIsLoading(false);
                },
                onClose: function() {
                    setIsLoading(false);
                }
            });
        } catch (error) {
            alert("Terjadi kesalahan, pastikan nominal minimal Rp 10.000");
            setIsLoading(false);
        }
    };

    const formatIDR = (price) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price || 0);

    // Pilihan Nominal Cepat
    const quickAmounts = [20000, 50000, 100000, 250000, 500000];

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-bold text-xl text-slate-800 tracking-tight">Infaq & Sedekah</h2>}>
            <Head title="Infaq Sabilillah" />

            <div className="py-12 bg-slate-50 min-h-screen font-sans">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* HERO SECTION */}
                    <div className="text-center mb-12 max-w-2xl mx-auto">
                        <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-4">
                            Sabilillah Digital
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
                            Investasi Terbaik untuk <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Kehidupan Abadi.</span>
                        </h1>
                        <p className="text-slate-500 text-lg">Salurkan harta Anda dengan aman, transparan, dan mudah melalui platform digital masjid kami.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        
                        {/* LEFT COLUMN: DONATION FORM (Utama) */}
                        <div className="lg:col-span-7 space-y-8">
                            
                            {/* Card Form */}
                            <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50/50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                                
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-slate-200">
                                            <Wallet size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900">Isi Nominal Infaq</h3>
                                            <p className="text-slate-500 text-sm">Pilih nominal atau masukkan jumlah manual.</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handlePayment} className="space-y-8">
                                        
                                        {/* Quick Amount Selector */}
                                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                                            {quickAmounts.map((amt) => (
                                                <button 
                                                    key={amt}
                                                    type="button"
                                                    onClick={() => setData('amount', amt)}
                                                    className={`py-3 px-2 rounded-xl text-sm font-bold border transition-all duration-200 ${
                                                        data.amount == amt 
                                                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-200 transform scale-105' 
                                                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-emerald-400 hover:bg-white'
                                                    }`}
                                                >
                                                    {amt/1000}k
                                                </button>
                                            ))}
                                        </div>

                                        <div className="space-y-5">
                                            {/* Manual Amount Input */}
                                            <div className="relative group/input">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block pl-1">Nominal Lainnya</label>
                                                <div className="relative">
                                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xl">Rp</span>
                                                    <input 
                                                        type="number" 
                                                        className="w-full pl-16 pr-6 py-5 rounded-2xl bg-slate-50 border-0 focus:ring-2 focus:ring-emerald-500 text-2xl font-bold text-slate-800 transition-all placeholder:text-slate-300 group-hover/input:bg-slate-100 focus:bg-white"
                                                        value={data.amount} 
                                                        onChange={e => setData('amount', e.target.value)} 
                                                        placeholder="0" 
                                                        required 
                                                    />
                                                </div>
                                            </div>

                                            {/* Name Input */}
                                            <div>
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block pl-1">Nama Hamba Allah</label>
                                                <input 
                                                    type="text" 
                                                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-0 focus:ring-2 focus:ring-emerald-500 font-semibold text-slate-800 transition-all placeholder:text-slate-400 focus:bg-white"
                                                    value={data.donor_name} 
                                                    onChange={e => setData('donor_name', e.target.value)} 
                                                    placeholder="Nama Lengkap / Hamba Allah"
                                                    required 
                                                />
                                            </div>
                                        </div>

                                        <button 
                                            type="submit" 
                                            disabled={isLoading}
                                            className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold py-5 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-emerald-200 hover:-translate-y-1 flex items-center justify-center gap-3 text-sm tracking-widest uppercase disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {isLoading ? (
                                                <>Memproses...</>
                                            ) : (
                                                <>Lanjutkan Pembayaran <ArrowRight size={18} /></>
                                            )}
                                        </button>
                                    </form>

                                    <div className="mt-8 flex items-center justify-center gap-2 text-slate-400 text-xs font-medium bg-slate-50 py-3 rounded-xl border border-slate-100">
                                        <ShieldCheck size={14} className="text-emerald-500" /> 
                                        Pembayaran aman & terenkripsi via Midtrans
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: HISTORY & SOCIAL PROOF */}
                        <div className="lg:col-span-5 space-y-6">
                            
                            {/* User's History Widget */}
                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                                        <History className="text-emerald-500" size={20} /> Riwayat Saya
                                    </h3>
                                    <span className="text-xs bg-slate-100 px-2 py-1 rounded-md text-slate-500 font-bold">{my_donations.length}</span>
                                </div>
                                
                                <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                                    {my_donations.length > 0 ? my_donations.map((item) => (
                                        <div key={item.id} className="group p-4 rounded-2xl border border-slate-50 hover:border-emerald-100 bg-slate-50 hover:bg-emerald-50/30 transition-colors flex justify-between items-center">
                                            <div>
                                                <p className="font-bold text-slate-800 text-lg tracking-tight">{formatIDR(item.amount)}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{new Date(item.created_at).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'})}</p>
                                            </div>
                                            <div className={`p-2 rounded-full ${item.status === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                                                {item.status === 'success' ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="py-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                            <p className="text-slate-400 text-sm font-medium">Belum ada riwayat infaq.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Public Feed Widget */}
                            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-6 rounded-3xl shadow-xl shadow-emerald-200 text-white relative overflow-hidden">
                                {/* Decorative Circles */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black opacity-10 rounded-full blur-xl -ml-10 -mb-10"></div>

                                <h3 className="font-bold text-lg mb-6 flex items-center gap-2 relative z-10">
                                    <Users size={20} className="text-emerald-200" /> Donatur Terbaru
                                </h3>
                                
                                <div className="space-y-3 relative z-10">
                                    {donations.slice(0, 3).map((item, idx) => (
                                        <div key={item.id} className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-emerald-200/20 flex items-center justify-center text-xs font-bold text-emerald-100 border border-emerald-400/30">
                                                    {item.donor_name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm text-white leading-tight">{item.donor_name}</p>
                                                    <p className="text-[10px] text-emerald-200 uppercase tracking-wider opacity-80">Baru Saja</p>
                                                </div>
                                            </div>
                                            <div className="font-bold text-sm tracking-tight">{formatIDR(item.amount)}</div>
                                        </div>
                                    ))}
                                    {donations.length === 0 && (
                                        <p className="text-center text-emerald-100 italic py-4 text-sm">Jadilah donatur pertama hari ini.</p>
                                    )}
                                </div>

                                <div className="mt-6 pt-4 border-t border-white/10 text-center">
                                    <p className="text-[10px] uppercase tracking-widest text-emerald-200 font-bold">Terima kasih orang baik</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}