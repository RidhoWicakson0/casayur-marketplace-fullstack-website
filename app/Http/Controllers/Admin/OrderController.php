<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        return inertia('Admin/Orders/Index', [
            'orders' => Order::with('items.product')->latest()->paginate(20),
        ]);
    }

    public function updateStatus(Request $request, int $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,processing,completed,cancelled',
        ]);

        $order = Order::find($id);
        if (! $order) {
            return back()->withErrors(['error' => 'Order tidak ditemukan.']);
        }
        abort_if(in_array($order->status, ['completed', 'cancelled'], true), 422, 'Order sudah final.');
        $order->update(['status' => $validated['status']]);

        return back();
    }
}
