import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { User, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Daftar" />

            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Buat Akun</h2>
                <p className="text-slate-400 text-sm">Bergabung dengan ClipTube dan mulai membuat klip viral hari ini.</p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            id="name"
                            name="name"
                            value={data.name}
                            className="bg-slate-900/50 border border-slate-700 text-white text-sm rounded-xl focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-11 p-3.5 transition-colors placeholder:text-slate-500"
                            placeholder="Nama Lengkap"
                            autoComplete="name"
                            autoFocus
                            required
                            onChange={(e) => setData('name', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.name} className="mt-2 text-red-400" />
                </div>

                <div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="bg-slate-900/50 border border-slate-700 text-white text-sm rounded-xl focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-11 p-3.5 transition-colors placeholder:text-slate-500"
                            placeholder="Alamat Email"
                            autoComplete="username"
                            required
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.email} className="mt-2 text-red-400" />
                </div>

                <div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="bg-slate-900/50 border border-slate-700 text-white text-sm rounded-xl focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-11 p-3.5 transition-colors placeholder:text-slate-500"
                            placeholder="Kata Sandi"
                            autoComplete="new-password"
                            required
                            onChange={(e) => setData('password', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.password} className="mt-2 text-red-400" />
                </div>

                <div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="bg-slate-900/50 border border-slate-700 text-white text-sm rounded-xl focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-11 p-3.5 transition-colors placeholder:text-slate-500"
                            placeholder="Konfirmasi Kata Sandi"
                            autoComplete="new-password"
                            required
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.password_confirmation} className="mt-2 text-red-400" />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white p-3.5 rounded-xl font-bold shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-indigo-400 transition-all active:scale-[0.98] disabled:opacity-70 mt-6 group"
                >
                    {processing ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            Buat Akun
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>

                <div className="mt-6 text-center text-sm text-slate-400">
                    Sudah punya akun?{' '}
                    <Link href={route('login')} className="text-white hover:text-indigo-400 font-bold transition-colors">
                        Masuk
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
