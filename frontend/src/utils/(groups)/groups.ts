import { Student } from "../(student)/student";

export interface GroupState {
    groups: Student[];
    group: Student[];
    isLoading: boolean;
    isCheckingAuth: boolean;
    getGroup: (groupId: string) => Promise<void>;
}
