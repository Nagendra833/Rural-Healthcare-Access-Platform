import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import AppointmentCard from '../components/AppointmentCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';
import { useAuth } from '../hooks/useAuth';
import { useFetch } from '../hooks/useFetch';
import { useToast } from '../context/ToastContext';
import { getAppointments, bookAppointment, updateAppointment, cancelAppointment } from '../services/appointmentService';
import { getDoctors } from '../services/userService';
import { Plus } from 'lucide-react';

const Appointments = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { data, loading, refetch } = useFetch(getAppointments, []);
  const { data: doctorData } = useFetch(getDoctors, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingAppt, setEditingAppt] = useState(null);
  const [form, setForm] = useState({ doctor: '', date: '', timeSlot: '', reason: '' });
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState('all');

  const appointments = data?.appointments || [];
  const filtered = filter === 'all' ? appointments : appointments.filter((a) => a.status === filter);

  const openBookModal = () => {
    setEditingAppt(null);
    setForm({ doctor: '', date: '', timeSlot: '', reason: '' });
    setModalOpen(true);
  };

  const openRescheduleModal = (appt) => {
    setEditingAppt(appt);
    setForm({
      doctor: appt.doctor?._id || '',
      date: appt.date?.slice(0, 10) || '',
      timeSlot: appt.timeSlot,
      reason: appt.reason,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingAppt) {
        await updateAppointment(editingAppt._id, form);
        showToast('Appointment rescheduled', 'success');
      } else {
        await bookAppointment(form);
        showToast('Appointment booked', 'success');
      }
      setModalOpen(false);
      refetch();
    } catch (err) {
      showToast(err.response?.data?.message || 'Something went wrong', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelAppointment(id);
      showToast('Appointment cancelled', 'success');
      refetch();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to cancel appointment', 'error');
    }
  };

  const statusOptions = ['all', 'pending', 'confirmed', 'completed', 'cancelled', 'rescheduled'];

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold">{user?.role === 'doctor' ? "Today's Appointments" : 'Appointments'}</h2>
        {user?.role === 'patient' && (
          <button onClick={openBookModal} className="btn-primary flex items-center gap-2">
            <Plus size={16} /> Book Appointment
          </button>
        )}
      </div>

      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {statusOptions.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize whitespace-nowrap ${
              filter === s ? 'bg-primary text-white' : 'bg-white text-gray-500 border border-gray-200'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : filtered.length === 0 ? (
        <div className="card text-sm text-gray-500">No appointments found.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((appt) => (
            <AppointmentCard
              key={appt._id}
              appointment={appt}
              viewerRole={user?.role}
              onCancel={user?.role === 'patient' ? handleCancel : undefined}
              onReschedule={user?.role === 'patient' ? openRescheduleModal : undefined}
            />
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingAppt ? 'Reschedule Appointment' : 'Book Appointment'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label-text">Doctor</label>
            <select
              className="input-field"
              value={form.doctor}
              onChange={(e) => setForm({ ...form, doctor: e.target.value })}
              required
            >
              <option value="">Select a doctor</option>
              {(doctorData?.doctors || []).map((doc) => (
                <option key={doc._id} value={doc._id}>
                  Dr. {doc.fullName} {doc.specialization ? `- ${doc.specialization}` : ''}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-text">Date</label>
            <input
              type="date"
              className="input-field"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="label-text">Time Slot</label>
            <input
              type="text"
              placeholder="e.g. 10:00 AM - 10:30 AM"
              className="input-field"
              value={form.timeSlot}
              onChange={(e) => setForm({ ...form, timeSlot: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="label-text">Reason for Visit</label>
            <textarea
              className="input-field"
              rows={3}
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full" disabled={saving}>
            {saving ? 'Saving...' : editingAppt ? 'Save Changes' : 'Book Appointment'}
          </button>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default Appointments;
