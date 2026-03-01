import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
  Video,
  LayoutDashboard,
  FolderOpen,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Plug
} from 'lucide-react';

export default function AppLayout({ children, header }) {
  const { auth } = usePage().props;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: route('dashboard'), icon: LayoutDashboard, current: route().current('dashboard') },
    { name: 'Integrasi', href: route('integrations'), icon: Plug, current: route().current('integrations') },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-72 bg-white shadow-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-2 rounded-xl shadow-lg shadow-indigo-500/30">
                  <Video className="text-white w-5 h-5" strokeWidth={2.5} />
                </div>
                <span className="text-xl font-extrabold tracking-tight text-slate-900">ClipTube<span className="text-indigo-500">.</span></span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex-1 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${item.current
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:w-72 lg:flex-col bg-white border-r border-slate-200">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-2 rounded-xl shadow-lg shadow-indigo-500/30">
              <Video className="text-white w-5 h-5" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">ClipTube<span className="text-indigo-500">.</span></span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${item.current
                ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* User section */}
        <div className="p-4 mt-auto">
          <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-colors group/user">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-500/20 rotate-3 transition-transform group-hover/user:rotate-0">
                  <div className="-rotate-3 transition-transform group-hover/user:rotate-0">
                    {auth.user.name.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate tracking-tight">{auth.user.name}</p>
                <p className="text-xs text-slate-500 truncate font-medium">{auth.user.email}</p>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 pt-3 border-t border-slate-200/60">
              <Link
                href={route('profile.edit')}
                className="flex items-center gap-2.5 px-3 py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-white rounded-xl transition-all shadow-sm group"
              >
                <div className="p-1.5 rounded-lg bg-slate-200/50 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors text-slate-500">
                  <User className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                </div>
                Profil Saya
              </Link>
              <Link
                href={route('logout')}
                method="post"
                as="button"
                className="flex items-center gap-2.5 px-3 py-2 text-sm font-semibold text-slate-600 hover:text-red-600 hover:bg-white rounded-xl transition-all shadow-sm w-full text-left group"
              >
                <div className="p-1.5 rounded-lg bg-slate-200/50 group-hover:bg-red-50 group-hover:text-red-600 transition-colors text-slate-500">
                  <LogOut className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                </div>
                Keluar Aplikasi
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-72 min-h-screen flex flex-col">
        {/* Top bar (mobile) */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <button onClick={() => setSidebarOpen(true)} className="text-slate-600 hover:text-slate-900">
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-1.5 rounded-lg">
                <Video className="text-white w-4 h-4" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-slate-900">ClipTube<span className="text-indigo-500">.</span></span>
            </div>
            <div className="relative">
              <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs">
                {auth.user.name.charAt(0).toUpperCase()}
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                  <Link href={route('profile.edit')} className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">Profil</Link>
                  <Link href={route('logout')} method="post" as="button" className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Keluar</Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page header */}
        {header && (
          <div className="px-6 lg:px-10 pt-8 pb-4">
            {header}
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 px-6 lg:px-10 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
