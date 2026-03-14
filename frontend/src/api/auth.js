import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('wedding_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('wedding_token');
      localStorage.removeItem('wedding_user');
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  signup: (data) => API.post('/auth/signup', data),
  login: (data) => API.post('/auth/login', data),
  getMe: () => API.get('/auth/me'),
};

export const vendorAPI = {
  getAll: (params) => API.get('/vendors', { params }),
  getById: (id) => API.get(`/vendors/${id}`),
  getCategories: () => API.get('/vendors/categories'),
};

export const inquiryAPI = {
  submit: (data) => API.post('/inquiries', data),
  getMine: () => API.get('/inquiries/my'),
};

export const userAPI = {
  getProfile: () => API.get('/users/profile'),
  updateProfile: (data) => API.put('/users/profile', data),
  getBookmarks: () => API.get('/users/bookmarks'),
  toggleBookmark: (vendorId) => API.post(`/users/bookmarks/${vendorId}`),
};

export default API;