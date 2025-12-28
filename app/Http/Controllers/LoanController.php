<?php

namespace App\Http\Controllers;

use App\Models\Loan;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoanController extends Controller
{
    // Admin: Melihat semua daftar peminjaman
    public function index()
    {
        return Inertia::render('Admin/Loans', [
            'loans' => Loan::with(['user', 'item'])->latest()->get(),
            'auth' => [
                'user' => Auth::user() // Tambahkan ini
            ]
        ]);
    }

    // User: Mengajukan peminjaman
    public function store(Request $request)
    {
        $request->validate([
            'item_id' => 'required|exists:items,id',
            'quantity' => 'required|integer|min:1',
            'loan_date' => 'required|date',
        ]);

        // Cek stok barang
        $item = Item::find($request->item_id);
        if ($item->stock < $request->quantity) {
            return redirect()->back()->with('error', 'Stok tidak mencukupi!');
        }

        Loan::create([
            'user_id' => Auth::id(),
            'item_id' => $request->item_id,
            'quantity' => $request->quantity,
            'loan_date' => $request->loan_date,
            'status' => 'pending'
        ]);

        return redirect()->back()->with('message', 'Permintaan pinjaman berhasil dikirim!');
    }

    // Admin: Update Status (Approved/Rejected/Returned)
    public function updateStatus(Request $request, Loan $loan)
    {
        // Validasi agar status tidak null
        $request->validate([
            'status' => 'required|in:approved,rejected,returned'
        ]);

        $oldStatus = $loan->status;
        $newStatus = $request->status;

        // Update status peminjaman
        $loan->update(['status' => $newStatus]);

        // LOGIKA STOK:
        // Jika disetujui, kurangi stok barang
        if ($newStatus === 'approved' && $oldStatus === 'pending') {
            $loan->item->decrement('stock', $loan->quantity);
        }
        // Jika barang dikembalikan, tambah stok kembali
        elseif ($newStatus === 'returned' && $oldStatus === 'approved') {
            $loan->item->increment('stock', $loan->quantity);
        }

        return redirect()->back()->with('message', 'Status peminjaman diperbarui.');
    }
}
