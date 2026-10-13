import React, { useState } from 'react';
import { Upload, FileText, Download, Sparkles, Filter, ShieldCheck, Plus } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { PageTransition, StaggerContainer, StaggerItem } from '../components/PageTransition';
import { CardSkeleton } from '../components/Skeleton';
import MedicalScannerModal from '../components/MedicalScannerModal';
import Modal from '../components/Modal';
import { useFetch } from '../hooks/useFetch';
import { useToast } from '../context/ToastContext';
import { triggerConfetti } from '../utils/confetti';
import { getRecords, uploadRecord } from '../services/recordService';
import { formatDate } from '../utils/formatters';

const recordTypeLabels = {
  lab_report: 'Lab Report',
  prescription: 'Prescription',
  scan: 'Diagnostic Scan',
  vaccination: 'Vaccination',
  other: 'Other Record',
};

const MedicalRecords = () => {
  const { data, loading, refetch } = useFetch(getRecords, []);
  const { showToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');
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
      triggerConfetti();
      showToast('Record archived successfully', 'success');
      setModalOpen(false);
      setForm({ title: '', recordType: 'other', file: null });
      refetch();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to upload record', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleExtractedFromAi = (data) => {
    setForm({
      title: `${data.documentType || 'Clinical'} - ${data.doctorName || 'Doctor'}`,
      recordType: data.documentType?.toLowerCase().includes('prescription') ? 'prescription' : 'lab_report',
      file: null,
    });
    setModalOpen(true);
  };

  const records = data?.records || [];
  const filtered = filterType === 'all' ? records : records.filter((r) => r.recordType === filterType);

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Medical History & Digital Health Vault</h2>
            <p className="text-sm text-gray-500">
              Encrypted health repository with AI prescription & lab OCR digitization.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
            <button
              onClick={() => setScannerOpen(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg px-3.5 py-2 text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition flex-1 sm:flex-initial"
            >
              <Sparkles size={14} /> AI Scan Document
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="btn-primary text-xs py-2 px-3.5 flex items-center justify-center gap-1.5 flex-1 sm:flex-initial"
            >
              <Upload size={14} /> Upload Report
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 no-scrollbar">
          {['all', 'lab_report', 'prescription', 'scan', 'vaccination'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize whitespace-nowrap transition ${
                filterType === type
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {type === 'all' ? 'All Records' : recordTypeLabels[type] || type}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-4">
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : filtered.length === 0 ? (
          <div className="card text-center py-12 text-sm text-gray-500 border border-dashed border-gray-200">
            <FileText size={36} className="mx-auto text-gray-300 mb-2" />
            <p className="font-semibold text-gray-700">No medical records found</p>
            <p className="text-xs text-gray-400 mt-1">Upload reports or scan paper records with AI to start your history.</p>
          </div>
        ) : (
          <StaggerContainer className="grid md:grid-cols-2 gap-4">
            {filtered.map((record) => (
              <StaggerItem key={record._id}>
                <div className="card card-hover flex items-start justify-between border border-gray-100 hover:border-primary/40 transition">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-primary shrink-0 mt-0.5">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-900">{record.title}</p>
                      <span className="inline-block mt-0.5 text-[11px] font-semibold text-primary bg-accent px-2 py-0.5 rounded-full">
                        {recordTypeLabels[record.recordType] || record.recordType}
                      </span>
                      <p className="text-xs text-gray-400 mt-1.5">{formatDate(record.createdAt)}</p>
                    </div>
                  </div>

                  {record.fileUrl && (
                    <a
                      href={record.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-gray-400 hover:text-primary hover:bg-accent/40 transition shrink-0"
                      title="Download record"
                    >
                      <Download size={18} />
                    </a>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        {/* AI OCR Scanner Modal */}
        <MedicalScannerModal
          isOpen={scannerOpen}
          onClose={() => setScannerOpen(false)}
          onExtracted={handleExtractedFromAi}
        />

        {/* Upload Record Modal */}
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Upload Medical Record">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label-text">Document Title</label>
              <input
                type="text"
                placeholder="e.g. Complete Blood Count (CBC) or PHC Prescription"
                className="input-field text-sm"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="label-text">Record Type</label>
              <select
                className="input-field text-sm"
                value={form.recordType}
                onChange={(e) => setForm({ ...form, recordType: e.target.value })}
              >
                {Object.entries(recordTypeLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label-text">Document File</label>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                className="input-field text-xs file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:bg-primary file:text-white file:text-xs"
                onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
                required={!form.file}
              />
            </div>

            <button type="submit" className="btn-primary w-full text-sm py-2.5" disabled={saving}>
              {saving ? 'Uploading & Encrypting...' : 'Save to Health Vault'}
            </button>
          </form>
        </Modal>
      </PageTransition>
    </DashboardLayout>
  );
};

export default MedicalRecords;
