import React, { useState } from 'react';
import { Bot, Sparkles, MessageSquare, ScanLine } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import ChatWindow from '../components/ChatWindow';
import MedicalScannerModal from '../components/MedicalScannerModal';
import PageTransition from '../components/PageTransition';

const AiAssistant = () => {
  const [scannerOpen, setScannerOpen] = useState(false);

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900">AI Rural Health Companion</h2>
            <p className="text-sm text-gray-500">
              Interactive multilingual health guidance, voice-driven triage, and clinical document analysis.
            </p>
          </div>

          <button
            onClick={() => setScannerOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl px-4 py-2.5 text-xs flex items-center gap-2 shadow-sm self-start active:scale-95 transition"
          >
            <Sparkles size={15} />
            <span>Scan Medical Document</span>
          </button>
        </div>

        <ChatWindow />

        <MedicalScannerModal
          isOpen={scannerOpen}
          onClose={() => setScannerOpen(false)}
        />
      </PageTransition>
    </DashboardLayout>
  );
};

export default AiAssistant;
