import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Index({ auth, finances = [], summary = {} }) {
    const { data, setData, post, reset, delete: destroy } = useForm({
        description: '',
        amount: '',
        type: 'income',
        date: new Date().toISOString().split('T')[0],
    });

    const user = auth?.user;

    const submit = (e) => {
        e.preventDefault();
        post(route('finance.store'), { onSuccess: () => reset() });
    };

    const formatIDR = (price) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price || 0);

    return (
        <AuthenticatedLayout user={user} header={<h2 className="font-black text-xl text-emerald-800 uppercase tracking-tight">💰 Keuangan Masjid</h2>}>
            <Head title="Keuangan" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Ringkasan Saldo (Modern Cards) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border-b-4 border-emerald-500">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Pemasukan</p>
                            <h3 className="text-3xl font-black text-emerald-600 mt-2">{formatIDR(summary?.total_income)}</h3>
                        </div>
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border-b-4 border-red-500">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Pengeluaran</p>
                            <h3 className="text-3xl font-black text-red-600 mt-2">{formatIDR(summary?.total_expense)}</h3>
                        </div>
                        <div className="bg-emerald-800 p-8 rounded-[2.5rem] shadow-xl text-white">
                            <p className="text-[10px] font-black text-emerald-300 uppercase tracking-widest">Saldo Saat Ini</p>
                            <h3 className="text-3xl font-black mt-2">{formatIDR(summary?.balance)}</h3>
                        </div>
                    </div>

                    {/* Form Admin */}
                    {user?.role === 'admin' && (
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm mb-10 border border-gray-100">
                            <h3 className="text-xl font-black mb-6 text-gray-800 italic">Tambah Catatan Transaksi</h3>
                            <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Keterangan</label>
                                    <input type="text" className="w-full border-gray-100 bg-gray-50 rounded-2xl focus:ring-emerald-500 mt-1" 
                                        value={data.description} onChange={e => setData('description', e.target.value)} required />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Nominal (Rp)</label>
                                    <input type="number" className="w-full border-gray-100 bg-gray-50 rounded-2xl mt-1 font-bold" 
                                        value={data.amount} onChange={e => setData('amount', e.target.value)} required />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Jenis Kas</label>
                                    <select className="w-full border-gray-100 bg-gray-50 rounded-2xl mt-1 font-bold" value={data.type} onChange={e => setData('type', e.target.value)}>
                                        <option value="income">Pemasukan (+)</option>
                                        <option value="expense">Pengeluaran (-)</option>
                                    </select>
                                </div>
                                <button className="mt-5 bg-emerald-600 text-white font-black py-3 rounded-2xl hover:bg-emerald-700 transition shadow-lg shadow-emerald-100 uppercase tracking-widest text-xs">Simpan Data</button>
                            </form>
                        </div>
                    )}

                    {/* Riwayat Tabel */}
                    <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-gray-100">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Tanggal</th>
                                    <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Keterangan</th>
                                    <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Jumlah</th>
                                    {user?.role === 'admin' && <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Opsi</th>}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {finances.map((item) => (
                                    <tr key={item.id} className="hover:bg-emerald-50/50 transition duration-300">
                                        <td className="p-6 text-sm text-gray-500 font-medium">{item.date}</td>
                                        <td className="p-6 font-bold text-gray-800">{item.description}</td>
                                        <td className={`p-6 text-right font-black ${item.type === 'income' ? 'text-emerald-600' : 'text-red-500'}`}>
                                            {item.type === 'income' ? '+' : '-'} {formatIDR(item.amount)}
                                        </td>
                                        {user?.role === 'admin' && (
                                            <td className="p-6 text-center">
                                                <button onClick={() => destroy(route('finance.destroy', item.id))} className="text-red-300 hover:text-red-600 text-xs font-black uppercase tracking-tighter transition">Hapus</button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}