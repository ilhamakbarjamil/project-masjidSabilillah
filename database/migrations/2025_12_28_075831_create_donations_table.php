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
    Schema::create('donations', function (Blueprint $table) {
        $table->id();
        $table->string('external_id'); // ID Transaksi untuk Midtrans
        $table->string('donor_name');
        $table->bigInteger('amount');
        $table->string('status')->default('pending'); // pending, success, failed
        $table->string('snap_token')->nullable(); // Token untuk memunculkan popup Midtrans
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donations');
    }
};
