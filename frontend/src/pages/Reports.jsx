import React, { useState } from 'react';
import { Plus, FileText } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';
import { useFetch } from '../hooks/useFetch';
import { useToast } from '../context/ToastContext';
import { getReports, submitReport } from '../services/healthWorkerService';
import { formatDate } from '../utils/formatters';

const Reports = () => {
  const { data, loading, refetch } = useFetch(getReports, []);
  const { showToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ village: '', title: '', summary: '' });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await submitReport(form);
      showToast('Report submitted', 'success');
      setModalOpen(false);
      setForm({ village: '', title: '', summary: '' });
      refetch();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to submit report', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold">Report Submission</h2>
        <button onClick={() => setModalOpen(true)} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> New Report
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (data?.reports || []).length === 0 ? (
        <div className="card text-sm text-gray-500">No reports submitted yet.</div>
      ) : (
        <div className="space-y-4">
          {data.reports.map((report) => (
            <div key={report._id} className="card flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                <FileText size={18} className="text-primary" />
              </div>
              <div>
                <p className="font-medium">{report.title}</p>
                <p className="text-xs text-gray-500 mb-1">{report.village} &middot; {formatDate(report.createdAt)}</p>
                <p className="text-sm text-gray-600">{report.summary}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Submit Village Health Report">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label-text">Village</label>
            <input className="input-field" value={form.village} onChange={(e) => setForm({ ...form, village: e.target.value })} required />
          </div>
          <div>
            <label className="label-text">Title</label>
            <input className="input-field" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div>
            <label className="label-text">Summary</label>
            <textarea className="input-field" rows={4} value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} required />
          </div>
          <button type="submit" className="btn-primary w-full" disabled={saving}>
            {saving ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default Reports;
