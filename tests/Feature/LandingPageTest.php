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
            ->has('poOpen')
            ->has('serverTime')
        );
    }

    public function test_landing_page_shares_authenticated_user_in_props(): void
    {
        $user = \App\Models\User::factory()->create([
            'name' => 'Budi Santoso',
            'role' => 'customer',
        ]);

        $response = $this->actingAs($user)->get(route('home'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->where('auth.user.id', $user->id)
            ->where('auth.user.name', 'Budi Santoso')
            ->where('auth.user.role', 'customer')
        );
    }
}
