import { Link, router, usePage } from '@inertiajs/react';
import { BarChart3, ChevronLeft, ChevronRight, LayoutDashboard, Leaf, LogOut, Menu, Moon, Package, ShoppingBag, Sun, X } from 'lucide-react';
import { useState } from 'react';

const links = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Produk', icon: Package },
    { href: '/admin/orders', label: 'Pesanan', icon: ShoppingBag },
    { href: '/admin/reports/sales', label: 'Laporan penjualan', icon: BarChart3 },
];

function Navigation({ collapsed, onNavigate }: { collapsed?: boolean; onNavigate?: () => void }) {
    const { url } = usePage();
    return <nav className="grid gap-1" aria-label="Navigasi admin">{links.map(({ href, label, icon: Icon }) => {
        const active = href === '/admin' ? url === '/admin' : url.startsWith(href);
        return <Link key={href} href={href} onClick={onNavigate} title={collapsed ? label : undefined} className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf ${active ? 'bg-leaf/10 text-leaf' : 'text-muted-ink hover:bg-paper hover:text-ink'} ${collapsed ? 'justify-center' : ''}`}><Icon className="h-4 w-4 shrink-0" aria-hidden="true" />{!collapsed && label}</Link>;
    })}</nav>;
}

function Logout({ collapsed }: { collapsed?: boolean }) {
    return <button type="button" onClick={() => router.post('/logout')} title={collapsed ? 'Keluar' : undefined} className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-muted-ink transition-colors hover:bg-paper hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf ${collapsed ? 'justify-center' : ''}`}><LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />{!collapsed && 'Keluar'}</button>;
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dark, setDark] = useState(document.documentElement.classList.contains('dark'));
    const toggleTheme = () => { const next = !dark; setDark(next); document.documentElement.classList.toggle('dark', next); };
    return <div className="min-h-svh bg-paper text-ink">
        <aside className={`fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-line bg-surface px-3 py-5 transition-all duration-300 lg:flex ${collapsed ? 'w-20' : 'w-64'}`}>
            <div className={`mb-8 flex items-center ${collapsed ? 'justify-center' : 'justify-between px-2'}`}><Link href="/admin" className="flex items-center gap-1.5 font-display text-2xl font-bold tracking-tight" aria-label="Casayur admin"><Leaf className="h-5 w-5 text-leaf" aria-hidden="true" />{!collapsed && <>casayur<span className="text-leaf">.</span></>}</Link><button type="button" onClick={() => setCollapsed(!collapsed)} aria-expanded={!collapsed} aria-controls="admin-sidebar-navigation" className="rounded-lg p-2 text-muted-ink hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf">{collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}<span className="sr-only">{collapsed ? 'Buka sidebar' : 'Ciutkan sidebar'}</span></button></div>
            <div id="admin-sidebar-navigation"><Navigation collapsed={collapsed} /></div>
            <div className="mt-auto"><Logout collapsed={collapsed} /></div>
        </aside>
        <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between border-b border-line bg-surface px-5 lg:hidden"><Link href="/admin" className="flex items-center gap-1.5 font-display text-xl font-bold" aria-label="Casayur admin"><Leaf className="h-5 w-5 text-leaf" aria-hidden="true" />casayur<span className="text-leaf">.</span></Link><button type="button" onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-controls="admin-mobile-menu" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-line focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf">{mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}<span className="sr-only">Buka menu admin</span></button></header>
        {mobileOpen && <div id="admin-mobile-menu" className="border-b border-line bg-surface px-5 py-4 lg:hidden"><Navigation onNavigate={() => setMobileOpen(false)} /><div className="mt-3 border-t border-line pt-3"><Logout /></div></div>}
        <main className={`min-h-svh transition-all duration-300 ${collapsed ? 'lg:ml-20' : 'lg:ml-64'}`}><div className="hidden items-center justify-end gap-2 border-b border-line bg-surface px-8 py-3 lg:flex"><span className="mr-2 text-xs font-medium uppercase tracking-wider text-muted-ink">Admin Casayur</span><button type="button" onClick={toggleTheme} aria-label="Ganti tema" className="rounded-lg border border-line p-2 text-muted-ink hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf">{dark ? <Sun className="h-4 w-4 text-turmeric" /> : <Moon className="h-4 w-4" />}</button></div>{children}</main>
    </div>;
}
