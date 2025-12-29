import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { 
    Calendar, Clock, User, MapPin, Plus, Trash2, 
    Image as ImageIcon, Search, LayoutList, MoreHorizontal 
} from 'lucide-react';

export default function Index({ auth, schedules = [] }) {
    const { data, setData, post, reset, errors, delete: destroy } = useForm({
        title: '',
        ustadz_name: '',
        type: 'pengajian',
        date: '',
        time: '',
        location: '',
        image: null
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('schedules.store'), {
            onSuccess: () => reset(),
            forceFormData: true
        });
    };

    // Helper untuk format tanggal
    const formatDate = (dateString) => {
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-xl text-slate-800 tracking-tight">Agenda & Kajian</h2>}
        >
            <Head title="Agenda Masjid" />

            <div className="py-12 bg-slate-50 min-h-screen font-sans">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* FORM ADMIN SECTION (Hanya Admin) */}
                    {auth.user.role === 'admin' && (
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 mb-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -mr-16 -mt-16 opacity-50 blur-3xl pointer-events-none"></div>
                            
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold mb-8 flex items-center gap-3 text-slate-800">
                                    <div className="p-2 bg-slate-100 rounded-xl text-slate-600">
                                        <Plus size={20} strokeWidth={2.5} />
                                    </div>
                                    Buat Agenda Baru
                                </h3>

                                <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {/* Judul */}
                                    <div className="lg:col-span-2 space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nama Kegiatan</label>
                                        <input type="text" placeholder="Contoh: Kajian Rutin" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-0 focus:ring-2 focus:ring-emerald-500 font-bold text-slate-800 transition-all placeholder:text-slate-300" 
                                            value={data.title} onChange={e => setData('title', e.target.value)} required />
                                    </div>

                                    {/* Ustadz */}
                                    <div className="lg:col-span-2 space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Penceramah</label>
                                        <div className="relative">
                                            <User size={18} className="absolute left-5 top-4 text-slate-400" />
                                            <input type="text" placeholder="Ustadz Fulan, Lc." className="w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-50 border-0 focus:ring-2 focus:ring-emerald-500 font-bold text-slate-800 transition-all placeholder:text-slate-300" 
                                                value={data.ustadz_name} onChange={e => setData('ustadz_name', e.target.value)} required />
                                        </div>
                                    </div>

                                    {/* Tipe & Tanggal */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Jenis</label>
                                        <select className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-0 focus:ring-2 focus:ring-emerald-500 font-bold text-slate-800 transition-all" 
                                            value={data.type} onChange={e => setData('type', e.target.value)}>
                                            <option value="pengajian">Pengajian</option>
                                            <option value="khutbah">Khutbah Jumat</option>
                                            <option value="kegiatan">Lainnya</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Tanggal</label>
                                        <input type="date" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-0 focus:ring-2 focus:ring-emerald-500 font-bold text-slate-800 transition-all" 
                                            value={data.date} onChange={e => setData('date', e.target.value)} required />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Jam</label>
                                        <input type="time" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-0 focus:ring-2 focus:ring-emerald-500 font-bold text-slate-800 transition-all" 
                                            value={data.time} onChange={e => setData('time', e.target.value)} required />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Lokasi</label>
                                        <input type="text" placeholder="Masjid Utama" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-0 focus:ring-2 focus:ring-emerald-500 font-bold text-slate-800 transition-all placeholder:text-slate-300" 
                                            value={data.location} onChange={e => setData('location', e.target.value)} required />
                                    </div>

                                    {/* Upload & Submit */}
                                    <div className="lg:col-span-4 flex flex-col md:flex-row gap-4 items-end pt-6 border-t border-slate-100 mt-2">
                                        <div className="flex-1 w-full">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Poster (Opsional)</label>
                                            <div className="flex items-center gap-3">
                                                <label className="cursor-pointer flex items-center gap-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition text-sm font-bold">
                                                    <ImageIcon size={18} /> Pilih Gambar
                                                    <input type="file" className="hidden" onChange={e => setData('image', e.target.files[0])} />
                                                </label>
                                                {data.image && <span className="text-xs text-emerald-600 font-bold truncate bg-emerald-50 px-3 py-1 rounded-lg">{data.image.name}</span>}
                                            </div>
                                        </div>
                                        
                                        <button className="w-full md:w-auto px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-emerald-600 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 text-sm tracking-wide">
                                            <Plus size={18} strokeWidth={3} /> SIMPAN AGENDA
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* LIST AGENDA (STYLE TABEL BARU) */}
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                                <LayoutList className="text-emerald-500" /> Jadwal Kegiatan
                            </h3>
                            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                                {schedules.length} Item
                            </span>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                        <th className="p-6 pl-8 text-xs font-bold text-slate-400 uppercase tracking-widest">Poster / Kegiatan</th>
                                        <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Waktu & Tempat</th>
                                        <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Jenis</th>
                                        {auth.user.role === 'admin' && (
                                            <th className="p-6 pr-8 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {schedules.length > 0 ? schedules.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50 transition duration-150 group">
                                            
                                            {/* KOLOM 1: GAMBAR & JUDUL */}
                                            <td className="p-6 pl-8">
                                                <div className="flex items-center gap-5">
                                                    {/* Thumbnail Poster */}
                                                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-100">
                                                        {item.image ? (
                                                            <img src={`/storage/${item.image}`} className="w-full h-full object-cover" alt="Poster" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                                <ImageIcon size={20} className="opacity-50"/>
                                                            </div>
                                                        )}
                                                    </div>
                                                    
                                                    <div>
                                                        <div className="font-bold text-slate-800 text-base">{item.title}</div>
                                                        <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold mt-1">
                                                            <User size={12} /> {item.ustadz_name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* KOLOM 2: WAKTU */}
                                            <td className="p-6">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-slate-700 text-sm font-bold">
                                                        <Calendar size={14} className="text-slate-400"/> 
                                                        {formatDate(item.date)}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                                                        <Clock size={14} className="text-slate-400"/> 
                                                        {item.time.substring(0,5)} WIB
                                                    </div>
                                                    {item.location && (
                                                        <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                                                            <MapPin size={14} className="text-slate-400"/> 
                                                            {item.location}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>

                                            {/* KOLOM 3: JENIS/BADGE */}
                                            <td className="p-6">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                                                    item.type === 'pengajian' 
                                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                                                        : item.type === 'khutbah' 
                                                            ? 'bg-blue-50 text-blue-700 border-blue-100'
                                                            : 'bg-slate-50 text-slate-600 border-slate-200'
                                                }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${
                                                        item.type === 'pengajian' ? 'bg-emerald-500' : item.type === 'khutbah' ? 'bg-blue-500' : 'bg-slate-500'
                                                    }`}></span>
                                                    {item.type}
                                                </span>
                                            </td>

                                            {/* KOLOM 4: AKSI (HAPUS) */}
                                            {auth.user.role === 'admin' && (
                                                <td className="p-6 pr-8 text-right">
                                                    <button 
                                                        onClick={() => {
                                                            if(confirm('Yakin ingin menghapus agenda ini?')) {
                                                                destroy(route('schedules.destroy', item.id))
                                                            }
                                                        }} 
                                                        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-400 hover:border-red-200 hover:bg-red-50 hover:text-red-500 transition shadow-sm"
                                                        title="Hapus Agenda"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            )}
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="4" className="p-12 text-center">
                                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                                    <Search size={32} />
                                                </div>
                                                <h3 className="text-slate-900 font-bold">Belum ada agenda</h3>
                                                <p className="text-slate-400 text-sm mt-1">Jadwal kegiatan masjid akan muncul di sini.</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}