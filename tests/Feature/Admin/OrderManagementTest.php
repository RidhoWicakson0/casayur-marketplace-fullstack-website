<?php

namespace Tests\Feature\Admin;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_view_order_dashboard(): void
    {
        $this->actingAs(User::factory()->create());

        $response = $this->get(route('admin.orders.index'));

        $response->assertOk();
    }

    public function test_admin_can_update_order_status(): void
    {
        $this->actingAs(User::factory()->create());

        $response = $this->patch(route('admin.orders.status', 1), [
            'status' => 'processing',
        ]);

        $response->assertRedirect();
    }
}
