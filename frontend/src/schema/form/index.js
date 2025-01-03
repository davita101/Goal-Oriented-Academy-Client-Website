import { z } from "zod";
// ! form
export const formSchemaEmail = z.object({
    email: z.string().email({ message: "enter email" })
});
