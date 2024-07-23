import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api';

// Helper function to get the token from local storage
const getToken = () => {
  return localStorage.getItem('token');
};

export const getPosts = async () => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data;
};

export const getPost = async (postId) => {
  const response = await axios.get(`${API_URL}/posts/${postId}`);
  return response.data;
};

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  if (response.data.access_token) {
    localStorage.setItem('token', response.data.access_token); // Store the token
  }
  return response.data;
};

export const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure token is stored and retrieved properly
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Logout failed');
  }
};

export const createPost = async (postData) => {
  const token = getToken();
  const response = await axios.post(`${API_URL}/posts`, postData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const updatePost = async (postId, postData) => {
  const token = getToken();
  const response = await axios.put(`${API_URL}/posts/${postId}`, postData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const deletePost = async (postId) => {
  const token = getToken();
  const response = await axios.delete(`${API_URL}/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};