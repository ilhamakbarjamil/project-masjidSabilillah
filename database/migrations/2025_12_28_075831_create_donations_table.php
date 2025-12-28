<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('donations', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->nullable()->constrained(); // Opsional, jika user login
        $table->string('order_id')->unique(); // KUNCI UTAMA: Untuk pencocokan dengan Midtrans
        $table->string('donor_name');
        $table->string('payment_method'); // bca, bri, qris
        $table->decimal('amount', 15, 2);
        $table->string('status')->default('pending'); // pending, success, failed, expired
        $table->json('payment_info')->nullable(); // PENTING: Simpan respon Midtrans (No VA / URL QRIS) di sini
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
