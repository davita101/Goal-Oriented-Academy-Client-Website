import { Student } from "./student-Inteface";

export interface StudentState {
    leaderStudents: Student[];
    student: Student;
    isLoading: boolean;
    isCheckingAuth: boolean;
    getLeaderStudents: (leaderId: string) => Promise<void>;
    getStudent: (leaderId: string, studentId: string) => Promise<void>;
    updateStudent: (leaderId: string, studentId: string, data: Student) => Promise<void>;
}