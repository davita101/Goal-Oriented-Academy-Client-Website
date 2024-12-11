import { z } from "zod";
// ! log in 

export const formSchemaEmail = z.object({
  email: z.string().email({ message: "" })
})