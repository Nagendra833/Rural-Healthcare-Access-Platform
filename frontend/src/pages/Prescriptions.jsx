import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Plus, Stethoscope, Trash2, Printer, QrCode, ShieldCheck, Pill, Calendar, Clock } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { PageTransition, StaggerContainer, StaggerItem } from '../components/PageTransition';
import { CardSkeleton } from '../components/Skeleton';
import PillTracker from '../components/PillTracker';
import Modal from '../components/Modal';
import { useAuth } from '../hooks/useAuth';
import { useFetch } from '../hooks/useFetch';
import { useToast } from '../context/ToastContext';
import { triggerConfetti } from '../utils/confetti';
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
  const [printRx, setPrintRx] = useState(null);
  const [qrModalRx, setQrModalRx] = useState(null);
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
      triggerConfetti();
      showToast('Prescription issued successfully! Verification QR generated.', 'success');
      setModalOpen(false);
      setForm({ patient: '', notes: '', medicines: [{ ...emptyMedicine }] });
      refetch();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to create prescription', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handlePrint = (rx) => {
    setPrintRx(rx);
    setTimeout(() => {
      window.print();
    }, 200);
  };

  return (
    <DashboardLayout>
      <PageTransition>
        {/* Medication adherence tracker at top for patients */}
        {user?.role === 'patient' && (
          <div className="mb-6">
            <PillTracker />
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Digital Prescriptions</h2>
            <p className="text-sm text-gray-500">
              Verified clinical prescriptions with offline scannable QR verification for dispensaries.
            </p>
          </div>
          {user?.role === 'doctor' && (
            <button onClick={() => setModalOpen(true)} className="btn-primary flex items-center gap-2 self-start">
              <Plus size={16} /> Issue Prescription
            </button>
          )}
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-4">
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : (data?.prescriptions || []).length === 0 ? (
          <div className="card text-center py-12 text-sm text-gray-500 border border-dashed border-gray-200">
            <Pill size={36} className="mx-auto text-gray-400 mb-2" />
            <p className="font-semibold text-gray-700">No prescriptions found</p>
            <p className="text-xs text-gray-400 mt-1">Prescriptions issued by your doctor will appear here.</p>
          </div>
        ) : (
          <StaggerContainer className="grid md:grid-cols-2 gap-4">
            {data.prescriptions.map((rx) => {
              const qrPayload = JSON.stringify({
                id: rx._id,
                p: rx.patient?.fullName,
                d: rx.doctor?.fullName,
                m: rx.medicines?.map((m) => `${m.name} (${m.dosage})`).join(', '),
              });

              return (
                <StaggerItem key={rx._id}>
                  <div className="card card-hover flex flex-col justify-between border border-gray-100 hover:border-primary/40 relative">
                    <div>
                      {/* Header */}
                      <div className="flex items-start justify-between gap-2 pb-3 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-primary shrink-0">
                            <Stethoscope size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-sm text-gray-900">{rx.patient?.fullName}</p>
                            <p className="text-xs text-gray-500">
                              Dr. {rx.doctor?.fullName} • {formatDate(rx.createdAt)}
                            </p>
                          </div>
                        </div>

                        {/* QR Code thumbnail */}
                        <button
                          onClick={() => setQrModalRx(rx)}
                          className="p-1 rounded-lg hover:bg-gray-50 border border-gray-100 transition"
                          title="Click to expand QR for dispensary scanning"
                        >
                          <QRCodeSVG value={qrPayload} size={36} />
                        </button>
                      </div>

                      {/* Medicines List */}
                      <div className="mt-3 space-y-2">
                        {rx.medicines.map((m, i) => (
                          <div
                            key={i}
                            className="p-2.5 rounded-lg bg-surface border border-gray-100 flex items-start justify-between text-xs"
                          >
                            <div>
                              <p className="font-bold text-gray-800">{m.name}</p>
                              <p className="text-[11px] text-gray-500 mt-0.5">
                                {m.frequency || '1-0-1'} • {m.duration || '5 days'}
                              </p>
                            </div>
                            <span className="font-semibold text-primary px-2 py-0.5 rounded bg-accent text-[11px]">
                              {m.dosage || 'Standard'}
                            </span>
                          </div>
                        ))}
                      </div>

                      {rx.notes && (
                        <p className="text-xs text-gray-600 bg-amber-50/70 border border-amber-100 rounded-lg p-2.5 mt-3">
                          <span className="font-semibold text-amber-800">Doctor Advice: </span>
                          {rx.notes}
                        </p>
                      )}
                    </div>

                    {/* Footer Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-3 mt-4 border-t border-gray-100 text-xs">
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                        <ShieldCheck size={13} /> Verified Rx
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setQrModalRx(rx)}
                          className="btn-secondary py-1.5 px-3 text-xs flex items-center gap-1"
                        >
                          <QrCode size={13} /> Scan QR
                        </button>
                        <button
                          onClick={() => handlePrint(rx)}
                          className="btn-primary py-1.5 px-3 text-xs flex items-center gap-1"
                        >
                          <Printer size={13} /> Print
                        </button>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        )}

        {/* QR Verification Modal */}
        {qrModalRx && (
          <Modal isOpen={!!qrModalRx} onClose={() => setQrModalRx(null)} title="Dispensary Verification QR">
            <div className="flex flex-col items-center text-center p-4">
              <div className="p-4 bg-white rounded-2xl border-2 border-primary/20 shadow-elevated mb-4">
                <QRCodeSVG
                  value={JSON.stringify({
                    id: qrModalRx._id,
                    p: qrModalRx.patient?.fullName,
                    d: qrModalRx.doctor?.fullName,
                    m: qrModalRx.medicines,
                    date: qrModalRx.createdAt,
                  })}
                  size={190}
                />
              </div>

              <p className="font-bold text-gray-900 text-sm">Patient: {qrModalRx.patient?.fullName}</p>
              <p className="text-xs text-gray-500">Prescribing Physician: Dr. {qrModalRx.doctor?.fullName}</p>
              <p className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full mt-3 font-medium">
                Present this code to any rural pharmacy or primary health sub-centre dispensary
              </p>
            </div>
          </Modal>
        )}

        {/* Doctor New Prescription Modal */}
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Issue New Prescription">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label-text">Select Patient</label>
              <select
                className="input-field text-sm"
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
              <label className="label-text">Prescribed Medications</label>
              <div className="space-y-3">
                {form.medicines.map((m, idx) => (
                  <div key={idx} className="grid grid-cols-2 gap-2 border border-gray-100 rounded-xl p-3 bg-surface relative">
                    <input
                      placeholder="Medicine Name (e.g., Paracetamol)"
                      className="input-field text-xs col-span-2"
                      value={m.name}
                      onChange={(e) => handleMedicineChange(idx, 'name', e.target.value)}
                      required
                    />
                    <input
                      placeholder="Dosage (e.g. 500mg)"
                      className="input-field text-xs"
                      value={m.dosage}
                      onChange={(e) => handleMedicineChange(idx, 'dosage', e.target.value)}
                    />
                    <input
                      placeholder="Frequency (e.g. 1-0-1 after food)"
                      className="input-field text-xs"
                      value={m.frequency}
                      onChange={(e) => handleMedicineChange(idx, 'frequency', e.target.value)}
                    />
                    <input
                      placeholder="Duration (e.g. 5 days)"
                      className="input-field text-xs col-span-2"
                      value={m.duration}
                      onChange={(e) => handleMedicineChange(idx, 'duration', e.target.value)}
                    />
                    {form.medicines.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMedicineRow(idx)}
                        className="absolute -top-2 -right-2 bg-white border border-gray-200 rounded-full p-1 text-red-500 hover:bg-red-50"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addMedicineRow}
                className="text-xs font-semibold text-primary mt-2 hover:underline"
              >
                + Add another medicine
              </button>
            </div>

            <div>
              <label className="label-text">Special Instructions / Advice</label>
              <textarea
                className="input-field text-sm"
                rows={2}
                placeholder="Dietary precautions, hydration advice..."
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>

            <button type="submit" className="btn-primary w-full text-sm py-2.5" disabled={saving}>
              {saving ? 'Issuing & Generating QR...' : 'Issue Prescription'}
            </button>
          </form>
        </Modal>
      </PageTransition>
    </DashboardLayout>
  );
};

export default Prescriptions;
