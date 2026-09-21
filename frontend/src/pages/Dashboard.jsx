import React from 'react';
import { useAuth } from '../hooks/useAuth';
import PatientDashboard from './PatientDashboard';
import DoctorDashboard from './DoctorDashboard';
import HealthWorkerDashboard from './HealthWorkerDashboard';
import AdminDashboard from './AdminDashboard';
import LoadingSpinner from '../components/LoadingSpinner';

// Renders the correct dashboard based on the logged-in user's role
const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading || !user) return <LoadingSpinner fullScreen />;

  switch (user.role) {
    case 'doctor':
      return <DoctorDashboard />;
    case 'health_worker':
      return <HealthWorkerDashboard />;
    case 'admin':
      return <AdminDashboard />;
    case 'patient':
    default:
      return <PatientDashboard />;
  }
};

export default Dashboard;
