import { cn } from '@/lib/utils';

const FACTS = [
    { label: 'Radius antar', value: 'Maksimal 20 km' },
    { label: 'Ongkir ready', value: 'Gratis sampai 3 km, lalu Rp2.000/km' },
    { label: 'Ongkir PO', value: 'Gratis sampai 5 km, lalu Rp2.000/km' },
    { label: 'COD', value: 'Sampai 5 km, konfirmasi via WhatsApp' },
];

export function PoBoard({ poOpen }: { poOpen: boolean }) {
    return (
        <section
            className="rounded-[18px] border border-line bg-surface p-6"
            aria-labelledby="po-board-title"
        >
            <div className="flex items-center justify-between gap-4">
                <h2
                    id="po-board-title"
                    className="font-display text-2xl font-semibold tracking-tight text-ink"
                >
                    Papan hari ini
                </h2>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-turmeric">
                    Preorder
                </span>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium">
                <span
                    className={cn(
                        'h-2.5 w-2.5 rounded-full',
                        poOpen ? 'bg-leaf' : 'bg-turmeric',
                    )}
                    aria-hidden="true"
                />
                <span className={poOpen ? 'text-leaf' : 'text-turmeric'}>
                    {poOpen ? 'PO buka' : 'PO tutup'}
                </span>
                <span className="text-muted-ink tabular-nums">09.00 - 12.00 WIB</span>
            </div>

            <dl className="mt-6 divide-y divide-line border-t border-line">
                {FACTS.map((fact) => (
                    <div
                        key={fact.label}
                        className="grid gap-1 py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-4"
                    >
                        <dt className="text-sm font-medium text-muted-ink">{fact.label}</dt>
                        <dd className="text-sm text-ink tabular-nums">{fact.value}</dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}
