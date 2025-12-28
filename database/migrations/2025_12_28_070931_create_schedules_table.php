<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('schedules', function (Blueprint $table) {
        $table->id();
        $table->string('title'); // Contoh: Kajian Rutin Maghrib / Khutbah Jumat
        $table->string('ustadz_name'); // Nama Ustadz / Khatib
        $table->enum('type', ['pengajian', 'khutbah']); 
        $table->date('date');
        $table->time('time');
        $table->string('location')->default('Ruang Utama Masjid');
        $table->string('image')->nullable(); // Foto poster kajian
        $table->timestamps();
    });
}

public function down(): void { Schema::dropIfExists('schedules'); }
};
