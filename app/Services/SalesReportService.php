<?php

namespace App\Services;

use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class SalesReportService
{
    public function summary(Carbon $from, Carbon $to): array
    {
        $orders = Order::where('status', 'completed')->whereBetween('created_at', [$from->startOfDay(), $to->endOfDay()]);

        return [
            'orders' => (clone $orders)->count(),
            'subtotal' => (clone $orders)->sum('subtotal'),
            'shipping' => (clone $orders)->sum('shipping_cost'),
            'total' => (clone $orders)->sum('total'),
            'items' => (clone $orders)->withSum('items', 'quantity')->get()->sum('items_sum_quantity'),
        ];
    }

    public function rows(Carbon $from, Carbon $to): Collection
    {
        return Order::with('items.product')
            ->where('status', 'completed')
            ->whereBetween('created_at', [$from->startOfDay(), $to->endOfDay()])
            ->latest()->get();
    }
}
