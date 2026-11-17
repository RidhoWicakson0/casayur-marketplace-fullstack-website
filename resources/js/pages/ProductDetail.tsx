import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Check, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { SiteFooter } from '@/components/casayur/site-footer';
import { SiteHeader } from '@/components/casayur/site-header';
import { kindFromName, ProduceMark } from '@/components/casayur/produce-mark';
import { useCart } from '@/contexts/cart-context';
import type { Product } from '@/types/casayur';

function formatRupiah(value: number) {
    return `Rp ${new Intl.NumberFormat('id-ID').format(value)}`;
}

export default function ProductDetail({ product, poOpen = false }: { product: Product; poOpen?: boolean }) {
    const { addItem } = useCart();
    const [added, setAdded] = useState(false);
    const unavailable = product.stock === 0 || (product.category === 'po' && !poOpen);

    const handleAdd = () => {
        if (unavailable) {
            return;
        }

        addItem(product);
        setAdded(true);
        toast.success(`${product.name} ditambahkan ke keranjang.`);
        window.setTimeout(() => setAdded(false), 1200);
    };

    return (
        <>
            <Head title={product.name} />
            <SiteHeader poOpen={poOpen} />
            <main className="min-h-screen bg-paper text-ink">
                <section className="mx-auto w-full max-w-[1200px] px-[clamp(20px,5vw,48px)] py-12 sm:py-20">
                    <Link href="/products" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-ink transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf">
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                        Kembali ke produk
                    </Link>

                    <div className="mt-8 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
                        <div className="flex aspect-square items-center justify-center rounded-2xl border border-line bg-surface text-leaf">
                            <ProduceMark kind={kindFromName(product.name)} className="h-40 w-40 sm:h-56 sm:w-56" />
                        </div>

                        <div className="lg:pt-6">
                            <p className={product.category === 'po' ? 'text-xs font-semibold uppercase tracking-[0.18em] text-turmeric' : 'text-xs font-semibold uppercase tracking-[0.18em] text-leaf'}>
                                {product.category === 'po' ? 'Preorder' : 'Ready stock'}
                            </p>
                            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">{product.name}</h1>
                            <p className="mt-5 text-3xl font-semibold tabular-nums text-ink">{formatRupiah(Number(product.price))}</p>

                            <div className="mt-6 flex items-center gap-2 text-sm text-muted-ink">
                                <span className={product.stock === 0 ? 'text-danger' : 'text-muted-ink'}>
                                    {product.stock === 0 ? 'Stok habis' : `${product.stock} tersedia`}
                                </span>
                                {product.category === 'po' && !poOpen && product.stock > 0 && <span className="text-turmeric">PO sedang tutup</span>}
                            </div>

                            <button
                                type="button"
                                onClick={handleAdd}
                                disabled={unavailable}
                                className="mt-8 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-leaf px-5 text-sm font-semibold text-white transition-colors hover:bg-leaf-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-paper disabled:text-muted-ink sm:w-auto"
                            >
                                {added ? <Check className="h-4 w-4" aria-hidden="true" /> : <ShoppingCart className="h-4 w-4" aria-hidden="true" />}
                                {added ? 'Ditambahkan' : 'Tambah ke keranjang'}
                            </button>
                        </div>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </>
    );
}
