<?php

use App\Http\Controllers\ItemController;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\FinanceController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ScheduleController; // Import ini
use App\Http\Controllers\ProfileController;
use App\Models\Finance;
use App\Models\Item;
use App\Models\Loan;
use App\Models\Article;
use App\Models\Schedule;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'articles' => Article::with('user')->latest()->take(3)->get(),
        'schedules' => Schedule::where('date', '>=', now()->toDateString())->orderBy('date', 'asc')->take(4)->get(),
        'balance' => (Finance::where('type', 'income')->sum('amount') ?? 0) - (Finance::where('type', 'expense')->sum('amount') ?? 0),
        'auth' => ['user' => Auth::user()],
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'auth' => ['user' => Auth::user()],
        'stats' => [
            'balance' => Finance::where('type', 'income')->sum('amount') - Finance::where('type', 'expense')->sum('amount'),
            'total_items' => Item::count(),
            'active_loans' => Loan::where('status', 'approved')->count(),
            'total_articles' => Article::count(),
        ]
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/inventory', [ItemController::class, 'index'])->name('inventory.index');
    Route::get('/finance', [FinanceController::class, 'index'])->name('finance.index');
    Route::get('/articles', [ArticleController::class, 'index'])->name('articles.index');
    Route::get('/schedules', [ScheduleController::class, 'index'])->name('schedules.index'); // Rute User
    Route::post('/loans', [LoanController::class, 'store'])->name('loans.store');

    Route::middleware('admin')->group(function () {
        Route::post('/inventory', [ItemController::class, 'store'])->name('inventory.store');
        Route::delete('/inventory/{item}', [ItemController::class, 'destroy'])->name('inventory.destroy');
        Route::get('/admin/loans', [LoanController::class, 'index'])->name('admin.loans.index');
        Route::patch('/admin/loans/{loan}', [LoanController::class, 'updateStatus'])->name('admin.loans.update');
        Route::post('/finance', [FinanceController::class, 'store'])->name('finance.store');
        Route::delete('/finance/{finance}', [FinanceController::class, 'destroy'])->name('finance.destroy');
        Route::post('/articles', [ArticleController::class, 'store'])->name('articles.store');
        Route::delete('/articles/{article}', [ArticleController::class, 'destroy'])->name('articles.destroy');
        Route::post('/schedules', [ScheduleController::class, 'store'])->name('schedules.store'); // Rute Admin
        Route::delete('/schedules/{schedule}', [ScheduleController::class, 'destroy'])->name('schedules.destroy');
    });
});

require __DIR__.'/auth.php';