import api from './api';

export const getVaccinations = () => api.get('/health-worker/vaccinations').then((res) => res.data);
export const addVaccination = (data) => api.post('/health-worker/vaccinations', data).then((res) => res.data);
export const updateVaccination = (id, data) => api.put(`/health-worker/vaccinations/${id}`, data).then((res) => res.data);

export const getHomeVisits = () => api.get('/health-worker/home-visits').then((res) => res.data);
export const scheduleHomeVisit = (data) => api.post('/health-worker/home-visits', data).then((res) => res.data);

export const getReports = () => api.get('/health-worker/reports').then((res) => res.data);
export const submitReport = (data) => api.post('/health-worker/reports', data).then((res) => res.data);
