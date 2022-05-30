import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getTeacherBoard() {
    return axios.get(API_URL + 'teacher', { headers: authHeader() });
  }

  getStudentBoard() {
    return axios.get(API_URL + 'student', { headers: authHeader() });
  }
}

export default new UserService();
