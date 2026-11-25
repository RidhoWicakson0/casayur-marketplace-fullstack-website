<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CheckoutPaymentTest extends TestCase
{
    use RefreshDatabase;

    public function test_checkout_persists_delivery_and_payment_choices(): void
    {
        $product = Product::create([
            'name' => 'Bayam', 'category' => 'ready', 'price' => 10000, 'stock' => 5,
        ]);

        $response = $this->post('/checkout', [
            'items' => [['product_id' => $product->id, 'qty' => 1]],
            'lat' => -6.2,
            'lng' => 106.8166,
            'method' => 'delivery',
            'payment_method' => 'manual',
            'address' => 'Jl. Sayur 1',
            'customer_name' => 'Budi',
            'expected_total' => 999999,
            'customer_phone' => '081234567890',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('orders', [
            'method' => 'delivery',
            'payment_method' => 'manual',
            'address' => 'Jl. Sayur 1',
            'total' => 10000,
        ]);
    }
}
