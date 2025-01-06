export type Student = {
    _id: string
    name: string
    age: number
    studentFbLink: string
    email: string
    githubLink: string
    speed: number
    group: number
    leaderId: string
    role: string
    parentFbLink: string
    githubToken: string
    githubLastUpdate: string
    updatedAt: string
    fines: {
        githubFine: number
        miniLeaderFine: number
        miniStudentFine: number
    }
    aura: {
        points: number
        classwork: number
        attendance: number
        help: number
        camera: number
        answers: number
    }
    payedInfo: boolean
    comment: {
        leaderComment: string
        miniLeaderComment: string
        leaderProof: string
        controller: {
            miniLeaderController: string
            githubController: string
        }
    }
}
export interface AuthState {
    user: any;
    isLogin: boolean;
    isCheckingAuth: boolean;
    isLoading: boolean;
    checkAuth: () => Promise<void>;
    login: (email: string) => Promise<void>;
    logout: (email: string) => Promise<void>;
}
export interface LeaderState {
    leaderStudents: Student[];
    student: Student;
    isLoading: boolean;
    isCheckingAuth: boolean;
    getLeaderStudents: (leaderId: string) => Promise<void>;
    getStudent: (leaderId: string, studentId: string) => Promise<void>;
    updateStudent: (leaderId: string, studentId: string, data: Student) => Promise<void>;
}
export interface GroupState {
    groups: Student[];
    group: Student[];
    isLoading: boolean;
    isCheckingAuth: boolean;
    getGroup: (groupId: string) => Promise<void>;
}

export interface AllStudentState {
    AllStudents: Student[];
    isLoading: boolean;
    isCheckingAuth: boolean;
    getAllStudents: () => Promise<void>;
}