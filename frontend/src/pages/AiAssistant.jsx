import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import ChatWindow from '../components/ChatWindow';

const AiAssistant = () => {
  return (
    <DashboardLayout>
      <h2 className="text-lg font-semibold mb-5">AI Health Assistant</h2>
      <ChatWindow />
    </DashboardLayout>
  );
};

export default AiAssistant;
