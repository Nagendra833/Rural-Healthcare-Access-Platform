import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ fullScreen = false, label = 'Loading...' }) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-2 py-10 text-primary">
      <Loader2 className="animate-spin" size={32} />
      <span className="text-sm text-gray-500">{label}</span>
    </div>
  );

  if (fullScreen) {
    return <div className="min-h-screen flex items-center justify-center bg-accent">{content}</div>;
  }
  return content;
};

export default LoadingSpinner;
