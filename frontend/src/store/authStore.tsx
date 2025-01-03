import { create } from 'zustand';
import axios from 'axios';
import { Student } from '../components/data-table';

const API_URL = import.meta.env.MODE === "development" ? 'http://localhost:5000' : "";

interface AuthState {
  user: any;
  isLogin: boolean;
  isCheckingAuth: boolean;
  isLoading: boolean;
  oneLeaderStudentArr: Student[];
  oneStudent: Student;
  checkAuth: () => Promise<void>;
  login: (email: string) => Promise<void>;
  logout: (email: string) => Promise<void>;
  oneLeaderStudent: (leaderId: string) => Promise<void>;
  oneStudentDefine: (leaderId: string, studentId: string) => Promise<void>;
  studentUpdate: (leaderId: string, studentId: string, data: Student) => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  oneLeaderStudentArr: [],
  isLogin: false,
  isCheckingAuth: false,
  isLoading: false,
  oneStudent: {} as Student,

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const token = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage
      const response = await axios.get(`${API_URL}/api/auth/check-auth`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true, // Include cookies in the request
      });
      if(response.data.success){
        localStorage.setItem('authLogin', "true")
      }

      set({ user: response.data, isLogin: true, isLoading: false, isCheckingAuth: true });
    } catch (error) {
      console.error('Error checking auth:', error);
      set({ isCheckingAuth: false, isLoading: false });
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

      set({ user: response.data.user, isLoading: false, isLogin: true });
      localStorage.setItem('authToken', response.data.token); // Assuming the response contains a token
      console.log('Successfully logged in:', response.data.user);
    } catch (error) {
      set({ user: null, isLoading: false, isLogin: true });
      console.error('Error logging in:', error);
    }
  },

  logout: async (email: string) => {
    localStorage.setItem('authLogin', "false")
    try {
      const token = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage
      const response = await axios.post(`${API_URL}/api/auth/logout`, { email }, {
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

  oneLeaderStudent: async (leaderId: string) => {
    set({ isLoading: true });
    try {
      const token = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage
      const response = await axios.get(`${API_URL}/api/students/all-students/${leaderId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true, // Include cookies in the request
      });
      set({ oneLeaderStudentArr: response.data, isLoading: false });
    } catch (error) {
      console.error('Error checking auth:', error);
      set({ isCheckingAuth: false });
    }
  },
  oneStudentDefine: async (leaderId: string, studentId: string) => {
    set({ isLoading: true });
    try {
      const token = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage
      const response = await axios.get(`${API_URL}/api/students/${leaderId}/${studentId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true, // Include cookies in the request
      });
      set({ oneStudent: response.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false })
      console.error('Error fetching student data:', error);
      set({ isCheckingAuth: false });
    }
  },
  studentUpdate: async (leaderId: string, studentId: string, data: Student) => {
    set({ isLoading: true })
    try {
      const token = localStorage.getItem('authToken');
      await axios.put(`${API_URL}/api/students/${leaderId}/${studentId}`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      });
      set({ isLoading: false })
    } catch (error) {
      set({ isLoading: false })
      console.error('Error updating student:', error);
    }
  }

}));

export { useAuthStore };