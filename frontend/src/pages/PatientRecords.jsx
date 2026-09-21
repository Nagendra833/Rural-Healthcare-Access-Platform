import React, { useState } from 'react';
import { Users, FileText } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import { useFetch } from '../hooks/useFetch';
import { getAppointments } from '../services/appointmentService';
import { formatDate } from '../utils/formatters';

// Doctors view patient records via the patients they have appointments with
const PatientRecords = () => {
  const { data, loading } = useFetch(getAppointments, []);

  const uniquePatients = Object.values(
    (data?.appointments || []).reduce((acc, appt) => {
      if (appt.patient?._id) acc[appt.patient._id] = appt.patient;
      return acc;
    }, {})
  );

  return (
    <DashboardLayout>
      <h2 className="text-lg font-semibold mb-5">Patient Records</h2>

      {loading ? (
        <LoadingSpinner />
      ) : uniquePatients.length === 0 ? (
        <div className="card text-sm text-gray-500">No patients yet. Records appear here once you have appointments.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {uniquePatients.map((patient) => (
            <div key={patient._id} className="card flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <Users size={18} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{patient.fullName}</p>
                <p className="text-xs text-gray-500">{patient.phone}</p>
              </div>
              <FileText size={16} className="text-gray-300" />
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default PatientRecords;
