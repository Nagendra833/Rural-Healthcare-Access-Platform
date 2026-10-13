import React, { useState } from 'react';
import { Bot, Sparkles, ScanLine, Heart, Baby, Brain, Apple, Syringe, Stethoscope, Activity, Eye, Bone, Zap, Shield } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import ChatWindow from '../components/ChatWindow';
import MedicalScannerModal from '../components/MedicalScannerModal';
import PageTransition from '../components/PageTransition';

const HEALTH_CATEGORIES = [
  { icon: Activity, label: 'Fever & Infections', query: 'I have fever with body ache and headache since 2 days. What could it be and how should I manage it?' },
  { icon: Heart, label: 'Heart & BP', query: 'My blood pressure is 160/100 mmHg. What should I do, what medicines to take, and what lifestyle changes are needed?' },
  { icon: Apple, label: 'Diabetes & Diet', query: 'I have Type 2 diabetes with blood sugar 250 mg/dL. Guide me on diet, medicines, and monitoring.' },
  { icon: Baby, label: 'Pregnancy & Child', query: 'I am 5 months pregnant. What vitamins, diet, and precautions do I need? What danger signs should I watch for?' },
  { icon: Brain, label: 'Mental Health', query: 'I am feeling very sad, anxious and stressed for over 2 weeks. How can I improve my mental health?' },
  { icon: Bone, label: 'Bone & Joint Pain', query: 'I have severe knee pain and lower back pain. What exercises, medicines, and treatment should I follow?' },
  { icon: Stethoscope, label: 'Breathing & Lungs', query: 'I have asthma and get breathlessness often. How to manage asthma attacks and what daily medicines are needed?' },
  { icon: Eye, label: 'Eye, Ear & ENT', query: 'My eyes are red and watering with discharge. What type of eye drops should I use and when to see a doctor?' },
  { icon: Syringe, label: 'Vaccination', query: 'What are the important vaccines for a newborn baby? Give me the complete immunization schedule in India.' },
  { icon: Shield, label: 'Skin & Allergy', query: 'I have itchy red rash with blisters on my skin spreading to other areas. What could it be and how to treat it?' },
  { icon: Zap, label: 'First Aid & Emergency', query: 'What are the first aid steps for snakebite, burns, choking, and fractures in rural areas?' },
  { icon: Bot, label: 'Malaria & Tropical', query: 'I have high fever with chills and sweating that comes every alternate day. Could it be malaria? What tests and treatment?' },
];

const AiAssistant = () => {
  const [scannerOpen, setScannerOpen] = useState(false);
  const [chatRef, setChatRef] = useState(null);
  const [pendingQuery, setPendingQuery] = useState(null);

  const handleCategoryClick = (query) => {
    setPendingQuery(query);
  };

  return (
    <DashboardLayout>
      <PageTransition>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Bot size={22} className="text-primary" />
              AI Rural Health Companion
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Ask about any health condition — get specific advice, medicines & dosages.
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

        {/* Health Category Quick-Access Chips */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Browse by Health Category</p>
          <div className="flex flex-wrap gap-2">
            {HEALTH_CATEGORIES.map(({ icon: Icon, label, query }, i) => (
              <button
                key={i}
                onClick={() => handleCategoryClick(query)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 hover:border-primary hover:bg-accent/60 text-xs font-medium text-gray-700 hover:text-primary shadow-sm transition-all active:scale-95"
              >
                <Icon size={13} className="text-primary shrink-0" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <ChatWindow
          externalQuery={pendingQuery}
          onExternalQueryConsumed={() => setPendingQuery(null)}
        />

        <MedicalScannerModal
          isOpen={scannerOpen}
          onClose={() => setScannerOpen(false)}
        />
      </PageTransition>
    </DashboardLayout>
  );
};

export default AiAssistant;
