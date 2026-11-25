<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\SalesReportService;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function index(Request $request, SalesReportService $reports)
    {
        [$from, $to] = $this->period($request);

        return inertia('Admin/Reports/Index', [
            'from' => $from->toDateString(),
            'to' => $to->toDateString(),
            'summary' => $reports->summary($from, $to),
            'orders' => $reports->rows($from, $to),
        ]);
    }

    public function csv(Request $request, SalesReportService $reports)
    {
        [$from, $to] = $this->period($request);
        $rows = $reports->rows($from, $to);
        $filename = 'laporan-penjualan-'.$from->toDateString().'-'.$to->toDateString().'.csv';

        return response()->streamDownload(function () use ($rows) {
            $output = fopen('php://output', 'w');
            fputcsv($output, ['Order ID', 'Tanggal', 'Customer', 'WhatsApp', 'Method', 'Payment', 'Product', 'Quantity', 'Unit Price', 'Subtotal', 'Shipping', 'Total', 'Status']);
            foreach ($rows as $order) {
                foreach ($order->items as $item) {
                    fputcsv($output, [$order->id, $order->created_at->toDateTimeString(), $order->customer_name, $order->customer_phone, $order->method, $order->payment_method, $item->product->name, $item->quantity, $item->price, $order->subtotal, $order->shipping_cost, $order->total, $order->status]);
                }
            }
            fclose($output);
        }, $filename, ['Content-Type' => 'text/csv; charset=UTF-8']);
    }

    private function period(Request $request): array
    {
        $data = $request->validate(['from' => 'nullable|date', 'to' => 'nullable|date|after_or_equal:from']);
        return [Carbon::parse($data['from'] ?? now()->startOfMonth()), Carbon::parse($data['to'] ?? now())];
    }
}
