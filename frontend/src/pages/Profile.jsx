import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import ProfileForm from '../components/ProfileForm';

const Profile = () => (
  <DashboardLayout>
    <h2 className="text-lg font-semibold mb-5">Profile Settings</h2>
    <ProfileForm />
  </DashboardLayout>
);

export default Profile;
