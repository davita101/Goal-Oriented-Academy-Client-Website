import { Student } from "../(student)/student";

export interface AllStudentState {
    AllStudents: Student[];
    isLoading: boolean;
    isCheckingAuth: boolean;
    getAllStudents: () => Promise<void>;
}