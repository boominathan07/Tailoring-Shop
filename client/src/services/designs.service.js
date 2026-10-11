import apiClient from '../api/client';

export const designsService = {
  getAll: async () => {
    const response = await apiClient.get('/designs');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await apiClient.get(`/designs/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await apiClient.post('/designs', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  update: async (id, data) => {
    const response = await apiClient.put(`/designs/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(`/designs/${id}`);
    return response.data;
  },

  togglePublish: async (id, isPublished) => {
    const response = await apiClient.put(`/designs/${id}`, { isPublished });
    return response.data;
  }
};
