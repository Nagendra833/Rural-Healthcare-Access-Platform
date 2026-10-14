import React, { useState } from 'react';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Loader2,
  Stethoscope,
  Pill,
  X,
  Printer,
  Download,
  Activity,
  Calendar,
} from 'lucide-react';
import { analyzeMedicalDocument } from '../services/aiService';
import { useToast } from '../context/ToastContext';
import { triggerConfetti } from '../utils/confetti';
import { CATEGORY_OPTIONS } from '../utils/clinicalProfiles';

export const MedicalScannerModal = ({ isOpen, onClose, onExtracted }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [category, setCategory] = useState('auto');
  const [titleHint, setTitleHint] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResult(null);
      // Auto-set title hint from filename if empty
      if (!titleHint) {
        const cleanName = selected.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        setTitleHint(cleanName);
      }
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setAnalyzing(true);
    try {
      const data = await analyzeMedicalDocument(file, category, titleHint);
      setResult(data.data);
      triggerConfetti();
      showToast('Document analyzed successfully! Specific medicines & diagnostics extracted.', 'success');
      if (onExtracted) onExtracted(data.data, file);
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to analyze document', 'error');
    } finally {
      setAnalyzing(false);
    }
  };

  const handlePrintReport = () => {
    window.print();
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setCategory('auto');
    setTitleHint('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="font-bold text-sm text-gray-900">AI Medical OCR & Prescription Scanner</p>
              <p className="text-xs text-gray-500">
                Accurate clinical diagnosis & specific medicines for all body systems
              </p>
            </div>
          </div>
          <button onClick={reset} className="p-1 rounded-lg text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!preview ? (
            <div className="space-y-4">
              {/* Category selector */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Clinical Specialty / Body System
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input-field text-xs py-2 bg-white"
                >
                  {CATEGORY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-gray-400 mt-1">
                  Select your health problem (Bone, Stomach, Skin, Dental, etc.) or let AI auto-detect.
                </p>
              </div>

              <label className="border-2 border-dashed border-gray-300 hover:border-primary rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer bg-surface hover:bg-accent/20 transition group">
                <input type="file" accept="image/*,application/pdf" className="hidden" onChange={handleFileChange} />
                <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-primary group-hover:scale-110 transition">
                  <UploadCloud size={28} />
                </div>
                <p className="font-semibold text-sm text-gray-800 mt-3">Upload Prescription, Scan or Lab Report</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG, or PDF (Bone X-rays, USG, blood tests, Rx)</p>
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Image Preview with scanning line */}
              <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-black/5 max-h-56 flex items-center justify-center">
                <img src={preview} alt="Upload preview" className="max-h-56 object-contain mx-auto" />
                {analyzing && (
                  <div className="absolute inset-0 bg-primary/10 flex flex-col items-center justify-center backdrop-blur-[1px]">
                    <div className="w-full h-1 bg-primary shadow-glow animate-pulse absolute top-1/2" />
                    <div className="bg-white/95 px-4 py-2.5 rounded-xl shadow-elevated flex items-center gap-2 text-xs font-bold text-primary">
                      <Loader2 size={16} className="animate-spin" />
                      Analyzing Clinical Document & Formulating Prescriptions...
                    </div>
                  </div>
                )}
              </div>

              {!result && (
                <div className="space-y-3 bg-surface p-3 rounded-xl border border-gray-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        Category / Problem Type
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="input-field text-xs py-1.5 bg-white"
                      >
                        {CATEGORY_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        Document Title / Notes
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Bone X-Ray, Stomach USG, Skin Rash"
                        value={titleHint}
                        onChange={(e) => setTitleHint(e.target.value)}
                        className="input-field text-xs py-1.5 bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={handleAnalyze}
                      disabled={analyzing}
                      className="btn-primary flex-1 py-2.5 text-xs font-semibold flex items-center justify-center gap-2"
                    >
                      {analyzing ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                      {analyzing ? 'Analyzing Clinical Findings...' : 'Extract Clinical Data & Prescriptions'}
                    </button>
                    <button
                      onClick={() => {
                        setFile(null);
                        setPreview(null);
                      }}
                      className="btn-secondary text-xs px-3"
                    >
                      Change
                    </button>
                  </div>
                </div>
              )}

              {/* Extraction Results */}
              {result && (
                <div className="space-y-3 pt-2">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs">
                    <div className="flex items-center justify-between">
                      <p className="font-bold flex items-center gap-1.5 text-sm">
                        <CheckCircle2 size={16} className="text-emerald-600" />
                        {result.documentType || 'Clinical Diagnosis & Report'}
                      </p>
                      <span className="text-[10px] font-semibold bg-emerald-100 px-2 py-0.5 rounded-full text-emerald-800">
                        Verified AI Analysis
                      </span>
                    </div>
                    <p className="mt-1.5 text-emerald-700 leading-relaxed">{result.summary}</p>
                  </div>

                  {/* Doctor & Date */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                      <span className="text-gray-400 block text-[10px]">Attending Physician / Specialist</span>
                      <span className="font-semibold text-gray-800">{result.doctorName || 'Dr. Medical Officer'}</span>
                    </div>
                    <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                      <span className="text-gray-400 block text-[10px]">Document Date</span>
                      <span className="font-semibold text-gray-800">{result.date || 'Today'}</span>
                    </div>
                  </div>

                  {/* Diagnoses Badges */}
                  {result.diagnoses?.length > 0 && (
                    <div className="p-3 rounded-xl border border-gray-100 bg-surface">
                      <p className="text-[11px] font-bold text-gray-700 mb-1.5 flex items-center gap-1">
                        <Activity size={13} className="text-primary" /> Confirmed Clinical Diagnoses
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {result.diagnoses.map((diag, i) => (
                          <span
                            key={i}
                            className="bg-primary/10 text-primary border border-primary/20 text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                          >
                            {diag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Extracted Specific Medicines */}
                  {result.medications?.length > 0 && (
                    <div className="border border-gray-200 rounded-xl p-3 bg-surface">
                      <p className="font-bold text-xs text-gray-800 mb-2 flex items-center gap-1.5">
                        <Pill size={14} className="text-primary" /> Prescribed Medicines for this Condition (
                        {result.medications.length})
                      </p>
                      <div className="space-y-1.5">
                        {result.medications.map((m, i) => (
                          <div
                            key={i}
                            className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-2.5 rounded-lg border border-gray-100 text-xs gap-1"
                          >
                            <div>
                              <span className="font-bold text-gray-900 block">{m.name}</span>
                              {m.purpose && (
                                <span className="text-[10px] text-gray-500 italic block">{m.purpose}</span>
                              )}
                            </div>
                            <span className="text-primary font-semibold text-[11px] sm:text-xs bg-accent px-2 py-0.5 rounded self-start sm:self-center">
                              {m.dosage} • {m.frequency} • {m.duration}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Extracted Diagnostic / Lab Results */}
                  {result.labResults?.length > 0 && (
                    <div className="border border-gray-200 rounded-xl p-3 bg-surface">
                      <p className="font-bold text-xs text-gray-800 mb-2 flex items-center gap-1.5">
                        <Stethoscope size={14} className="text-primary" /> Diagnostic & Radiological Findings
                      </p>
                      <div className="space-y-1.5">
                        {result.labResults.map((lr, i) => (
                          <div
                            key={i}
                            className="flex flex-col sm:flex-row sm:items-start justify-between bg-white p-2.5 rounded-lg border border-gray-100 text-xs gap-1"
                          >
                            <span className="font-semibold text-gray-800">{lr.testName}</span>
                            <div className="flex items-center gap-2 text-right">
                              <span
                                className={`font-bold ${
                                  lr.status === 'Abnormal' || lr.status === 'High'
                                    ? 'text-amber-600'
                                    : 'text-primary'
                                }`}
                              >
                                {lr.value}
                              </span>
                              {lr.normalRange && (
                                <span className="text-[10px] text-gray-400">({lr.normalRange})</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Advice & Lifestyle instructions */}
                  {result.advice && (
                    <div className="p-2.5 bg-blue-50 border border-blue-100 rounded-xl text-blue-900 text-xs">
                      <p className="font-bold text-[11px] mb-0.5">Clinical Advice & Patient Care:</p>
                      <p className="text-[11px] text-blue-800 leading-relaxed">{result.advice}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {result && (
          <div className="p-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
            <button
              onClick={handlePrintReport}
              className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5"
            >
              <Printer size={14} /> Print Report
            </button>
            <button onClick={reset} className="btn-primary text-xs py-2 px-4">
              Done & Add to Records
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalScannerModal;
