<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CheckoutStoreTest extends TestCase
{
    use RefreshDatabase;

    public function test_store_rejects_po_outside_hours_without_changing_stock(): void
    {
        $po = Product::create(['name' => 'Lotek', 'category' => 'po', 'price' => 15000, 'stock' => 5]);

        $response = $this->travelTo(Carbon::parse('2026-11-11 08:00'), function () use ($po) {
            return $this->post(route('checkout.store'), [
                'lat' => -6.2100,
                'lng' => 106.8166,
                'method' => 'pickup',
                'payment_method' => 'manual',
                'items' => [['product_id' => $po->id, 'qty' => 1]],
            ]);
        });

        $response->assertSessionHasErrors('error');
        self::assertSame(5, $po->fresh()->stock);
    }

    public function test_store_rejects_cod_above_five_km(): void
    {
        $ready = Product::create(['name' => 'Bayam', 'category' => 'ready', 'price' => 10000, 'stock' => 5]);

        $response = $this->post(route('checkout.store'), [
            'lat' => -6.2600,
            'lng' => 106.8166,
            'method' => 'delivery',
            'payment_method' => 'cod',
            'items' => [['product_id' => $ready->id, 'qty' => 1]],
        ]);

        $response->assertSessionHasErrors('error');
        self::assertSame(5, $ready->fresh()->stock);
    }

    public function test_store_persists_order_and_items_using_database_price(): void
    {
        $ready = Product::create(['name' => 'Bayam', 'category' => 'ready', 'price' => 10000, 'stock' => 5]);

        $response = $this->post(route('checkout.store'), [
            'lat' => -6.2100,
            'lng' => 106.8166,
            'method' => 'delivery',
            'payment_method' => 'manual',
            'items' => [['product_id' => $ready->id, 'qty' => 2, 'price' => 1]],
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('orders', ['type' => 'ready', 'status' => 'pending']);
        $this->assertDatabaseHas('order_items', ['product_id' => $ready->id, 'quantity' => 2, 'price' => 10000]);
    }

    public function test_store_decrements_stock_on_success(): void
    {
        $ready = Product::create(['name' => 'Bayam', 'category' => 'ready', 'price' => 10000, 'stock' => 5]);

        $response = $this->post(route('checkout.store'), [
            'lat' => -6.2100,
            'lng' => 106.8166,
            'method' => 'delivery',
            'payment_method' => 'manual',
            'items' => [['product_id' => $ready->id, 'qty' => 2]],
        ]);

        $response->assertRedirect();
        self::assertSame(3, $ready->fresh()->stock);
    }
}
