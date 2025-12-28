import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
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
        <GuestLayout>
            <Head title="Masuk - Masjid Sabilillah" />

            {/* Background elements untuk menyamakan mood dengan Landing Page */}
            <div className="fixed inset-0 -z-10 bg-[#f5f5f7]"></div>
            <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="fixed bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="flex flex-col items-center justify-center min-h-[80vh]">
                
                {/* BRANDING LOGO - Dynamic Island Style */}
                <Link href="/" className="mb-8 group">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-black text-white rounded-3xl flex items-center justify-center shadow-2xl shadow-black/20 group-hover:scale-105 transition-transform duration-500">
                            <span className="font-bold text-3xl">S</span>
                        </div>
                        <span className="text-sm font-bold tracking-widest text-gray-400 uppercase">Masjid Sabilillah</span>
                    </div>
                </Link>

                {/* MAIN CARD */}
                <div className="w-full max-w-[420px] bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-white/50 relative overflow-hidden">
                    
                    {/* Header Text */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-semibold tracking-tighter text-[#1d1d1f] mb-2">
                            Selamat Datang.
                        </h1>
                        <p className="text-gray-500 font-medium">
                            Masuk untuk mengelola aktivitas masjid.
                        </p>
                    </div>

                    {status && (
                        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 text-sm font-medium text-emerald-600 border border-emerald-100 text-center">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        {/* EMAIL FIELD */}
                        <div className="space-y-2">
                            <InputLabel htmlFor="email" value="Email" className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="block w-full px-6 py-4 bg-gray-50 border-transparent focus:border-emerald-500 focus:bg-white focus:ring-0 rounded-2xl text-[#1d1d1f] font-medium transition-all duration-300 placeholder-gray-300"
                                autoComplete="username"
                                isFocused={true}
                                placeholder="nama@email.com"
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2 ml-1" />
                        </div>

                        {/* PASSWORD FIELD */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <InputLabel htmlFor="password" value="Kata Sandi" className="text-xs font-bold text-gray-400 uppercase tracking-wider" />
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-xs font-semibold text-[#0071e3] hover:underline"
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
                                className="block w-full px-6 py-4 bg-gray-50 border-transparent focus:border-emerald-500 focus:bg-white focus:ring-0 rounded-2xl text-[#1d1d1f] font-medium transition-all duration-300 placeholder-gray-300"
                                autoComplete="current-password"
                                placeholder="••••••••"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} className="mt-2 ml-1" />
                        </div>

                        {/* REMEMBER ME */}
                        <div className="flex items-center ml-1">
                            <label className="flex items-center cursor-pointer group">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    className="w-5 h-5 rounded-md border-gray-300 text-emerald-600 focus:ring-emerald-500 transition-colors"
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ms-3 text-sm text-gray-500 group-hover:text-[#1d1d1f] transition-colors font-medium">Ingat perangkat ini</span>
                            </label>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="pt-4 space-y-4">
                            <PrimaryButton 
                                className="w-full justify-center py-4 bg-[#1d1d1f] hover:bg-black active:bg-gray-900 rounded-full text-base font-semibold tracking-wide transition-all duration-300 transform hover:scale-[1.02] shadow-xl shadow-black/10" 
                                disabled={processing}
                            >
                                Masuk <ArrowRight size={18} className="ms-2 opacity-70" />
                            </PrimaryButton>
                            
                            <div className="relative flex py-2 items-center">
                                <div className="flex-grow border-t border-gray-100"></div>
                                <span className="flex-shrink-0 mx-4 text-gray-300 text-xs font-bold uppercase">Atau</span>
                                <div className="flex-grow border-t border-gray-100"></div>
                            </div>

                            <Link
                                href={route('register')}
                                className="flex items-center justify-center w-full py-4 bg-white border-2 border-gray-100 text-gray-600 hover:text-black hover:border-gray-300 rounded-full text-sm font-bold transition-all duration-300 hover:bg-gray-50"
                            >
                                Buat Akun Baru
                            </Link>
                        </div>
                    </form>
                </div>
                
                {/* FOOTER LINK */}
                <div className="mt-10">
                     <Link
                        href="/"
                        className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-[#1d1d1f] transition-colors px-6 py-3 rounded-full hover:bg-white/50"
                    >
                        <ChevronLeft size={16} /> Kembali ke Beranda
                    </Link>
                </div>

                <div className="mt-8 text-xs text-gray-300 font-medium">
                    &copy; 2025 Masjid Sabilillah Portal.
                </div>
            </div>
        </GuestLayout>
    );
}