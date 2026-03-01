import { Video, Twitter, Github } from "lucide-react";
import { Link } from '@inertiajs/react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-16">
      <div className="max-w-screen-xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 p-1.5 rounded-lg">
              <Video className="text-white w-5 h-5" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">ClipTube<span className="text-indigo-500">.</span></span>
          </div>
          <p className="text-sm font-medium text-slate-500 text-center md:text-left max-w-xs">
            Cara tercepat untuk mengekstrak, mengedit, dan membagikan momen terbaik dari video YouTube apa pun.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm font-semibold text-slate-600">
          <a className="hover:text-indigo-600 transition-colors cursor-pointer">Product</a>
          <a className="hover:text-indigo-600 transition-colors cursor-pointer">Pricing</a>
          <a className="hover:text-indigo-600 transition-colors cursor-pointer">API Documentation</a>
          <Link href={route('privacy.policy')} className="hover:text-indigo-600 transition-colors cursor-pointer">Privacy Policy</Link>
          <a className="hover:text-indigo-600 transition-colors cursor-pointer">Terms of Service</a>
        </div>

        <div className="flex flex-col items-center md:items-end gap-6">
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
              <Twitter className="w-5 h-5 fill-current" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors">
              <Github className="w-5 h-5 fill-current" />
            </a>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">© {new Date().getFullYear()} CLIPTUBE INC.</p>
        </div>
      </div>
    </footer>
  );
}
