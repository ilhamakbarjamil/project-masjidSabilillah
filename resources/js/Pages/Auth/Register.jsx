import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { User, Mail, Lock, ShieldCheck, ArrowRight, Home } from 'lucide-react'; // Import Icon

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
        <GuestLayout>
            <Head title="Daftar Akun - Masjid Sabilillah" />

            {/* HEADER FORM */}
            <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl mb-4">
                    <User size={32} />
                </div>
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">Bergabung dengan Kami</h1>
                <p className="text-slate-500 mt-2 text-sm leading-relaxed">
                    Buat akun untuk berkontribusi dan mengakses layanan <br />
                    digital <span className="font-bold text-emerald-600">Masjid Sabilillah</span>
                </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                {/* NAME FIELD */}
                <div>
                    <InputLabel htmlFor="name" value="Nama Lengkap" className="text-slate-700 font-semibold mb-1.5" />
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                            <User size={18} />
                        </div>
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="block w-full pl-11 py-3 bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl transition duration-200"
                            autoComplete="name"
                            isFocused={true}
                            placeholder="Contoh: Ahmad Abdullah"
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.name} className="mt-2 text-xs" />
                </div>

                {/* EMAIL FIELD */}
                <div>
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
                            placeholder="nama@email.com"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.email} className="mt-2 text-xs" />
                </div>

                {/* PASSWORD FIELD */}
                <div>
                    <InputLabel htmlFor="password" value="Kata Sandi" className="text-slate-700 font-semibold mb-1.5" />
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
                            autoComplete="new-password"
                            placeholder="Minimal 8 karakter"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.password} className="mt-2 text-xs" />
                </div>

                {/* CONFIRM PASSWORD FIELD */}
                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Konfirmasi Kata Sandi"
                        className="text-slate-700 font-semibold mb-1.5"
                    />
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                            <ShieldCheck size={18} />
                        </div>
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="block w-full pl-11 py-3 bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl transition duration-200"
                            autoComplete="new-password"
                            placeholder="Ulangi kata sandi"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            required
                        />
                    </div>
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2 text-xs"
                    />
                </div>

                {/* REGISTER BUTTON */}
                <div className="pt-4">
                    <PrimaryButton 
                        className="w-full justify-center py-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-lg shadow-emerald-200 text-base font-bold transition-all transform hover:-translate-y-0.5" 
                        disabled={processing}
                    >
                        Buat Akun Sekarang <ArrowRight size={18} className="ms-2" />
                    </PrimaryButton>
                </div>

                {/* LOGIN LINK */}
                <div className="text-center mt-8 pt-6 border-t border-slate-100">
                    <p className="text-sm text-slate-500">
                        Sudah punya akun?{' '}
                        <Link
                            href={route('login')}
                            className="font-bold text-emerald-600 hover:text-emerald-700 transition"
                        >
                            Masuk di sini
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