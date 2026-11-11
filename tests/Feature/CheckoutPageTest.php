<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CheckoutPageTest extends TestCase
{
    public function test_checkout_page_can_be_rendered(): void
    {
        // $this->withoutMiddleware(); 
        $response = $this->get('/checkout');

        $response->assertStatus(200);
    }
}
