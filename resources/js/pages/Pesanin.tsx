import { Head } from '@inertiajs/react';
import { SiteHeader } from '@/components/casayur/site-header';
import { SiteFooter } from '@/components/casayur/site-footer';
import { ShoppingBasket, MessageCircle, Truck, PackageCheck } from 'lucide-react';

export default function Pesanin() {
    const waNumber = '6283141267423'; // Ganti dengan nomor WA asli
    const waUrl = `https://wa.me/${waNumber}?text=Halo%20Casayur%2C%20saya%20ingin%20memesan%20belanjaan.`;

    const steps = [
        { icon: MessageCircle, title: 'Chat di WA', desc: 'Hubungi admin kami melalui WhatsApp.' },
        { icon: ShoppingBasket, title: 'Kirim List Pesanan', desc: 'Kirimkan daftar belanjaan Anda kepada admin.' },
        { icon: Truck, title: 'Pilih Metode', desc: 'Tentukan mau ambil sendiri atau delivery order.' },
        { icon: PackageCheck, title: 'Belanjaan Sampai', desc: 'Belanjaan sampai dengan baik dan segar di tangan Anda.' },
    ];

    return (
        <>
            <Head title="Pesanin - Belanja Langsung di Pasar" />
            <SiteHeader />
            <main className="min-h-screen bg-[--ink] pt-20 text-[--paper]">
                <div className="mx-auto max-w-4xl px-4 py-16 text-center">
                    <h1 className="font-display text-5xl font-bold tracking-tight mb-6">Pesanin: Belanja Pasar Langsung</h1>
                    <p className="text-xl text-muted-ink mb-10 max-w-2xl mx-auto">
                        Kami membelanjakan langsung pesanan Anda ke pasar, memastikan kualitas terbaik dan kesegaran bahan terjaga sampai di depan pintu Anda.
                    </p>
                    <a 
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-leaf px-8 py-4 text-lg font-semibold text-white hover:bg-leaf-deep transition-all"
                    >
                        <MessageCircle className="h-5 w-5" />
                        Pesan Sekarang di WhatsApp
                    </a>
                </div>

                <div className="bg-surface py-20">
                    <div className="mx-auto max-w-6xl px-4">
                        <h2 className="font-display text-3xl font-semibold center mb-16 text-center">Cara Mudah Pesanin</h2>
                        <div className="grid md:grid-cols-4 gap-8">
                            {steps.map((step, idx) => (
                                <div key={idx} className="flex flex-col items-center text-center">
                                    <div className="h-16 w-16 rounded-full bg-paper flex items-center justify-center mb-6 text-leaf">
                                        <step.icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                                    <p className="text-muted-ink text-sm">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <SiteFooter />
        </>
    );
}
