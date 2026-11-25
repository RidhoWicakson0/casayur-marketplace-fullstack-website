<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;
use Mockery;
use Tests\TestCase;

class CustomerProfileTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_cannot_access_profile(): void
    {
        $response = $this->get('/profile');
        $response->assertRedirect('/login');
    }

    public function test_authenticated_customer_can_view_profile(): void
    {
        $user = User::factory()->create([
            'name' => 'Siti Aminah',
            'email' => 'siti@example.com',
            'role' => 'customer',
        ]);

        $response = $this->actingAs($user)->get('/profile');

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Profile')
            ->where('user.name', 'Siti Aminah')
            ->where('user.email', 'siti@example.com')
        );
    }

    public function test_customer_can_update_name(): void
    {
        $user = User::factory()->create([
            'name' => 'Old Name',
            'role' => 'customer',
        ]);

        $response = $this->actingAs($user)->post('/profile', [
            'name' => 'New Name',
        ]);

        $response->assertRedirect();
        $this->assertEquals('New Name', $user->fresh()->name);
    }

    public function test_customer_can_upload_avatar(): void
    {
        Storage::fake('public');

        $user = User::factory()->create([
            'name' => 'Avatar Tester',
            'role' => 'customer',
        ]);

        $file = UploadedFile::fake()->image('profile.png', 200, 200);

        $response = $this->actingAs($user)->post('/profile', [
            'name' => 'Avatar Tester',
            'avatar' => $file,
        ]);

        $response->assertRedirect();
        $user->refresh();

        $this->assertNotNull($user->avatar);
        Storage::disk('public')->assertExists($user->avatar);
        $this->assertStringContainsString('storage/avatars/', $user->avatar_url);
    }

    public function test_google_callback_stores_google_avatar_if_available(): void
    {
        $socialiteUser = Mockery::mock(SocialiteUser::class);
        $socialiteUser->shouldReceive('getId')->andReturn('google-123456');
        $socialiteUser->shouldReceive('getEmail')->andReturn('googlephoto@example.com');
        $socialiteUser->shouldReceive('getName')->andReturn('Google Photo User');
        $socialiteUser->shouldReceive('getAvatar')->andReturn('https://lh3.googleusercontent.com/a/photo123');

        $driver = Mockery::mock('stdClass');
        $driver->shouldReceive('user')->andReturn($socialiteUser);
        Socialite::shouldReceive('driver')->with('google')->andReturn($driver);

        $response = $this->get('/auth/google/callback');

        $response->assertRedirect(route('home'));
        $user = User::where('email', 'googlephoto@example.com')->first();
        $this->assertNotNull($user);
        $this->assertEquals('https://lh3.googleusercontent.com/a/photo123', $user->avatar);
        $this->assertEquals('https://lh3.googleusercontent.com/a/photo123', $user->avatar_url);
    }
}
