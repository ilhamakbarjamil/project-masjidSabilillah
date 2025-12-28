import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react'; // TAMBAHKAN 'router' DI SINI
import { Package, Trash2, Plus, AlertCircle } from 'lucide-react';

export default function Index({ auth, items = [] }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const user = auth?.user;

    const { data, setData, post, reset } = useForm({
        name: '',
        stock: '',
        description: '',
        image: null,
        item_id: '',
        quantity: 1,
        loan_date: new Date().toISOString().split('T')[0],
    });

    // Fungsi Tambah Barang
    const submitAddItem = (e) => {
        e.preventDefault();
        post(route('inventory.store'), { 
            onSuccess: () => reset(),
            forceFormData: true 
        });
    };

    // Fungsi Hapus Barang (MENGGUNAKAN ROUTER YANG SUDAH DIIMPORT)
    // Pastikan di atas sudah ada: import { router } from '@inertiajs/react';

const handleHapus = (item) => {
    if (confirm(`Yakin ingin menghapus ${item.name}?`)) {
        // Kita gunakan router.delete global, bukan bawaan useForm
        router.delete(`/hapus-item-spesifik/${item.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                // Berhasil! Inertia akan refresh otomatis tanpa error screen
                console.log('Item terhapus dari UI');
            },
            onError: (err) => {
                console.error('Terjadi kesalahan:', err);
            }
        });
    }
};

    const submitLoanRequest = (e) => {
        e.preventDefault();
        post(route('loans.store'), { 
            onSuccess: () => { setSelectedItem(null); reset(); } 
        });
    };

    return (
        <AuthenticatedLayout user={user} header={<h2 className="font-black text-xl text-emerald-800 uppercase tracking-tight">📦 Inventaris Masjid</h2>}>
            <Head title="Inventaris" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* FORM TAMBAH (ADMIN ONLY) */}
                    {user?.role === 'admin' && (
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm mb-10 border border-emerald-100">
                            <h3 className="text-xl font-black mb-6 text-gray-800 italic">Tambah Alat Baru</h3>
                            <form onSubmit={submitAddItem} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                                <div className="md:col-span-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Nama Alat</label>
                                    <input type="text" className="w-full border-gray-100 bg-gray-50 rounded-2xl"
                                        value={data.name} onChange={e => setData('name', e.target.value)} required />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Stok</label>
                                    <input type="number" className="w-full border-gray-100 bg-gray-50 rounded-2xl"
                                        value={data.stock} onChange={e => setData('stock', e.target.value)} required />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Foto</label>
                                    <input type="file" className="text-xs" onChange={e => setData('image', e.target.files[0])} />
                                </div>
                                <button className="bg-emerald-600 text-white font-black py-3 rounded-2xl hover:bg-emerald-700 transition uppercase text-[10px] tracking-widest">Simpan</button>
                            </form>
                        </div>
                    )}

                    {/* LIST BARANG */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {items.map((item) => (
                            <div key={item.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:shadow-xl transition duration-500">
                                <div className="h-48 w-full bg-emerald-50 relative">
                                    {item.image ? (
                                        <img src={`/storage/${item.image}`} className="w-full h-full object-cover" alt={item.name} />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-4xl font-black text-emerald-200 uppercase tracking-tighter">No Image</div>
                                    )}
                                    {user?.role === 'admin' && (
                                        <button 
                                            onClick={() => handleHapus(item)} 
                                            className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1.5 rounded-xl text-[10px] font-black hover:bg-red-600 transition shadow-lg">
                                            HAPUS
                                        </button>
                                    )}
                                </div>

                                <div className="p-8 flex-1 flex flex-col justify-between text-gray-900">
                                    <div>
                                        <h4 className="text-xl font-black mb-1 leading-tight">{item.name}</h4>
                                        <p className="text-sm text-gray-400 italic">{item.description || 'Barang milik Masjid Sabilillah.'}</p>
                                    </div>

                                    <div className="flex items-center justify-between mt-8 border-t pt-6 border-gray-50">
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tersedia</p>
                                            <p className="text-2xl font-black text-emerald-600">{item.stock}</p>
                                        </div>
                                        
                                        {user?.role === 'user' && item.stock > 0 && (
                                            <button 
                                                onClick={() => { setSelectedItem(item); setData('item_id', item.id); }}
                                                className="bg-gray-900 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition shadow-lg">
                                                Pinjam
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* MODAL PINJAM USER */}
                    {selectedItem && (
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                            <div className="bg-white rounded-[3rem] p-10 max-w-md w-full shadow-2xl">
                                <h3 className="text-2xl font-black mb-6 text-gray-800 uppercase tracking-tighter">Form Peminjaman</h3>
                                <form onSubmit={submitLoanRequest} className="space-y-6">
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 uppercase ml-2 tracking-widest">Jumlah Unit</label>
                                        <input type="number" max={selectedItem.stock} min="1" className="w-full border-gray-100 bg-gray-50 rounded-2xl mt-1 font-bold text-gray-800"
                                            value={data.quantity} onChange={e => setData('quantity', e.target.value)} required />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 uppercase ml-2 tracking-widest">Tanggal</label>
                                        <input type="date" className="w-full border-gray-100 bg-gray-50 rounded-2xl mt-1 font-bold text-gray-800"
                                            value={data.loan_date} onChange={e => setData('loan_date', e.target.value)} required />
                                    </div>
                                    <div className="flex gap-4 pt-4">
                                        <button type="button" onClick={() => setSelectedItem(null)} className="flex-1 py-4 text-gray-400 font-black uppercase text-[10px] tracking-widest">Batal</button>
                                        <button type="submit" className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-emerald-100 hover:bg-emerald-700">Kirim</button>
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