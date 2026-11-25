import { Head } from '@inertiajs/react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ProductCard } from '@/components/casayur/product-card';
import { SiteFooter } from '@/components/casayur/site-footer';
import { SiteHeader } from '@/components/casayur/site-header';
import { cn } from '@/lib/utils';
import type { Product } from '@/types/casayur';

type Filter = 'all' | 'ready' | 'po';
type Sort = 'featured' | 'low' | 'high';

export default function Products({ products = [], poOpen = false }: { products?: Product[]; poOpen?: boolean }) {
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState<Filter>('all');
    const [sort, setSort] = useState<Sort>('featured');
    const [inStock, setInStock] = useState(false);
    const normalizedQuery = query.trim().toLowerCase();

    const visibleProducts = useMemo(() => {
        const result = products.filter((product) => {
            const matchesQuery = !normalizedQuery || product.name.toLowerCase().includes(normalizedQuery);
            const matchesFilter = filter === 'all' || product.category === filter;
            return matchesQuery && matchesFilter && (!inStock || product.stock > 0);
        });

        return [...result].sort((a, b) => {
            if (sort === 'low') return a.price - b.price;
            if (sort === 'high') return b.price - a.price;
            return 0;
        });
    }, [filter, inStock, normalizedQuery, products, sort]);

    const hasFilters = Boolean(normalizedQuery) || filter !== 'all' || inStock || sort !== 'featured';
    const clearFilters = () => {
        setQuery('');
        setFilter('all');
        setSort('featured');
        setInStock(false);
    };

    return (
        <>
            <Head title="Produk" />
            <SiteHeader poOpen={poOpen} />
            <main className="min-h-screen bg-[--ink] text-[--paper]">
                <section className="mx-auto w-full max-w-[1200px] px-[clamp(20px,5vw,48px)] py-16 sm:py-24">
                    <div className="max-w-2xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-leaf">Etalase Casayur</p>
                        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-6xl">Produk segar untuk dapur hari ini.</h1>
                        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-ink">Pilih sayur ready stock atau preorder. Semua produk dipilih untuk kebutuhan dapur yang praktis.</p>
                    </div>

                    <div className="mt-12 flex flex-col gap-4 border-y border-line py-5 lg:flex-row lg:items-center lg:justify-between">
                        <label className="flex h-11 items-center gap-3 rounded-lg border border-line bg-surface px-3 transition-colors focus-within:border-leaf focus-within:ring-2 focus-within:ring-leaf/20 lg:w-80">
                            <Search className="h-4 w-4 shrink-0 text-muted-ink" aria-hidden="true" />
                            <span className="sr-only">Cari produk</span>
                            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari produk" className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted-ink" />
                        </label>
                        <div className="flex flex-wrap items-center gap-2">
                            {(['all', 'ready', 'po'] as Filter[]).map((value) => (
                                <button key={value} type="button" onClick={() => setFilter(value)} className={cn('rounded-lg px-3 py-2 text-sm font-medium transition-colors', filter === value ? 'bg-ink text-paper' : 'bg-surface text-muted-ink hover:text-ink')}>
                                    {value === 'all' ? 'Semua' : value === 'ready' ? 'Ready stock' : 'Preorder'}
                                </button>
                            ))}
                            <button type="button" onClick={() => setInStock((value) => !value)} className={cn('inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors', inStock ? 'bg-leaf text-white' : 'bg-surface text-muted-ink hover:text-ink')}>
                                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" /> Stok tersedia
                            </button>
                            <select value={sort} onChange={(event) => setSort(event.target.value as Sort)} aria-label="Urutkan produk" className="h-10 rounded-lg border border-line bg-surface px-3 text-sm text-ink outline-none focus:border-leaf color-scheme-light-dark">
                                <option className="bg-surface text-ink" value="featured">Unggulan</option>
                                <option className="bg-surface text-ink" value="low">Harga terendah</option>
                                <option className="bg-surface text-ink" value="high">Harga tertinggi</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-8 flex items-center justify-between text-sm text-muted-ink">
                        <span aria-live="polite">{visibleProducts.length} produk</span>
                        {hasFilters && <button type="button" onClick={clearFilters} className="inline-flex items-center gap-1 font-medium text-leaf hover:text-leaf-deep"><X className="h-4 w-4" aria-hidden="true" /> Reset filter</button>}
                    </div>

                    {visibleProducts.length > 0 ? (
                        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                            {visibleProducts.map((product, index) => <ProductCard key={product.id} product={product} poOpen={poOpen} index={index} />)}
                        </div>
                    ) : (
                        <div className="mt-5 rounded-xl border border-dashed border-line bg-surface px-6 py-16 text-center">
                            <h2 className="font-display text-2xl font-semibold">Produk tidak ditemukan.</h2>
                            <p className="mt-2 text-sm text-muted-ink">Coba kata kunci lain atau reset filter untuk melihat semua produk.</p>
                            <button type="button" onClick={clearFilters} className="mt-6 rounded-lg bg-leaf px-4 py-3 text-sm font-semibold text-white hover:bg-leaf-deep">Lihat semua produk</button>
                        </div>
                    )}
                </section>
            </main>
            <SiteFooter />
        </>
    );
}
