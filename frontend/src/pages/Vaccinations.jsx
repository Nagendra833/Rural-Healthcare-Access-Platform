import React, { useState } from 'react';
import { Plus, Syringe } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';
import { useFetch } from '../hooks/useFetch';
import { useToast } from '../context/ToastContext';
import { getVaccinations, addVaccination, updateVaccination } from '../services/healthWorkerService';
import { formatDate, statusColor } from '../utils/formatters';

const Vaccinations = () => {
  const { data, loading, refetch } = useFetch(getVaccinations, []);
  const { showToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ patientName: '', village: '', vaccineName: '', doseNumber: 1, scheduledDate: '' });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await addVaccination(form);
      showToast('Vaccination record added', 'success');
      setModalOpen(false);
      setForm({ patientName: '', village: '', vaccineName: '', doseNumber: 1, scheduledDate: '' });
      refetch();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to add record', 'error');
    } finally {
      setSaving(false);
    }
  };

  const markStatus = async (id, status) => {
    try {
      await updateVaccination(id, { status });
      showToast('Status updated', 'success');
      refetch();
    } catch {
      showToast('Failed to update status', 'error');
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold">Vaccination Tracking</h2>
        <button onClick={() => setModalOpen(true)} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Add Record
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (data?.vaccinations || []).length === 0 ? (
        <div className="card text-sm text-gray-500">No vaccination records yet.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {data.vaccinations.map((v) => (
            <div key={v._id} className="card">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                    <Syringe size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{v.patientName}</p>
                    <p className="text-xs text-gray-500">{v.village}</p>
                  </div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${statusColor(v.status)}`}>
                  {v.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-3">{v.vaccineName} &middot; Dose {v.doseNumber}</p>
              <p className="text-xs text-gray-500 mt-1">Scheduled: {formatDate(v.scheduledDate)}</p>
              {v.status === 'scheduled' && (
                <div className="flex gap-2 mt-3">
                  <button onClick={() => markStatus(v._id, 'completed')} className="text-xs text-primary hover:underline">
                    Mark Completed
                  </button>
                  <button onClick={() => markStatus(v._id, 'missed')} className="text-xs text-red-600 hover:underline">
                    Mark Missed
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add Vaccination Record">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label-text">Patient Name</label>
            <input className="input-field" value={form.patientName} onChange={(e) => setForm({ ...form, patientName: e.target.value })} required />
          </div>
          <div>
            <label className="label-text">Village</label>
            <input className="input-field" value={form.village} onChange={(e) => setForm({ ...form, village: e.target.value })} required />
          </div>
          <div>
            <label className="label-text">Vaccine Name</label>
            <input className="input-field" value={form.vaccineName} onChange={(e) => setForm({ ...form, vaccineName: e.target.value })} required />
          </div>
          <div>
            <label className="label-text">Dose Number</label>
            <input type="number" min="1" className="input-field" value={form.doseNumber} onChange={(e) => setForm({ ...form, doseNumber: e.target.value })} />
          </div>
          <div>
            <label className="label-text">Scheduled Date</label>
            <input type="date" className="input-field" value={form.scheduledDate} onChange={(e) => setForm({ ...form, scheduledDate: e.target.value })} required />
          </div>
          <button type="submit" className="btn-primary w-full" disabled={saving}>
            {saving ? 'Saving...' : 'Add Record'}
          </button>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default Vaccinations;
