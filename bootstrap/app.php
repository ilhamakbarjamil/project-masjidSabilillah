<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Daftarkan alias middleware kamu di sini
        $middleware->alias([
            'admin' => \App\Http\Middleware\AdminMiddleware::class,
        ]);
    })
->withMiddleware(function (Middleware $middleware) {
    // Tambahkan pengecualian ini agar Midtrans bisa masuk
    $middleware->validateCsrfTokens(except: [
        'infaq/callback', 
    ]);
})

// Di Laravel 11, kamu bisa menambahkannya di bootstrap/app.php bagian middleware
->withMiddleware(function (Middleware $middleware) {
    $middleware->trustProxies(at: '*'); // Percaya pada semua proxy (termasuk Ngrok)
    
    $middleware->validateCsrfTokens(except: [
        '/infaq/callback',
    ]);
})
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
