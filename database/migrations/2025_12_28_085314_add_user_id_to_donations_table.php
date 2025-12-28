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
    Schema::table('donations', function (Blueprint $table) {
        // Tambahkan user_id yang boleh kosong (nullable) jika ingin mengizinkan donatur anonim
        $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade')->after('id');
    });
}

public function down(): void
{
    Schema::table('donations', function (Blueprint $table) {
        $table->dropForeign(['user_id']);
        $table->dropColumn('user_id');
    });
}
};
