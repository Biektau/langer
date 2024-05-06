"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWordManuallySchema = exports.createWordAISchema = void 0;
const zod_1 = require("zod");
exports.createWordAISchema = zod_1.z.object({
    userId: zod_1.z.string().min(1),
    languageId: zod_1.z.string().min(1),
    dictionaryId: zod_1.z.string().min(1),
    original: zod_1.z.string().min(1),
});
exports.createWordManuallySchema = zod_1.z.object({
    userId: zod_1.z.string().min(1),
    languageId: zod_1.z.string().min(1),
    dictionaryId: zod_1.z.string().min(1),
    original: zod_1.z.string().min(1),
    translate: zod_1.z.string().min(1),
});
