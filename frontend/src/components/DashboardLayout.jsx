import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import MobileDrawer from './MobileDrawer';
import Footer from './Footer';
import { useAuth } from '../hooks/useAuth';

// Shared shell for all authenticated pages: sidebar (desktop) + bottom nav (mobile) + drawer + navbar
const DashboardLayout = ({ children }) => {
  const { user } = useAuth();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-accent">
      <Sidebar role={user?.role} />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onOpenMenu={() => setMobileDrawerOpen(true)} />
        <main className="flex-1 p-3.5 sm:p-5 md:p-6 pb-24 md:pb-6">{children}</main>
        <Footer />
      </div>
      <BottomNav
        role={user?.role}
        onOpenMenu={() => setMobileDrawerOpen(true)}
      />
      <MobileDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
      />
    </div>
  );
};

export default DashboardLayout;
