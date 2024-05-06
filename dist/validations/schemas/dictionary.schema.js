"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDictionarySchema = void 0;
const zod_1 = require("zod");
exports.createDictionarySchema = zod_1.z.object({
    userId: zod_1.z.string().min(1),
    languageId: zod_1.z.string().min(1),
    name: zod_1.z.string().min(1),
});
