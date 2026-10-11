import apiClient from '../api/client';

export const workService = {
  getAll: async () => {
    const response = await apiClient.get('/works');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await apiClient.get(`/works/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await apiClient.post('/works', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  update: async (id, data) => {
    const response = await apiClient.put(`/works/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(`/works/${id}`);
    return response.data;
  }
};
