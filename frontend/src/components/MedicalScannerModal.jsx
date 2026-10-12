import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Sparkles, Loader2, Stethoscope, Pill, X } from 'lucide-react';
import { analyzeMedicalDocument } from '../services/aiService';
import { useToast } from '../context/ToastContext';
import { triggerConfetti } from '../utils/confetti';

export const MedicalScannerModal = ({ isOpen, onClose, onExtracted }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
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
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setAnalyzing(true);
    try {
      const data = await analyzeMedicalDocument(file);
      setResult(data.data);
      triggerConfetti();
      showToast('Document analyzed successfully by Gemini Vision!', 'success');
      if (onExtracted) onExtracted(data.data);
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to analyze document', 'error');
    } finally {
      setAnalyzing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="font-bold text-sm text-gray-900">AI Medical OCR Scanner</p>
              <p className="text-xs text-gray-500">Scan handwritten prescriptions & lab test reports</p>
            </div>
          </div>
          <button onClick={reset} className="p-1 rounded-lg text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!preview ? (
            <label className="border-2 border-dashed border-gray-300 hover:border-primary rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer bg-surface hover:bg-accent/20 transition group">
              <input type="file" accept="image/*,application/pdf" className="hidden" onChange={handleFileChange} />
              <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-primary group-hover:scale-110 transition">
                <UploadCloud size={28} />
              </div>
              <p className="font-semibold text-sm text-gray-800 mt-3">Upload Prescription or Lab Report</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, or PDF (handwritten or printed)</p>
            </label>
          ) : (
            <div className="space-y-4">
              {/* Image Preview with scanning line */}
              <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-black/5 max-h-56 flex items-center justify-center">
                <img src={preview} alt="Upload preview" className="max-h-56 object-contain mx-auto" />
                {analyzing && (
                  <div className="absolute inset-0 bg-primary/10 flex flex-col items-center justify-center backdrop-blur-[1px]">
                    <div className="w-full h-1 bg-primary shadow-glow animate-pulse absolute top-1/2" />
                    <div className="bg-white/90 px-4 py-2 rounded-xl shadow-elevated flex items-center gap-2 text-xs font-bold text-primary">
                      <Loader2 size={16} className="animate-spin" />
                      Gemini OCR Analyzing Medical Document...
                    </div>
                  </div>
                )}
              </div>

              {!result && (
                <div className="flex gap-2">
                  <button
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    className="btn-primary flex-1 py-2.5 text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    {analyzing ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                    {analyzing ? 'Extracting Data...' : 'Extract Clinical Data with AI'}
                  </button>
                  <button
                    onClick={() => {
                      setFile(null);
                      setPreview(null);
                    }}
                    className="btn-secondary text-xs px-3"
                  >
                    Change Image
                  </button>
                </div>
              )}

              {/* Extraction Results */}
              {result && (
                <div className="space-y-3 pt-2">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs">
                    <p className="font-bold flex items-center gap-1.5 text-sm">
                      <CheckCircle2 size={16} className="text-emerald-600" />
                      {result.documentType || 'Clinical Document'}
                    </p>
                    <p className="mt-1 text-emerald-700 leading-relaxed">{result.summary}</p>
                  </div>

                  {/* Doctor & Date */}
                  {(result.doctorName || result.date) && (
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                        <span className="text-gray-400 block text-[10px]">Attending Physician</span>
                        <span className="font-semibold text-gray-800">{result.doctorName || 'Not specified'}</span>
                      </div>
                      <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                        <span className="text-gray-400 block text-[10px]">Document Date</span>
                        <span className="font-semibold text-gray-800">{result.date || 'Today'}</span>
                      </div>
                    </div>
                  )}

                  {/* Extracted Medicines */}
                  {result.medications?.length > 0 && (
                    <div className="border border-gray-200 rounded-xl p-3 bg-surface">
                      <p className="font-bold text-xs text-gray-800 mb-2 flex items-center gap-1.5">
                        <Pill size={14} className="text-primary" /> Extracted Medications ({result.medications.length})
                      </p>
                      <div className="space-y-1.5">
                        {result.medications.map((m, i) => (
                          <div key={i} className="flex items-center justify-between bg-white p-2 rounded-lg border border-gray-100 text-xs">
                            <span className="font-bold text-gray-900">{m.name}</span>
                            <span className="text-gray-500">{m.dosage} • {m.frequency} • {m.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Extracted Lab Results */}
                  {result.labResults?.length > 0 && (
                    <div className="border border-gray-200 rounded-xl p-3 bg-surface">
                      <p className="font-bold text-xs text-gray-800 mb-2 flex items-center gap-1.5">
                        <Stethoscope size={14} className="text-primary" /> Diagnostic Lab Results
                      </p>
                      <div className="space-y-1.5">
                        {result.labResults.map((lr, i) => (
                          <div key={i} className="flex items-center justify-between bg-white p-2 rounded-lg border border-gray-100 text-xs">
                            <span className="font-semibold text-gray-800">{lr.testName}</span>
                            <span className="font-bold text-primary">{lr.value}</span>
                            <span className="text-[10px] text-gray-400">{lr.normalRange}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {result && (
          <div className="p-3 border-t border-gray-100 bg-gray-50 flex justify-end">
            <button onClick={reset} className="btn-primary text-xs py-2 px-4">
              Done & Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalScannerModal;
