import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { CreditCard, MapPin, MessageCircle, PackageCheck, ShoppingBag } from 'lucide-react';
import { Hero } from '@/components/ui/hero-1';
import { AppleCardCarousel } from '@/components/ui/apple-card-carousel';
import { SiteHeader } from '@/components/casayur/site-header';
import { SiteFooter } from '@/components/casayur/site-footer';
import { ProductCard } from '@/components/casayur/product-card';
import TestimonialsSection from '@/components/ui/community-testimonial';
import { useCart } from '@/contexts/cart-context';
import type { Product } from '@/types/casayur';

export default function Welcome({ products = [], poOpen = false }: { products?: Product[]; poOpen?: boolean }) {
    return (
        <>
            <Head title="Casayur" />
            <SiteHeader poOpen={poOpen} />
            <main className="min-h-screen bg-[--ink]">
                <Hero
                    eyebrow="Pasar segar setiap hari"
                    title="Sayur segar untuk dapur hari ini."
                    subtitle="Pilih ready stock atau preorder antara 09.00 dan 12.00."
                    ctaLabel="Lihat Etalase"
                    ctaHref="/products"
                />

                {/* Pilihan Belanja & 2 Kartu Vertikal Sesuai Referensi */}
                <section className="mx-auto max-w-[1200px] px-[clamp(20px,5vw,48px)] py-20 text-[--paper]">
                    <div className="grid items-center gap-12 lg:grid-cols-12">
                        {/* Kiri: Teks Pilihan Belanja */}
                        <div className="space-y-4 lg:col-span-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[--leaf]">
                                BELANJA SESUAI KEBUTUHAN
                            </p>
                            <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl text-[--paper]">
                                Pilihan belanja hari ini.
                            </h2>
                            <p className="text-base leading-relaxed text-[--muted-ink]">
                                Pilih cara belanja yang paling cocok. Ready stock untuk kebutuhan hari ini atau preorder untuk panen segar besok pagi.
                            </p>
                        </div>

                        {/* Kanan: 2 Kartu Kategori Vertikal (Ready Stock & Preorder) */}
                        <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
                            {/* Kartu Ready Stock */}
                            <div className="group relative flex h-[380px] flex-col justify-between overflow-hidden rounded-3xl border border-[--line] bg-[--surface] p-6 text-white shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                                <img
                                    src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
                                    alt="Ready Stock Sayuran Segar"
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

                                <div className="relative z-10 flex items-start justify-end">
                                    <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                                        Siap Kirim
                                    </span>
                                </div>

                                <div className="relative z-10 space-y-2">
                                    <h3 className="font-display text-3xl font-semibold leading-tight text-white">
                                        Ready Stock
                                    </h3>
                                    <p className="text-sm text-white/80 line-clamp-2">
                                        Kebutuhan sayur hari ini langsung diantar dari gudang kami.
                                    </p>
                                    <div className="pt-2">
                                        <Link
                                            href="/products?category=ready"
                                            className="inline-flex items-center gap-2 rounded-full bg-[--leaf] px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-[--leaf-deep]"
                                        >
                                            Pesan Sekarang →
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Kartu Preorder */}
                            <div className="group relative flex h-[380px] flex-col justify-between overflow-hidden rounded-3xl border border-[--line] bg-[--surface] p-6 text-white shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                                <img
                                    src="https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80"
                                    alt="Preorder Hasil Bumi Segar"
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

                                <div className="relative z-10 flex items-start justify-end">
                                    <span className="inline-flex rounded-full bg-[--turmeric]/90 px-3 py-1 text-xs font-medium text-[--ink] backdrop-blur-md">
                                        09.00 - 12.00 WIB
                                    </span>
                                </div>

                                <div className="relative z-10 space-y-2">
                                    <h3 className="font-display text-3xl font-semibold leading-tight text-white">
                                        Preorder
                                    </h3>
                                    <p className="text-sm text-white/80 line-clamp-2">
                                        Panen langsung dari petani untuk pesanan esok pagi.
                                    </p>
                                    <div className="pt-2">
                                        <Link
                                            href="/products?category=po"
                                            className="inline-flex items-center gap-2 rounded-full bg-[--turmeric] px-5 py-2.5 text-xs font-semibold text-[--ink] transition-all hover:brightness-105"
                                        >
                                            Pesan Sekarang →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="layanan" className="bg-[--paper] px-[clamp(20px,5vw,48px)] py-20 text-center">
                    <div className="mx-auto max-w-[1200px]">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[--leaf]">LAYANAN CASAYUR</p>
                        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-[--ink] sm:text-5xl">Belanja lebih mudah, setiap hari.</h2>
                        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[--muted-ink]">Layanan praktis untuk memastikan kebutuhan sayur segar Anda terpenuhi dengan nyaman dan terpercaya.</p>
                        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
                            {[
                                [PackageCheck, 'Pre-Order (PO)', 'Pesan lebih awal untuk mendapatkan hasil panen segar sesuai jadwal pengiriman.'],
                                [MapPin, 'Jangkauan Pengiriman', 'Nikmati pengiriman terjadwal ke area layanan Casayur dengan proses yang praktis.'],
                                [ShoppingBag, 'Gratis Ongkir 5 KM', 'Bebas biaya pengiriman untuk alamat dalam radius hingga 5 kilometer.'],
                                [MessageCircle, 'Pesanin', 'Sampaikan kebutuhan belanja Anda dan dapatkan bantuan pemesanan yang personal.'],
                                [CreditCard, 'Pembayaran Fleksibel', 'Pilih metode pembayaran yang nyaman dengan proses transaksi yang aman.'],
                            ].map(([Icon, title, description], index) => (
                                <motion.article
                                    key={title as string}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ delay: index * 0.08, duration: 0.45 }}
                                    className="group rounded-3xl border border-[--line] bg-[--surface] p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[--leaf] hover:shadow-xl"
                                >
                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[--leaf]/10 text-[--leaf] transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                                        <Icon className="h-7 w-7" aria-hidden="true" />
                                    </div>
                                    <h3 className="mt-5 font-display text-xl font-semibold text-[--ink]">{title as string}</h3>
                                    <p className="mt-3 text-sm leading-relaxed text-[--muted-ink]">{description as string}</p>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Produk Terlaris */}
                <section id="katalog" className="mx-auto max-w-[1200px] px-[clamp(20px,5vw,48px)] py-16 bg-[--paper]">
                    <h2 className="mb-10 font-display text-4xl font-semibold text-[--ink]">Pesanan Terlaris</h2>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        {products.slice(0, 4).map((product, index) => (
                            <ProductCard key={product.id} product={product} poOpen={poOpen} index={index} />
                        ))}
                    </div>
                </section>

                <section id="tentang" className="bg-[--paper] px-[clamp(20px,5vw,48px)] py-20 text-[--ink]">
                    <div className="mx-auto max-w-[1200px] text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[--leaf]">TENTANG CASAYUR</p>
                        <h2 className="mx-auto mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">Segar dari sumbernya, dekat dengan dapur Anda.</h2>
                        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[--muted-ink]">
                            Casayur menghadirkan sayur segar pilihan dari sumber terpercaya langsung ke dapur Anda.
                        </p>
                    </div>
                    <div className="mx-auto mt-5 w-full max-w-7xl">
                        <TestimonialsSection
                            data={{
                                title: '',
                                subtitle: '',
                                rows: [
                                    { id: 'row-1', speed: '48s', direction: 'left', testimonials: [
                                        { id: 't-1', quote: 'Sayurnya segar dan pengiriman selalu cepat.', authorName: 'Pelanggan Casayur', authorTitle: 'Pelanggan rumah tangga', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop' },
                                        { id: 't-2', quote: 'Pre-order membuat kebutuhan dapur lebih mudah diatur.', authorName: 'Pelanggan Casayur', authorTitle: 'Pelanggan preorder', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop' },
                                        { id: 't-3', quote: 'Pesanan datang rapi, lengkap, dan sesuai jadwal.', authorName: 'Pelanggan Casayur', authorTitle: 'Pelanggan rutin', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop' },
                                    ] },
                                    { id: 'row-2', speed: '55s', direction: 'right', testimonials: [
                                        { id: 't-4', quote: 'Gratis ongkir 5 kilometer sangat membantu belanja mingguan.', authorName: 'Pelanggan Casayur', authorTitle: 'Pelanggan area sekitar', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop' },
                                        { id: 't-5', quote: 'Fitur Pesanin memudahkan saya menyampaikan kebutuhan belanja.', authorName: 'Pelanggan Casayur', authorTitle: 'Pelanggan Pesanin', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop' },
                                        { id: 't-6', quote: 'Pembayaran fleksibel dan prosesnya terasa aman.', authorName: 'Pelanggan Casayur', authorTitle: 'Pelanggan online', avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop' },
                                    ] },
                                ],
                            }}
                        />
                    </div>
                </section>
                <SiteFooter />
            </main>
        </>
    );
}
