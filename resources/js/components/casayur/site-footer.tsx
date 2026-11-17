import { Link } from '@inertiajs/react';
import { ArrowUpRight, Instagram, Leaf, MessageCircle } from 'lucide-react';
import { login, register } from '@/routes';

const anchorClass = 'text-sm text-muted-ink transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf';

export function SiteFooter() {
    return (
        <footer className="border-t border-line bg-background text-ink">
            <div className="mx-auto w-full max-w-[1200px] px-[clamp(20px,5vw,48px)] py-14 sm:py-20">
                <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
                    <div>
                        <Link href="/" className="inline-flex items-center gap-1.5 font-display text-3xl font-bold tracking-tight text-ink">
                            <Leaf className="h-6 w-6 text-leaf" aria-hidden="true" />
                            casayur<span className="text-leaf">.</span>
                        </Link>
                        <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-ink">
                            Sayur segar pilihan dari sumber terpercaya, langsung untuk kebutuhan dapur Anda.
                        </p>
                        <a href="mailto:halo@casayur.id" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-ink hover:text-leaf">
                            halo@casayur.id <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                    </div>

                    <div>
                        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-ink">Jelajahi</h2>
                        <ul className="mt-4 space-y-3">
                            <li><a href="#katalog" className={anchorClass}>Katalog</a></li>
                            <li><Link href="/#layanan" className={anchorClass}>Layanan</Link></li>
                            <li><Link href="/#tentang" className={anchorClass}>Tentang</Link></li>
                            <li><Link href="/pesanin" className={anchorClass}>Pesanin</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-ink">Bantuan</h2>
                        <ul className="mt-4 space-y-3">
                            <li><Link href="/checkout" className={anchorClass}>Checkout</Link></li>
                            <li><Link href={login()} className={anchorClass}>Masuk</Link></li>
                            <li><Link href={register()} className={anchorClass}>Daftar</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-ink">Ikuti Kami</h2>
                        <div className="mt-4 flex items-center gap-3">
                            <a
                                href="https://instagram.com/casayur"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram Casayur"
                                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted-ink transition-colors hover:border-leaf hover:text-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf"
                            >
                                <Instagram className="h-5 w-5" aria-hidden="true" />
                            </a>
                            <a
                                href="https://wa.me/6281234567890"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="WhatsApp Casayur"
                                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted-ink transition-colors hover:border-leaf hover:text-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf"
                            >
                                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted-ink sm:flex-row sm:items-center sm:justify-between">
                    <span>© 2026 Casayur. Semua hak dilindungi.</span>
                    <span>Segar setiap hari.</span>
                </div>
            </div>
        </footer>
    );
}
