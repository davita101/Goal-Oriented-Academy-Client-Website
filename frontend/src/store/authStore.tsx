import { create } from 'zustand';
import axios from 'axios';
import {Student } from '../interface/(student)/student-Inteface';
import { AuthState } from '../interface/(login)/auth';

const API_URL = import.meta.env.MODE === "development" ? 'http://localhost:5000' : "";

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  oneLeaderStudentArr: [],
  password: "",
  isLogin: false,
  isCheckingAuth: false,
  isLoading: false,
  oneStudent: {} as Student,

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const token = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage
      const response = await axios.get(`${API_URL}/auth/check-auth`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true, // Include cookies in the request
      });
      if (response.data.success) {
        localStorage.setItem('authLogin', "true")
      }

      set({ user: response.data, isLogin: true, isLoading: false, isCheckingAuth: true });
    } catch (error) {
      console.error('Error checking auth:', error);
      localStorage.setItem('authLogin', "false")
      set({ isCheckingAuth: false, isLoading: false });
    }
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true, isLogin: false });
    try {
      console.log('Attempting to log in with email:', email);
      const response = await axios.post(`${API_URL}/auth/login`, { email, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Include cookies in the request
      });
      if (response.data.success) {
        set({ user: response.data.user, isLoading: false, isLogin: true });
        localStorage.setItem('authToken', response.data.token); // Assuming the response contains a token
        console.log('Successfully logged in:', response.data.user);
      }
    } catch (error) {
      localStorage.setItem('authLogin', "false")
      set({ user: null, isLoading: false, isLogin: false });
      console.error('Error logging in:', error);
    }
  },

  logout: async (email: string) => {
    localStorage.setItem('authLogin', "false")
    try {
      const token = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage
      const response = await axios.post(`${API_URL}/auth/logout`, { email }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true, // Include cookies in the request
      });
      set({ user: null, isLogin: false, isLoading: false, isCheckingAuth: false });
    } catch (error) {
      console.error('Error checking auth:', error);
      set({ isCheckingAuth: false, isLoading: false, });
    }
  },
}));

export { useAuthStore };