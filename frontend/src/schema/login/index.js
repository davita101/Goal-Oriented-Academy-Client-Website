"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formSchemaEmail = void 0;
var zod_1 = require("zod");
// ! log in 
exports.formSchemaEmail = zod_1.z.object({
    email: zod_1.z.string().email({ message: "" })
});
