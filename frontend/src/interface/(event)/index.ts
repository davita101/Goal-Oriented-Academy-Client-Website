import { group } from "console";

export const defaultEventValues = {
    name: "",
    description: "",
    isActive: true,
    group: "",
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
}