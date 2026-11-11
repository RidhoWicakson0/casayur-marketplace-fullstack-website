import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Index({ orders = [] }) {
    return (
        <div className="max-w-6xl mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">Dashboard Pesanan</h1>
            <div className="bg-white rounded border overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="p-3 text-left">ID</th>
                            <th className="p-3 text-left">Tipe</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr><td colSpan="4" className="p-6 text-center text-slate-500">Belum ada pesanan.</td></tr>
                        ) : orders.map((order) => (
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
        form.patch(route('admin.orders.status', order.id));
    };

    return (
        <tr className="border-t">
            <td className="p-3">#{order.id}</td>
            <td className="p-3 uppercase">{order.type}</td>
            <td className="p-3">{order.status}</td>
            <td className="p-3">
                <select value={form.data.status} onChange={updateStatus} disabled={form.processing} className="border rounded p-1">
                    <option value="pending">Pending</option>
                    <option value="processing">Diproses</option>
                    <option value="completed">Selesai</option>
                    <option value="cancelled">Dibatalkan</option>
                </select>
            </td>
        </tr>
    );
}
