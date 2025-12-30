import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight, ChevronLeft } from 'lucide-react';

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
        // GANTI UTAMA: h-screen (tinggi fix), w-full, dan overflow-hidden (hilangkan scrollbar)
        <div className="h-screen w-full overflow-hidden bg-white font-sans text-gray-900 antialiased">
            <Head title="Masuk - Masjid Sabilillah" />

            {/* SPLIT SCREEN CONTAINER */}
            <div className="flex h-full w-full">

                {/* --- SEBELAH KIRI: GAMBAR MASJID (Desktop Only) --- */}
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
                            Memakmurkan Masjid,<br/> 
                            <span className="text-emerald-400">Membangun Umat.</span>
                        </h2>
                        <p className="text-slate-300 max-w-md leading-relaxed text-sm">
                            Platform digital terintegrasi untuk pengelolaan infaq, inventaris, dan kegiatan Masjid Sabilillah secara transparan dan amanah.
                        </p>
                        
                        <div className="mt-12 text-xs text-white/40 font-bold uppercase tracking-widest">
                            &copy; 2025 Sabilillah Digital System
                        </div>
                    </div>
                </div>

                {/* --- SEBELAH KANAN: FORM LOGIN --- */}
                {/* Tambahkan 'overflow-y-auto' agar jika layar hp sangat pendek, form tetap bisa discroll di dalam, bukan body nya */}
                <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center p-8 bg-[#f5f5f7] relative overflow-hidden">
                    
                    {/* Floating Ornaments (Penyebab Scroll Horizontal - Sekarang aman karena parent overflow-hidden) */}
                    <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>

                    {/* Container Form */}
                    <div className="w-full max-w-[420px] relative z-10 animate-in slide-in-from-right fade-in duration-700">
                        
                        {/* Logo Mobile */}
                        <div className="lg:hidden flex justify-center mb-8">
                            <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center shadow-lg">
                                <span className="font-bold text-2xl">S</span>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h1 className="text-3xl lg:text-4xl font-black tracking-tighter text-slate-900 mb-2">
                                Selamat Datang.
                            </h1>
                            <p className="text-slate-500 font-medium">
                                Masuk ke akun pengurus atau jamaah Anda.
                            </p>
                        </div>

                        {status && (
                            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 text-sm font-medium text-emerald-600 border border-emerald-100 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
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
                                    className="block w-full px-5 py-3.5 bg-white border-0 ring-1 ring-slate-100 focus:ring-2 focus:ring-emerald-500 rounded-2xl text-slate-800 font-bold transition-all shadow-sm placeholder:text-slate-300 placeholder:font-normal"
                                    autoComplete="username"
                                    isFocused={true}
                                    placeholder="nama@email.com"
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-1 ml-1" />
                            </div>

                            {/* PASSWORD */}
                            <div className="space-y-1.5">
                                <div className="flex justify-between items-center ml-1">
                                    <InputLabel htmlFor="password" value="Kata Sandi" className="text-xs font-bold text-slate-400 uppercase tracking-widest" />
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
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
                                    className="block w-full px-5 py-3.5 bg-white border-0 ring-1 ring-slate-100 focus:ring-2 focus:ring-emerald-500 rounded-2xl text-slate-800 font-bold transition-all shadow-sm placeholder:text-slate-300 placeholder:font-normal"
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="mt-1 ml-1" />
                            </div>

                            {/* REMEMBER ME */}
                            <div className="flex items-center ml-1">
                                <label className="flex items-center cursor-pointer group">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        className="w-5 h-5 rounded-lg border-slate-300 text-emerald-600 focus:ring-emerald-500 transition-colors"
                                        onChange={(e) => setData('remember', e.target.checked)}
                                    />
                                    <span className="ms-3 text-sm text-slate-500 group-hover:text-slate-800 transition-colors font-medium select-none">Ingat saya</span>
                                </label>
                            </div>

                            {/* BUTTONS */}
                            <div className="pt-2 space-y-3">
                                <PrimaryButton 
                                    className="w-full justify-center py-3.5 bg-slate-900 hover:bg-emerald-600 active:bg-slate-800 rounded-2xl text-base font-bold tracking-wide transition-all duration-300 transform hover:scale-[1.01] shadow-xl hover:shadow-emerald-200" 
                                    disabled={processing}
                                >
                                    Masuk Sekarang <ArrowRight size={18} className="ms-2" />
                                </PrimaryButton>
                                
                                <div className="relative flex py-1 items-center">
                                    <div className="flex-grow border-t border-slate-200"></div>
                                    <span className="flex-shrink-0 mx-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">Atau</span>
                                    <div className="flex-grow border-t border-slate-200"></div>
                                </div>

                                <Link
                                    href={route('register')}
                                    className="flex items-center justify-center w-full py-3.5 bg-white border border-slate-200 text-slate-600 hover:text-emerald-700 hover:border-emerald-200 hover:bg-emerald-50 rounded-2xl text-sm font-bold transition-all duration-300"
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