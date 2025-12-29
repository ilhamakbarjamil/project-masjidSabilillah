import React, { useState, useEffect, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios';
import {
    CheckCircle2, Clock, Copy,
    History, Users, ShieldCheck, Wallet,
    ArrowRight, X, Loader2,
    Zap, Lock, LayoutGrid, Heart,
    PlayCircle
} from 'lucide-react';

export default function Index({ auth, donations = [], my_donations = [] }) {
    const [paymentResult, setPaymentResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // --- REFS UNTUK AUTO SCROLL ---
    const step1Ref = useRef(null);
    const step2Ref = useRef(null);
    const step3Ref = useRef(null);
    const step4Ref = useRef(null); // Modal Result
    const step5Ref = useRef(null); // Feed

    // --- STATE & LOGIKA TOUR PANDUAN ---
    const [tourStep, setTourStep] = useState(0); 
    // 0: Off, 0.5: Welcome, 1: Nominal, 2: Metode, 3: Tombol, 4: Modal VA, 5: Feed Sukses

    // Data Dummy untuk Simulasi Tur Langkah 4
    const dummyTourData = {
        gross_amount: 20000,
        payment_type: 'bank_transfer',
        va_number: '88880123456789 (Contoh)',
        status: 'pending'
    };

    // LOGIKA AUTO SCROLL SAAT NEXT
    useEffect(() => {
        const scrollOptions = { behavior: 'smooth', block: 'center' };
        
        if (tourStep === 1) step1Ref.current?.scrollIntoView(scrollOptions);
        if (tourStep === 2) step2Ref.current?.scrollIntoView(scrollOptions);
        if (tourStep === 3) step3Ref.current?.scrollIntoView(scrollOptions);
        if (tourStep === 5) step5Ref.current?.scrollIntoView(scrollOptions);
        
    }, [tourStep]);

    // SELALU MUNCUL SETIAP MASUK HALAMAN
    useEffect(() => {
        const timer = setTimeout(() => {
            setTourStep(0.5); 
        }, 800); 
        return () => clearTimeout(timer);
    }, []);

    const startTour = () => {
        setTourStep(1);
        setData({ ...data, amount: '', bank: '' });
    };

    const nextStep = () => {
        if (tourStep === 3) {
            setPaymentResult(dummyTourData);
            setTourStep(4);
        } else if (tourStep === 4) {
            setPaymentResult(null);
            setTourStep(5);
        } else if (tourStep < 5) {
            setTourStep(tourStep + 1);
        } else {
            endTour();
        }
    };

    const endTour = () => {
        setTourStep(0);
        setPaymentResult(null); 
    };

    // Helper Highlight (Spotlight Effect)
    const getHighlightClass = (stepTarget) => {
        // Logika: Jika step aktif, beri z-index tinggi (60) agar muncul di atas overlay internal (55)
        if (tourStep === stepTarget) {
            return "relative z-[60] bg-white ring-4 ring-emerald-400 ring-offset-4 transition-all duration-500 shadow-2xl scale-[1.02]";
        }
        // Jika tidak aktif tapi sedang mode tur (1-3), biarkan di bawah overlay internal
        return "relative z-0 transition-all duration-500";
    };

    const { data, setData, processing } = useForm({
        donor_name: auth.user?.name || '',
        amount: '',
        bank: '',
    });

    const user = auth?.user;

    const paymentMethods = [
        { id: 'qris', name: 'QRIS', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_QRIS.svg' },
        { id: 'bca', name: 'BCA', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg' },
        { id: 'bri', name: 'BRI', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/68/BANK_BRI_logo.svg' },
        { id: 'mandiri', name: 'Mandiri', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg' },
        { id: 'bni', name: 'BNI', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/55/BNI_logo.svg/1200px-BNI_logo.svg.png' }
    ];

    const quickAmounts = [10000, 20000, 50000, 100000, 250000, 500000];

    const highlights = [
        { icon: <Zap size={24} />, color: "bg-amber-100 text-amber-600", title: "Instan", desc: "Verifikasi otomatis." },
        { icon: <Lock size={24} />, color: "bg-emerald-100 text-emerald-600", title: "Aman", desc: "Standar Midtrans." },
        { icon: <LayoutGrid size={24} />, color: "bg-blue-100 text-blue-600", title: "Lengkap", desc: "QRIS & VA Bank." },
        { icon: <Heart size={24} />, color: "bg-rose-100 text-rose-600", title: "Transparan", desc: "Tercatat sistem." }
    ];

    // Logika Polling (Hanya jalan jika BUKAN Tur)
    useEffect(() => {
        let interval;
        if (paymentResult && paymentResult.status === 'pending' && tourStep === 0) {
            interval = setInterval(async () => {
                try {
                    const res = await axios.get(route('donations.check', paymentResult.id));
                    if (res.data.status === 'success') {
                        clearInterval(interval);
                        alert("Alhamdulillah, Infaq Berhasil Diterima!");
                        window.location.reload();
                    }
                } catch (err) { console.error("Gagal cek status"); }
            }, 3000);
        }
        return () => { if (interval) clearInterval(interval); };
    }, [paymentResult, tourStep]);

    const handlePay = async (e) => {
        e.preventDefault();
        if (tourStep > 0) return; 

        if (!data.bank) return alert("Silakan pilih metode pembayaran!");
        setIsLoading(true);
        try {
            const res = await axios.post(route('donations.pay'), { ...data, payment_method: data.bank });
            setPaymentResult(res.data);
            setIsLoading(false);
        } catch (err) {
            alert("Error: Minimal infaq Rp 1.000");
            setIsLoading(false);
        }
    };

    const formatIDR = (price) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price || 0);

    return (
        <AuthenticatedLayout user={user} header={<h2 className="font-bold text-xl text-slate-800 tracking-tight">Sabilillah Infaq</h2>}>
            <Head title="Infaq Sabilillah" />

            <div className="py-12 bg-slate-50 min-h-screen font-sans relative">
                
                {/* --- BACKDROP GELAP GLOBAL (TOUR MODE) --- */}
                {tourStep > 0 && (
                    <div className="fixed inset-0 bg-black/80 z-[50] backdrop-blur-sm transition-all duration-500"></div>
                )}

                {/* --- WELCOME MODAL (STEP 0.5) --- */}
                {tourStep === 0.5 && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in zoom-in duration-300">
                        <div className="bg-white rounded-[2rem] max-w-sm w-full p-8 text-center shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                                <PlayCircle size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-800 mb-2">Panduan Singkat</h3>
                            <p className="text-slate-500 text-sm mb-6">Baru pertama kali? Yuk ikuti tur singkat cara berinfaq di aplikasi ini.</p>
                            <div className="space-y-3">
                                <button onClick={startTour} className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition shadow-lg shadow-emerald-200">
                                    Mulai Tur
                                </button>
                                <button onClick={endTour} className="w-full text-slate-400 font-bold text-xs py-2 hover:text-slate-600">
                                    Lewati, Saya Sudah Paham
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- FLOATING GUIDE BOX (STEP 1-5) --- */}
                {tourStep >= 1 && (
                    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-4 animate-in slide-in-from-bottom duration-500">
                        <div className="bg-white p-6 rounded-2xl shadow-2xl border-2 border-emerald-500 flex items-center justify-between gap-4">
                            <div>
                                <h4 className="font-black text-emerald-600 text-lg mb-1">
                                    Langkah {tourStep} dari 5
                                </h4>
                                <p className="text-slate-600 text-sm font-medium leading-tight">
                                    {tourStep === 1 && "Pilih nominal cepat atau isi jumlah manual."}
                                    {tourStep === 2 && "Pilih metode pembayaran (QRIS/Bank)."}
                                    {tourStep === 3 && "Klik tombol 'Lanjutkan Pembayaran'."}
                                    {tourStep === 4 && "Muncul Nomor VA / QR Code. Salin & Bayar."}
                                    {tourStep === 5 && "Otomatis! Data infaq langsung masuk ke sistem."}
                                </p>
                            </div>
                            <button onClick={nextStep} className="bg-slate-900 text-white p-3 rounded-full hover:bg-emerald-600 transition shadow-lg shrink-0">
                                <ArrowRight size={20} />
                            </button>
                        </div>
                        <button onClick={endTour} className="mx-auto block mt-4 text-white/80 text-xs font-bold hover:text-white flex items-center gap-1 justify-center bg-black/20 w-fit px-3 py-1 rounded-full backdrop-blur">
                            <X size={12}/> Keluar Tur
                        </button>
                    </div>
                )}

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* HERO */}
                    <div className="mb-10 text-center max-w-2xl mx-auto">
                        <span className="inline-block py-1 px-4 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-4">Sabilillah Digital</span>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                            Investasi Abadi untuk <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Umat & Masa Depan.</span>
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                        {highlights.map((item, idx) => (
                            <div key={idx} className="bg-white p-5 rounded-[1.5rem] border border-slate-100 shadow-sm">
                                <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center mb-4`}>{item.icon}</div>
                                <h4 className="font-bold text-slate-800 mb-2">{item.title}</h4>
                                <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* KOLOM KIRI: FORMULIR */}
                        <div className="lg:col-span-7 space-y-8">
                            
                            {/* TRIK CSS: 
                                Jika Step 1, 2, atau 3 aktif, angkat Container Formulir ke Z-Index 60 (di atas backdrop).
                                Tapi kita perlu menggelapkan bagian dalam yang tidak aktif. 
                            */}
                            <div className={`bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 relative overflow-hidden transition-all duration-300 ${
                                tourStep >= 1 && tourStep <= 3 ? "z-[60]" : "z-10"
                            }`}>
                                
                                {/* OVERLAY INTERNAL:
                                    Muncul hanya saat Tur Step 1-3. Gunanya untuk menggelapkan bagian formulir yang TIDAK dipilih.
                                    Z-Index 55 (di bawah element highlight yang z-60, tapi di atas konten biasa).
                                */}
                                {tourStep >= 1 && tourStep <= 3 && (
                                    <div className="absolute inset-0 bg-black/60 z-[55] transition-opacity duration-500"></div>
                                )}

                                <div className="flex items-center gap-4 mb-8 relative z-10">
                                    <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg"><Wallet size={24} /></div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 leading-tight">Formulir Infaq</h3>
                                        <p className="text-sm text-slate-500">Isi data untuk mulai berinfaq</p>
                                    </div>
                                    <button onClick={startTour} className="ml-auto text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full hover:bg-emerald-100 flex items-center gap-1">
                                        <PlayCircle size={14}/> Info Tur
                                    </button>
                                </div>

                                <form onSubmit={handlePay} className="space-y-8 relative z-10">
                                    
                                    {/* STEP 1: NOMINAL */}
                                    <div ref={step1Ref} className={`space-y-6 p-4 -m-4 rounded-3xl ${getHighlightClass(1)}`}>
                                        <div className="space-y-3">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Pilih Cepat</label>
                                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                                                {quickAmounts.map((amt) => (
                                                    <button key={amt} type="button" onClick={() => setData('amount', amt)}
                                                        className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all ${data.amount == amt ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-slate-50 text-slate-600 border-slate-100'}`}>
                                                        {amt / 1000}k
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nominal (Rp)</label>
                                                <input type="number" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-0 focus:ring-2 focus:ring-emerald-500 font-bold text-xl text-emerald-700"
                                                    value={data.amount} onChange={e => setData('amount', e.target.value)} placeholder="0" required />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nama Donatur</label>
                                                <input type="text" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-0 focus:ring-2 focus:ring-emerald-500 font-bold text-slate-800"
                                                    value={data.donor_name} onChange={e => setData('donor_name', e.target.value)} placeholder="Hamba Allah" required />
                                            </div>
                                        </div>
                                    </div>

                                    {/* STEP 2: METODE */}
                                    <div ref={step2Ref} className={`space-y-3 p-4 -m-4 rounded-3xl ${getHighlightClass(2)}`}>
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Metode Pembayaran</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                            {paymentMethods.map((method) => (
                                                <div key={method.id} onClick={() => setData('bank', method.id)}
                                                    className={`relative cursor-pointer h-24 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all bg-white ${data.bank === method.id ? 'border-emerald-500 bg-emerald-50/30 ring-2 ring-emerald-500' : 'border-slate-100 hover:border-emerald-200 hover:shadow-md'}`}>
                                                    <img src={method.logo} alt={method.name} className="h-8 w-auto object-contain" />
                                                    {data.bank === method.id && <div className="absolute top-2 right-2 text-emerald-600"><CheckCircle2 size={16} fill="currentColor" className="text-white" /></div>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* STEP 3: TOMBOL */}
                                    <div ref={step3Ref} className={`p-2 -m-2 rounded-[2rem] ${getHighlightClass(3)}`}>
                                        <button type="submit" disabled={processing || isLoading}
                                            className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold py-5 rounded-2xl transition-all shadow-xl hover:shadow-emerald-200 flex items-center justify-center gap-3 uppercase text-xs tracking-[0.2em] disabled:opacity-70">
                                            {isLoading || processing ? <><Loader2 className="animate-spin" size={16} /> MEMPROSES...</> : <>LANJUTKAN PEMBAYARAN <ArrowRight size={16} /></>}
                                        </button>
                                    </div>
                                </form>
                                <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wide relative z-10">
                                    <ShieldCheck size={14} className="text-emerald-500" /> Secure Payment by Midtrans
                                </div>
                            </div>
                        </div>

                        {/* KOLOM KANAN */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm relative z-0">
                                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2 mb-6 px-2"><History className="text-emerald-500" size={20} /> Riwayat Saya</h3>
                                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                    {my_donations.length > 0 ? my_donations.map((item) => (
                                        <div key={item.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                                            <div><p className="font-black text-slate-700 text-sm">{formatIDR(item.amount)}</p><p className="text-[10px] text-slate-400 font-bold uppercase">{new Date(item.created_at).toLocaleDateString()}</p></div>
                                            <div className={`p-2 rounded-full ${item.status === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>{item.status === 'success' ? <CheckCircle2 size={16} /> : <Clock size={16} />}</div>
                                        </div>
                                    )) : <p className="text-center text-slate-400 text-xs py-8 italic">Belum ada riwayat.</p>}
                                </div>
                            </div>

                            {/* STEP 5: HIGHLIGHT DONATUR TERBARU */}
                            <div ref={step5Ref} className={`bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden ${getHighlightClass(5)}`}>
                                <h3 className="font-bold text-lg mb-6 flex items-center gap-2 relative z-10"><Users size={20} className="text-emerald-400" /> Donatur Terbaru</h3>
                                <div className="space-y-4 relative z-10">
                                    {donations.slice(0, 5).map((item) => (
                                        <div key={item.id} className="flex items-center justify-between border-b border-white/10 pb-3 last:border-0 last:pb-0">
                                            <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-emerald-400">{item.donor_name.charAt(0).toUpperCase()}</div><div><p className="font-bold text-sm text-white">{item.donor_name}</p><p className="text-[10px] text-emerald-400 font-bold uppercase">Terima Kasih</p></div></div><span className="font-bold text-sm">{formatIDR(item.amount)}</span>
                                        </div>
                                    ))}
                                    {donations.length === 0 && <p className="text-center text-slate-500 text-xs italic">Belum ada donatur hari ini.</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* STEP 4: HIGHLIGHT MODAL RESULT (Simulasi atau Real) */}
                    {paymentResult && (
                        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in">
                            <div ref={step4Ref} className={`bg-white rounded-[2.5rem] max-w-md w-full p-8 relative shadow-2xl animate-in zoom-in-95 ${getHighlightClass(4)}`}>
                                <button onClick={() => setPaymentResult(null)} className="absolute top-5 right-5 p-2 bg-slate-50 rounded-full hover:bg-slate-100"><X size={20} /></button>
                                <div className="text-center mb-6"><h3 className="text-2xl font-black text-slate-800">Instruksi Pembayaran</h3><p className="text-3xl font-black text-emerald-600 my-4">{formatIDR(paymentResult.gross_amount || paymentResult.amount)}</p></div>
                                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                                    {paymentResult.payment_type === 'qris' ? (
                                        <div className="text-center space-y-4"><img src={paymentResult.actions?.[0]?.url || paymentResult.payment_code} className="w-48 h-48 object-contain mx-auto" /><p className="text-xs font-bold text-slate-500 uppercase">Scan Pakai E-Wallet</p></div>
                                    ) : (
                                        <div className="text-center space-y-4"><p className="text-[10px] font-black text-slate-400 uppercase">VA {paymentResult.payment_type.toUpperCase()}</p><div className="bg-white p-4 rounded-xl border border-slate-200 font-mono font-bold text-2xl text-slate-800 tracking-widest">{paymentResult.va_number || paymentResult.bill_key || paymentResult.va_numbers?.[0]?.va_number}</div><p className="text-[10px] text-slate-400 italic">Salin nomor di atas</p></div>
                                    )}
                                </div>
                                {/* <button onClick={() => window.location.reload()} className="w-full mt-6 bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-emerald-600 uppercase text-xs tracking-widest">Saya Sudah Bayar</button> */}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}