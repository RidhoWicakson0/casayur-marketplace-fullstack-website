import { Link } from '@inertiajs/react';
import { Leaf } from 'lucide-react';
import { login, register } from '@/routes';

export function SiteFooter() {
    return (
        <footer className="border-t border-line bg-surface">
            <div className="mx-auto w-full max-w-[1200px] px-[clamp(20px,5vw,48px)] py-12">
                <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
                    <div>
                        <div className="inline-flex items-center gap-1.5 font-display text-2xl font-bold tracking-tight text-ink">
                            <Leaf className="h-5 w-5 text-leaf" aria-hidden="true" />
                            casayur<span className="text-leaf">.</span>
                        </div>
                        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-ink">
                            Sayur, lotek, gorengan, dan sembako untuk dapur sekitar.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-ink">
                            Info
                        </h2>
                        <ul className="mt-3 space-y-2 text-sm text-ink tabular-nums">
                            <li>Jam PO 09.00 - 12.00 WIB</li>
                            <li>Radius 20 km</li>
                            <li>WhatsApp +62 812-3456-7890</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-ink">
                            Tautan
                        </h2>
                        <ul className="mt-1 text-sm">
                            <li>
                                <a
                                    href="#katalog"
                                    className="inline-flex min-h-11 items-center text-muted-ink transition-colors hover:text-ink"
                                >
                                    Katalog
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#layanan"
                                    className="inline-flex min-h-11 items-center text-muted-ink transition-colors hover:text-ink"
                                >
                                    Layanan
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#cara-pesan"
                                    className="inline-flex min-h-11 items-center text-muted-ink transition-colors hover:text-ink"
                                >
                                    Cara pesan
                                </a>
                            </li>
                            <li>
                                <Link
                                    href="/checkout"
                                    className="inline-flex min-h-11 items-center text-muted-ink transition-colors hover:text-ink"
                                >
                                    Checkout
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={login()}
                                    className="inline-flex min-h-11 items-center text-muted-ink transition-colors hover:text-ink"
                                >
                                    Masuk
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={register()}
                                    className="inline-flex min-h-11 items-center text-muted-ink transition-colors hover:text-ink"
                                >
                                    Daftar
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 border-t border-line pt-6 text-xs text-muted-ink">
                    © 2026 Casayur.
                </div>
            </div>
        </footer>
    );
}
