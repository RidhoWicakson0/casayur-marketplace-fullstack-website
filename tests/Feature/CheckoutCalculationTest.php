<?php

namespace Tests\Feature;

use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CheckoutCalculationTest extends TestCase
{
    use RefreshDatabase;

    public function test_calculate_returns_per_category_shipping_and_cod_eligibility(): void
    {
        $ready = Product::create(['name' => 'Bayam', 'category' => 'ready', 'price' => 10000, 'stock' => 5]);
        $po = Product::create(['name' => 'Lotek', 'category' => 'po', 'price' => 15000, 'stock' => 5]);

        $response = $this->travelTo(Carbon::parse('2026-11-11 10:00'), function () use ($ready, $po) {
            return $this->postJson(route('checkout.calculate'), [
                'lat' => -6.2100,
                'lng' => 106.8166,
                'method' => 'delivery',
                'items' => [
                    ['product_id' => $ready->id, 'qty' => 1],
                    ['product_id' => $po->id, 'qty' => 1],
                ],
            ]);
        });

        $response->assertOk()
            ->assertJsonPath('cod_available', true)
            ->assertJsonStructure(['distance', 'shipping' => ['ready', 'po'], 'total_shipping', 'cod_available', 'po_available']);
    }

    public function test_calculate_marks_cod_unavailable_above_five_km(): void
    {
        $ready = Product::create(['name' => 'Bayam', 'category' => 'ready', 'price' => 10000, 'stock' => 5]);

        $response = $this->postJson(route('checkout.calculate'), [
            'lat' => -6.2600,
            'lng' => 106.8166,
            'method' => 'delivery',
            'items' => [['product_id' => $ready->id, 'qty' => 1]],
        ]);

        $response->assertOk()->assertJsonPath('cod_available', false);
    }

    public function test_calculate_rejects_po_outside_hours(): void
    {
        $po = Product::create(['name' => 'Lotek', 'category' => 'po', 'price' => 15000, 'stock' => 5]);

        $response = $this->travelTo(Carbon::parse('2026-11-11 08:00'), function () use ($po) {
            return $this->postJson(route('checkout.calculate'), [
                'lat' => -6.2100,
                'lng' => 106.8166,
                'method' => 'delivery',
                'items' => [['product_id' => $po->id, 'qty' => 1]],
            ]);
        });

        $response->assertStatus(422)->assertJson(['error' => 'Preorder hanya tersedia jam 09.00-12.00']);
    }

    public function test_calculate_rejects_address_outside_twenty_km(): void
    {
        $ready = Product::create(['name' => 'Bayam', 'category' => 'ready', 'price' => 10000, 'stock' => 5]);

        $response = $this->postJson(route('checkout.calculate'), [
            'lat' => -6.5000,
            'lng' => 106.8166,
            'method' => 'delivery',
            'items' => [['product_id' => $ready->id, 'qty' => 1]],
        ]);

        $response->assertStatus(422)->assertJson(['error' => 'Alamat di luar radius 20km']);
    }
}
