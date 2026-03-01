import { Head, useForm, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  ArrowLeft,
  Play,
  Download,
  Send,
  CheckCircle2,
  Loader2,
  Clock,
  XCircle,
  RefreshCw,
  Sparkles,
  MessageSquare,
  TrendingUp,
  ExternalLink,
  Video
} from 'lucide-react';

const statusConfig = {
  pending: { label: 'Menunggu', icon: Clock, color: 'bg-slate-100 text-slate-600', description: 'Menunggu untuk diproses...' },
  processing: { label: 'Diproses', icon: Loader2, color: 'bg-amber-100 text-amber-700', description: 'Vizard sedang menganalisis video Anda. Ini mungkin membutuhkan beberapa menit.' },
  completed: { label: 'Selesai', icon: CheckCircle2, color: 'bg-emerald-100 text-emerald-700', description: 'Semua klip siap!' },
  failed: { label: 'Gagal', icon: XCircle, color: 'bg-red-100 text-red-700', description: 'Terjadi kesalahan selama pemrosesan.' },
};

function ClipCard({ clip, index, hasTikTok, projectId }) {
  const [showPublish, setShowPublish] = useState(false);
  const { data, setData, post, processing, errors } = useForm({
    video_url: clip.videoUrl || '',
    caption: clip.title || '',
    project_id: projectId,
  });

  const handlePublish = (e) => {
    e.preventDefault();
    post(route('tiktok.publish'), {
      onSuccess: () => setShowPublish(false),
    });
  };

  const durationSec = clip.videoMsDuration ? Math.round(clip.videoMsDuration / 1000) : 0;
  const minutes = Math.floor(durationSec / 60);
  const seconds = durationSec % 60;
  const durationStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 hover:border-indigo-200 transition-all duration-300"
    >
      {/* Video player */}
      <div className="relative aspect-[9/16] max-h-[400px] bg-slate-900 overflow-hidden">
        {clip.videoUrl ? (
          <video
            className="w-full h-full object-contain"
            controls
            preload="metadata"
            poster={clip.coverUrl || ''}
          >
            <source src={clip.videoUrl} type="video/mp4" />
          </video>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-500">
            <Video className="w-12 h-12" />
          </div>
        )}

        {/* Duration badge */}
        <div className="absolute top-3 right-3 bg-slate-900/70 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
          <Play className="w-3 h-3 fill-current" />
          {durationStr}
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-bold text-base text-slate-900 mb-2 line-clamp-2 leading-tight">{clip.title || `Klip ${index + 1}`}</h3>

        {/* Viral score */}
        {clip.viralScore !== undefined && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">
              <TrendingUp className="w-3.5 h-3.5" />
              Viral Score: {clip.viralScore}/10
            </div>
          </div>
        )}

        {clip.viralReason && (
          <p className="text-xs text-slate-500 mb-4 line-clamp-2">{clip.viralReason}</p>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {clip.videoUrl && (
            <a
              href={clip.videoUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors"
            >
              <Download className="w-4 h-4" />
              Unduh
            </a>
          )}

          {hasTikTok && clip.videoUrl && (
            <button
              onClick={() => setShowPublish(!showPublish)}
              className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors"
            >
              <Send className="w-4 h-4" />
              TikTok
            </button>
          )}
        </div>

        {!hasTikTok && (
          <a
            href={route('tiktok.redirect')}
            className="mt-3 flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 border border-indigo-200 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-colors w-full"
          >
            <ExternalLink className="w-4 h-4" />
            Connect TikTok untuk Publikasi
          </a>
        )}

        {/* Publish Form */}
        {showPublish && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            onSubmit={handlePublish}
            className="mt-4 pt-4 border-t border-slate-100"
          >
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              <MessageSquare className="w-3.5 h-3.5 inline mr-1" />
              Keterangan & Tagar
            </label>
            <textarea
              value={data.caption}
              onChange={(e) => setData('caption', e.target.value)}
              maxLength={150}
              rows={3}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all resize-none"
              placeholder="Tulis keterangan..."
            />
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-slate-400">{data.caption.length}/150</span>
              <button
                type="submit"
                disabled={processing}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-indigo-500/25 active:scale-95 transition-all disabled:opacity-50"
              >
                {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                Publikasi
              </button>
            </div>
            {errors.tiktok && <p className="mt-2 text-sm text-red-500">{errors.tiktok}</p>}
          </motion.form>
        )}
      </div>
    </motion.div>
  );
}

export default function Show({ project, hasTikTok }) {
  const status = statusConfig[project.status] || statusConfig.pending;
  const StatusIcon = status.icon;
  const clips = project.clips || [];

  const handleRefresh = () => {
    router.post(route('projects.refresh', project.id));
  };

  return (
    <AppLayout
      header={
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href={route('dashboard')}
              className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-indigo-200 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {project.project_name || 'Proyek Tanpa Nama'}
              </h1>
              <p className="text-sm text-slate-500 font-medium truncate max-w-md">{project.youtube_url}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold ${status.color}`}>
              <StatusIcon className={`w-4 h-4 ${project.status === 'processing' ? 'animate-spin' : ''}`} />
              {status.label}
            </span>
            {project.status === 'processing' && (
              <button
                onClick={handleRefresh}
                className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm font-bold hover:bg-slate-50 hover:border-indigo-200 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                Cek Status
              </button>
            )}
          </div>
        </div>
      }
    >
      <Head title={project.project_name || 'Proyek'} />

      {/* Processing state */}
      {project.status === 'processing' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center mb-8"
        >
          <Loader2 className="w-10 h-10 text-amber-500 mx-auto mb-4 animate-spin" />
          <h3 className="text-lg font-bold text-amber-800 mb-2">Memproses Video Anda</h3>
          <p className="text-amber-600 font-medium">{status.description}</p>
          <p className="text-amber-500 text-sm mt-2">Klik "Cek Status" untuk melihat apakah klip sudah siap.</p>
        </motion.div>
      )}

      {/* Failed state */}
      {project.status === 'failed' && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center mb-8">
          <XCircle className="w-10 h-10 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-red-800 mb-2">Pemrosesan Gagal</h3>
          <p className="text-red-600 font-medium">Terjadi masalah saat memproses video Anda. Silakan coba lagi dengan URL yang berbeda.</p>
        </div>
      )}

      {/* Clips grid */}
      {clips.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            <h2 className="text-xl font-extrabold text-slate-900">{clips.length} Klip Dihasilkan</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {clips.map((clip, index) => (
              <ClipCard
                key={index}
                clip={clip}
                index={index}
                hasTikTok={hasTikTok}
                projectId={project.id}
              />
            ))}
          </div>
        </div>
      )}

      {/* No clips yet */}
      {clips.length === 0 && project.status === 'completed' && (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
          <Video className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-600 mb-2">Tidak ada klip yang dihasilkan</h3>
          <p className="text-slate-400 font-medium">Vizard tidak menghasilkan klip untuk video ini.</p>
        </div>
      )}
    </AppLayout>
  );
}
