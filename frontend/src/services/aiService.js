import api from './api';

export const sendChatMessage = (message, history) =>
  api.post('/ai/chat', { message, history }).then((res) => res.data);

export const analyzeMedicalDocument = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return api
    .post('/ai/analyze-document', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => res.data);
};
