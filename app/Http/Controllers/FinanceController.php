<?php

namespace App\Http\Controllers;

use App\Models\Finance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FinanceController extends Controller
{
    public function index()
    {
        // Hitung statistik keuangan
        $totalIncome = Finance::where('type', 'income')->sum('amount') ?? 0;
        $totalExpense = Finance::where('type', 'expense')->sum('amount') ?? 0;
        $balance = $totalIncome - $totalExpense;

        return Inertia::render('Finance/Index', [
            'finances' => Finance::latest()->get(),
            'summary' => [
                'total_income' => (int)$totalIncome,
                'total_expense' => (int)$totalExpense,
                'balance' => (int)$balance
            ],
            'auth' => [
                'user' => Auth::user()
            ]
        ]);
    }

    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'type' => 'required|in:income,expense',
            'date' => 'required|date',
        ]);

        // Simpan ke database
        Finance::create($request->all());

        return redirect()->back()->with('message', 'Data kas berhasil dicatat');
    }

    public function destroy(Finance $finance)
    {
        $finance->delete();
        return redirect()->back()->with('message', 'Data kas berhasil dihapus');
    }
}