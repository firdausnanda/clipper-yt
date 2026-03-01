import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Masuk" />

            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Selamat Datang Kembali</h2>
                <p className="text-slate-400 text-sm">Masuk untuk terus membuat klip viral.</p>
            </div>

            {status && (
                <div className="mb-6 text-sm font-medium text-emerald-400 bg-emerald-400/10 p-4 rounded-xl border border-emerald-400/20 text-center">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
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
                            autoFocus
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
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.password} className="mt-2 text-red-400" />
                </div>

                <div className="flex items-center justify-between mt-4">
                    <label className="flex items-center cursor-pointer group">
                        <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-900 transition-colors"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ml-2 text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Ingat saya</span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                        >
                            Lupa kata sandi?
                        </Link>
                    )}
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
                            Masuk
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>

                <div className="mt-6 text-center text-sm text-slate-400">
                    Belum punya akun?{' '}
                    <Link href={route('register')} className="text-white hover:text-indigo-400 font-bold transition-colors">
                        Buat akun
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
