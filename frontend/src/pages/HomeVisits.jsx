import React, { useState } from 'react';
import { Plus, Home } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';
import { useFetch } from '../hooks/useFetch';
import { useToast } from '../context/ToastContext';
import { getHomeVisits, scheduleHomeVisit } from '../services/healthWorkerService';
import { formatDate, statusColor } from '../utils/formatters';

const HomeVisits = () => {
  const { data, loading, refetch } = useFetch(getHomeVisits, []);
  const { showToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ patientName: '', village: '', visitDate: '', purpose: '' });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await scheduleHomeVisit(form);
      showToast('Home visit scheduled', 'success');
      setModalOpen(false);
      setForm({ patientName: '', village: '', visitDate: '', purpose: '' });
      refetch();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to schedule visit', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold">Home Visit Scheduler</h2>
        <button onClick={() => setModalOpen(true)} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Schedule Visit
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (data?.visits || []).length === 0 ? (
        <div className="card text-sm text-gray-500">No home visits scheduled.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {data.visits.map((v) => (
            <div key={v._id} className="card">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                    <Home size={18} className="text-primary" />
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
              <p className="text-sm text-gray-600 mt-3">{v.purpose}</p>
              <p className="text-xs text-gray-500 mt-1">Visit Date: {formatDate(v.visitDate)}</p>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Schedule Home Visit">
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
            <label className="label-text">Visit Date</label>
            <input type="date" className="input-field" value={form.visitDate} onChange={(e) => setForm({ ...form, visitDate: e.target.value })} required />
          </div>
          <div>
            <label className="label-text">Purpose</label>
            <textarea className="input-field" rows={3} value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} required />
          </div>
          <button type="submit" className="btn-primary w-full" disabled={saving}>
            {saving ? 'Scheduling...' : 'Schedule Visit'}
          </button>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default HomeVisits;
