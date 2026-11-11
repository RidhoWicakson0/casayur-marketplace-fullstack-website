<?php

namespace Tests\Unit;

use App\Services\OrderService;
use Carbon\Carbon;
use Tests\TestCase;

class POAvailabilityTest extends TestCase
{
    public function test_po_is_available_only_between_nine_and_noon(): void
    {
        $service = new OrderService();

        self::assertTrue($service->isPOAvailable(Carbon::parse('2026-11-11 09:00')));
        self::assertTrue($service->isPOAvailable(Carbon::parse('2026-11-11 11:59')));
        self::assertFalse($service->isPOAvailable(Carbon::parse('2026-11-11 08:59')));
        self::assertFalse($service->isPOAvailable(Carbon::parse('2026-11-11 12:00')));
    }
}
