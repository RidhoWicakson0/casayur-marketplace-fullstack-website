<?php

namespace Tests\Feature\Admin;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_create_a_product(): void
    {
        $this->actingAs(\App\Models\User::factory()->create(['email' => 'admin@example.com', 'role' => 'admin']));
        config(['casayur.admin_emails' => ['admin@example.com']]);

        $response = $this->post(route('admin.products.store'), [
            'name' => 'Sayur Bayam',
            'category' => 'ready',
            'price' => 5000,
            'stock' => 10,
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('products', ['name' => 'Sayur Bayam']);
    }
}
