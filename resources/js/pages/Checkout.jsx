import React, { useEffect, useMemo, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { useCart } from '@/contexts/cart-context';
import { SiteHeader } from '@/components/casayur/site-header';
import { SiteFooter } from '@/components/casayur/site-footer';
import { MapboxPicker } from '@/components/casayur/mapbox-picker';
import { ArrowLeft, Check, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';

const money = (value) => `Rp ${Number(value || 0).toLocaleString('id-ID')}`;

export default function Checkout({ products = [], poOpen = false }) {
    const { items, addItem, setQty, removeItem, clear } = useCart();
    const [suggestions, setSuggestions] = useState([]);
    const [shipping, setShipping] = useState(null);
    const [calculating, setCalculating] = useState(false);
    const [calculationError, setCalculationError] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        items: [],
        lat: -6.9141,
        lng: 109.3789,
        method: 'delivery',
        payment_method: 'manual',
        address: '',
        customer_name: '',
        customer_phone: '',
    });

    useEffect(() => {
        setData('items', items.map(({ productId, qty }) => ({ product_id: productId, qty })));
    }, [items]);

    const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.qty, 0), [items]);
    const recommendations = products.filter((p) => p.stock > 0 && (p.category !== 'po' || poOpen)).slice(0, 4);

    const calculateShipping = async (currentLat, currentLng, currentMethod) => {
        if (!items.length) {
            setShipping(null);
            return;
        }
        if (currentMethod === 'delivery' && (!currentLat || !currentLng)) {
            return;
        }

        setCalculating(true);
        setCalculationError('');
        try {
            const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            const res = await fetch('/checkout/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token || '',
                },
                body: JSON.stringify({
                    items: items.map(({ productId, qty }) => ({ product_id: productId, qty })),
                    lat: currentLat,
                    lng: currentLng,
                    method: currentMethod,
                }),
            });
            const result = await res.json();
            if (!res.ok) {
                throw new Error(result.error || 'Gagal menghitung ongkir');
            }
            setShipping(result);
            if (data.payment_method === 'cod' && !result.cod_available) {
                setData('payment_method', 'manual');
            }
        } catch (err) {
            setShipping(null);
            setCalculationError(err.message || 'Gagal menghitung ongkir');
        } finally {
            setCalculating(false);
        }
    };

    useEffect(() => {
        calculateShipping(data.lat, data.lng, data.method);
    }, [data.lat, data.lng, data.method, items.length]);

    const handleSearch = async (val) => {
        setData('address', val);
        if (val.length < 4) {
            setSuggestions([]);
            return;
        }
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(val)}&countrycodes=id&limit=4`);
            const list = await res.json();
            setSuggestions(list || []);
        } catch {
            setSuggestions([]);
        }
    };

    const submit = (event) => {
        event.preventDefault();
        post('/checkout', {
            onSuccess: clear,
        });
    };

    const shippingCost = data.method === 'pickup' ? 0 : (shipping?.total_shipping ?? 0);
    const grandTotal = subtotal + shippingCost;

    return (
        <>
            <Head title="Checkout Pesanan - Casayur" />
            <SiteHeader poOpen={poOpen} />
            <main className="min-h-screen bg-[--ink] text-[--paper]">
                <section className="mx-auto w-full max-w-[1200px] px-[clamp(20px,5vw,48px)] py-10 sm:py-14">
                    <div className="mb-8">
                        <Link
                            href="/products"
                            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-ink transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf"
                        >
                            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                            Kembali ke Katalog Produk
                        </Link>
                        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                            Checkout Pesanan
                        </h1>
                        <p className="mt-2 text-sm text-muted-ink">
                            Periksa produk pilihan Anda, tentukan metode penerimaan dan pembayaran.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                        {/* Kolom Kiri: Produk di Keranjang & Rekomendasi */}
                        <div className="space-y-6 lg:col-span-7">
                            {/* Produk di Keranjang */}
                            <div className="rounded-2xl border border-line bg-surface p-6">
                                <div className="mb-4 flex items-center justify-between border-b border-line pb-4">
                                    <h2 className="font-display text-xl font-bold text-ink">
                                        Produk di Keranjang ({items.length})
                                    </h2>
                                    <Link
                                        href="/products"
                                        className="text-xs font-semibold text-leaf hover:underline"
                                    >
                                        + Tambah Produk Lain
                                    </Link>
                                </div>

                                {items.length === 0 ? (
                                    <div className="py-12 text-center">
                                        <ShoppingBag className="mx-auto h-12 w-12 text-muted-ink/40" />
                                        <p className="mt-3 text-sm text-muted-ink">Keranjang Anda masih kosong.</p>
                                        <Link
                                            href="/products"
                                            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-leaf px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-leaf-deep"
                                        >
                                            Mulai Belanja
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-line">
                                        {items.map((item) => (
                                            <div key={item.productId} className="flex flex-col gap-3 py-3.5 sm:flex-row sm:items-center sm:justify-between">
                                                <div className="min-w-0 flex-1">
                                                    <p className="font-semibold text-ink truncate">{item.name}</p>
                                                    <p className="text-xs text-muted-ink">
                                                        {money(item.price)} × {item.qty} = <span className="font-semibold text-leaf">{money(item.price * item.qty)}</span>
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-2 self-end sm:self-center">
                                                    <div className="inline-flex items-center rounded-lg border border-line bg-background">
                                                        <button
                                                            type="button"
                                                            onClick={() => setQty(item.productId, item.qty - 1)}
                                                            aria-label={`Kurangi ${item.name}`}
                                                            className="p-1.5 text-muted-ink hover:text-ink focus-visible:outline-none"
                                                        >
                                                            <Minus className="h-3.5 w-3.5" />
                                                        </button>
                                                        <span className="w-8 text-center text-xs font-semibold text-ink">
                                                            {item.qty}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => setQty(item.productId, item.qty + 1)}
                                                            aria-label={`Tambah ${item.name}`}
                                                            className="p-1.5 text-muted-ink hover:text-ink focus-visible:outline-none"
                                                        >
                                                            <Plus className="h-3.5 w-3.5" />
                                                        </button>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(item.productId)}
                                                        aria-label={`Hapus ${item.name}`}
                                                        className="rounded-lg p-1.5 text-muted-ink transition-colors hover:bg-danger/10 hover:text-danger focus-visible:outline-none"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Rekomendasi Produk */}
                            <div className="rounded-2xl border border-line bg-surface p-6">
                                <div className="mb-4 flex items-center justify-between border-b border-line pb-4">
                                    <div>
                                        <h2 className="font-display text-xl font-bold text-ink">Rekomendasi Produk</h2>
                                        <p className="text-xs text-muted-ink">Mungkin Anda butuh untuk masakan hari ini</p>
                                    </div>
                                    <Link href="/products" className="text-xs font-semibold text-leaf hover:underline">
                                        Lihat Semua
                                    </Link>
                                </div>

                                {recommendations.length ? (
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                        {recommendations.map((p) => (
                                            <div key={p.id} className="flex items-center justify-between gap-3 rounded-xl border border-line bg-background p-3 transition-colors hover:border-leaf/50">
                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-semibold text-ink">{p.name}</p>
                                                    <p className="text-xs text-leaf font-semibold">{money(p.price)}</p>
                                                    <span className="text-[10px] text-muted-ink">Stok: {p.stock}</span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => addItem(p)}
                                                    className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-leaf/10 px-3 py-1.5 text-xs font-semibold text-leaf transition-colors hover:bg-leaf hover:text-white focus-visible:outline-none"
                                                >
                                                    <Plus className="h-3.5 w-3.5" />
                                                    Tambah
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-xs text-muted-ink">Semua produk rekomendasi sudah ada di keranjang.</p>
                                )}
                            </div>
                        </div>

                        {/* Kolom Kanan: Form Pemesanan, Metode Pengiriman, Pembayaran, Maps & Total */}
                        <div className="lg:col-span-5">
                            <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
                                <h2 className="border-b border-line pb-3 font-display text-xl font-bold text-ink">
                                    Informasi & Pembayaran
                                </h2>

                                <form onSubmit={submit} className="mt-5 space-y-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-ink uppercase tracking-wider">
                                            Nama Penerima
                                        </label>
                                        <input
                                            type="text"
                                            value={data.customer_name}
                                            onChange={(e) => setData('customer_name', e.target.value)}
                                            placeholder="Contoh: Siti Aminah"
                                            className="mt-1.5 w-full rounded-lg border border-line bg-background px-3.5 py-2 text-sm text-ink placeholder:text-muted-ink focus:border-leaf focus:outline-none focus:ring-1 focus:ring-leaf"
                                            required
                                        />
                                        {errors.customer_name && <p className="mt-1 text-xs text-danger">{errors.customer_name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-ink uppercase tracking-wider">
                                            Nomor WhatsApp
                                        </label>
                                        <input
                                            type="tel"
                                            value={data.customer_phone}
                                            onChange={(e) => setData('customer_phone', e.target.value)}
                                            placeholder="08xxxxxxxxxx"
                                            className="mt-1.5 w-full rounded-lg border border-line bg-background px-3.5 py-2 text-sm text-ink placeholder:text-muted-ink focus:border-leaf focus:outline-none focus:ring-1 focus:ring-leaf"
                                            required
                                        />
                                        {errors.customer_phone && <p className="mt-1 text-xs text-danger">{errors.customer_phone}</p>}
                                    </div>

                                    {/* Metode Pengiriman: Delivery vs Pickup */}
                                    <div>
                                        <label className="block text-xs font-semibold text-ink uppercase tracking-wider">
                                            Metode Pengiriman
                                        </label>
                                        <div className="mt-1.5 grid grid-cols-2 gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setData('method', 'delivery')}
                                                className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-all ${
                                                    data.method === 'delivery'
                                                        ? 'border-leaf bg-leaf/10 text-leaf'
                                                        : 'border-line bg-background text-muted-ink hover:text-ink'
                                                }`}
                                            >
                                                Delivery (Antar)
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setData('method', 'pickup')}
                                                className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-all ${
                                                    data.method === 'pickup'
                                                        ? 'border-leaf bg-leaf/10 text-leaf'
                                                        : 'border-line bg-background text-muted-ink hover:text-ink'
                                                }`}
                                            >
                                                Ambil Sendiri (Pickup)
                                            </button>
                                        </div>
                                    </div>

                                    {/* Peta dan Alamat hanya muncul bila Delivery */}
                                    {data.method === 'delivery' && (
                                        <div className="space-y-3 rounded-xl border border-line bg-background/50 p-3.5">
                                            <div className="relative">
                                                <label className="block text-xs font-semibold text-ink uppercase tracking-wider">
                                                    Alamat Pengiriman
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.address}
                                                    onChange={(e) => handleSearch(e.target.value)}
                                                    placeholder="Ketik jalan, kelurahan, atau patokan..."
                                                    className="mt-1.5 w-full rounded-lg border border-line bg-background px-3.5 py-2 text-sm text-ink placeholder:text-muted-ink focus:border-leaf focus:outline-none focus:ring-1 focus:ring-leaf"
                                                    required={data.method === 'delivery'}
                                                />
                                                {suggestions.length > 0 && (
                                                    <div className="absolute z-50 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-line bg-surface shadow-xl">
                                                        {suggestions.map((s, i) => (
                                                            <button
                                                                key={i}
                                                                type="button"
                                                                onClick={() => {
                                                                    setData((d) => ({
                                                                        ...d,
                                                                        address: s.display_name,
                                                                        lat: parseFloat(s.lat),
                                                                        lng: parseFloat(s.lon),
                                                                    }));
                                                                    setSuggestions([]);
                                                                }}
                                                                className="block w-full border-b border-line px-3 py-2 text-left text-xs text-ink transition-colors hover:bg-leaf/10 last:border-b-0"
                                                            >
                                                                {s.display_name}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                                {errors.address && <p className="mt-1 text-xs text-danger">{errors.address}</p>}
                                            </div>

                                            <div>
                                                <div className="mb-1.5 flex items-center justify-between text-xs text-muted-ink">
                                                    <span>Titik Antar (Geser Pin):</span>
                                                    {calculating ? (
                                                        <span className="text-leaf">Menghitung ongkir...</span>
                                                    ) : shipping ? (
                                                        <span>Radius: {shipping.distance} km</span>
                                                    ) : null}
                                                </div>
                                                <MapboxPicker
                                                    lat={data.lat}
                                                    lng={data.lng}
                                                    onChange={(lat, lng) => setData((d) => ({ ...d, lat, lng }))}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Metode Pembayaran: Tunai (COD) vs Non-Tunai (Transfer / Manual) */}
                                    <div>
                                        <label className="block text-xs font-semibold text-ink uppercase tracking-wider">
                                            Metode Pembayaran
                                        </label>
                                        <div className="mt-1.5 grid grid-cols-2 gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setData('payment_method', 'manual')}
                                                className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-all ${
                                                    data.payment_method === 'manual'
                                                        ? 'border-leaf bg-leaf/10 text-leaf'
                                                        : 'border-line bg-background text-muted-ink hover:text-ink'
                                                }`}
                                            >
                                                Non-Tunai (Transfer Bank / QRIS)
                                            </button>
                                            <button
                                                type="button"
                                                disabled={data.method === 'delivery' && shipping && !shipping.cod_available}
                                                onClick={() => setData('payment_method', 'cod')}
                                                className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-all ${
                                                    data.payment_method === 'cod'
                                                        ? 'border-leaf bg-leaf/10 text-leaf'
                                                        : 'border-line bg-background text-muted-ink hover:text-ink disabled:opacity-40 disabled:cursor-not-allowed'
                                                }`}
                                            >
                                                Tunai / COD (Bayar di Tempat)
                                            </button>
                                        </div>
                                        {data.method === 'delivery' && shipping && !shipping.cod_available && (
                                            <p className="mt-1 text-[11px] text-muted-ink">
                                                *COD hanya tersedia dalam radius 5 km dari toko.
                                            </p>
                                        )}
                                        {errors.payment_method && <p className="mt-1 text-xs text-danger">{errors.payment_method}</p>}
                                    </div>

                                    {calculationError && (
                                        <div className="rounded-lg border border-danger/40 bg-danger/10 p-2.5 text-xs text-danger">
                                            {calculationError}
                                        </div>
                                    )}

                                    {/* Rincian Biaya */}
                                    <div className="space-y-2 border-t border-line pt-4 text-xs">
                                        <div className="flex justify-between text-muted-ink">
                                            <span>Subtotal Produk</span>
                                            <span className="font-semibold text-ink">{money(subtotal)}</span>
                                        </div>

                                        <div className="flex justify-between text-muted-ink">
                                            <span>
                                                Ongkir ({data.method === 'pickup' ? 'Ambil Sendiri' : `${shipping?.distance ?? 0} km`})
                                            </span>
                                            <span className="font-semibold text-ink">
                                                {data.method === 'pickup' || shippingCost === 0 ? 'Gratis' : money(shippingCost)}
                                            </span>
                                        </div>

                                        <div className="flex justify-between border-t border-line pt-2 text-sm font-bold">
                                            <span className="text-ink">Total Pembayaran</span>
                                            <span className="text-base text-leaf">{money(grandTotal)}</span>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing || items.length === 0 || (data.method === 'delivery' && calculationError)}
                                        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-leaf py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-leaf-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <Check className="h-4 w-4" />
                                        {processing ? 'Memproses Pesanan...' : 'Konfirmasi & Buat Pesanan'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </>
    );
}
