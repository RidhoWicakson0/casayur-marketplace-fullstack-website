<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductDetailPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_product_detail_page_returns_product_props(): void
    {
        $product = Product::create([
            'name' => 'Bayam',
            'category' => 'ready',
            'price' => 10000,
            'stock' => 5,
        ]);

        $this->get(route('products.show', $product))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('ProductDetail')
                ->where('product.id', $product->id)
                ->where('product.name', 'Bayam')
                ->has('poOpen')
                ->has('serverTime'));
    }

    public function test_product_detail_page_returns_not_found_for_unknown_product(): void
    {
        $this->get('/products/999999')->assertNotFound();
    }
}
