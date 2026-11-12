<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LandingPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_landing_page_loads_with_products(): void
    {
        Product::create(['name' => 'Sayur Bayam', 'category' => 'ready', 'price' => 10000, 'stock' => 5]);
        Product::create(['name' => 'PO Rendang', 'category' => 'po', 'price' => 25000, 'stock' => 5]);

        $response = $this->get(route('home'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('welcome')
            ->has('products', 2)
        );
    }
}
