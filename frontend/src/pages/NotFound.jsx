import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse } from 'lucide-react';

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-accent px-4 text-center">
    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mb-4">
      <HeartPulse className="text-white" size={28} />
    </div>
    <h1 className="text-5xl font-bold text-primary mb-2">404</h1>
    <p className="text-textmain font-medium mb-1">Page Not Found</p>
    <p className="text-sm text-gray-500 mb-6 max-w-sm">
      The page you're looking for doesn't exist or may have been moved.
    </p>
    <Link to="/dashboard" className="btn-primary">
      Go to Dashboard
    </Link>
  </div>
);

export default NotFound;
