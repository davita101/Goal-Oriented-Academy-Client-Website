export interface AuthState {
    user: any;
    isLogin: boolean;
    isCheckingAuth: boolean;
    isLoading: boolean;
    checkAuth: () => Promise<void>;
    login: (email: string) => Promise<void>;
    logout: (email: string) => Promise<void>;
}