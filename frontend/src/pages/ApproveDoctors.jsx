import React from 'react';
import { ShieldCheck, Stethoscope } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import { useFetch } from '../hooks/useFetch';
import { useToast } from '../context/ToastContext';
import { listUsers, approveDoctor } from '../services/userService';

const ApproveDoctors = () => {
  const { data, loading, refetch } = useFetch(() => listUsers('doctor'), []);
  const { showToast } = useToast();

  const pendingDoctors = (data?.users || []).filter((d) => !d.isApproved);
  const approvedDoctors = (data?.users || []).filter((d) => d.isApproved);

  const handleApprove = async (id) => {
    try {
      await approveDoctor(id);
      showToast('Doctor approved', 'success');
      refetch();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to approve doctor', 'error');
    }
  };

  return (
    <DashboardLayout>
      <h2 className="text-lg font-semibold mb-5">Approve Doctors</h2>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h3 className="font-medium text-sm text-gray-500 mb-3">Pending Approval ({pendingDoctors.length})</h3>
          {pendingDoctors.length === 0 ? (
            <div className="card text-sm text-gray-500 mb-6">No doctors awaiting approval.</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {pendingDoctors.map((doc) => (
                <div key={doc._id} className="card flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                      <Stethoscope size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Dr. {doc.fullName}</p>
                      <p className="text-xs text-gray-500">{doc.email}</p>
                    </div>
                  </div>
                  <button onClick={() => handleApprove(doc._id)} className="btn-primary flex items-center gap-1 text-sm px-3 py-2">
                    <ShieldCheck size={14} /> Approve
                  </button>
                </div>
              ))}
            </div>
          )}

          <h3 className="font-medium text-sm text-gray-500 mb-3">Approved Doctors ({approvedDoctors.length})</h3>
          {approvedDoctors.length === 0 ? (
            <div className="card text-sm text-gray-500">No approved doctors yet.</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {approvedDoctors.map((doc) => (
                <div key={doc._id} className="card flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                    <Stethoscope size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Dr. {doc.fullName}</p>
                    <p className="text-xs text-gray-500">{doc.specialization || 'General Physician'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </DashboardLayout>
  );
};

export default ApproveDoctors;
