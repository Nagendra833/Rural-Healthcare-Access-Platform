import React, { useState } from 'react';
import { Plus, Stethoscope, Trash2 } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';
import { useAuth } from '../hooks/useAuth';
import { useFetch } from '../hooks/useFetch';
import { useToast } from '../context/ToastContext';
import { getPrescriptions, createPrescription } from '../services/prescriptionService';
import { getAppointments } from '../services/appointmentService';
import { formatDate } from '../utils/formatters';

const emptyMedicine = { name: '', dosage: '', frequency: '', duration: '' };

const Prescriptions = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { data, loading, refetch } = useFetch(getPrescriptions, []);
  const { data: apptData } = useFetch(getAppointments, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ patient: '', notes: '', medicines: [{ ...emptyMedicine }] });
  const [saving, setSaving] = useState(false);

  const uniquePatients = Object.values(
    (apptData?.appointments || []).reduce((acc, appt) => {
      if (appt.patient?._id) acc[appt.patient._id] = appt.patient;
      return acc;
    }, {})
  );

  const handleMedicineChange = (idx, field, value) => {
    const meds = [...form.medicines];
    meds[idx][field] = value;
    setForm({ ...form, medicines: meds });
  };

  const addMedicineRow = () => setForm({ ...form, medicines: [...form.medicines, { ...emptyMedicine }] });
  const removeMedicineRow = (idx) => setForm({ ...form, medicines: form.medicines.filter((_, i) => i !== idx) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createPrescription(form);
      showToast('Prescription created', 'success');
      setModalOpen(false);
      setForm({ patient: '', notes: '', medicines: [{ ...emptyMedicine }] });
      refetch();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to create prescription', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold">Prescription Management</h2>
        {user?.role === 'doctor' && (
          <button onClick={() => setModalOpen(true)} className="btn-primary flex items-center gap-2">
            <Plus size={16} /> New Prescription
          </button>
        )}
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (data?.prescriptions || []).length === 0 ? (
        <div className="card text-sm text-gray-500">No prescriptions yet.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {data.prescriptions.map((rx) => (
            <div key={rx._id} className="card">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <Stethoscope size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium">{rx.patient?.fullName}</p>
                  <p className="text-xs text-gray-500">Dr. {rx.doctor?.fullName} &middot; {formatDate(rx.createdAt)}</p>
                </div>
              </div>
              <ul className="text-sm space-y-1 mt-2">
                {rx.medicines.map((m, i) => (
                  <li key={i} className="flex justify-between text-gray-600 border-b border-gray-50 py-1">
                    <span className="font-medium text-textmain">{m.name}</span>
                    <span>{m.dosage} &middot; {m.frequency} &middot; {m.duration}</span>
                  </li>
                ))}
              </ul>
              {rx.notes && <p className="text-sm text-gray-500 mt-2">{rx.notes}</p>}
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="New Prescription">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label-text">Patient</label>
            <select
              className="input-field"
              value={form.patient}
              onChange={(e) => setForm({ ...form, patient: e.target.value })}
              required
            >
              <option value="">Select patient</option>
              {uniquePatients.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.fullName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label-text">Medicines</label>
            <div className="space-y-3">
              {form.medicines.map((m, idx) => (
                <div key={idx} className="grid grid-cols-2 gap-2 border border-gray-100 rounded-lg p-3 relative">
                  <input
                    placeholder="Name"
                    className="input-field col-span-2"
                    value={m.name}
                    onChange={(e) => handleMedicineChange(idx, 'name', e.target.value)}
                    required
                  />
                  <input
                    placeholder="Dosage"
                    className="input-field"
                    value={m.dosage}
                    onChange={(e) => handleMedicineChange(idx, 'dosage', e.target.value)}
                  />
                  <input
                    placeholder="Frequency"
                    className="input-field"
                    value={m.frequency}
                    onChange={(e) => handleMedicineChange(idx, 'frequency', e.target.value)}
                  />
                  <input
                    placeholder="Duration"
                    className="input-field col-span-2"
                    value={m.duration}
                    onChange={(e) => handleMedicineChange(idx, 'duration', e.target.value)}
                  />
                  {form.medicines.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMedicineRow(idx)}
                      className="absolute -top-2 -right-2 bg-white border border-gray-200 rounded-full p-1 text-red-500"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button type="button" onClick={addMedicineRow} className="text-sm text-primary mt-2 hover:underline">
              + Add another medicine
            </button>
          </div>

          <div>
            <label className="label-text">Notes</label>
            <textarea
              className="input-field"
              rows={2}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>

          <button type="submit" className="btn-primary w-full" disabled={saving}>
            {saving ? 'Saving...' : 'Create Prescription'}
          </button>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default Prescriptions;
