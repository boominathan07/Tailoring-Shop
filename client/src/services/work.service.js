import apiClient from '../api/client';

export const workService = {
  getAll: async () => {
    const response = await apiClient.get('/work');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await apiClient.get(`/work/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await apiClient.post('/work', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  update: async (id, data) => {
    const response = await apiClient.put(`/work/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(`/work/${id}`);
    return response.data;
  }
};
