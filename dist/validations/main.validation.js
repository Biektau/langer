"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = void 0;
const zod_1 = require("zod");
function validateData(schema, data) {
    try {
        schema.parse(data);
        return { success: true };
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const errorMessages = error.issues.map((issue) => issue.message);
            return { success: false, errors: errorMessages };
        }
        throw error;
    }
}
exports.validateData = validateData;
