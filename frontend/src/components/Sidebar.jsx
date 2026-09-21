import React from 'react';
import { NavLink } from 'react-router-dom';
import {
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
} from 'lucide-react';

const linksByRole = {
  patient: [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/appointments', label: 'Appointments', icon: Calendar },
    { to: '/records', label: 'Medical History', icon: FileText },
    { to: '/ai-assistant', label: 'AI Health Assistant', icon: Bot },
    { to: '/health-centers', label: 'Nearby Health Centers', icon: MapPin },
    { to: '/emergency', label: 'Emergency Contacts', icon: Phone },
    { to: '/health-tips', label: 'Health Tips', icon: Leaf },
    { to: '/profile', label: 'Profile Settings', icon: UserCircle },
  ],
  doctor: [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/appointments', label: "Today's Appointments", icon: Calendar },
    { to: '/patient-records', label: 'Patient Records', icon: Users },
    { to: '/prescriptions', label: 'Prescriptions', icon: Stethoscope },
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
    { to: '/dashboard', label: 'Analytics', icon: LayoutDashboard, end: true },
    { to: '/manage-users', label: 'Manage Users', icon: Users },
    { to: '/approve-doctors', label: 'Approve Doctors', icon: ShieldCheck },
    { to: '/admin-reports', label: 'Reports Dashboard', icon: FileText },
    { to: '/profile', label: 'Profile Settings', icon: UserCircle },
  ],
};

const Sidebar = ({ role }) => {
  const links = linksByRole[role] || linksByRole.patient;

  return (
    <aside className="hidden md:flex md:flex-col w-64 shrink-0 bg-white border-r border-gray-100 min-h-screen sticky top-0">
      <div className="px-6 py-5 border-b border-gray-100">
        <p className="font-bold text-lg text-primary leading-tight">Rural Healthcare</p>
        <p className="text-xs text-gray-500">Access Platform</p>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-primary text-white' : 'text-textmain hover:bg-accent'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
