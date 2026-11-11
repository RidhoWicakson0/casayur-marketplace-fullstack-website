<?php

namespace App\Services;

use Carbon\Carbon;

class OrderService
{
    public function isPOAvailable(Carbon $time): bool
    {
        return $time->hour >= 9 && $time->hour < 12;
    }
}
