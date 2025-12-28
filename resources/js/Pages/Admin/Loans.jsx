import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react'; // Tambahkan router

export default function Loans({ auth, loans = [] }) {
    const user = auth?.user;

    const updateStatus = (id, status) => {
        if(confirm(`Ubah status peminjaman menjadi ${status}?`)) {
            // Gunakan router.patch untuk mengirim data secara langsung
            router.patch(route('admin.loans.update', id), { 
                status: status 
            }, {
                preserveScroll: true,
                onSuccess: () => alert('Status berhasil diperbarui!')
            });
        }
    };

    return (
        <AuthenticatedLayout user={user} header={<h2 className="font-black text-xl text-emerald-800 uppercase tracking-tight">Persetujuan Peminjaman</h2>}>
            <Head title="Kelola Peminjaman" />
            
            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-gray-100">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Jamaah</th>
                                    <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Alat / Jumlah</th>
                                    <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                                    <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Aksi Pengurus</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {loans.map((loan) => (
                                    <tr key={loan.id} className="hover:bg-emerald-50/30 transition">
                                        <td className="p-6">
                                            <div className="font-bold text-gray-800">{loan.user?.name}</div>
                                            <div className="text-[10px] text-gray-400 uppercase font-bold">{loan.loan_date}</div>
                                        </td>
                                        <td className="p-6 text-center">
                                            <div className="font-bold text-gray-700">{loan.item?.name}</div>
                                            <div className="text-xs font-black text-emerald-600">{loan.quantity} Unit</div>
                                        </td>
                                        <td className="p-6 text-center">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                                loan.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                                                loan.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 
                                                loan.status === 'returned' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                                {loan.status}
                                            </span>
                                        </td>
                                        <td className="p-6 text-center">
                                            <div className="flex justify-center gap-2">
                                                {loan.status === 'pending' && (
                                                    <>
                                                        <button onClick={() => updateStatus(loan.id, 'approved')} className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-emerald-700 transition shadow-lg shadow-emerald-100">Setujui</button>
                                                        <button onClick={() => updateStatus(loan.id, 'rejected')} className="bg-white border border-red-100 text-red-500 px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-red-50 transition">Tolak</button>
                                                    </>
                                                )}
                                                {loan.status === 'approved' && (
                                                    <button onClick={() => updateStatus(loan.id, 'returned')} className="bg-blue-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-blue-700 transition shadow-lg shadow-blue-100">Selesai Kembali</button>
                                                )}
                                                {['returned', 'rejected'].includes(loan.status) && (
                                                    <span className="text-gray-300 italic text-xs font-bold uppercase tracking-tighter">Arsip Selesai</span>
                                                )}
                                            </div>
                                        </td>
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