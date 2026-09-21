import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import MedicalRecords from './pages/MedicalRecords';
import AiAssistant from './pages/AiAssistant';
import HealthCenters from './pages/HealthCenters';
import Emergency from './pages/Emergency';
import HealthTips from './pages/HealthTips';
import Profile from './pages/Profile';
import PatientRecords from './pages/PatientRecords';
import Prescriptions from './pages/Prescriptions';
import VillageRecords from './pages/VillageRecords';
import Vaccinations from './pages/Vaccinations';
import HomeVisits from './pages/HomeVisits';
import Reports from './pages/Reports';
import ManageUsers from './pages/ManageUsers';
import ApproveDoctors from './pages/ApproveDoctors';
import AdminReports from './pages/AdminReports';
import NotFound from './pages/NotFound';

function App() {
  const { loading } = useAuth();

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Shared protected routes (available to any logged-in role) */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/ai-assistant" element={<ProtectedRoute><AiAssistant /></ProtectedRoute>} />
      <Route path="/appointments" element={<ProtectedRoute allowedRoles={['patient', 'doctor', 'admin']}><Appointments /></ProtectedRoute>} />

      {/* Patient-only routes */}
      <Route path="/records" element={<ProtectedRoute allowedRoles={['patient']}><MedicalRecords /></ProtectedRoute>} />
      <Route path="/health-centers" element={<ProtectedRoute allowedRoles={['patient']}><HealthCenters /></ProtectedRoute>} />
      <Route path="/emergency" element={<ProtectedRoute allowedRoles={['patient']}><Emergency /></ProtectedRoute>} />
      <Route path="/health-tips" element={<ProtectedRoute allowedRoles={['patient']}><HealthTips /></ProtectedRoute>} />

      {/* Doctor-only routes */}
      <Route path="/patient-records" element={<ProtectedRoute allowedRoles={['doctor']}><PatientRecords /></ProtectedRoute>} />
      <Route path="/prescriptions" element={<ProtectedRoute allowedRoles={['doctor', 'patient']}><Prescriptions /></ProtectedRoute>} />

      {/* Health worker-only routes */}
      <Route path="/village-records" element={<ProtectedRoute allowedRoles={['health_worker']}><VillageRecords /></ProtectedRoute>} />
      <Route path="/vaccinations" element={<ProtectedRoute allowedRoles={['health_worker']}><Vaccinations /></ProtectedRoute>} />
      <Route path="/home-visits" element={<ProtectedRoute allowedRoles={['health_worker']}><HomeVisits /></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute allowedRoles={['health_worker']}><Reports /></ProtectedRoute>} />

      {/* Admin-only routes */}
      <Route path="/manage-users" element={<ProtectedRoute allowedRoles={['admin']}><ManageUsers /></ProtectedRoute>} />
      <Route path="/approve-doctors" element={<ProtectedRoute allowedRoles={['admin']}><ApproveDoctors /></ProtectedRoute>} />
      <Route path="/admin-reports" element={<ProtectedRoute allowedRoles={['admin']}><AdminReports /></ProtectedRoute>} />

      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
