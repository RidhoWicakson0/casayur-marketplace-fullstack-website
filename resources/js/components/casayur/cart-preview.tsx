import { Link } from '@inertiajs/react';
import { ShoppingBasket } from 'lucide-react';
import type { CartItem } from '@/types/casayur';

function formatRupiah(value: number) {
    return `Rp ${new Intl.NumberFormat('id-ID').format(value)}`;
}

export function CartPreview({ items, count }: { items: CartItem[]; count: number }) {
    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

    return (
        <div className="absolute right-0 top-full z-50 mt-3 w-[min(23rem,calc(100vw-2rem))] rounded-xl border border-line bg-surface p-4 text-ink shadow-xl">
            <div className="flex items-center justify-between border-b border-line pb-3">
                <div>
                    <h2 className="font-semibold">Keranjang</h2>
                    <p className="text-xs text-muted-ink">{count} item</p>
                </div>
                <ShoppingBasket className="h-5 w-5 text-leaf" aria-hidden="true" />
            </div>

            {items.length > 0 ? (
                <>
                    <ul className="max-h-64 divide-y divide-line overflow-y-auto" aria-label="Produk dalam keranjang">
                        {items.map((item) => (
                            <li key={item.productId} className="flex items-start justify-between gap-3 py-3 text-sm">
                                <div className="min-w-0">
                                    <p className="truncate font-medium">{item.name}</p>
                                    <p className="mt-1 text-xs text-muted-ink">{item.qty} × {formatRupiah(item.price)}</p>
                                </div>
                                <span className="shrink-0 text-xs font-semibold tabular-nums">{formatRupiah(item.price * item.qty)}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center justify-between border-t border-line pt-3 text-sm font-semibold">
                        <span>Total</span>
                        <span className="tabular-nums">{formatRupiah(total)}</span>
                    </div>
                    <Link href="/checkout" className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-leaf px-4 text-sm font-semibold text-white transition-colors hover:bg-leaf-deep focus:outline-none focus:ring-2 focus:ring-leaf focus:ring-offset-2">
                        Lihat keranjang
                    </Link>
                </>
            ) : (
                <div className="py-8 text-center">
                    <p className="text-sm font-medium">Keranjang masih kosong</p>
                    <p className="mt-1 text-xs text-muted-ink">Tambahkan produk untuk melihatnya di sini.</p>
                </div>
            )}
        </div>
    );
}
