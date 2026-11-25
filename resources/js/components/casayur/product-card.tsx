import { Link, usePage } from '@inertiajs/react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, ShoppingCart } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useCart } from '@/contexts/cart-context';
import { cn } from '@/lib/utils';
import { ProduceMark, kindFromName } from './produce-mark';
import type { Product } from '@/types/casayur';

function formatRupiah(value: number) {
    return `Rp ${new Intl.NumberFormat('id-ID').format(value)}`;
}

export function ProductCard({
    product,
    poOpen,
    index,
}: {
    product: Product;
    poOpen: boolean;
    index: number;
}) {
    const { auth } = usePage().props as { auth?: { user?: { role?: string } } };
    const reduceMotion = useReducedMotion();
    const { addItem } = useCart();
    const [added, setAdded] = useState(false);
    const timer = useRef<number | null>(null);

    const disabled =
        product.stock === 0 || (product.category === 'po' && !poOpen);

    useEffect(() => {
        return () => {
            if (timer.current) {
                window.clearTimeout(timer.current);
            }
        };
    }, []);

    const handleAdd = () => {
        if (disabled) {
            return;
        }

        if (!auth?.user || auth.user.role !== 'customer') {
            window.location.href = `/auth/google/action/${product.id}/cart`;
            return;
        }

        addItem(product);
        toast.success(`${product.name} ditambahkan ke keranjang.`);
        setAdded(true);

        if (timer.current) {
            window.clearTimeout(timer.current);
        }

        timer.current = window.setTimeout(() => setAdded(false), 1200);
    };

    const kind = kindFromName(product.name);

    return (
        <motion.article
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: Math.min(index, 5) * 0.04 }}
            className="group flex h-full flex-col rounded-[18px] border border-line bg-surface p-4 transition-colors hover:border-leaf/40"
        >
            <Link
                href={`/products/${product.id}`}
                aria-label={`Lihat detail ${product.name}`}
                className="group/detail relative block overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-2"
            >
                <div
                    className={cn(
                        'flex aspect-[4/3] items-center justify-center rounded-xl bg-paper transition-transform duration-300 group-hover/detail:scale-[1.02]',
                        product.category === 'po' ? 'text-turmeric' : 'text-leaf',
                    )}
                >
                    {product.image_url ? <img src={product.image_url} alt="" className="h-full w-full object-cover" /> : <ProduceMark kind={kind} className="h-20 w-20" />}
                    <span className="absolute inset-x-3 bottom-3 rounded-lg bg-ink/90 px-3 py-2 text-center text-xs font-semibold text-paper opacity-0 transition-opacity duration-200 group-hover/detail:opacity-100 group-focus-within:opacity-100">
                        Lihat detail
                    </span>
                </div>
            </Link>

            <div className="mt-4 flex flex-1 flex-col">
                <div className="flex items-center justify-between gap-2">
                    <span
                        className={cn(
                            'text-[11px] font-semibold uppercase tracking-[0.14em]',
                            product.category === 'po' ? 'text-turmeric' : 'text-leaf',
                        )}
                    >
                        {product.category === 'po' ? 'Preorder' : 'Ready stock'}
                    </span>
                    <span
                        className={cn(
                            'text-xs tabular-nums',
                            product.stock === 0
                                ? 'font-medium text-danger'
                                : 'text-muted-ink',
                        )}
                    >
                        {product.stock === 0 ? 'Stok habis' : `Stok ${product.stock}`}
                    </span>
                </div>

                <h3 className="mt-2 font-display text-lg font-semibold leading-snug tracking-tight text-ink">
                    <Link href={`/products/${product.id}`} className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf">
                        {product.name}
                    </Link>
                </h3>
                <p className="mt-1 text-base font-semibold text-ink tabular-nums">
                    {formatRupiah(product.price)}
                </p>

                <div className="mt-auto pt-4">
                    <button
                        type="button"
                        onClick={handleAdd}
                        disabled={disabled}
                        className={cn(
                            'inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg px-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-2',
                            disabled
                                ? 'cursor-not-allowed bg-paper text-muted-ink'
                                : 'bg-leaf text-white hover:bg-leaf-deep',
                        )}
                    >
                        {added ? (
                            <Check className="h-4 w-4" aria-hidden="true" />
                        ) : (
                            <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                        )}
                        {added ? 'Ditambahkan' : 'Tambah ke keranjang'}
                    </button>

                    {product.category === 'po' && !poOpen && product.stock > 0 && (
                        <p className="mt-2 text-xs text-turmeric">
                            PO tutup. Buka lagi 09.00.
                        </p>
                    )}
                </div>
            </div>
        </motion.article>
    );
}
