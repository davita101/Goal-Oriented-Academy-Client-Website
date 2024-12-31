import { z } from "zod";

export const userSchema = z.object({
    leaderId: z.string()
        .min(24, "Leader ID must be at most 24 characters long")
        .max(24, "Leader ID must be at most 24 characters long"),
    name: z.string().min(2, "Name must be at least 2 characters "),
    studentFbLink: z.string().url({ message: "You must enter correct URL" }),
    age: z.number()
        .min(0, "Age must be at least 0")
        .max(99, "Age must be at least 99"),

    email: z.string().email({ message: "You must enter correct email" }),
    githubLink: z.string().url({ message: "You must enter correct URL" }),
    speed: z.number()
        .min(0, "Speed must be at least 0")
        .max(4, "Speed must be at least 5"),
    role: z.string().min(2, "Role must be at one "),
    parentFbLink: z.string().url({ message: "You must enter correct URL" }),
    githubToken: z.string().min(2, "Github Token must be at least 2 characters "),
    githubLastUpdate: z.string().min(2, "Github Last Update must be at least 2 characters "),
    fines: z.object({
        githubFine: z.number().min(0, "Github Fine must be at least 0").max(1000, "Github Fine must be at most 1000"),
        miniLeaderFine: z.number().min(0, "Mini Leader Fine must be at least 0").max(100, "Mini Leader Fine must be at most 100"),
        miniStudentFine: z.number().min(0, "Mini Student Fine must be at least 0").max(100, "Mini Student Fine must be at most 100"),
    }),
    aura: z.object({
        points: z.number(),
        classwork: z.number(),
        attendance: z.number(),
        help: z.number(),
        camera: z.number(),
        answers: z.number(),
    }),
    payedInfo: z.boolean(),
    comment: z.object({
        leaderComment: z.string().min(0, "Leader Comment must be at least 0 characters"),
        leaderProof: z.string().url({ message: "You must enter a correct URL" }),
        controller: z.object({
            miniLeaderController: z.string().min(0, "Mini Leader Controller must be at least 0 characters"),
            leaderController: z.string().min(0, "Leader Controller must be at least 0 characters"),
        }),
    }),
})