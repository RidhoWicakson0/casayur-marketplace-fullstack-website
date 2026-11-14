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
    User,
    LogOut,
    History,
    Settings,
} from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { useCart } from '@/contexts/cart-context';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { login, register } from '@/routes';
import { CartPreview } from './cart-preview';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function ThemeControl() {
    const { appearance, updateAppearance } = useAppearance();
    
    // Hitung secara langsung apakah root document saat ini sedang dark
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const checkDark = () => {
            if (typeof document !== 'undefined') {
                setIsDark(document.documentElement.classList.contains('dark'));
            }
        };

        checkDark();

        const observer = new MutationObserver(checkDark);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, [appearance]);

    const toggleTheme = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const nextMode = isDark ? 'light' : 'dark';
        updateAppearance(nextMode);
    };

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Ganti ke tema terang' : 'Ganti ke tema gelap'}
            title={isDark ? 'Tema terang' : 'Tema gelap'}
            className="inline-flex min-h-10 min-w-10 cursor-pointer items-center justify-center rounded-md border border-[--line] bg-[--surface] text-[--ink] transition-colors hover:border-[--leaf] focus:outline-none"
        >
            {isDark ? (
                <Sun className="h-5 w-5 text-[--turmeric]" aria-hidden="true" />
            ) : (
                <Moon className="h-5 w-5 text-[--ink]" aria-hidden="true" />
            )}
        </button>
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
            className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-[--muted-ink] transition-colors hover:text-[--ink]"
        >
            {children}
        </a>
    );
}

export function SiteHeader({ poOpen }: { poOpen: boolean }) {
    const reduceMotion = useReducedMotion();
    const [open, setOpen] = useState(false);
    const { items, count } = useCart();
    
    // Dummy state for auth
    const [isLoggedIn] = useState(false); 

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
        <header
            className="sticky top-0 z-50 w-full border-b border-line bg-surface text-ink shadow-sm transition-colors duration-200"
        >
            <div className="mx-auto flex min-h-16 w-full max-w-[1200px] items-center justify-between gap-3 px-[clamp(20px,5vw,48px)]">
                <div className="flex items-center gap-4">
                    <Link
                        href="/"
                        aria-label="Casayur, kembali ke beranda"
                        className="inline-flex min-h-11 items-center gap-1.5 font-display text-2xl font-bold tracking-tight text-[--ink]"
                    >
                        <Leaf className="h-5 w-5 text-[--leaf]" aria-hidden="true" />
                        casayur<span className="text-[--leaf]">.</span>
                    </Link>
                </div>

                <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
                    <NavLink href="/products">Produk</NavLink>
                    <NavLink href="/pesanin">Pesanin</NavLink>
                    <NavLink href="/layanan">Layanan</NavLink>
                    <NavLink href="/tentang">Tentang</NavLink>
                </nav>

                <div className="flex items-center gap-2">
                    <ThemeControl />

                    <div className="group relative">
                        <Link
                            href="/checkout"
                            aria-label={`Keranjang, ${count} item`}
                            className="relative inline-flex min-h-10 min-w-10 items-center justify-center rounded-md border border-[--line] bg-[--surface] text-[--ink] transition-colors hover:border-[--leaf] focus:outline-none focus:ring-2 focus:ring-[--leaf]"
                        >
                            <ShoppingBasket className="h-5 w-5" aria-hidden="true" />
                            {count > 0 && (
                                <span className="absolute -top-1 -right-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[--leaf] px-1 text-[10px] font-semibold text-white tabular-nums">
                                    {count}
                                </span>
                            )}
                        </Link>
                        <div className="invisible opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                            <CartPreview items={items} count={count} />
                        </div>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                type="button"
                                aria-label="Menu akun pengguna"
                                className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[--line] bg-[--surface] text-[--ink] transition-colors hover:border-[--leaf] focus:outline-none focus:ring-2 focus:ring-[--leaf]"
                            >
                                <Avatar className="pointer-events-none h-8 w-8">
                                    <AvatarImage src="" alt="Avatar Profil" />
                                    <AvatarFallback className="bg-[--surface] text-[--ink] font-medium">
                                        <User className="h-4 w-4" />
                                    </AvatarFallback>
                                </Avatar>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="z-50 w-48 border border-[--line] bg-[--surface] text-[--ink] shadow-lg">
                            {isLoggedIn ? (
                                <>
                                    <DropdownMenuItem className="cursor-pointer hover:bg-[--paper]">
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Edit Profil</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer hover:bg-[--paper]">
                                        <History className="mr-2 h-4 w-4" />
                                        <span>History Belanja</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Logout</span>
                                    </DropdownMenuItem>
                                </>
                            ) : (
                                <>
                                    <DropdownMenuItem asChild className="cursor-pointer hover:bg-[--paper]">
                                        <Link href={register()} className="w-full">Sign Up</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild className="cursor-pointer hover:bg-[--paper]">
                                        <Link href={login()} className="w-full">Sign In</Link>
                                    </DropdownMenuItem>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <button
                        type="button"
                        onClick={() => setOpen((value) => !value)}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        aria-label={open ? 'Tutup menu' : 'Buka menu'}
                        className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-md border border-[--line] bg-[--surface] text-[--ink] transition-colors hover:border-[--leaf] lg:hidden"
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
                <div id="mobile-menu" className="border-t border-line bg-surface text-ink lg:hidden">
                    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-1 px-[clamp(20px,5vw,48px)] py-4">
                        <NavLink href="/products" onClick={closeMenu}>Produk</NavLink>
                        <NavLink href="/pesanin" onClick={closeMenu}>Pesanin</NavLink>
                        <NavLink href="/layanan" onClick={closeMenu}>Layanan</NavLink>
                        <NavLink href="/tentang" onClick={closeMenu}>Tentang</NavLink>

                        <div className="mt-2 border-t border-[--line] pt-3 flex items-center justify-between">
                            <span className="text-sm font-medium text-[--muted-ink]">Tema Tampilan</span>
                            <ThemeControl />
                        </div>

                        <div className="mt-2 border-t border-[--line] pt-3 flex flex-col gap-2">
                             {isLoggedIn ? (
                                <>
                                    <NavLink href="/profile" onClick={closeMenu}>Edit Profil</NavLink>
                                    <NavLink href="/history" onClick={closeMenu}>History Belanja</NavLink>
                                    <button className="text-left px-3 text-sm font-medium text-red-600">Logout</button>
                                </>
                            ) : (
                                <>
                                    <NavLink href={register()} onClick={closeMenu}>Sign Up</NavLink>
                                    <NavLink href={login()} onClick={closeMenu}>Sign In</NavLink>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
