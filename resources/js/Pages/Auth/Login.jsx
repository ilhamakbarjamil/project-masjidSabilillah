import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight, ChevronLeft, Moon, Star, Sparkles } from 'lucide-react'; // Tambah icon Ramadhan

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        // WRAPPER UTAMA: h-screen & overflow-hidden (Fit Screen)
        <div className="h-screen w-full overflow-hidden bg-white font-sans text-gray-900 antialiased">
            <Head title="Masuk - Edisi Ramadhan" />

            <div className="flex h-full w-full">

                {/* --- SEBELAH KIRI: TEMA RAMADHAN (Desktop Only) --- */}
                <div className="hidden lg:flex w-1/2 h-full relative bg-[#0f172a] overflow-hidden">
                    
                    {/* Background Pattern (Islamic Geometry) */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
                    </div>

                    {/* Gradient Overlay Night Atmosphere */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f172a]/50 to-[#0f172a]"></div>
                    
                    {/* Hiasan Gantung (Lanterns/Stars) */}
                    <div className="absolute top-0 right-20 animate-bounce duration-[3000ms]">
                        <div className="w-0.5 h-32 bg-amber-500/30 mx-auto"></div>
                        <Moon size={40} className="text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]" fill="currentColor" />
                    </div>
                    <div className="absolute top-10 right-48 animate-pulse duration-[4000ms]">
                        <Star size={20} className="text-amber-200/50" fill="currentColor" />
                    </div>

                    {/* Content Kiri */}
                    <div className="relative z-10 flex flex-col justify-end p-16 w-full text-white h-full">
                        <div className="w-16 h-16 bg-amber-500 text-slate-900 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/20">
                            <span className="font-bold text-3xl">S</span>
                        </div>
                        
                        <div className="mb-6">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-amber-300 uppercase tracking-widest mb-3">
                                <Sparkles size={12} /> Edisi Ramadhan
                            </span>
                            <h2 className="text-4xl font-black tracking-tight mb-2 leading-tight">
                                Sucikan Hati,<br/> 
                                <span className="text-amber-400">Jernihkan Pikiran.</span>
                            </h2>
                        </div>

                        <p className="text-slate-400 max-w-md leading-relaxed text-sm">
                            Masuk untuk mengelola kegiatan ibadah, infaq, dan zakat selama bulan suci Ramadhan dengan lebih mudah dan transparan.
                        </p>
                        
                        <div className="mt-12 text-xs text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
                            &copy; 2025 Sabilillah Digital <span className="w-1 h-1 bg-amber-500 rounded-full"></span> Ramadhan Kareem
                        </div>
                    </div>
                </div>

                {/* --- SEBELAH KANAN: FORM LOGIN (Ramadhan Style) --- */}
                <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center p-8 bg-[#f8fafc] relative overflow-y-auto">
                    
                    {/* Background Blobs (Amber & Slate) */}
                    <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-slate-500/10 rounded-full blur-[80px] pointer-events-none"></div>

                    {/* Container Form */}
                    <div className="w-full max-w-[420px] relative z-10 animate-in slide-in-from-right fade-in duration-700">
                        
                        {/* Logo Mobile */}
                        <div className="lg:hidden flex justify-center mb-8">
                            <div className="w-14 h-14 bg-slate-900 text-amber-400 rounded-2xl flex items-center justify-center shadow-lg">
                                <span className="font-bold text-2xl">S</span>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h1 className="text-3xl lg:text-4xl font-black tracking-tighter text-slate-900 mb-2">
                                Assalamu’alaikum.
                            </h1>
                            <p className="text-slate-500 font-medium">
                                Silakan masuk untuk melanjutkan aktivitas.
                            </p>
                        </div>

                        {status && (
                            <div className="mb-6 p-4 rounded-2xl bg-amber-50 text-sm font-medium text-amber-700 border border-amber-100 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-5">
                            {/* EMAIL */}
                            <div className="space-y-1.5">
                                <InputLabel htmlFor="email" value="Email" className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="block w-full px-5 py-3.5 bg-white border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-amber-500 rounded-2xl text-slate-800 font-bold transition-all shadow-sm placeholder:text-slate-300 placeholder:font-normal"
                                    autoComplete="username"
                                    isFocused={true}
                                    placeholder="nama@email.com"
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-1 ml-1 text-amber-600" />
                            </div>

                            {/* PASSWORD */}
                            <div className="space-y-1.5">
                                <div className="flex justify-between items-center ml-1">
                                    <InputLabel htmlFor="password" value="Kata Sandi" className="text-xs font-bold text-slate-400 uppercase tracking-widest" />
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline"
                                        >
                                            Lupa sandi?
                                        </Link>
                                    )}
                                </div>
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="block w-full px-5 py-3.5 bg-white border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-amber-500 rounded-2xl text-slate-800 font-bold transition-all shadow-sm placeholder:text-slate-300 placeholder:font-normal"
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="mt-1 ml-1 text-amber-600" />
                            </div>

                            {/* REMEMBER ME */}
                            <div className="flex items-center ml-1">
                                <label className="flex items-center cursor-pointer group">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        className="w-5 h-5 rounded-lg border-slate-300 text-amber-600 focus:ring-amber-500 transition-colors"
                                        onChange={(e) => setData('remember', e.target.checked)}
                                    />
                                    <span className="ms-3 text-sm text-slate-500 group-hover:text-slate-800 transition-colors font-medium select-none">Ingat saya</span>
                                </label>
                            </div>

                            {/* BUTTONS */}
                            <div className="pt-2 space-y-3">
                                {/* Tombol Login (Dark Slate dengan Hover Amber) */}
                                <PrimaryButton 
                                    className="w-full justify-center py-3.5 bg-slate-900 hover:bg-amber-600 active:bg-slate-800 rounded-2xl text-base font-bold tracking-wide transition-all duration-300 transform hover:scale-[1.01] shadow-xl hover:shadow-amber-200" 
                                    disabled={processing}
                                >
                                    Masuk <ArrowRight size={18} className="ms-2" />
                                </PrimaryButton>
                                
                                <div className="relative flex py-1 items-center">
                                    <div className="flex-grow border-t border-slate-200"></div>
                                    <span className="flex-shrink-0 mx-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">Atau</span>
                                    <div className="flex-grow border-t border-slate-200"></div>
                                </div>

                                <Link
                                    href={route('register')}
                                    className="flex items-center justify-center w-full py-3.5 bg-white border border-slate-200 text-slate-600 hover:text-amber-700 hover:border-amber-200 hover:bg-amber-50 rounded-2xl text-sm font-bold transition-all duration-300"
                                >
                                    Daftar Jamaah Baru
                                </Link>
                            </div>
                        </form>

                        <div className="mt-8 text-center lg:text-left">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-800 transition-colors group"
                            >
                                <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Beranda
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}