import apiClient from '../api/client';

export const authService = {
  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },
  
  register: async (name, email, password) => {
    const response = await apiClient.post('/auth/register', { name, email, password });
    return response.data;
  },
  
  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },

  checkAuth: async () => {
    try {
      const response = await apiClient.get('/auth/me', {
        validateStatus: (status) => {
          return (status >= 200 && status < 300) || status === 401;
        },
      });
      
      if (response.status === 401) {
        // Return expected guest state format so AuthContext handles it gracefully
        return { data: null };
      }
      
      return response.data;
    } catch (error) {
      // If Axios still rejects the 401 (e.g. global interceptor override), catch it here
      if (error.response && error.response.status === 401) {
        return { data: null };
      }
      throw error; // Rethrow other legitimate network/server errors
    }
  }
};
