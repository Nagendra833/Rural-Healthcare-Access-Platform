import React, { useState } from 'react';
import { LogOut, Bell, Globe, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import { useOffline } from '../context/OfflineContext';
import { roleLabel } from '../utils/formatters';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { isOnline, queueCount, isSyncing, syncQueue } = useOffline();

  const [menuOpen, setMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all">
      <div className="flex items-center justify-between px-4 md:px-6 py-2.5">
        <div className="md:hidden">
          <p className="font-bold text-primary tracking-tight">RuralCare</p>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <p className="text-sm text-gray-500">
            {t('welcomeBack')},{' '}
            <span className="font-medium text-textmain">{user?.fullName || 'User'}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Offline/Online Status Badge */}
          <div className="flex items-center">
            {isOnline ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <Wifi size={12} />
                <span className="hidden sm:inline">Online</span>
              </span>
            ) : (
              <button
                onClick={syncQueue}
                disabled={isSyncing}
                title="Tap to sync once network restores"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-300 animate-pulse"
              >
                <WifiOff size={12} className="text-amber-600" />
                <span>
                  {queueCount > 0 ? `${queueCount} Queued` : 'Offline'}
                </span>
                {queueCount > 0 && (
                  <RefreshCw size={11} className={isSyncing ? 'animate-spin' : ''} />
                )}
              </button>
            )}
          </div>

          {/* Multilingual Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setLangMenuOpen((o) => !o);
                setMenuOpen(false);
                setNotifOpen(false);
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition active:scale-95"
              title="Change Language / भाषा बदलें"
            >
              <Globe size={14} className="text-primary" />
              <span className="font-semibold">{currentLang.native}</span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-elevated border border-gray-100 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 border-b border-gray-100 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  Select Language
                </div>
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition ${
                      language === lang.code
                        ? 'bg-accent text-primary font-bold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>{lang.native}</span>
                    <span className="text-[11px] text-gray-400">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifOpen((o) => !o);
                setMenuOpen(false);
                setLangMenuOpen(false);
              }}
              className="p-1.5 rounded-lg text-gray-500 hover:text-primary hover:bg-accent/40 transition relative"
            >
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-elevated border border-gray-100 p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-2">
                  <p className="text-xs font-bold text-gray-700">Notifications</p>
                  <span className="text-[10px] text-primary font-medium">Clear</span>
                </div>
                <div className="space-y-2">
                  <div className="text-xs p-2 rounded-lg bg-emerald-50 text-emerald-800">
                    <p className="font-semibold">Vaccination Camp Tomorrow</p>
                    <p className="text-[11px] text-emerald-600 mt-0.5">Primary Health Sub-centre, 9:00 AM</p>
                  </div>
                  <div className="text-xs p-2 rounded-lg bg-gray-50 text-gray-700">
                    <p className="font-semibold">Medicine Reminder</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">Time to take your afternoon prescription</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => {
                setMenuOpen((o) => !o);
                setLangMenuOpen(false);
                setNotifOpen(false);
              }}
              className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-xs shadow-sm hover:opacity-90 active:scale-95 transition"
            >
              {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-elevated border border-gray-100 py-1.5 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800 truncate">{user?.fullName}</p>
                  <p className="text-xs text-gray-500">{roleLabel(user?.role)}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut size={14} /> {t('logout', 'Log Out')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
