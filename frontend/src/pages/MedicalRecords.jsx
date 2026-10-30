import React, { useState } from 'react';
import {
  Upload,
  FileText,
  Download,
  Sparkles,
  Filter,
  ShieldCheck,
  Plus,
  Printer,
  Eye,
  Pill,
  Stethoscope,
  Activity,
  Calendar,
  X,
  ExternalLink,
  Trash2,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import DashboardLayout from '../components/DashboardLayout';
import { PageTransition, StaggerContainer, StaggerItem } from '../components/PageTransition';
import { CardSkeleton } from '../components/Skeleton';
import MedicalScannerModal from '../components/MedicalScannerModal';
import Modal from '../components/Modal';
import { useAuth } from '../hooks/useAuth';
import { useFetch } from '../hooks/useFetch';
import { useToast } from '../context/ToastContext';
import { triggerConfetti } from '../utils/confetti';
import { getRecords, uploadRecord, deleteRecord } from '../services/recordService';
import { formatDate } from '../utils/formatters';
import { detectProfileFromRecord, CATEGORY_OPTIONS } from '../utils/clinicalProfiles';

const recordTypeLabels = {
  lab_report: 'Lab Report',
  prescription: 'Prescription',
  scan: 'Diagnostic Scan',
  vaccination: 'Vaccination',
  other: 'Other Record',
};

const getBackendFileUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const backendBase =
    (import.meta.env.VITE_API_BASE_URL || '').replace(/\/api\/?$/, '') || 'http://localhost:5000';
  return `${backendBase}${url.startsWith('/') ? '' : '/'}${url}`;
};

const MedicalRecords = () => {
  const { user } = useAuth();
  const { data, loading, refetch } = useFetch(getRecords, []);
  const { showToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [selectedRecordForReport, setSelectedRecordForReport] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [form, setForm] = useState({ title: '', recordType: 'other', file: null });
  const [saving, setSaving] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const confirmDelete = async () => {
    if (!recordToDelete) return;
    setDeleting(true);
    try {
      await deleteRecord(recordToDelete._id);
      showToast('Record deleted successfully from Health Vault', 'success');
      if (selectedRecordForReport?._id === recordToDelete._id) {
        setSelectedRecordForReport(null);
      }
      setRecordToDelete(null);
      refetch();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to delete record', 'error');
    } finally {
      setDeleting(false);
    }
  };

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
      showToast('Record archived successfully in Health Vault', 'success');
      setModalOpen(false);
      setForm({ title: '', recordType: 'other', file: null });
      refetch();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to upload record', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleExtractedFromAi = (data, uploadedFile) => {
    setForm({
      title: data.documentType || `${data.diagnoses?.[0] || 'Medical'} Report`,
      recordType:
        data.documentType?.toLowerCase().includes('prescription')
          ? 'prescription'
          : data.documentType?.toLowerCase().includes('scan') ||
            data.documentType?.toLowerCase().includes('bone') ||
            data.documentType?.toLowerCase().includes('x-ray')
          ? 'scan'
          : 'lab_report',
      file: uploadedFile || null,
    });
    setModalOpen(true);
  };

  const handleOpenReport = (record, e) => {
    if (e) e.stopPropagation();
    setSelectedRecordForReport(record);
  };

  const handlePrintClinicalReport = () => {
    window.print();
  };

  const records = data?.records || [];
  const filtered = filterType === 'all' ? records : records.filter((r) => r.recordType === filterType);

  // Derive clinical profile for the currently viewed record
  const currentProfile = selectedRecordForReport
    ? detectProfileFromRecord(selectedRecordForReport)
    : null;

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Medical History & Digital Health Vault</h2>
            <p className="text-sm text-gray-500">
              Encrypted health repository with AI diagnostic analysis & specialty prescriptions.
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
            <p className="text-xs text-gray-400 mt-1">
              Upload reports or scan paper records with AI to start your history.
            </p>
          </div>
        ) : (
          <StaggerContainer className="grid md:grid-cols-2 gap-4">
            {filtered.map((record) => (
              <StaggerItem key={record._id}>
                <div
                  onClick={() => handleOpenReport(record)}
                  className="card card-hover flex items-start justify-between border border-gray-100 hover:border-primary/40 transition cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-primary shrink-0 mt-0.5 group-hover:scale-105 transition">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-900 group-hover:text-primary transition">
                        {record.title}
                      </p>
                      <span className="inline-block mt-0.5 text-[11px] font-semibold text-primary bg-accent px-2 py-0.5 rounded-full">
                        {recordTypeLabels[record.recordType] || record.recordType}
                      </span>
                      <p className="text-xs text-gray-400 mt-1.5">{formatDate(record.createdAt)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                    {/* View Clinical Report Modal Trigger */}
                    <button
                      onClick={(e) => handleOpenReport(record, e)}
                      className="p-2 rounded-lg text-gray-400 hover:text-primary hover:bg-accent/40 transition"
                      title="View & Download Clinical Prescription Report"
                    >
                      <Download size={18} />
                    </button>
                    {record.fileUrl && (
                      <a
                        href={getBackendFileUrl(record.fileUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-gray-400 hover:text-primary hover:bg-accent/40 transition"
                        title="View Original Attached File"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setRecordToDelete(record);
                      }}
                      className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
                      title="Delete Medical Record"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
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
              <label className="label-text">Document Title / Medical Problem</label>
              <input
                type="text"
                placeholder="e.g. Bone Diagnostic Scan, Stomach Ultrasound, Skin Allergy"
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
              {form.file && (
                <p className="text-[11px] text-emerald-600 font-medium mt-1">
                  Attached: {form.file.name}
                </p>
              )}
            </div>

            <button type="submit" className="btn-primary w-full text-sm py-2.5" disabled={saving}>
              {saving ? 'Uploading & Encrypting...' : 'Save to Health Vault'}
            </button>
          </form>
        </Modal>

        {/* Clinical Report & Prescription Download Modal */}
        {selectedRecordForReport && currentProfile && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-surface">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                    <Stethoscope size={22} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm sm:text-base text-gray-900">
                        {currentProfile.documentType || selectedRecordForReport.title}
                      </p>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <ShieldCheck size={11} /> Verified Clinical Record
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      National Rural Telemedicine Portal • Diagnostic Scan & Prescription
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedRecordForReport(null)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Printable Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 print:p-0">
                {/* Patient & Doctor Card */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-gray-50 rounded-xl border border-gray-100 text-xs">
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase tracking-wider font-semibold">
                      Patient Name
                    </span>
                    <span className="font-bold text-gray-900 text-sm">
                      {selectedRecordForReport.patient?.fullName || user?.fullName || 'Registered Patient'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase tracking-wider font-semibold">
                      Consulting Specialist
                    </span>
                    <span className="font-semibold text-gray-800">{currentProfile.doctorName}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase tracking-wider font-semibold">
                      Report Date & Type
                    </span>
                    <span className="font-semibold text-gray-800">
                      {formatDate(selectedRecordForReport.createdAt)} •{' '}
                      {recordTypeLabels[selectedRecordForReport.recordType] || selectedRecordForReport.recordType}
                    </span>
                  </div>
                </div>

                {/* Confirmed Diagnoses */}
                <div>
                  <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Activity size={14} className="text-primary" /> Confirmed Clinical Diagnoses
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProfile.diagnoses.map((diag, i) => (
                      <span
                        key={i}
                        className="bg-primary/10 border border-primary/25 text-primary font-bold text-xs px-3 py-1 rounded-lg"
                      >
                        {diag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Specific Medications for this Issue */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Pill size={14} className="text-primary" /> Prescribed Medications for this Condition (
                      {currentProfile.medications.length})
                    </h4>
                    <span className="text-[11px] text-gray-400">Dispense as directed</span>
                  </div>

                  <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold">
                        <tr>
                          <th className="p-3">Medicine & Strength</th>
                          <th className="p-3">Dosage / Timings</th>
                          <th className="p-3 hidden sm:table-cell">Duration</th>
                          <th className="p-3 hidden md:table-cell">Purpose / Indication</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 bg-white">
                        {currentProfile.medications.map((med, i) => (
                          <tr key={i} className="hover:bg-gray-50/50">
                            <td className="p-3">
                              <p className="font-bold text-gray-900">{med.name}</p>
                              <span className="sm:hidden text-[10px] text-gray-500 block">
                                {med.duration} • {med.purpose}
                              </span>
                            </td>
                            <td className="p-3">
                              <span className="font-semibold text-primary bg-accent px-2 py-0.5 rounded text-[11px]">
                                {med.dosage}
                              </span>
                              <p className="text-[11px] text-gray-600 mt-0.5">{med.frequency}</p>
                            </td>
                            <td className="p-3 hidden sm:table-cell font-medium text-gray-700">
                              {med.duration}
                            </td>
                            <td className="p-3 hidden md:table-cell text-gray-600 text-[11px]">
                              {med.purpose}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Diagnostic & Scan Findings */}
                {currentProfile.labResults?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Stethoscope size={14} className="text-primary" /> Diagnostic & Radiological Findings
                    </h4>
                    <div className="space-y-2">
                      {currentProfile.labResults.map((lr, i) => (
                        <div
                          key={i}
                          className="p-3 bg-surface border border-gray-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1.5"
                        >
                          <div>
                            <span className="font-bold text-gray-800">{lr.testName}</span>
                            <p className="text-[11px] text-gray-600 mt-0.5">{lr.value}</p>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-bold self-start sm:self-center ${
                              lr.status === 'Abnormal' || lr.status === 'High'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {lr.status || 'Verified'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Doctor Advice & Dispensary Verification QR */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="sm:col-span-2 p-3.5 bg-blue-50/70 border border-blue-100 rounded-xl text-xs space-y-1">
                    <p className="font-bold text-blue-900">Physician Care & Recovery Instructions:</p>
                    <p className="text-blue-800 leading-relaxed text-[11px]">{currentProfile.advice}</p>
                    <p className="text-[11px] text-blue-700 font-medium pt-1">
                      Next Follow-up: {currentProfile.followUpDate}
                    </p>
                  </div>

                  <div className="p-3 bg-surface border border-gray-200 rounded-xl flex flex-col items-center justify-center text-center">
                    <QRCodeSVG
                      value={JSON.stringify({
                        recordId: selectedRecordForReport._id,
                        title: selectedRecordForReport.title,
                        patient:
                          selectedRecordForReport.patient?.fullName || user?.fullName || 'Patient',
                        doctor: currentProfile.doctorName,
                        medications: currentProfile.medications.map((m) => m.name),
                      })}
                      size={72}
                    />
                    <span className="text-[10px] text-gray-500 font-semibold mt-1.5">
                      PHC Dispensary QR
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-3 sm:p-4 border-t border-gray-100 bg-gray-50 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrintClinicalReport}
                    className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
                  >
                    <Printer size={15} /> Print / Save Prescription PDF
                  </button>
                  {selectedRecordForReport.fileUrl && (
                    <a
                      href={getBackendFileUrl(selectedRecordForReport.fileUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5"
                    >
                      <Download size={14} /> Download Scanned File
                    </a>
                  )}
                  <button
                    onClick={() => setRecordToDelete(selectedRecordForReport)}
                    className="text-xs text-red-600 hover:bg-red-50 py-2 px-3 rounded-lg flex items-center gap-1.5 transition font-medium border border-red-100"
                    title="Delete Record"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
                <button
                  onClick={() => setSelectedRecordForReport(null)}
                  className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1.5"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={!!recordToDelete}
          onClose={() => !deleting && setRecordToDelete(null)}
          title="Delete Medical Record"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Are you sure you want to permanently delete{' '}
              <span className="font-semibold text-gray-900">"{recordToDelete?.title}"</span>?
            </p>
            <div className="text-xs text-amber-700 bg-amber-50 p-3 rounded-xl border border-amber-200/80 leading-relaxed">
              ⚠️ <strong>Warning:</strong> This document and its clinical metadata will be permanently deleted from your Health Vault.
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRecordToDelete(null)}
                className="btn-secondary text-xs py-2 px-3.5"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg text-xs py-2 px-3.5 flex items-center gap-1.5 shadow-sm active:scale-95 transition"
                disabled={deleting}
              >
                <Trash2 size={14} />
                {deleting ? 'Deleting...' : 'Yes, Delete Record'}
              </button>
            </div>
          </div>
        </Modal>
      </PageTransition>
    </DashboardLayout>
  );
};

export default MedicalRecords;
