import api from './api';

export const getRecords = () => api.get('/records').then((res) => res.data);
export const uploadRecord = (formData) =>
  api.post('/records', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res) => res.data);
export const deleteRecord = (id) => api.delete(`/records/${id}`).then((res) => res.data);

