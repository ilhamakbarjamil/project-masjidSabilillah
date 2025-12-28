import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { Camera } from 'lucide-react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        avatar: null, // Field baru
        _method: 'PATCH', // PENTING: Untuk upload file di route PATCH/PUT Laravel
    });

    const submit = (e) => {
        e.preventDefault();
        // Gunakan post karena kita menyisipkan _method PATCH untuk handle file
        post(route('profile.update'), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Informasi Profil</h2>
                <p className="mt-1 text-sm text-gray-600">Perbarui informasi akun dan foto profil Anda.</p>
            </header>

            <form onSubmit={submit} className="mt-10 space-y-8">
                {/* PREVIEW FOTO */}
                <div className="flex items-center gap-6">
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-[2rem] overflow-hidden bg-emerald-100 border-4 border-white shadow-xl">
                            {user.avatar ? (
                                <img src={`/storage/${user.avatar}`} className="w-full h-full object-cover" alt="Profile" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-emerald-600 font-bold text-2xl">
                                    {user.name.charAt(0)}
                                </div>
                            )}
                        </div>
                        <label className="absolute bottom-0 right-0 bg-slate-900 text-white p-2 rounded-xl cursor-pointer shadow-lg hover:bg-emerald-600 transition">
                            <Camera size={16} />
                            <input type="file" className="hidden" onChange={(e) => setData('avatar', e.target.files[0])} />
                        </label>
                    </div>
                    <div>
                        <p className="font-bold text-slate-800">{user.name}</p>
                        <p className="text-xs text-slate-400 uppercase tracking-widest font-black">{user.role}</p>
                    </div>
                </div>

                <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Nama Lengkap</label>
                    <input type="text" className="mt-1 block w-full border-slate-100 bg-slate-50 rounded-2xl p-4 font-bold"
                        value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                </div>

                <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Email</label>
                    <input type="email" className="mt-1 block w-full border-slate-100 bg-slate-50 rounded-2xl p-4 font-bold"
                        value={data.email} onChange={(e) => setData('email', e.target.value)} required />
                </div>

                <div className="flex items-center gap-4">
                    <button disabled={processing} className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-emerald-700 transition shadow-xl shadow-emerald-100">
                        Simpan Perubahan
                    </button>

                    <Transition show={recentlySuccessful} enter="transition ease-in-out" enterFrom="opacity-0" leave="transition ease-in-out" leaveTo="opacity-0">
                        <p className="text-sm text-emerald-600 font-bold italic">Tersimpan.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}