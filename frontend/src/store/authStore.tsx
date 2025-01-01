import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set) => ({
  user: null,
  login: async (email: string) => {
    try {
      console.log('Attempting to log in with email:', email);
      const response = await axios.post('http://localhost:5000/api/auth/login', { email });
      console.log('Login successful:', response.data);
      set({ user: response.data });
    } catch (error) {
      console.error('Error logging in:', error);
    }
  },
}));

export { useAuthStore };