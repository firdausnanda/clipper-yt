import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Welcome/Navbar';
import Footer from '@/Components/Welcome/Footer';
import { motion } from 'framer-motion';
import { Shield, Lock, FileText, Database, UserCheck } from 'lucide-react';

export default function PrivacyPolicy({ auth }) {
  return (
    <>
      <Head title="Kebijakan Privasi | ClipTube" />
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
                <Shield className="w-10 h-10 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-2">Kebijakan Privasi</h1>
                <p className="text-slate-500 font-medium text-lg">Terakhir Diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>

            <div className="text-slate-600 text-lg leading-relaxed space-y-12">
              <p className="text-xl font-medium text-slate-700">
                ClipTube sangat menghargai privasi Anda. Dokumen ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data Anda saat menggunakan layanan kami.
              </p>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-50 p-2 rounded-xl">
                    <Database className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">1. Data yang Kami Kumpulkan</h2>
                </div>
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <p className="mb-4">
                    Aplikasi ini menggunakan otorisasi OAuth dari platform pihak ketiga seperti TikTok. Kami hanya mengumpulkan token akses sementara yang diberikan oleh platform tersebut agar aplikasi dapat berfungsi secara optimal.
                  </p>
                  <div className="flex items-start gap-3 bg-indigo-50 text-indigo-800 p-4 rounded-xl">
                    <Lock className="w-5 h-5 shrink-0 mt-0.5 text-indigo-600" />
                    <p className="font-semibold text-sm">
                      Kami tidak pernah melihat, meminta, membagikan, atau menyimpan kata sandi akun pihak ketiga Anda.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-emerald-50 p-2 rounded-xl">
                    <FileText className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">2. Penggunaan Data</h2>
                </div>
                <p className="mb-4">
                  Akses yang Anda berikan hanya digunakan secara spesifik untuk memfasilitasi fungsionalitas inti dari aplikasi, yang meliputi:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                    <span>Mengekstrak klip video dari tautan YouTube yang Anda berikan.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                    <span>Mengunggah video hasil potongan secara langsung ke draf atau feed akun TikTok Anda, sesuai dengan instruksi yang Anda berikan.</span>
                  </li>
                </ul>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-pink-50 p-2 rounded-xl">
                    <UserCheck className="w-6 h-6 text-pink-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">3. Penghapusan Akses</h2>
                </div>
                <div className="bg-white border-2 border-slate-100 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-pink-500"></div>
                  <p className="mb-4">
                    Anda memiliki kendali penuh atas akun Anda dan dapat mencabut akses aplikasi ini kapan saja. Hal ini dapat dilakukan melalui halaman Integrasi pada Dasbor kami, atau mengatur keamanan secara langsung di dalam aplikasi TikTok Anda.
                  </p>
                  <p className="font-medium text-slate-800">
                    Setelah akses dicabut, sesi serta data token Anda akan segera dibersihkan dari layanan kami.
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
