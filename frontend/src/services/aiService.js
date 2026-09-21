import api from './api';

export const sendChatMessage = (message, history) =>
  api.post('/ai/chat', { message, history }).then((res) => res.data);
