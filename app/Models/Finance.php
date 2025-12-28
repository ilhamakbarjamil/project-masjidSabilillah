<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Finance extends Model
{
    use HasFactory;

    // Daftarkan kolom yang boleh diisi secara massal
    protected $fillable = [
        'description',
        'amount',
        'type',
        'date'
    ];
}