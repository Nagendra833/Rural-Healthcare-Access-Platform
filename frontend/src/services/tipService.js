import api from './api';

export const getTips = (category) => api.get('/tips', { params: { category } }).then((res) => res.data);
