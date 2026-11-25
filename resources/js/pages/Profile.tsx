import { Head, Link, router, useForm } from '@inertiajs/react';
import { ArrowLeft, Camera, Check, Clock, History, LogOut, ShieldCheck, User as UserIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { SiteFooter } from '@/components/casayur/site-footer';
import { SiteHeader } from '@/components/casayur/site-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserData {
    id: number;
    name: string;
    email: string;
    avatar?: string | null;
    avatar_url?: string | null;
    role: string;
    created_at: string;
}

export default function Profile({ user }: { user: UserData }) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(user.avatar_url || null);

    const { data, setData, post, processing, errors } = useForm<{
        name: string;
        avatar: File | null;
    }>({
        name: user.name || '',
        avatar: null,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            toast.error('Ukuran foto maksimal 2MB.');
            return;
        }

        setData('avatar', file);
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/profile', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Profil dan foto berhasil diperbarui.');
            },
            onError: (err) => {
                const firstError = Object.values(err)[0];
                toast.error(firstError || 'Gagal memperbarui profil.');
            },
        });
    };

    return (
        <>
            <Head title="Profil Saya - Casayur" />
            <SiteHeader poOpen={false} />
            <main className="min-h-screen bg-[--ink] text-[--paper]">
                <section className="mx-auto w-full max-w-[900px] px-[clamp(20px,5vw,48px)] py-12 sm:py-20">
                    <div className="mb-8">
                        <Link
                            href="/"
                            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-ink transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf"
                        >
                            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                            Kembali ke beranda
                        </Link>
                        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                            Profil Saya
                        </h1>
                        <p className="mt-2 text-muted-ink">
                            Kelola informasi profil dan foto akun Casayur Anda.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="space-y-6 md:col-span-2">
                            <form onSubmit={handleSubmit} className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
                                <div className="mb-8 flex flex-col items-center gap-5 sm:flex-row">
                                    <div className="relative group">
                                        <Avatar className="h-28 w-28 rounded-full border-2 border-line bg-background text-[--ink] shadow-sm">
                                            <AvatarImage
                                                src={previewUrl || ''}
                                                alt={user.name || 'Foto Profil'}
                                                className="object-cover"
                                            />
                                            <AvatarFallback className="text-2xl font-bold text-ink">
                                                {user.name ? user.name.slice(0, 2).toUpperCase() : <UserIcon className="h-10 w-10 text-muted-ink" />}
                                            </AvatarFallback>
                                        </Avatar>

                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            aria-label="Pilih foto profil"
                                            className="absolute bottom-0 right-0 inline-flex h-9 w-9 items-center justify-center rounded-full bg-leaf text-white shadow-md transition-transform hover:scale-105 hover:bg-leaf-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf"
                                        >
                                            <Camera className="h-4 w-4" />
                                        </button>

                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/png,image/jpeg,image/jpg,image/webp"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </div>

                                    <div className="text-center sm:text-left">
                                        <h2 className="text-lg font-semibold text-ink">{user.name}</h2>
                                        <p className="text-sm text-muted-ink">{user.email}</p>
                                        <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                                            <span className="inline-flex items-center gap-1 rounded-full border border-leaf/30 bg-leaf/10 px-2.5 py-0.5 text-xs font-semibold text-leaf">
                                                <ShieldCheck className="h-3.5 w-3.5" />
                                                {user.role === 'admin' ? 'Administrator' : 'Pelanggan'}
                                            </span>
                                            {user.created_at && (
                                                <span className="inline-flex items-center gap-1 text-xs text-muted-ink">
                                                    <Clock className="h-3 w-3" />
                                                    Bergabung {new Date(user.created_at).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 border-t border-line pt-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-ink">
                                            Nama Lengkap
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                            className="mt-1 block w-full rounded-lg border border-line bg-background px-3.5 py-2.5 text-sm text-ink transition-colors focus:border-leaf focus:outline-none focus:ring-1 focus:ring-leaf"
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-xs text-danger">{errors.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-ink">
                                            Alamat Email
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={user.email}
                                            disabled
                                            className="mt-1 block w-full rounded-lg border border-line bg-paper/50 px-3.5 py-2.5 text-sm text-muted-ink cursor-not-allowed"
                                        />
                                        <p className="mt-1 text-xs text-muted-ink">
                                            Email terhubung dengan akun Google Anda dan tidak dapat diubah.
                                        </p>
                                    </div>

                                    {errors.avatar && (
                                        <p className="text-xs text-danger">{errors.avatar}</p>
                                    )}

                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-leaf px-6 text-sm font-semibold text-white transition-colors hover:bg-leaf-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf disabled:opacity-70 sm:w-auto"
                                        >
                                            <Check className="h-4 w-4" />
                                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="space-y-6">
                            <div className="rounded-2xl border border-line bg-surface p-6">
                                <h3 className="font-display text-base font-bold text-ink">Aktivitas Saya</h3>
                                <p className="mt-1 text-xs text-muted-ink">
                                    Pantau pesanan sayur dan riwayat transaksi belanja Anda.
                                </p>
                                <div className="mt-4">
                                    <Link
                                        href="/history"
                                        className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-line bg-background px-4 text-sm font-medium text-ink transition-colors hover:border-leaf hover:text-leaf"
                                    >
                                        <History className="h-4 w-4" />
                                        Lihat Riwayat Pesanan
                                    </Link>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-line bg-surface p-6">
                                <h3 className="font-display text-base font-bold text-ink">Keluar Akun</h3>
                                <p className="mt-1 text-xs text-muted-ink">
                                    Akhiri sesi masuk Anda pada peramban ini.
                                </p>
                                <div className="mt-4">
                                    <button
                                        type="button"
                                        onClick={() => router.post('/logout')}
                                        className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-line bg-background px-4 text-sm font-medium text-danger transition-colors hover:bg-red-50 hover:border-red-200 dark:hover:bg-red-950/30"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Keluar (Logout)
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </>
    );
}

Profile.layout = (page: any) => page;
