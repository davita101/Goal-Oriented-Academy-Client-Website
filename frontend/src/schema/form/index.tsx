import { z } from "zod";
// ! form
export const formSchemaEmail = z.object({
  leaderId: z.string().email({ message: "" })
})