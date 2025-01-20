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
    }
    information: {
        leaderInformation: {
            rating: {
                cards: {
                    green: number;
                    yellow: number;
                    purple: number;
                    black: number;
                }
                leaderCheck: {
                    leaderGithubCheck : number;
                    leaderCodewarsUrl: string;
                    parentRating: number;
                    examResults:{
                        firstCheck: number;
                        secondCheck: number;
                    }
                    codewarsResult: number;
                    projectResults: number[];
                    leaderGithubUrl: string;
                }
            }
            githubCheck: {
                miniLeaderCheck: {
                    firstCheck:number
                    secondCheck:number
                }
                studentCheck:{
                    firstCheck:number
                    secondCheck:number
                }
            }
            finallyRating: number;
            finalSalary: number;

        }
        mentorInformation: {
            rating: {
                cards: {
                    green: number;
                    yellow: number;
                    purple: number;
                    black: number;
                }
                exam: number
            }
            leaderCheck: {
                leaderGithubCheck : number;
                leaderCodewarsUrl: string;
                parentRating: number;
                examResults:{
                    firstCheck: number;
                    secondCheck: number;
                }
                codewarsResult: number;
                projectResults: number[];
                leaderGithubUrl: string;
            }
            finallyRating: number;
            finalSalary: number;

        }
    }
}