/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://sthenos-backend.onrender.com/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
