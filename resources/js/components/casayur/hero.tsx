import { motion, useReducedMotion } from 'framer-motion';
import { Link } from '@inertiajs/react';

export function Hero() {
    const reduceMotion = useReducedMotion();
    
    return (
        <section className="relative flex min-h-[600px] flex-col items-center justify-center bg-[--paper] px-4 py-24 text-center">
            <motion.div
                initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="z-10 max-w-4xl"
            >
                {/* Eyebrow */}
                <span className="mb-4 inline-block rounded-full border border-[--leaf] px-4 py-1 text-sm font-medium text-[--leaf]">
                    Pasar segar setiap hari
                </span>
                
                <h1 className="font-display text-6xl font-bold tracking-tight text-[--ink] sm:text-8xl">
                    Sayur segar untuk<br />
                    <span className="text-[--leaf]">dapur hari ini.</span>
                </h1>
                
                <p className="mt-8 text-xl text-[--muted-ink] max-w-2xl mx-auto">
                    Pilih ready stock atau preorder antara 09.00 dan 12.00. Kami pastikan kualitas terbaik langsung dari pasar.
                </p>
                
                <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row justify-center">
                    <Link
                        href="/products"
                        className="inline-flex h-14 items-center rounded-full bg-[--leaf] px-10 text-lg font-semibold text-white transition-transform hover:scale-105 hover:bg-[--leaf-deep]"
                    >
                        Lihat Etalase
                    </Link>
                </div>
            </motion.div>
            
            {/* Background decorative elements */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[--leaf] opacity-5 blur-3xl" />
                <div className="absolute top-1/2 -right-24 h-96 w-96 rounded-full bg-[--turmeric] opacity-5 blur-3xl" />
            </div>

            {/* Curved dark transition */}
            <div className="absolute bottom-0 left-0 right-0 h-24 w-full overflow-hidden leading-none" aria-hidden="true">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-full w-full fill-[--ink]">
                    <path d="M0,120V74C180,22 360,18 540,58C730,100 920,108 1200,34V120Z" />
                </svg>
            </div>
        </section>
    );
}
