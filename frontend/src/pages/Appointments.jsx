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
import { Plus, Video, Calendar, Bot, Sparkles, ShieldCheck, Mic } from 'lucide-react';

const Appointments = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { data, loading, refetch } = useFetch(getAppointments, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [activeVideoAppt, setActiveVideoAppt] = useState(null);
  const [editingAppt, setEditingAppt] = useState(null);
  const [form, setForm] = useState({ timeSlot: '', reason: '' });
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState('all');

  const appointments = data?.appointments || [];
  const filtered = filter === 'all' ? appointments : appointments.filter((a) => a.status === filter);

  const openBookModal = () => {
    setEditingAppt(null);
    setForm({ timeSlot: '', reason: '' });
    setModalOpen(true);
  };

  const openRescheduleModal = (appt) => {
    setEditingAppt(appt);
    setForm({
      timeSlot: appt.timeSlot,
      reason: appt.reason,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    try {
      const payload = {
        doctorName: 'AI Health Assistant',
        date: new Date().toISOString().split('T')[0],
        timeSlot: form.timeSlot,
        reason: form.reason,
      };

      if (editingAppt) {
        await updateAppointment(editingAppt._id, payload);
        showToast('Consultation updated successfully!', 'success');
      } else {
        await bookAppointment(payload);
        triggerConfetti();
        showToast('AI Consultation scheduled! You can join the video call now.', 'success');
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
      showToast('Consultation cancelled', 'info');
      refetch();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to cancel', 'error');
    }
  };

  const statusOptions = ['all', 'pending', 'confirmed', 'completed', 'cancelled'];

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Bot size={22} className="text-primary" />
              AI Health Consultations
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Describe your symptoms and get instant AI-powered medical guidance through a secure video call.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start">
            {user?.role === 'patient' && (
              <button onClick={openBookModal} className="btn-primary flex items-center gap-2 text-sm">
                <Plus size={16} /> Start Consultation
              </button>
            )}
          </div>
        </div>

        {/* How It Works Banner */}
        <div className="mb-5 p-4 rounded-xl bg-gradient-to-r from-primary/5 via-blue-50 to-indigo-50 border border-primary/10">
          <p className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-1.5">
            <Sparkles size={15} className="text-primary" /> How AI Consultation Works
          </p>
          <div className="grid sm:grid-cols-3 gap-3 text-xs text-gray-600">
            <div className="flex items-start gap-2">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold mt-0.5">1</span>
              <p><strong>Describe Symptoms</strong> — Tell us what you're experiencing so our AI can prepare for your session.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold mt-0.5">2</span>
              <p><strong>Join AI Video Call</strong> — Speak directly with the AI Doctor. It listens, asks follow-up questions, and analyses your symptoms in real-time.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold mt-0.5">3</span>
              <p><strong>Get Guidance</strong> — Receive personalised health suggestions, home remedies, and advice on whether to visit a clinic.</p>
            </div>
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

        {/* Consultation Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 gap-4">
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : filtered.length === 0 ? (
          <div className="card text-center py-12 text-sm text-gray-500 border border-dashed border-gray-200">
            <Bot size={36} className="mx-auto text-gray-300 mb-2" />
            <p className="font-semibold text-gray-700">No consultations yet</p>
            <p className="text-xs text-gray-400 mt-1">
              {filter !== 'all' ? `No consultations matching "${filter}".` : 'Start an AI consultation to get instant health guidance.'}
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

        {/* AI Telemedicine Video Room Modal */}
        <TeleconsultationModal
          isOpen={!!activeVideoAppt}
          onClose={() => setActiveVideoAppt(null)}
          appointment={activeVideoAppt}
          currentUserRole={user?.role}
        />

        {/* Book / Update Consultation Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editingAppt ? 'Update Consultation' : 'Start AI Health Consultation'}
        >
          {/* AI consultation explainer */}
          {!editingAppt && (
            <div className="mb-4 p-3 rounded-lg bg-gradient-to-br from-primary/5 to-blue-50 border border-primary/10">
              <div className="flex items-center gap-2 mb-1.5">
                <Bot size={18} className="text-primary" />
                <span className="text-sm font-semibold text-gray-800">AI Doctor Consultation</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                You will be connected to our <strong>AI Health Assistant</strong> via a secure video call.
                Simply <strong>speak about your symptoms</strong> — the AI will listen, ask clarifying questions,
                and provide personalised health suggestions in real-time. No doctor selection needed.
              </p>
              <div className="flex items-center gap-3 mt-2.5 text-[11px] text-gray-500">
                <span className="flex items-center gap-1"><Mic size={11} /> Voice Enabled</span>
                <span className="flex items-center gap-1"><ShieldCheck size={11} /> Private & Secure</span>
                <span className="flex items-center gap-1"><Sparkles size={11} /> Instant Guidance</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label-text">Preferred Time Slot</label>
              <select
                className="input-field text-sm"
                value={form.timeSlot}
                onChange={(e) => setForm({ ...form, timeSlot: e.target.value })}
                required
              >
                <option value="">Select a time slot</option>
                <option value="Now (Instant)">Now — Start Immediately</option>
                <option value="09:00 AM - 09:30 AM">09:00 AM - 09:30 AM</option>
                <option value="10:00 AM - 10:30 AM">10:00 AM - 10:30 AM</option>
                <option value="11:30 AM - 12:00 PM">11:30 AM - 12:00 PM</option>
                <option value="02:00 PM - 02:30 PM">02:00 PM - 02:30 PM</option>
                <option value="04:00 PM - 04:30 PM">04:00 PM - 04:30 PM</option>
              </select>
            </div>

            <div>
              <label className="label-text">Describe Your Symptoms</label>
              <textarea
                className="input-field text-sm"
                rows={3}
                placeholder="Example: I have had a headache and mild fever for 2 days, along with body pain..."
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                required
              />
              <p className="text-[11px] text-gray-400 mt-1">
                This helps the AI prepare for your consultation. You can share more details during the video call.
              </p>
            </div>

            <button type="submit" className="btn-primary w-full text-sm py-2.5 flex items-center justify-center gap-2" disabled={saving}>
              {saving ? 'Processing...' : editingAppt ? 'Update Consultation' : (
                <>
                  <Video size={15} /> Start AI Consultation
                </>
              )}
            </button>
          </form>
        </Modal>
      </PageTransition>
    </DashboardLayout>
  );
};

export default Appointments;
