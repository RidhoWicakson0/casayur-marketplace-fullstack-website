import { Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HowToOrder } from '@/components/casayur/how-to-order';
import { PoBoard } from '@/components/casayur/po-board';
import { ProduceMarquee } from '@/components/casayur/produce-marquee';
import { ProductCard } from '@/components/casayur/product-card';
import { ServiceLedger } from '@/components/casayur/service-ledger';
import { SiteFooter } from '@/components/casayur/site-footer';
import { SiteHeader } from '@/components/casayur/site-header';
import { useCart } from '@/contexts/cart-context';
import { cn } from '@/lib/utils';
import type { Product } from '@/types/casayur';
import { Search } from 'lucide-react';

type Filter = 'all' | 'ready' | 'po';

const FILTERS: Array<{ value: Filter; label: string }> = [
    { value: 'all', label: 'Semua' },
    { value: 'ready', label: 'Ready stock' },
    { value: 'po', label: 'Preorder' },
];

export default function Welcome({ products = [], poOpen = false }: { products?: Product[]; poOpen?: boolean }) {
    return <WelcomeContent products={products} poOpen={poOpen} />;
}

function WelcomeContent({ products = [], poOpen = false }: { products?: Product[]; poOpen?: boolean }) {
    const [filter, setFilter] = useState<Filter>('all');
    const [query, setQuery] = useState('');
    const reduceMotion = useReducedMotion();
    const { count } = useCart();

    const filtered = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        return products.filter((product) => {
            const matchesFilter = filter === 'all' || product.category === filter;
            const matchesQuery = normalizedQuery === '' || product.name.toLowerCase().includes(normalizedQuery);
            return matchesFilter && matchesQuery;
        });
    }, [filter, products, query]);

    return (
        <>
            <Head title="Casayur" />
            <SiteHeader poOpen={poOpen} />
            <main className="min-h-screen bg-paper text-ink">
                <section>
                    <div className="mx-auto w-full max-w-[1200px] px-[clamp(20px,5vw,48px)] py-12 lg:py-16">
                        <div className="grid items-center gap-10 lg:grid-cols-[7fr_5fr] lg:gap-14">
                            <div>
                                <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-6xl">
                                    Sayur segar untuk dapur hari ini.
                                </h1>
                            </div>
                            <PoBoard poOpen={poOpen} />
                        </div>
                    </div>
                    <ProduceMarquee />
                </section>
                <section id="katalog" className="mx-auto max-w-[1200px] px-[clamp(20px,5vw,48px)] py-16">
                    <div className="grid grid-cols-2 gap-4">
                        {filtered.map((product, index) => (
                            <ProductCard key={product.id} product={product} poOpen={poOpen} index={index} />
                        ))}
                    </div>
                </section>
                <ServiceLedger />
                <HowToOrder />
                <SiteFooter />
            </main>
        </>
    );
}
