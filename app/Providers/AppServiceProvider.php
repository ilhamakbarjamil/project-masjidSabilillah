<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL; // Import di bagian atas

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
{
    // Tambahkan ini:
    if (config('app.env') !== 'local') {
        URL::forceScheme('https');
    }
    // Atau untuk ngetes Ngrok sekarang, pakai ini saja langsung:
    if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https') {
        URL::forceScheme('https');
    }
}   
}
