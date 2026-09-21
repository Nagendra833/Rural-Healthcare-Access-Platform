import api from './api';

export const getProfile = () => api.get('/users/profile').then((res) => res.data);
export const updateProfile = (data) => api.put('/users/profile', data).then((res) => res.data);
export const getDoctors = () => api.get('/users/doctors').then((res) => res.data);
export const listUsers = (role) => api.get('/users', { params: { role } }).then((res) => res.data);
export const deleteUser = (id) => api.delete(`/users/${id}`).then((res) => res.data);
export const approveDoctor = (id) => api.put(`/users/${id}/approve`).then((res) => res.data);
