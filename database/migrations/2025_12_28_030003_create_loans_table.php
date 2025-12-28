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
    Schema::create('loans', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Siapa yang pinjam
        $table->foreignId('item_id')->constrained()->onDelete('cascade'); // Barang apa
        $table->integer('quantity');
        $table->date('loan_date');
        $table->date('return_date')->nullable();
        $table->enum('status', ['pending', 'approved', 'returned', 'rejected'])->default('pending');
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loans');
    }
};
