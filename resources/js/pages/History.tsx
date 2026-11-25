import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Clock, PackageCheck, ShoppingBag } from 'lucide-react';
import { SiteFooter } from '@/components/casayur/site-footer';
import { SiteHeader } from '@/components/casayur/site-header';

interface OrderItem {
    id: number;
    quantity: number;
    price: string | number;
    product?: {
        id: number;
        name: string;
    };
}

interface Order {
    id: number;
    type: string;
    status: string;
    total: string | number;
    created_at: string;
    method: string;
    payment_method: string;
    items: OrderItem[];
}

function formatRupiah(value: number | string) {
    return `Rp ${new Intl.NumberFormat('id-ID').format(Number(value))}`;
}

function statusBadge(status: string) {
    const map: Record<string, { label: string; className: string }> = {
        pending: { label: 'Menunggu', className: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-800' },
        confirmed: { label: 'Dikonfirmasi', className: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300 dark:border-blue-800' },
        processing: { label: 'Diproses', className: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800' },
        delivered: { label: 'Selesai', className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800' },
        cancelled: { label: 'Dibatalkan', className: 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300 border-red-300 dark:border-red-800' },
    };

    const current = map[status] || { label: status, className: 'bg-muted text-muted-ink border-line' };

    return (
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${current.className}`}>
            {current.label}
        </span>
    );
}

export default function History({ orders = [] }: { orders: Order[] }) {
    return (
        <>
            <Head title="Riwayat Pesanan - Casayur" />
            <SiteHeader poOpen={false} />
            <main className="min-h-screen bg-[--ink] text-[--paper]">
                <section className="mx-auto w-full max-w-[1000px] px-[clamp(20px,5vw,48px)] py-12 sm:py-20">
                    <div className="mb-8">
                        <Link
                            href="/products"
                            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-ink transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf"
                        >
                            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                            Lanjut Belanja
                        </Link>
                        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                            Riwayat Pesanan
                        </h1>
                        <p className="mt-2 text-muted-ink">
                            Daftar pesanan sayur dan kebutuhan dapur yang pernah Anda buat.
                        </p>
                    </div>

                    {orders.length === 0 ? (
                        <div className="rounded-2xl border border-line bg-surface p-12 text-center">
                            <ShoppingBag className="mx-auto h-12 w-12 text-muted-ink" aria-hidden="true" />
                            <h2 className="mt-4 font-display text-lg font-semibold">Belum ada pesanan</h2>
                            <p className="mt-1 text-sm text-muted-ink">
                                Anda belum pernah membuat pesanan di Casayur.
                            </p>
                            <Link
                                href="/products"
                                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-leaf px-5 text-sm font-semibold text-white transition-colors hover:bg-leaf-deep"
                            >
                                Mulai Belanja Sekarang
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <article
                                    key={order.id}
                                    className="rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-leaf/40 sm:p-6"
                                >
                                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
                                        <div>
                                            <div className="flex items-center gap-2 text-sm text-muted-ink">
                                                <Clock className="h-4 w-4" />
                                                <span>
                                                    {new Date(order.created_at).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </span>
                                            </div>
                                            <p className="mt-1 text-xs text-muted-ink">
                                                ID Pesanan: #{order.id} • {order.method === 'delivery' ? 'Pengiriman' : 'Ambil Sendiri'} • {order.payment_method.toUpperCase()}
                                            </p>
                                        </div>
                                        <div>{statusBadge(order.status)}</div>
                                    </div>

                                    <div className="divide-y divide-line py-3">
                                        {order.items.map((item) => (
                                            <div key={item.id} className="flex items-center justify-between py-2 text-sm">
                                                <div>
                                                    <span className="font-medium text-ink">
                                                        {item.product?.name ?? 'Produk'}
                                                    </span>
                                                    <span className="ml-2 text-xs text-muted-ink">
                                                        x{item.quantity}
                                                    </span>
                                                </div>
                                                <span className="text-muted-ink">
                                                    {formatRupiah(Number(item.price) * item.quantity)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between border-t border-line pt-3">
                                        <span className="text-sm font-medium text-muted-ink">Total Pembayaran</span>
                                        <span className="font-display text-lg font-bold text-leaf">
                                            {formatRupiah(order.total)}
                                        </span>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </main>
            <SiteFooter />
        </>
    );
}

History.layout = (page: any) => page;
