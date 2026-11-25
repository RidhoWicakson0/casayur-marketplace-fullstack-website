<?php

namespace Tests\Feature\Admin;

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ProductCrudUploadTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_create_product_with_description_and_photo(): void
    {
        Storage::fake('public');
        $this->actingAs(User::factory()->create(['role' => 'admin']));

        $response = $this->post(route('admin.products.store'), [
            'name' => 'Bayam', 'category' => 'ready', 'price' => 5000, 'stock' => 10,
            'description' => 'Bayam segar', 'image' => UploadedFile::fake()->image('bayam.jpg'),
        ]);

        $response->assertRedirect();
        $product = Product::first();
        $this->assertSame('Bayam segar', $product->description);
        Storage::disk('public')->assertExists($product->image_path);
    }

    public function test_admin_can_delete_product_and_photo(): void
    {
        Storage::fake('public');
        $this->actingAs(User::factory()->create(['role' => 'admin']));
        Storage::disk('public')->put('products/old.jpg', 'photo');
        $product = Product::create(['name' => 'Bayam', 'category' => 'ready', 'price' => 5000, 'stock' => 1, 'image_path' => 'products/old.jpg']);

        $this->delete(route('admin.products.destroy', $product))->assertRedirect();

        $this->assertDatabaseMissing('products', ['id' => $product->id]);
        Storage::disk('public')->assertMissing('products/old.jpg');
    }
}
