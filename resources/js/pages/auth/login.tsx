import { Form, Head, Link } from '@inertiajs/react';
import { ArrowLeft, Leaf } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TeamInvitationAlert from '@/components/team-invitation-alert';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import PasskeyVerify from '@/components/passkey-verify';
import type { TeamInvitationContext } from '@/types';

type Props = { status?: string; canResetPassword: boolean; teamInvitation?: TeamInvitationContext | null };

export default function Login({ status, canResetPassword, teamInvitation }: Props) {
    return (
        <>
            <Head title="Masuk ke Casayur" />
            {teamInvitation && <TeamInvitationAlert invitation={teamInvitation} action="Masuk" />}
            <div className="relative min-h-svh overflow-hidden bg-[--ink] px-6 py-10 text-[--paper] sm:px-10">
                <Link href="/" className="group absolute left-6 top-6 inline-flex min-h-10 items-center gap-2 text-sm font-medium text-[--paper]/70 transition-colors hover:text-[--leaf] focus:outline-none focus:ring-2 focus:ring-[--leaf] focus:ring-offset-2 focus:ring-offset-[--ink] sm:left-10" aria-label="Kembali ke halaman utama"><ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />Kembali ke beranda</Link>
                <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-leaf/10 blur-3xl" />
                <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-sun/10 blur-3xl" />
                <div className="relative mx-auto grid min-h-[calc(100svh-5rem)] max-w-5xl items-center gap-12 lg:grid-cols-[1fr_420px]">
                    <section className="hidden lg:block">
                        <div className="flex items-center gap-1.5 font-display text-2xl font-bold tracking-tight text-[--paper]"><Leaf className="h-5 w-5 text-[--leaf]" aria-hidden="true" />casayur<span className="text-[--leaf]">.</span></div>
                        <h1 className="mt-5 max-w-xl font-display text-6xl font-bold leading-none tracking-tight">Belanja segar, tanpa ribet.</h1>
                        <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-ink">Masuk untuk melanjutkan pesanan sayur segar dari pasar pilihanmu.</p>
                    </section>
                    <section className="rounded-2xl border border-line bg-surface p-7 text-ink shadow-2xl shadow-black/10 sm:p-9">
                        <div className="mb-8">
                            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-leaf">Selamat datang</p>
                            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">Masuk ke akunmu</h2>
                            <p className="mt-2 text-sm text-muted-ink">Gunakan email dan password untuk masuk.</p>
                        </div>
                        <PasskeyVerify />
                        <Form {...store.form()} resetOnSuccess={['password']} className="grid gap-5">
                            {({ processing, errors }) => <>
                                <div className="grid gap-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" name="email" required autoFocus autoComplete="email" placeholder="nama@email.com" /><InputError message={errors.email} /></div>
                                <div className="grid gap-2"><div className="flex items-center justify-between"><Label htmlFor="password">Password</Label>{canResetPassword && <TextLink href={request()} className="text-sm">Lupa password?</TextLink>}</div><PasswordInput id="password" name="password" required autoComplete="current-password" placeholder="Masukkan password" /><InputError message={errors.password} /></div>
                                <div className="flex items-center gap-3"><Checkbox id="remember" name="remember" /><Label htmlFor="remember">Ingat saya</Label></div>
                                <Button type="submit" className="min-h-11 w-full bg-leaf text-white hover:bg-leaf-deep" disabled={processing}>{processing && <Spinner />} Masuk</Button>
                                <a href="/auth/google/redirect" className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-line px-4 text-sm font-medium transition-colors hover:bg-paper focus-visible:outline-2 focus-visible:outline-leaf">Lanjutkan dengan Google</a>
                                {status && <p className="text-center text-sm text-leaf" role="status">{status}</p>}
                            </>}
                        </Form>
                        <p className="mt-7 text-center text-sm text-muted-ink">Belum punya akun? <TextLink href={register({ query: { invitation: teamInvitation?.code } })}>Daftar</TextLink></p>
                    </section>
                </div>
            </div>
        </>
    );
}

Login.layout = { title: 'Masuk ke Casayur', description: 'Akses pesanan dan akun Casayur.' };
