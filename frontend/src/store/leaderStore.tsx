import { create } from 'zustand'
import axios from 'axios';
import { LeaderState } from '../interface/(leader)/user-state';
import { User } from '../interface/(user)/user';

const API_URL = import.meta.env.MODE === "development" ? 'http://localhost:5000' : "";

const useLeaderStore = create<LeaderState>((set) => ({
    isLoading: false,
    leaderUpdate: async (leaderId: string,  data: User) => {
        set({ isLoading: true })
        try {
            const token = localStorage.getItem('authToken');
            await axios.put(`${API_URL}/api/leaders/${leaderId}`, data, {
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
    },
}))

export { useLeaderStore }