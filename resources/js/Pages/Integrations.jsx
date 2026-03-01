import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  ExternalLink,
  Unplug,
  Music2,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

export default function Integrations({ hasTikTok }) {
  const { flash } = usePage().props;

  return (
    <AppLayout
      header={
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Integrasi</h1>
          <p className="text-slate-500 font-medium mt-1">Hubungkan akun media sosial Anda untuk mempublikasikan klip secara langsung.</p>
        </div>
      }
    >
      <Head title="Integrasi" />

      {/* Flash messages */}
      {flash?.success && (
        <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-4 rounded-2xl text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          {flash.success}
        </div>
      )}
      {flash?.error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl text-sm font-semibold flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {flash.error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* TikTok Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/5 rounded-full"></div>
            <div className="absolute -right-2 -bottom-8 w-32 h-32 bg-white/5 rounded-full"></div>
            <div className="relative z-10 flex items-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/10">
                <Music2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-white font-extrabold text-xl tracking-tight">TikTok</h3>
                <p className="text-slate-400 text-sm font-medium">Content Publishing</p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            {/* Status */}
            <div className="flex items-center gap-2 mb-4">
              {hasTikTok ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Connected
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-500 rounded-full text-xs font-bold border border-slate-200">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Belum Terhubung
                </span>
              )}
            </div>

            <p className="text-sm text-slate-500 font-medium mb-6 leading-relaxed">
              Publikasikan klip bertenaga AI Anda langsung ke TikTok. Hubungkan akun Anda untuk mulai berbagi konten secara instan.
            </p>

            {/* Permissions */}
            <div className="mb-6 space-y-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Izin</p>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <ShieldCheck className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                <span className="font-medium">Informasi akun dasar</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <ShieldCheck className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                <span className="font-medium">Unggah & publikasi video</span>
              </div>
            </div>

            {/* Action */}
            {hasTikTok ? (
              <Link
                href={route('tiktok.disconnect')}
                method="delete"
                as="button"
                className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 border border-red-200 px-5 py-3 rounded-xl text-sm font-bold hover:bg-red-100 hover:border-red-300 active:scale-[0.98] transition-all"
              >
                <Unplug className="w-4 h-4" />
                Putuskan TikTok
              </Link>
            ) : (
              <a
                href={route('tiktok.redirect')}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl text-sm font-bold shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-0.5 active:scale-[0.98] transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                Hubungkan TikTok
              </a>
            )}
          </div>
        </motion.div>

        {/* Coming Soon - Instagram */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-2xl border border-dashed border-slate-300 overflow-hidden opacity-60"
        >
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full"></div>
            <div className="relative z-10 flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl border border-white/20">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </div>
              <div>
                <h3 className="text-white font-extrabold text-xl tracking-tight">Instagram Reels</h3>
                <p className="text-white/70 text-sm font-medium">Segera Hadir</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <p className="text-sm text-slate-400 font-medium">Integrasi Instagram Reels akan tersedia di pembaruan mendatang.</p>
          </div>
        </motion.div>

        {/* Coming Soon - YouTube Shorts */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white rounded-2xl border border-dashed border-slate-300 overflow-hidden opacity-60"
        >
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full"></div>
            <div className="relative z-10 flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl border border-white/20">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </div>
              <div>
                <h3 className="text-white font-extrabold text-xl tracking-tight">YouTube Shorts</h3>
                <p className="text-white/70 text-sm font-medium">Segera Hadir</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <p className="text-sm text-slate-400 font-medium">Integrasi YouTube Shorts akan tersedia di pembaruan mendatang.</p>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
