import { Student } from "../(student)/student-Inteface";

export interface GroupState {
    groups: Student[];
    group: Student[];
    isLoading: boolean;
    isCheckingAuth: boolean;
    getGroup: (groupId: string) => Promise<void>;
}
