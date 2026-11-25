<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use App\Models\Product;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    public function action(Product $product, string $action)
    {
        session(['google_pending_action' => ['product_id' => $product->id, 'action' => $action]]);
        return redirect()->route('auth.google.redirect');
    }

    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {
        $google = Socialite::driver('google')->user();
        $user = User::firstOrCreate(
            ['email' => $google->getEmail()],
            ['name' => $google->getName() ?: 'Google User', 'password' => str()->random(40), 'role' => 'customer', 'email_verified_at' => now()]
        );
        $user->forceFill([
            'google_id' => $google->getId(),
            'email_verified_at' => $user->email_verified_at ?: now(),
            'avatar' => $user->avatar ?: $google->getAvatar(),
        ])->save();
        Auth::login($user, true);

        $pending = session()->pull('google_pending_action');
        if ($pending) {
            $product = Product::find($pending['product_id']);
            if ($product) {
                return redirect("/products/{$product->id}?resume={$pending['action']}");
            }
        }

        return redirect()->intended(route('home'));
    }
}
