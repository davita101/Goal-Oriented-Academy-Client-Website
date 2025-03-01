import { z } from "zod";

export const createEvent = z.object({
  _id: z.string().min(12, "Required"),
  name: z.string()
    .min(8, "Required min 8 characters and one number")
    .regex(/lesson-/, "Must include 'lesson-'")
    .regex(/\d/, "At least one number"),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  group: z.preprocess((val) => Number(val), z.number()),
  startDate: z.date({
    required_error: "Required",
    invalid_type_error: "Invalid date",
  }),
})