<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Midtrans\Transaction;
use Midtrans\Config;
use Midtrans\CoreApi; // Ganti Snap ke CoreApi

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
            'donations' => Donation::where('status', 'success')->latest()->get(),
            'my_donations' => Auth::check() ? Donation::where('user_id', Auth::id())->latest()->get() : [],
            'auth' => ['user' => Auth::user()]
        ]);
    }

    public function pay(Request $request)
    {
        $request->validate([
            'donor_name' => 'required',
            'amount' => 'required|numeric|min:10000',
            'bank' => 'required'
        ]);

        $order_id = 'INFQ-' . time();
        $params = [
            'transaction_details' => ['order_id' => $order_id, 'gross_amount' => (int)$request->amount],
            'customer_details' => [
                'first_name' => $request->donor_name,
                'email' => Auth::user()->email
            ],
        ];

        if ($request->bank == 'qris') {
            $params['payment_type'] = 'qris';
        } elseif ($request->bank == 'mandiri') {
            $params['payment_type'] = 'echannel';
            $params['echannel'] = ['bill_info1' => 'Infaq', 'bill_info2' => 'Masjid Sabilillah'];
        } else {
            $params['payment_type'] = 'bank_transfer';
            $params['bank_transfer'] = ['bank' => $request->bank];
        }

        try {
            \Midtrans\Config::$serverKey = env('MIDTRANS_SERVER_KEY');
            \Midtrans\Config::$isProduction = false;

            $response = \Midtrans\CoreApi::charge($params);

            $va_number = null;
            $payment_code = null;

            // LOGIKA PARSING VA NUMBER (AGAR TIDAK KOSONG)
            if ($request->bank == 'qris') {
                $payment_code = $response->actions[0]->url; // Link Gambar QRIS
            } elseif ($request->bank == 'mandiri') {
                $va_number = $response->bill_key; // VA Mandiri
                $payment_code = $response->biller_code; // Kode Perusahaan
            } elseif ($request->bank == 'permata') {
                $va_number = $response->permata_va_number;
            } else {
                // BCA, BRI, BNI menggunakan format ini
                $va_number = $response->va_numbers[0]->va_number ?? null;
            }

            // SIMPAN KE DATABASE
            $donation = Donation::create([
                'user_id' => Auth::id(),
                'external_id' => $order_id,
                'donor_name' => $request->donor_name,
                'amount' => $request->amount,
                'status' => 'pending',
                'payment_type' => $request->bank,
                'va_number' => $va_number,
                'payment_code' => $payment_code,
            ]);

            return response()->json($donation);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    // Tambahkan fungsi ini di dalam class DonationController
    public function checkStatus($id)
    {
        try {
            $donation = Donation::find($id);

            if (!$donation) {
                return response()->json(['status' => 'error', 'message' => 'Data tidak ditemukan'], 404);
            }

            // Jika masih pending, coba sinkronkan dengan Midtrans
            if ($donation->status === 'pending') {
                // Pastikan Konfigurasi Midtrans sudah terpanggil
                \Midtrans\Config::$serverKey = env('MIDTRANS_SERVER_KEY');
                \Midtrans\Config::$isProduction = false;

                try {
                    $statusMidtrans = \Midtrans\Transaction::status($donation->external_id);
                    $status = $statusMidtrans->transaction_status ?? null;

                    if ($status == 'settlement' || $status == 'capture') {
                        $donation->update(['status' => 'success']);

                        // Input ke kas (Hanya jika belum ada untuk ID ini)
                        $cekKas = \App\Models\Finance::where('description', 'LIKE', '%' . $donation->external_id . '%')->first();
                        if (!$cekKas) {
                            \App\Models\Finance::create([
                                'description' => 'Infaq Online: ' . $donation->donor_name . ' (' . $donation->external_id . ')',
                                'amount' => $donation->amount,
                                'type' => 'income',
                                'date' => now()
                            ]);
                        }
                    }
                } catch (\Exception $e) {
                    // Jika transaksi belum ada di server Midtrans, biarkan pending
                }
            }

            return response()->json(['status' => $donation->status]);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }
}
