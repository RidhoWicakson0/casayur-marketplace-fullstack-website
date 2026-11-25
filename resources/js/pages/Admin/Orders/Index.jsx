import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Index({ orders = [] }) {
    return (
        <div className="min-h-screen max-w-6xl mx-auto bg-[--ink] p-8 text-[--paper]">
            <h1 className="text-2xl font-bold mb-6">Dashboard Pesanan</h1>
            <div className="overflow-hidden rounded border border-[--line] bg-[--surface]">
                <table className="w-full text-sm">
                    <thead className="bg-[--surface]">
                        <tr>
                            <th className="p-3 text-left">ID</th>
                            <th className="p-3 text-left">Tipe</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(orders.data ?? orders).length === 0 ? (
                            <tr><td colSpan="4" className="p-6 text-center text-slate-500">Belum ada pesanan.</td></tr>
                        ) : (orders.data ?? orders).map((order) => (
                            <OrderRow key={order.id} order={order} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function OrderRow({ order }) {
    const form = useForm({ status: order.status });

    const updateStatus = (event) => {
        form.setData('status', event.target.value);
        form.patch(`/admin/orders/${order.id}/status`);
    };

    return (
        <tr className="border-t">
            <td className="p-3">#{order.id}</td>
            <td className="p-3 uppercase">{order.type}</td>
            <td className="p-3">{order.status}</td>
            <td className="p-3">
                <select value={form.data.status} onChange={updateStatus} disabled={form.processing} className="rounded border border-[--line] bg-[--surface] p-2 text-[--ink] color-scheme-light-dark">
                    <option className="bg-[--surface] text-[--ink]" value="pending">Pending</option>
                    <option className="bg-[--surface] text-[--ink]" value="processing">Diproses</option>
                    <option className="bg-[--surface] text-[--ink]" value="completed">Selesai</option>
                    <option className="bg-[--surface] text-[--ink]" value="cancelled">Dibatalkan</option>
                </select>
            </td>
        </tr>
    );
}
