import { Student } from "./student-Inteface";

export interface AllStudentState {
    AllStudents: Student[];
    isLoading: boolean;
    isCheckingAuth: boolean;
    getAllStudents: () => Promise<void>;
}