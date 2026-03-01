import { Head, useForm, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { motion } from 'framer-motion';
import {
    LinkIcon,
    Scissors,
    Loader2,
    CheckCircle2,
    XCircle,
    Clock,
    ArrowRight,
    ExternalLink,
    Unplug,
    Video
} from 'lucide-react';

const statusConfig = {
    pending: { label: 'Menunggu', icon: Clock, color: 'bg-slate-100 text-slate-600' },
    processing: { label: 'Diproses', icon: Loader2, color: 'bg-amber-100 text-amber-700' },
    completed: { label: 'Selesai', icon: CheckCircle2, color: 'bg-emerald-100 text-emerald-700' },
    failed: { label: 'Gagal', icon: XCircle, color: 'bg-red-100 text-red-700' },
};

function ProjectCard({ project }) {
    const status = statusConfig[project.status] || statusConfig.pending;
    const StatusIcon = status.icon;
    const clipCount = project.clips ? project.clips.length : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
        >
            <Link
                href={route('projects.show', project.id)}
                className="block bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:shadow-indigo-100/50 hover:border-indigo-200 transition-all duration-300 group"
            >
                <div className="flex items-start justify-between mb-4">
                    <div className="bg-slate-100 p-2.5 rounded-xl group-hover:bg-indigo-50 transition-colors">
                        <Video className="w-5 h-5 text-slate-600 group-hover:text-indigo-600 transition-colors" />
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${status.color}`}>
                        <StatusIcon className={`w-3.5 h-3.5 ${project.status === 'processing' ? 'animate-spin' : ''}`} />
                        {status.label}
                    </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 mb-1 truncate group-hover:text-indigo-600 transition-colors">
                    {project.project_name || 'Proyek Tanpa Nama'}
                </h3>
                <p className="text-sm text-slate-500 truncate mb-4">{project.youtube_url}</p>

                <div className="flex items-center justify-between text-xs font-medium text-slate-400">
                    <span>{clipCount} klip</span>
                    <span className="flex items-center gap-1 group-hover:text-indigo-500 transition-colors">
                        Lihat <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                </div>
            </Link>
        </motion.div>
    );
}

export default function Dashboard({ projects, hasTikTok }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        youtube_url: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('projects.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout
            header={
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
                    <p className="text-slate-500 font-medium mt-1">Kirim video YouTube dan kelola klip Anda.</p>
                </div>
            }
        >
            <Head title="Dashboard" />

            {/* Submit Form */}
            <div className="mb-10">
                <form onSubmit={submit}>
                    <div className="flex flex-col md:flex-row gap-3 p-3 bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200">
                        <div className="flex items-center flex-1 px-5 bg-slate-50 rounded-xl border border-slate-100">
                            <LinkIcon className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
                            <input
                                type="text"
                                value={data.youtube_url}
                                onChange={(e) => setData('youtube_url', e.target.value)}
                                className="w-full border-none focus:outline-none focus:ring-0 py-4 text-base bg-transparent text-slate-800 placeholder:text-slate-400"
                                placeholder="Tempel URL YouTube Anda di sini..."
                                disabled={processing}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={processing || !data.youtube_url}
                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-10 py-4 text-base font-bold rounded-xl hover:from-indigo-500 hover:to-indigo-400 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                        >
                            {processing ? (
                                <><Loader2 className="w-5 h-5 animate-spin" /> Mengirim...</>
                            ) : (
                                <><Scissors className="w-5 h-5" /> Buat Klip</>
                            )}
                        </button>
                    </div>
                    {errors.youtube_url && (
                        <p className="mt-3 text-sm text-red-600 font-medium">{errors.youtube_url}</p>
                    )}
                </form>
            </div>

            {/* Projects Grid */}
            {projects.data && projects.data.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.data.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                    <Video className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-slate-600 mb-2">Belum ada proyek</h3>
                    <p className="text-slate-400 font-medium">Tempel URL YouTube di atas untuk membuat proyek klip pertama Anda.</p>
                </div>
            )}

            {/* Pagination */}
            {projects.links && projects.last_page > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                    {projects.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url || '#'}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${link.active
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                                : link.url
                                    ? 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                                    : 'text-slate-300 cursor-not-allowed'
                                }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </AppLayout>
    );
}
