import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Calendar, Clock, User, MapPin, Plus, Trash2 } from 'lucide-react';

export default function Index({ auth, schedules = [] }) {
    const { data, setData, post, reset, delete: destroy } = useForm({
        title: '', ustadz_name: '', type: 'pengajian', date: '', time: '', location: '', image: null
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('schedules.store'), { onSuccess: () => reset(), forceFormData: true });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-black text-xl text-emerald-800 uppercase tracking-tight">📅 Agenda & Kajian</h2>}>
            <Head title="Agenda Masjid" />

            <div className="py-12 bg-[#F8FAFC] min-h-screen">
                <div className="max-w-7xl mx-auto px-6">
                    
                    {/* FORM ADMIN */}
                    {auth.user.role === 'admin' && (
                        <div className="bg-white p-10 rounded-[3rem] shadow-sm mb-12 border border-slate-100">
                            <h3 className="text-xl font-black mb-6 flex items-center gap-2 text-slate-800">
                                <Plus className="text-emerald-500" /> Tambah Agenda Baru
                            </h3>
                            <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <input type="text" placeholder="Nama Kajian/Kegiatan" className="rounded-2xl border-slate-100 bg-slate-50" 
                                    value={data.title} onChange={e => setData('title', e.target.value)} required />
                                <input type="text" placeholder="Nama Ustadz/Khatib" className="rounded-2xl border-slate-100 bg-slate-50" 
                                    value={data.ustadz_name} onChange={e => setData('ustadz_name', e.target.value)} required />
                                <select className="rounded-2xl border-slate-100 bg-slate-50 font-bold" value={data.type} onChange={e => setData('type', e.target.value)}>
                                    <option value="pengajian">Pengajian / Kajian</option>
                                    <option value="khutbah">Khutbah Jumat</option>
                                </select>
                                <input type="date" className="rounded-2xl border-slate-100 bg-slate-50" 
                                    value={data.date} onChange={e => setData('date', e.target.value)} required />
                                <input type="time" className="rounded-2xl border-slate-100 bg-slate-50" 
                                    value={data.time} onChange={e => setData('time', e.target.value)} required />
                                <input type="file" className="text-xs mt-2" onChange={e => setData('image', e.target.files[0])} />
                                <button className="md:col-span-3 bg-emerald-600 text-white font-black py-4 rounded-2xl hover:bg-emerald-700 transition uppercase tracking-widest text-xs shadow-xl shadow-emerald-100">Simpan Agenda</button>
                            </form>
                        </div>
                    )}

                    {/* LIST AGENDA */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {schedules.map((item) => (
                            <div key={item.id} className="bg-white rounded-[3rem] overflow-hidden shadow-sm border border-slate-100 flex flex-col md:flex-row group transition-all hover:shadow-xl">
                                {item.image && (
                                    <div className="md:w-48 h-full overflow-hidden">
                                        <img src={`/storage/${item.image}`} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt="Poster" />
                                    </div>
                                )}
                                <div className="p-8 flex-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${item.type === 'pengajian' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                                            {item.type}
                                        </span>
                                        {auth.user.role === 'admin' && (
                                            <button onClick={() => destroy(route('schedules.destroy', item.id))} className="text-red-300 hover:text-red-500"><Trash2 size={18} /></button>
                                        )}
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-800 mb-4">{item.title}</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-slate-500 font-medium">
                                            <User size={18} className="text-emerald-500" /> {item.ustadz_name}
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-500 font-medium">
                                            <Calendar size={18} className="text-emerald-500" /> {new Date(item.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-500 font-medium">
                                            <Clock size={18} className="text-emerald-500" /> {item.time.substring(0,5)} WIB
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-500 font-medium">
                                            <MapPin size={18} className="text-emerald-500" /> {item.location}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}