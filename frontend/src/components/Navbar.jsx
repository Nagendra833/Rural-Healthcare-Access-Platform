import React, { useState } from 'react';
import { LogOut, Menu, X, Bell } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { roleLabel } from '../utils/formatters';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100">
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        <div className="md:hidden">
          <p className="font-bold text-primary">Rural Healthcare</p>
        </div>
        <div className="hidden md:block">
          <p className="text-sm text-gray-500">
            Welcome back, <span className="font-medium text-textmain">{user?.fullName}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="text-gray-400 hover:text-primary relative">
            <Bell size={20} />
          </button>

          <div className="relative">
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm"
            >
              {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-soft border border-gray-100 py-2 z-40">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium">{user?.fullName}</p>
                  <p className="text-xs text-gray-500">{roleLabel(user?.role)}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-accent"
                >
                  <LogOut size={15} /> Logout
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
