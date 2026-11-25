<?php

use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ReportController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\Customer\ProfileController as CustomerProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Support\Facades\Route;

Route::get('/', [LandingController::class, 'index'])->name('home');
Route::get('/auth/google/redirect', [GoogleController::class, 'redirect'])->name('auth.google.redirect');
Route::get('/auth/google/action/{product}/{action}', [GoogleController::class, 'action'])->whereIn('action', ['cart', 'buy'])->name('auth.google.action');
Route::get('/auth/google/callback', [GoogleController::class, 'callback'])->name('auth.google.callback');
Route::get('/products', [LandingController::class, 'products'])->name('products.index');
Route::get('/products/{product}', [LandingController::class, 'show'])->name('products.show');
Route::get('/pesanin', function () {
    return inertia('Pesanin');
});

Route::get('/admin/login', function () {
    return inertia('auth/admin-login');
})->name('admin.login');
Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout');
Route::post('/checkout/calculate', [CheckoutController::class, 'calculate'])->name('checkout.calculate');
Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');

Route::middleware(['auth'])->group(function () {
    Route::get('/history', [HistoryController::class, 'index'])->name('history');
    Route::get('/profile', [CustomerProfileController::class, 'show'])->name('customer.profile');
    Route::post('/profile', [CustomerProfileController::class, 'update'])->name('customer.profile.update');
});

Route::middleware(['auth', \App\Http\Middleware\EnsureAdmin::class])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', AdminDashboardController::class)->name('dashboard');
    Route::get('reports/sales', [ReportController::class, 'index'])->name('reports.sales');
    Route::get('reports/sales.csv', [ReportController::class, 'csv'])->name('reports.sales.csv');
    Route::resource('products', ProductController::class);
    Route::get('orders', [OrderController::class, 'index'])->name('orders.index');
    Route::patch('orders/{id}/status', [OrderController::class, 'updateStatus'])->name('orders.status');
});

Route::prefix('{current_team}')
    ->middleware(['auth', 'verified', EnsureTeamMembership::class])
    ->group(function () {
        Route::get('dashboard', DashboardController::class)->name('dashboard');
    });

Route::middleware(['auth'])->group(function () {
    Route::post('invitations/{invitation}/accept', [TeamInvitationController::class, 'accept'])->name('invitations.accept');
    Route::delete('invitations/{invitation}', [TeamInvitationController::class, 'decline'])->name('invitations.decline');
});

require __DIR__.'/settings.php';
