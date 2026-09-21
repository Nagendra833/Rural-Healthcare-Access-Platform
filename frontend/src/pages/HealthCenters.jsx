import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import { useFetch } from '../hooks/useFetch';
import { getEmergencyContacts } from '../services/emergencyService';

const HealthCenters = () => {
  const { data, loading } = useFetch(() => getEmergencyContacts().then((res) => ({
    ...res,
    contacts: res.contacts.filter((c) => c.type === 'hospital'),
  })), []);

  return (
    <DashboardLayout>
      <h2 className="text-lg font-semibold mb-5">Nearby Health Centers</h2>
      {loading ? (
        <LoadingSpinner />
      ) : (data?.contacts || []).length === 0 ? (
        <div className="card text-sm text-gray-500">No health centers listed for your region yet.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {data.contacts.map((center) => (
            <div key={center._id} className="card">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <MapPin size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium">{center.name}</p>
                  <p className="text-xs text-gray-500">{center.address}</p>
                </div>
              </div>
              <a href={`tel:${center.phone}`} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
                <Phone size={14} /> {center.phone}
              </a>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default HealthCenters;
