import { create } from 'zustand'
import axios from 'axios';
import { AllStudentState} from '../utils/interface';

const API_URL = import.meta.env.MODE === "development" ? 'http://localhost:5000' : "";

const useAllStudents = create<AllStudentState>((set) => ({
    AllStudents: [],
    isLoading: false,
    isCheckingAuth: true,

    getAllStudents: async () => {
        set({ isLoading: true });
        try {
            const token = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage
            const response = await axios.get(`${API_URL}/api/students/all-students`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                withCredentials: true, // Include cookies in the request
            });
            set({ AllStudents: response.data, isLoading: false });
        } catch (error) {
            console.error('Error checking auth:', error);
            set({ isCheckingAuth: false });
        }
    },
}))

export { useAllStudents }