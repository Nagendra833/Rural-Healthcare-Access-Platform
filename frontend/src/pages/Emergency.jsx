import React from 'react';
import { Phone, Ambulance, Hospital, LifeBuoy } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import { useFetch } from '../hooks/useFetch';
import { getEmergencyContacts } from '../services/emergencyService';

const typeIcons = { ambulance: Ambulance, hospital: Hospital, helpline: LifeBuoy };
const typeLabels = { ambulance: 'Ambulance', hospital: 'Hospital', helpline: 'Helpline' };

const Emergency = () => {
  const { data, loading } = useFetch(getEmergencyContacts, []);

  return (
    <DashboardLayout>
      <h2 className="text-lg font-semibold mb-2">Emergency</h2>
      <p className="text-sm text-gray-500 mb-5">Quick access to ambulance, hospital, and helpline numbers.</p>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {(data?.contacts || []).map((contact) => {
            const Icon = typeIcons[contact.type] || Phone;
            return (
              <a
                key={contact._id}
                href={`tel:${contact.phone}`}
                className="card flex items-center gap-4 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                  <Icon size={22} className="text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-xs text-gray-500">{typeLabels[contact.type]}{contact.address ? ` · ${contact.address}` : ''}</p>
                </div>
                <p className="font-bold text-primary text-lg">{contact.phone}</p>
              </a>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Emergency;
