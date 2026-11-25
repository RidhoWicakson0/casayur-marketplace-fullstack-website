<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CustomerHistoryTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_is_redirected_from_history()
    {
        $response = $this->get('/history');
        $response->assertRedirect('/login');
    }

    public function test_authenticated_customer_can_view_own_orders()
    {
        $customer = User::factory()->create([
            'role' => 'customer',
        ]);

        $product = Product::create([
            'name' => 'Bayam Hijau',
            'category' => 'ready',
            'price' => 5000,
            'stock' => 10,
        ]);

        $order = Order::create([
            'user_id' => $customer->id,
            'type' => 'ready',
            'status' => 'pending',
            'subtotal' => 10000,
            'shipping_cost' => 0,
            'total' => 10000,
            'method' => 'pickup',
            'payment_method' => 'cod',
            'customer_name' => 'Budi',
            'customer_phone' => '081234567890',
        ]);

        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $product->id,
            'quantity' => 2,
            'price' => 5000,
        ]);

        $response = $this->actingAs($customer)->get('/history');

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('History')
            ->has('orders', 1)
            ->where('orders.0.id', $order->id)
            ->where('orders.0.items.0.product.name', 'Bayam Hijau')
        );
    }
}
