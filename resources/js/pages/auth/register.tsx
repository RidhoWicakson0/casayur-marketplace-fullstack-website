import { Form, Head, Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TeamInvitationAlert from '@/components/team-invitation-alert';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { ArrowLeft, Leaf } from 'lucide-react';
import { login } from '@/routes';
import { store } from '@/routes/register';
import type { TeamInvitationContext } from '@/types';

type Props = {
    passwordRules: string;
    teamInvitation?: TeamInvitationContext | null;
};

export default function Register({ passwordRules, teamInvitation }: Props) {
    return (
        <>
            <Head title="Daftar ke Casayur" />
            <div className="relative min-h-svh overflow-hidden bg-[--ink] px-6 py-10 text-[--paper] sm:px-10">
                <Link href={teamInvitation ? login.url({ query: { invitation: teamInvitation.code } }) : login()} className="group absolute left-6 top-6 inline-flex min-h-10 items-center gap-2 text-sm font-medium text-[--paper]/70 transition-colors hover:text-[--leaf] focus:outline-none focus:ring-2 focus:ring-[--leaf] focus:ring-offset-2 focus:ring-offset-[--ink] sm:left-10" aria-label="Kembali ke halaman login"><ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />Kembali ke login</Link>
                <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-leaf/10 blur-3xl" />
                <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-sun/10 blur-3xl" />
                <div className="relative mx-auto grid min-h-[calc(100svh-5rem)] max-w-5xl items-center gap-12 lg:grid-cols-[1fr_420px]">
                    <section className="hidden lg:block">
                        <div className="flex items-center gap-1.5 font-display text-2xl font-bold tracking-tight text-[--paper]"><Leaf className="h-5 w-5 text-[--leaf]" aria-hidden="true" />casayur<span className="text-[--leaf]">.</span></div>
                        <h1 className="mt-8 max-w-xl font-display text-6xl font-bold leading-none tracking-tight">Mulai belanja lebih segar.</h1>
                        <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-ink">Buat akun untuk menyimpan pesanan dan menikmati pengalaman belanja sayur yang lebih mudah.</p>
                    </section>
                    <section className="rounded-2xl border border-line bg-surface p-7 text-ink shadow-2xl shadow-black/10 sm:p-9">
                        <div className="mb-8 flex items-center gap-1.5 font-display text-2xl font-bold tracking-tight text-ink lg:hidden"><Leaf className="h-5 w-5 text-[--leaf]" aria-hidden="true" />casayur<span className="text-[--leaf]">.</span></div>
                        {teamInvitation && <TeamInvitationAlert invitation={teamInvitation} action="Daftar" />}
                        <div className="mb-7"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-leaf">Selamat datang</p><h2 className="mt-2 font-display text-3xl font-bold tracking-tight">Buat akun Casayur</h2><p className="mt-2 text-sm text-muted-ink">Daftar untuk mulai belanja sayur segar.</p></div>
                        <Form {...store.form()} resetOnSuccess={['password', 'password_confirmation']} disableWhileProcessing className="grid gap-4">
                            {({ processing, errors }) => <>
                                <div className="grid gap-2"><Label htmlFor="name">Nama lengkap</Label><Input id="name" type="text" required autoFocus autoComplete="name" name="name" placeholder="Nama lengkap" /><InputError message={errors.name} /></div>
                                <div className="grid gap-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" required autoComplete="email" name="email" placeholder="nama@email.com" /><InputError message={errors.email} /></div>
                                <div className="grid gap-2"><Label htmlFor="password">Password</Label><PasswordInput id="password" required autoComplete="new-password" name="password" placeholder="Buat password" passwordrules={passwordRules} /><InputError message={errors.password} /></div>
                                <div className="grid gap-2"><Label htmlFor="password_confirmation">Konfirmasi password</Label><PasswordInput id="password_confirmation" required autoComplete="new-password" name="password_confirmation" placeholder="Ulangi password" passwordrules={passwordRules} /><InputError message={errors.password_confirmation} /></div>
                                <Button type="submit" className="mt-2 min-h-11 w-full bg-leaf text-white hover:bg-leaf-deep" data-test="register-user-button">{processing && <Spinner />} Daftar</Button>
                                <a href="/auth/google/redirect" className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-line px-4 text-sm font-medium transition-colors hover:bg-paper focus-visible:outline-2 focus-visible:outline-leaf">Daftar dengan Google</a>
                            </>}
                        </Form>
                        <p className="mt-7 text-center text-sm text-muted-ink">Sudah punya akun? <TextLink href={teamInvitation ? login.url({ query: { invitation: teamInvitation.code } }) : login()}>Masuk</TextLink></p>
                    </section>
                </div>
            </div>
        </>
    );
}

Register.layout = { title: 'Daftar ke Casayur', description: 'Buat akun untuk mulai belanja.' };
