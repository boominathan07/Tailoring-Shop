import apiClient from '../api/client';

export const getDashboardStats = async () => {
  const response = await apiClient.get('/admin/dashboard');
  return response.data;
};
