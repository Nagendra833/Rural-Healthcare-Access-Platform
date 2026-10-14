import api from './api';

export const sendChatMessage = (message, history, language, context) =>
  api.post('/ai/chat', { message, history, language, context }).then((res) => res.data);

export const analyzeMedicalDocument = (file, category = '', title = '', notes = '') => {
  const formData = new FormData();
  formData.append('file', file);
  if (category && category !== 'auto') formData.append('category', category);
  if (title) formData.append('title', title);
  if (notes) formData.append('notes', notes);
  return api
    .post('/ai/analyze-document', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => res.data);
};
