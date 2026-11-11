import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Index({ products = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        category: 'ready',
        price: '',
        stock: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.products.store'));
    };

    return (
        <div className="p-8 max-w-4xl mx-auto font-sans">
            <h1 className="text-2xl font-bold mb-6">Manajemen Produk</h1>

            <form onSubmit={handleSubmit} className="mb-8 space-y-4 bg-white p-6 rounded border">
                <div>
                    <label className="block text-sm font-bold">Nama Produk</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                    {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
                </div>

                <div>
                    <label className="block text-sm font-bold">Kategori</label>
                    <select
                        value={data.category}
                        onChange={(e) => setData('category', e.target.value)}
                        className="w-full border p-2 rounded"
                    >
                        <option value="ready">Ready Stock</option>
                        <option value="po">Preorder (PO)</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold">Harga</label>
                    <input
                        type="number"
                        value={data.price}
                        onChange={(e) => setData('price', e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold">Stok</label>
                    <input
                        type="number"
                        value={data.stock}
                        onChange={(e) => setData('stock', e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-emerald-600 text-white px-4 py-2 rounded font-bold"
                >
                    Tambah Produk
                </button>
            </form>

            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-slate-100 border-b">
                        <th className="p-2 text-left">Nama</th>
                        <th className="p-2 text-left">Kategori</th>
                        <th className="p-2 text-left">Harga</th>
                        <th className="p-2 text-left">Stok</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p) => (
                        <tr key={p.id} className="border-b">
                            <td className="p-2">{p.name}</td>
                            <td className="p-2 uppercase">{p.category}</td>
                            <td className="p-2">Rp {Number(p.price).toLocaleString('id-ID')}</td>
                            <td className="p-2">{p.stock}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
