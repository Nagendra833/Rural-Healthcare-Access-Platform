import api from './api';

export const getAnalytics = () => api.get('/admin/analytics').then((res) => res.data);
export const getAllReports = () => api.get('/admin/reports').then((res) => res.data);
