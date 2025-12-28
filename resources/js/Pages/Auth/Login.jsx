import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, Lock, ArrowRight, Home } from 'lucide-react'; // Tambahkan icon

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

            {/* HEADER FORM */}
            <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl mb-4">
                    <Lock size={32} />
                </div>
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">Selamat Datang</h1>
                <p className="text-slate-500 mt-2 text-sm">
                    Silakan masuk untuk mengakses portal <br /> 
                    <span className="font-bold text-emerald-600">Masjid Sabilillah</span>
                </p>
            </div>

            {status && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 text-sm font-medium text-emerald-600 border border-emerald-100">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                {/* EMAIL FIELD */}
                <div className="relative">
                    <InputLabel htmlFor="email" value="Alamat Email" className="text-slate-700 font-semibold mb-1.5" />
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                            <Mail size={18} />
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-full pl-11 py-3 bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl transition duration-200"
                            autoComplete="username"
                            isFocused={true}
                            placeholder="nama@email.com"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.email} className="mt-2 text-xs" />
                </div>

                {/* PASSWORD FIELD */}
                <div className="relative">
                    <div className="flex justify-between items-center mb-1.5">
                        <InputLabel htmlFor="password" value="Kata Sandi" className="text-slate-700 font-semibold" />
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
                            >
                                Lupa sandi?
                            </Link>
                        )}
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                            <Lock size={18} />
                        </div>
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="block w-full pl-11 py-3 bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl transition duration-200"
                            autoComplete="current-password"
                            placeholder="••••••••"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.password} className="mt-2 text-xs" />
                </div>

                {/* REMEMBER ME */}
                <div className="flex items-center justify-between py-2">
                    <label className="flex items-center group cursor-pointer">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            className="rounded border-slate-300 text-emerald-600 shadow-sm focus:ring-emerald-500"
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-slate-600 group-hover:text-emerald-600 transition">Ingat saya</span>
                    </label>
                </div>

                {/* LOGIN BUTTON */}
                <div className="pt-2">
                    <PrimaryButton 
                        className="w-full justify-center py-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-lg shadow-emerald-200 text-base font-bold transition-all transform hover:-translate-y-0.5" 
                        disabled={processing}
                    >
                        Masuk Sekarang <ArrowRight size={18} className="ms-2" />
                    </PrimaryButton>
                </div>

                {/* REGISTER LINK */}
                <div className="text-center mt-8 pt-6 border-t border-slate-100">
                    <p className="text-sm text-slate-500">
                        Belum punya akun?{' '}
                        <Link
                            href={route('register')}
                            className="font-bold text-emerald-600 hover:text-emerald-700"
                        >
                            Daftar Gratis
                        </Link>
                    </p>
                </div>

                {/* BACK TO HOME */}
                <div className="flex justify-center mt-4">
                     <Link
                        href="/"
                        className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition"
                    >
                        <Home size={14} /> Kembali ke Beranda
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}