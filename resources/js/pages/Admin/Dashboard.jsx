function Chart({ data, value, color, format = (n) => n }) {
    const max = Math.max(...data.map((item) => Number(item[value])), 1);
    return <div className="grid grid-cols-12 items-end gap-2" style={{ height: 180 }}>
        {data.map((item) => <div key={item.label} className="flex min-w-0 flex-col items-center gap-2" title={`${item.label}: ${format(item[value])}`}>
            <div className={`w-full rounded-t ${color}`} style={{ height: `${Math.max(4, (Number(item[value]) / max) * 140)}px` }} />
            <span className="w-full truncate text-center text-[10px] text-muted-ink">{item.label.split(' ')[0]}</span>
        </div>)}
    </div>;
}

export default function Dashboard({ statistics = {}, monthly = [], recent_orders = [], low_stock_products = [] }) {
    return <main className="min-h-screen bg-background p-5 text-ink sm:p-8">
        <h1 className="mb-6 font-display text-3xl font-bold">Dashboard admin</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries({ Omzet: statistics.revenue, Pesanan: statistics.orders, Pending: statistics.pending, Selesai: statistics.completed }).map(([label, value]) => <div key={label} className="rounded-xl border border-line bg-surface p-4"><p className="text-sm text-muted-ink">{label}</p><strong className="text-xl">{label === 'Omzet' ? `Rp ${Number(value).toLocaleString('id-ID')}` : value}</strong></div>)}
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <section className="rounded-xl border border-line bg-surface p-5"><h2 className="mb-4 font-bold">Omzet per bulan</h2><Chart data={monthly} value="revenue" color="bg-leaf" format={(n) => `Rp ${Number(n).toLocaleString('id-ID')}`} /></section>
            <section className="rounded-xl border border-line bg-surface p-5"><h2 className="mb-4 font-bold">Pesanan per bulan</h2><Chart data={monthly} value="orders" color="bg-turmeric" /></section>
        </div>
        <section className="mt-6 rounded-xl border border-line bg-surface p-5"><h2 className="mb-3 font-bold">Stok rendah</h2>{low_stock_products.length ? low_stock_products.map((product) => <p key={product.id}>{product.name}: {product.stock}</p>) : <p className="text-muted-ink">Tidak ada stok rendah.</p>}</section>
        <section className="mt-6 rounded-xl border border-line bg-surface p-5"><h2 className="mb-3 font-bold">Pesanan terbaru</h2>{recent_orders.length ? recent_orders.map((order) => <p key={order.id}>#{order.id} · {order.status} · Rp {Number(order.total).toLocaleString('id-ID')}</p>) : <p className="text-muted-ink">Belum ada pesanan.</p>}</section>
    </main>;
}
