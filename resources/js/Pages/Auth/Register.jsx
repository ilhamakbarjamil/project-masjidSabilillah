import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight, ChevronLeft } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        // WRAPPER UTAMA: h-screen (Tinggi pas layar) & overflow-hidden (Hilangkan scrollbar window)
        <div className="h-screen w-full overflow-hidden bg-white font-sans text-gray-900 antialiased">
            <Head title="Daftar Akun - Masjid Sabilillah" />

            <div className="flex h-full w-full">

                {/* --- SEBELAH KIRI: GAMBAR MASJID (Desktop Only - FIXED) --- */}
                <div className="hidden lg:flex w-1/2 h-full relative bg-slate-900">
                    <img 
                        src="https://images.unsplash.com/photo-1564769625345-316825c044cc?q=80&w=1974&auto=format&fit=crop" 
                        alt="Masjid Sabilillah" 
                        className="absolute inset-0 w-full h-full object-cover opacity-60 animate-in fade-in zoom-in duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                    <div className="relative z-10 flex flex-col justify-end p-16 w-full text-white h-full">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                            <span className="font-bold text-3xl">S</span>
                        </div>
                        <h2 className="text-4xl font-bold tracking-tight mb-4 leading-tight">
                            Bergabung Bersama<br/> 
                            <span className="text-emerald-400">Komunitas Kami.</span>
                        </h2>
                        <p className="text-slate-300 max-w-md leading-relaxed text-sm">
                            Daftarkan diri Anda untuk mengakses layanan digital Masjid Sabilillah, mulai dari infaq online hingga peminjaman inventaris.
                        </p>
                        
                        <div className="mt-12 text-xs text-white/40 font-bold uppercase tracking-widest">
                            &copy; 2025 Sabilillah Digital System
                        </div>
                    </div>
                </div>

                {/* --- SEBELAH KANAN: FORM REGISTER (SCROLLABLE) --- */}
                {/* overflow-y-auto: Agar form bisa discroll jika layar terlalu pendek, tapi tidak merusak layout utama */}
                <div className="w-full lg:w-1/2 h-full bg-[#f5f5f7] relative overflow-y-auto">
                    
                    {/* Container Flex untuk centering vertikal (jika layar cukup tinggi) */}
                    <div className="min-h-full flex flex-col justify-center items-center p-8 relative">

                        {/* Floating Ornaments (Background Hiasan) */}
                        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                        <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>

                        <div className="w-full max-w-[480px] relative z-10 animate-in slide-in-from-right fade-in duration-700 py-6">
                            
                            {/* Logo Mobile */}
                            <div className="lg:hidden flex justify-center mb-8">
                                <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center shadow-lg">
                                    <span className="font-bold text-2xl">S</span>
                                </div>
                            </div>

                            <div className="mb-8 text-center lg:text-left">
                                <h1 className="text-3xl lg:text-4xl font-black tracking-tighter text-slate-900 mb-2">
                                    Buat Akun Baru.
                                </h1>
                                <p className="text-slate-500 font-medium">
                                    Isi data diri Anda dengan benar.
                                </p>
                            </div>

                            <form onSubmit={submit} className="space-y-5">
                                {/* NAME */}
                                <div className="space-y-1.5">
                                    <InputLabel htmlFor="name" value="Nama Lengkap" className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1" />
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="block w-full px-5 py-3.5 bg-white border-0 ring-1 ring-slate-100 focus:ring-2 focus:ring-emerald-500 rounded-2xl text-slate-800 font-bold transition-all shadow-sm placeholder:text-slate-300 placeholder:font-normal"
                                        autoComplete="name"
                                        isFocused={true}
                                        placeholder="Nama sesuai KTP"
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-1 ml-1" />
                                </div>

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
                                        placeholder="nama@email.com"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.email} className="mt-1 ml-1" />
                                </div>

                                {/* PASSWORD & CONFIRM ROW */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <InputLabel htmlFor="password" value="Kata Sandi" className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1" />
                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="block w-full px-5 py-3.5 bg-white border-0 ring-1 ring-slate-100 focus:ring-2 focus:ring-emerald-500 rounded-2xl text-slate-800 font-bold transition-all shadow-sm placeholder:text-slate-300 placeholder:font-normal"
                                            autoComplete="new-password"
                                            placeholder="Min 8 karakter"
                                            onChange={(e) => setData('password', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.password} className="mt-1 ml-1" />
                                    </div>

                                    <div className="space-y-1.5">
                                        <InputLabel htmlFor="password_confirmation" value="Ulangi Sandi" className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1" />
                                        <TextInput
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className="block w-full px-5 py-3.5 bg-white border-0 ring-1 ring-slate-100 focus:ring-2 focus:ring-emerald-500 rounded-2xl text-slate-800 font-bold transition-all shadow-sm placeholder:text-slate-300 placeholder:font-normal"
                                            autoComplete="new-password"
                                            placeholder="Ulangi sandi"
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.password_confirmation} className="mt-1 ml-1" />
                                    </div>
                                </div>

                                {/* ACTION BUTTONS */}
                                <div className="pt-6 space-y-4">
                                    <PrimaryButton 
                                        className="w-full justify-center py-4 bg-slate-900 hover:bg-emerald-600 active:bg-slate-800 rounded-2xl text-base font-bold tracking-wide transition-all duration-300 transform hover:scale-[1.01] shadow-xl hover:shadow-emerald-200" 
                                        disabled={processing}
                                    >
                                        Daftar Sekarang <ArrowRight size={18} className="ms-2" />
                                    </PrimaryButton>

                                    <div className="relative flex py-2 items-center">
                                        <div className="flex-grow border-t border-slate-200"></div>
                                        <span className="flex-shrink-0 mx-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">Sudah punya akun?</span>
                                        <div className="flex-grow border-t border-slate-200"></div>
                                    </div>

                                    <Link
                                        href={route('login')}
                                        className="flex items-center justify-center w-full py-4 bg-white border border-slate-200 text-slate-600 hover:text-emerald-700 hover:border-emerald-200 hover:bg-emerald-50 rounded-2xl text-sm font-bold transition-all duration-300"
                                    >
                                        Masuk ke Akun
                                    </Link>
                                </div>
                            </form>

                            <div className="mt-10 text-center lg:text-left">
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
        </div>
    );
}