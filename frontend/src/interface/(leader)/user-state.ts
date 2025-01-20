import { User } from "../(user)/user";

export interface LeaderState {
    isLoading: boolean;
    
    leaderUpdate: (id: string, data: User) => void;
}