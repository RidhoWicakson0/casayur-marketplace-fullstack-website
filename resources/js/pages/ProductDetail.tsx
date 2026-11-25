import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft, Check, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
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
    const { auth } = usePage().props as { auth?: { user?: { role?: string } } };
    const { addItem } = useCart();
    const [added, setAdded] = useState(false);
    const unavailable = product.stock === 0 || (product.category === 'po' && !poOpen);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const resume = params.get('resume');
        if (!resume || unavailable) return;

        addItem(product);
        if (resume === 'buy') {
            router.visit('/checkout');
            return;
        }

        setAdded(true);
        toast.success(`${product.name} ditambahkan ke keranjang.`);
        const timer = window.setTimeout(() => setAdded(false), 1200);
        window.history.replaceState({}, '', window.location.pathname);
        return () => window.clearTimeout(timer);
    }, [product, unavailable]);

    const handleAction = (action: 'cart' | 'buy') => {
        if (unavailable) return;

        if (!auth?.user || auth.user.role !== 'customer') {
            window.location.href = `/auth/google/action/${product.id}/${action}`;
            return;
        }

        addItem(product);
        if (action === 'buy') {
            router.visit('/checkout');
            return;
        }

        setAdded(true);
        toast.success(`${product.name} ditambahkan ke keranjang.`);
        window.setTimeout(() => setAdded(false), 1200);
    };

    return (
        <>
            <Head title={product.name} />
            <SiteHeader poOpen={poOpen} />
            <main className="min-h-screen bg-[--ink] text-[--paper]">
                <section className="mx-auto w-full max-w-[1200px] px-[clamp(20px,5vw,48px)] py-12 sm:py-20">
                    <Link href="/products" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-ink transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf">
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                        Kembali ke produk
                    </Link>

                    <div className="mt-8 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
                        <div className="flex aspect-square items-center justify-center rounded-2xl border border-line bg-surface text-leaf">
                            {product.image_url ? <img src={product.image_url} alt={product.name} className="h-full w-full rounded-2xl object-cover" /> : <ProduceMark kind={kindFromName(product.name)} className="h-40 w-40 sm:h-56 sm:w-56" />}
                        </div>

                        <div className="lg:pt-6">
                            <p className={product.category === 'po' ? 'text-xs font-semibold uppercase tracking-[0.18em] text-turmeric' : 'text-xs font-semibold uppercase tracking-[0.18em] text-leaf'}>
                                {product.category === 'po' ? 'Preorder' : 'Ready stock'}
                            </p>
                            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">{product.name}</h1>
                            <p className="mt-5 text-3xl font-semibold tabular-nums text-ink">{formatRupiah(Number(product.price))}</p>

                            {product.description && <p className="mt-5 max-w-xl whitespace-pre-line text-base leading-7 text-muted-ink">{product.description}</p>}

                            <div className="mt-6 flex items-center gap-2 text-sm text-muted-ink">
                                <span className={product.stock === 0 ? 'text-danger' : 'text-muted-ink'}>
                                    {product.stock === 0 ? 'Stok habis' : `${product.stock} tersedia`}
                                </span>
                                {product.category === 'po' && !poOpen && product.stock > 0 && <span className="text-turmeric">PO sedang tutup</span>}
                            </div>

                            <div className="mt-8 flex flex-col gap-2 sm:flex-row">
                            <button
                                type="button"
                                onClick={() => handleAction('cart')}
                                disabled={unavailable}
                                className="mt-8 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-leaf px-5 text-sm font-semibold text-white transition-colors hover:bg-leaf-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-paper disabled:text-muted-ink sm:w-auto"
                            >
                                {added ? <Check className="h-4 w-4" aria-hidden="true" /> : <ShoppingCart className="h-4 w-4" aria-hidden="true" />}
                                {added ? 'Ditambahkan' : 'Tambah ke keranjang'}
                            </button>
                            <button type="button" onClick={() => handleAction('buy')} disabled={unavailable} className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-leaf px-5 text-sm font-semibold text-leaf transition-colors hover:bg-leaf/10 disabled:cursor-not-allowed disabled:border-line disabled:text-muted-ink sm:w-auto">
                                Beli sekarang
                            </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </>
    );
}
