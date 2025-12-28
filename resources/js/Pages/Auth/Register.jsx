import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
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
        <GuestLayout>
            <Head title="Daftar Akun - Masjid Sabilillah" />

            {/* Background elements (Sama seperti Login & Welcome) */}
            <div className="fixed inset-0 -z-10 bg-[#f5f5f7]"></div>
            <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="fixed bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="flex flex-col items-center justify-center min-h-[90vh] py-12">
                
                {/* BRANDING LOGO */}
                <Link href="/" className="mb-8 group">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-black text-white rounded-3xl flex items-center justify-center shadow-2xl shadow-black/20 group-hover:scale-105 transition-transform duration-500">
                            <span className="font-bold text-3xl">S</span>
                        </div>
                        <span className="text-sm font-bold tracking-widest text-gray-400 uppercase">Masjid Sabilillah</span>
                    </div>
                </Link>

                {/* MAIN CARD */}
                <div className="w-full max-w-[480px] bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-white/50 relative overflow-hidden">
                    
                    {/* Header Text */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-semibold tracking-tighter text-[#1d1d1f] mb-2">
                            Buat Akun.
                        </h1>
                        <p className="text-gray-500 font-medium">
                            Bergabung dengan ekosistem digital masjid.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        {/* NAME FIELD */}
                        <div className="space-y-2">
                            <InputLabel htmlFor="name" value="Nama Lengkap" className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="block w-full px-6 py-4 bg-gray-50 border-transparent focus:border-emerald-500 focus:bg-white focus:ring-0 rounded-2xl text-[#1d1d1f] font-medium transition-all duration-300 placeholder-gray-300"
                                autoComplete="name"
                                isFocused={true}
                                placeholder="Nama sesuai KTP"
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="mt-2 ml-1" />
                        </div>

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
                                placeholder="nama@email.com"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className="mt-2 ml-1" />
                        </div>

                        {/* PASSWORD FIELD */}
                        <div className="space-y-2">
                            <InputLabel htmlFor="password" value="Kata Sandi" className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="block w-full px-6 py-4 bg-gray-50 border-transparent focus:border-emerald-500 focus:bg-white focus:ring-0 rounded-2xl text-[#1d1d1f] font-medium transition-all duration-300 placeholder-gray-300"
                                autoComplete="new-password"
                                placeholder="Minimal 8 karakter"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <InputError message={errors.password} className="mt-2 ml-1" />
                        </div>

                        {/* CONFIRM PASSWORD FIELD */}
                        <div className="space-y-2">
                            <InputLabel htmlFor="password_confirmation" value="Konfirmasi Kata Sandi" className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1" />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="block w-full px-6 py-4 bg-gray-50 border-transparent focus:border-emerald-500 focus:bg-white focus:ring-0 rounded-2xl text-[#1d1d1f] font-medium transition-all duration-300 placeholder-gray-300"
                                autoComplete="new-password"
                                placeholder="Ulangi kata sandi"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                            <InputError message={errors.password_confirmation} className="mt-2 ml-1" />
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="pt-6 space-y-4">
                            <PrimaryButton 
                                className="w-full justify-center py-4 bg-[#1d1d1f] hover:bg-black active:bg-gray-900 rounded-full text-base font-semibold tracking-wide transition-all duration-300 transform hover:scale-[1.02] shadow-xl shadow-black/10" 
                                disabled={processing}
                            >
                                Daftar Sekarang <ArrowRight size={18} className="ms-2 opacity-70" />
                            </PrimaryButton>

                            <div className="relative flex py-2 items-center">
                                <div className="flex-grow border-t border-gray-100"></div>
                                <span className="flex-shrink-0 mx-4 text-gray-300 text-xs font-bold uppercase">Sudah punya akun?</span>
                                <div className="flex-grow border-t border-gray-100"></div>
                            </div>

                            <Link
                                href={route('login')}
                                className="flex items-center justify-center w-full py-4 bg-white border-2 border-gray-100 text-gray-600 hover:text-black hover:border-gray-300 rounded-full text-sm font-bold transition-all duration-300 hover:bg-gray-50"
                            >
                                Masuk ke Akun
                            </Link>
                        </div>
                    </form>
                </div>

                {/* FOOTER LINK */}
                <div className="mt-10 mb-8">
                     <Link
                        href="/"
                        className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-[#1d1d1f] transition-colors px-6 py-3 rounded-full hover:bg-white/50"
                    >
                        <ChevronLeft size={16} /> Kembali ke Beranda
                    </Link>
                </div>

            </div>
        </GuestLayout>
    );
}