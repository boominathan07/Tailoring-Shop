import apiClient from '../api/client';

export const customRequestsService = {
  getAll: async () => {
    const response = await apiClient.get('/custom-requests');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await apiClient.get(`/custom-requests/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await apiClient.post('/custom-requests', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  updateStatus: async (id, status, notes) => {
    const response = await apiClient.put(`/custom-requests/${id}`, {
      status,
      notes,
    });
    return response.data;
  }
};
