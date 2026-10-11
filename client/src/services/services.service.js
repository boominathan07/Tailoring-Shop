import apiClient from '../api/client';

export const servicesService = {
  getAll: async () => {
    const response = await apiClient.get('/services');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await apiClient.get(`/services/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await apiClient.post('/services', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  update: async (id, data) => {
    const response = await apiClient.put(`/services/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(`/services/${id}`);
    return response.data;
  }
};
