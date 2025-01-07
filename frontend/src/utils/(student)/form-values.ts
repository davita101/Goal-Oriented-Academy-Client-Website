import { Student } from "./student"

export const defaultStudentValues = {
    _id: '',
    group: 0,
    leaderId: '',
    name: '',
    studentFbLink: '',
    age: 0,
    email: '',
    githubLink: '',
    speed: 0,
    role: '',
    parentFbLink: '',
    githubToken: '',
    githubLastUpdate: '',
    fines: { githubFine: 0, miniLeaderFine: 0, miniStudentFine: 0 },
    aura: { classwork: 0, attendance: 0, help: 0, camera: 0, answers: 0 },
    payedInfo: false,
    comment: { miniLeaderComment: "", leaderComment: '', leaderProof: '', controller: { miniLeaderController: '', githubController: '' } },
}

export const defaultStudentRest = (student: Student) => {
    return {
        _id: student._id || '',
        group: student.group || 0,
        leaderId: student.leaderId || '',
        name: student.name || '',
        studentFbLink: student.studentFbLink || '',
        age: student.age || 0,
        email: student.email || '',
        githubLink: student.githubLink || '',
        speed: student.speed || 0,
        role: student.role || '',
        parentFbLink: student.parentFbLink || '',
        githubToken: student.githubToken || '',
        githubLastUpdate: student.githubLastUpdate || '',
        fines: student.fines || { githubFine: 0, miniLeaderFine: 0, miniStudentFine: 0 },
        aura: student.aura || { points: 0, classwork: 0, attendance: 0, help: 0, camera: 0, answers: 0 },
        payedInfo: student.payedInfo || false,
        comment: student.comment || { miniLeaderComment: "", leaderComment: '', leaderProof: '', controller: { miniLeaderController: '', githubController: '' } },
    }
}