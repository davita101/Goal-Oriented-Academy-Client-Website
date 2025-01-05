var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { create } from 'zustand';
import axios from 'axios';
const API_URL = import.meta.env.MODE === "development" ? 'http://localhost:5000' : "";
const useLeaderStore = create((set) => ({
    leaderStudents: [],
    student: {},
    isLoading: false,
    isCheckingAuth: true,
    getLeaderStudents: (leaderId) => __awaiter(void 0, void 0, void 0, function* () {
        set({ isLoading: true });
        try {
            const token = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage
            const response = yield axios.get(`${API_URL}/api/students/all-students/${leaderId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                withCredentials: true, // Include cookies in the request
            });
            set({ leaderStudents: response.data, isLoading: false });
        }
        catch (error) {
            console.error('Error checking auth:', error);
            set({ isCheckingAuth: false });
        }
    }),
    getStudent: (leaderId, studentId) => __awaiter(void 0, void 0, void 0, function* () {
        set({ isLoading: true });
        try {
            const token = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage
            const response = yield axios.get(`${API_URL}/api/students/${leaderId}/${studentId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                withCredentials: true, // Include cookies in the request
            });
            set({ student: response.data, isLoading: false });
        }
        catch (error) {
            console.error('Error fetching student data:', error);
            set({ isCheckingAuth: false, isLoading: false });
        }
    }),
    updateStudent: (leaderId, studentId, data) => __awaiter(void 0, void 0, void 0, function* () {
        set({ isLoading: true });
        try {
            const token = localStorage.getItem('authToken');
            yield axios.put(`${API_URL}/api/students/${leaderId}/${studentId}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                withCredentials: true,
            });
            set({ isLoading: false });
        }
        catch (error) {
            set({ isLoading: false });
            console.error('Error updating student:', error);
        }
    })
}));
export { useLeaderStore };
