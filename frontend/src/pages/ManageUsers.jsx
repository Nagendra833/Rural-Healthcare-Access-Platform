import React, { useState } from 'react';
import { Trash2, Search } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';
import { useFetch } from '../hooks/useFetch';
import { useToast } from '../context/ToastContext';
import { listUsers, deleteUser } from '../services/userService';
import { roleLabel } from '../utils/formatters';

const roleFilters = ['', 'patient', 'doctor', 'health_worker', 'admin'];

const ManageUsers = () => {
  const [role, setRole] = useState('');
  const [search, setSearch] = useState('');
  const { data, loading, refetch } = useFetch(() => listUsers(role || undefined), [role]);
  const { showToast } = useToast();
  const [confirmUser, setConfirmUser] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const users = (data?.users || []).filter((u) =>
    u.fullName.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async () => {
    if (!confirmUser) return;
    setDeleting(true);
    try {
      await deleteUser(confirmUser._id);
      showToast('User deleted', 'success');
      setConfirmUser(null);
      refetch();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to delete user', 'error');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <DashboardLayout>
      <h2 className="text-lg font-semibold mb-5">Manage Users</h2>

      <div className="flex flex-wrap gap-3 mb-5 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-3 text-gray-400" size={16} />
          <input
            className="input-field pl-9"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {roleFilters.map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                role === r ? 'bg-primary text-white' : 'bg-white text-gray-500 border border-gray-200'
              }`}
            >
              {r ? roleLabel(r) : 'All'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="card overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-100">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b border-gray-50 last:border-0">
                  <td className="px-4 py-3">{u.fullName}</td>
                  <td className="px-4 py-3 text-gray-500">{u.email}</td>
                  <td className="px-4 py-3 capitalize">{roleLabel(u.role)}</td>
                  <td className="px-4 py-3 text-gray-500">{u.phone}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => setConfirmUser(u)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={!!confirmUser}
        onClose={() => setConfirmUser(null)}
        title="Delete User"
        footer={
          <>
            <button onClick={() => setConfirmUser(null)} className="btn-secondary">
              Cancel
            </button>
            <button onClick={handleDelete} disabled={deleting} className="btn-primary bg-red-600 hover:bg-red-700">
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </>
        }
      >
        <p className="text-sm text-gray-600">
          Are you sure you want to delete <span className="font-medium">{confirmUser?.fullName}</span>? This action cannot be undone.
        </p>
      </Modal>
    </DashboardLayout>
  );
};

export default ManageUsers;
