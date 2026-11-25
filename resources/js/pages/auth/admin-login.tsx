import { Form, Head, Link } from '@inertiajs/react';
import { ArrowLeft, Leaf } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/login';

export default function AdminLogin() {
    return (
        <>
            <Head title="Login Admin Casayur" />
            <div className="relative min-h-svh overflow-hidden bg-[--ink] px-6 py-10 text-[--paper] sm:px-10">
                <Link href="/" className="group absolute left-6 top-6 inline-flex min-h-10 items-center gap-2 text-sm font-medium text-[--paper]/70 transition-colors hover:text-[--leaf] focus:outline-none focus:ring-2 focus:ring-[--leaf] focus:ring-offset-2 focus:ring-offset-[--ink] sm:left-10" aria-label="Kembali ke halaman utama">
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                    Kembali ke beranda
                </Link>
                <div className="mx-auto flex min-h-[calc(100svh-5rem)] max-w-md items-center justify-center">
                    <section className="w-full rounded-2xl border border-line bg-surface p-7 text-ink shadow-2xl shadow-black/10 sm:p-9">
                        <div className="mb-8 text-center">
                            <div className="mb-5 flex items-center justify-center gap-1.5 font-display text-2xl font-bold tracking-tight text-ink">
                                <Leaf className="h-5 w-5 text-[--leaf]" aria-hidden="true" />
                                casayur<span className="text-[--leaf]">.</span>
                            </div>
                            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-leaf">Area admin</p>
                            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">Masuk ke dashboard</h1>
                            <p className="mt-2 text-sm text-muted-ink">Gunakan email dan password admin.</p>
                        </div>
                        <Form {...store.form()} resetOnSuccess={['password']} className="grid gap-5">
                            {({ processing, errors }) => <>
                                <div className="grid gap-2"><Label htmlFor="email">Email admin</Label><Input id="email" type="email" name="email" required autoFocus autoComplete="username" placeholder="admin@casayur.test" /><InputError message={errors.email} /></div>
                                <div className="grid gap-2"><Label htmlFor="password">Password</Label><PasswordInput id="password" name="password" required autoComplete="current-password" placeholder="Masukkan password admin" /><InputError message={errors.password} /></div>
                                <Button type="submit" className="min-h-11 w-full bg-leaf text-white hover:bg-leaf-deep" disabled={processing}>{processing && <Spinner />} Masuk sebagai admin</Button>
                            </>}
                        </Form>
                        <p className="mt-7 text-center text-sm text-muted-ink">Halaman khusus pengelola Casayur.</p>
                    </section>
                </div>
            </div>
        </>
    );
}
