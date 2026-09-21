import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import Footer from './Footer';
import { useAuth } from '../hooks/useAuth';

// Shared shell for all authenticated pages: sidebar (desktop) + bottom nav (mobile) + navbar
const DashboardLayout = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-accent">
      <Sidebar role={user?.role} />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">{children}</main>
        <Footer />
      </div>
      <BottomNav role={user?.role} />
    </div>
  );
};

export default DashboardLayout;
