<?php

namespace Tests\Feature\Auth;

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;
use Mockery;
use Tests\TestCase;

class GoogleCartActionTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_action_stores_session_and_redirects()
    {
        $product = Product::create([
            'name' => 'Wortel',
            'category' => 'ready',
            'price' => 10000,
            'stock' => 5,
        ]);

        $response = $this->get("/auth/google/action/{$product->id}/cart");
        $response->assertRedirect(route('auth.google.redirect'));
        $this->assertEquals(['product_id' => $product->id, 'action' => 'cart'], session('google_pending_action'));
    }

    public function test_google_callback_resumes_pending_action_and_clears_session()
    {
        $product = Product::create([
            'name' => 'Kangkung',
            'category' => 'ready',
            'price' => 5000,
            'stock' => 10,
        ]);

        session(['google_pending_action' => ['product_id' => $product->id, 'action' => 'buy']]);

        $socialiteUser = Mockery::mock(SocialiteUser::class);
        $socialiteUser->shouldReceive('getId')->andReturn('google-action-user');
        $socialiteUser->shouldReceive('getEmail')->andReturn('buyer@example.com');
        $socialiteUser->shouldReceive('getName')->andReturn('Buyer Person');
        $socialiteUser->shouldReceive('getAvatar')->andReturn(null);

        $driver = Mockery::mock('stdClass');
        $driver->shouldReceive('user')->andReturn($socialiteUser);
        Socialite::shouldReceive('driver')->with('google')->andReturn($driver);

        $response = $this->get('/auth/google/callback');

        $response->assertRedirect("/products/{$product->id}?resume=buy");
        $this->assertNull(session('google_pending_action'));
        $this->assertAuthenticated();
        $this->assertEquals('customer', User::where('email', 'buyer@example.com')->first()->role);
    }
}
