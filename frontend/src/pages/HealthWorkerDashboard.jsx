import React from 'react';
import { Link } from 'react-router-dom';
import { Syringe, Home, FileText, ClipboardList, ArrowRight } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import DashboardCard from '../components/DashboardCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';
import { useFetch } from '../hooks/useFetch';
import { getVaccinations, getHomeVisits } from '../services/healthWorkerService';
import { formatDate, statusColor } from '../utils/formatters';

const HealthWorkerDashboard = () => {
  const { user } = useAuth();
  const { data: vaxData, loading: vaxLoading } = useFetch(getVaccinations, []);
  const { data: visitData, loading: visitLoading } = useFetch(getHomeVisits, []);

  const upcomingVax = (vaxData?.vaccinations || []).filter((v) => v.status === 'scheduled');
  const upcomingVisits = (visitData?.visits || []).filter((v) => v.status === 'scheduled');

  return (
    <DashboardLayout>
      <div className="card bg-primary text-white mb-6">
        <h2 className="text-xl font-semibold">Welcome, {user?.fullName?.split(' ')[0]}</h2>
        <p className="text-sm text-white/90 mt-1">Assigned Village: {user?.assignedVillage || 'Not set'}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <DashboardCard icon={ClipboardList} label="Village Records" value="View" />
        <DashboardCard icon={Syringe} label="Pending Vaccinations" value={upcomingVax.length} accentColor="text-purple-600" />
        <DashboardCard icon={Home} label="Scheduled Home Visits" value={upcomingVisits.length} accentColor="text-blue-600" />
        <DashboardCard icon={FileText} label="Reports" value="Submit" accentColor="text-teal-600" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Upcoming Vaccinations</h3>
            <Link to="/vaccinations" className="text-sm text-primary flex items-center gap-1 hover:underline">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          {vaxLoading ? (
            <LoadingSpinner />
          ) : upcomingVax.length === 0 ? (
            <div className="card text-sm text-gray-500">No pending vaccinations.</div>
          ) : (
            <div className="space-y-3">
              {upcomingVax.slice(0, 4).map((v) => (
                <div key={v._id} className="card flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{v.patientName}</p>
                    <p className="text-xs text-gray-500">{v.vaccineName} &middot; Dose {v.doseNumber}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${statusColor(v.status)}`}>
                    {formatDate(v.scheduledDate)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Upcoming Home Visits</h3>
            <Link to="/home-visits" className="text-sm text-primary flex items-center gap-1 hover:underline">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          {visitLoading ? (
            <LoadingSpinner />
          ) : upcomingVisits.length === 0 ? (
            <div className="card text-sm text-gray-500">No scheduled home visits.</div>
          ) : (
            <div className="space-y-3">
              {upcomingVisits.slice(0, 4).map((v) => (
                <div key={v._id} className="card flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{v.patientName}</p>
                    <p className="text-xs text-gray-500">{v.purpose}</p>
                  </div>
                  <span className="text-xs text-gray-500">{formatDate(v.visitDate)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HealthWorkerDashboard;
