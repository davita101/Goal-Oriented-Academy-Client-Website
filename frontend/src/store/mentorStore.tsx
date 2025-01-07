import { create } from 'zustand'
import axios from 'axios';
import { } from '../utils/(student)/student';
import { GroupState } from '../utils/(groups)/groups';

const API_URL = import.meta.env.MODE === "development" ? 'http://localhost:5000' : "";

const useMentorStore = create<GroupState>((set) => ({
    groups: [],
    group: [],
    isLoading: false,
    isCheckingAuth: true,
    getGroup: async (groupId: string) => {
        set({ isLoading: true });
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get(`${API_URL}/api/groups/${groupId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                withCredentials: true,
            });
            set({ group: response.data, isLoading: false });
        } catch (error) {
            set({ isLoading: false });
            console.error("Failed to fetch group data", error);
        }
    }
}));

export { useMentorStore };