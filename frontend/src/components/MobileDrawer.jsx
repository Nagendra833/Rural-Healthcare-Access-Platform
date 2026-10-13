import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  X,
  LayoutDashboard,
  Calendar,
  FileText,
  Bot,
  MapPin,
  Phone,
  Leaf,
  UserCircle,
  Users,
  Syringe,
  Home,
  ClipboardList,
  Stethoscope,
  ShieldCheck,
  LogOut,
  Globe,
  Wifi,
  WifiOff,
  PhoneCall,
  HeartPulse,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import { useOffline } from '../context/OfflineContext';
import { roleLabel } from '../utils/formatters';

const linksByRole = {
  patient: [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/appointments', label: 'AI Consultations', icon: Calendar },
    { to: '/records', label: 'Medical History', icon: FileText },
    { to: '/prescriptions', label: 'Prescriptions & QR', icon: Stethoscope },
    { to: '/ai-assistant', label: 'AI Health Companion', icon: Bot },
    { to: '/health-centers', label: 'Nearby Health Centers', icon: MapPin },
    { to: '/emergency', label: 'Emergency Contacts', icon: Phone },
    { to: '/health-tips', label: 'Health Tips', icon: Leaf },
    { to: '/profile', label: 'Profile Settings', icon: UserCircle },
  ],
  doctor: [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/appointments', label: "Today's Appointments", icon: Calendar },
    { to: '/patient-records', label: 'Patient Records', icon: Users },
    { to: '/prescriptions', label: 'Issue Prescriptions', icon: Stethoscope },
    { to: '/ai-assistant', label: 'AI Medical Assistant', icon: Bot },
    { to: '/profile', label: 'Profile Settings', icon: UserCircle },
  ],
  health_worker: [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/village-records', label: 'Village Health Records', icon: ClipboardList },
    { to: '/vaccinations', label: 'Vaccination Tracking', icon: Syringe },
    { to: '/home-visits', label: 'Home Visit Scheduler', icon: Home },
    { to: '/reports', label: 'Report Submission', icon: FileText },
    { to: '/profile', label: 'Profile Settings', icon: UserCircle },
  ],
  admin: [
    { to: '/dashboard', label: 'Analytics Dashboard', icon: LayoutDashboard, end: true },
    { to: '/manage-users', label: 'Manage Users', icon: Users },
    { to: '/approve-doctors', label: 'Approve Doctors', icon: ShieldCheck },
    { to: '/admin-reports', label: 'Reports Dashboard', icon: FileText },
    { to: '/profile', label: 'Profile Settings', icon: UserCircle },
  ],
};

const MobileDrawer = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { isOnline, queueCount } = useOffline();

  if (!isOpen) return null;

  const links = linksByRole[user?.role] || linksByRole.patient;

  const handleLogout = async () => {
    onClose();
    await logout();
    window.location.href = '/login';
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div className="fixed inset-y-0 left-0 w-[85%] max-w-xs bg-white shadow-2xl flex flex-col z-10 transition-transform duration-300 ease-in-out transform translate-x-0">
        {/* Drawer Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-surface/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center shadow-soft">
              <HeartPulse size={20} />
            </div>
            <div>
              <p className="font-bold text-base text-primary leading-tight">RuralCare</p>
              <p className="text-[11px] text-gray-500 font-medium">Healthcare Access</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition active:scale-95"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* User Card */}
        <div className="p-4 bg-accent/30 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0">
              {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-sm text-gray-900 truncate">{user?.fullName || 'User'}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[11px] font-semibold text-primary uppercase tracking-wide">
                  {roleLabel(user?.role)}
                </span>
                <span className="text-gray-300">•</span>
                <span className="inline-flex items-center gap-1 text-[11px] text-gray-500">
                  {isOnline ? (
                    <span className="text-emerald-600 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Online
                    </span>
                  ) : (
                    <span className="text-amber-600 font-medium flex items-center gap-1">
                      <WifiOff size={11} /> {queueCount > 0 ? `${queueCount} Queued` : 'Offline'}
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Quick SOS Emergency Call for Patients */}
          {user?.role === 'patient' && (
            <a
              href="tel:108"
              className="mt-3 w-full py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-emergencyGlow active:scale-98 transition"
            >
              <PhoneCall size={14} className="animate-pulse" />
              <span>EMERGENCY: DIAL 108 SOS</span>
            </a>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
          <p className="px-3 py-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            Menu Navigation
          </p>
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-soft font-semibold'
                    : 'text-gray-700 hover:bg-accent/60 active:scale-[0.98]'
                }`
              }
            >
              <Icon size={19} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Language Switcher in Drawer */}
        <div className="px-4 py-3 border-t border-gray-100 bg-surface/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
              <Globe size={14} className="text-primary" /> {t('selectLanguage', 'App Language')}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`py-1 px-1.5 rounded-lg text-xs font-medium text-center transition ${
                  language === lang.code
                    ? 'bg-primary text-white font-bold shadow-xs'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {lang.native}
              </button>
            ))}
          </div>
        </div>

        {/* Footer Logout */}
        <div className="p-3 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 active:scale-98 transition"
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileDrawer;
