import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { updateProfile } from '../services/userService';
import { useToast } from '../context/ToastContext';

const ProfileForm = () => {
  const { user, updateUserInContext } = useAuth();
  const { showToast } = useToast();
  const [form, setForm] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    address: user?.address || '',
    specialization: user?.specialization || '',
    assignedVillage: user?.assignedVillage || '',
    currentPassword: '',
    newPassword: '',
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form };
      if (!payload.newPassword) {
        delete payload.newPassword;
        delete payload.currentPassword;
      }
      const data = await updateProfile(payload);
      updateUserInContext(data.user);
      showToast('Profile updated successfully', 'success');
      setForm((f) => ({ ...f, currentPassword: '', newPassword: '' }));
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card max-w-xl space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-primary font-bold text-xl relative">
          {user?.fullName?.charAt(0)?.toUpperCase()}
          <button
            type="button"
            className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-1"
            title="Upload profile picture"
          >
            <Camera size={12} />
          </button>
        </div>
        <div>
          <p className="font-semibold">{user?.fullName}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
      </div>

      <div>
        <label className="label-text">Full Name</label>
        <input name="fullName" value={form.fullName} onChange={handleChange} className="input-field" />
      </div>
      <div>
        <label className="label-text">Phone Number</label>
        <input name="phone" value={form.phone} onChange={handleChange} className="input-field" />
      </div>

      {user?.role === 'patient' && (
        <div>
          <label className="label-text">Address</label>
          <input name="address" value={form.address} onChange={handleChange} className="input-field" />
        </div>
      )}

      {user?.role === 'doctor' && (
        <div>
          <label className="label-text">Specialization</label>
          <input name="specialization" value={form.specialization} onChange={handleChange} className="input-field" />
        </div>
      )}

      {user?.role === 'health_worker' && (
        <div>
          <label className="label-text">Assigned Village</label>
          <input name="assignedVillage" value={form.assignedVillage} onChange={handleChange} className="input-field" />
        </div>
      )}

      <hr className="border-gray-100" />
      <p className="text-sm font-medium">Change Password</p>
      <div>
        <label className="label-text">Current Password</label>
        <input
          type="password"
          name="currentPassword"
          value={form.currentPassword}
          onChange={handleChange}
          className="input-field"
        />
      </div>
      <div>
        <label className="label-text">New Password</label>
        <input
          type="password"
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
          className="input-field"
        />
      </div>

      <button type="submit" className="btn-primary w-full" disabled={saving}>
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
};

export default ProfileForm;
