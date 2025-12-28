import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { KeyRound, Mail, ArrowLeft, Home, Send } from 'lucide-react'; // Import Icon

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Lupa Kata Sandi - Masjid Sabilillah" />

            {/* HEADER FORM */}
            <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl mb-4">
                    <KeyRound size={32} />
                </div>
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">Atur Ulang Sandi</h1>
                <p className="text-slate-500 mt-3 text-sm leading-relaxed px-4">
                    Lupa kata sandi? Jangan khawatir. Masukkan alamat email Anda, dan kami akan mengirimkan tautan untuk mengatur ulang kata sandi yang baru.
                </p>
            </div>

            {/* STATUS MESSAGE */}
            {status && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 text-sm font-medium text-emerald-600 border border-emerald-100 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
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
                            isFocused={true}
                            placeholder="nama@email.com"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.email} className="mt-2 text-xs" />
                </div>

                {/* SUBMIT BUTTON */}
                <div className="pt-2">
                    <PrimaryButton 
                        className="w-full justify-center py-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-lg shadow-emerald-200 text-base font-bold transition-all transform hover:-translate-y-0.5" 
                        disabled={processing}
                    >
                        {processing ? 'Mengirim...' : 'Kirim Tautan Atur Ulang'} 
                        <Send size={18} className="ms-2" />
                    </PrimaryButton>
                </div>

                {/* NAVIGATION LINKS */}
                <div className="text-center mt-8 pt-6 border-t border-slate-100 flex flex-col gap-4">
                    <Link
                        href={route('login')}
                        className="flex items-center justify-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
                        Kembali ke Halaman Masuk
                    </Link>
                    
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition"
                    >
                        <Home size={14} /> Beranda Utama
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}