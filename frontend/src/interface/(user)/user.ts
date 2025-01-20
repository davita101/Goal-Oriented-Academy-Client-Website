export interface User {
    name: string;
    nickname: string;
    avatar: string;
    email: string;
    miniLeaderId: string;
    social: {
        facebook: string;
        github: string;
        linkedin: string;
    };
    information: {
        leaderInformation: {
            rating: {
                cards: {
                    green: number;
                    yellow: number;
                    purple: number;
                    black: number;
                };
                leaderCheck: {
                    leaderGithubCheck: number;
                    leaderCodewarsUrl: string;
                    parentRating: number;
                    examResults: {
                        firstCheck: number;
                        secondCheck: number;
                    };
                    codewarsResult: number;
                    projectResults: number[];
                    leaderGithubUrl: string;
                };
            };
            githubCheck: {
                miniLeaderCheck: {
                    firstCheck: number;
                    secondCheck: number;
                };
                studentCheck: {
                    firstCheck: number;
                    secondCheck: number;
                };
            };
            finallyRating: number;
            finalSalary: number;
        };
        mentorInformation: {
            rating: {
                cards: {
                    green: number;
                    yellow: number;
                    purple: number;
                    black: number;
                };
                exam: number;
                githubCheck: {
                    firstCheck: number;
                };
            };
            mentorControl: {
                mentorController: string;
                mentorControlComment: string;
                group: string;
                mentorId: string;
                date: string;
                fine: number;
            }[];
            finallyRating: number;
            finalSalary: number;
        };
        mentorAssistantInformation: {
            rating: number;
            control: {
                mentorAssistantController: string;
                mentorAssistantControlComment: string;
                group: string;
                mentorAssistantId: string;
                date: string;
                fine: number;
            }[];
            finallyRating: number;
            finalSalary: number;
        };
    };
    role: string[];
    controllers: {
        leaderController: string;
        miniLeaderController: string;
        githubController: string;
        mentorController: string;
        mentorAssistantController: string;
        miniMentorController: string;
    };
    isVerified: boolean;
    restEmailExpiredAt: string;
    updatedAt: string;
    lastLogin: string;
    clientId: string;
}