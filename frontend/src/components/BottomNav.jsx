import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, Bot, Leaf, UserCircle } from 'lucide-react';

// Simplified bottom navigation bar shown only on mobile
const linksByRole = {
  patient: [
    { to: '/dashboard', label: 'Home', icon: LayoutDashboard, end: true },
    { to: '/appointments', label: 'Appts', icon: Calendar },
    { to: '/ai-assistant', label: 'AI Chat', icon: Bot },
    { to: '/health-tips', label: 'Tips', icon: Leaf },
    { to: '/profile', label: 'Profile', icon: UserCircle },
  ],
  doctor: [
    { to: '/dashboard', label: 'Home', icon: LayoutDashboard, end: true },
    { to: '/appointments', label: 'Appts', icon: Calendar },
    { to: '/ai-assistant', label: 'AI Chat', icon: Bot },
    { to: '/profile', label: 'Profile', icon: UserCircle },
  ],
  health_worker: [
    { to: '/dashboard', label: 'Home', icon: LayoutDashboard, end: true },
    { to: '/vaccinations', label: 'Vaccines', icon: Leaf },
    { to: '/home-visits', label: 'Visits', icon: Calendar },
    { to: '/profile', label: 'Profile', icon: UserCircle },
  ],
  admin: [
    { to: '/dashboard', label: 'Home', icon: LayoutDashboard, end: true },
    { to: '/manage-users', label: 'Users', icon: UserCircle },
    { to: '/admin-reports', label: 'Reports', icon: Leaf },
    { to: '/profile', label: 'Profile', icon: UserCircle },
  ],
};

const BottomNav = ({ role }) => {
  const links = linksByRole[role] || linksByRole.patient;
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around py-2 z-30">
      {links.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-2 py-1 text-xs ${isActive ? 'text-primary' : 'text-gray-400'}`
          }
        >
          <Icon size={20} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
