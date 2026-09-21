import React from 'react';
import { ClipboardList, Syringe, Home } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import { useFetch } from '../hooks/useFetch';
import { getVaccinations, getHomeVisits } from '../services/healthWorkerService';
import { formatDate, statusColor } from '../utils/formatters';

// Combined view of vaccination + home visit activity per village
const VillageRecords = () => {
  const { data: vaxData, loading: vaxLoading } = useFetch(getVaccinations, []);
  const { data: visitData, loading: visitLoading } = useFetch(getHomeVisits, []);

  const loading = vaxLoading || visitLoading;

  const villages = Array.from(
    new Set([
      ...(vaxData?.vaccinations || []).map((v) => v.village),
      ...(visitData?.visits || []).map((v) => v.village),
    ])
  );

  return (
    <DashboardLayout>
      <h2 className="text-lg font-semibold mb-5">Village Health Records</h2>

      {loading ? (
        <LoadingSpinner />
      ) : villages.length === 0 ? (
        <div className="card text-sm text-gray-500">No village records yet. Add vaccination or home visit entries to get started.</div>
      ) : (
        <div className="space-y-6">
          {villages.map((village) => {
            const vax = (vaxData?.vaccinations || []).filter((v) => v.village === village);
            const visits = (visitData?.visits || []).filter((v) => v.village === village);
            return (
              <div key={village} className="card">
                <div className="flex items-center gap-2 mb-4">
                  <ClipboardList size={18} className="text-primary" />
                  <h3 className="font-semibold">{village}</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
                      <Syringe size={12} /> Vaccinations ({vax.length})
                    </p>
                    <div className="space-y-2">
                      {vax.slice(0, 3).map((v) => (
                        <div key={v._id} className="flex items-center justify-between text-sm">
                          <span>{v.patientName} &middot; {v.vaccineName}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor(v.status)}`}>{v.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
                      <Home size={12} /> Home Visits ({visits.length})
                    </p>
                    <div className="space-y-2">
                      {visits.slice(0, 3).map((v) => (
                        <div key={v._id} className="flex items-center justify-between text-sm">
                          <span>{v.patientName}</span>
                          <span className="text-xs text-gray-500">{formatDate(v.visitDate)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
};

export default VillageRecords;
