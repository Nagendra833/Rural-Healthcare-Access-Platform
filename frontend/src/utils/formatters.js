// Shared formatting helpers used across dashboard cards and tables
export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

export const formatDateTime = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const roleLabel = (role) => {
  const labels = {
    patient: 'Patient',
    doctor: 'Doctor',
    health_worker: 'Health Worker',
    admin: 'Admin',
  };
  return labels[role] || role;
};

export const statusColor = (status) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-green-100 text-green-700',
    completed: 'bg-blue-100 text-blue-700',
    cancelled: 'bg-red-100 text-red-700',
    rescheduled: 'bg-purple-100 text-purple-700',
    scheduled: 'bg-yellow-100 text-yellow-700',
    missed: 'bg-red-100 text-red-700',
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
};
