import React from 'react';
import { Users, Stethoscope, Calendar, HeartHandshake, ShieldAlert } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import DashboardLayout from '../components/DashboardLayout';
import DashboardCard from '../components/DashboardCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useFetch } from '../hooks/useFetch';
import { getAnalytics } from '../services/adminService';

const AdminDashboard = () => {
  const { data, loading } = useFetch(getAnalytics, []);
  const analytics = data?.analytics;

  const chartData = (analytics?.appointmentsByStatus || []).map((item) => ({
    status: item._id,
    count: item.count,
  }));

  return (
    <DashboardLayout>
      <h2 className="text-lg font-semibold mb-5">Dashboard Analytics</h2>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <DashboardCard icon={Users} label="Total Patients" value={analytics?.totalPatients ?? 0} />
            <DashboardCard icon={Stethoscope} label="Total Doctors" value={analytics?.totalDoctors ?? 0} accentColor="text-blue-600" />
            <DashboardCard icon={HeartHandshake} label="Health Workers" value={analytics?.totalHealthWorkers ?? 0} accentColor="text-teal-600" />
            <DashboardCard icon={Calendar} label="Total Appointments" value={analytics?.totalAppointments ?? 0} accentColor="text-purple-600" />
            <DashboardCard icon={ShieldAlert} label="Pending Approvals" value={analytics?.pendingDoctorApprovals ?? 0} accentColor="text-red-600" />
          </div>

          <div className="card">
            <h3 className="font-semibold mb-4">Appointments by Status</h3>
            {chartData.length === 0 ? (
              <p className="text-sm text-gray-500">No appointment data yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E8F5E9" />
                  <XAxis dataKey="status" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#2E7D32" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboard;
