import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { 
    Package, 
    Trash2, 
    Plus, 
    Search, 
    Image as ImageIcon, 
    Box, 
    ArrowRight,
    X
} from 'lucide-react';

export default function Index({ auth, items = [] }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const user = auth?.user;

    const { data, setData, post, reset, processing } = useForm({
        name: '',
        stock: '',
        description: '',
        image: null,
        item_id: '',
        quantity: 1,
        loan_date: new Date().toISOString().split('T')[0],
    });

    const submitAddItem = (e) => {
        e.preventDefault();
        post(route('inventory.store'), { 
            onSuccess: () => reset(),
            forceFormData: true 
        });
    };

    const handleHapus = (item) => {
        if (confirm(`Hapus permanen ${item.name}? Tindakan ini tidak dapat dibatalkan.`)) {
            router.delete(route('inventory.destroy', item.id), { // Asumsi route destroy ada
                preserveScroll: true,
            });
        }
    };

    const submitLoanRequest = (e) => {
        e.preventDefault();
        post(route('loans.store'), { 
            onSuccess: () => { setSelectedItem(null); reset(); } 
        });
    };

    // Filter items based on search
    const filteredItems = items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <AuthenticatedLayout 
            user={user} 
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h2 className="font-semibold text-xl text-[#1d1d1f] leading-tight tracking-tight">
                        Pusat Inventaris
                    </h2>
                    {/* Search Bar Visual */}
                    <div className="relative group w-full md:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={16} className="text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                        </div>
                        <input 
                            type="text"
                            placeholder="Cari alat..." 
                            className="block w-full pl-10 pr-3 py-2 border-none rounded-full bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-sm"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            }
        >
            <Head title="Inventaris Masjid" />

            <div className="py-8 bg-[#f5f5f7] min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* HEADER SECTION */}
                    <div className="mb-10 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tighter mb-3">
                            Aset & Fasilitas.
                        </h1>
                        <p className="text-xl text-gray-500 font-medium max-w-2xl">
                            Kelola dan pinjam perlengkapan masjid dengan mudah untuk mendukung kegiatan umat.
                        </p>
                    </div>

                    {/* ADMIN: ADD ITEM PANEL */}
                    {user?.role === 'admin' && (
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-gray-200/50 mb-16 relative overflow-hidden border border-white/50">
                            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                                <Box size={200} />
                            </div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-3 bg-black text-white rounded-2xl">
                                        <Plus size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#1d1d1f]">Tambah Unit Baru</h3>
                                        <p className="text-sm text-gray-500">Masukkan detail aset inventaris.</p>
                                    </div>
                                </div>

                                <form onSubmit={submitAddItem} className="space-y-6 max-w-4xl">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Nama Aset</label>
                                            <input 
                                                type="text" 
                                                className="w-full px-5 py-3 bg-gray-50 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-0 rounded-2xl transition-all font-medium text-[#1d1d1f]"
                                                placeholder="Contoh: Sound System Portable"
                                                value={data.name} 
                                                onChange={e => setData('name', e.target.value)} 
                                                required 
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Stok Awal</label>
                                            <input 
                                                type="number" 
                                                className="w-full px-5 py-3 bg-gray-50 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-0 rounded-2xl transition-all font-medium text-[#1d1d1f]"
                                                placeholder="0"
                                                value={data.stock} 
                                                onChange={e => setData('stock', e.target.value)} 
                                                required 
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Deskripsi Singkat</label>
                                        <textarea 
                                            className="w-full px-5 py-3 bg-gray-50 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-0 rounded-2xl transition-all font-medium text-[#1d1d1f]"
                                            rows="2"
                                            placeholder="Keterangan kondisi atau spesifikasi barang..."
                                            value={data.description}
                                            onChange={e => setData('description', e.target.value)}
                                        ></textarea>
                                    </div>

                                    <div className="flex flex-col md:flex-row items-center gap-6">
                                        <div className="w-full md:w-auto flex-1">
                                            <label className="flex items-center gap-3 w-full px-5 py-3 bg-gray-50 border border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors group">
                                                <div className="p-2 bg-white rounded-full text-gray-400 group-hover:text-emerald-600 shadow-sm">
                                                    <ImageIcon size={18} />
                                                </div>
                                                <span className="text-sm text-gray-500 group-hover:text-gray-700 font-medium">
                                                    {data.image ? data.image.name : "Upload Foto Produk"}
                                                </span>
                                                <input type="file" className="hidden" onChange={e => setData('image', e.target.files[0])} />
                                            </label>
                                        </div>
                                        <button 
                                            disabled={processing}
                                            className="w-full md:w-auto px-8 py-3 bg-[#1d1d1f] text-white font-bold rounded-full hover:bg-black transition-transform hover:scale-105 shadow-lg shadow-black/20 flex items-center justify-center gap-2"
                                        >
                                            Simpan ke Inventaris <ArrowRight size={18} />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* PRODUCT GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <div key={item.id} className="group bg-white rounded-[2rem] p-4 shadow-sm hover:shadow-2xl hover:shadow-gray-200 transition-all duration-500 flex flex-col relative border border-gray-100">
                                    
                                    {/* DELETE BUTTON (ADMIN) */}
                                    {user?.role === 'admin' && (
                                        <button 
                                            onClick={() => handleHapus(item)} 
                                            className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-sm opacity-0 group-hover:opacity-100"
                                            title="Hapus Item"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}

                                    {/* IMAGE AREA */}
                                    <div className="aspect-square rounded-[1.5rem] bg-[#f5f5f7] overflow-hidden mb-6 relative">
                                        {item.image ? (
                                            <img 
                                                src={`/storage/${item.image}`} 
                                                className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700" 
                                                alt={item.name} 
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                                                <Package size={48} strokeWidth={1.5} />
                                                <span className="text-xs font-bold mt-2 uppercase tracking-widest">No Image</span>
                                            </div>
                                        )}
                                        {/* Stock Badge */}
                                        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#1d1d1f] shadow-sm border border-white/50">
                                            {item.stock} Unit Tersedia
                                        </div>
                                    </div>

                                    {/* CONTENT AREA */}
                                    <div className="flex-1 flex flex-col px-2 pb-2">
                                        <h4 className="text-lg font-bold text-[#1d1d1f] mb-1 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                                            {item.name}
                                        </h4>
                                        <p className="text-sm text-gray-500 line-clamp-2 mb-6 font-medium leading-relaxed">
                                            {item.description || 'Fasilitas resmi Masjid Sabilillah.'}
                                        </p>

                                        <div className="mt-auto">
                                            {user?.role === 'user' && item.stock > 0 ? (
                                                <button 
                                                    onClick={() => { setSelectedItem(item); setData('item_id', item.id); }}
                                                    className="w-full py-3 bg-[#0071e3] text-white rounded-full text-sm font-semibold hover:bg-[#0077ed] transition-all active:scale-95 shadow-lg shadow-blue-500/20"
                                                >
                                                    Pinjam Sekarang
                                                </button>
                                            ) : user?.role === 'user' ? (
                                                <button disabled className="w-full py-3 bg-gray-100 text-gray-400 rounded-full text-sm font-semibold cursor-not-allowed">
                                                    Stok Habis
                                                </button>
                                            ) : (
                                                <div className="w-full py-3 bg-gray-50 text-gray-400 rounded-full text-xs font-bold text-center uppercase tracking-wider">
                                                    Admin View
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center">
                                <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
                                    <Package size={40} className="text-gray-400" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Tidak ada barang ditemukan</h3>
                                <p className="text-gray-500">Coba kata kunci lain atau tambahkan barang baru.</p>
                            </div>
                        )}
                    </div>

                    {/* MODAL PINJAM (Action Sheet Style) */}
                    {selectedItem && (
                        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
                            {/* Backdrop */}
                            <div 
                                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                                onClick={() => setSelectedItem(null)}
                            ></div>

                            {/* Modal Card */}
                            <div className="bg-white w-full max-w-lg rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 relative z-10 shadow-2xl animate-fade-in-up">
                                <button 
                                    onClick={() => setSelectedItem(null)}
                                    className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                                >
                                    <X size={20} className="text-gray-500" />
                                </button>

                                <div className="flex items-start gap-5 mb-8">
                                    <div className="w-20 h-20 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0">
                                        {selectedItem.image ? (
                                            <img src={`/storage/${selectedItem.image}`} className="w-full h-full object-cover" alt="" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center"><Package className="text-gray-400" /></div>
                                        )}
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-[#0071e3] uppercase tracking-wider">Form Peminjaman</span>
                                        <h3 className="text-2xl font-bold text-[#1d1d1f] leading-tight mt-1">{selectedItem.name}</h3>
                                        <p className="text-sm text-gray-500 mt-1">Stok Tersedia: {selectedItem.stock} Unit</p>
                                    </div>
                                </div>

                                <form onSubmit={submitLoanRequest} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Jumlah Pinjam</label>
                                        <input 
                                            type="number" 
                                            max={selectedItem.stock} 
                                            min="1" 
                                            className="w-full px-6 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-[#0071e3] focus:ring-0 rounded-2xl text-xl font-bold text-[#1d1d1f] text-center"
                                            value={data.quantity} 
                                            onChange={e => setData('quantity', e.target.value)} 
                                            required 
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Rencana Tanggal Pinjam</label>
                                        <input 
                                            type="date" 
                                            className="w-full px-6 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-[#0071e3] focus:ring-0 rounded-2xl font-medium text-[#1d1d1f]"
                                            value={data.loan_date} 
                                            onChange={e => setData('loan_date', e.target.value)} 
                                            required 
                                        />
                                    </div>

                                    <div className="pt-4">
                                        <button 
                                            type="submit" 
                                            className="w-full py-4 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full font-bold text-lg shadow-xl shadow-blue-500/30 transition-all transform hover:scale-[1.02]"
                                        >
                                            Konfirmasi Peminjaman
                                        </button>
                                        <p className="text-center text-xs text-gray-400 mt-4">
                                            Permintaan Anda akan direview oleh pengurus masjid.
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}