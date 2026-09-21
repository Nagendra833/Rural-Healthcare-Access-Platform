import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FileText, Bot, MapPin, Phone, Leaf, ArrowRight } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import DashboardCard from '../components/DashboardCard';
import AppointmentCard from '../components/AppointmentCard';
import HealthTipCard from '../components/HealthTipCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';
import { useFetch } from '../hooks/useFetch';
import { getAppointments } from '../services/appointmentService';
import { getTips } from '../services/tipService';

const PatientDashboard = () => {
  const { user } = useAuth();
  const { data: apptData, loading: apptLoading } = useFetch(getAppointments, []);
  const { data: tipData, loading: tipLoading } = useFetch(() => getTips(), []);

  const upcoming = (apptData?.appointments || []).filter((a) => ['pending', 'confirmed', 'rescheduled'].includes(a.status));

  return (
    <DashboardLayout>
      <div className="card bg-primary text-white mb-6">
        <h2 className="text-xl font-semibold">Welcome, {user?.fullName?.split(' ')[0]} 👋</h2>
        <p className="text-sm text-white/90 mt-1">Here's an overview of your health at a glance.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <DashboardCard icon={Calendar} label="Upcoming Appointments" value={upcoming.length} />
        <DashboardCard icon={FileText} label="Medical Records" value="View" accentColor="text-blue-600" />
        <DashboardCard icon={Bot} label="AI Assistant" value="Ask" accentColor="text-purple-600" />
        <DashboardCard icon={Phone} label="Emergency" value="108" accentColor="text-red-600" />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Upcoming Appointments</h3>
            <Link to="/appointments" className="text-sm text-primary flex items-center gap-1 hover:underline">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          {apptLoading ? (
            <LoadingSpinner />
          ) : upcoming.length === 0 ? (
            <div className="card text-sm text-gray-500">No upcoming appointments. Book one to get started.</div>
          ) : (
            upcoming.slice(0, 2).map((appt) => <AppointmentCard key={appt._id} appointment={appt} viewerRole="patient" />)
          )}

          <div className="flex items-center justify-between pt-2">
            <h3 className="font-semibold">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/health-centers" className="card flex items-center gap-3 hover:shadow-md transition-shadow">
              <MapPin className="text-primary" size={20} />
              <span className="text-sm font-medium">Nearby Health Centers</span>
            </Link>
            <Link to="/emergency" className="card flex items-center gap-3 hover:shadow-md transition-shadow">
              <Phone className="text-red-600" size={20} />
              <span className="text-sm font-medium">Emergency Contacts</span>
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Health Tips</h3>
            <Link to="/health-tips" className="text-sm text-primary flex items-center gap-1 hover:underline">
              More <ArrowRight size={14} />
            </Link>
          </div>
          {tipLoading ? (
            <LoadingSpinner />
          ) : (
            (tipData?.tips || []).slice(0, 3).map((tip) => <HealthTipCard key={tip._id} tip={tip} />)
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;
