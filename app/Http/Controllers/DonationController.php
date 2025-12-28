<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Midtrans\Config;
use Midtrans\Snap;

class DonationController extends Controller
{
    public function __construct()
    {
        Config::$serverKey = env('MIDTRANS_SERVER_KEY');
        Config::$isProduction = false;
        Config::$isSanitized = true;
        Config::$is3ds = true;
    }

    public function index()
{
    return Inertia::render('Donations/Index', [
        // Riwayat publik (semua yang sukses)
        'donations' => Donation::where('status', 'success')->latest()->take(10)->get(),
        
        // Riwayat khusus user yang sedang login
        'my_donations' => Auth::check() 
            ? Donation::where('user_id', Auth::id())->latest()->get() 
            : [],
            
        'auth' => ['user' => Auth::user()]
    ]);
}

public function pay(Request $request)
{
    $request->validate([
        'donor_name' => 'required|string',
        'amount' => 'required|numeric|min:10000',
    ]);

    $external_id = 'INFQ-' . time();
    $params = [
        'transaction_details' => [
            'order_id' => $external_id,
            'gross_amount' => (int)$request->amount,
        ],
        'customer_details' => [
            'first_name' => $request->donor_name,
            'email' => Auth::user()->email, // Tambahan untuk Midtrans
        ],
    ];

    $snapToken = \Midtrans\Snap::getSnapToken($params);

    Donation::create([
        'user_id' => Auth::id(), // SIMPAN ID USER DI SINI
        'external_id' => $external_id,
        'donor_name' => $request->donor_name,
        'amount' => $request->amount,
        'status' => 'pending',
        'snap_token' => $snapToken
    ]);

    return response()->json(['snap_token' => $snapToken]);
}

    public function callback(Request $request)
    {
        $serverKey = env('MIDTRANS_SERVER_KEY');
        $hashed = hash("sha512", $request->order_id . $request->status_code . $request->gross_amount . $serverKey);

        if ($hashed == $request->signature_key) {
            if ($request->transaction_status == 'capture' || $request->transaction_status == 'settlement') {
                Donation::where('external_id', $request->order_id)->update(['status' => 'success']);
            }
        }
    }
}