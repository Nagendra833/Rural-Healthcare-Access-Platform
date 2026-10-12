import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import AppointmentCard from '../components/AppointmentCard';
import { PageTransition, StaggerContainer, StaggerItem } from '../components/PageTransition';
import { CardSkeleton } from '../components/Skeleton';
import TeleconsultationModal from '../components/TeleconsultationModal';
import Modal from '../components/Modal';
import { useAuth } from '../hooks/useAuth';
import { useFetch } from '../hooks/useFetch';
import { useToast } from '../context/ToastContext';
import { triggerConfetti } from '../utils/confetti';
import {
  getAppointments,
  bookAppointment,
  updateAppointment,
  cancelAppointment,
} from '../services/appointmentService';
import { getDoctors } from '../services/userService';
import { Plus, Video, Calendar, Filter } from 'lucide-react';

const Appointments = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { data, loading, refetch } = useFetch(getAppointments, []);
  const { data: doctorData } = useFetch(getDoctors, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [activeVideoAppt, setActiveVideoAppt] = useState(null);
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
        showToast('Appointment rescheduled successfully!', 'success');
      } else {
        await bookAppointment(form);
        triggerConfetti();
        showToast('Appointment booked! Reminder queued.', 'success');
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
      showToast('Appointment cancelled', 'info');
      refetch();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to cancel appointment', 'error');
    }
  };

  const statusOptions = ['all', 'pending', 'confirmed', 'completed', 'cancelled', 'rescheduled'];

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Appointments & Tele-Health</h2>
            <p className="text-sm text-gray-500">
              Book rural clinic visits or join encrypted 1-on-1 virtual video consultations with doctors.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start">
            {user?.role === 'patient' && (
              <button onClick={openBookModal} className="btn-primary flex items-center gap-2 text-sm">
                <Plus size={16} /> Book Appointment
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 no-scrollbar">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize whitespace-nowrap transition ${
                filter === status
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Appointments Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 gap-4">
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : filtered.length === 0 ? (
          <div className="card text-center py-12 text-sm text-gray-500 border border-dashed border-gray-200">
            <Calendar size={36} className="mx-auto text-gray-300 mb-2" />
            <p className="font-semibold text-gray-700">No appointments found</p>
            <p className="text-xs text-gray-400 mt-1">
              {filter !== 'all' ? `No appointments matching "${filter}".` : 'Book an appointment to get started.'}
            </p>
          </div>
        ) : (
          <StaggerContainer className="grid md:grid-cols-2 gap-4">
            {filtered.map((appt) => (
              <StaggerItem key={appt._id}>
                <AppointmentCard
                  appointment={appt}
                  viewerRole={user?.role}
                  onCancel={handleCancel}
                  onReschedule={openRescheduleModal}
                  onJoinCall={(a) => setActiveVideoAppt(a)}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        {/* Telemedicine Video Room Modal */}
        <TeleconsultationModal
          isOpen={!!activeVideoAppt}
          onClose={() => setActiveVideoAppt(null)}
          appointment={activeVideoAppt}
          currentUserRole={user?.role}
        />

        {/* Book / Reschedule Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editingAppt ? 'Reschedule Appointment' : 'Book Clinic / Teleconsultation Visit'}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {!editingAppt && (
              <div>
                <label className="label-text">Select Doctor</label>
                <select
                  className="input-field text-sm"
                  value={form.doctor}
                  onChange={(e) => setForm({ ...form, doctor: e.target.value })}
                  required
                >
                  <option value="">Select a physician</option>
                  {(doctorData?.users || []).map((doc) => (
                    <option key={doc._id} value={doc._id}>
                      Dr. {doc.fullName} ({doc.specialization || 'General Medicine'})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="label-text">Appointment Date</label>
              <input
                type="date"
                className="input-field text-sm"
                value={form.date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="label-text">Time Slot</label>
              <select
                className="input-field text-sm"
                value={form.timeSlot}
                onChange={(e) => setForm({ ...form, timeSlot: e.target.value })}
                required
              >
                <option value="">Select a time slot</option>
                <option value="09:00 AM - 09:30 AM">09:00 AM - 09:30 AM</option>
                <option value="10:00 AM - 10:30 AM">10:00 AM - 10:30 AM</option>
                <option value="11:30 AM - 12:00 PM">11:30 AM - 12:00 PM</option>
                <option value="02:00 PM - 02:30 PM">02:00 PM - 02:30 PM</option>
                <option value="04:00 PM - 04:30 PM">04:00 PM - 04:30 PM</option>
              </select>
            </div>

            <div>
              <label className="label-text">Symptoms / Reason for Visit</label>
              <textarea
                className="input-field text-sm"
                rows={3}
                placeholder="Briefly describe your symptoms or reason..."
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="btn-primary w-full text-sm py-2.5" disabled={saving}>
              {saving ? 'Processing...' : editingAppt ? 'Confirm Reschedule' : 'Confirm Booking'}
            </button>
          </form>
        </Modal>
      </PageTransition>
    </DashboardLayout>
  );
};

export default Appointments;
