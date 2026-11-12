const ROWS = [
    {
        label: 'Preorder',
        value: 'Setiap hari 09.00 - 12.00 WIB. Di luar jam itu tombol PO nonaktif.',
    },
    {
        label: 'Jangkauan',
        value: 'Maksimal 20 km dari titik Casayur.',
    },
    {
        label: 'Ongkir',
        value: 'Pickup gratis. Delivery gratis 3 km untuk ready stock dan 5 km untuk PO. Setelah itu Rp2.000 per km.',
    },
    {
        label: 'COD',
        value: 'Tersedia sampai 5 km untuk ready stock dan PO, dikonfirmasi lewat WhatsApp.',
    },
];

export function ServiceLedger() {
    return (
        <section id="layanan" className="scroll-mt-20 border-t border-line bg-paper py-16 sm:py-20">
            <div className="mx-auto w-full max-w-[1200px] px-[clamp(20px,5vw,48px)]">
                <div className="max-w-2xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-leaf">
                        Layanan
                    </p>
                    <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                        Papan layanan
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-ink">
                        Aturan antar dan preorder yang berlaku hari ini.
                    </p>
                </div>

                <dl className="mt-8 divide-y divide-line border-y border-line">
                    {ROWS.map((row) => (
                        <div
                            key={row.label}
                            className="grid gap-2 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6"
                        >
                            <dt className="font-display text-lg font-semibold text-ink">
                                {row.label}
                            </dt>
                            <dd className="text-sm leading-relaxed text-muted-ink">
                                {row.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
