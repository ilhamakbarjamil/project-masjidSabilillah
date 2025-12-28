<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Item;
use App\Models\Finance;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Buat atau Update Admin
        User::updateOrCreate(
            ['email' => 'admin@sabilillah.com'], // Cari berdasarkan email
            [
                'name' => 'Admin Masjid',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
            ]
        );

        // 2. Buat Dummy Items (Hanya jika tabel kosong agar tidak double)
        if (Item::count() == 0) {
            Item::create(['name' => 'Tenda Hajatan', 'stock' => 5, 'description' => 'Tenda biru 4x6']);
            Item::create(['name' => 'Kursi Lipat', 'stock' => 100, 'description' => 'Kursi besi hitam']);
            Item::create(['name' => 'Sound System Portable', 'stock' => 2, 'description' => 'Speaker wireless + 2 mic']);
        }

        // 3. Buat Dummy Finance (Hanya jika tabel kosong)
        if (Finance::count() == 0) {
            Finance::create([
                'description' => 'Infaq Jumat Kas Masjid', 
                'amount' => 1500000, 
                'type' => 'income', 
                'date' => now()
            ]);
        }
    }
}