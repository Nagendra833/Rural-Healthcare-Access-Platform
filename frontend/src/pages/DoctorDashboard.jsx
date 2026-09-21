import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Stethoscope, Bot, ArrowRight, Circle } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import DashboardCard from '../components/DashboardCard';
import AppointmentCard from '../components/AppointmentCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';
import { useFetch } from '../hooks/useFetch';
import { useToast } from '../context/ToastContext';
import { getAppointments } from '../services/appointmentService';
import { updateProfile } from '../services/userService';

const availabilityOptions = ['available', 'busy', 'offline'];

const DoctorDashboard = () => {
  const { user, updateUserInContext } = useAuth();
  const { showToast } = useToast();
  const { data, loading, refetch } = useFetch(getAppointments, []);

  const today = new Date().toDateString();
  const todaysAppts = (data?.appointments || []).filter((a) => new Date(a.date).toDateString() === today);

  const handleAvailabilityChange = async (status) => {
    try {
      const res = await updateProfile({ availabilityStatus: status });
      updateUserInContext(res.user);
      showToast('Availability updated', 'success');
    } catch {
      showToast('Failed to update availability', 'error');
    }
  };

  return (
    <DashboardLayout>
      <div className="card bg-primary text-white mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-semibold">Welcome, Dr. {user?.fullName?.split(' ')[0]}</h2>
          <p className="text-sm text-white/90 mt-1">{user?.specialization || 'General Physician'}</p>
        </div>
        <div className="flex gap-2">
          {availabilityOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => handleAvailabilityChange(opt)}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full capitalize font-medium ${
                user?.availabilityStatus === opt ? 'bg-white text-primary' : 'bg-white/20 text-white'
              }`}
            >
              <Circle size={8} fill="currentColor" />
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <DashboardCard icon={Calendar} label="Today's Appointments" value={todaysAppts.length} />
        <DashboardCard icon={Users} label="Total Patients" value={new Set((data?.appointments || []).map((a) => a.patient?._id)).size} accentColor="text-blue-600" />
        <DashboardCard icon={Stethoscope} label="Prescriptions" value="Manage" accentColor="text-purple-600" />
        <DashboardCard icon={Bot} label="AI Medical Assistant" value="Ask" accentColor="text-teal-600" />
      </div>

      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Today's Appointments</h3>
        <Link to="/appointments" className="text-sm text-primary flex items-center gap-1 hover:underline">
          View all <ArrowRight size={14} />
        </Link>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : todaysAppts.length === 0 ? (
        <div className="card text-sm text-gray-500">No appointments scheduled for today.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {todaysAppts.map((appt) => (
            <AppointmentCard key={appt._id} appointment={appt} viewerRole="doctor" />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default DoctorDashboard;
