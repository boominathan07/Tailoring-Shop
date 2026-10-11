import apiClient from '../api/client';

export const enquiriesService = {
  getAll: async () => {
    const response = await apiClient.get('/enquiries');
    return response.data;
  },
  
  create: async (data) => {
    const response = await apiClient.post('/enquiries', data);
    return response.data;
  },

  updateStatus: async (id, status, notes) => {
    const response = await apiClient.put(`/enquiries/${id}`, { status, notes });
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(`/enquiries/${id}`);
    return response.data;
  }
};
