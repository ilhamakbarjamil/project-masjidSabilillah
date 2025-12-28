import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Calendar, Clock, User, MapPin, Plus, Trash2, Image as ImageIcon, Search } from 'lucide-react';

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

    const getDayAndMonth = (dateString) => {
        const date = new Date(dateString);
        return {
            day: date.getDate(),
            month: date.toLocaleDateString('id-ID', { month: 'short' }).toUpperCase()
        };
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-emerald-900 tracking-tight">Agenda & Kajian Masjid</h2>}
        >
            <Head title="Agenda Masjid" />

            <div className="py-12 bg-slate-50 min-h-screen font-sans">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* FORM ADMIN SECTION */}
                    {auth.user.role === 'admin' && (
                        <div className="bg-white p-8 rounded-3xl shadow-lg shadow-emerald-100 border border-emerald-50 mb-16 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -mr-16 -mt-16 opacity-50 blur-3xl pointer-events-none"></div>
                            
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-slate-800 border-b border-slate-100 pb-4">
                                    <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                                        <Plus size={20} strokeWidth={3} />
                                    </div>
                                    Buat Agenda Baru
                                </h3>

                                <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {/* Judul */}
                                    <div className="lg:col-span-2 space-y-2">
                                        <label className="text-sm font-semibold text-slate-600">Nama Kegiatan</label>
                                        <input 
                                            type="text" 
                                            placeholder="Contoh: Kajian Rutin Ba'da Maghrib" 
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition bg-slate-50" 
                                            value={data.title} 
                                            onChange={e => setData('title', e.target.value)} 
                                            required 
                                        />
                                    </div>

                                    {/* Ustadz */}
                                    <div className="lg:col-span-2 space-y-2">
                                        <label className="text-sm font-semibold text-slate-600">Nama Ustadz / Pembicara</label>
                                        <div className="relative">
                                            <User size={18} className="absolute left-4 top-3.5 text-slate-400" />
                                            <input 
                                                type="text" 
                                                placeholder="Ustadz Fulan, Lc." 
                                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition bg-slate-50" 
                                                value={data.ustadz_name} 
                                                onChange={e => setData('ustadz_name', e.target.value)} 
                                                required 
                                            />
                                        </div>
                                    </div>

                                    {/* Tipe & Tanggal */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-600">Jenis Kegiatan</label>
                                        <select 
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition bg-slate-50 font-medium text-slate-700" 
                                            value={data.type} 
                                            onChange={e => setData('type', e.target.value)}
                                        >
                                            <option value="pengajian">Pengajian</option>
                                            <option value="khutbah">Khutbah Jumat</option>
                                            <option value="kegiatan">Lainnya</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-600">Tanggal</label>
                                        <input 
                                            type="date" 
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition bg-slate-50" 
                                            value={data.date} 
                                            onChange={e => setData('date', e.target.value)} 
                                            required 
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-600">Jam Mulai</label>
                                        <input 
                                            type="time" 
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition bg-slate-50" 
                                            value={data.time} 
                                            onChange={e => setData('time', e.target.value)} 
                                            required 
                                        />
                                    </div>
                                    
                                    {/* Lokasi (Baru ditambahkan) */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-600">Lokasi</label>
                                        <input 
                                            type="text" 
                                            placeholder="Masjid Utama / Aula"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition bg-slate-50" 
                                            value={data.location} 
                                            onChange={e => setData('location', e.target.value)} 
                                            required 
                                        />
                                    </div>

                                    {/* Upload Gambar & Submit */}
                                    <div className="lg:col-span-4 flex flex-col md:flex-row gap-4 items-end pt-4 border-t border-slate-100 mt-2">
                                        <div className="flex-1 w-full">
                                            <label className="text-sm font-semibold text-slate-600 mb-2 block">Poster / Gambar (Opsional)</label>
                                            <div className="flex items-center gap-3">
                                                <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition text-sm font-medium">
                                                    <ImageIcon size={18} /> Pilih File
                                                    <input type="file" className="hidden" onChange={e => setData('image', e.target.files[0])} />
                                                </label>
                                                {data.image && <span className="text-xs text-emerald-600 font-medium truncate">{data.image.name}</span>}
                                            </div>
                                        </div>
                                        
                                        <button className="w-full md:w-auto px-8 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 active:scale-95 transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2">
                                            <Plus size={20} /> Simpan Agenda
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* LIST AGENDA SECTION */}
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <Calendar className="text-emerald-600" /> Daftar Jadwal Mendatang
                        </h3>
                        <span className="text-sm font-medium text-slate-500 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100">
                            Total: {schedules.length} Kegiatan
                        </span>
                    </div>

                    {/* EMPTY STATE */}
                    {schedules.length === 0 ? (
                        <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-100">
                           
                            <h3 className="text-lg font-bold text-slate-700">Belum ada agenda</h3>
                            <p className="text-slate-500">Jadwal pengajian atau kegiatan belum ditambahkan.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {schedules.map((item) => {
                                const { day, month } = getDayAndMonth(item.date);
                                return (
                                    <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col sm:flex-row group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                        
                                        {/* Image Section */}
                                        <div className="sm:w-48 h-48 sm:h-auto relative overflow-hidden bg-slate-200 shrink-0">
                                            {item.image ? (
                                                <img 
                                                    src={`/storage/${item.image}`} 
                                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700" 
                                                    alt="Poster" 
                                                />
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-100">
                                                    <ImageIcon size={32} className="mb-2 opacity-50" />
                                                    <span className="text-xs font-medium uppercase tracking-wider">No Image</span>
                                                </div>
                                            )}
                                            {/* Date Badge Overlay for Mobile */}
                                            <div className="absolute top-3 left-3 sm:hidden bg-white/95 backdrop-blur rounded-xl px-3 py-1 text-center shadow-lg">
                                                <span className="block text-xl font-black text-slate-800 leading-none">{day}</span>
                                                <span className="block text-[10px] font-bold text-emerald-600 uppercase">{month}</span>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-6 flex-1 flex flex-col justify-between relative">
                                            {/* Delete Button */}
                                            {auth.user.role === 'admin' && (
                                                <button 
                                                    onClick={() => {
                                                        if(confirm('Yakin ingin menghapus agenda ini?')) {
                                                            destroy(route('schedules.destroy', item.id))
                                                        }
                                                    }} 
                                                    className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition"
                                                    title="Hapus Agenda"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            )}

                                            <div>
                                                <div className="flex justify-between items-start mb-2 pr-8">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                                                        item.type === 'pengajian' 
                                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                                                            : 'bg-blue-50 text-blue-700 border-blue-100'
                                                    }`}>
                                                        {item.type}
                                                    </span>
                                                </div>
                                                
                                                <h3 className="text-xl font-bold text-slate-800 mb-1 leading-tight group-hover:text-emerald-700 transition">
                                                    {item.title}
                                                </h3>
                                                
                                                <p className="text-emerald-600 font-medium text-sm mb-4 flex items-center gap-1.5">
                                                    <User size={16} /> {item.ustadz_name}
                                                </p>

                                                <div className="space-y-2 border-t border-slate-50 pt-3">
                                                    <div className="flex items-center gap-3 text-slate-500 text-sm">
                                                        <div className="hidden sm:flex flex-col items-center justify-center bg-slate-50 border border-slate-100 rounded-lg w-10 h-10 shrink-0">
                                                            <span className="text-xs font-bold text-emerald-600 uppercase leading-none">{month}</span>
                                                            <span className="text-sm font-bold text-slate-800 leading-none">{day}</span>
                                                        </div>
                                                        <div className="sm:hidden text-emerald-500"><Calendar size={16}/></div>
                                                        <span className="sm:hidden">{formatDate(item.date)}</span>
                                                        <span className="hidden sm:block">{formatDate(item.date)}</span>
                                                    </div>
                                                    
                                                    <div className="flex items-center gap-4 text-slate-500 text-sm pl-1">
                                                        <div className="flex items-center gap-2">
                                                            <Clock size={16} className="text-emerald-500" /> 
                                                            {item.time.substring(0,5)} WIB
                                                        </div>
                                                        {item.location && (
                                                            <div className="flex items-center gap-2 truncate">
                                                                <MapPin size={16} className="text-emerald-500" /> 
                                                                <span className="truncate max-w-[100px]">{item.location}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}