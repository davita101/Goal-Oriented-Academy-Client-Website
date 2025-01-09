import { Student } from "./interface/(student)/student";

export interface AllStudentState {
    AllStudents: Student[];
    isLoading: boolean;
    isCheckingAuth: boolean;
    getAllStudents: () => Promise<void>;
}