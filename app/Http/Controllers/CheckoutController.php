<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{
    public function index(OrderService $orders)
    {
        return inertia('Checkout', [
            'products' => Product::all(),
            'poOpen' => $orders->isPOAvailable(now()),
        ]);
    }

    public function calculate(Request $request)
    {
        $data = $request->validate([
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
            'method' => 'required|in:pickup,delivery',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|integer|exists:products,id',
            'items.*.qty' => 'required|integer|min:1',
        ]);

        $service = new OrderService();
        $products = Product::whereIn('id', collect($data['items'])->pluck('product_id'))
            ->get()
            ->keyBy('id');

        $hasPO = $products->contains(fn ($product) => $product->category === 'po');

        if ($hasPO && ! $service->isPOAvailable(now())) {
            return response()->json(['error' => 'Preorder hanya tersedia jam 09.00-12.00'], 422);
        }

        $distance = $this->distanceFromStore($data['lat'], $data['lng']);

        if ($distance > 20) {
            return response()->json(['error' => 'Alamat di luar radius 20km'], 422);
        }

        $shipping = [
            'ready' => $products->contains(fn ($product) => $product->category === 'ready')
                ? $service->shippingCost('ready', $distance, $data['method'])
                : 0,
            'po' => $hasPO
                ? $service->shippingCost('po', $distance, $data['method'])
                : 0,
        ];

        return response()->json([
            'distance' => round($distance, 2),
            'shipping' => $shipping,
            'total_shipping' => array_sum($shipping),
            'cod_available' => $service->codAvailable($distance),
            'po_available' => $service->isPOAvailable(now()),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|integer|exists:products,id',
            'items.*.qty' => 'required|integer|min:1',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
            'method' => 'required|in:pickup,delivery',
            'payment_method' => 'required|in:cod,manual',
        ]);

        return DB::transaction(function () use ($validated, $request) {
            $service = new OrderService();
            $products = Product::whereIn(
                'id',
                collect($validated['items'])->pluck('product_id')
            )->lockForUpdate()->get()->keyBy('id');

            $hasPO = $products->contains(fn ($product) => $product->category === 'po');

            if ($hasPO && ! $service->isPOAvailable(now())) {
                return back()->withErrors(['error' => 'Preorder hanya tersedia jam 09.00-12.00']);
            }

            $distance = $this->distanceFromStore($validated['lat'], $validated['lng']);

            if ($distance > 20) {
                return back()->withErrors(['error' => 'Alamat di luar radius 20km']);
            }

            if ($validated['payment_method'] === 'cod' && ! $service->codAvailable($distance)) {
                return back()->withErrors(['error' => 'COD hanya tersedia sampai 5 km']);
            }

            $quantities = collect($validated['items'])
                ->groupBy('product_id')
                ->map(fn ($items) => $items->sum('qty'));

            foreach ($quantities as $productId => $qty) {
                $product = $products[$productId];

                if ($product->stock < $qty) {
                    return back()->withErrors(['error' => "Stok {$product->name} tidak cukup."]);
                }
            }

            $shippingCost = 0;
            foreach ($products->pluck('category')->unique() as $type) {
                $group = $quantities->filter(fn ($qty, $productId) => $products[$productId]->category === $type);

                
                $order = Order::create([
                    'user_id' => $request->user()?->id,
                    'type' => $type,
                    'status' => 'pending',
                    'shipping_cost' => $shippingCost,
                ]);

                foreach ($group as $productId => $qty) {
                    $order->items()->create([
                        'product_id' => $productId,
                        'quantity' => $qty,
                        'price' => $products[$productId]->price,
                    ]);
                }
            }

            foreach ($quantities as $productId => $qty) {
                $products[$productId]->decrement('stock', $qty);
            }

            return back()->with('success', 'Order created');
        });
    }

    private function distanceFromStore(float $lat, float $lng): float
    {
        return DB::selectOne(
            'SELECT ST_Distance_Sphere(POINT(?, ?), POINT(?, ?)) / 1000 as distance_km',
            [$lng, $lat, 106.8166, -6.2000]
        )->distance_km;
    }
}
