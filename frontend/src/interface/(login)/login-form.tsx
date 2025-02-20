import { z } from "zod";
// ! form
export const formSchemaEmail = z.object({
  email: z.string().email({ message: "enter email" }),
  password: z.string().min(6, { message: "password must be at least 6 characters" }),
})