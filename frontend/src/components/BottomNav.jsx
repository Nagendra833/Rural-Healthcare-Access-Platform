import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Bot,
  Leaf,
  UserCircle,
  Menu,
  Stethoscope,
  Users,
  Syringe,
  Home,
  ClipboardList,
  ShieldCheck,
  FileText,
} from 'lucide-react';

// Responsive bottom navigation bar shown only on mobile with full Menu drawer integration
const linksByRole = {
  patient: [
    { to: '/dashboard', label: 'Home', icon: LayoutDashboard, end: true },
    { to: '/appointments', label: 'Appts', icon: Calendar },
    { to: '/ai-assistant', label: 'AI Chat', icon: Bot },
    { to: '/health-tips', label: 'Tips', icon: Leaf },
    { isMenu: true, label: 'Menu', icon: Menu },
  ],
  doctor: [
    { to: '/dashboard', label: 'Home', icon: LayoutDashboard, end: true },
    { to: '/appointments', label: 'Appts', icon: Calendar },
    { to: '/patient-records', label: 'Patients', icon: Users },
    { to: '/prescriptions', label: 'Rx', icon: Stethoscope },
    { isMenu: true, label: 'Menu', icon: Menu },
  ],
  health_worker: [
    { to: '/dashboard', label: 'Home', icon: LayoutDashboard, end: true },
    { to: '/vaccinations', label: 'Vaccines', icon: Syringe },
    { to: '/home-visits', label: 'Visits', icon: Home },
    { to: '/village-records', label: 'Village', icon: ClipboardList },
    { isMenu: true, label: 'Menu', icon: Menu },
  ],
  admin: [
    { to: '/dashboard', label: 'Home', icon: LayoutDashboard, end: true },
    { to: '/manage-users', label: 'Users', icon: Users },
    { to: '/approve-doctors', label: 'Approvals', icon: ShieldCheck },
    { to: '/admin-reports', label: 'Reports', icon: FileText },
    { isMenu: true, label: 'Menu', icon: Menu },
  ],
};

const BottomNav = ({ role, onOpenMenu }) => {
  const links = linksByRole[role] || linksByRole.patient;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 flex items-center justify-around py-1.5 px-2 z-40 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-lg">
      {links.map((item) => {
        const Icon = item.icon;

        if (item.isMenu) {
          return (
            <button
              key="mobile-drawer-trigger"
              onClick={onOpenMenu}
              className="flex flex-col items-center justify-center gap-0.5 px-2 py-1 text-xs text-gray-500 hover:text-primary active:scale-90 transition min-w-[54px]"
              aria-label="Open full menu"
            >
              <div className="p-1 rounded-lg">
                <Icon size={20} />
              </div>
              <span className="text-[10px] font-medium leading-none">{item.label}</span>
            </button>
          );
        }

        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-0.5 px-2 py-1 text-xs transition min-w-[54px] active:scale-95 ${
                isActive ? 'text-primary font-bold' : 'text-gray-400 hover:text-gray-600'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-1 rounded-xl transition ${isActive ? 'bg-accent text-primary' : ''}`}>
                  <Icon size={20} />
                </div>
                <span className="text-[10px] font-medium leading-none">{item.label}</span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default BottomNav;
