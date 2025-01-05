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
const useMentorStore = create((set) => ({
    groups: [],
    group: [],
    isLoading: false,
    isCheckingAuth: true,
    getGroup: (groupId) => __awaiter(void 0, void 0, void 0, function* () {
        set({ isLoading: true });
        try {
            const token = localStorage.getItem('authToken');
            const response = yield axios.get(`${API_URL}/api/groups/${groupId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                withCredentials: true,
            });
            set({ group: response.data, isLoading: false });
        }
        catch (error) {
            set({ isLoading: false });
            console.error("Failed to fetch group data", error);
        }
    })
}));
export { useMentorStore };
