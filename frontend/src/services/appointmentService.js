import api from './api';

export const getAppointments = () => api.get('/appointments').then((res) => res.data);
export const bookAppointment = (data) => api.post('/appointments', data).then((res) => res.data);
export const updateAppointment = (id, data) => api.put(`/appointments/${id}`, data).then((res) => res.data);
export const cancelAppointment = (id) => api.delete(`/appointments/${id}`).then((res) => res.data);
