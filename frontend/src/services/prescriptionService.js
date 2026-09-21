import api from './api';

export const getPrescriptions = () => api.get('/prescriptions').then((res) => res.data);
export const createPrescription = (data) => api.post('/prescriptions', data).then((res) => res.data);
