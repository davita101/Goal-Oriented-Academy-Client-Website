import { z } from "zod";
// ! log in 


export const formSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export const formSchemaEmail = z.object({
  email: z.string().refine(() => true, {
    message: "Email not found.",
  }),
})