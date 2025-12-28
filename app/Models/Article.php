<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    // PERBAIKAN: Tambahkan fillable agar data bisa disimpan
    protected $fillable = [
        'title', 
        'slug', 
        'content', 
        'image', 
        'user_id'
    ];

    // PERBAIKAN: Tambahkan relasi ke User (Penulis)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}