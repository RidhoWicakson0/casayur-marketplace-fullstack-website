const STEPS = [
    {
        title: 'Pilih produk',
        description:
            'Tambahkan ready stock atau preorder ke keranjang. Preorder hanya terbuka 09.00 - 12.00.',
    },
    {
        title: 'Cek alamat',
        description:
            'Masukkan koordinat. Ongkir dan kelayakan COD muncul sebelum pesanan dibuat.',
    },
    {
        title: 'Konfirmasi pesanan',
        description:
            'Pilih pickup atau delivery. Untuk COD, konfirmasi lewat WhatsApp.',
    },
];

export function HowToOrder() {
    return (
        <section
            id="cara-pesan"
            className="scroll-mt-20 border-t border-line bg-surface py-16 sm:py-20"
        >
            <div className="mx-auto w-full max-w-[1200px] px-[clamp(20px,5vw,48px)]">
                <div className="max-w-2xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-leaf">
                        Alur
                    </p>
                    <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                        Cara pesan
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-ink">
                        Tiga langkah dari etalase sampai pesanan dikonfirmasi.
                    </p>
                </div>

                <ol className="mt-8 divide-y divide-line border-y border-line">
                    {STEPS.map((step, index) => (
                        <li
                            key={step.title}
                            className="grid gap-3 py-6 sm:grid-cols-[4rem_1fr] sm:gap-6"
                        >
                            <span className="font-display text-3xl font-semibold text-leaf tabular-nums">
                                0{index + 1}
                            </span>
                            <div>
                                <h3 className="font-display text-xl font-semibold text-ink">
                                    {step.title}
                                </h3>
                                <p className="mt-1 text-sm leading-relaxed text-muted-ink">
                                    {step.description}
                                </p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
