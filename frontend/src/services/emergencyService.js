import api from './api';

export const getEmergencyContacts = () => api.get('/emergency').then((res) => res.data);
