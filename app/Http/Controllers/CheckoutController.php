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
            'lat' => 'nullable|numeric',
            'lng' => 'nullable|numeric',
            'method' => 'required|in:pickup,delivery',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|integer|exists:products,id',
            'items.*.qty' => 'required|integer|min:1',
        ]);

        $service = new OrderService();
        if ($data['method'] === 'delivery' && (! $data['lat'] || ! $data['lng'])) {
            return response()->json(['error' => 'Koordinat alamat delivery wajib dipilih'], 422);
        }
        $products = Product::whereIn('id', collect($data['items'])->pluck('product_id'))
            ->get()
            ->keyBy('id');

        $subtotal = collect($data['items'])->sum(fn ($item) => $products[$item['product_id']]->price * $item['qty']);
        $hasPO = $products->contains(fn ($product) => $product->category === 'po');

        if ($hasPO && ! $service->isPOAvailable(now())) {
            return response()->json(['error' => 'Preorder hanya tersedia jam 09.00-12.00'], 422);
        }

        $distance = $data['method'] === 'pickup' ? 0 : $this->distanceFromStore($data['lat'], $data['lng']);

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
            'subtotal' => $subtotal,
            'total' => $subtotal + array_sum($shipping),
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
            'lat' => 'nullable|numeric',
            'lng' => 'nullable|numeric',
            'method' => 'required|in:pickup,delivery',
            'payment_method' => 'required|in:cod,manual',
            'address' => 'required_if:method,delivery|nullable|string|max:1000',
            'customer_name' => 'required|string|max:120',
            'customer_phone' => 'required|string|max:30|regex:/^[0-9+\\s().-]+$/',
        ]);

        if ($validated['method'] === 'delivery' && (! $validated['lat'] || ! $validated['lng'])) {
            return back()->withErrors(['error' => 'Koordinat alamat delivery wajib dipilih']);
        }

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

            $distance = $validated['method'] === 'pickup' ? 0 : $this->distanceFromStore($validated['lat'], $validated['lng']);

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

            $distance = $validated['method'] === 'pickup' ? 0 : $this->distanceFromStore($validated['lat'], $validated['lng']);
            $shippingCost = $products->pluck('category')->unique()->sum(fn ($type) => $service->shippingCost($type, $distance, $validated['method']));
            $subtotal = $quantities->sum(fn ($qty, $productId) => $products[$productId]->price * $qty);
            $order = Order::create([
                'user_id' => $request->user()?->id,
                'type' => $products->contains(fn ($product) => $product->category === 'po') ? 'po' : 'ready',
                'status' => 'pending',
                'shipping_cost' => $shippingCost,
                'subtotal' => $subtotal,
                'total' => $subtotal + $shippingCost,
                'method' => $validated['method'],
                'payment_method' => $validated['payment_method'],
                'address' => $validated['address'] ?? null,
                'lat' => $validated['lat'],
                'lng' => $validated['lng'],
                'customer_name' => $validated['customer_name'],
                'customer_phone' => $validated['customer_phone'],
            ]);

            foreach ($quantities as $productId => $qty) {
                $order->items()->create([
                    'product_id' => $productId,
                    'quantity' => $qty,
                    'price' => $products[$productId]->price,
                ]);
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
