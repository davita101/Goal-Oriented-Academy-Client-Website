import { Student } from "../(student)/student";

export interface LeaderState {
    leaderStudents: Student[];
    student: Student;
    isLoading: boolean;
    isCheckingAuth: boolean;
    getLeaderStudents: (leaderId: string) => Promise<void>;
    getStudent: (leaderId: string, studentId: string) => Promise<void>;
    updateStudent: (leaderId: string, studentId: string, data: Student) => Promise<void>;
}