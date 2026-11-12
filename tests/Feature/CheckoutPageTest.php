<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CheckoutPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_checkout_page_can_be_rendered(): void
    {
        $this->withoutVite();

        Product::create(['name' => 'Bayam', 'category' => 'ready', 'price' => 10000, 'stock' => 5]);

        $response = $this->get('/checkout');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Checkout')
            ->has('products', 1)
        );
    }
}
