<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
    use HasFactory;

    protected $fillable = [
    'user_id', 
    'external_id', 
    'donor_name', 
    'amount', 
    'status', 
    'payment_type', 
    'va_number',   // Tambahkan ini
    'payment_code' // Tambahkan ini
];

    // Agar kolom payment_info otomatis jadi JSON saat disimpan & jadi Array saat diambil
    protected $casts = [
        'payment_info' => 'array',
    ];
    
    // Relasi ke User (Opsional)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}