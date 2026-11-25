<?php

namespace Tests\Unit;

use App\Services\OrderService;
use Tests\TestCase;

class ShippingCostTest extends TestCase
{
    public function test_pickup_is_always_free(): void
    {
        $service = new OrderService();

        self::assertSame(0, $service->shippingCost('ready', 12.4, 'pickup'));
        self::assertSame(0, $service->shippingCost('po', 12.4, 'pickup'));
    }

    public function test_delivery_is_free_up_to_five_km_then_uses_total_rounded_distance(): void
    {
        $service = new OrderService();

        self::assertSame(0, $service->shippingCost('ready', 5.0, 'delivery'));
        self::assertSame(12000, $service->shippingCost('ready', 5.2, 'delivery'));
        self::assertSame(16000, $service->shippingCost('po', 8.0, 'delivery'));
        self::assertSame(40000, $service->shippingCost('ready', 20.0, 'delivery'));
    }

    public function test_cod_is_available_up_to_five_km(): void
    {
        $service = new OrderService();

        self::assertTrue($service->codAvailable(4.99));
        self::assertTrue($service->codAvailable(5.0));
        self::assertFalse($service->codAvailable(5.01));
    }
}
