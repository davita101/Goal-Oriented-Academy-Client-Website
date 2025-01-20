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
    parentName: string
    parentFbLink: string
    githubToken: string
    githubLastUpdate: string
    updatedAt: string
    studentPersonalInfo: {
        studentId: string
        studentRegion: string
        studentCity: string
        studentStreet: string
    },
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



