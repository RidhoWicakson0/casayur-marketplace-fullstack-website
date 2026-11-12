export type ProduceKind = 'sayur' | 'lotek' | 'gorengan' | 'sembako' | 'lainnya';

const KEYWORDS: Array<[ProduceKind, string[]]> = [
    [
        'sayur',
        [
            'sayur',
            'bayam',
            'kangkung',
            'wortel',
            'tomat',
            'cabai',
            'brokoli',
            'selada',
            'timun',
            'terong',
            'buncis',
            'labu',
            'jagung',
            'sawi',
        ],
    ],
    ['lotek', ['lotek', 'gado', 'pecel', 'rujak']],
    ['gorengan', ['goreng', 'bakwan', 'tempe', 'tahu', 'pisang', 'cireng', 'risol']],
    ['sembako', ['beras', 'telur', 'minyak', 'gula', 'tepung', 'mie', 'kecap', 'garam', 'sabun']],
];

export function kindFromName(name: string): ProduceKind {
    const normalized = name.toLowerCase();

    for (const [kind, words] of KEYWORDS) {
        if (words.some((word) => normalized.includes(word))) {
            return kind;
        }
    }

    return 'lainnya';
}

export function ProduceMark({ kind, className }: { kind: ProduceKind; className?: string }) {
    return (
        <svg
            viewBox="0 0 64 64"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={className}
        >
            {kind === 'sayur' && (
                <>
                    <path d="M32 52V30" />
                    <path d="M32 30c-8-2-13-8-14-16 8 0 14 4 17 11" />
                    <path d="M32 30c8-2 13-8 14-16-8 0-14 4-17 11" />
                    <path d="M32 22c-4-5-4-11 0-15 4 4 4 10 0 15Z" />
                </>
            )}
            {kind === 'lotek' && (
                <>
                    <path d="M12 32h40" />
                    <path d="M16 32c0 12 7 20 16 20s16-8 16-20" />
                    <path d="M22 26c2-4 4-4 6 0" />
                    <path d="M31 24c2-4 4-4 6 0" />
                    <path d="M40 26c2-4 4-4 6 0" />
                </>
            )}
            {kind === 'gorengan' && (
                <>
                    <path d="M16 38c-4-8 2-16 10-18 8-2 16 2 20 10 4 8-1 16-9 18-8 2-17-2-21-10Z" />
                    <circle cx="26" cy="32" r="1.5" fill="currentColor" stroke="none" />
                    <circle cx="36" cy="30" r="1.5" fill="currentColor" stroke="none" />
                    <circle cx="32" cy="40" r="1.5" fill="currentColor" stroke="none" />
                </>
            )}
            {kind === 'sembako' && (
                <>
                    <path d="M22 26h20l-3 26H25l-3-26Z" />
                    <path d="M22 26c4-4 16-4 20 0" />
                    <path d="M28 26v-6M36 26v-6" />
                    <path d="M25 34h14" />
                </>
            )}
            {kind === 'lainnya' && (
                <>
                    <path d="M16 48c0-18 12-32 32-32 0 20-14 32-32 32Z" />
                    <path d="M20 44c8-8 16-12 24-16" />
                </>
            )}
        </svg>
    );
}
