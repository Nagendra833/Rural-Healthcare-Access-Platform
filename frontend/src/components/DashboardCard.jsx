import React from 'react';

// A small stat card used across dashboards, e.g. "Total Patients: 128"
const DashboardCard = ({ icon: Icon, label, value, accentColor = 'text-primary' }) => {
  return (
    <div className="card flex items-center gap-4">
      {Icon && (
        <div className="w-11 h-11 rounded-full bg-accent flex items-center justify-center shrink-0">
          <Icon size={22} className={accentColor} />
        </div>
      )}
      <div>
        <p className="text-2xl font-semibold text-textmain">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
