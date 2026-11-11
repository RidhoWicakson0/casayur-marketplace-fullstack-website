import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function Checkout({ products = [] }) {
    const [cart, setCart] = useState([]);
    const { data, setData, post, processing, errors } = useForm({
        items: [],
        lat: '',
        lng: '',
    });

    const handleAddToCart = (product) => {
        const existing = cart.find((item) => item.product_id === product.id);
        let updatedCart;
        if (existing) {
            updatedCart = cart.map((item) =>
                item.product_id === product.id
                    ? { ...item, qty: item.qty + 1 }
                    : item
            );
        } else {
            updatedCart = [...cart, { product_id: product.id, name: product.name, price: product.price, category: product.category, qty: 1 }];
        }
        setCart(updatedCart);
        setData('items', updatedCart.map(i => ({ product_id: i.product_id, qty: i.qty })));
    };

    const handleCheckout = (e) => {
        e.preventDefault();
        post('/checkout');
    };

    const poItems = cart.filter((i) => i.category === 'po');
    const readyItems = cart.filter((i) => i.category === 'ready');

    return (
        <div className="min-h-screen bg-emerald-50/30 font-sans text-slate-800">
            {/* Header */}
            <header className="bg-white border-b border-emerald-100 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-emerald-600 tracking-tight">Casayur</span>
                        <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-medium">Marketplace & PO</span>
                    </div>
                    <div className="text-sm font-medium text-slate-600">
                        Jam PO: <span className="text-emerald-600 font-bold">09.00 - 12.00</span>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-b from-emerald-100/50 to-transparent py-12 px-4">
                <div className="max-w-4xl mx-auto text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                        Belanja Sayur Segar & Kebutuhan Harian
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Pesan sayur segar harian secara Preorder atau belanja langsung produk Ready Stock. Pengiriman cepat max 20km!
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Product Catalog */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2">Katalog Produk</h2>
                    
                    {products.length === 0 ? (
                        <div className="bg-white p-8 rounded-xl border border-slate-100 text-center text-slate-500">
                            Belum ada produk yang tersedia saat ini.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {products.map((product) => (
                                <div key={product.id} className="bg-white p-5 rounded-xl border border-emerald-100/60 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`text-xs px-2.5 py-1 rounded-md font-semibold ${product.category === 'po' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                                                {product.category === 'po' ? 'Preorder (PO)' : 'Ready Stock'}
                                            </span>
                                            <span className="text-slate-500 text-sm">Stok: {product.stock}</span>
                                        </div>
                                        <h3 className="font-bold text-slate-800 text-lg">{product.name}</h3>
                                        <p className="text-emerald-600 font-extrabold text-xl mt-1">
                                            Rp {Number(product.price).toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-medium py-2 rounded-lg transition-colors"
                                    >
                                        + Tambah Keranjang
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Cart & Checkout */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm sticky top-20">
                        <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-3 mb-4">Keranjang Belanja</h2>

                        {cart.length === 0 ? (
                            <p className="text-slate-500 text-sm text-center py-6">Keranjang Anda masih kosong.</p>
                        ) : (
                            <div className="space-y-4 mb-6">
                                {/* Split View PO vs Ready */}
                                {readyItems.length > 0 && (
                                    <div className="border border-emerald-200 bg-emerald-50/50 p-3 rounded-lg">
                                        <h4 className="font-bold text-xs text-emerald-800 uppercase tracking-wider mb-2">Siap Kirim (Ready)</h4>
                                        {readyItems.map((item) => (
                                            <div key={item.product_id} className="flex justify-between text-sm py-1 border-b border-emerald-100 last:border-0">
                                                <span>{item.name} x{item.qty}</span>
                                                <span className="font-semibold">Rp {(item.price * item.qty).toLocaleString('id-ID')}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {poItems.length > 0 && (
                                    <div className="border border-amber-200 bg-amber-50/50 p-3 rounded-lg">
                                        <h4 className="font-bold text-xs text-amber-800 uppercase tracking-wider mb-2">Preorder (PO)</h4>
                                        {poItems.map((item) => (
                                            <div key={item.product_id} className="flex justify-between text-sm py-1 border-b border-amber-100 last:border-0">
                                                <span>{item.name} x{item.qty}</span>
                                                <span className="font-semibold">Rp {(item.price * item.qty).toLocaleString('id-ID')}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Form Checkout */}
                        <form onSubmit={handleCheckout} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Latitude Alamat</label>
                                <input
                                    type="text"
                                    placeholder="-6.2000"
                                    value={data.lat}
                                    onChange={(e) => setData('lat', e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    required
                                />
                                {errors.lat && <span className="text-xs text-red-500">{errors.lat}</span>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Longitude Alamat</label>
                                <input
                                    type="text"
                                    placeholder="106.8166"
                                    value={data.lng}
                                    onChange={(e) => setData('lng', e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    required
                                />
                                {errors.lng && <span className="text-xs text-red-500">{errors.lng}</span>}
                            </div>

                            {errors.error && (
                                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                                    {errors.error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={processing || cart.length === 0}
                                className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-bold py-3 rounded-lg transition-colors text-sm"
                            >
                                {processing ? 'Memproses...' : 'Buat Pesanan'}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
