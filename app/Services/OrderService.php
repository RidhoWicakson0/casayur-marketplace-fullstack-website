<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;

class OrderService
{
    /**
     * Hitung jarak Haversine (km) antara dua koordinat.
     */
    public function calculateDistance($lat1, $lng1, $lat2, $lng2): float
    {
        $earthRadius = 6371; // km

        $dLat = deg2rad($lat2 - $lat1);
        $dLng = deg2rad($lng2 - $lng1);

        $a = sin($dLat / 2) * sin($dLat / 2) +
             cos(deg2rad($lat1)) * cos(deg2rad($lat2)) *
             sin($dLng / 2) * sin($dLng / 2);
        
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

        return $earthRadius * $c;
    }

    /**
     * Cek apakah waktu saat ini masuk dalam periode PO (09.00 - 12.00).
     */
    public function isPOAvailable(): bool
    {
        $now = now(); // Menggunakan zona waktu aplikasi
        $start = now()->setTime(9, 0, 0);
        $end = now()->setTime(12, 0, 0);

        return $now->between($start, $end);
    }
}
