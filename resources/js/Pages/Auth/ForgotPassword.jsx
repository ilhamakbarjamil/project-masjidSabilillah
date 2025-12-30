import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { KeyRound, Mail, ArrowLeft, ChevronLeft, Send } from 'lucide-react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        // WRAPPER UTAMA: h-screen (Tinggi pas layar) & overflow-hidden (Hilangkan scrollbar window)
        <div className="h-screen w-full overflow-hidden bg-white font-sans text-gray-900 antialiased">
            <Head title="Lupa Kata Sandi - Masjid Sabilillah" />

            {/* SPLIT SCREEN CONTAINER */}
            <div className="flex h-full w-full">

                {/* --- SEBELAH KIRI: GAMBAR MASJID (Desktop Only - FIXED) --- */}
                <div className="hidden lg:flex w-1/2 h-full relative bg-slate-900">
                    {/* Background Image */}
                    <img 
                        src="https://images.unsplash.com/photo-1564769625345-316825c044cc?q=80&w=1974&auto=format&fit=crop" 
                        alt="Masjid Sabilillah" 
                        className="absolute inset-0 w-full h-full object-cover opacity-60 animate-in fade-in zoom-in duration-1000"
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                    {/* Content di atas Gambar */}
                    <div className="relative z-10 flex flex-col justify-end p-16 w-full text-white h-full">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                            <span className="font-bold text-3xl">S</span>
                        </div>
                        <h2 className="text-4xl font-bold tracking-tight mb-4 leading-tight">
                            Keamanan Akun<br/> 
                            <span className="text-emerald-400">Prioritas Kami.</span>
                        </h2>
                        <p className="text-slate-300 max-w-md leading-relaxed text-sm">
                            Jika Anda lupa kata sandi, ikuti langkah mudah ini untuk memulihkan akses ke akun Masjid Sabilillah Anda.
                        </p>
                        
                        <div className="mt-12 text-xs text-white/40 font-bold uppercase tracking-widest">
                            &copy; 2025 Sabilillah Digital System
                        </div>
                    </div>
                </div>

                {/* --- SEBELAH KANAN: FORM FORGOT PASSWORD (SCROLLABLE) --- */}
                <div className="w-full lg:w-1/2 h-full bg-[#f5f5f7] relative overflow-y-auto">
                    
                    {/* Container Flex untuk centering vertikal */}
                    <div className="min-h-full flex flex-col justify-center items-center p-8 relative">

                        {/* Floating Ornaments (Background Hiasan) */}
                        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                        <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>

                        <div className="w-full max-w-[420px] relative z-10 animate-in slide-in-from-right fade-in duration-700">
                            
                            {/* Logo Mobile */}
                            <div className="lg:hidden flex justify-center mb-8">
                                <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center shadow-lg">
                                    <span className="font-bold text-2xl">S</span>
                                </div>
                            </div>

                            {/* Header Icon & Text */}
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-white shadow-sm border border-slate-100 text-emerald-600 rounded-2xl mb-6">
                                    <KeyRound size={32} />
                                </div>
                                <h1 className="text-3xl font-black tracking-tighter text-slate-900 mb-2">
                                    Lupa Kata Sandi?
                                </h1>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed px-4">
                                    Jangan khawatir. Masukkan email Anda, kami akan kirimkan tautan untuk reset sandi.
                                </p>
                            </div>

                            {/* Status Notification */}
                            {status && (
                                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 text-sm font-medium text-emerald-600 border border-emerald-100 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                    {status}
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-6">
                                {/* EMAIL FIELD */}
                                <div className="space-y-2">
                                    <InputLabel htmlFor="email" value="Alamat Email" className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1" />
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                                            <Mail size={18} />
                                        </div>
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="block w-full pl-12 pr-5 py-4 bg-white border-0 ring-1 ring-slate-100 focus:ring-2 focus:ring-emerald-500 rounded-2xl text-slate-800 font-bold transition-all shadow-sm placeholder:text-slate-300 placeholder:font-normal"
                                            isFocused={true}
                                            placeholder="nama@email.com"
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <InputError message={errors.email} className="mt-2 ml-1" />
                                </div>

                                {/* BUTTON */}
                                <div className="pt-2">
                                    <PrimaryButton 
                                        className="w-full justify-center py-4 bg-slate-900 hover:bg-emerald-600 active:bg-slate-800 rounded-2xl text-base font-bold tracking-wide transition-all duration-300 transform hover:scale-[1.01] shadow-xl hover:shadow-emerald-200" 
                                        disabled={processing}
                                    >
                                        {processing ? 'Mengirim...' : 'Kirim Tautan Reset'} 
                                        <Send size={18} className="ms-2 opacity-80" />
                                    </PrimaryButton>
                                </div>
                            </form>

                            {/* FOOTER LINKS */}
                            <div className="mt-10 text-center space-y-4">
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors group p-2"
                                >
                                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
                                    Kembali ke Halaman Masuk
                                </Link>
                                
                                <div className="block">
                                    <Link
                                        href="/"
                                        className="text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        &copy; Kembali ke Beranda
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}