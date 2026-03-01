import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Welcome/Navbar';
import Footer from '@/Components/Welcome/Footer';
import { motion } from 'framer-motion';
import { Scale, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function TermsOfService({ auth }) {
  return (
    <>
      <Head title="Syarat Layanan | ClipTube" />
      <div className="bg-slate-50 min-h-screen font-sans selection:bg-indigo-200 selection:text-indigo-900 flex flex-col">
        <Navbar auth={auth} />

        <main className="flex-grow max-w-4xl mx-auto px-6 py-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-14"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10 pb-8 border-b border-slate-100">
              <div className="bg-indigo-50 w-20 h-20 rounded-[1.5rem] flex items-center justify-center shrink-0">
                <Scale className="w-10 h-10 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-2">Syarat Layanan</h1>
                <p className="text-slate-500 font-medium text-lg">Masa Pengembangan Aplikasi (Development Phase)</p>
              </div>
            </div>

            <div className="text-slate-600 text-lg leading-relaxed space-y-12">
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-amber-50 p-2 rounded-xl">
                    <AlertTriangle className="w-6 h-6 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">1. Status Pengembangan</h2>
                </div>
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <p className="mb-4">
                    Harap diperhatikan bahwa aplikasi <strong>ClipTube saat ini sedang dalam masa pengembangan aktif (Development Phase)</strong>.
                  </p>
                  <div className="flex items-start gap-3 bg-amber-50 text-amber-800 p-4 rounded-xl border border-amber-100">
                    <Info className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
                    <p className="font-semibold text-sm">
                      Fitur, performa, dan ketersediaan layanan dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya. Pengguna mungkin mengalami ketidakstabilan sistem selama masa ini.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-emerald-50 p-2 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">2. Persetujuan Penggunaan</h2>
                </div>
                <p className="mb-4">
                  Dengan mengakses dan menggunakan aplikasi ini, Anda setuju untuk:
                </p>
                <ul className="space-y-3 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5 shrink-0"></div>
                    <span>Mengizinkan sistem kami memproses video YouTube berdasarkan tautan yang Anda berikan.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5 shrink-0"></div>
                    <span>Mengabaikan pembatasan masa pengembangan dan membebaskan pengembang dari segala tuntutan jika terjadi kehilangan data atau kegagalan proses.</span>
                  </li>
                </ul>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-purple-50 p-2 rounded-xl">
                    <Info className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">3. Ketentuan Platform Pihak Ketiga</h2>
                </div>
                <div className="bg-white border-2 border-slate-100 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-purple-500"></div>
                  <p className="mb-4">
                    Penggunaan fitur publikasi mematuhi aturan dan pedoman pihak ketiga (<a href="https://www.tiktok.com/legal/terms-of-service" target="_blank" rel="noreferrer" className="text-indigo-600 font-bold hover:underline">Ketentuan Layanan TikTok</a>).
                  </p>
                  <p className="font-medium text-slate-800">
                    Dengan memberikan izin otorisasi OAuth, Anda memberikan hak kepada ClipTube untuk mengunggah konten atas nama Anda sesuai dengan batasan akses yang telah disetujui.
                  </p>
                </div>
              </section>
            </div>
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
}
