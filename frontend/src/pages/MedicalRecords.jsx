import React, { useState } from 'react';
import { Upload, FileText, Download } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';
import { useFetch } from '../hooks/useFetch';
import { useToast } from '../context/ToastContext';
import { getRecords, uploadRecord } from '../services/recordService';
import { formatDate } from '../utils/formatters';

const recordTypeLabels = {
  lab_report: 'Lab Report',
  prescription: 'Prescription',
  scan: 'Scan',
  vaccination: 'Vaccination',
  other: 'Other',
};

const MedicalRecords = () => {
  const { data, loading, refetch } = useFetch(getRecords, []);
  const { showToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ title: '', recordType: 'other', file: null });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.file) {
      showToast('Please select a file to upload', 'error');
      return;
    }
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('recordType', form.recordType);
      formData.append('file', form.file);
      await uploadRecord(formData);
      showToast('Record uploaded successfully', 'success');
      setModalOpen(false);
      setForm({ title: '', recordType: 'other', file: null });
      refetch();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to upload record', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold">Medical History</h2>
        <button onClick={() => setModalOpen(true)} className="btn-primary flex items-center gap-2">
          <Upload size={16} /> Upload Report
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (data?.records || []).length === 0 ? (
        <div className="card text-sm text-gray-500">No medical records uploaded yet.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {data.records.map((record) => (
            <div key={record._id} className="card flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                <FileText size={18} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{record.title}</p>
                <p className="text-xs text-gray-500">{recordTypeLabels[record.recordType]} &middot; {formatDate(record.createdAt)}</p>
                {record.doctorNotes && <p className="text-sm text-gray-600 mt-1">{record.doctorNotes}</p>}
                <a
                  href={record.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary mt-2 hover:underline"
                >
                  <Download size={14} /> View / Download
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Upload Medical Report">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label-text">Title</label>
            <input
              className="input-field"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Blood Test Report - Jan 2026"
              required
            />
          </div>
          <div>
            <label className="label-text">Record Type</label>
            <select
              className="input-field"
              value={form.recordType}
              onChange={(e) => setForm({ ...form, recordType: e.target.value })}
            >
              {Object.entries(recordTypeLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-text">File (PDF, image, or Word doc)</label>
            <input
              type="file"
              className="input-field"
              accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
              onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full" disabled={saving}>
            {saving ? 'Uploading...' : 'Upload'}
          </button>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default MedicalRecords;
