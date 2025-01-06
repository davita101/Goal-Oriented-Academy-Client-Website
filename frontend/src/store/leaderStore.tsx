import { create } from 'zustand'
import axios from 'axios';
import { LeaderState, Student } from '../utils/interface';

const API_URL = import.meta.env.MODE === "development" ? 'http://localhost:5000' : "";

const useLeaderStore = create<LeaderState>((set) => ({
    leaderStudents: [],
    student: {} as Student,
    isLoading: false,
    isCheckingAuth: true,

    getLeaderStudents: async (leaderId: string) => {
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
            console.log(response.data);
            set({ leaderStudents: response.data, isLoading: false });
        } catch (error) {
            console.error('Error checking auth:', error);
            set({ isCheckingAuth: false });
        }
    },
    getStudent: async (leaderId: string, studentId: string) => {
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
            set({ student: response.data, isLoading: false });
        } catch (error) {
            console.error('Error fetching student data:', error);
            set({ isCheckingAuth: false, isLoading: false });
        }
    },
    updateStudent: async (leaderId: string, studentId: string, data: Student) => {
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
}))

export { useLeaderStore }