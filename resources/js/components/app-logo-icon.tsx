import type { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path fill="currentColor" d="M20 3 35 11.5v17L20 37 5 28.5v-17L20 3Z" opacity=".18" />
            <path fill="currentColor" d="M20 6.5 32 13v14L20 34.5 8 27V13L20 6.5Zm0 4.2-8 4.35v5.1l8 4.35 8-4.35v-5.1l-8-4.35Zm-8 13.2v1.1l8 4.35v-5.1l-8-4.35Zm16 0-8 4.35v5.1l8-4.35v-1.1Z" />
            <path fill="currentColor" d="M20 15.2c3.4-4.6 8.2-3 8.2.2 0 3.6-4.2 6.4-8.2 9.2-4-2.8-8.2-5.6-8.2-9.2 0-3.2 4.8-4.8 8.2-.2Z" />
        </svg>
    );
}
