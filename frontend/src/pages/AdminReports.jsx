import React from 'react';
import { FileText } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import { useFetch } from '../hooks/useFetch';
import { getAllReports } from '../services/adminService';
import { formatDate } from '../utils/formatters';

const AdminReports = () => {
  const { data, loading } = useFetch(getAllReports, []);

  return (
    <DashboardLayout>
      <h2 className="text-lg font-semibold mb-5">Reports Dashboard</h2>

      {loading ? (
        <LoadingSpinner />
      ) : (data?.reports || []).length === 0 ? (
        <div className="card text-sm text-gray-500">No village health reports submitted yet.</div>
      ) : (
        <div className="space-y-4">
          {data.reports.map((report) => (
            <div key={report._id} className="card flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                <FileText size={18} className="text-primary" />
              </div>
              <div>
                <p className="font-medium">{report.title}</p>
                <p className="text-xs text-gray-500 mb-1">
                  {report.village} &middot; Submitted by {report.submittedBy?.fullName} &middot; {formatDate(report.createdAt)}
                </p>
                <p className="text-sm text-gray-600">{report.summary}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminReports;
