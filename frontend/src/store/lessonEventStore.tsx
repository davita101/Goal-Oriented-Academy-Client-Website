import { create } from 'zustand'
import axios from 'axios';
import { } from '../interface/(student)/student-Inteface';
import { LessonEventState } from '../interface/(event)';

const API_URL = import.meta.env.MODE === "development" ? 'http://localhost:5000' : "";

const useLessonEventStore = create<LessonEventState>((set) => ({
    isLoading: false,
    status: 500,
    lessonsEvent: [],
    createLessonEvent: async (groupId, lessonEventData) => {
        set({ isLoading: true });
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.post(`${API_URL}/api/lessonEvent/${groupId}`, (lessonEventData), {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                withCredentials: true,
            })
            set({ isLoading: false, status: response.status })
            if (response.status == 409) {
                return response.status
            }
            return response.status
        } catch (error) {
            set({ isLoading: true });
            console.error("Failed to create event", error);
            set({ isLoading: false })
            if (axios.isAxiosError(error) && error.response) {
                return error.response.status
            }
            return 500
        }
    },
    getLessonEvent: async (lessonEventId) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get(`${API_URL}/api/lessonEvent/${lessonEventId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                withCredentials: true,
            });
            set({ lessonsEvent: response.data })
        } catch (error) {
            return error
        }
    },
    updateLessonEvent: async (lessonEventId, lessonUpdateEventData) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.put(`${API_URL}/api/lessonEvent/${lessonEventId}`, (lessonUpdateEventData), {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                withCredentials: true,
            })
            set({ lessonsEvent: response.data })
            return
        } catch (error) {
            return error
        }
    },
    getGroupLessonEvent: async (groupId) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get(`${API_URL}/api/group-events/${groupId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                withCredentials: true,
            })
            set({ lessonsEvent: response.data })
            return
        } catch (error) {
            return error
        }
    },
}))

export { useLessonEventStore }