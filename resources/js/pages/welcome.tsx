import { Head, Link } from '@inertiajs/react';
import { useMemo, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { AnimatedMarqueeHero } from '@/components/ui/hero-3';
import { FluidDropdown } from '@/components/ui/fluid-dropdown';
import { ProductRevealCard } from '@/components/ui/product-reveal-card';
import { Search } from 'lucide-react';
import { ServiceBento } from '@/components/ui/service-bento';
import { StaggerTestimonials } from '@/components/ui/stagger-testimonials';
import { login, register } from '@/routes';

type Product = { id: number; name: string; category: 'ready' | 'po'; price: number; stock: number };

export default function Welcome({ auth, products = [] }: { auth?: { user?: unknown }; products?: Product[] }) {
    const [filter, setFilter] = useState<'all' | 'ready' | 'po'>('all');
    const [query, setQuery] = useState('');
    const [cartCount, setCartCount] = useState(0);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [theme, setTheme] = useState<'system' | 'light' | 'dark'>('system');
    const [systemDark, setSystemDark] = useState(false);
    const reduceMotion = useReducedMotion();
    const isDark = theme === 'dark' || (theme === 'system' && systemDark);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        if (theme === 'system') {
            root.classList.add(systemDark ? 'dark' : 'light');
        } else {
            root.classList.add(theme);
        }
    }, [theme, systemDark]);

    useEffect(() => {
        const media = window.matchMedia('(prefers-color-scheme: dark)');
        const update = () => setSystemDark(media.matches);
        update();
        media.addEventListener('change', update);
        return () => media.removeEventListener('change', update);
    }, []);

    const poOpen = new Date().getHours() >= 9 && new Date().getHours() < 12;

    const catalogProducts = products.length ? products : [{
        id: 0,
        name: 'Paket Sayur Segar',
        category: 'ready' as const,
        price: 25000,
        stock: 12,
    }];

    const filtered = useMemo(() => catalogProducts.filter((product) =>
        (filter === 'all' || product.category === filter) && product.name.toLowerCase().includes(query.toLowerCase())
    ), [catalogProducts, filter, query]);

    const banner = ['Belanja Segar & Jujur', 'Sayur, lotek, gorengan, dan sembako segar dikirim langsung dari Casayur.', 'Belanja Sekarang'];
    const cards = [
        { src: 'https://images.unsplash.com/photo-1540420773420-3365f57f5c7f?w=400&h=600&fit=crop', alt: 'Sayur 1' },
        { src: 'https://images.unsplash.com/photo-1518977676610-b5d988394017?w=400&h=600&fit=crop', alt: 'Sayur 2' },
        { src: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400&h=600&fit=crop', alt: 'Sayur 3' },
        { src: 'https://images.unsplash.com/photo-1574323347407-f5e1ad4d0200?w=400&h=600&fit=crop', alt: 'Sayur 4' },
        { src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=600&fit=crop', alt: 'Sayur 5' },
    ];

    const handleAddToCart = (productName: string) => {
        setCartCount((count) => count + 1);
        setToastMessage(`"${productName}" berhasil ditambahkan ke keranjang!`);
        setTimeout(() => setToastMessage(null), 3000);
    };

    return (
        <>
            <Head title="Casayur — Belanja Segar Harian" />
            <main className="min-h-screen bg-[#FDFDFC] text-[#1E293B] font-sans antialiased tracking-[-0.01em] selection:bg-emerald-500 selection:text-white dark:bg-slate-950 dark:text-slate-100">
                {/* Toast Feedback */}
                {toastMessage && (
                    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-emerald-800 px-5 py-3 text-sm text-white shadow-lg animate-bounce">
                        <span>🛒</span>
                        <span>{toastMessage}</span>
                    </div>
                )}

                {/* Navigation Header */}
                <motion.header
                    initial={{ y: -12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="sticky top-0 z-50 w-full border-b border-transparent bg-[#FDFDFC]/80 backdrop-blur-md dark:bg-slate-950/80"
                >
                    <nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
                        <a href="#home" aria-label="Casayur beranda" className="rounded-md p-2 text-lg font-black tracking-tight text-emerald-600 transition hover:bg-slate-100 dark:hover:bg-slate-800">
                            casayur<span className="text-amber-500">.</span>
                        </a>

                        <div className="hidden items-center gap-2 md:flex">
                            <a href="#katalog" className="rounded-md px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white">Katalog</a>
                            <a href="#layanan" className="rounded-md px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white">Layanan</a>
                            <a href="#footer" className="rounded-md px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white">Tentang</a>
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="ml-1 rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                                aria-label="Ganti tema"
                            >
                                {isDark ? (
                                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                                )}
                            </button>
                            <Link href="/checkout" className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700">Keranjang{cartCount > 0 ? ` (${cartCount})` : ''}</Link>
                            <div className="group relative">
                                <button aria-label="Buka menu akun" className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800">
                                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="3" /><path d="M5 20c.7-3.3 3.2-5 7-5s6.3 1.7 7 5" /></svg>
                                </button>
                                <div className="invisible absolute right-0 top-11 z-50 w-32 rounded-md border border-slate-200 bg-white p-1 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100 dark:border-slate-700 dark:bg-slate-900">
                                    <Link href={login()} className="block rounded px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">Sign in</Link>
                                    <Link href={register()} className="block rounded px-3 py-2 text-sm text-emerald-700 hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-emerald-950">Sign up</Link>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 md:hidden">
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300"
                                aria-label="Ganti tema"
                            >
                                {isDark ? '☀' : '☾'}
                            </button>
                            <Link href="/checkout" className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white">Keranjang</Link>
                        </div>
                    </nav>
                </motion.header>

                {/* Hero Section */}
                <AnimatedMarqueeHero
                    tagline={poOpen ? 'PO BUKA 09.00 - 12.00' : 'PO TUTUP — BUKA BESOK 09.00'}
                    title={banner[0]}
                    description={banner[1]}
                    ctaText={banner[2]}
                    images={cards.map(c => c.src)}
                    onCtaClick={() => document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' })}
                />

                {/* Catalog Section */}
                <section id="katalog" className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Pilihan Segar Harian</span>
                            <h2 className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight transition-colors">Katalog Produk</h2>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <div className="w-full md:w-48">
                                <FluidDropdown 
                                    defaultValue={filter} 
                                    onSelect={(id) => setFilter(id as any)} 
                                />
                            </div>
                            <div className="relative flex-1 md:w-64">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    <Search className="w-4 h-4" />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Cari produk..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 focus:border-emerald-500 focus:ring-emerald-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    {filtered.length ? (
                        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-6">
                            {filtered.map((product) => (
                                <div key={product.id} className="w-full flex justify-center">
                                    <ProductRevealCard
                                        className="w-full max-w-[240px]"
                                        name={product.name}
                                        price={`Rp ${Number(product.price).toLocaleString('id-ID')}`}
                                        description={`${product.category === 'po' ? 'Preorder' : 'Ready Stock'} Casayur dengan stok ${product.stock} tersedia.`}
                                        onAdd={() => handleAddToCart(product.name)}
                                        enableAnimations={!reduceMotion}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="mt-12 rounded-3xl bg-white px-6 py-16 text-center border border-slate-100 shadow-sm">
                            <div className="text-5xl mb-4">🔍</div>
                            <h3 className="text-lg font-bold text-slate-800">Produk Tidak Ditemukan</h3>
                            <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">
                                Coba sesuaikan kata kunci pencarian atau ganti filter kategori.
                            </p>
                        </div>
                    )}
                </section>

                <ServiceBento />

                <section id="testimoni" className="bg-slate-50 py-12 dark:bg-slate-950">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">Testimoni</p>
                        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Pengalaman pelanggan Casayur</h2>
                        <div className="mt-6 overflow-hidden rounded-xl dark:bg-slate-950">
                            <StaggerTestimonials />
                        </div>
                    </div>
                </section>

                {/* Footer Section */}
                <footer id="footer" className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 pt-16 pb-12 transition-colors">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
                            <div className="md:col-span-2">
                                <a href="#home" className="text-2xl font-extrabold tracking-tight text-emerald-600 flex items-center gap-1">
                                    <span className="text-3xl">🥬</span> casayur<span className="text-amber-500">.</span>
                                </a>
                                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
                                    Marketplace lokal terpercaya untuk kebutuhan sayur segar, paket preorder masakan harian, lotek, gorengan, dan sembako berkualitas.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white text-sm transition-colors">Tautan Cepat</h4>
                                <ul className="mt-4 space-y-2.5 text-sm text-slate-500 dark:text-slate-400 font-medium">
                                    <li><a href="#home" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Beranda</a></li>
                                    <li><a href="#katalog" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Katalog Produk</a></li>
                                    <li><a href="#layanan" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Layanan Pengiriman</a></li>
                                    <li><Link href="/checkout" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Halaman Checkout</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white text-sm transition-colors">Bantuan & Hubungi</h4>
                                <ul className="mt-4 space-y-2.5 text-sm text-slate-500 dark:text-slate-400 font-medium">
                                    <li className="flex items-center gap-2"><span>💬</span> WhatsApp: +62 812-3456-7890</li>
                                    <li className="flex items-center gap-2"><span>📍</span> Area: Radius Max 20 KM</li>
                                    <li className="flex items-center gap-2"><span>🕒</span> PO: 09.00 - 12.00 WIB</li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-12 border-t border-slate-100 dark:border-slate-800 pt-8 text-center text-xs font-semibold text-slate-400 dark:text-slate-600 transition-colors">
                            &copy; 2026 Casayur Marketplace. Fresh, Honest, & Accessible. All rights reserved.
                        </div>
                    </div>
                </footer>
            </main>
        </>
    );
}
