import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Index({ auth, items = [] }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const user = auth?.user;

    const { data, setData, post, delete: destroyData, reset } = useForm({
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
                                    <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Nama & Deskripsi</label>
                                    <div className="flex gap-2">
                                        <input type="text" placeholder="Nama Alat" className="w-1/2 border-gray-100 bg-gray-50 rounded-2xl"
                                            value={data.name} onChange={e => setData('name', e.target.value)} required />
                                        <input type="text" placeholder="Keterangan" className="w-1/2 border-gray-100 bg-gray-50 rounded-2xl"
                                            value={data.description} onChange={e => setData('description', e.target.value)} />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Stok</label>
                                    <input type="number" className="w-full border-gray-100 bg-gray-50 rounded-2xl"
                                        value={data.stock} onChange={e => setData('stock', e.target.value)} required />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase ml-2 tracking-tighter">Foto</label>
                                    <input type="file" className="w-full text-[10px]"
                                        onChange={e => setData('image', e.target.files[0])} />
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
                                        <div className="flex items-center justify-center h-full text-4xl italic font-black text-emerald-200">NO IMAGE</div>
                                    )}
                                    {user?.role === 'admin' && (
                                        <button 
    onClick={() => {
        if (confirm(`Yakin ingin menghapus ${item.name}?`)) {
            // KITA RAKIT URL MANUAL: /hapus-barang/6
            const urlManual = `/hapus-barang/${item.id}`;
            
            console.log("Mengirim request DELETE ke:", urlManual);

            destroyData(urlManual, {
                preserveScroll: true,
                onSuccess: () => alert('Berhasil dihapus'),
                onError: (err) => {
                    console.log("Error Detail:", err);
                    alert('Gagal menghapus, cek console');
                }
            });
        }
    }} 
    className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1.5 rounded-xl text-[10px] font-black hover:bg-red-700 shadow-lg z-10"
>
    HAPUS
</button>
                                    )}
                                </div>

                                <div className="p-8 flex-1 flex flex-col justify-between text-gray-900">
                                    <div>
                                        <h4 className="text-xl font-black mb-1">{item.name}</h4>
                                        <p className="text-sm text-gray-400 leading-relaxed italic">{item.description}</p>
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

                    {/* MODAL PINJAM (USER ONLY) */}
                    {selectedItem && (
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                            <div className="bg-white rounded-[3rem] p-10 max-w-md w-full shadow-2xl">
                                <h3 className="text-2xl font-black mb-6 text-gray-800 uppercase tracking-tighter">Form Peminjaman</h3>
                                <form onSubmit={submitLoanRequest} className="space-y-6">
                                    <input type="hidden" value={data.item_id} />
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Jumlah (Maks: {selectedItem.stock})</label>
                                        <input type="number" max={selectedItem.stock} min="1" className="w-full border-gray-100 bg-gray-50 rounded-2xl font-bold"
                                            value={data.quantity} onChange={e => setData('quantity', e.target.value)} required />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Tanggal</label>
                                        <input type="date" className="w-full border-gray-100 bg-gray-50 rounded-2xl font-bold"
                                            value={data.loan_date} onChange={e => setData('loan_date', e.target.value)} required />
                                    </div>
                                    <div className="flex gap-4">
                                        <button type="button" onClick={() => setSelectedItem(null)} className="flex-1 font-black uppercase text-[10px] text-gray-400">Batal</button>
                                        <button type="submit" className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-black uppercase text-[10px] shadow-xl shadow-emerald-100">Kirim Ajuan</button>
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