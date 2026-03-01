import { Link } from '@inertiajs/react';
import { Video } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-900 flex flex-col sm:justify-center items-center pt-6 sm:pt-0 relative overflow-hidden font-sans">
            {/* Background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/30 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-pink-600/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-[40%] left-[60%] w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="z-10 mb-8"
            >
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-3 rounded-2xl shadow-xl shadow-indigo-500/30 group-hover:scale-110 transition-transform">
                        <Video className="text-white w-7 h-7" strokeWidth={2.5} />
                    </div>
                    <span className="text-3xl font-extrabold tracking-tight text-white drop-shadow-sm">
                        ClipTube<span className="text-indigo-400">.</span>
                    </span>
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="w-full sm:max-w-md mt-2 px-8 py-10 bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl sm:rounded-3xl z-10"
            >
                {children}
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-slate-400 text-sm z-10"
            >
                &copy; {new Date().getFullYear()} ClipTube. All rights reserved.
            </motion.div>
        </div>
    );
}
