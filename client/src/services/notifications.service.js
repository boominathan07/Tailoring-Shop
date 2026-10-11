import apiClient from '../api/client';

export const getNotifications = async (limit = 50) => {
  const response = await apiClient.get(`/notifications?limit=${limit}`);
  return response.data;
};

export const getUnreadCount = async () => {
  const response = await apiClient.get('/notifications/unread-count');
  return response.data;
};

export const markAsRead = async (id) => {
  const response = await apiClient.patch(`/notifications/${id}/read`);
  return response.data;
};

export const markAllAsRead = async () => {
  const response = await apiClient.patch('/notifications/read-all');
  return response.data;
};
