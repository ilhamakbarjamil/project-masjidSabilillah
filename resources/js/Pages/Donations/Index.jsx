import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios';
import {
    CheckCircle2, Clock, Copy,
    History, Users, ShieldCheck, Wallet,
    ArrowRight, X, Loader2,
    Smartphone, FileText, HeartHandshake, MousePointerClick
} from 'lucide-react';

export default function Index({ auth, donations = [], my_donations = [] }) {
    const [paymentResult, setPaymentResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { data, setData, processing } = useForm({
        donor_name: auth.user?.name || '',
        amount: '',
        bank: '',
    });

    const user = auth?.user;

    // --- DATA LOGO BANK & QRIS ---
    const paymentMethods = [
        {
            id: 'qris',
            name: 'QRIS',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_QRIS.svg',
            desc: 'Scan E-Wallet'
        },
        {
            id: 'bca',
            name: 'BCA',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg',
            desc: 'Cek Otomatis'
        },
        {
            id: 'bri',
            name: 'BRI',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/6/68/BANK_BRI_logo.svg',
            desc: 'Cek Otomatis'
        },
        {
            id: 'mandiri',
            name: 'Mandiri',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg',
            desc: 'Cek Otomatis'
        },
        {
            id: 'bni',
            name: 'BNI',
            logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/55/BNI_logo.svg/1200px-BNI_logo.svg.png',
            desc: 'Cek Otomatis'
        }
    ];

    const quickAmounts = [10000, 20000, 50000, 100000, 250000, 500000];

    // --- PANDUAN LANGKAH-LANGKAH ---
    const steps = [
        {
            icon: <FileText size={20} />,
            title: "1. Isi Nominal",
            desc: "Pilih nominal cepat atau masukkan jumlah infaq yang diinginkan."
        },
        {
            icon: <MousePointerClick size={20} />,
            title: "2. Pilih Metode",
            desc: "Pilih bayar via QRIS (E-Wallet) atau Transfer Bank (VA)."
        },
        {
            icon: <Smartphone size={20} />,
            title: "3. Lakukan Bayar",
            desc: "Scan QR atau transfer ke nomor Virtual Account yang muncul."
        },
        {
            icon: <HeartHandshake size={20} />,
            title: "4. Selesai",
            desc: "Sistem otomatis mendeteksi & mencatat infaq Anda."
        }
    ];

    // --- LOGIKA AUTO POLLING ---
    useEffect(() => {
        let interval;
        if (paymentResult && paymentResult.status === 'pending') {
            interval = setInterval(async () => {
                try {
                    // Gunakan route helper Laravel atau URL manual
                    // Pastikan route('donations.check', id) sudah ada di web.php
                    const res = await axios.get(route('donations.check', paymentResult.id));
                    
                    if (res.data.status === 'success') {
                        clearInterval(interval);
                        alert("Alhamdulillah, Infaq Berhasil Diterima!");
                        window.location.reload();
                    }
                } catch (err) {
                    console.error("Gagal mengecek status pembayaran");
                }
            }, 3000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [paymentResult]);

    const handlePay = async (e) => {
        e.preventDefault();
        if (!data.bank) return alert("Silakan pilih metode pembayaran!");
        setIsLoading(true);

        try {
            const res = await axios.post(route('donations.pay'), {
                ...data,
                payment_method: data.bank
            });
            setPaymentResult(res.data);
            setIsLoading(false);
        } catch (err) {
            alert("Error: Minimal infaq Rp 1.000 atau terjadi kesalahan server.");
            setIsLoading(false);
        }
    };

    const formatIDR = (price) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price || 0);

    return (
        <AuthenticatedLayout user={user} header={<h2 className="font-bold text-xl text-slate-800 tracking-tight">Sabilillah Infaq</h2>}>
            <Head title="Infaq Sabilillah" />

            <div className="py-12 bg-slate-50 min-h-screen font-sans relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* HERO SECTION */}
                    <div className="mb-8 text-center max-w-2xl mx-auto">
                        <span className="inline-block py-1 px-4 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-4">
                            Sabilillah Digital
                        </span>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                            Investasi Abadi untuk <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Umat & Masa Depan.</span>
                        </h1>
                    </div>

                    {/* --- PANDUAN LANGKAH (BARU) --- */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                        {steps.map((step, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center hover:-translate-y-1 transition duration-300">
                                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                                    {step.icon}
                                </div>
                                <h4 className="font-bold text-sm text-slate-800 mb-1">{step.title}</h4>
                                <p className="text-[10px] text-slate-500 leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                    {/* ----------------------------- */}

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* KOLOM KIRI: FORMULIR */}
                        <div className="lg:col-span-7 space-y-8">
                            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 relative overflow-hidden">
                                
                                <div className="flex items-center gap-4 mb-8 relative z-10">
                                    <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-slate-200">
                                        <Wallet size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 leading-tight">Formulir Infaq</h3>
                                        <p className="text-sm text-slate-500">Isi data untuk mulai berinfaq</p>
                                    </div>
                                </div>

                                <form onSubmit={handlePay} className="space-y-8 relative z-10">

                                    {/* Quick Amount Selector */}
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Pilih Cepat</label>
                                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                                            {quickAmounts.map((amt) => (
                                                <button
                                                    key={amt}
                                                    type="button"
                                                    onClick={() => setData('amount', amt)}
                                                    className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all duration-200 ${data.amount == amt
                                                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-md transform scale-105'
                                                            : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100'
                                                        }`}
                                                >
                                                    {amt / 1000}k
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Manual Input */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nominal (Rp)</label>
                                            <input type="number"
                                                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-0 focus:ring-2 focus:ring-emerald-500 font-bold text-xl text-emerald-700 placeholder:text-slate-300 transition-all"
                                                value={data.amount} onChange={e => setData('amount', e.target.value)} placeholder="0" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nama Donatur</label>
                                            <input type="text"
                                                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-0 focus:ring-2 focus:ring-emerald-500 font-bold text-slate-800 placeholder:text-slate-300 transition-all"
                                                value={data.donor_name} onChange={e => setData('donor_name', e.target.value)} placeholder="Hamba Allah" required />
                                        </div>
                                    </div>

                                    {/* Payment Methods Grid */}
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Metode Pembayaran</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                            {paymentMethods.map((method) => (
                                                <div key={method.id} onClick={() => setData('bank', method.id)}
                                                    className={`relative cursor-pointer h-24 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all duration-200 group bg-white ${data.bank === method.id
                                                            ? 'border-emerald-500 bg-emerald-50/30 ring-2 ring-emerald-500 ring-offset-2'
                                                            : 'border-slate-100 hover:border-emerald-200 hover:shadow-md'
                                                        }`}>

                                                    <img src={method.logo} alt={method.name} className="h-8 w-auto object-contain" />
                                                    
                                                    {data.bank === method.id && (
                                                        <div className="absolute top-2 right-2 text-emerald-600 animate-in zoom-in duration-200">
                                                            <CheckCircle2 size={16} fill="currentColor" className="text-white" />
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing || isLoading}
                                        className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold py-5 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-emerald-200 hover:-translate-y-1 flex items-center justify-center gap-3 uppercase text-xs tracking-[0.2em] disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isLoading || processing ? <><Loader2 className="animate-spin" size={16} /> MEMPROSES...</> : <>LANJUTKAN PEMBAYARAN <ArrowRight size={16} /></>}
                                    </button>
                                </form>

                                <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                                    <ShieldCheck size={14} className="text-emerald-500" />
                                    Secure Payment by Midtrans
                                </div>
                            </div>
                        </div>

                        {/* KOLOM KANAN: HISTORY & FEED */}
                        <div className="lg:col-span-5 space-y-6">

                            {/* Riwayat User */}
                            <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
                                <div className="flex justify-between items-center mb-6 px-2">
                                    <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                                        <History className="text-emerald-500" size={20} /> Riwayat Saya
                                    </h3>
                                </div>
                                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                    {my_donations.length > 0 ? my_donations.map((item) => (
                                        <div key={item.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center hover:bg-emerald-50/30 transition duration-200">
                                            <div>
                                                <p className="font-black text-slate-700 text-sm">{formatIDR(item.amount)}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                            </div>
                                            <div className={`p-2 rounded-full ${item.status === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                                                {item.status === 'success' ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="text-center py-8">
                                            <p className="text-slate-400 text-xs italic">Belum ada riwayat infaq.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Donatur Terbaru */}
                            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                                
                                <h3 className="font-bold text-lg mb-6 flex items-center gap-2 relative z-10">
                                    <Users size={20} className="text-emerald-400" /> Donatur Terbaru
                                </h3>
                                <div className="space-y-4 relative z-10">
                                    {donations.slice(0, 5).map((item) => (
                                        <div key={item.id} className="flex items-center justify-between border-b border-white/10 pb-3 last:border-0 last:pb-0 animate-in slide-in-from-right duration-500">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-emerald-400 border border-white/10">
                                                    {item.donor_name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm text-white leading-tight">{item.donor_name}</p>
                                                    <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Terima Kasih</p>
                                                </div>
                                            </div>
                                            <span className="font-bold text-sm">{formatIDR(item.amount)}</span>
                                        </div>
                                    ))}
                                    {donations.length === 0 && <p className="text-center text-slate-500 text-xs italic">Belum ada donatur hari ini.</p>}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* --- MODAL HASIL PEMBAYARAN (OVERLAY) --- */}
                    {paymentResult && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
                            <div className="bg-white rounded-[2.5rem] max-w-md w-full p-8 relative shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
                                
                                <button 
                                    onClick={() => setPaymentResult(null)} 
                                    className="absolute top-5 right-5 p-2 bg-slate-50 rounded-full hover:bg-slate-100 transition text-slate-400 hover:text-slate-600"
                                >
                                    <X size={20} />
                                </button>
                                
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                                        <Wallet size={32} />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-800 tracking-tight">Instruksi Pembayaran</h3>
                                    <p className="text-slate-500 text-sm mt-1">Mohon selesaikan pembayaran sejumlah:</p>
                                    <p className="text-3xl font-black text-emerald-600 my-4 tracking-tighter">{formatIDR(paymentResult.gross_amount || paymentResult.amount)}</p>
                                </div>

                                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                                    {paymentResult.payment_type === 'qris' ? (
                                        <div className="space-y-4 text-center">
                                            <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 inline-block">
                                                 {/* Pastikan path image QR benar dari API Midtrans */}
                                                <img src={paymentResult.actions?.[0]?.url || paymentResult.payment_code} className="w-48 h-48 object-contain mx-auto" alt="QRIS" />
                                            </div>
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Scan Pakai E-Wallet / M-Banking</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-5">
                                            <div className="text-center">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                                                    Nomor Virtual Account ({paymentResult.payment_type.toUpperCase()})
                                                </p>
                                                
                                                {/* Khusus Mandiri tampilkan Biller Code */}
                                                {paymentResult.payment_type === 'mandiri' && (
                                                    <div className="mb-3 p-3 bg-blue-50 rounded-xl border border-blue-100 flex justify-between items-center text-xs">
                                                        <span className="font-bold text-blue-800">Biller Code:</span>
                                                        <span className="font-mono font-bold text-slate-900">{paymentResult.biller_code || paymentResult.bill_key}</span> 
                                                    </div>
                                                )}

                                                <div className="flex items-center justify-center gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm cursor-pointer hover:border-emerald-500 transition group relative overflow-hidden"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(paymentResult.va_number || paymentResult.bill_key); // bill_key untuk mandiri
                                                        alert("Nomor disalin!");
                                                    }}>
                                                    <span className="text-2xl font-mono font-bold text-slate-800 tracking-widest z-10">
                                                        {paymentResult.va_number || paymentResult.bill_key || "Gagal memuat"}
                                                    </span>
                                                    <Copy size={18} className="text-emerald-500 group-hover:scale-110 transition z-10" />
                                                    <div className="absolute inset-0 bg-emerald-50 opacity-0 group-hover:opacity-100 transition duration-300"></div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center justify-center gap-2 text-amber-600 bg-amber-50 py-3 rounded-xl border border-amber-100">
                                                <Loader2 size={16} className="animate-spin" />
                                                <span className="text-[10px] font-bold uppercase tracking-wide">Menunggu Pembayaran...</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* <button 
                                    onClick={() => window.location.reload()} 
                                    className="w-full mt-6 bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-emerald-600 transition shadow-lg shadow-emerald-200 uppercase text-xs tracking-widest"
                                >
                                    Saya Sudah Bayar
                                </button> */}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}