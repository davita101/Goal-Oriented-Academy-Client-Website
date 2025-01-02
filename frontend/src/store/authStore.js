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
const API_URL = 'http://localhost:5000';
const useAuthStore = create((set) => ({
    user: null,
    oneLeaderStudentArr: [],
    isLogin: false,
    isCheckingAuth: false,
    isLoading: false,
    oneStudent: {},
    checkAuth: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage
            const response = yield axios.get(`${API_URL}/api/auth/check-auth`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                withCredentials: true, // Include cookies in the request
            });
            set({ user: response.data, isLogin: true, isCheckingAuth: true });
        }
        catch (error) {
            console.error('Error checking auth:', error);
            set({ isCheckingAuth: false });
        }
    }),
    login: (email) => __awaiter(void 0, void 0, void 0, function* () {
        set({ isLoading: true });
        try {
            console.log('Attempting to log in with email:', email);
            const response = yield axios.post(`${API_URL}/api/auth/login`, { email }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true, // Include cookies in the request
            });
            localStorage.setItem('authToken', response.data.token); // Assuming the response contains a token
            set({ user: response.data.user, isLoading: false, isLogin: true });
            console.log('Successfully logged in:', response.data.user);
        }
        catch (error) {
            set({ user: null, isLoading: false, isLogin: true });
            console.error('Error logging in:', error);
        }
    }),
    logout: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage
            const response = yield axios.post(`${API_URL}/api/auth/logout`, { email }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                withCredentials: true, // Include cookies in the request
            });
            set({ user: null, isLogin: false, isCheckingAuth: false });
        }
        catch (error) {
            console.error('Error checking auth:', error);
            set({ isCheckingAuth: false });
        }
    }),
    oneLeaderStudent: (leaderId) => __awaiter(void 0, void 0, void 0, function* () {
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
            set({ oneLeaderStudentArr: response.data, isLoading: false });
        }
        catch (error) {
            console.error('Error checking auth:', error);
            set({ isCheckingAuth: false });
        }
    }),
    oneStudentDefine: (leaderId, studentId) => __awaiter(void 0, void 0, void 0, function* () {
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
            set({ oneStudent: response.data, isLoading: false });
        }
        catch (error) {
            set({ isLoading: false });
            console.error('Error fetching student data:', error);
            set({ isCheckingAuth: false });
        }
    }),
    studentUpdate: (leaderId, studentId, data) => __awaiter(void 0, void 0, void 0, function* () {
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
export { useAuthStore };
