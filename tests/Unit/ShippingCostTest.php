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

    public function test_ready_delivery_is_free_up_to_three_km(): void
    {
        $service = new OrderService();

        self::assertSame(0, $service->shippingCost('ready', 2.0, 'delivery'));
        self::assertSame(0, $service->shippingCost('ready', 3.0, 'delivery'));
        self::assertSame(4000, $service->shippingCost('ready', 5.0, 'delivery'));
        self::assertSame(34000, $service->shippingCost('ready', 20.0, 'delivery'));
    }

    public function test_po_delivery_is_free_up_to_five_km(): void
    {
        $service = new OrderService();

        self::assertSame(0, $service->shippingCost('po', 4.0, 'delivery'));
        self::assertSame(0, $service->shippingCost('po', 5.0, 'delivery'));
        self::assertSame(4000, $service->shippingCost('po', 7.0, 'delivery'));
        self::assertSame(30000, $service->shippingCost('po', 20.0, 'delivery'));
    }

    public function test_cod_is_available_up_to_five_km(): void
    {
        $service = new OrderService();

        self::assertTrue($service->codAvailable(4.99));
        self::assertTrue($service->codAvailable(5.0));
        self::assertFalse($service->codAvailable(5.01));
    }
}
