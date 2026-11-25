<?php

namespace App\Services;

use Carbon\CarbonInterface;

class OrderService
{
    public function isPOAvailable(CarbonInterface $time): bool
    {
        return $time->hour >= 9 && $time->hour < 12;
    }

    public function shippingCost(string $category, float $distanceKm, string $method): int
    {
        if ($method === 'pickup') {
            return 0;
        }

        if ($distanceKm <= 5.0) {
            return 0;
        }

        return (int) (ceil($distanceKm) * 2000);
    }

    public function codAvailable(float $distanceKm): bool
    {
        return $distanceKm <= 5.0;
    }
}
