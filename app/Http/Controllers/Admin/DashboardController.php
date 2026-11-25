<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $start = now()->startOfMonth()->subMonths(11);
        $monthly = collect(range(0, 11))->map(function (int $offset) use ($start) {
            $month = $start->copy()->addMonths($offset);
            $query = Order::where('status', 'completed')->whereYear('created_at', $month->year)->whereMonth('created_at', $month->month);
            return ['label' => $month->format('M Y'), 'orders' => (clone $query)->count(), 'revenue' => (clone $query)->sum('total')];
        });

        return inertia('Admin/Dashboard', [
            'statistics' => ['revenue' => Order::where('status', 'completed')->sum('total'), 'orders' => Order::count(), 'pending' => Order::where('status', 'pending')->count(), 'completed' => Order::where('status', 'completed')->count()],
            'monthly' => $monthly,
            'recent_orders' => Order::latest()->limit(10)->get(),
            'low_stock_products' => Product::where('stock', '<=', 5)->orderBy('stock')->get(),
        ]);
    }
}
