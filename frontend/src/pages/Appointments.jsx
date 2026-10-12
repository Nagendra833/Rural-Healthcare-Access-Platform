import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import AppointmentCard from '../components/AppointmentCard';
import { PageTransition, StaggerContainer, StaggerItem } from '../components/PageTransition';
import { CardSkeleton } from '../components/Skeleton';
import TeleconsultationModal from '../components/TeleconsultationModal';
import Modal from '../components/Modal';
import { useAuth } from '../hooks/useAuth';
import { useFetch } from '../hooks/useFetch';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { triggerConfetti } from '../utils/confetti';
import { SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import {
  getAppointments,
  bookAppointment,
  updateAppointment,
  cancelAppointment,
} from '../services/appointmentService';
import { Plus, Video, Bot, Sparkles, ShieldCheck, Mic, Globe, Check } from 'lucide-react';

// Language flag emojis
const LANG_FLAGS = { en: '🇬🇧', hi: '🇮🇳', te: '🇮🇳', ta: '🇮🇳', bn: '🇮🇳', es: '🇪🇸' };

const Appointments = () => {
  const { user } = useAuth();
  const { language: globalLang } = useLanguage();
  const { showToast } = useToast();
  const { data, loading, refetch } = useFetch(getAppointments, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [activeVideoAppt, setActiveVideoAppt] = useState(null);
  const [editingAppt, setEditingAppt] = useState(null);
  const [form, setForm] = useState({ reason: '', language: globalLang || 'en' });
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState('all');

  const appointments = data?.appointments || [];
  const filtered = filter === 'all' ? appointments : appointments.filter((a) => a.status === filter);

  const openBookModal = () => {
    setEditingAppt(null);
    setForm({ reason: '', language: globalLang || 'en' });
    setModalOpen(true);
  };

  const openRescheduleModal = (appt) => {
    setEditingAppt(appt);
    setForm({
      reason: appt.reason || '',
      language: appt.language || globalLang || 'en',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.reason.trim()) {
      showToast('Please describe your symptoms', 'error');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        doctorName: 'AI Health Assistant',
        date: new Date().toISOString(),
        timeSlot: 'Instant 24x7',
        reason: form.reason.trim(),
        language: form.language,
      };

      if (editingAppt) {
        await updateAppointment(editingAppt._id, payload);
        showToast('Consultation updated successfully!', 'success');
      } else {
        await bookAppointment(payload);
        triggerConfetti();
        showToast('AI Consultation ready! You can join the video call immediately.', 'success');
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
  const selectedLangConfig = SUPPORTED_LANGUAGES.find((l) => l.code === form.language) || SUPPORTED_LANGUAGES[0];

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
              Instant 24/7 AI Doctor video consultation in your native language. No waiting, no scheduling needed.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start">
            {user?.role === 'patient' && (
              <button onClick={openBookModal} className="btn-primary flex items-center gap-2 text-sm shadow-soft">
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
              <p><strong>Choose Language</strong> — Select Telugu, Hindi, English, Tamil, Bengali, or Spanish.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold mt-0.5">2</span>
              <p><strong>Describe Symptoms</strong> — Type or explain what you are experiencing.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold mt-0.5">3</span>
              <p><strong>Instant 24/7 Video Call</strong> — Speak directly with Dr. AI who listens and speaks in your language.</p>
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
          onClose={() => {
            setActiveVideoAppt(null);
            refetch();
          }}
          appointment={activeVideoAppt}
          currentUserRole={user?.role}
        />

        {/* Book / Update Consultation Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editingAppt ? 'Update Consultation' : 'Start Instant AI Health Consultation'}
        >
          {/* AI consultation explainer */}
          {!editingAppt && (
            <div className="mb-4 p-3 rounded-lg bg-gradient-to-br from-primary/5 to-blue-50 border border-primary/10">
              <div className="flex items-center gap-2 mb-1.5">
                <Bot size={18} className="text-primary" />
                <span className="text-sm font-semibold text-gray-800">24/7 AI Doctor Video Consultation</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Connect instantly with Dr. AI. Select your native language below — the AI will <strong>listen, understand, and speak aloud</strong> in your language throughout the video call.
              </p>
              <div className="flex items-center gap-3 mt-2.5 text-[11px] text-gray-500">
                <span className="flex items-center gap-1"><Globe size={11} /> 6 Languages</span>
                <span className="flex items-center gap-1"><Mic size={11} /> Voice Enabled</span>
                <span className="flex items-center gap-1"><ShieldCheck size={11} /> Private & Secure</span>
                <span className="flex items-center gap-1"><Sparkles size={11} /> Instant Access</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Language Selector */}
            <div>
              <label className="label-text flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Globe size={14} className="text-primary" />
                  Select Your Consultation Language
                </span>
                <span className="text-[11px] font-semibold text-primary">
                  {selectedLangConfig.native} ({selectedLangConfig.name})
                </span>
              </label>
              <p className="text-[11px] text-gray-400 mb-2.5">
                The AI Doctor will speak, listen, and provide clinical guidance in this language.
              </p>

              {/* Visual language cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SUPPORTED_LANGUAGES.map((lang) => {
                  const isSelected = form.language === lang.code;
                  return (
                    <button
                      type="button"
                      key={lang.code}
                      onClick={() => setForm({ ...form, language: lang.code })}
                      className={`relative flex items-center gap-2.5 p-3 rounded-xl border-2 transition-all duration-150 text-left active:scale-95 ${
                        isSelected
                          ? 'border-primary bg-primary/10 shadow-sm ring-2 ring-primary/30'
                          : 'border-gray-200 bg-white hover:border-primary/40 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-2xl">{LANG_FLAGS[lang.code] || '🌐'}</span>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-bold leading-tight ${isSelected ? 'text-primary' : 'text-gray-900'}`}>
                          {lang.native}
                        </p>
                        <p className="text-[10px] text-gray-400">{lang.name}</p>
                      </div>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                          <Check size={12} strokeWidth={3} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Selected language confirmation banner */}
              <div className="mt-2.5 px-3 py-2 rounded-xl bg-primary/5 border border-primary/15 flex items-center gap-2">
                <span className="text-base">{LANG_FLAGS[form.language] || '🌐'}</span>
                <p className="text-xs text-gray-700">
                  AI Doctor will converse in <strong className="text-primary font-bold">{selectedLangConfig.native} ({selectedLangConfig.name})</strong>
                </p>
              </div>
            </div>

            {/* Describe Symptoms */}
            <div>
              <label className="label-text">Describe Your Symptoms</label>
              <textarea
                className="input-field text-sm"
                rows={3}
                placeholder="Example: I have severe headache, body pain, and fever for 2 days..."
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                required
              />
              <p className="text-[11px] text-gray-400 mt-1">
                You can describe your symptoms in any language. The AI will immediately understand.
              </p>
            </div>

            <button
              type="submit"
              className="btn-primary w-full text-sm py-3 flex items-center justify-center gap-2 font-bold shadow-soft"
              disabled={saving}
            >
              {saving ? 'Processing...' : editingAppt ? 'Update Consultation' : (
                <>
                  <Video size={16} /> Start AI Consultation in {selectedLangConfig.native}
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
