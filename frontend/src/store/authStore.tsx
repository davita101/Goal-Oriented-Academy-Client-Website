import { create } from 'zustand';
import axios from 'axios';
import { any } from 'zod';
import { Student } from '../components/data-table';

const API_URL = 'http://localhost:5000';

interface AuthState {
  oneLeaderStudentArr: Student[];
  user: any;
  isLogin: boolean;
  isCheckingAuth: boolean;
  isLoading: boolean;
  checkAuth: () => Promise<void>;
  login: (email: string) => Promise<void>;
  logout: (email: string) => Promise<void>;
  oneLeaderStudent: (leaderId: string) => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  oneLeaderStudentArr: [],
  isLogin: false,
  isCheckingAuth: false,
  isLoading: false,

  checkAuth: async () => {
    try {
      const token = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage
      const response = await axios.get(`${API_URL}/api/auth/check-auth`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true, // Include cookies in the request
      });

      set({ user: response.data, isLogin: true, isCheckingAuth: true });
    } catch (error) {
      console.error('Error checking auth:', error);
      set({ isCheckingAuth: false });
    }
  },

  login: async (email: string) => {
    set({ isLoading: true });
    try {
      console.log('Attempting to log in with email:', email);
      const response = await axios.post(`${API_URL}/api/auth/login`, { email }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Include cookies in the request
      });

      localStorage.setItem('authToken', response.data.token); // Assuming the response contains a token
      set({ user: response.data.user, isLoading: true, isLogin: true });
    } catch (error) {
      set({ user: null, isLoading: false, isLogin: true });
      console.error('Error logging in:', error);
    }
  },

  logout: async (email: string) => {
    try {
      const token = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage
      const response = await axios.post(`${API_URL}/api/auth/logout`, { email }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true, // Include cookies in the request
      });
      set({ user: null, isLogin: false, isCheckingAuth: false });
    } catch (error) {
      console.error('Error checking auth:', error);
      set({ isCheckingAuth: false });
    }
  },

  oneLeaderStudent: async (leaderId: string) => {
    try {
      const token = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage
      const response = await axios.get(`${API_URL}/api/students/all-students/${leaderId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true, // Include cookies in the request
      });
      set({ isLogin: true, oneLeaderStudentArr: response.data });
    } catch (error) {
      console.error('Error checking auth:', error);
      set({ isCheckingAuth: false });
    }
  }
}));

export { useAuthStore };