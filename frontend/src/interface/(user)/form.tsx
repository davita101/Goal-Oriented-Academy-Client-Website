import { z } from "zod";

export const userSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters "),
    nickname: z.string().min(2, "Nickname must be at least 2 characters"),
    avatar: z.string().url("Invalid URL"),
    email: z.string().email("Invalid email"),
    miniLeaderId: z.string().min(2, "MiniLeaderId must be at least 2 characters"),
    social: z.object({
        facebook: z.string().url("Invalid URL"),
        linkedin: z.string().url("Invalid URL"),
        github: z.string().url("Invalid URL"),
        codewars: z.string().url("Invalid URL"),
    })
})
