import { ProduceMark, type ProduceKind } from './produce-mark';

const ITEMS: Array<{ kind: ProduceKind; label: string }> = [
    { kind: 'sayur', label: 'Sayur segar' },
    { kind: 'lotek', label: 'Lotek' },
    { kind: 'gorengan', label: 'Gorengan' },
    { kind: 'sembako', label: 'Sembako' },
];

export function ProduceMarquee() {
    return (
        <div className="produce-marquee overflow-hidden border-y border-line bg-surface py-4">
            <div className="produce-marquee-track flex w-max items-center gap-10 px-6">
                {[...ITEMS, ...ITEMS].map((item, index) => (
                    <div
                        key={`${item.kind}-${index}`}
                        aria-hidden={index >= ITEMS.length || undefined}
                        className="flex items-center gap-3"
                    >
                        <ProduceMark kind={item.kind} className="h-7 w-7 text-leaf" />
                        <span className="whitespace-nowrap text-sm font-medium text-muted-ink">
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
