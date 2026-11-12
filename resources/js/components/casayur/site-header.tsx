import { Link } from '@inertiajs/react';
import { motion, useReducedMotion } from 'framer-motion';
import {
    Leaf,
    Menu,
    Monitor,
    Moon,
    ShoppingBasket,
    Sun,
    X,
} from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { useCart } from '@/contexts/cart-context';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { login, register } from '@/routes';

function ThemeControl() {
    const { appearance, updateAppearance } = useAppearance();
    const options = [
        { mode: 'system' as const, label: 'Sistem', icon: Monitor },
        { mode: 'light' as const, label: 'Terang', icon: Sun },
        { mode: 'dark' as const, label: 'Gelap', icon: Moon },
    ];

    return (
        <div
            className="flex items-center rounded-lg border border-line bg-surface p-0.5"
            role="group"
            aria-label="Tema tampilan"
        >
            {options.map(({ mode, label, icon: Icon }) => (
                <button
                    key={mode}
                    type="button"
                    onClick={() => updateAppearance(mode)}
                    aria-pressed={appearance === mode}
                    aria-label={label}
                    title={label}
                    className={cn(
                        'inline-flex min-h-11 items-center gap-1.5 rounded-md px-2 text-xs font-medium transition-colors',
                        appearance === mode
                            ? 'bg-leaf text-white'
                            : 'text-muted-ink hover:text-ink',
                    )}
                >
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="hidden lg:inline">{label}</span>
                </button>
            ))}
        </div>
    );
}

function NavLink({
    href,
    children,
    onClick,
}: {
    href: string;
    children: ReactNode;
    onClick?: () => void;
}) {
    return (
        <a
            href={href}
            onClick={onClick}
            className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-muted-ink transition-colors hover:text-ink"
        >
            {children}
        </a>
    );
}

export function SiteHeader({ poOpen }: { poOpen: boolean }) {
    const reduceMotion = useReducedMotion();
    const [open, setOpen] = useState(false);
    const { count } = useCart();

    useEffect(() => {
        if (!open) {
            return;
        }

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpen(false);
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [open]);

    const closeMenu = () => setOpen(false);

    return (
        <motion.header
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="sticky top-0 z-40 border-b border-line bg-paper"
        >
            <div className="mx-auto flex min-h-16 w-full max-w-[1200px] items-center justify-between gap-3 px-[clamp(20px,5vw,48px)]">
                <div className="flex items-center gap-4">
                    <Link
                        href="/"
                        aria-label="Casayur, kembali ke beranda"
                        className="inline-flex min-h-11 items-center gap-1.5 font-display text-2xl font-bold tracking-tight text-ink"
                    >
                        <Leaf className="h-5 w-5 text-leaf" aria-hidden="true" />
                        casayur<span className="text-leaf">.</span>
                    </Link>

                    <div
                        className="hidden items-center gap-2 text-xs font-medium sm:flex"
                        aria-live="polite"
                    >
                        <span
                            className={cn(
                                'h-2 w-2 rounded-full',
                                poOpen ? 'bg-leaf' : 'bg-turmeric',
                            )}
                            aria-hidden="true"
                        />
                        <span className={poOpen ? 'text-leaf' : 'text-turmeric'}>
                            {poOpen ? 'PO buka' : 'PO tutup'}
                        </span>
                    </div>
                </div>

                <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
                    <NavLink href="#katalog">Katalog</NavLink>
                    <NavLink href="#layanan">Layanan</NavLink>
                    <NavLink href="#cara-pesan">Cara pesan</NavLink>
                </nav>

                <div className="flex items-center gap-1.5">
                    <div className="hidden items-center gap-1.5 lg:flex">
                        <ThemeControl />
                    </div>

                    <Link
                        href={login()}
                        className="hidden min-h-11 items-center rounded-md px-3 text-sm font-medium text-muted-ink transition-colors hover:text-ink lg:inline-flex"
                    >
                        Masuk
                    </Link>
                    <Link
                        href={register()}
                        className="hidden min-h-11 items-center rounded-md bg-leaf px-4 text-sm font-semibold text-white transition-colors hover:bg-leaf-deep lg:inline-flex"
                    >
                        Daftar
                    </Link>

                    <Link
                        href="/checkout"
                        aria-label={`Keranjang, ${count} item`}
                        className="inline-flex min-h-11 items-center gap-2 rounded-md border border-line bg-surface px-3 text-sm font-medium text-ink transition-colors hover:border-leaf"
                    >
                        <ShoppingBasket className="h-4 w-4" aria-hidden="true" />
                        <span className="hidden sm:inline">Keranjang</span>
                        {count > 0 && (
                            <motion.span
                                key={count}
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.2 }}
                                className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-leaf px-1 text-[11px] font-semibold text-white tabular-nums"
                            >
                                {count}
                            </motion.span>
                        )}
                    </Link>

                    <button
                        type="button"
                        onClick={() => setOpen((value) => !value)}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        aria-label={open ? 'Tutup menu' : 'Buka menu'}
                        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-line bg-surface text-ink lg:hidden"
                    >
                        {open ? (
                            <X className="h-5 w-5" aria-hidden="true" />
                        ) : (
                            <Menu className="h-5 w-5" aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>

            {open && (
                <div id="mobile-menu" className="border-t border-line bg-paper lg:hidden">
                    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-1 px-[clamp(20px,5vw,48px)] py-4">
                        <div className="flex items-center gap-2 pb-2 text-xs font-medium">
                            <span
                                className={cn(
                                    'h-2 w-2 rounded-full',
                                    poOpen ? 'bg-leaf' : 'bg-turmeric',
                                )}
                                aria-hidden="true"
                            />
                            <span className={poOpen ? 'text-leaf' : 'text-turmeric'}>
                                {poOpen ? 'PO buka' : 'PO tutup'}
                            </span>
                            <span className="text-muted-ink">09.00 - 12.00 WIB</span>
                        </div>

                        <NavLink href="#katalog" onClick={closeMenu}>
                            Katalog
                        </NavLink>
                        <NavLink href="#layanan" onClick={closeMenu}>
                            Layanan
                        </NavLink>
                        <NavLink href="#cara-pesan" onClick={closeMenu}>
                            Cara pesan
                        </NavLink>

                        <div className="mt-2 flex flex-col gap-1 border-t border-line pt-3">
                            <Link
                                href={login()}
                                onClick={closeMenu}
                                className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-muted-ink hover:text-ink"
                            >
                                Masuk
                            </Link>
                            <Link
                                href={register()}
                                onClick={closeMenu}
                                className="inline-flex min-h-11 items-center rounded-md bg-leaf px-3 text-sm font-semibold text-white hover:bg-leaf-deep"
                            >
                                Daftar
                            </Link>
                        </div>

                        <div className="mt-2 flex items-center justify-between border-t border-line pt-3">
                            <span className="text-sm text-muted-ink">Tema</span>
                            <ThemeControl />
                        </div>
                    </div>
                </div>
            )}
        </motion.header>
    );
}
