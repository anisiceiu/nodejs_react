import api from './api';

const register = (firstName, lastName, username, email, password) => {
  return api.post('/auth/register', {
    firstName,
    lastName,
    username,
    email,
    password
  });
};

const login = (username, password) => {
  return api.post('/auth/login', {
    username,
    password
  }).then(response => {
    if (response.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response;
  });
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export default {
  register,
  login,
  logout,
  getCurrentUser
};